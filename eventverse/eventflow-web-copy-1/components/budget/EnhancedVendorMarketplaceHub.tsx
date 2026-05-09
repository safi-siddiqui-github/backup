"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { VendorProfile } from "@/types/budget";
import { Filter, Grid, List, Search } from "lucide-react";
import { useState } from "react";
import type { BudgetExpenseItem } from "./ComprehensiveBudgetModule";
import ModernVendorCard from "./ModernVendorCard";
import ProposalRequestDialog, {
  ProposalRequestData,
} from "./ProposalRequestDialog";
import VendorProfileDialog from "./VendorProfileDialog";

interface EnhancedVendorMarketplaceHubProps {
  expenseItems: BudgetExpenseItem[];
  vendors: VendorProfile[];
  onContactVendor: (vendorId: string, message: string) => void;
  onRequestProposal: (requestData: ProposalRequestData) => void;
}

const EnhancedVendorMarketplaceHub = ({
  expenseItems,
  vendors,
  onContactVendor,
  onRequestProposal,
}: EnhancedVendorMarketplaceHubProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedVendor, setSelectedVendor] = useState<VendorProfile | null>(
    null,
  );
  const [selectedExpenseItem, setSelectedExpenseItem] =
    useState<BudgetExpenseItem | null>(null);
  const [showProposalRequest, setShowProposalRequest] = useState(false);
  const [showVendorProfile, setShowVendorProfile] = useState(false);

  // Filter vendors based on search and filters
  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.services.some((service) =>
        service.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "all" || vendor.category === selectedCategory;
    const matchesPriceRange =
      selectedPriceRange === "all" || vendor.priceRange === selectedPriceRange;
    const matchesLocation =
      selectedLocation === "all" || vendor.location.includes(selectedLocation);

    return (
      matchesSearch && matchesCategory && matchesPriceRange && matchesLocation
    );
  });

  // Get unique categories, price ranges, and locations for filters
  const categories = Array.from(new Set(vendors.map((v) => v.category)));
  const priceRanges = Array.from(new Set(vendors.map((v) => v.priceRange)));
  const locations = Array.from(
    new Set(vendors.map((v) => v.location.split(",")[1]?.trim() || v.location)),
  );

  const handleRequestProposal = (vendorId: string) => {
    const vendor = vendors.find((v) => v.id === vendorId);
    if (vendor && expenseItems.length > 0) {
      setSelectedVendor(vendor);
      setSelectedExpenseItem(expenseItems[0]); // Default to first item, user can change
      setShowProposalRequest(true);
    }
  };

  const handleContactVendor = (vendorId: string) => {
    onContactVendor(
      vendorId,
      `Hi, I'm interested in your services for my ${expenseItems[0]?.category || "event"}.`,
    );
  };

  const handleViewProfile = (vendorId: string) => {
    const vendor = vendors.find((v) => v.id === vendorId);
    if (vendor) {
      setSelectedVendor(vendor);
      setShowVendorProfile(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Vendor Marketplace</span>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  placeholder="Search vendors, services, or specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedPriceRange}
              onValueChange={setSelectedPriceRange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                {priceRanges.map((range) => (
                  <SelectItem
                    key={range}
                    value={range}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem
                    key={location}
                    value={location}
                  >
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredVendors.length} vendors found
            </p>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                Filters:{" "}
                {
                  [
                    selectedCategory,
                    selectedPriceRange,
                    selectedLocation,
                  ].filter((f) => f !== "all").length
                }{" "}
                active
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendors Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            : "space-y-4"
        }
      >
        {filteredVendors.map((vendor) => (
          <ModernVendorCard
            key={vendor.id}
            vendor={vendor}
            onContactVendor={handleContactVendor}
            onRequestProposal={handleRequestProposal}
            onViewProfile={handleViewProfile}
          />
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <div className="py-12 text-center">
          <Search className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <h3 className="mb-2 text-lg font-medium text-gray-600">
            No vendors found
          </h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}

      {/* Proposal Request Dialog */}
      <ProposalRequestDialog
        open={showProposalRequest}
        onOpenChange={setShowProposalRequest}
        vendor={selectedVendor}
        expenseItem={selectedExpenseItem}
        onSubmit={onRequestProposal}
      />

      {/* Vendor Profile Dialog */}
      <VendorProfileDialog
        open={showVendorProfile}
        onOpenChange={setShowVendorProfile}
        vendor={selectedVendor}
        onContactVendor={handleContactVendor}
        onRequestProposal={handleRequestProposal}
      />
    </div>
  );
};

export default EnhancedVendorMarketplaceHub;
