
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar, 
  MapPin, 
  DollarSign, 
  Users, 
  Star, 
  Clock, 
  Phone, 
  MessageSquare,
  CheckCircle,
  XCircle,
  FileText,
  Video,
  Edit,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface LeadDetailsDialogProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusUpdate: (leadId: string, newStatus: Lead["status"]) => void;
}

const LeadDetailsDialog = ({ lead, open, onOpenChange, onStatusUpdate }: LeadDetailsDialogProps) => {
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const { toast } = useToast();

  if (!lead) return null;

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

  const handleStatusUpdate = (newStatus: Lead["status"]) => {
    onStatusUpdate(lead.id, newStatus);
    toast({
      title: "Lead status updated",
      description: `Lead moved to ${newStatus}`,
    });
  };

  const handleStartChat = () => {
    toast({
      title: "Chat started",
      description: `Opening chat with ${lead.clientName}`,
    });
    // Here you would integrate with your in-app chat system
  };

  const handleScheduleCall = () => {
    toast({
      title: "Call scheduled",
      description: `Call scheduled with ${lead.clientName}`,
    });
    // Here you would integrate with your in-app call system
  };

  const mockCommunicationHistory = [
    { id: 1, type: "chat", message: "Initial inquiry received", timestamp: "2024-01-15T10:00:00Z", sender: "client" },
    { id: 2, type: "call", message: "Follow-up call scheduled", timestamp: "2024-01-16T14:30:00Z", sender: "vendor" },
    { id: 3, type: "chat", message: "Sent preliminary quote", timestamp: "2024-01-17T09:15:00Z", sender: "vendor" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-xl">{lead.eventName}</DialogTitle>
              <DialogDescription className="text-base mt-1">
                Client: {lead.clientName}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(lead.status)}>
                {lead.status}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{lead.matchScore}% match</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Event Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      {new Date(lead.eventDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      {lead.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-500" />
                      {lead.guestCount} guests
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      ${lead.budget.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Priority & Scoring</h4>
                  <div className="space-y-2">
                    <div className={`text-sm font-medium ${getPriorityColor(lead.priority)}`}>
                      {lead.priority.toUpperCase()} PRIORITY
                    </div>
                    <div className="text-sm text-gray-600">
                      Match Score: {lead.matchScore}%
                    </div>
                    <div className="text-sm text-gray-600">
                      Created: {new Date(lead.createdAt).toLocaleDateString()}
                    </div>
                    {lead.lastContact && (
                      <div className="text-sm text-gray-600">
                        Last Contact: {new Date(lead.lastContact).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Requirements</h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                  {lead.requirements}
                </p>
                
                {lead.lostReason && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2 text-red-600">Lost Reason</h4>
                    <p className="text-sm text-red-700 bg-red-50 p-3 rounded">
                      {lead.lostReason}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="communication" className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button onClick={handleStartChat} className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Chat
              </Button>
              <Button onClick={handleScheduleCall} variant="outline" className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Schedule Call
              </Button>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Communication History</h4>
              {mockCommunicationHistory.map((comm) => (
                <div key={comm.id} className="border rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {comm.type === "chat" ? (
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                      ) : (
                        <Phone className="w-4 h-4 text-green-500" />
                      )}
                      <span className="text-sm font-medium capitalize">{comm.type}</span>
                      <span className="text-xs text-gray-500">
                        from {comm.sender}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(comm.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{comm.message}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h5 className="font-medium">Add Note</h5>
              <Textarea
                placeholder="Add a note about this lead..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button size="sm">
                <Send className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Lead Timeline</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border rounded">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Lead created</p>
                    <p className="text-xs text-gray-500">{new Date(lead.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                
                {lead.lastContact && (
                  <div className="flex items-center gap-3 p-3 border rounded">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Last contact</p>
                      <p className="text-xs text-gray-500">{new Date(lead.lastContact).toLocaleString()}</p>
                    </div>
                  </div>
                )}

                {lead.proposalSent && (
                  <div className="flex items-center gap-3 p-3 border rounded">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Proposal sent</p>
                      <p className="text-xs text-gray-500">Awaiting client response</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-semibold">Lead Actions</h4>
              
              {lead.status === "new" && (
                <div className="space-y-2">
                  <Button 
                    onClick={() => handleStatusUpdate("contacted")} 
                    className="w-full"
                  >
                    Mark as Contacted
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={handleStartChat} variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat Now
                    </Button>
                    <Button onClick={handleScheduleCall} variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </div>
              )}

              {lead.status === "contacted" && (
                <div className="space-y-2">
                  <Button 
                    onClick={() => handleStatusUpdate("quoted")} 
                    className="w-full"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Send Proposal
                  </Button>
                  <Button 
                    onClick={() => handleStatusUpdate("lost")} 
                    variant="outline" 
                    className="w-full"
                  >
                    Mark as Lost
                  </Button>
                </div>
              )}

              {lead.status === "quoted" && (
                <div className="space-y-2">
                  <Button 
                    onClick={() => handleStatusUpdate("won")} 
                    className="w-full"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Won
                  </Button>
                  <Button 
                    onClick={() => handleStatusUpdate("lost")} 
                    variant="outline" 
                    className="w-full"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Mark as Lost
                  </Button>
                </div>
              )}

              <div className="pt-4 border-t">
                <h5 className="font-medium mb-2">Quick Actions</h5>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Lead
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    View Proposal
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailsDialog;
