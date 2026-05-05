"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "../../../../client-hub/utils/formatCurrency";
import { Payment } from "../../../mockInvoices";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentsTableProps {
  payments: Payment[];
}

export default function PaymentsTable({ payments }: PaymentsTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-600 dark:text-slate-400 font-medium">
              Payment ID
            </TableHead>
            <TableHead className="text-gray-600 dark:text-slate-400 font-medium">
              Client
            </TableHead>
            <TableHead className="text-gray-600 dark:text-slate-400 font-medium">
              Amount
            </TableHead>
            <TableHead className="text-gray-600 dark:text-slate-400 font-medium">
              Date
            </TableHead>
            <TableHead className="text-gray-600 dark:text-slate-400 font-medium">
              Method
            </TableHead>
            <TableHead className="text-gray-600 dark:text-slate-400 font-medium">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length === 0 ? (
            <TableRow className="h-16">
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground align-middle">
                No payments found
              </TableCell>
            </TableRow>
          ) : (
            payments.map((payment) => (
              <TableRow key={payment.id} className="h-16">
                <TableCell className="font-medium text-gray-900 dark:text-slate-200 align-middle">
                  {payment.paymentId}
                </TableCell>
                <TableCell className="text-gray-900 dark:text-slate-200 align-middle">
                  {payment.clientName}
                </TableCell>
                <TableCell className="font-medium text-green-600 dark:text-green-400 align-middle">
                  {formatCurrency(payment.amount)}
                </TableCell>
                <TableCell className="text-gray-900 dark:text-slate-200 align-middle">
                  {payment.date}
                </TableCell>
                <TableCell className="text-gray-900 dark:text-slate-200 align-middle">
                  {payment.method}
                </TableCell>
                <TableCell className="align-middle">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs px-2.5 py-0.5 flex items-center gap-1.5 w-fit bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    )}
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    {payment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

