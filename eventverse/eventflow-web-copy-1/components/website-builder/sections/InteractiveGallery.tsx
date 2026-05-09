"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  X,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface InteractiveGalleryProps {
  title?: string;
  description?: string;
  images?: string[];
  style?: React.CSSProperties;
}

const defaultImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop",
];

export const InteractiveGallery = ({
  title = "Photo Gallery",
  description = "Explore our event highlights",
  images = defaultImages,
  style,
}: InteractiveGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, images.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.max(1, images.length - 2)) %
        Math.max(1, images.length - 2),
    );
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = images[lightboxIndex];
    link.download = `image-${lightboxIndex + 1}.jpg`;
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this photo!",
          url: images[lightboxIndex],
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(images[lightboxIndex]);
    }
  };

  if (images.length === 0) {
    return (
      <section
        style={style}
        className="px-4 py-16"
      >
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="mb-4 text-3xl font-bold">{title}</h2>
          <p className="text-muted-foreground">No images to display</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        style={style}
        className="px-4 py-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">{title}</h2>
            {description && (
              <p className="text-muted-foreground text-lg">{description}</p>
            )}
          </div>

          {/* Main Slideshow */}
          <div className="relative mb-8">
            <div className="bg-muted aspect-video overflow-hidden rounded-xl">
              {images.length > 0 && (
                <div className="relative h-full w-full">
                  {/* <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="h-full w-full cursor-pointer object-cover transition-transform hover:scale-105"
                    onClick={() => openLightbox(currentIndex)}
                  /> */}
                  <Image
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="h-full w-full cursor-pointer object-cover transition-transform hover:scale-105"
                    onClick={() => openLightbox(currentIndex)}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors hover:bg-black/10 hover:opacity-100">
                    <ZoomIn className="h-12 w-12 text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-1/2 left-4 -translate-y-1/2 transform border-0 bg-black/20 text-white hover:bg-black/40"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-1/2 right-4 -translate-y-1/2 transform border-0 bg-black/20 text-white hover:bg-black/40"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Slide indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
                {images.slice(0, Math.min(images.length, 5)).map((_, index) => (
                  <button
                    key={index}
                    className={`h-3 w-3 rounded-full transition-colors ${
                      index === currentIndex ? "bg-white" : "bg-white/50"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    index === currentIndex
                      ? "border-primary ring-primary/20 ring-2"
                      : "hover:border-primary/50 border-transparent"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  {/* <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  /> */}
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog
        open={isLightboxOpen}
        onOpenChange={setIsLightboxOpen}
      >
        <DialogContent className="h-full max-h-screen w-full max-w-7xl bg-black/95 p-0">
          <div className="relative flex h-full w-full items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Action buttons */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={handleDownload}
              >
                <Download className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Main image */}
            {/* <img
              src={images[lightboxIndex]}
              alt={`Image ${lightboxIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            /> */}
            <Image
              src={images[lightboxIndex]}
              alt={`Image ${lightboxIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />

            {/* Navigation in lightbox */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 left-4 -translate-y-1/2 transform text-white hover:bg-white/10"
                  onClick={prevLightboxImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-4 -translate-y-1/2 transform text-white hover:bg-white/10"
                  onClick={nextLightboxImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-full bg-black/50 px-3 py-1 text-sm text-white">
              {lightboxIndex + 1} of {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
