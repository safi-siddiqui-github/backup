
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  MessageSquare,
  FileText,
  User,
  Heart,
  TrendingUp
} from "lucide-react";
import type { VendorProfile } from "@/types/budget";

interface ModernVendorCardProps {
  vendor: VendorProfile;
  onContactVendor: (vendorId: string) => void;
  onRequestProposal: (vendorId: string) => void;
  onViewProfile: (vendorId: string) => void;
}

const ModernVendorCard = ({ vendor, onContactVendor, onRequestProposal, onViewProfile }: ModernVendorCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullImage, setShowFullImage] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % vendor.portfolio.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + vendor.portfolio.length) % vendor.portfolio.length);
  };

  const getPriceRangeDisplay = (range: string) => {
    switch (range) {
      case 'budget': return '$';
      case 'mid-range': return '$$';
      case 'premium': return '$$$';
      case 'luxury': return '$$$$';
      default: return range;
    }
  };

  const getBadgeConfig = (badge?: 'top-rated' | 'host-favorite' | 'rising-star') => {
    if (!badge) return null;
    switch (badge) {
      case 'top-rated':
        return { label: 'Top Rated', icon: Star, className: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
      case 'host-favorite':
        return { label: "Host's Favorite", icon: Heart, className: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'rising-star':
        return { label: 'Rising Star', icon: TrendingUp, className: 'bg-green-100 text-green-800 border-green-300' };
    }
  };

  const badgeConfig = getBadgeConfig(vendor.badge);

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
      <div className="relative h-48 bg-gray-100">
        {vendor.portfolio.length > 0 ? (
          <>
            <img
              src={`/placeholder.svg?height=200&width=400&text=${vendor.portfolio[currentImageIndex]}`}
              alt={`${vendor.name} portfolio ${currentImageIndex + 1}`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setShowFullImage(true)}
            />
            {vendor.portfolio.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {vendor.portfolio.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
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
              <Eye className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No portfolio images
          </div>
        )}
        
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {vendor.verified && (
            <Badge className="bg-green-600 text-white">
              Verified
            </Badge>
          )}
          {badgeConfig && (
            <Badge className={`${badgeConfig.className} border flex items-center gap-1`}>
              <badgeConfig.icon className="w-3 h-3" />
              {badgeConfig.label}
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 
              className="text-xl font-bold text-gray-900 mb-1 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => onViewProfile(vendor.id)}
            >
              {vendor.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4" />
              {vendor.location}
            </div>
          </div>
          <Badge variant="outline" className="font-semibold">
            {getPriceRangeDisplay(vendor.priceRange)}
          </Badge>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{vendor.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-medium">{vendor.rating}</span>
            <span className="text-sm text-gray-500">({vendor.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            {vendor.responseTime}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>{vendor.completedEvents} events</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-600" />
            <span>Est. {vendor.yearEstablished}</span>
          </div>
        </div>

        {vendor.specialties && vendor.specialties.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {vendor.specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {vendor.specialties.length > 3 && (
              <Badge variant="outline" className="text-xs">
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
            <User className="w-4 h-4 mr-2" />
            View Profile
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onContactVendor(vendor.id)}
            className="flex-1"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact
          </Button>
        </div>
      </CardContent>

      {/* Full Image Viewer */}
      <Dialog open={showFullImage} onOpenChange={setShowFullImage}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{vendor.name} - Portfolio</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <img
              src={`/placeholder.svg?height=600&width=800&text=${vendor.portfolio[currentImageIndex]}`}
              alt={`${vendor.name} portfolio ${currentImageIndex + 1}`}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            {vendor.portfolio.length > 1 && (
              <div className="flex justify-between items-center mt-4">
                <Button variant="outline" onClick={prevImage}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  {currentImageIndex + 1} of {vendor.portfolio.length}
                </span>
                <Button variant="outline" onClick={nextImage}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
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
