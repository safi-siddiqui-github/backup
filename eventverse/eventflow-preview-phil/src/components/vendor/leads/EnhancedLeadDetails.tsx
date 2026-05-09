
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Users, 
  Phone, 
  MessageSquare,
  FileText,
  CreditCard,
  Clock,
  Star,
  Brain,
  Video,
  Mail,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AIProposalGenerator from "../ai/AIProposalGenerator";
import PaymentRequestDialog from "../dialogs/PaymentRequestDialog";
import ClientCommunicationHub from "./ClientCommunicationHub";
import NegotiationTracker from "./NegotiationTracker";
import ProjectTimeline from "./ProjectTimeline";

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
  clientEmail?: string;
  clientPhone?: string;
  eventType?: string;
  specialRequirements?: string[];
}

interface EnhancedLeadDetailsProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusUpdate: (leadId: string, newStatus: Lead["status"]) => void;
}

const EnhancedLeadDetails = ({ lead, open, onOpenChange, onStatusUpdate }: EnhancedLeadDetailsProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  if (!lead) return null;

  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} initiated`,
      description: `${action} with ${lead.clientName} has been started`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl">{lead.eventName}</DialogTitle>
              <p className="text-gray-600 mt-1">Client: {lead.clientName}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={lead.priority === "high" ? "destructive" : lead.priority === "medium" ? "default" : "secondary"}>
                {lead.priority} priority
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{lead.matchScore}% match</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Quick Actions Bar */}
        <div className="flex gap-2 border-b pb-4">
          <Button onClick={() => handleQuickAction("Video Call")} size="sm">
            <Video className="w-4 h-4 mr-2" />
            Video Call
          </Button>
          <Button onClick={() => handleQuickAction("Phone Call")} variant="outline" size="sm">
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
          <Button onClick={() => handleQuickAction("Email")} variant="outline" size="sm">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>
          <AIProposalGenerator>
            <Button variant="outline" size="sm">
              <Brain className="w-4 h-4 mr-2" />
              AI Proposal
            </Button>
          </AIProposalGenerator>
          <PaymentRequestDialog>
            <Button variant="outline" size="sm">
              <CreditCard className="w-4 h-4 mr-2" />
              Request Payment
            </Button>
          </PaymentRequestDialog>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="negotiations">Negotiations</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Client Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{lead.clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{lead.clientEmail || "sarah@email.com"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{lead.clientPhone || "+1 (555) 123-4567"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Preferred Contact:</span>
                    <span className="font-medium">Email</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{new Date(lead.eventDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{lead.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-medium">{lead.guestCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget:</span>
                    <span className="font-medium">${lead.budget.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Requirements & Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{lead.requirements}</p>
                <div className="space-y-2">
                  <h4 className="font-medium">Special Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {(lead.specialRequirements || ["Vegetarian Options", "Outdoor Setup", "Sound System"]).map((req, index) => (
                      <Badge key={index} variant="outline">{req}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication">
            <ClientCommunicationHub leadId={lead.id} clientName={lead.clientName} />
          </TabsContent>

          <TabsContent value="proposals" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Proposals</h3>
              <AIProposalGenerator>
                <Button>
                  <Brain className="w-4 h-4 mr-2" />
                  Generate New Proposal
                </Button>
              </AIProposalGenerator>
            </div>
            <div className="space-y-3">
              {[
                { id: 1, name: "Wedding Photography Package", status: "sent", date: "2024-01-20", amount: 8500 },
                { id: 2, name: "Premium Wedding Package", status: "draft", date: "2024-01-22", amount: 12000 }
              ].map((proposal) => (
                <Card key={proposal.id}>
                  <CardContent className="flex justify-between items-center p-4">
                    <div>
                      <h4 className="font-medium">{proposal.name}</h4>
                      <p className="text-sm text-gray-600">Created: {proposal.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${proposal.amount.toLocaleString()}</p>
                      <Badge variant={proposal.status === "sent" ? "default" : "secondary"}>
                        {proposal.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="negotiations">
            <NegotiationTracker leadId={lead.id} />
          </TabsContent>

          <TabsContent value="timeline">
            <ProjectTimeline leadId={lead.id} eventDate={lead.eventDate} />
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Billing & Payments</h3>
              <PaymentRequestDialog>
                <Button>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Request Payment
                </Button>
              </PaymentRequestDialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Payment Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Deposit (50%)", amount: 4250, status: "paid", date: "2024-01-15" },
                      { name: "Progress Payment", amount: 2125, status: "pending", date: "2024-06-01" },
                      { name: "Final Payment", amount: 2125, status: "scheduled", date: "2024-08-15" }
                    ].map((payment, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{payment.name}</p>
                          <p className="text-sm text-gray-600">{payment.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${payment.amount.toLocaleString()}</p>
                          <Badge variant={payment.status === "paid" ? "default" : payment.status === "pending" ? "destructive" : "secondary"}>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Invoice History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { id: "INV-001", amount: 4250, status: "paid", date: "2024-01-15" },
                      { id: "INV-002", amount: 2125, status: "sent", date: "2024-05-01" }
                    ].map((invoice) => (
                      <div key={invoice.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{invoice.id}</p>
                          <p className="text-sm text-gray-600">{invoice.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${invoice.amount.toLocaleString()}</p>
                          <Badge variant={invoice.status === "paid" ? "default" : "secondary"}>
                            {invoice.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedLeadDetails;
