export function getPlaceholder(
  type: 'banner' | 'category' | 'product',
  id: string,
): string {
  const baseUrl = 'https://res.cloudinary.com/demo/image/upload/';
  const bannerTransformations = 'c_fill,w_1290,h_420';
  const categoryTransformations = 'c_fill,w_310,h_300';

  if (type === 'banner') {
    return `${baseUrl}${bannerTransformations}/${id}.jpg`;
  }

  if (type === 'category') {
    return `${baseUrl}${categoryTransformations}/${id}.jpg`;
  }

  return `${baseUrl}${id}.jpg`;
}
