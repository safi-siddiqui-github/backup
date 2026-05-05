import Image from "next/image";
import React, { useState, useEffect } from "react";

type GalleryBlockData = {
  title: string;
  images: string[];
  bgColor: string;
  textColor: string;
};

type GalleryProps = {
  dndDisabled?: boolean;
  data?: GalleryBlockData;
};

export default function GalleryBlock({ dndDisabled = true, data }: GalleryProps) {
  const defaultImages = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=800&q=80",
  ];

  const images = data?.images?.length ? data.images : defaultImages;
  const title = data?.title || "Image Gallery";
  const bgColor =   "#ffffff";
  const textColor = data?.textColor || "#111827";

  const [current, setCurrent] = useState(0);

 
  useEffect(() => {
    if (typeof window !== "undefined") {
      images.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, [images]);

  return (
    <div
      onPointerDown={dndDisabled ? (e) => e.stopPropagation() : undefined}
      onClick={dndDisabled ? (e) => e.stopPropagation() : undefined}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {
        images.length === 0 && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            No images available.
          </div>
        )
      }

      {
        images.length > 0 && (
          <div className="mb-4 text-center text-3xl font-bold pt-3" style={{ color: textColor }}>
            <div dangerouslySetInnerHTML={{ __html: title }} />
          </div>
        )
      }

      {/* Main Image */}
      <div className="w-full h-[420px] overflow-hidden bg-gray-100">
        <Image
          alt={`Gallery Image ${current + 1}`}
          width={800}
          height={420}
          src={images[current]}
          className="w-full h-full object-cover transition-opacity duration-200"
        />
      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex flex-wrap gap-2">
        {images.map((src, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`overflow-hidden transition-all ${
              idx === current ? "border-blue-500 scale-105" : ""
            }`}
            style={{ width: 80, height: 60 }}
          >
            <Image
              alt={`Thumbnail ${idx + 1}`}
              width={80}
              height={60}
              src={src}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
