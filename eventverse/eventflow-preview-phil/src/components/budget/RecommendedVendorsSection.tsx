import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp } from "lucide-react";
import ModernVendorCard from "./ModernVendorCard";
import type { VendorProfile } from "@/types/budget";
import type { BudgetExpenseItem } from "./ComprehensiveBudgetModule";

interface RecommendedVendorsSectionProps {
  vendors: VendorProfile[];
  expenseItems: BudgetExpenseItem[];
  onContactVendor: (vendorId: string) => void;
  onRequestProposal: (vendorId: string) => void;
  onViewProfile: (vendorId: string) => void;
}

export const RecommendedVendorsSection = ({
  vendors,
  expenseItems,
  onContactVendor,
  onRequestProposal,
  onViewProfile,
}: RecommendedVendorsSectionProps) => {
  
  const sortedVendors = useMemo(() => {
    // Get unique budget categories
    const budgetCategories = Array.from(
      new Set(expenseItems.map(item => item.category))
    );

    // Filter recommended vendors
    const recommendedVendors = vendors.filter(vendor => {
      // Check if vendor has active sponsorship
      const isSponsored = vendor.sponsored && 
        vendor.sponsoredUntil && 
        vendor.sponsoredUntil > new Date();
      
      if (!isSponsored) return false;

      // Check if vendor's sponsored categories match budget categories
      const matchesCategory = vendor.sponsoredCategories?.some(
        sponsoredCat => budgetCategories.includes(sponsoredCat)
      ) || false;

      return matchesCategory;
    });

    // Sort by relevance: vendors matching multiple categories first
    return recommendedVendors.sort((a, b) => {
      const aMatches = a.sponsoredCategories?.filter(
        cat => budgetCategories.includes(cat)
      ).length || 0;
      const bMatches = b.sponsoredCategories?.filter(
        cat => budgetCategories.includes(cat)
      ).length || 0;
      return bMatches - aMatches;
    });
  }, [vendors, expenseItems]);

  if (sortedVendors.length === 0) return null;

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
          <Sparkles className="w-5 h-5 text-white" />
          <h2 className="text-lg font-bold text-white">Recommended for Your Event</h2>
        </div>
        <Badge variant="secondary" className="text-xs">
          {sortedVendors.length} Featured {sortedVendors.length === 1 ? 'Vendor' : 'Vendors'}
        </Badge>
      </div>

      {/* Info Banner */}
      <Card className="mb-4 border-purple-200 bg-purple-50 dark:bg-purple-950/20 dark:border-purple-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-purple-900 dark:text-purple-100 font-medium">
                These vendors match your budget categories and are currently featured in the marketplace
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                Premium vendors with proven track records in your event categories
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedVendors.map(vendor => (
          <div key={vendor.id} className="relative">
            {/* Sponsored Badge Overlay */}
            <div className="absolute -top-2 -right-2 z-10">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
                <Sparkles className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
            <ModernVendorCard
              vendor={vendor}
              onContactVendor={onContactVendor}
              onRequestProposal={onRequestProposal}
              onViewProfile={onViewProfile}
            />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-8 mb-6 flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <span className="text-sm text-muted-foreground font-medium">All Marketplace Vendors</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </div>
  );
};

export default RecommendedVendorsSection;
