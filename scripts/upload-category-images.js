'use strict';
/**
 * Script to upload all category images to Cloudinary
 * Run with: node scripts/upload-category-images.js
 */
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
const url_1 = require('url');

const cloudinary_1 = require('cloudinary');
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
// Configure Cloudinary (add your credentials)
cloudinary_1.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const CATEGORIES_PATH = path_1.default.join(
  __dirname,
  '..',
  'public',
  'images',
  'categories',
);
const CLOUDINARY_FOLDER = 'e-commerce/categories';
async function uploadImage(filePath, slug) {
  try {
    const result = await cloudinary_1.v2.uploader.upload(filePath, {
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
  const files = fs_1.default.readdirSync(CATEGORIES_PATH);
  const imageFiles = files.filter((file) => file.endsWith('.png'));
  console.log(`📁 Found ${imageFiles.length} images to upload\n`);
  const results = [];
  for (const file of imageFiles) {
    const filePath = path_1.default.join(CATEGORIES_PATH, file);
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
