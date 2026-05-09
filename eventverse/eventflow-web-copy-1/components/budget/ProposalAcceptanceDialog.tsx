"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { VendorProfile } from "@/types/budget";
import { AlertTriangle, CheckCircle, DollarSign } from "lucide-react";
import { useState } from "react";
import type { Proposal } from "./ComprehensiveBudgetModule";

interface ProposalAcceptanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposal: Proposal | null;
  vendor: VendorProfile | null;
  onConfirm: () => void;
}

const ProposalAcceptanceDialog = ({
  open,
  onOpenChange,
  proposal,
  vendor,
  onConfirm,
}: ProposalAcceptanceDialogProps) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentScheduleAccepted, setPaymentScheduleAccepted] = useState(false);
  const [cancellationPolicyAccepted, setCancellationPolicyAccepted] =
    useState(false);

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
    // Reset checkboxes
    setTermsAccepted(false);
    setPaymentScheduleAccepted(false);
    setCancellationPolicyAccepted(false);
  };

  const handleTermsChange = (checked: boolean | "indeterminate") => {
    setTermsAccepted(checked === true);
  };

  const handlePaymentScheduleChange = (checked: boolean | "indeterminate") => {
    setPaymentScheduleAccepted(checked === true);
  };

  const handleCancellationPolicyChange = (
    checked: boolean | "indeterminate",
  ) => {
    setCancellationPolicyAccepted(checked === true);
  };

  if (!proposal || !vendor) return null;

  const canConfirm =
    termsAccepted && paymentScheduleAccepted && cancellationPolicyAccepted;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            Accept Proposal - Purchase Agreement
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Proposal Summary */}
          <div className="rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-green-800">
              Proposal Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">{proposal.title}</p>
                <p className="mb-2 text-sm text-gray-600">{vendor.name}</p>
                <Badge className="bg-green-600 text-white">
                  <DollarSign className="mr-1 h-3 w-3" />$
                  {proposal.totalCost.toLocaleString()}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Valid until</p>
                <p className="font-medium">
                  {proposal.validUntil.toLocaleDateString()}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Timeline: {proposal.timeline}
                </p>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Cost Breakdown</h3>
            <div className="overflow-hidden rounded-lg border">
              <div className="grid grid-cols-4 gap-4 bg-gray-50 px-4 py-2 text-sm font-medium">
                <span>Item</span>
                <span className="text-center">Quantity</span>
                <span className="text-center">Unit Price</span>
                <span className="text-right">Total</span>
              </div>
              {proposal.breakdown.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-4 border-t px-4 py-3 text-sm"
                >
                  <span>{item.item}</span>
                  <span className="text-center">{item.quantity}</span>
                  <span className="text-center">
                    ${item.unitPrice.toLocaleString()}
                  </span>
                  <span className="text-right font-medium">
                    ${item.total.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="border-t bg-gray-50 px-4 py-3">
                <div className="flex items-center justify-between font-semibold">
                  <span>Total Project Cost</span>
                  <span className="text-lg">
                    ${proposal.totalCost.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Schedule */}
          {proposal.paymentSchedule && (
            <div>
              <h3 className="mb-3 text-lg font-semibold">Payment Schedule</h3>
              <div className="space-y-3">
                {proposal.paymentSchedule.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-blue-50 p-4"
                  >
                    <div>
                      <p className="font-medium">{payment.milestone}</p>
                      <p className="text-sm text-gray-600">
                        Due: {payment.dueDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        ${payment.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {payment.percentage}% of total
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Deliverables</h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {proposal.deliverables.map((deliverable, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded bg-gray-50 p-2"
                >
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{deliverable}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Terms and Conditions</h3>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="mb-3 text-sm text-gray-700">{proposal.terms}</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Cancellation Policy:</strong> 48-hour notice required
                  for cancellations. Deposits are non-refundable within 30 days
                  of event.
                </p>
                <p>
                  <strong>Force Majeure:</strong> Neither party shall be liable
                  for delays caused by circumstances beyond their control.
                </p>
                <p>
                  <strong>Liability:</strong> Vendor liability is limited to the
                  total contract amount.
                </p>
                <p>
                  <strong>Intellectual Property:</strong> All work remains
                  property of vendor until final payment is received.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Agreement Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={handleTermsChange}
              />
              <div className="flex-1">
                <label
                  htmlFor="terms"
                  className="cursor-pointer text-sm font-medium"
                >
                  I have read and agree to the terms and conditions outlined
                  above
                </label>
                <p className="mt-1 text-xs text-gray-600">
                  This includes all project specifications, deliverables, and
                  vendor terms.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border p-4">
              <Checkbox
                id="payment"
                checked={paymentScheduleAccepted}
                onCheckedChange={handlePaymentScheduleChange}
              />
              <div className="flex-1">
                <label
                  htmlFor="payment"
                  className="cursor-pointer text-sm font-medium"
                >
                  I agree to the payment schedule and understand payment
                  obligations
                </label>
                <p className="mt-1 text-xs text-gray-600">
                  Payments will be due according to the milestone schedule
                  above.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border p-4">
              <Checkbox
                id="cancellation"
                checked={cancellationPolicyAccepted}
                onCheckedChange={handleCancellationPolicyChange}
              />
              <div className="flex-1">
                <label
                  htmlFor="cancellation"
                  className="cursor-pointer text-sm font-medium"
                >
                  I understand and agree to the cancellation policy
                </label>
                <p className="mt-1 text-xs text-gray-600">
                  Cancellations must be made with appropriate notice as
                  specified.
                </p>
              </div>
            </div>
          </div>

          {!canConfirm && (
            <div className="flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                Please review and accept all terms before proceeding with the
                contract.
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={!canConfirm}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Accept Proposal & Sign Contract
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProposalAcceptanceDialog;
