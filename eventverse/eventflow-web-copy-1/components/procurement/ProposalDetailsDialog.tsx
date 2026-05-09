"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  CheckCircle,
  Download,
  Edit,
  FileText,
  MessageSquare,
  Star,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import type { Proposal } from "./types";

interface ProposalItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface ProposalDetailsDialogProps {
  proposal: Proposal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAcceptProposal: (proposalId: string) => void;
  onDeclineProposal: (proposalId: string) => void;
  onContactVendor: (proposal: Proposal) => void;
  onNegotiate: (proposalId: string, counterOffer: number) => void;
}

const ProposalDetailsDialog = ({
  proposal,
  open,
  onOpenChange,
  onAcceptProposal,
  onDeclineProposal,
  onContactVendor,
  onNegotiate,
}: ProposalDetailsDialogProps) => {
  const [activeTab, setActiveTab] = useState("details");
  const [counterOffer, setCounterOffer] = useState("");
  const [negotiationNotes, setNegotiationNotes] = useState("");
  const { toast } = useToast();

  if (!proposal) return null;

  // Mock detailed proposal data
  const proposalItems: ProposalItem[] = [
    {
      id: "1",
      name: "Venue Setup & Decoration",
      description: "Complete venue transformation with themed decorations",
      quantity: 1,
      unitPrice: 2500,
      total: 2500,
    },
    {
      id: "2",
      name: "Catering Service",
      description: "3-course dinner for 150 guests with dietary accommodations",
      quantity: 150,
      unitPrice: 45,
      total: 6750,
    },
    {
      id: "3",
      name: "Audio/Visual Equipment",
      description: "Professional sound system, lighting, and projection setup",
      quantity: 1,
      unitPrice: 1200,
      total: 1200,
    },
    {
      id: "4",
      name: "Service Staff",
      description: "Professional wait staff and event coordinators",
      quantity: 8,
      unitPrice: 150,
      total: 1200,
    },
  ];

  const subtotal = proposalItems.reduce((sum, item) => sum + item.total, 0);
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const timeline = [
    {
      phase: "Planning & Coordination",
      duration: "2 weeks",
      description:
        "Initial planning, vendor coordination, and final confirmations",
    },
    {
      phase: "Setup",
      duration: "1 day",
      description: "Venue decoration and equipment installation",
    },
    {
      phase: "Event Execution",
      duration: "1 day",
      description: "Full event management and service",
    },
    {
      phase: "Cleanup",
      duration: "0.5 days",
      description: "Post-event cleanup and equipment removal",
    },
  ];

  const attachments = [
    { name: "Detailed Menu Options.pdf", size: "2.3 MB", type: "pdf" },
    { name: "Venue Layout Proposal.jpg", size: "1.8 MB", type: "image" },
    { name: "Equipment Specifications.docx", size: "890 KB", type: "document" },
    { name: "Insurance Certificate.pdf", size: "1.2 MB", type: "pdf" },
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
    const counterAmount = parseFloat(counterOffer);
    if (!counterAmount || counterAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid counter offer amount.",
        variant: "destructive",
      });
      return;
    }

    onNegotiate(proposal.id, counterAmount);
    toast({
      title: "Counter offer sent",
      description: `Counter offer of $${counterAmount.toLocaleString()} sent to ${proposal.vendorName}.`,
    });
    setCounterOffer("");
    setNegotiationNotes("");
  };

  const getStatusColor = (status: Proposal["status"]) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "under_review":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      case "negotiating":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">Proposal Details</DialogTitle>
              <DialogDescription className="mt-1 text-base">
                From {proposal.vendorName} • Submitted{" "}
                {format(proposal.submittedAt, "MMM d, yyyy")}
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

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
            <TabsTrigger value="negotiate">Negotiate</TabsTrigger>
          </TabsList>

          <TabsContent
            value="details"
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Proposal Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-700">{proposal.description}</p>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
                      <Star className="inline h-6 w-6" />
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
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Full event management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Professional staff included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Equipment & setup included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Cleanup service</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Insurance coverage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>24/7 event support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value="pricing"
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Itemized Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposalItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between rounded border p-4"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="mt-1 text-sm text-gray-600">
                          {item.description}
                        </p>
                        <div className="mt-1 text-sm text-gray-500">
                          Qty: {item.quantity} × $
                          {item.unitPrice.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          ${item.total.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax ({(taxRate * 100).toFixed(0)}%):</span>
                      <span>${tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 text-lg font-bold">
                      <span>Total:</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value="timeline"
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeline.map((phase, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 rounded border p-4"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-start justify-between">
                          <h4 className="font-medium">{phase.phase}</h4>
                          <Badge variant="outline">{phase.duration}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value="attachments"
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Proposal Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <div className="font-medium">{file.name}</div>
                          <div className="text-sm text-gray-500">
                            {file.size}
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                      >
                        <Download className="mr-1 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value="negotiate"
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle>Negotiate Proposal</CardTitle>
                <div className="text-sm text-gray-600">
                  Current proposal amount: $
                  {proposal.priceQuote.toLocaleString()}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Counter Offer Amount
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter counter offer amount"
                    value={counterOffer}
                    onChange={(e) => setCounterOffer(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Negotiation Notes
                  </label>
                  <Textarea
                    placeholder="Add notes about your counter offer..."
                    value={negotiationNotes}
                    onChange={(e) => setNegotiationNotes(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button
                  onClick={handleNegotiate}
                  className="w-full"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Send Counter Offer
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 border-t pt-4">
          <Button
            onClick={() => onContactVendor(proposal)}
            variant="outline"
            className="flex-1"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Vendor
          </Button>

          {proposal.status === "submitted" && (
            <>
              <Button
                onClick={handleAccept}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Accept Proposal
              </Button>
              <Button
                onClick={handleDecline}
                variant="outline"
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
              >
                <XCircle className="mr-2 h-4 w-4" />
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
