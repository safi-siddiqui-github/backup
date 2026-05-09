import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Search, Grid, List, Filter, SlidersHorizontal } from "lucide-react";
import type { BudgetExpenseItem } from "./ComprehensiveBudgetModule";
import type { VendorProfile } from "@/types/budget";
import ModernVendorCard from "./ModernVendorCard";
import ProposalRequestDialog, { ProposalRequestData } from "./ProposalRequestDialog";
import VendorProfileDialog from "./VendorProfileDialog";
import MarketplaceFilterSidebar, { MarketplaceFilters } from "./MarketplaceFilterSidebar";
import RecommendedVendorsSection from "./RecommendedVendorsSection";

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
  onRequestProposal
}: EnhancedVendorMarketplaceHubProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedVendor, setSelectedVendor] = useState<VendorProfile | null>(null);
  const [selectedExpenseItem, setSelectedExpenseItem] = useState<BudgetExpenseItem | null>(null);
  const [showProposalRequest, setShowProposalRequest] = useState(false);
  const [showVendorProfile, setShowVendorProfile] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState<MarketplaceFilters>({
    searchTerm: '',
    badges: [],
    priceRanges: [],
    location: { city: '', state: '', country: '' },
    minRating: null,
    category: 'all'
  });

  // Map price range to dollar signs
  const priceRangeMap: Record<string, '$' | '$$' | '$$$' | '$$$$'> = {
    'budget': '$',
    'mid-range': '$$',
    'premium': '$$$',
    'luxury': '$$$$'
  };

  // Filter vendors based on all filters
  const filteredVendors = useMemo(() => {
    const budgetCategories = Array.from(new Set(expenseItems.map(item => item.category)));
    
    return vendors.filter(vendor => {
      // Exclude recommended/sponsored vendors from main list
      const isRecommended = vendor.sponsored && 
        vendor.sponsoredUntil && 
        vendor.sponsoredUntil > new Date() &&
        vendor.sponsoredCategories?.some(
          cat => budgetCategories.includes(cat)
        );
      
      if (isRecommended) return false;
      
      // Search filter
      const matchesSearch = !filters.searchTerm || 
        vendor.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        vendor.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        vendor.services.some(service => service.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
        vendor.specialties.some(specialty => specialty.toLowerCase().includes(filters.searchTerm.toLowerCase()));
      
      // Badge filter
      const matchesBadge = filters.badges.length === 0 || 
        (vendor.badge && filters.badges.includes(vendor.badge));
      
      // Price range filter
      const matchesPriceRange = filters.priceRanges.length === 0 || 
        filters.priceRanges.includes(priceRangeMap[vendor.priceRange]);
      
      // Location filter
      const locationStr = vendor.location.toLowerCase();
      const matchesLocation = 
        (!filters.location.city || locationStr.includes(filters.location.city.toLowerCase())) &&
        (!filters.location.state || locationStr.includes(filters.location.state.toLowerCase())) &&
        (!filters.location.country || locationStr.includes(filters.location.country.toLowerCase()));
      
      // Rating filter
      const matchesRating = !filters.minRating || vendor.rating >= filters.minRating;
      
      // Category filter
      const matchesCategory = filters.category === "all" || vendor.category === filters.category;
      
      return matchesSearch && matchesBadge && matchesPriceRange && matchesLocation && matchesRating && matchesCategory;
    });
  }, [vendors, filters, expenseItems]);

  // Get unique categories for filters
  const categories = Array.from(new Set(vendors.map(v => v.category)));

  const handleRequestProposal = (vendorId: string) => {
    const vendor = vendors.find(v => v.id === vendorId);
    if (vendor && expenseItems.length > 0) {
      setSelectedVendor(vendor);
      setSelectedExpenseItem(expenseItems[0]); // Default to first item, user can change
      setShowProposalRequest(true);
    }
  };

  const handleContactVendor = (vendorId: string) => {
    onContactVendor(vendorId, `Hi, I'm interested in your services for my ${expenseItems[0]?.category || 'event'}.`);
  };

  const handleViewProfile = (vendorId: string) => {
    const vendor = vendors.find(v => v.id === vendorId);
    if (vendor) {
      setSelectedVendor(vendor);
      setShowVendorProfile(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Recommended Vendors Section - Shows First */}
      <RecommendedVendorsSection
        vendors={vendors}
        expenseItems={expenseItems}
        onContactVendor={(vendorId) => {
          const vendor = vendors.find(v => v.id === vendorId);
          if (vendor) {
            handleContactVendor(vendorId);
          }
        }}
        onRequestProposal={(vendorId) => {
          const vendor = vendors.find(v => v.id === vendorId);
          if (vendor) {
            handleRequestProposal(vendorId);
          }
        }}
        onViewProfile={handleViewProfile}
      />

      {/* Header with Search and View Toggle */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search vendors, services, or specialties..."
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                className="pl-10"
              />
            </div>
            
            {/* Mobile Filter Button */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <MarketplaceFilterSidebar
                    filters={filters}
                    onFiltersChange={setFilters}
                    categories={categories}
                    vendorCount={filteredVendors.length}
                  />
                </div>
              </SheetContent>
            </Sheet>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredVendors.length}</span> vendors found
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Main Content: Sidebar + Vendors */}
      <div className="flex gap-6 w-full">
        {/* Desktop Filter Sidebar */}
        <div className="hidden md:block">
          <MarketplaceFilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            categories={categories}
            vendorCount={filteredVendors.length}
          />
        </div>

        {/* Vendors Grid/List */}
        <div className="flex-1 min-w-0">
          {filteredVendors.length > 0 ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredVendors.map(vendor => (
                <ModernVendorCard
                  key={vendor.id}
                  vendor={vendor}
                  onContactVendor={handleContactVendor}
                  onRequestProposal={handleRequestProposal}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No vendors found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </div>

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
