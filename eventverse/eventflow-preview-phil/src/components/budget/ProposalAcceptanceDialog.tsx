
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, FileText, DollarSign, Calendar, AlertTriangle } from "lucide-react";
import type { Proposal } from "./ComprehensiveBudgetModule";
import type { VendorProfile } from "@/types/budget";

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
  onConfirm 
}: ProposalAcceptanceDialogProps) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentScheduleAccepted, setPaymentScheduleAccepted] = useState(false);
  const [cancellationPolicyAccepted, setCancellationPolicyAccepted] = useState(false);

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

  const handleCancellationPolicyChange = (checked: boolean | "indeterminate") => {
    setCancellationPolicyAccepted(checked === true);
  };

  if (!proposal || !vendor) return null;

  const canConfirm = termsAccepted && paymentScheduleAccepted && cancellationPolicyAccepted;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Accept Proposal - Purchase Agreement
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Proposal Summary */}
          <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-4">Proposal Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">{proposal.title}</p>
                <p className="text-sm text-gray-600 mb-2">{vendor.name}</p>
                <Badge className="bg-green-600 text-white">
                  <DollarSign className="w-3 h-3 mr-1" />
                  ${proposal.totalCost.toLocaleString()}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Valid until</p>
                <p className="font-medium">{proposal.validUntil.toLocaleDateString()}</p>
                <p className="text-sm text-gray-600 mt-2">Timeline: {proposal.timeline}</p>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Cost Breakdown</h3>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 grid grid-cols-4 gap-4 font-medium text-sm">
                <span>Item</span>
                <span className="text-center">Quantity</span>
                <span className="text-center">Unit Price</span>
                <span className="text-right">Total</span>
              </div>
              {proposal.breakdown.map((item, index) => (
                <div key={index} className="px-4 py-3 grid grid-cols-4 gap-4 border-t text-sm">
                  <span>{item.item}</span>
                  <span className="text-center">{item.quantity}</span>
                  <span className="text-center">${item.unitPrice.toLocaleString()}</span>
                  <span className="text-right font-medium">${item.total.toLocaleString()}</span>
                </div>
              ))}
              <div className="bg-gray-50 px-4 py-3 border-t">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Project Cost</span>
                  <span className="text-lg">${proposal.totalCost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Schedule */}
          {proposal.paymentSchedule && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Payment Schedule</h3>
              <div className="space-y-3">
                {proposal.paymentSchedule.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">{payment.milestone}</p>
                      <p className="text-sm text-gray-600">Due: {payment.dueDate.toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${payment.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{payment.percentage}% of total</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Deliverables</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {proposal.deliverables.map((deliverable, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{deliverable}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Terms and Conditions</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 mb-3">{proposal.terms}</p>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Cancellation Policy:</strong> 48-hour notice required for cancellations. Deposits are non-refundable within 30 days of event.</p>
                <p><strong>Force Majeure:</strong> Neither party shall be liable for delays caused by circumstances beyond their control.</p>
                <p><strong>Liability:</strong> Vendor liability is limited to the total contract amount.</p>
                <p><strong>Intellectual Property:</strong> All work remains property of vendor until final payment is received.</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Agreement Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={handleTermsChange}
              />
              <div className="flex-1">
                <label htmlFor="terms" className="text-sm font-medium cursor-pointer">
                  I have read and agree to the terms and conditions outlined above
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  This includes all project specifications, deliverables, and vendor terms.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <Checkbox
                id="payment"
                checked={paymentScheduleAccepted}
                onCheckedChange={handlePaymentScheduleChange}
              />
              <div className="flex-1">
                <label htmlFor="payment" className="text-sm font-medium cursor-pointer">
                  I agree to the payment schedule and understand payment obligations
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  Payments will be due according to the milestone schedule above.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <Checkbox
                id="cancellation"
                checked={cancellationPolicyAccepted}
                onCheckedChange={handleCancellationPolicyChange}
              />
              <div className="flex-1">
                <label htmlFor="cancellation" className="text-sm font-medium cursor-pointer">
                  I understand and agree to the cancellation policy
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  Cancellations must be made with appropriate notice as specified.
                </p>
              </div>
            </div>
          </div>

          {!canConfirm && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                Please review and accept all terms before proceeding with the contract.
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm} 
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={!canConfirm}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Accept Proposal & Sign Contract
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProposalAcceptanceDialog;
