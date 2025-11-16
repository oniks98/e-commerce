import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_FOLDER = 'e-commerce/users-avatars';

export async function POST(request: NextRequest) {
  try {
    console.log('[Avatar Upload] Starting upload process');

    // Authenticate user
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error('[Avatar Upload] Unauthorized access attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[Avatar Upload] User authenticated:', user.id);

    // Validate Cloudinary credentials
    if (
      !CLOUDINARY_CLOUD_NAME ||
      !CLOUDINARY_API_KEY ||
      !CLOUDINARY_API_SECRET
    ) {
      console.error('[Avatar Upload] Cloudinary credentials not configured');
      return NextResponse.json(
        { error: 'Service configuration error' },
        { status: 500 },
      );
    }

    // Get file from FormData
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.error('[Avatar Upload] No file in request');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log(
      '[Avatar Upload] File received:',
      file.name,
      file.type,
      file.size,
    );

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 },
      );
    }

    // Validate file size (5MB max)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 },
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate timestamp and public_id
    const timestamp = Math.round(Date.now() / 1000);
    const publicId = `user_${user.id}_${timestamp}`;

    // Generate signature for Cloudinary
    const crypto = await import('crypto');
    const paramsToSign = {
      folder: CLOUDINARY_FOLDER,
      overwrite: 'true',
      public_id: publicId,
      timestamp: timestamp.toString(),
    };

    const sortedParams = Object.entries(paramsToSign)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const signatureString = `${sortedParams}${CLOUDINARY_API_SECRET}`;
    const signature = crypto
      .createHash('sha1')
      .update(signatureString)
      .digest('hex');

    // Create form data for Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', new Blob([buffer]), file.name);
    cloudinaryFormData.append('folder', CLOUDINARY_FOLDER);
    cloudinaryFormData.append('public_id', publicId);
    cloudinaryFormData.append('overwrite', 'true');
    cloudinaryFormData.append('timestamp', timestamp.toString());
    cloudinaryFormData.append('signature', signature);
    cloudinaryFormData.append('api_key', CLOUDINARY_API_KEY);

    // Upload to Cloudinary
    console.log('[Avatar Upload] Uploading to Cloudinary...');
    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: cloudinaryFormData,
      },
    );

    if (!cloudinaryResponse.ok) {
      const errorData = await cloudinaryResponse.json();
      console.error('[Avatar Upload] Cloudinary upload error:', errorData);
      return NextResponse.json(
        { error: 'Failed to upload image' },
        { status: 500 },
      );
    }

    console.log('[Avatar Upload] Cloudinary upload successful');

    const cloudinaryData = await cloudinaryResponse.json();
    const avatarUrl = cloudinaryData.secure_url;

    // Update user metadata in Supabase
    console.log('[Avatar Upload] Updating user metadata in Supabase...');
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        ...user.user_metadata,
        avatar_url: avatarUrl,
      },
    });

    if (updateError) {
      console.error('[Avatar Upload] Supabase update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update user profile' },
        { status: 500 },
      );
    }

    console.log('[Avatar Upload] Upload complete, avatar URL:', avatarUrl);
    return NextResponse.json({
      success: true,
      avatar_url: avatarUrl,
    });
  } catch (error) {
    console.error('Avatar upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Authenticate user
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Remove avatar_url from user metadata
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        ...user.user_metadata,
        avatar_url: null,
      },
    });

    if (updateError) {
      console.error('Supabase update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update user profile' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Avatar removed successfully',
    });
  } catch (error) {
    console.error('Avatar deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
