
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  Calendar,
  Shield,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  TrendingUp,
  Sparkles
} from "lucide-react";
import type { VendorProfile } from "@/types/budget";

interface VendorProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vendor: VendorProfile | null;
  onContactVendor: (vendorId: string) => void;
  onRequestProposal: (vendorId: string) => void;
}

const VendorProfileDialog = ({ 
  open, 
  onOpenChange, 
  vendor, 
  onContactVendor, 
  onRequestProposal 
}: VendorProfileDialogProps) => {
  if (!vendor) return null;

  const getPriceRangeColor = (range: string) => {
    switch (range) {
      case 'budget': return 'bg-green-100 text-green-800';
      case 'mid-range': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'luxury': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 flex-wrap">
            <div className="text-2xl font-bold">{vendor.name}</div>
            {vendor.verified && (
              <Badge className="bg-green-600 text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
            {vendor.sponsored && vendor.sponsoredUntil && vendor.sponsoredUntil > new Date() && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                Featured Partner
              </Badge>
            )}
            <Badge className={getPriceRangeColor(vendor.priceRange)}>
              {vendor.priceRange}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Stats */}
          <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-bold text-lg">{vendor.rating}</span>
              </div>
              <p className="text-sm text-gray-600">{vendor.reviewCount} reviews</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-lg">{vendor.completedEvents}</span>
              </div>
              <p className="text-sm text-gray-600">Events completed</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="font-bold text-lg">{vendor.responseTime}</span>
              </div>
              <p className="text-sm text-gray-600">Response time</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-lg">{vendor.yearEstablished}</span>
              </div>
              <p className="text-sm text-gray-600">Established</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* About & Contact */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">About</h3>
                <p className="text-gray-700 mb-4">{vendor.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>Team of {vendor.teamSize}</span>
                  </div>
                  {vendor.insurance && (
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-green-600">Insured & Bonded</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{vendor.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{vendor.contact.email}</span>
                  </div>
                  {vendor.contact.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <span className="text-blue-600">{vendor.contact.website}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Portfolio */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Portfolio</h3>
              {vendor.portfolio.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {vendor.portfolio.slice(0, 6).map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={`/placeholder.svg?height=150&width=150&text=${image}`}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No portfolio images available</p>
              )}
            </div>
          </div>

          {/* Services & Specialties */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Services & Specialties</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Services Offered</h4>
                <div className="flex flex-wrap gap-2">
                  {vendor.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {vendor.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Certifications & Awards */}
          {(vendor.certifications.length > 0 || vendor.awards.length > 0) && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Credentials</h3>
              <div className="grid grid-cols-2 gap-4">
                {vendor.certifications.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      Certifications
                    </h4>
                    <ul className="space-y-1">
                      {vendor.certifications.map((cert, index) => (
                        <li key={index} className="text-sm text-gray-700">• {cert}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {vendor.awards.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-600" />
                      Awards & Recognition
                    </h4>
                    <ul className="space-y-1">
                      {vendor.awards.map((award, index) => (
                        <li key={index} className="text-sm text-gray-700">• {award}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Close
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                onContactVendor(vendor.id);
                onOpenChange(false);
              }}
              className="flex-1"
            >
              Contact Vendor
            </Button>
            <Button 
              onClick={() => {
                onRequestProposal(vendor.id);
                onOpenChange(false);
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Request Proposal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VendorProfileDialog;
