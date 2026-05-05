"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign } from "lucide-react";
import { Invoice, InvoiceItem, Client } from "../../../mockClients";
import { formatCurrency } from "../../../utils/formatCurrency";

interface ViewInvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: Invoice | null;
  client?: Client;
}

export default function ViewInvoiceModal({
  open,
  onOpenChange,
  invoice,
  client,
}: ViewInvoiceModalProps) {
  if (!invoice) return null;

  const subtotal = invoice.subtotal || invoice.items.reduce((sum, item) => sum + item.amount, 0);
  const tax = invoice.tax || (subtotal * invoice.taxRate) / 100;
  const total = invoice.amount || subtotal + tax;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>View Invoice</DialogTitle>
          <DialogDescription>
            Invoice details for {invoice.invoiceNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invoice Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Client</Label>
              <Input
                value={client?.name || invoice.clientId}
                readOnly
                className="mt-1 bg-gray-50 dark:bg-gray-800"
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Invoice Number</Label>
              <Input
                value={invoice.invoiceNumber}
                readOnly
                className="mt-1 bg-gray-50 dark:bg-gray-800"
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Due Date</Label>
              <Input
                value={invoice.dueDate}
                readOnly
                className="mt-1 bg-gray-50 dark:bg-gray-800"
              />
            </div>
          </div>

          {/* Invoice Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Invoice Items</Label>
            </div>

            <div className="space-y-3">
              {/* Header Row */}
              <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400 pb-2 border-b">
                <div className="col-span-5">Description</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-2">Rate ($)</div>
                <div className="col-span-3">Amount</div>
              </div>

              {invoice.items.map((item: InvoiceItem) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 items-start"
                >
                  <div className="col-span-5">
                    <Input
                      value={item.description}
                      readOnly
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                  </div>

                  <div className="col-span-2">
                    <Input
                      type="number"
                      value={item.quantity}
                      readOnly
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                  </div>

                  <div className="col-span-2">
                    <Input
                      type="number"
                      value={item.rate}
                      readOnly
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                  </div>

                  <div className="col-span-3">
                    <Input
                      value={formatCurrency(item.amount)}
                      readOnly
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Payment Terms & Notes */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground">Payment Terms</Label>
                <Input
                  value={invoice.paymentTerms}
                  readOnly
                  className="mt-1 bg-gray-50 dark:bg-gray-800"
                />
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">Notes</Label>
                <Textarea
                  value={invoice.notes || ""}
                  readOnly
                  className="mt-1 min-h-[100px] resize-none bg-gray-50 dark:bg-gray-800"
                />
              </div>
            </div>

            {/* Right Column - Invoice Summary */}
            <div>
              <div className="border rounded-lg p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
                <Label className="text-base font-semibold">
                  Invoice Summary
                </Label>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Tax Rate (%):
                    </span>
                    <span className="font-medium">{invoice.taxRate}%</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Tax ({invoice.taxRate}%):
                    </span>
                    <span className="font-medium">{formatCurrency(tax)}</span>
                  </div>

                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-lg">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

