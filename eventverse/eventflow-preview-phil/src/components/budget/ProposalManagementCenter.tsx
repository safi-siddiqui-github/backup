import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Eye, 
  CheckCircle, 
  XCircle, 
  MessageSquare,
  Calendar,
  DollarSign,
  Clock,
  AlertCircle,
  Download,
  Users,
  TrendingUp,
  Star,
  Target,
  Award,
  TrendingDown,
  Search,
  Filter,
  ExternalLink,
  ArrowUpDown,
  X,
  ChevronDown,
  SlidersHorizontal,
  Archive,
  Heart,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";
import type { BudgetExpenseItem, Proposal } from "./ComprehensiveBudgetModule";
import type { VendorProfile } from "@/types/budget";
import ProposalAcceptanceDialog from "./ProposalAcceptanceDialog";
import NegotiationDialog, { NegotiationData } from "./NegotiationDialog";
import VendorProfileDialog from "./VendorProfileDialog";

interface ProposalManagementCenterProps {
  expenseItems: BudgetExpenseItem[];
  proposals: Proposal[];
  vendors: VendorProfile[];
  onAcceptProposal: (proposalId: string) => void;
  onDeclineProposal: (proposalId: string) => void;
  onNegotiateProposal: (proposalId: string) => void;
  onShortlistProposal: (proposalId: string) => void;
  onArchiveProposal: (proposalId: string) => void;
  onMarkProposalViewed: (proposalId: string) => void;
  onMessageVendor: (vendorId: string, proposalId: string) => void;
}

const ProposalManagementCenter = ({
  expenseItems,
  proposals,
  vendors,
  onAcceptProposal,
  onDeclineProposal,
  onNegotiateProposal,
  onShortlistProposal,
  onArchiveProposal,
  onMarkProposalViewed,
  onMessageVendor
}: ProposalManagementCenterProps) => {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "shortlisted" | "in_negotiations" | "hired" | "archived">("all");
  const [viewedProposals, setViewedProposals] = useState<Set<string>>(new Set());
  const [budgetItemFilter, setBudgetItemFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAcceptanceDialog, setShowAcceptanceDialog] = useState(false);
  const [showNegotiationDialog, setShowNegotiationDialog] = useState(false);
  const [proposalForAcceptance, setProposalForAcceptance] = useState<Proposal | null>(null);
  const [proposalForNegotiation, setProposalForNegotiation] = useState<Proposal | null>(null);
  const [showVendorProfile, setShowVendorProfile] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<VendorProfile | null>(null);
  
  // Advanced filters
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [ratingFilter, setRatingFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [expiryFilter, setExpiryFilter] = useState("all");
  const [budgetVarianceFilter, setBudgetVarianceFilter] = useState("all");
  const [vendorFilter, setVendorFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  // Calculate proposal statistics
  const totalCount = proposals.filter(p => !p.archived).length;
  const newCount = proposals.filter(p => !p.viewed && !p.archived && !viewedProposals.has(p.id)).length;
  const shortlistedCount = proposals.filter(p => p.shortlisted && !p.archived).length;
  const negotiationsCount = proposals.filter(p => p.status === 'negotiating' && !p.archived).length;
  const hiredCount = proposals.filter(p => p.status === 'accepted' && !p.archived).length;
  const archivedCount = proposals.filter(p => p.archived).length;
  const acceptedValue = proposals
    .filter(p => p.status === 'accepted')
    .reduce((sum, p) => sum + p.totalCost, 0);

  // Get unique budget item categories and vendors for filtering
  const budgetItemCategories = Array.from(new Set(expenseItems.map(item => item.category)));
  const uniqueVendors = Array.from(new Set(proposals.map(p => p.vendorId)))
    .map(id => vendors.find(v => v.id === id))
    .filter(Boolean) as VendorProfile[];
  
  // Count active filters
  const activeFilterCount = 
    (budgetItemFilter !== 'all' ? 1 : 0) +
    (priceRange.min || priceRange.max ? 1 : 0) +
    (ratingFilter !== 'all' ? 1 : 0) +
    (dateRange.from || dateRange.to ? 1 : 0) +
    (expiryFilter !== 'all' ? 1 : 0) +
    (budgetVarianceFilter !== 'all' ? 1 : 0) +
    (vendorFilter !== 'all' ? 1 : 0);
  
  const resetFilters = () => {
    setBudgetItemFilter('all');
    setPriceRange({ min: "", max: "" });
    setRatingFilter('all');
    setDateRange({ from: "", to: "" });
    setExpiryFilter('all');
    setBudgetVarianceFilter('all');
    setVendorFilter('all');
    setSearchQuery('');
  };

  // Filter and sort proposals
  const getFilteredProposals = (tab: string) => {
    let filtered = proposals;

    // Filter by tab
    if (tab === 'all') {
      filtered = filtered.filter(p => !p.archived);
    } else if (tab === 'shortlisted') {
      filtered = filtered.filter(p => p.shortlisted && !p.archived);
    } else if (tab === 'in_negotiations') {
      filtered = filtered.filter(p => p.status === 'negotiating' && !p.archived);
    } else if (tab === 'hired') {
      filtered = filtered.filter(p => p.status === 'accepted' && !p.archived);
    } else if (tab === 'archived') {
      filtered = filtered.filter(p => p.archived);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => {
        const vendor = getVendorById(p.vendorId);
        const expenseItem = getExpenseItemById(p.expenseItemId);
        return (
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          vendor?.name.toLowerCase().includes(query) ||
          expenseItem?.title.toLowerCase().includes(query) ||
          expenseItem?.category.toLowerCase().includes(query)
        );
      });
    }

    // Filter by budget item category
    if (budgetItemFilter !== 'all') {
      filtered = filtered.filter(p => {
        const expenseItem = getExpenseItemById(p.expenseItemId);
        return expenseItem?.category === budgetItemFilter;
      });
    }

    // Filter by price range
    if (priceRange.min) {
      filtered = filtered.filter(p => p.totalCost >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(p => p.totalCost <= parseFloat(priceRange.max));
    }

    // Filter by vendor rating
    if (ratingFilter !== 'all') {
      filtered = filtered.filter(p => {
        const vendor = getVendorById(p.vendorId);
        const rating = vendor?.rating || 0;
        if (ratingFilter === '4+') return rating >= 4;
        if (ratingFilter === '3+') return rating >= 3;
        if (ratingFilter === 'below3') return rating < 3;
        return true;
      });
    }

    // Filter by submission date range
    if (dateRange.from) {
      filtered = filtered.filter(p => 
        p.submittedAt >= new Date(dateRange.from)
      );
    }
    if (dateRange.to) {
      filtered = filtered.filter(p => 
        p.submittedAt <= new Date(dateRange.to)
      );
    }

    // Filter by expiry
    if (expiryFilter !== 'all') {
      filtered = filtered.filter(p => {
        const days = getDaysUntilExpiry(p.validUntil);
        if (expiryFilter === 'expiring') return days <= 3 && days > 0;
        if (expiryFilter === 'expired') return days <= 0;
        if (expiryFilter === 'week') return days > 3 && days <= 7;
        if (expiryFilter === 'month') return days > 7 && days <= 30;
        return true;
      });
    }

    // Filter by budget variance
    if (budgetVarianceFilter !== 'all') {
      filtered = filtered.filter(p => {
        const expenseItem = getExpenseItemById(p.expenseItemId);
        const variance = p.totalCost - (expenseItem?.allocatedBudget || 0);
        if (budgetVarianceFilter === 'under') return variance < 0;
        if (budgetVarianceFilter === 'over') return variance > 0;
        if (budgetVarianceFilter === 'match') return Math.abs(variance) < 100;
        return true;
      });
    }

    // Filter by vendor
    if (vendorFilter !== 'all') {
      filtered = filtered.filter(p => p.vendorId === vendorFilter);
    }

    // Sort proposals
    filtered.sort((a, b) => {
      const vendorA = getVendorById(a.vendorId);
      const vendorB = getVendorById(b.vendorId);
      const expenseItemA = getExpenseItemById(a.expenseItemId);
      const expenseItemB = getExpenseItemById(b.expenseItemId);

      switch (sortBy) {
        case 'price-asc':
          return a.totalCost - b.totalCost;
        case 'price-desc':
          return b.totalCost - a.totalCost;
        case 'date-asc':
          return a.submittedAt.getTime() - b.submittedAt.getTime();
        case 'date-desc':
          return b.submittedAt.getTime() - a.submittedAt.getTime();
        case 'rating-desc':
          return (vendorB?.rating || 0) - (vendorA?.rating || 0);
        case 'rating-asc':
          return (vendorA?.rating || 0) - (vendorB?.rating || 0);
        case 'expiry-asc':
          return getDaysUntilExpiry(a.validUntil) - getDaysUntilExpiry(b.validUntil);
        case 'expiry-desc':
          return getDaysUntilExpiry(b.validUntil) - getDaysUntilExpiry(a.validUntil);
        case 'variance-asc': {
          const varianceA = a.totalCost - (expenseItemA?.allocatedBudget || 0);
          const varianceB = b.totalCost - (expenseItemB?.allocatedBudget || 0);
          return varianceA - varianceB;
        }
        case 'variance-desc': {
          const varianceA = a.totalCost - (expenseItemA?.allocatedBudget || 0);
          const varianceB = b.totalCost - (expenseItemB?.allocatedBudget || 0);
          return varianceB - varianceA;
        }
        default:
          return 0;
      }
    });

    return filtered;
  };

  const getVendorById = (vendorId: string) => {
    return vendors.find(v => v.id === vendorId);
  };

  const getExpenseItemById = (expenseItemId: string) => {
    // Find actual expense item first
    const foundItem = expenseItems.find(item => item.id === expenseItemId);
    if (foundItem) {
      return foundItem;
    }
    
    // Create a mock expense item if not found to prevent filtering issues
    // This allows proposals to still display even if expense items don't match
    return {
      id: expenseItemId,
      category: 'General',
      subcategory: 'General',
      title: 'Budget Item',
      description: 'General budget item',
      estimatedCost: 5000,
      allocatedBudget: 5000,
      actualCost: 0,
      priority: 'medium' as const,
      status: 'planning' as const,
      aiSuggested: false,
      milestones: []
    };
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Venue': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Catering': return 'bg-red-100 text-red-800 border-red-200';
      case 'Photography': return 'bg-green-100 text-green-800 border-green-200';
      case 'Florals': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Entertainment': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryBorderColor = (category: string) => {
    switch (category) {
      case 'Venue': return 'border-l-blue-500';
      case 'Catering': return 'border-l-red-500';
      case 'Photography': return 'border-l-green-500';
      case 'Florals': return 'border-l-yellow-500';
      case 'Entertainment': return 'border-l-purple-500';
      default: return 'border-l-gray-500';
    }
  };

  const getStatusColor = (status: Proposal['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'declined': return 'bg-red-100 text-red-800 border-red-200';
      case 'negotiating': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'under_review': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Proposal['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'declined': return <XCircle className="w-4 h-4" />;
      case 'negotiating': return <MessageSquare className="w-4 h-4" />;
      case 'under_review': return <Eye className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getDaysUntilExpiry = (validUntil: Date) => {
    const today = new Date();
    const diffTime = validUntil.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleVendorClick = (vendorId: string) => {
    const vendor = getVendorById(vendorId);
    if (vendor) {
      setSelectedVendor(vendor);
      setShowVendorProfile(true);
    }
  };

  const handleAcceptClick = (proposal: Proposal) => {
    setProposalForAcceptance(proposal);
    setShowAcceptanceDialog(true);
  };

  const handleNegotiateClick = (proposal: Proposal) => {
    setProposalForNegotiation(proposal);
    setShowNegotiationDialog(true);
  };

  const handleConfirmAcceptance = () => {
    if (proposalForAcceptance) {
      onAcceptProposal(proposalForAcceptance.id);
      setShowAcceptanceDialog(false);
      setProposalForAcceptance(null);
    }
  };

  const handleNegotiationSubmit = (negotiationData: NegotiationData) => {
    if (proposalForNegotiation) {
      onNegotiateProposal(proposalForNegotiation.id);
      setShowNegotiationDialog(false);
      setProposalForNegotiation(null);
    }
  };

  const handleProposalView = (proposal: Proposal) => {
    if (!proposal.viewed && !viewedProposals.has(proposal.id)) {
      setViewedProposals(prev => new Set(prev).add(proposal.id));
      onMarkProposalViewed(proposal.id);
    }
    setSelectedProposal(proposal);
  };

  const handleShortlist = (proposalId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onShortlistProposal(proposalId);
  };

  const handleArchive = (proposalId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onArchiveProposal(proposalId);
  };

  const handleMessageVendor = (vendorId: string, proposalId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onMessageVendor(vendorId, proposalId);
  };

  const getBudgetComparison = (proposalCost: number, allocatedBudget: number) => {
    const difference = proposalCost - allocatedBudget;
    const percentDiff = ((difference / allocatedBudget) * 100).toFixed(1);
    
    if (difference > 0) {
      // Over budget - Red arrow up
      return {
        icon: ArrowUp,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        label: `$${difference.toLocaleString()} over`,
        percent: `+${percentDiff}%`,
        type: 'over'
      };
    } else if (difference < 0) {
      // Under budget - Green arrow down
      return {
        icon: ArrowDown,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        label: `$${Math.abs(difference).toLocaleString()} under`,
        percent: `${percentDiff}%`,
        type: 'under'
      };
    } else {
      // Exactly on budget - Gray minus sign
      return {
        icon: Minus,
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        label: 'On budget',
        percent: '0%',
        type: 'exact'
      };
    }
  };

  const getBadgeConfig = (badge?: 'top-rated' | 'host-favorite' | 'rising-star') => {
    if (!badge) return null;
    switch (badge) {
      case 'top-rated':
        return { label: 'Top Rated', icon: Award, className: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
      case 'host-favorite':
        return { label: "Host's Favorite", icon: Heart, className: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'rising-star':
        return { label: 'Rising Star', icon: TrendingUp, className: 'bg-green-100 text-green-800 border-green-300' };
    }
  };

  const renderProposalCard = (proposal: Proposal) => {
    const vendor = getVendorById(proposal.vendorId);
    const expenseItem = getExpenseItemById(proposal.expenseItemId);
    const daysUntilExpiry = getDaysUntilExpiry(proposal.validUntil);
    const isExpiringSoon = daysUntilExpiry <= 3 && daysUntilExpiry > 0;
    const isExpired = daysUntilExpiry <= 0;
    const isNew = !proposal.viewed && !viewedProposals.has(proposal.id);
    
    if (!expenseItem) return null;

    return (
      <Card 
        key={proposal.id} 
        className={`hover:shadow-md transition-shadow relative ${
          isExpiringSoon ? 'border-orange-200 bg-orange-50' : 
          isExpired ? 'border-red-200 bg-red-50' : ''
        }`}
      >
        <CardContent className="p-6">
          {/* Shortlist Button - Top Right */}
          {!proposal.archived && (
            <Button 
              size="sm" 
              variant="ghost"
              onClick={(e) => handleShortlist(proposal.id, e)}
              className={`absolute top-4 right-4 ${proposal.shortlisted ? 'text-yellow-600 hover:text-yellow-700' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Star className={`w-5 h-5 ${proposal.shortlisted ? 'fill-yellow-500' : ''}`} />
            </Button>
          )}

          <div className="flex items-start gap-6 pr-12">
            {/* Vendor Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                {vendor?.name.charAt(0) || 'V'}
              </div>
              {isNew && activeTab === 'all' && (
                <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 border-2 border-white flex items-center justify-center">
                  <span className="text-[10px] text-white font-bold">N</span>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold mb-1">{proposal.title}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => handleVendorClick(proposal.vendorId)}
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center gap-1 text-sm"
                    >
                      {vendor?.name || 'Unknown Vendor'}
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    {vendor?.badge && (() => {
                      const badgeConfig = getBadgeConfig(vendor.badge);
                      return badgeConfig ? (
                        <Badge className={`${badgeConfig.className} border flex items-center gap-1`}>
                          <badgeConfig.icon className="w-3 h-3" />
                          {badgeConfig.label}
                        </Badge>
                      ) : null;
                    })()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    ${proposal.totalCost.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Budget: ${(expenseItem?.allocatedBudget || 5000).toLocaleString()}
                  </div>
                  
                  {/* Budget Comparison Indicator */}
                  {(() => {
                    const comparison = getBudgetComparison(
                      proposal.totalCost, 
                      expenseItem?.allocatedBudget || 5000
                    );
                    const ComparisonIcon = comparison.icon;
                    
                    return (
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${comparison.bgColor} ${comparison.borderColor}`}>
                        <ComparisonIcon className={`w-4 h-4 ${comparison.color}`} />
                        <div className="flex flex-col items-start">
                          <span className={`text-xs font-semibold ${comparison.color}`}>
                            {comparison.label}
                          </span>
                          <span className={`text-[10px] ${comparison.color} opacity-75`}>
                            {comparison.percent}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <Badge className={`${getCategoryColor(expenseItem?.category || 'General')} border`}>
                  <Target className="w-3 h-3 mr-1" />
                  {expenseItem?.category || 'General'}
                </Badge>
                <Badge className={`${getStatusColor(proposal.status)} border`}>
                  {getStatusIcon(proposal.status)}
                  <span className="ml-1 capitalize">{proposal.status.replace('_', ' ')}</span>
                </Badge>
                {isNew && activeTab === 'all' && (
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
                    NEW
                  </Badge>
                )}
                {isExpiringSoon && (
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Expires in {daysUntilExpiry} days
                  </Badge>
                )}
                {isExpired && (
                  <Badge variant="destructive">
                    <XCircle className="w-3 h-3 mr-1" />
                    Expired
                  </Badge>
                )}
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs text-muted-foreground">{vendor?.rating || 'N/A'}</span>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{proposal.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{proposal.timeline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Valid until {proposal.validUntil.toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => handleProposalView(proposal)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                </Dialog>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => handleMessageVendor(proposal.vendorId, proposal.id, e)}
                  className="text-blue-600 border-blue-300 hover:bg-blue-50"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
                
                {!proposal.archived && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => handleArchive(proposal.id, e)}
                  >
                    <Archive className="w-4 h-4 mr-1" />
                    Archive
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | "shortlisted" | "in_negotiations" | "hired" | "archived")}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            All Proposals ({totalCount})
            {newCount > 0 && (
              <Badge className="ml-2 bg-red-500 text-white h-5 min-w-[20px] px-1.5">
                {newCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="shortlisted">
            Shortlisted ({shortlistedCount})
          </TabsTrigger>
          <TabsTrigger value="in_negotiations">
            In Negotiations ({negotiationsCount})
          </TabsTrigger>
          <TabsTrigger value="hired">
            Hired ({hiredCount})
          </TabsTrigger>
          <TabsTrigger value="archived">
            Archived ({archivedCount})
          </TabsTrigger>
        </TabsList>

        {/* Enhanced Filtering and Sorting Controls */}
        <Card className="mb-6 mt-4">
          <CardContent className="p-4">
            {/* Search and Primary Filters Row */}
            <div className="flex gap-3 mb-3">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search proposals, vendors, or budget items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-56">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Newest First</SelectItem>
                  <SelectItem value="date-asc">Oldest First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
                  <SelectItem value="rating-asc">Rating: Low to High</SelectItem>
                  <SelectItem value="expiry-asc">Expiring Soon</SelectItem>
                  <SelectItem value="expiry-desc">Expiring Later</SelectItem>
                  <SelectItem value="variance-asc">Most Under Budget</SelectItem>
                  <SelectItem value="variance-desc">Most Over Budget</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1">{activeFilterCount}</Badge>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>

              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Reset
                </Button>
              )}
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="border-t pt-4 mt-2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Budget Category Filter */}
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Budget Category</label>
                    <Select value={budgetItemFilter} onValueChange={setBudgetItemFilter}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-background">
                        <SelectItem value="all">All Categories</SelectItem>
                        {budgetItemCategories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Vendor Filter */}
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Vendor</label>
                    <Select value={vendorFilter} onValueChange={setVendorFilter}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="All vendors" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-background">
                        <SelectItem value="all">All Vendors</SelectItem>
                        {uniqueVendors.map(vendor => (
                          <SelectItem key={vendor.id} value={vendor.id}>
                            {vendor.name} ({vendor.rating}★)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Vendor Rating</label>
                    <Select value={ratingFilter} onValueChange={setRatingFilter}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="All ratings" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-background">
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="4+">4+ Stars</SelectItem>
                        <SelectItem value="3+">3+ Stars</SelectItem>
                        <SelectItem value="below3">Below 3 Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Expiry Filter */}
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Expiry Status</label>
                    <Select value={expiryFilter} onValueChange={setExpiryFilter}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="All proposals" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-background">
                        <SelectItem value="all">All Proposals</SelectItem>
                        <SelectItem value="expiring">Expiring Soon (≤3 days)</SelectItem>
                        <SelectItem value="week">Within a Week</SelectItem>
                        <SelectItem value="month">Within a Month</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range - Min */}
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Min Price ($)</label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="h-9"
                    />
                  </div>

                  {/* Price Range - Max */}
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Max Price ($)</label>
                    <Input
                      type="number"
                      placeholder="No limit"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="h-9"
                    />
                  </div>

                  {/* Budget Variance Filter */}
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Budget Variance</label>
                    <Select value={budgetVarianceFilter} onValueChange={setBudgetVarianceFilter}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="All proposals" />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-background">
                        <SelectItem value="all">All Proposals</SelectItem>
                        <SelectItem value="under">Under Budget</SelectItem>
                        <SelectItem value="match">Within Budget</SelectItem>
                        <SelectItem value="over">Over Budget</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Range - From */}
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Submitted From</label>
                    <Input
                      type="date"
                      value={dateRange.from}
                      onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                      className="h-9"
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Proposal Content */}
        {['all', 'shortlisted', 'in_negotiations', 'hired', 'archived'].map(tab => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {getFilteredProposals(tab).length > 0 ? (
              <div className="space-y-4">
                {getFilteredProposals(tab).map(renderProposalCard)}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  {tab === 'all' && 'No proposals yet'}
                  {tab === 'shortlisted' && 'No shortlisted proposals'}
                  {tab === 'in_negotiations' && 'No active negotiations'}
                  {tab === 'hired' && 'No hired vendors yet'}
                  {tab === 'archived' && 'No archived proposals'}
                </h3>
                <p className="text-gray-500">
                  {searchQuery || budgetItemFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : tab === 'all' ? 'Request proposals from vendors in the Marketplace tab to see them here' : 
                      tab === 'shortlisted' ? 'Star proposals to add them to your shortlist for easy comparison' :
                      tab === 'in_negotiations' ? 'Start conversations with vendors to begin negotiations' :
                      tab === 'hired' ? 'Accepted proposals will appear here once you hire vendors' :
                      'Archive proposals you no longer want to consider to keep your workspace clean'
                  }
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Proposal Details Dialog */}
      {selectedProposal && (
        <Dialog open={!!selectedProposal} onOpenChange={() => setSelectedProposal(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedProposal.title}
                <Badge className={`${getStatusColor(selectedProposal.status)} border`}>
                  {selectedProposal.status.charAt(0).toUpperCase() + selectedProposal.status.slice(1).replace('_', ' ')}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Proposal Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Vendor:</strong> {getVendorById(selectedProposal.vendorId)?.name}</p>
                    <p><strong>Total Cost:</strong> ${selectedProposal.totalCost.toLocaleString()}</p>
                    <p><strong>Timeline:</strong> {selectedProposal.timeline}</p>
                    <p><strong>Valid Until:</strong> {selectedProposal.validUntil.toLocaleDateString()}</p>
                    <p><strong>Submitted:</strong> {selectedProposal.submittedAt.toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Terms & Conditions</h4>
                  <p className="text-sm text-gray-700">{selectedProposal.terms}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Cost Breakdown</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-3 text-left text-sm font-medium">Item</th>
                        <th className="p-3 text-right text-sm font-medium">Quantity</th>
                        <th className="p-3 text-right text-sm font-medium">Unit Price</th>
                        <th className="p-3 text-right text-sm font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProposal.breakdown.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3 text-sm">{item.item}</td>
                          <td className="p-3 text-sm text-right">{item.quantity}</td>
                          <td className="p-3 text-sm text-right">${item.unitPrice.toLocaleString()}</td>
                          <td className="p-3 text-sm text-right font-medium">${item.total.toLocaleString()}</td>
                        </tr>
                      ))}
                      <tr className="border-t bg-gray-50">
                        <td colSpan={3} className="p-3 text-sm font-medium">Total</td>
                        <td className="p-3 text-sm text-right font-bold">${selectedProposal.totalCost.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Deliverables</h4>
                <ul className="space-y-2">
                  {selectedProposal.deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
              
              {selectedProposal.paymentSchedule && (
                <div>
                  <h4 className="font-medium mb-3">Payment Schedule</h4>
                  <div className="space-y-3">
                    {selectedProposal.paymentSchedule.map((milestone, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{milestone.milestone}</div>
                          <div className="text-sm text-gray-600">{milestone.percentage}% of total</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${milestone.amount.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">{milestone.dueDate.toLocaleDateString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedProposal.status === 'pending' && (
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => onDeclineProposal(selectedProposal.id)}>
                    <XCircle className="w-4 h-4 mr-2" />
                    Decline
                  </Button>
                  <Button variant="outline" onClick={() => onNegotiateProposal(selectedProposal.id)}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Negotiate
                  </Button>
                  <Button onClick={() => onAcceptProposal(selectedProposal.id)} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept Proposal
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Proposal Acceptance Dialog */}
      <ProposalAcceptanceDialog
        open={showAcceptanceDialog}
        onOpenChange={setShowAcceptanceDialog}
        proposal={proposalForAcceptance}
        vendor={proposalForAcceptance ? getVendorById(proposalForAcceptance.vendorId) : null}
        onConfirm={handleConfirmAcceptance}
      />

      {/* Negotiation Dialog */}
      <NegotiationDialog
        open={showNegotiationDialog}
        onOpenChange={setShowNegotiationDialog}
        proposal={proposalForNegotiation}
        vendor={proposalForNegotiation ? getVendorById(proposalForNegotiation.vendorId) : null}
        expenseItem={proposalForNegotiation ? getExpenseItemById(proposalForNegotiation.expenseItemId) : null}
        onSubmit={handleNegotiationSubmit}
      />

      {/* Vendor Profile Dialog */}
      <VendorProfileDialog
        open={showVendorProfile}
        onOpenChange={setShowVendorProfile}
        vendor={selectedVendor}
        onContactVendor={(vendorId) => console.log('Contact vendor:', vendorId)}
        onRequestProposal={(vendorId) => console.log('Request proposal:', vendorId)}
      />
    </div>
  );
};

export default ProposalManagementCenter;
