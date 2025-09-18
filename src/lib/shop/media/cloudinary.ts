export function getPlaceholder(
  type: 'banner' | 'category' | 'product' | 'promotions',
  id: string,
): string {
  const baseUrl = 'https://res.cloudinary.com/demo/image/upload/';
  const bannerTransformations = 'c_fill,w_1290,h_420';
  const categoryTransformations = 'c_fill,w_310,h_300';
  const promotionTransformations = 'c_fill,w_410,h_280';

  if (type === 'banner') {
    return `${baseUrl}${bannerTransformations}/${id}`;
  }

  if (type === 'category') {
    return `${baseUrl}${categoryTransformations}/${id}`;
  }

  if (type === 'promotions') {
    return `${baseUrl}${promotionTransformations}/${id}`;
  }

  return `${baseUrl}${id}`;
}
