"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Edit,
  FileText,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Star,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";

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

const LeadDetailsDialog = ({
  lead,
  open,
  onOpenChange,
  onStatusUpdate,
}: LeadDetailsDialogProps) => {
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const { toast } = useToast();

  if (!lead) return null;

  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-yellow-100 text-yellow-800";
      case "quoted":
        return "bg-purple-100 text-purple-800";
      case "won":
        return "bg-green-100 text-green-800";
      case "lost":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: Lead["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
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
    {
      id: 1,
      type: "chat",
      message: "Initial inquiry received",
      timestamp: "2024-01-15T10:00:00Z",
      sender: "client",
    },
    {
      id: 2,
      type: "call",
      message: "Follow-up call scheduled",
      timestamp: "2024-01-16T14:30:00Z",
      sender: "vendor",
    },
    {
      id: 3,
      type: "chat",
      message: "Sent preliminary quote",
      timestamp: "2024-01-17T09:15:00Z",
      sender: "vendor",
    },
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{lead.eventName}</DialogTitle>
              <DialogDescription className="mt-1 text-base">
                Client: {lead.clientName}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(lead.status)}>
                {lead.status}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">
                  {lead.matchScore}% match
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-4"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent
            value="details"
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">Event Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      {new Date(lead.eventDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      {lead.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gray-500" />
                      {lead.guestCount} guests
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-gray-500" />$
                      {lead.budget.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">Priority & Scoring</h4>
                  <div className="space-y-2">
                    <div
                      className={`text-sm font-medium ${getPriorityColor(lead.priority)}`}
                    >
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
                        Last Contact:{" "}
                        {new Date(lead.lastContact).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Requirements</h4>
                <p className="rounded bg-gray-50 p-3 text-sm text-gray-700">
                  {lead.requirements}
                </p>

                {lead.lostReason && (
                  <div className="mt-4">
                    <h4 className="mb-2 font-semibold text-red-600">
                      Lost Reason
                    </h4>
                    <p className="rounded bg-red-50 p-3 text-sm text-red-700">
                      {lead.lostReason}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="communication"
            className="space-y-4"
          >
            <div className="mb-4 flex gap-2">
              <Button
                onClick={handleStartChat}
                className="flex-1"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Chat
              </Button>
              <Button
                onClick={handleScheduleCall}
                variant="outline"
                className="flex-1"
              >
                <Phone className="mr-2 h-4 w-4" />
                Schedule Call
              </Button>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Communication History</h4>
              {mockCommunicationHistory.map((comm) => (
                <div
                  key={comm.id}
                  className="rounded border p-3"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {comm.type === "chat" ? (
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                      ) : (
                        <Phone className="h-4 w-4 text-green-500" />
                      )}
                      <span className="text-sm font-medium capitalize">
                        {comm.type}
                      </span>
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
                <Send className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            </div>
          </TabsContent>

          <TabsContent
            value="timeline"
            className="space-y-4"
          >
            <div className="space-y-3">
              <h4 className="font-semibold">Lead Timeline</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Lead created</p>
                    <p className="text-xs text-gray-500">
                      {new Date(lead.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {lead.lastContact && (
                  <div className="flex items-center gap-3 rounded border p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                      <MessageSquare className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Last contact</p>
                      <p className="text-xs text-gray-500">
                        {new Date(lead.lastContact).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {lead.proposalSent && (
                  <div className="flex items-center gap-3 rounded border p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                      <FileText className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Proposal sent</p>
                      <p className="text-xs text-gray-500">
                        Awaiting client response
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="actions"
            className="space-y-4"
          >
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
                    <Button
                      onClick={handleStartChat}
                      variant="outline"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat Now
                    </Button>
                    <Button
                      onClick={handleScheduleCall}
                      variant="outline"
                    >
                      <Phone className="mr-2 h-4 w-4" />
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
                    <FileText className="mr-2 h-4 w-4" />
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
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Won
                  </Button>
                  <Button
                    onClick={() => handleStatusUpdate("lost")}
                    variant="outline"
                    className="w-full"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Mark as Lost
                  </Button>
                </div>
              )}

              <div className="border-t pt-4">
                <h5 className="mb-2 font-medium">Quick Actions</h5>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Lead
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <FileText className="mr-2 h-4 w-4" />
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
