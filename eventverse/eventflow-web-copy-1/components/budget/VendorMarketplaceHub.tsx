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
import type { VendorProfile } from "@/types/budget";
import {
  Award,
  Calendar,
  Clock,
  Eye,
  MapPin,
  MessageCircle,
  Search,
  Send,
  Star,
  Store,
  Users,
} from "lucide-react";
import { useState } from "react";
import type { BudgetExpenseItem } from "./ComprehensiveBudgetModule";

interface VendorMarketplaceHubProps {
  expenseItems: BudgetExpenseItem[];
  vendors: VendorProfile[];
  onContactVendor: (vendorId: string, message: string) => void;
  onRequestProposal: (vendorId: string, expenseItemId: string) => void;
}

const VendorMarketplaceHub = ({
  expenseItems,
  vendors,
  onContactVendor,
  onRequestProposal,
}: VendorMarketplaceHubProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedVendor, setSelectedVendor] = useState<VendorProfile | null>(
    null,
  );
  const [messageText, setMessageText] = useState("");

  const categories = [
    "all",
    ...Array.from(new Set(vendors.map((v) => v.category))),
  ];

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

  const handleSendMessage = () => {
    if (selectedVendor && messageText.trim()) {
      onContactVendor(selectedVendor.id, messageText);
      setMessageText("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Marketplace Header */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-600 p-2">
              <Store className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold">Vendor Marketplace</div>
              <div className="text-sm font-normal text-gray-600">
                Discover and connect with top-rated vendors for your event
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid grid-cols-4 gap-4">
            <div className="rounded-lg border bg-white p-3 text-center">
              <Users className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <div className="font-semibold">{vendors.length}</div>
              <div className="text-sm text-gray-600">Available Vendors</div>
            </div>
            <div className="rounded-lg border bg-white p-3 text-center">
              <Award className="mx-auto mb-2 h-6 w-6 text-green-600" />
              <div className="font-semibold">
                {vendors.filter((v) => v.verified).length}
              </div>
              <div className="text-sm text-gray-600">Verified Vendors</div>
            </div>
            <div className="rounded-lg border bg-white p-3 text-center">
              <Star className="mx-auto mb-2 h-6 w-6 text-yellow-600" />
              <div className="font-semibold">4.7</div>
              <div className="text-sm text-gray-600">Avg. Rating</div>
            </div>
            <div className="rounded-lg border bg-white p-3 text-center">
              <Calendar className="mx-auto mb-2 h-6 w-6 text-purple-600" />
              <div className="font-semibold">{categories.length - 1}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search vendors by name or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem
                    key={cat}
                    value={cat}
                  >
                    {cat === "all" ? "All Categories" : cat}
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

      {/* Vendor Grid */}
      <div className="grid gap-6">
        {filteredVendors.map((vendor) => (
          <Card
            key={vendor.id}
            className="border-l-4 border-l-blue-500 transition-all duration-300 hover:shadow-lg"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-3">
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
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700"
                    >
                      {vendor.category}
                    </Badge>
                  </div>

                  <div className="mb-3 flex items-center gap-6">
                    <div className="flex items-center gap-1">
                      {getRatingStars(vendor.rating)}
                      <span className="ml-2 text-sm text-gray-600">
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

                  <p className="mb-4 text-gray-600">{vendor.description}</p>

                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex flex-wrap gap-2">
                      {vendor.specialties.slice(0, 3).map((specialty) => (
                        <Badge
                          key={specialty}
                          variant="secondary"
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
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Experience:</span>
                      <div className="font-medium">
                        {new Date().getFullYear() - vendor.yearEstablished}{" "}
                        years
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Team Size:</span>
                      <div className="font-medium">
                        {vendor.teamSize} members
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Events:</span>
                      <div className="font-medium">
                        {vendor.completedEvents} completed
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-6 flex flex-col gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedVendor(vendor)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          {vendor.name}
                          {vendor.verified && (
                            <Badge
                              variant="outline"
                              className="text-green-600"
                            >
                              <Award className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h4 className="mb-3 font-medium">
                              Contact Information
                            </h4>
                            <div className="space-y-2 text-sm">
                              <p>
                                <strong>Email:</strong> {vendor.contact.email}
                              </p>
                              <p>
                                <strong>Phone:</strong> {vendor.contact.phone}
                              </p>
                              {vendor.contact.website && (
                                <p>
                                  <strong>Website:</strong>
                                  <a
                                    href={vendor.contact.website}
                                    className="ml-1 text-blue-600"
                                  >
                                    {vendor.contact.website}
                                  </a>
                                </p>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="mb-3 font-medium">
                              Business Details
                            </h4>
                            <div className="space-y-2 text-sm">
                              <p>
                                <strong>Established:</strong>{" "}
                                {vendor.yearEstablished}
                              </p>
                              <p>
                                <strong>Team Size:</strong> {vendor.teamSize}{" "}
                                members
                              </p>
                              <p>
                                <strong>Completed Events:</strong>{" "}
                                {vendor.completedEvents}
                              </p>
                              <p>
                                <strong>Insurance:</strong>{" "}
                                {vendor.insurance ? "Yes" : "No"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="mb-3 font-medium">
                            Services & Specialties
                          </h4>
                          <div className="flex flex-wrap gap-2">
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
                          <div className="mt-3 flex flex-wrap gap-2">
                            {vendor.specialties.map((specialty) => (
                              <Badge
                                key={specialty}
                                variant="secondary"
                                className="text-xs"
                              >
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {vendor.awards.length > 0 && (
                          <div>
                            <h4 className="mb-3 font-medium">
                              Awards & Recognition
                            </h4>
                            <div className="space-y-2">
                              {vendor.awards.map((award, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <Award className="h-4 w-4 text-yellow-500" />
                                  <span className="text-sm">{award}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <h4 className="mb-3 font-medium">Send Message</h4>
                          <div className="space-y-3">
                            <textarea
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                              placeholder="Send a message to this vendor..."
                              className="w-full resize-none rounded-lg border p-3"
                              rows={4}
                            />
                            <Button
                              onClick={handleSendMessage}
                              className="w-full"
                            >
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Select
                    onValueChange={(expenseItemId) =>
                      onRequestProposal(vendor.id, expenseItemId)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Request Proposal" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseItems
                        .filter((item) => item.category === vendor.category)
                        .map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.id}
                          >
                            {item.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <Button variant="outline">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <div className="py-12 text-center">
          <Store className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <h3 className="mb-2 text-lg font-medium text-gray-600">
            No vendors found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default VendorMarketplaceHub;
