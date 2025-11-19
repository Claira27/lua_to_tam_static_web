"use client";

import Image from "next/image";
import { useState } from "react";

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  keyword?: string;
  priority?: boolean;
}

export default function ImagePlaceholder({
  src,
  alt,
  width,
  height,
  className = "",
  keyword = "silk,fabric,luxury",
  priority = false,
}: ImagePlaceholderProps) {
  const [imageError, setImageError] = useState(false);

  // Use Unsplash placeholder if no src provided
  const placeholderSrc = src || `https://source.unsplash.com/${width}x${height}/?${keyword}`;

  return (
    <div className={`relative overflow-hidden bg-[var(--stone)] ${className}`}>
      {imageError ? (
        // Fallback gradient if image fails to load
        <div className="w-full h-full bg-gradient-to-br from-[var(--gold-light)] via-[var(--brown-light)] to-[var(--red-light)] opacity-70 flex items-center justify-center">
          <p className="text-[var(--brown-dark)] font-serif text-lg opacity-50">{alt}</p>
        </div>
      ) : (
        <Image
          src={placeholderSrc}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover ${className}`}
          onError={() => setImageError(true)}
          priority={priority}
          unoptimized // For external URLs
        />
      )}
    </div>
  );
}
