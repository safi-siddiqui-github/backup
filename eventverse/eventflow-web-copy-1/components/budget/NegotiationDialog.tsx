"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { VendorProfile } from "@/types/budget";
import { ArrowRight, Handshake, MessageSquare } from "lucide-react";
import { useState } from "react";
import type { Proposal } from "./ComprehensiveBudgetModule";

interface NegotiationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposal: Proposal | null;
  vendor: VendorProfile | null;
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
  timelineChanges: string;
  additionalRequests: string;
  message: string;
}

const NegotiationDialog = ({
  open,
  onOpenChange,
  proposal,
  vendor,
  onSubmit,
}: NegotiationDialogProps) => {
  const [counterOffer, setCounterOffer] = useState("");
  const [timelineChanges, setTimelineChanges] = useState("");
  const [additionalRequests, setAdditionalRequests] = useState("");
  const [message, setMessage] = useState("");
  const [adjustments, setAdjustments] = useState<
    { item: string; originalPrice: number; newPrice: number; reason: string }[]
  >([]);

  const handleAddAdjustment = () => {
    if (proposal) {
      setAdjustments([
        ...adjustments,
        {
          item: "",
          originalPrice: 0,
          newPrice: 0,
          reason: "",
        },
      ]);
    }
  };

  const handleUpdateAdjustment = (
    index: number,
    field: string,
    value: string | number,
  ) => {
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
      timelineChanges,
      additionalRequests,
      message,
    };

    onSubmit(negotiationData);
    onOpenChange(false);

    // Reset form
    setCounterOffer("");
    setTimelineChanges("");
    setAdditionalRequests("");
    setMessage("");
    setAdjustments([]);
  };

  if (!proposal || !vendor) return null;

  const totalAdjustments = adjustments.reduce(
    (sum, adj) => sum + (adj.newPrice - adj.originalPrice),
    0,
  );
  const suggestedTotal = proposal.totalCost + totalAdjustments;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Handshake className="h-6 w-6 text-blue-600" />
            Negotiate Proposal with {vendor.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Original Proposal Summary */}
          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-3 font-semibold">Original Proposal</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">{proposal.title}</p>
                <p className="text-sm text-gray-600">{proposal.description}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  ${proposal.totalCost.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Timeline: {proposal.timeline}
                </p>
              </div>
            </div>
          </div>

          {/* Counter Offer */}
          <div>
            <Label htmlFor="counterOffer">Counter Offer Amount</Label>
            <div className="mt-2 flex items-center gap-4">
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
                <Badge variant="outline">
                  ${proposal.totalCost.toLocaleString()}
                </Badge>
                {counterOffer && (
                  <>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700"
                    >
                      ${parseFloat(counterOffer).toLocaleString()}
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Line Item Adjustments */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <Label>Line Item Adjustments (Optional)</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddAdjustment}
              >
                Add Adjustment
              </Button>
            </div>

            {adjustments.map((adjustment, index) => (
              <div
                key={index}
                className="mb-3 rounded-lg border p-4"
              >
                <div className="mb-3 grid grid-cols-4 gap-3">
                  <div>
                    <Label className="text-xs">Item</Label>
                    <Input
                      placeholder="Item name"
                      value={adjustment.item}
                      onChange={(e) =>
                        handleUpdateAdjustment(index, "item", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Original Price</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={adjustment.originalPrice}
                      onChange={(e) =>
                        handleUpdateAdjustment(
                          index,
                          "originalPrice",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-xs">New Price</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={adjustment.newPrice}
                      onChange={(e) =>
                        handleUpdateAdjustment(
                          index,
                          "newPrice",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveAdjustment(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Reason for Adjustment</Label>
                  <Input
                    placeholder="Explain why this adjustment is needed"
                    value={adjustment.reason}
                    onChange={(e) =>
                      handleUpdateAdjustment(index, "reason", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            {adjustments.length > 0 && (
              <div className="rounded-lg bg-blue-50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Suggested Total with Adjustments:
                  </span>
                  <span className="text-lg font-bold">
                    ${suggestedTotal.toLocaleString()}
                  </span>
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
            <Label htmlFor="additional">
              Additional Services or Modifications
            </Label>
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

          <Separator />

          {/* Negotiation Summary */}
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
            <h3 className="mb-3 flex items-center gap-2 font-semibold">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Negotiation Summary
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p>
                  <strong>Original Proposal:</strong> $
                  {proposal.totalCost.toLocaleString()}
                </p>
                <p>
                  <strong>Your Counter Offer:</strong> $
                  {(
                    parseFloat(counterOffer) || proposal.totalCost
                  ).toLocaleString()}
                </p>
                {adjustments.length > 0 && (
                  <p>
                    <strong>With Adjustments:</strong> $
                    {suggestedTotal.toLocaleString()}
                  </p>
                )}
              </div>
              <div>
                <p>
                  <strong>Vendor Response Time:</strong> {vendor.responseTime}
                </p>
                <p>
                  <strong>Negotiation Status:</strong>{" "}
                  <Badge variant="outline">Pending Response</Badge>
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Handshake className="mr-2 h-4 w-4" />
              Send Negotiation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NegotiationDialog;
