"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { VendorProfile } from "@/types/budget";
import {
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  Users,
} from "lucide-react";

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
  onRequestProposal,
}: VendorProfileDialogProps) => {
  if (!vendor) return null;

  const getPriceRangeColor = (range: string) => {
    switch (range) {
      case "budget":
        return "bg-green-100 text-green-800";
      case "mid-range":
        return "bg-blue-100 text-blue-800";
      case "premium":
        return "bg-purple-100 text-purple-800";
      case "luxury":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="text-2xl font-bold">{vendor.name}</div>
            {vendor.verified && (
              <Badge className="bg-green-600 text-white">
                <CheckCircle className="mr-1 h-3 w-3" />
                Verified
              </Badge>
            )}
            <Badge className={getPriceRangeColor(vendor.priceRange)}>
              {vendor.priceRange}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Stats */}
          <div className="grid grid-cols-4 gap-4 rounded-lg bg-gray-50 p-4">
            <div className="text-center">
              <div className="mb-1 flex items-center justify-center gap-1">
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <span className="text-lg font-bold">{vendor.rating}</span>
              </div>
              <p className="text-sm text-gray-600">
                {vendor.reviewCount} reviews
              </p>
            </div>
            <div className="text-center">
              <div className="mb-1 flex items-center justify-center gap-1">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-lg font-bold">
                  {vendor.completedEvents}
                </span>
              </div>
              <p className="text-sm text-gray-600">Events completed</p>
            </div>
            <div className="text-center">
              <div className="mb-1 flex items-center justify-center gap-1">
                <Clock className="h-5 w-5 text-green-600" />
                <span className="text-lg font-bold">{vendor.responseTime}</span>
              </div>
              <p className="text-sm text-gray-600">Response time</p>
            </div>
            <div className="text-center">
              <div className="mb-1 flex items-center justify-center gap-1">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span className="text-lg font-bold">
                  {vendor.yearEstablished}
                </span>
              </div>
              <p className="text-sm text-gray-600">Established</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* About & Contact */}
            <div className="space-y-4">
              <div>
                <h3 className="mb-3 text-lg font-semibold">About</h3>
                <p className="mb-4 text-gray-700">{vendor.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>Team of {vendor.teamSize}</span>
                  </div>
                  {vendor.insurance && (
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">Insured & Bonded</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold">
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{vendor.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{vendor.contact.email}</span>
                  </div>
                  {vendor.contact.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span className="text-blue-600">
                        {vendor.contact.website}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Portfolio */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">Portfolio</h3>
              {vendor.portfolio.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {vendor.portfolio.slice(0, 6).map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square overflow-hidden rounded-lg bg-gray-100"
                    >
                      <img
                        src={`/placeholder.svg?height=150&width=150&text=${image}`}
                        alt={`Portfolio ${index + 1}`}
                        className="h-full w-full object-cover"
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
            <h3 className="mb-3 text-lg font-semibold">
              Services & Specialties
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="mb-2 font-medium">Services Offered</h4>
                <div className="flex flex-wrap gap-2">
                  {vendor.services.map((service, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-2 font-medium">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {vendor.specialties.map((specialty, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-blue-50 text-xs text-blue-700"
                    >
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
              <h3 className="mb-3 text-lg font-semibold">Credentials</h3>
              <div className="grid grid-cols-2 gap-4">
                {vendor.certifications.length > 0 && (
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                      <Shield className="h-4 w-4 text-green-600" />
                      Certifications
                    </h4>
                    <ul className="space-y-1">
                      {vendor.certifications.map((cert, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-700"
                        >
                          • {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {vendor.awards.length > 0 && (
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                      <Award className="h-4 w-4 text-amber-600" />
                      Awards & Recognition
                    </h4>
                    <ul className="space-y-1">
                      {vendor.awards.map((award, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-700"
                        >
                          • {award}
                        </li>
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
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
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
