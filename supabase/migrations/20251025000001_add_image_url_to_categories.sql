-- Add image_url column to categories table
ALTER TABLE categories
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add comment to the column
COMMENT ON COLUMN categories.image_url IS 'URL to category image stored in Cloudinary';

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_categories_image_url ON categories(image_url) WHERE image_url IS NOT NULL;
