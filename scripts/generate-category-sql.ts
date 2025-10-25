#!/usr/bin/env node

/**
 * Script to generate SQL statements for updating category images
 * This script reads the images from public/images/categories and generates
 * UPDATE SQL statements based on the Cloudinary URL pattern
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATEGORIES_PATH = path.join(
  __dirname,
  '..',
  'public',
  'images',
  'categories',
);
const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/dxdfmxy7n/image/upload';
const CLOUDINARY_FOLDER = 'e-commerce/categories';

function generateSqlStatements() {
  console.log('📝 Generating SQL update statements...\n');

  // Read all files from categories directory
  const files = fs.readdirSync(CATEGORIES_PATH);
  const imageFiles = files.filter((file) => file.endsWith('.png'));

  console.log(`Found ${imageFiles.length} images\n`);
  console.log('-- SQL UPDATE Statements:\n');

  imageFiles.forEach((file) => {
    const slug = file.replace('.png', '');
    const imageUrl = `${CLOUDINARY_BASE_URL}/${CLOUDINARY_FOLDER}/${file}`;

    console.log(
      `UPDATE categories SET image_url = '${imageUrl}' WHERE slug = '${slug}';`,
    );
  });

  console.log('\n-- End of SQL statements');
  console.log(`\nTotal: ${imageFiles.length} UPDATE statements generated`);
}

generateSqlStatements();
