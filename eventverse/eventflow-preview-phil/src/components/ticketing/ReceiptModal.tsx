import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TicketReceipt } from "@/types/ticketing";
import { Download, Printer, Receipt } from "lucide-react";
import { format } from "date-fns";

interface ReceiptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receipt: TicketReceipt | null;
}

const ReceiptModal = ({ open, onOpenChange, receipt }: ReceiptModalProps) => {
  if (!receipt) return null;

  const handleDownload = () => {
    // In a real app, generate PDF
    console.log("Downloading receipt...");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Purchase Receipt
          </DialogTitle>
          <DialogDescription>
            Receipt #{receipt.receiptNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Receipt Header */}
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold">Official Receipt</h3>
            <p className="text-sm text-muted-foreground">
              Purchase Date: {format(receipt.purchaseDate, "MMMM d, yyyy 'at' h:mm a")}
            </p>
            <p className="text-sm text-muted-foreground">
              Transaction ID: {receipt.transactionId}
            </p>
          </div>

          <Separator />

          {/* Items */}
          <div className="space-y-4">
            <h4 className="font-semibold">Items Purchased</h4>
            {receipt.tickets.map((item, index) => (
              <div key={index} className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium">{item.type}</p>
                  <p className="text-sm text-muted-foreground">
                    ${item.pricePerTicket.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">${item.subtotal.toFixed(2)}</p>
              </div>
            ))}
          </div>

          <Separator />

          {/* Fees Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${receipt.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Service Fee</span>
              <span>${receipt.fees.serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Processing Fee</span>
              <span>${receipt.fees.processingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>${receipt.fees.tax.toFixed(2)}</span>
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Paid</span>
            <span className="text-green-600">${receipt.total.toFixed(2)}</span>
          </div>

          <Separator />

          {/* Payment Method */}
          <div className="space-y-2">
            <h4 className="font-semibold">Payment Method</h4>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-sm capitalize">
                {receipt.paymentMethod.type.replace('-', ' ')}
                {receipt.paymentMethod.brand && ` - ${receipt.paymentMethod.brand}`}
                {receipt.paymentMethod.last4 && ` ending in ${receipt.paymentMethod.last4}`}
              </p>
            </div>
          </div>

          {/* Billing Address */}
          {receipt.billingAddress && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-semibold">Billing Address</h4>
                <div className="bg-muted rounded-lg p-3 text-sm space-y-1">
                  <p>{receipt.billingAddress.name}</p>
                  <p>{receipt.billingAddress.street}</p>
                  <p>
                    {receipt.billingAddress.city}, {receipt.billingAddress.state} {receipt.billingAddress.zip}
                  </p>
                  <p>{receipt.billingAddress.country}</p>
                </div>
              </div>
            </>
          )}

          {/* Footer Note */}
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 text-xs text-center text-muted-foreground">
            <p>Thank you for your purchase! Please keep this receipt for your records.</p>
            <p className="mt-1">For questions, contact support@example.com</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" className="flex-1" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button className="flex-1 bg-gradient-to-r from-primary to-purple-600" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptModal;
