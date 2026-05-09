import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge as BadgeIcon, DollarSign, MapPin, Star, X } from "lucide-react";

export interface MarketplaceFilters {
  searchTerm: string;
  badges: ('top-rated' | 'host-favorite' | 'rising-star')[];
  priceRanges: ('$' | '$$' | '$$$' | '$$$$')[];
  location: {
    city: string;
    state: string;
    country: string;
  };
  minRating: number | null;
  category: string;
}

interface MarketplaceFilterSidebarProps {
  filters: MarketplaceFilters;
  onFiltersChange: (filters: MarketplaceFilters) => void;
  categories: string[];
  vendorCount: number;
}

const MarketplaceFilterSidebar = ({
  filters,
  onFiltersChange,
  categories,
  vendorCount
}: MarketplaceFilterSidebarProps) => {
  
  const updateFilters = (updates: Partial<MarketplaceFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleBadge = (badge: 'top-rated' | 'host-favorite' | 'rising-star') => {
    const newBadges = filters.badges.includes(badge)
      ? filters.badges.filter(b => b !== badge)
      : [...filters.badges, badge];
    updateFilters({ badges: newBadges });
  };

  const togglePriceRange = (range: '$' | '$$' | '$$$' | '$$$$') => {
    const newRanges = filters.priceRanges.includes(range)
      ? filters.priceRanges.filter(r => r !== range)
      : [...filters.priceRanges, range];
    updateFilters({ priceRanges: newRanges });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      searchTerm: '',
      badges: [],
      priceRanges: [],
      location: { city: '', state: '', country: '' },
      minRating: null,
      category: 'all'
    });
  };

  const activeFilterCount = 
    filters.badges.length + 
    filters.priceRanges.length + 
    (filters.location.city ? 1 : 0) + 
    (filters.location.state ? 1 : 0) + 
    (filters.location.country ? 1 : 0) + 
    (filters.minRating ? 1 : 0) + 
    (filters.category !== 'all' ? 1 : 0);

  return (
    <div className="w-64 flex-shrink-0">
      <Card className="sticky top-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                {activeFilterCount}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Badge Filters */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BadgeIcon className="w-4 h-4 text-muted-foreground" />
              <Label className="font-semibold text-sm">Badge</Label>
            </div>
            <div className="space-y-2 ml-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="top-rated"
                  checked={filters.badges.includes('top-rated')}
                  onCheckedChange={() => toggleBadge('top-rated')}
                />
                <label htmlFor="top-rated" className="text-sm cursor-pointer">
                  Top Rated
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="host-favorite"
                  checked={filters.badges.includes('host-favorite')}
                  onCheckedChange={() => toggleBadge('host-favorite')}
                />
                <label htmlFor="host-favorite" className="text-sm cursor-pointer">
                  Host's Favorite
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rising-star"
                  checked={filters.badges.includes('rising-star')}
                  onCheckedChange={() => toggleBadge('rising-star')}
                />
                <label htmlFor="rising-star" className="text-sm cursor-pointer">
                  Rising Star
                </label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Pricing Filters */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <Label className="font-semibold text-sm">Pricing</Label>
            </div>
            <div className="space-y-2 ml-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="price-1"
                  checked={filters.priceRanges.includes('$')}
                  onCheckedChange={() => togglePriceRange('$')}
                />
                <label htmlFor="price-1" className="text-sm cursor-pointer">
                  $ (Budget)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="price-2"
                  checked={filters.priceRanges.includes('$$')}
                  onCheckedChange={() => togglePriceRange('$$')}
                />
                <label htmlFor="price-2" className="text-sm cursor-pointer">
                  $$ (Mid-range)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="price-3"
                  checked={filters.priceRanges.includes('$$$')}
                  onCheckedChange={() => togglePriceRange('$$$')}
                />
                <label htmlFor="price-3" className="text-sm cursor-pointer">
                  $$$ (Premium)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="price-4"
                  checked={filters.priceRanges.includes('$$$$')}
                  onCheckedChange={() => togglePriceRange('$$$$')}
                />
                <label htmlFor="price-4" className="text-sm cursor-pointer">
                  $$$$ (Luxury)
                </label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Location Filters */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <Label className="font-semibold text-sm">Location</Label>
            </div>
            <div className="space-y-2">
              <Input
                placeholder="City"
                value={filters.location.city}
                onChange={(e) => updateFilters({ 
                  location: { ...filters.location, city: e.target.value }
                })}
                className="h-8 text-sm"
              />
              <Input
                placeholder="State"
                value={filters.location.state}
                onChange={(e) => updateFilters({ 
                  location: { ...filters.location, state: e.target.value }
                })}
                className="h-8 text-sm"
              />
              <Input
                placeholder="Country"
                value={filters.location.country}
                onChange={(e) => updateFilters({ 
                  location: { ...filters.location, country: e.target.value }
                })}
                className="h-8 text-sm"
              />
            </div>
          </div>

          <Separator />

          {/* Rating Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-muted-foreground" />
              <Label className="font-semibold text-sm">Rating</Label>
            </div>
            <RadioGroup 
              value={filters.minRating?.toString() || "0"} 
              onValueChange={(value) => updateFilters({ minRating: value === "0" ? null : parseInt(value) })}
              className="space-y-2 ml-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="rating-all" />
                <label htmlFor="rating-all" className="text-sm cursor-pointer">
                  All Ratings
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id="rating-5" />
                <label htmlFor="rating-5" className="text-sm cursor-pointer">
                  5 stars
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="rating-4" />
                <label htmlFor="rating-4" className="text-sm cursor-pointer">
                  4+ stars
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="rating-3" />
                <label htmlFor="rating-3" className="text-sm cursor-pointer">
                  3+ stars
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="rating-2" />
                <label htmlFor="rating-2" className="text-sm cursor-pointer">
                  2+ stars
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="rating-1" />
                <label htmlFor="rating-1" className="text-sm cursor-pointer">
                  1+ stars
                </label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Category Filter */}
          <div className="space-y-3">
            <Label className="font-semibold text-sm">Category</Label>
            <Select value={filters.category} onValueChange={(value) => updateFilters({ category: value })}>
              <SelectTrigger className="h-8 text-sm">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters Button */}
          {activeFilterCount > 0 && (
            <>
              <Separator />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearAllFilters}
                className="w-full"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All Filters
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketplaceFilterSidebar;
