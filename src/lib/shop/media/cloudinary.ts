export function getPlaceholder(type: 'banner', id: string): string {
  const baseUrl = 'https://res.cloudinary.com/demo/image/upload/';
  const transformations = 'c_fill,w_1290,h_420';

  if (type === 'banner') {
    return `${baseUrl}${transformations}/${id}.jpg`;
  }

  return `${baseUrl}${id}.jpg`;
}
