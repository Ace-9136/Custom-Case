import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number, locale = "en-US", currency = "USD") => {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    });

    return formatter.format(price);
  } catch (error) {
    console.error("Error formatting price:", error);
    // Handle formatting errors gracefully (optional)
    // You can return a default value (e.g., "NA") or a fallback format.
    return "NA"; // Example default value
  }
};


