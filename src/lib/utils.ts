import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next";
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

export function constructMetadata(
  {title="CustomCase - custom high-quality phone cases",
  description="Create custom high-quality phone cases in seconds",
  image="/thumbnail.png",
  icons = 'favicon.ico',}:{
    title?:string
    description?:string
    image?:string
    icons?:string
  }={}):Metadata
{
  return {
    title,
    description,
    openGraph:{
      title, 
      description,
      images:[{url:image}],
    },
    twitter:{
      card:"summary_large_image",
      title,
      description,
      images:[{url:image}],
    },
    icons,
    metadataBase:new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}`)
  }
}