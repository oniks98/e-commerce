/**
 * Get optimized Cloudinary URL for an image
 */
export const getOptimizedCloudinaryUrl = (
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb' | 'limit' | 'pad';
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'png' | 'jpg';
  } = {},
): string => {
  const transformations = [];

  // Default crop to 'fill' if width and height are provided
  const crop =
    options.crop || (options.width && options.height ? 'fill' : undefined);

  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (crop) transformations.push(`c_${crop}`);

  // Defaults for quality and format
  const quality = options.quality || 'auto';
  const format = options.format || 'auto';

  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  const transformationString = transformations.join(',');

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformationString}/dpr_auto/${publicId}`;
};
