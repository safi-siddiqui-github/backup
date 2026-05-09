"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Send } from "lucide-react";
import { Invoice } from "../../../mockClients";
import { formatCurrency } from "../../../utils/formatCurrency";
import StatusBadge from "../../../components/StatusBadge";

interface InvoiceCardProps {
  invoice: Invoice;
  onView?: (invoiceId: string) => void;
  onSendReminder?: (invoiceId: string) => void;
}

export default function InvoiceCard({
  invoice,
  onView,
  onSendReminder,
}: InvoiceCardProps) {
  return (
    <Card className="p-3 sm:p-4">
      <div className="flex items-start justify-between gap-3">
        {/* Left Side - Invoice Info */}
        <div className="flex-1 min-w-0">
          <div className="mb-1.5 flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              {invoice.invoiceNumber}
            </h3>
            <StatusBadge status={invoice.status} type="invoice" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">
              Due: {invoice.dueDate}
            </p>
            {invoice.paidDate && (
              <p className="text-xs text-green-600 dark:text-green-400">
                Paid: {invoice.paidDate}
              </p>
            )}
          </div>
        </div>

        {/* Right Side - Amount and Actions */}
        <div className="flex shrink-0 flex-col items-end gap-2">
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            {formatCurrency(invoice.amount)}
          </p>
          {/* Action Buttons */}
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onView?.(invoice.id);
              }}
              className="h-6 px-2 text-xs"
            >
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
            {invoice.status === "pending" && onSendReminder && (
              <Button
                variant="default"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSendReminder(invoice.id);
                }}
                className="h-6 bg-blue-600 px-2 text-xs text-white hover:bg-blue-700"
              >
                <Send className="h-3 w-3 mr-1" />
                Remind
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

