/**
 * Script to upload all category images to Cloudinary
 * Run with: node scripts/upload-category-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary (add your credentials)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CATEGORIES_PATH = path.join(
  __dirname,
  '..',
  'public',
  'images',
  'categories',
);
const CLOUDINARY_FOLDER = 'e-commerce/categories';

async function uploadImage(filePath: string, slug: string) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: CLOUDINARY_FOLDER,
      public_id: slug,
      overwrite: true,
    });

    console.log(`✅ Uploaded: ${slug}`);
    return {
      slug,
      url: result.secure_url,
      success: true,
    };
  } catch (error) {
    console.error(`❌ Failed to upload ${slug}:`, error);
    return {
      slug,
      url: null,
      success: false,
    };
  }
}

async function main() {
  console.log('🚀 Starting category images upload to Cloudinary...\n');

  // Read all files from categories directory
  const files = fs.readdirSync(CATEGORIES_PATH);
  const imageFiles = files.filter((file) => file.endsWith('.png'));

  console.log(`📁 Found ${imageFiles.length} images to upload\n`);

  const results = [];

  for (const file of imageFiles) {
    const filePath = path.join(CATEGORIES_PATH, file);
    const slug = file.replace('.png', '');

    const result = await uploadImage(filePath, slug);
    results.push(result);

    // Add a small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log('\n📊 Upload Summary:');
  console.log(`Total: ${results.length}`);
  console.log(`Success: ${results.filter((r) => r.success).length}`);
  console.log(`Failed: ${results.filter((r) => !r.success).length}`);

  // Generate SQL update statements
  console.log('\n📝 SQL Update Statements:\n');
  results
    .filter((r) => r.success && r.url)
    .forEach((r) => {
      console.log(
        `UPDATE categories SET image_url = '${r.url}' WHERE slug = '${r.slug}';`,
      );
    });
}

main().catch(console.error);
