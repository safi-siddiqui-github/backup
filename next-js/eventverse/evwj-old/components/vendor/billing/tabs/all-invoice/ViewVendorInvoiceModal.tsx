"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VendorInvoice, VendorInvoiceStatus } from "../../mockInvoices";
import { formatCurrency } from "../../../client-hub/utils/formatCurrency";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, FileText, AlertTriangle } from "lucide-react";

interface ViewVendorInvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: VendorInvoice | null;
}

export default function ViewVendorInvoiceModal({
  open,
  onOpenChange,
  invoice,
}: ViewVendorInvoiceModalProps) {
  if (!invoice) return null;

  const getStatusBadge = (status: VendorInvoiceStatus) => {
    const statusConfig = {
      paid: {
        label: "paid",
        className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        icon: CheckCircle2,
      },
      sent: {
        label: "sent",
        className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
        icon: Clock,
      },
      overdue: {
        label: "overdue",
        className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
        icon: AlertTriangle,
      },
      draft: {
        label: "draft",
        className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
        icon: FileText,
      },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge
        variant="secondary"
        className={cn("text-xs px-2.5 py-0.5 flex items-center gap-1.5 w-fit", config.className)}
      >
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>View Invoice</DialogTitle>
          <DialogDescription>
            Invoice details for {invoice.invoiceNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Invoice Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Invoice Number</Label>
              <Input
                value={invoice.invoiceNumber}
                readOnly
                className="mt-1 bg-gray-50 dark:bg-gray-800"
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Status</Label>
              <div className="mt-1">
                {getStatusBadge(invoice.status)}
              </div>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Client Name</Label>
              <Input
                value={invoice.clientName}
                readOnly
                className="mt-1 bg-gray-50 dark:bg-gray-800"
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Project</Label>
              <Input
                value={invoice.project}
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

            {invoice.paidDate && (
              <div>
                <Label className="text-sm text-muted-foreground">Paid Date</Label>
                <Input
                  value={invoice.paidDate}
                  readOnly
                  className="mt-1 bg-gray-50 dark:bg-gray-800"
                />
              </div>
            )}
          </div>

          {/* Invoice Summary */}
          <div className="border rounded-lg p-4 space-y-2 bg-gray-50 dark:bg-gray-900/50">
            <Label className="text-base font-semibold">Invoice Summary</Label>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-semibold text-lg">Total Amount:</span>
              <span className="font-bold text-xl">
                {formatCurrency(invoice.amount)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

