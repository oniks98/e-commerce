export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');

  if (!digits) return '';

  let formatted = '+38';

  if (digits.length > 2) {
    formatted += ` (${digits.slice(2, 5)}`;
  }

  if (digits.length > 5) {
    formatted += `) ${digits.slice(5, 8)}`;
  }

  if (digits.length > 8) {
    formatted += `-${digits.slice(8, 10)}`;
  }

  if (digits.length > 10) {
    formatted += `-${digits.slice(10, 12)}`;
  }

  return formatted;
};

export const parsePhoneNumber = (formatted: string): string => {
  return formatted.replace(/\D/g, '');
};
