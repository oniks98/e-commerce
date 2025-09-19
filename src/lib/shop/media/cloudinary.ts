const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/demo/image/upload/';

export const getPlaceholder = (type: string, id: string): string => {
  return `${CLOUDINARY_BASE_URL}${id}`;
};
