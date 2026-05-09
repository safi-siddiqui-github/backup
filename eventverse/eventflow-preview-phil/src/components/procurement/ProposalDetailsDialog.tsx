
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  DollarSign,
  Clock,
  FileText,
  MessageSquare,
  CheckCircle,
  XCircle,
  Edit,
  Download,
  Calendar,
  Package,
  Star,
  TrendingUp,
  AlertCircle,
  Handshake
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import EditableCostBreakdown from "./EditableCostBreakdown";
import EditableDeliverables from "./EditableDeliverables";
import type { Proposal, ProposalLineItem, DetailedNegotiationData, NegotiationLineItemEdit, NegotiationDeliverableEdit } from "./types";

interface ProposalDetailsDialogProps {
  proposal: Proposal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAcceptProposal: (proposalId: string) => void;
  onDeclineProposal: (proposalId: string) => void;
  onContactVendor: (proposal: Proposal) => void;
  onNegotiate: (proposalId: string, negotiationData: DetailedNegotiationData) => void;
}

const ProposalDetailsDialog = ({ 
  proposal, 
  open, 
  onOpenChange, 
  onAcceptProposal,
  onDeclineProposal,
  onContactVendor,
  onNegotiate
}: ProposalDetailsDialogProps) => {
  const [activeTab, setActiveTab] = useState("details");
  const [counterOffer, setCounterOffer] = useState("");
  const [negotiationNotes, setNegotiationNotes] = useState("");
  const [timelineChanges, setTimelineChanges] = useState("");
  const [additionalRequests, setAdditionalRequests] = useState("");
  const [lineItemEdits, setLineItemEdits] = useState<NegotiationLineItemEdit[]>([]);
  const [deliverableEdits, setDeliverableEdits] = useState<NegotiationDeliverableEdit[]>([]);
  const { toast } = useToast();

  if (!proposal) return null;

  // Mock detailed proposal data - use from proposal or fallback to mock
  const proposalItems: ProposalLineItem[] = proposal?.costBreakdown || [
    {
      id: "1",
      name: "Venue Setup & Decoration",
      description: "Complete venue transformation with themed decorations",
      quantity: 1,
      unitPrice: 2500,
      total: 2500
    },
    {
      id: "2",
      name: "Catering Service",
      description: "3-course dinner for 150 guests with dietary accommodations",
      quantity: 150,
      unitPrice: 45,
      total: 6750
    },
    {
      id: "3",
      name: "Audio/Visual Equipment",
      description: "Professional sound system, lighting, and projection setup",
      quantity: 1,
      unitPrice: 1200,
      total: 1200
    },
    {
      id: "4",
      name: "Service Staff",
      description: "Professional wait staff and event coordinators",
      quantity: 8,
      unitPrice: 150,
      total: 1200
    }
  ];

  // Mock deliverables - use from proposal or fallback to mock
  const deliverables: string[] = proposal?.deliverables || [
    "Complete venue transformation with custom themed decorations and lighting",
    "Full catering service including 3-course dinner with vegetarian and dietary restriction options",
    "Professional audio/visual setup with microphones, speakers, and projection capabilities",
    "Dedicated event staff including servers, coordinators, and cleanup crew",
    "Post-event cleanup and equipment removal within 24 hours",
    "Event photography documentation and digital delivery within 48 hours"
  ];

  const subtotal = proposalItems.reduce((sum, item) => sum + item.total, 0);
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const timeline = [
    { phase: "Planning & Coordination", duration: "2 weeks", description: "Initial planning, vendor coordination, and final confirmations" },
    { phase: "Setup", duration: "1 day", description: "Venue decoration and equipment installation" },
    { phase: "Event Execution", duration: "1 day", description: "Full event management and service" },
    { phase: "Cleanup", duration: "0.5 days", description: "Post-event cleanup and equipment removal" }
  ];

  const attachments = [
    { name: "Detailed Menu Options.pdf", size: "2.3 MB", type: "pdf" },
    { name: "Venue Layout Proposal.jpg", size: "1.8 MB", type: "image" },
    { name: "Equipment Specifications.docx", size: "890 KB", type: "document" },
    { name: "Insurance Certificate.pdf", size: "1.2 MB", type: "pdf" }
  ];

  const handleAccept = () => {
    onAcceptProposal(proposal.id);
    onOpenChange(false);
    toast({
      title: "Proposal accepted",
      description: `Proposal from ${proposal.vendorName} has been accepted.`,
    });
  };

  const handleDecline = () => {
    onDeclineProposal(proposal.id);
    onOpenChange(false);
    toast({
      title: "Proposal declined",
      description: `Proposal from ${proposal.vendorName} has been declined.`,
    });
  };

  const handleNegotiate = () => {
    if (!negotiationNotes.trim() && lineItemEdits.length === 0 && deliverableEdits.length === 0 && !counterOffer) {
      toast({
        title: "No changes specified",
        description: "Please specify changes to cost items, deliverables, or add a counter offer with notes.",
        variant: "destructive"
      });
      return;
    }

    const negotiationData: DetailedNegotiationData = {
      proposalId: proposal.id,
      counterOffer: counterOffer ? parseFloat(counterOffer) : undefined,
      lineItemEdits,
      deliverableEdits,
      timelineChanges: timelineChanges || undefined,
      additionalRequests: additionalRequests || undefined,
      message: negotiationNotes
    };

    onNegotiate(proposal.id, negotiationData);
    
    const changesCount = lineItemEdits.length + deliverableEdits.length + (counterOffer ? 1 : 0);
    toast({
      title: "Detailed negotiation sent",
      description: `Negotiation with ${changesCount} change${changesCount !== 1 ? 's' : ''} sent to ${proposal.vendorName}.`,
    });
    
    // Reset form
    setCounterOffer("");
    setNegotiationNotes("");
    setTimelineChanges("");
    setAdditionalRequests("");
    setLineItemEdits([]);
    setDeliverableEdits([]);
  };

  const getStatusColor = (status: Proposal["status"]) => {
    switch (status) {
      case "submitted": return "bg-blue-100 text-blue-800";
      case "under_review": return "bg-yellow-100 text-yellow-800";
      case "accepted": return "bg-green-100 text-green-800";
      case "declined": return "bg-red-100 text-red-800";
      case "negotiating": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-xl">Proposal Details</DialogTitle>
              <DialogDescription className="text-base mt-1">
                From {proposal.vendorName} • Submitted {format(proposal.submittedAt, "MMM d, yyyy")}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(proposal.status)}>
                {proposal.status.replace("_", " ")}
              </Badge>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  ${proposal.priceQuote.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Total Quote</div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
            <TabsTrigger value="negotiate">Negotiate</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Proposal Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{proposal.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ${proposal.priceQuote.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Cost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {proposal.deliveryTimeline}
                    </div>
                    <div className="text-sm text-gray-600">Timeline</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      <Star className="w-6 h-6 inline" />
                      4.8
                    </div>
                    <div className="text-sm text-gray-600">Vendor Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      94%
                    </div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {proposal.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Vendor Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{proposal.notes}</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Full event management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Professional staff included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Equipment & setup included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Cleanup service</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Insurance coverage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>24/7 event support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Itemized Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposalItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start p-4 border rounded">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        <div className="text-sm text-gray-500 mt-1">
                          Qty: {item.quantity} × ${item.unitPrice.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${item.total.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax ({(taxRate * 100).toFixed(0)}%):</span>
                      <span>${tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((phase, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{phase.phase}</h4>
                          <Badge variant="outline">{phase.duration}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attachments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Proposal Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="font-medium">{file.name}</div>
                          <div className="text-sm text-gray-500">{file.size}</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="negotiate" className="space-y-6">
            {/* Overview Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-blue-600" />
                  Detailed Negotiation
                </CardTitle>
                <div className="text-sm text-gray-600">
                  Original proposal: ${proposal.priceQuote.toLocaleString()} • Edit individual items and deliverables below
                </div>
              </CardHeader>
            </Card>

            {/* Editable Cost Breakdown */}
            <EditableCostBreakdown 
              originalItems={proposalItems}
              onEditsChange={setLineItemEdits}
            />

            {/* Editable Deliverables */}
            <EditableDeliverables 
              originalDeliverables={deliverables}
              onEditsChange={setDeliverableEdits}
            />

            {/* Additional Negotiation Fields */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Changes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Overall Counter Offer (Optional)</label>
                  <Input
                    type="number"
                    placeholder="Enter total counter offer amount if different from item edits"
                    value={counterOffer}
                    onChange={(e) => setCounterOffer(e.target.value)}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Leave blank to use the total from line item edits above
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Timeline Changes</label>
                  <Input
                    placeholder="e.g., Need completion 1 week earlier, flexible on start date"
                    value={timelineChanges}
                    onChange={(e) => setTimelineChanges(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Additional Requests</label>
                  <Textarea
                    placeholder="Any additional services or scope modifications..."
                    value={additionalRequests}
                    onChange={(e) => setAdditionalRequests(e.target.value)}
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Negotiation Message *</label>
                  <Textarea
                    placeholder="Explain your negotiation position, priorities, and reasoning..."
                    value={negotiationNotes}
                    onChange={(e) => setNegotiationNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={handleNegotiate} 
                  className="w-full"
                  disabled={!negotiationNotes.trim() && lineItemEdits.length === 0 && deliverableEdits.length === 0 && !counterOffer}
                >
                  <Handshake className="w-4 h-4 mr-2" />
                  Send Detailed Negotiation
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 pt-4 border-t">
          <Button onClick={() => onContactVendor(proposal)} variant="outline" className="flex-1">
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Vendor
          </Button>
          
          {proposal.status === "submitted" && (
            <>
              <Button onClick={handleAccept} className="flex-1 bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Accept Proposal
              </Button>
              <Button onClick={handleDecline} variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
                <XCircle className="w-4 h-4 mr-2" />
                Decline
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProposalDetailsDialog;
