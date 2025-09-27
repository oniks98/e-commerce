type ImageType =
  | 'about'
  | 'product'
  | 'articles'
  | 'category'
  | 'promotions'
  | 'banner';

const placeholders: Record<ImageType, string> = {
  about: 'v1724863310/about_placeholder.png',
  product: 'v1724863310/product_placeholder.png',
  articles: 'v1724863310/articles_placeholder.png',
  category: 'v1724863310/category_placeholder.png',
  promotions: 'v1724863310/promotions_placeholder.png',
  banner: 'v1724863310/about_placeholder.png', // Reusing about placeholder for banner
};

export const getPlaceholder = (type: ImageType, id: string) => {
  // Simple hash function to get a number from a string
  const hash = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
    }
    return h;
  };

  const hashedId = Math.abs(hash(id));
  const version = `v${1724863310 + (hashedId % 100)}`; // Create a semi-random version

  const placeholderUrl = placeholders[type] || placeholders.about;

  return `https://res.cloudinary.com/my-cloud/image/upload/c_fill,w_600,q_auto,f_auto/dpr_auto/${version}/${placeholderUrl}`;
};
