import { Product } from "@/sanity.types";

export const formatISODate = (isoDate: string = new Date().toISOString()) => {
  return new Date(isoDate).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: 'numeric',
    // minute: 'numeric',
    // second: 'numeric',
    // hour12: true, // For AM/PM format
  });
}

export const formatProductDescription = (description: Product['description']): string => {
  return description
    ?.map((block) =>
      block._type == 'block'
        ? block.children?.map((child) => child.text).join("")
        : ''
    )
    ?.join(" ") || 'No description available'
}

export const capitalizeFirstLetter = (word?: string) => {
  if (!word) return ''; // Handle empty or undefined strings
  return word.charAt(0).toUpperCase() + word.slice(1);
}

type FormatPriceOptions = {
  locale?: string; // e.g., 'en-US', 'de-DE'
  currency?: string; // e.g., 'USD', 'EUR'
  minimumFractionDigits?: number; // Minimum decimal places
  maximumFractionDigits?: number; // Maximum decimal places
  style?: 'currency' | 'decimal'; // Format style
};

export const formatPrice = (value: string | number, options: FormatPriceOptions = {}): string => {
  const {
    locale = 'en-US', // Default locale
    currency = 'USD', // Default currency
    minimumFractionDigits = 2, // Default minimum decimal places
    maximumFractionDigits = 2, // Default maximum decimal places
    style = 'currency', // Default style
  } = options;

  // Ensure the value is a number
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numericValue)) {
    throw new Error(`Invalid number: "${value}"`);
  }

  return new Intl.NumberFormat(locale, {
    style,
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(numericValue);
}
