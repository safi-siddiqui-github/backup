"use client";

import { Calendar, Send, AlertTriangle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "../../../../client-hub/utils/formatCurrency";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { VendorInvoice, VendorInvoiceStatus } from "../../../mockInvoices";
import { CheckCircle2, Clock, FileText } from "lucide-react";

interface InvoicesTableProps {
  invoices: VendorInvoice[];
  onView?: (invoice: VendorInvoice) => void;
  onSend?: (invoice: VendorInvoice) => void;
  onRemind?: (invoice: VendorInvoice) => void;
}

export default function InvoicesTable({
  invoices,
  onView,
  onSend,
  onRemind,
}: InvoicesTableProps) {
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
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length === 0 ? (
            <TableRow className="h-16">
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground align-middle">
                No invoices found
              </TableCell>
            </TableRow>
          ) : (
            invoices.map((invoice) => (
              <TableRow key={invoice.id} className="h-16">
                <TableCell className="font-medium align-middle">
                  {invoice.invoiceNumber}
                </TableCell>
                <TableCell className="align-middle">{invoice.clientName}</TableCell>
                <TableCell className="align-middle">{invoice.project}</TableCell>
                <TableCell className="font-medium align-middle">
                  {formatCurrency(invoice.amount)}
                </TableCell>
                <TableCell className="align-middle">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{invoice.dueDate}</span>
                  </div>
                </TableCell>
                <TableCell className="align-middle">
                  {getStatusBadge(invoice.status)}
                </TableCell>
                <TableCell className="align-middle">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView?.(invoice)}
                      className="h-8 px-3 !bg-white dark:!bg-slate-800/95 [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {invoice.status === "draft" && (
                      <Button
                        size="sm"
                        onClick={() => onSend?.(invoice)}
                        className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Send
                      </Button>
                    )}
                    {invoice.status === "overdue" && (
                      <Button
                        size="sm"
                        onClick={() => onRemind?.(invoice)}
                        className="h-8 px-3 bg-red-600 hover:bg-red-700 text-white"
                      >
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Remind
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

