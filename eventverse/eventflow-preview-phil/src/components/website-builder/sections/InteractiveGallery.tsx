import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Download, Share2, ZoomIn } from "lucide-react";

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
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop"
];

export const InteractiveGallery = ({ 
  title = "Photo Gallery", 
  description = "Explore our event highlights",
  images = defaultImages,
  style 
}: InteractiveGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, images.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, images.length - 2)) % Math.max(1, images.length - 2));
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
    const link = document.createElement('a');
    link.href = images[lightboxIndex];
    link.download = `image-${lightboxIndex + 1}.jpg`;
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this photo!',
          url: images[lightboxIndex],
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(images[lightboxIndex]);
    }
  };

  if (images.length === 0) {
    return (
      <section style={style} className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground">No images to display</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section style={style} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </div>

          {/* Main Slideshow */}
          <div className="relative mb-8">
            <div className="aspect-video rounded-xl overflow-hidden bg-muted">
              {images.length > 0 && (
                <div className="relative w-full h-full">
                  <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full h-full object-cover cursor-pointer transition-transform hover:scale-105"
                    onClick={() => openLightbox(currentIndex)}
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                    <ZoomIn className="w-12 h-12 text-white" />
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
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0"
                  onClick={nextSlide}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}

            {/* Slide indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.slice(0, Math.min(images.length, 5)).map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-transparent hover:border-primary/50'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-7xl w-full h-full max-h-screen p-0 bg-black/95">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Action buttons */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={handleDownload}
              >
                <Download className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Main image */}
            <img
              src={images[lightboxIndex]}
              alt={`Image ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Navigation in lightbox */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10"
                  onClick={prevLightboxImage}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10"
                  onClick={nextLightboxImage}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
              {lightboxIndex + 1} of {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};