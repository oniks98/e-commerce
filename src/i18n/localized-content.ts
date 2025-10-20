import { type Locale } from './types';

/**
 * Type for localized JSON fields (name, slug, description)
 */
export type LocalizedJson = {
  [key in Locale]: string;
};

/**
 * Type guard to check if value is a localized JSON object
 */
function isLocalizedJson(value: unknown): value is LocalizedJson {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((v) => typeof v === 'string')
  );
}

/**
 * Safely extracts localized value from JSON field
 * @param value - Localized JSON object or string
 * @param locale - Current locale
 * @param fallback - Fallback value if translation not found
 * @returns Localized string value
 */
export function getLocalizedValue(
  value: unknown,
  locale: Locale,
  fallback: string = '',
): string {
  // If it's already a string, return it
  if (typeof value === 'string') {
    return value;
  }

  // If it's a valid localized object, extract the value
  if (isLocalizedJson(value)) {
    return value[locale] || value.en || fallback;
  }

  // Return fallback for any other case
  return fallback;
}
