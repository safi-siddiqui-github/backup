"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  Briefcase,
  Calendar,
  Clock,
  Eye,
  MapPin,
  MessageCircle,
  Search,
  Send,
  Star,
} from "lucide-react";
import { useState } from "react";
import type {
  EventBudgetCategory,
  VendorProfile,
  VendorProposal,
} from "../../types/budget";

interface Props {
  categories: EventBudgetCategory[];
  vendors: VendorProfile[];
  proposals: VendorProposal[];
  onInviteVendor: (vendorId: string, categoryId: string) => void;
  onViewProposal: (proposal: VendorProposal) => void;
}

const MOCK_VENDORS: VendorProfile[] = [
  {
    id: "vendor-1",
    name: "Elite Catering Solutions",
    category: "Catering",
    subcategories: ["Full Service Catering", "Bar Service", "Desserts"],
    description:
      "Premium catering service specializing in elegant events with farm-to-table ingredients.",
    location: "New York, NY",
    contact: {
      email: "info@elitecatering.com",
      phone: "+1-555-0123",
      website: "www.elitecatering.com",
    },
    rating: 4.8,
    reviewCount: 127,
    portfolio: ["wedding1.jpg", "corporate1.jpg", "party1.jpg"],
    services: ["Menu Planning", "Setup", "Service", "Cleanup"],
    priceRange: "premium",
    availability: {
      busy: [],
      available: [],
    },
    verified: true,
    responseTime: "Within 2 hours",
    completedEvents: 150,
    certifications: ["Food Safety Certified", "Licensed Caterer"],
    insurance: true,
    specialties: ["Wedding Catering", "Corporate Events", "Private Parties"],
    yearEstablished: 2010,
    teamSize: 15,
    awards: ["Best Caterer 2023", "Customer Choice Award"],
  },
  {
    id: "vendor-2",
    name: "Grand Ballroom Events",
    category: "Venue",
    subcategories: ["Reception Halls", "Ceremony Spaces", "Outdoor Venues"],
    description:
      "Stunning event venues with full-service event planning and coordination.",
    location: "Los Angeles, CA",
    contact: {
      email: "bookings@grandballroom.com",
      phone: "+1-555-0456",
    },
    rating: 4.9,
    reviewCount: 89,
    portfolio: ["venue1.jpg", "venue2.jpg"],
    services: ["Venue Rental", "Setup", "Coordination", "Catering Kitchen"],
    priceRange: "luxury",
    availability: {
      busy: [],
      available: [],
    },
    verified: true,
    responseTime: "Within 1 hour",
    completedEvents: 200,
    certifications: ["Licensed Venue", "Event Planning Certified"],
    insurance: true,
    specialties: ["Weddings", "Corporate Events", "Galas"],
    yearEstablished: 2005,
    teamSize: 25,
    awards: ["Best Venue 2022", "Excellence in Service Award"],
  },
];

const VendorMarketplace = ({
  categories,
  vendors = MOCK_VENDORS,
  proposals,
  onInviteVendor,
  onViewProposal,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedVendor, setSelectedVendor] = useState<VendorProfile | null>(
    null,
  );

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || vendor.category === selectedCategory;
    const matchesPrice =
      priceFilter === "all" || vendor.priceRange === priceFilter;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  const getPriceRangeBadge = (priceRange: string) => {
    const colors = {
      budget: "bg-green-100 text-green-800",
      "mid-range": "bg-blue-100 text-blue-800",
      premium: "bg-purple-100 text-purple-800",
      luxury: "bg-yellow-100 text-yellow-800",
    };

    return (
      <Badge className={colors[priceRange as keyof typeof colors]}>
        {priceRange.charAt(0).toUpperCase() + priceRange.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-600" />
            Vendor Marketplace
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.name}
                  >
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={priceFilter}
              onValueChange={setPriceFilter}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="mid-range">Mid-Range</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs
        defaultValue="vendors"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vendors">Browse Vendors</TabsTrigger>
          <TabsTrigger value="proposals">
            Proposals ({proposals.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="vendors"
          className="space-y-4"
        >
          <div className="grid gap-4">
            {filteredVendors.map((vendor) => (
              <Card
                key={vendor.id}
                className="cursor-pointer transition-shadow hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-xl font-bold">{vendor.name}</h3>
                        {vendor.verified && (
                          <Badge
                            variant="outline"
                            className="border-green-600 text-green-600"
                          >
                            <Award className="mr-1 h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                        {getPriceRangeBadge(vendor.priceRange)}
                      </div>

                      <div className="mb-3 flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {getRatingStars(vendor.rating)}
                          <span className="text-sm text-gray-600">
                            {vendor.rating} ({vendor.reviewCount} reviews)
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="h-3 w-3" />
                          {vendor.location}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="h-3 w-3" />
                          Responds {vendor.responseTime}
                        </div>
                      </div>

                      <p className="mb-3 text-gray-600">{vendor.description}</p>

                      <div className="mb-3 flex flex-wrap gap-2">
                        {vendor.services.slice(0, 3).map((service) => (
                          <Badge
                            key={service}
                            variant="secondary"
                          >
                            {service}
                          </Badge>
                        ))}
                        {vendor.services.length > 3 && (
                          <Badge variant="outline">
                            +{vendor.services.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="text-sm text-gray-600">
                        <Calendar className="mr-1 inline h-3 w-3" />
                        {vendor.completedEvents} events completed
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{vendor.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="mb-2 font-medium">
                                  Contact Information
                                </h4>
                                <div className="space-y-1 text-sm">
                                  <p>{vendor.contact.email}</p>
                                  <p>{vendor.contact.phone}</p>
                                  {vendor.contact.website && (
                                    <p className="text-blue-600">
                                      {vendor.contact.website}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div>
                                <h4 className="mb-2 font-medium">Services</h4>
                                <div className="flex flex-wrap gap-1">
                                  {vendor.services.map((service) => (
                                    <Badge
                                      key={service}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {service}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="mb-2 font-medium">Description</h4>
                              <p className="text-sm text-gray-600">
                                {vendor.description}
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Select
                        onValueChange={(categoryId) =>
                          onInviteVendor(vendor.id, categoryId)
                        }
                      >
                        <SelectTrigger>
                          <Send className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Invite for..." />
                        </SelectTrigger>
                        <SelectContent>
                          {categories
                            .filter((cat) => cat.name === vendor.category)
                            .map((cat) => (
                              <SelectItem
                                key={cat.id}
                                value={cat.id}
                              >
                                {cat.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="proposals"
          className="space-y-4"
        >
          {proposals.length > 0 ? (
            proposals.map((proposal) => (
              <Card
                key={proposal.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{proposal.title}</h3>
                      <p className="text-gray-600">{proposal.description}</p>
                      <div className="mt-2 flex items-center gap-4">
                        <Badge
                          variant={
                            proposal.status === "pending"
                              ? "secondary"
                              : proposal.status === "accepted"
                                ? "default"
                                : proposal.status === "negotiating"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {proposal.status.charAt(0).toUpperCase() +
                            proposal.status.slice(1)}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          Valid until {proposal.validUntil.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        ${proposal.totalAmount.toLocaleString()}
                      </div>
                      <Button
                        onClick={() => onViewProposal(proposal)}
                        className="mt-2"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="py-12 text-center">
              <MessageCircle className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2 text-lg font-medium text-gray-600">
                No proposals yet
              </h3>
              <p className="text-gray-500">
                Invite vendors to receive proposals for your event
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorMarketplace;
