export const getPlaceholder = (
  type: 'about' | 'product' | 'articles',
  id: string,
): string => {
  const baseUrl = 'https://res.cloudinary.com/demo/image/upload/';
  return `${baseUrl}/${type}/${id}`;
};
