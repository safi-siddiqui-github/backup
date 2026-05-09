import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Search, 
  MapPin, 
  Calendar, 
  DollarSign,
  Users,
  Star,
  Clock,
  Phone,
  MessageSquare,
  CheckCircle,
  XCircle,
  FileText,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LeadDetailsDialog from "./dialogs/LeadDetailsDialog";
import EnhancedLeadDetails from "./leads/EnhancedLeadDetails";

interface VendorUser {
  id: string;
  businessName: string;
  email: string;
  category: string;
  status: "active" | "pending" | "suspended";
  profileComplete: boolean;
}

interface VendorLeadsProps {
  vendor: VendorUser;
}

interface Lead {
  id: string;
  eventName: string;
  clientName: string;
  eventDate: string;
  location: string;
  budget: number;
  guestCount: number;
  requirements: string;
  status: "new" | "contacted" | "quoted" | "won" | "lost";
  priority: "high" | "medium" | "low";
  matchScore: number;
  createdAt: string;
  lastContact?: string;
  proposalSent?: boolean;
  lostReason?: string;
}

const VendorLeads = ({ vendor }: VendorLeadsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("new");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock leads data with proper status distribution
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      eventName: "Sarah & Michael's Wedding",
      clientName: "Sarah Johnson",
      eventDate: "2024-08-15",
      location: "Napa Valley, CA",
      budget: 7500,
      guestCount: 150,
      requirements: "Full service catering for 150 guests, need vegetarian and gluten-free options",
      status: "new",
      priority: "high",
      matchScore: 95,
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      eventName: "Corporate Annual Gala",
      clientName: "Elite Events Inc",
      eventDate: "2024-09-20",
      location: "San Francisco, CA",
      budget: 12000,
      guestCount: 200,
      requirements: "Upscale catering for corporate event, cocktail reception followed by dinner",
      status: "contacted",
      priority: "medium",
      matchScore: 88,
      createdAt: "2024-01-12",
      lastContact: "2024-01-16"
    },
    {
      id: "3",
      eventName: "Birthday Celebration",
      clientName: "Maria Rodriguez",
      eventDate: "2024-07-30",
      location: "Oakland, CA",
      budget: 3500,
      guestCount: 75,
      requirements: "Casual outdoor birthday party catering, BBQ style preferred",
      status: "quoted",
      priority: "low",
      matchScore: 78,
      createdAt: "2024-01-10",
      lastContact: "2024-01-18",
      proposalSent: true
    },
    {
      id: "4",
      eventName: "Anniversary Party",
      clientName: "Robert & Linda Chen",
      eventDate: "2024-06-25",
      location: "Berkeley, CA",
      budget: 5000,
      guestCount: 100,
      requirements: "Elegant dinner party for 50th anniversary, prefer Italian cuisine",
      status: "won",
      priority: "medium",
      matchScore: 92,
      createdAt: "2024-01-08",
      lastContact: "2024-01-20"
    },
    {
      id: "5",
      eventName: "Graduation Party",
      clientName: "Jennifer Williams",
      eventDate: "2024-05-20",
      location: "San Jose, CA",
      budget: 2000,
      guestCount: 50,
      requirements: "Small graduation celebration, casual dining",
      status: "lost",
      priority: "low",
      matchScore: 65,
      createdAt: "2024-01-05",
      lastContact: "2024-01-15",
      lostReason: "Budget constraints"
    }
  ]);

  const getLeadsByStatus = (status: string) => {
    return leads.filter(lead => lead.status === status);
  };

  const filteredLeads = getLeadsByStatus(activeTab).filter(lead => {
    const matchesSearch = lead.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === "all" || lead.priority === priorityFilter;
    
    return matchesSearch && matchesPriority;
  });

  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "contacted": return "bg-yellow-100 text-yellow-800";
      case "quoted": return "bg-purple-100 text-purple-800";
      case "won": return "bg-green-100 text-green-800";
      case "lost": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: Lead["priority"]) => {
    switch (priority) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const updateLeadStatus = (leadId: string, newStatus: Lead["status"]) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: newStatus, lastContact: new Date().toISOString() }
        : lead
    ));
    toast({
      title: "Lead updated",
      description: `Lead status changed to ${newStatus}`,
    });
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setDialogOpen(true);
  };

  const handleStartChat = (leadId: string) => {
    toast({
      title: "Chat started",
      description: "Opening in-app chat",
    });
    updateLeadStatus(leadId, "contacted");
  };

  const handleScheduleCall = (leadId: string) => {
    toast({
      title: "Call scheduled",
      description: "In-app call scheduled",
    });
    updateLeadStatus(leadId, "contacted");
  };

  const getTabCounts = () => {
    return {
      new: getLeadsByStatus("new").length,
      contacted: getLeadsByStatus("contacted").length,
      quoted: getLeadsByStatus("quoted").length,
      won: getLeadsByStatus("won").length,
      lost: getLeadsByStatus("lost").length,
    };
  };

  const tabCounts = getTabCounts();

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lead Pipeline Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="new">New ({tabCounts.new})</TabsTrigger>
          <TabsTrigger value="contacted">Contacted ({tabCounts.contacted})</TabsTrigger>
          <TabsTrigger value="quoted">Quoted ({tabCounts.quoted})</TabsTrigger>
          <TabsTrigger value="won">Won ({tabCounts.won})</TabsTrigger>
          <TabsTrigger value="lost">Lost ({tabCounts.lost})</TabsTrigger>
        </TabsList>

        {/* Lead Lists for each tab */}
        {["new", "contacted", "quoted", "won", "lost"].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            <div className="grid gap-4">
              {filteredLeads.map((lead) => (
                <Card key={lead.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleLeadClick(lead)}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{lead.eventName}</h3>
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">{lead.matchScore}% match</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">Client: {lead.clientName}</p>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{lead.requirements}</p>
                        {lead.lostReason && (
                          <p className="text-sm text-red-600 mb-3">Lost reason: {lead.lostReason}</p>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-sm font-medium ${getPriorityColor(lead.priority)}`}>
                          {lead.priority.toUpperCase()} PRIORITY
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </div>
                        {lead.lastContact && (
                          <div className="text-xs text-gray-500">
                            Last contact: {new Date(lead.lastContact).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(lead.eventDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {lead.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        ${lead.budget.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        {lead.guestCount} guests
                      </div>
                    </div>

                    {/* Quick action buttons for New leads only */}
                    {lead.status === "new" && (
                      <div className="flex justify-end gap-2 flex-wrap">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartChat(lead.id);
                          }}
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Chat
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleScheduleCall(lead.id);
                          }}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateLeadStatus(lead.id, "contacted");
                          }}
                        >
                          Mark Contacted
                        </Button>
                      </div>
                    )}

                    {/* Click to view details hint */}
                    <div className="text-xs text-gray-400 text-center mt-2">
                      Click to view full details
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredLeads.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} leads</h3>
                  <p className="text-gray-500">
                    {searchTerm || priorityFilter !== "all"
                      ? "Try adjusting your filters to see more leads."
                      : `No ${activeTab} leads at the moment.`}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Enhanced Lead Details Dialog */}
      <EnhancedLeadDetails
        lead={selectedLead}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onStatusUpdate={updateLeadStatus}
      />
    </div>
  );
};

export default VendorLeads;
