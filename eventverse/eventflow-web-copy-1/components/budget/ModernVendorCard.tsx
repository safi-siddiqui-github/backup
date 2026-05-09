"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { VendorProfile } from "@/types/budget";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  FileText,
  MapPin,
  MessageSquare,
  Star,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

interface ModernVendorCardProps {
  vendor: VendorProfile;
  onContactVendor: (vendorId: string) => void;
  onRequestProposal: (vendorId: string) => void;
  onViewProfile: (vendorId: string) => void;
}

const ModernVendorCard = ({
  vendor,
  onContactVendor,
  onRequestProposal,
  onViewProfile,
}: ModernVendorCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullImage, setShowFullImage] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % vendor.portfolio.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + vendor.portfolio.length) % vendor.portfolio.length,
    );
  };

  const getPriceRangeColor = (range: string) => {
    switch (range) {
      case "budget":
        return "bg-green-100 text-green-800";
      case "mid-range":
        return "bg-blue-100 text-blue-800";
      case "premium":
        return "bg-purple-100 text-purple-800";
      case "luxury":
        return "bg-gold-100 text-gold-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="overflow-hidden border-2 transition-all duration-300 hover:border-blue-200 hover:shadow-xl">
      <div className="relative h-48 bg-gray-100">
        {vendor.portfolio.length > 0 ? (
          <>
            <img
              src={`/placeholder.svg?height=200&width=400&text=${vendor.portfolio[currentImageIndex]}`}
              alt={`${vendor.name} portfolio ${currentImageIndex + 1}`}
              className="h-full w-full cursor-pointer object-cover"
              onClick={() => setShowFullImage(true)}
            />
            {vendor.portfolio.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-1/2 left-2 -translate-y-1/2 transform bg-black/50 text-white hover:bg-black/70"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-1/2 right-2 -translate-y-1/2 transform bg-black/50 text-white hover:bg-black/70"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform gap-1">
                  {vendor.portfolio.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 cursor-pointer rounded-full transition-all ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
              onClick={() => setShowFullImage(true)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No portfolio images
          </div>
        )}

        {vendor.verified && (
          <Badge className="absolute top-2 left-2 bg-green-600 text-white">
            Verified
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1">
            <h3
              className="mb-1 cursor-pointer text-xl font-bold text-gray-900 transition-colors hover:text-blue-600"
              onClick={() => onViewProfile(vendor.id)}
            >
              {vendor.name}
            </h3>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              {vendor.location}
            </div>
          </div>
          <Badge className={getPriceRangeColor(vendor.priceRange)}>
            {vendor.priceRange}
          </Badge>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {vendor.description}
        </p>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current text-yellow-500" />
            <span className="font-medium">{vendor.rating}</span>
            <span className="text-sm text-gray-500">
              ({vendor.reviewCount})
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            {vendor.responseTime}
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span>{vendor.completedEvents} events</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-purple-600" />
            <span>Est. {vendor.yearEstablished}</span>
          </div>
        </div>

        {vendor.specialties && vendor.specialties.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1">
            {vendor.specialties.slice(0, 3).map((specialty, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs"
              >
                {specialty}
              </Badge>
            ))}
            {vendor.specialties.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs"
              >
                +{vendor.specialties.length - 3} more
              </Badge>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewProfile(vendor.id)}
            className="flex-1"
          >
            <User className="mr-2 h-4 w-4" />
            View Profile
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onContactVendor(vendor.id)}
            className="flex-1"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact
          </Button>
          <Button
            size="sm"
            onClick={() => onRequestProposal(vendor.id)}
            className="flex-1"
          >
            <FileText className="mr-2 h-4 w-4" />
            Quote
          </Button>
        </div>
      </CardContent>

      {/* Full Image Viewer */}
      <Dialog
        open={showFullImage}
        onOpenChange={setShowFullImage}
      >
        <DialogContent className="max-h-[90vh] max-w-4xl">
          <DialogHeader>
            <DialogTitle>{vendor.name} - Portfolio</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <img
              src={`/placeholder.svg?height=600&width=800&text=${vendor.portfolio[currentImageIndex]}`}
              alt={`${vendor.name} portfolio ${currentImageIndex + 1}`}
              className="h-auto max-h-[70vh] w-full object-contain"
            />
            {vendor.portfolio.length > 1 && (
              <div className="mt-4 flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={prevImage}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  {currentImageIndex + 1} of {vendor.portfolio.length}
                </span>
                <Button
                  variant="outline"
                  onClick={nextImage}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ModernVendorCard;
