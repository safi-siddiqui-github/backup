
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Handshake, DollarSign, MessageSquare, Clock, ArrowRight, Target } from "lucide-react";
import type { Proposal } from "./ComprehensiveBudgetModule";
import type { VendorProfile, MilestoneAdjustment } from "@/types/budget";
import VendorMilestoneNegotiator from "./VendorMilestoneNegotiator";

interface NegotiationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposal: Proposal | null;
  vendor: VendorProfile | null;
  expenseItem?: { milestones?: any[] } | null;
  onSubmit: (negotiationData: NegotiationData) => void;
}

export interface NegotiationData {
  proposalId: string;
  counterOffer: number;
  adjustments: {
    item: string;
    originalPrice: number;
    newPrice: number;
    reason: string;
  }[];
  milestoneAdjustments?: MilestoneAdjustment[];
  timelineChanges: string;
  additionalRequests: string;
  message: string;
}

const NegotiationDialog = ({ 
  open, 
  onOpenChange, 
  proposal, 
  vendor,
  expenseItem,
  onSubmit 
}: NegotiationDialogProps) => {
  const [counterOffer, setCounterOffer] = useState("");
  const [timelineChanges, setTimelineChanges] = useState("");
  const [additionalRequests, setAdditionalRequests] = useState("");
  const [message, setMessage] = useState("");
  const [adjustments, setAdjustments] = useState<{item: string; originalPrice: number; newPrice: number; reason: string}[]>([]);
  const [milestoneAdjustments, setMilestoneAdjustments] = useState<MilestoneAdjustment[]>([]);

  const handleAddAdjustment = () => {
    if (proposal) {
      setAdjustments([...adjustments, {
        item: "",
        originalPrice: 0,
        newPrice: 0,
        reason: ""
      }]);
    }
  };

  const handleUpdateAdjustment = (index: number, field: string, value: string | number) => {
    const newAdjustments = [...adjustments];
    newAdjustments[index] = { ...newAdjustments[index], [field]: value };
    setAdjustments(newAdjustments);
  };

  const handleRemoveAdjustment = (index: number) => {
    setAdjustments(adjustments.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!proposal) return;

    const negotiationData: NegotiationData = {
      proposalId: proposal.id,
      counterOffer: parseFloat(counterOffer) || proposal.totalCost,
      adjustments,
      milestoneAdjustments: milestoneAdjustments.length > 0 ? milestoneAdjustments : undefined,
      timelineChanges,
      additionalRequests,
      message
    };

    onSubmit(negotiationData);
    onOpenChange(false);
    
    // Reset form
    setCounterOffer("");
    setTimelineChanges("");
    setAdditionalRequests("");
    setMessage("");
    setAdjustments([]);
    setMilestoneAdjustments([]);
  };

  if (!proposal || !vendor) return null;

  const totalAdjustments = adjustments.reduce((sum, adj) => sum + (adj.newPrice - adj.originalPrice), 0);
  const suggestedTotal = proposal.totalCost + totalAdjustments;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Handshake className="w-6 h-6 text-blue-600" />
            Negotiate Proposal with {vendor.name}
          </DialogTitle>
        </DialogHeader>

        {/* Original Proposal Summary */}
        <div className="p-4 bg-gray-50 rounded-lg mb-6">
          <h3 className="font-semibold mb-3">Original Proposal</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">{proposal.title}</p>
              <p className="text-sm text-gray-600">{proposal.description}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">${proposal.totalCost.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Timeline: {proposal.timeline}</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="pricing" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="milestones">
              <Target className="w-4 h-4 mr-1" />
              Milestones
            </TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="pricing" className="space-y-6 mt-4">

          {/* Counter Offer */}
          <div>
            <Label htmlFor="counterOffer">Counter Offer Amount</Label>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex-1">
                <Input
                  id="counterOffer"
                  type="number"
                  placeholder={proposal.totalCost.toString()}
                  value={counterOffer}
                  onChange={(e) => setCounterOffer(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Original:</span>
                <Badge variant="outline">${proposal.totalCost.toLocaleString()}</Badge>
                {counterOffer && (
                  <>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      ${parseFloat(counterOffer).toLocaleString()}
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Line Item Adjustments */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Line Item Adjustments (Optional)</Label>
              <Button variant="outline" size="sm" onClick={handleAddAdjustment}>
                Add Adjustment
              </Button>
            </div>
            
            {adjustments.map((adjustment, index) => (
              <div key={index} className="p-4 border rounded-lg mb-3">
                <div className="grid grid-cols-4 gap-3 mb-3">
                  <div>
                    <Label className="text-xs">Item</Label>
                    <Input
                      placeholder="Item name"
                      value={adjustment.item}
                      onChange={(e) => handleUpdateAdjustment(index, 'item', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Original Price</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={adjustment.originalPrice}
                      onChange={(e) => handleUpdateAdjustment(index, 'originalPrice', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">New Price</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={adjustment.newPrice}
                      onChange={(e) => handleUpdateAdjustment(index, 'newPrice', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" size="sm" onClick={() => handleRemoveAdjustment(index)}>
                      Remove
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Reason for Adjustment</Label>
                  <Input
                    placeholder="Explain why this adjustment is needed"
                    value={adjustment.reason}
                    onChange={(e) => handleUpdateAdjustment(index, 'reason', e.target.value)}
                  />
                </div>
              </div>
            ))}

            {adjustments.length > 0 && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Suggested Total with Adjustments:</span>
                  <span className="font-bold text-lg">${suggestedTotal.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Timeline Changes */}
          <div>
            <Label htmlFor="timeline">Timeline Modifications</Label>
            <Input
              id="timeline"
              placeholder="e.g., Need completion 1 week earlier, flexible on start date"
              value={timelineChanges}
              onChange={(e) => setTimelineChanges(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Additional Requests */}
          <div>
            <Label htmlFor="additional">Additional Services or Modifications</Label>
            <Textarea
              id="additional"
              placeholder="Any additional services you'd like included or modifications to the scope..."
              value={additionalRequests}
              onChange={(e) => setAdditionalRequests(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Negotiation Message */}
          <div>
            <Label htmlFor="message">Negotiation Message</Label>
            <Textarea
              id="message"
              placeholder="Explain your negotiation position, priorities, and any flexibility you have..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 min-h-[100px]"
            />
          </div>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-4 mt-4">
            <VendorMilestoneNegotiator
              originalMilestones={expenseItem?.milestones || []}
              onAdjustmentsChange={setMilestoneAdjustments}
            />
          </TabsContent>

          <TabsContent value="details" className="space-y-6 mt-4">
            <div>
              <Label htmlFor="timeline">Timeline Modifications</Label>
              <Input
                id="timeline"
                placeholder="e.g., Need completion 1 week earlier, flexible on start date"
                value={timelineChanges}
                onChange={(e) => setTimelineChanges(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="additional">Additional Services or Modifications</Label>
              <Textarea
                id="additional"
                placeholder="Any additional services you'd like included or modifications to the scope..."
                value={additionalRequests}
                onChange={(e) => setAdditionalRequests(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="message">Negotiation Message</Label>
              <Textarea
                id="message"
                placeholder="Explain your negotiation position, priorities, and any flexibility you have..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 min-h-[100px]"
              />
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        {/* Negotiation Summary */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Negotiation Summary
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Original Proposal:</strong> ${proposal.totalCost.toLocaleString()}</p>
                <p><strong>Your Counter Offer:</strong> ${(parseFloat(counterOffer) || proposal.totalCost).toLocaleString()}</p>
                {adjustments.length > 0 && (
                  <p><strong>With Adjustments:</strong> ${suggestedTotal.toLocaleString()}</p>
                )}
              </div>
            <div>
              <p><strong>Vendor Response Time:</strong> {vendor.responseTime}</p>
              <p><strong>Negotiation Status:</strong> <Badge variant="outline">Pending Response</Badge></p>
              {milestoneAdjustments.length > 0 && (
                <p><strong>Milestone Adjustments:</strong> {milestoneAdjustments.length}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Handshake className="w-4 h-4 mr-2" />
              Send Negotiation
            </Button>
          </div>
      </DialogContent>
    </Dialog>
  );
};

export default NegotiationDialog;
