"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { VendorProfile } from "@/types/budget";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  Receipt,
} from "lucide-react";
import { useState } from "react";
import type { Proposal } from "./ComprehensiveBudgetModule";
import type { VendorContract } from "./VendorManagementHub";

interface PaymentMilestone {
  id: string;
  vendorId: string;
  contractId: string;
  milestone: string;
  amount: number;
  percentage: number;
  dueDate: Date;
  status: "pending" | "paid" | "overdue" | "processing";
  paidDate?: Date;
  invoiceNumber?: string;
  receiptUrl?: string;
}

interface VendorPaymentScheduleProps {
  acceptedProposals: Proposal[];
  vendors: VendorProfile[];
  contracts: VendorContract[];
  onProcessPayment: (proposalId: string, amount: number) => void;
}

const VendorPaymentSchedule = ({
  acceptedProposals,
  vendors,
  contracts,
  onProcessPayment,
}: VendorPaymentScheduleProps) => {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  // Generate mock payment milestones
  const paymentMilestones: PaymentMilestone[] = acceptedProposals.flatMap(
    (proposal) => {
      const contract = contracts.find((c) => c.proposalId === proposal.id);
      if (!contract) return [];

      const baseDate = contract.startDate;
      return [
        {
          id: `payment-${proposal.id}-1`,
          vendorId: proposal.vendorId,
          contractId: contract.id,
          milestone: "Initial Deposit",
          amount: Math.round(proposal.totalCost * 0.3),
          percentage: 30,
          dueDate: new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000),
          status: "paid",
          paidDate: new Date(baseDate.getTime() - 5 * 24 * 60 * 60 * 1000),
          invoiceNumber: `INV-${proposal.id}-001`,
          receiptUrl: `receipt-${proposal.id}-001.pdf`,
        },
        {
          id: `payment-${proposal.id}-2`,
          vendorId: proposal.vendorId,
          contractId: contract.id,
          milestone: "Progress Payment",
          amount: Math.round(proposal.totalCost * 0.4),
          percentage: 40,
          dueDate: new Date(baseDate.getTime() + 14 * 24 * 60 * 60 * 1000),
          status: "pending",
          invoiceNumber: `INV-${proposal.id}-002`,
        },
        {
          id: `payment-${proposal.id}-3`,
          vendorId: proposal.vendorId,
          contractId: contract.id,
          milestone: "Final Payment",
          amount: Math.round(proposal.totalCost * 0.3),
          percentage: 30,
          dueDate: contract.completionDate,
          status: "pending",
          invoiceNumber: `INV-${proposal.id}-003`,
        },
      ];
    },
  );

  // Group payments by vendor
  const paymentsByVendor = paymentMilestones.reduce(
    (acc, payment) => {
      if (!acc[payment.vendorId]) acc[payment.vendorId] = [];
      acc[payment.vendorId].push(payment);
      return acc;
    },
    {} as Record<string, PaymentMilestone[]>,
  );

  // Calculate statistics
  const totalPaid = paymentMilestones
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = paymentMilestones
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalOverdue = paymentMilestones
    .filter(
      (p) =>
        p.status === "overdue" ||
        (p.status === "pending" && p.dueDate < new Date()),
    )
    .reduce((sum, p) => sum + p.amount, 0);

  const totalAmount = paymentMilestones.reduce((sum, p) => sum + p.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (payment: PaymentMilestone) => {
    const isOverdue =
      payment.dueDate < new Date() && payment.status === "pending";

    if (payment.status === "paid") {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    } else if (isOverdue) {
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    } else {
      return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const isOverdue = (payment: PaymentMilestone) => {
    return payment.dueDate < new Date() && payment.status === "pending";
  };

  const handlePayment = (payment: PaymentMilestone) => {
    const proposal = acceptedProposals.find(
      (p) => p.vendorId === payment.vendorId,
    );
    if (proposal) {
      onProcessPayment(proposal.id, payment.amount);
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  ${totalPaid.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  ${totalPending.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">
                  ${totalOverdue.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold">
                  ${totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-600">
                  ${totalPaid.toLocaleString()} / $
                  {totalAmount.toLocaleString()}
                </span>
              </div>
              <Progress
                value={(totalPaid / totalAmount) * 100}
                className="h-3"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round((totalPaid / totalAmount) * 100)}%
                </p>
                <p className="text-sm text-gray-600">Paid</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {Math.round((totalPending / totalAmount) * 100)}%
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {totalOverdue > 0
                    ? Math.round((totalOverdue / totalAmount) * 100)
                    : 0}
                  %
                </p>
                <p className="text-sm text-gray-600">Overdue</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Schedule by Vendor */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(paymentsByVendor).map(([vendorId, payments]) => {
                const vendor = vendors.find((v) => v.id === vendorId);
                if (!vendor) return null;

                const vendorPaid = payments
                  .filter((p) => p.status === "paid")
                  .reduce((sum, p) => sum + p.amount, 0);
                const vendorTotal = payments.reduce(
                  (sum, p) => sum + p.amount,
                  0,
                );
                const vendorProgress = (vendorPaid / vendorTotal) * 100;
                const hasOverdue = payments.some((p) => isOverdue(p));

                return (
                  <div
                    key={vendorId}
                    className={`cursor-pointer rounded-lg border p-4 transition-colors hover:bg-gray-50 ${
                      selectedVendor === vendorId
                        ? "border-blue-500 bg-blue-50"
                        : ""
                    }`}
                    onClick={() => setSelectedVendor(vendorId)}
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{vendor.name}</h4>
                        <p className="text-sm text-gray-600">
                          {vendor.category}
                        </p>
                      </div>
                      {hasOverdue && (
                        <Badge className="bg-red-100 text-red-800">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Overdue
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>${vendorPaid.toLocaleString()} paid</span>
                        <span>${vendorTotal.toLocaleString()} total</span>
                      </div>
                      <Progress
                        value={vendorProgress}
                        className="h-2"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedVendor ? (
              <div className="space-y-4">
                {paymentsByVendor[selectedVendor]?.map((payment) => {
                  const vendor = vendors.find((v) => v.id === payment.vendorId);

                  return (
                    <div
                      key={payment.id}
                      className="rounded-lg border p-4"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{payment.milestone}</h4>
                          <p className="text-sm text-gray-600">
                            {payment.percentage}% of contract • $
                            {payment.amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            Due: {payment.dueDate.toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {getStatusIcon(payment)}
                          <Badge
                            className={getStatusColor(
                              isOverdue(payment) ? "overdue" : payment.status,
                            )}
                          >
                            {isOverdue(payment) ? "overdue" : payment.status}
                          </Badge>
                        </div>
                      </div>

                      {payment.status === "paid" ? (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-green-600">
                            Paid: {payment.paidDate?.toLocaleDateString()}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              <Receipt className="mr-2 h-4 w-4" />
                              Receipt
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Invoice
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Invoice: {payment.invoiceNumber}
                          </span>
                          <Button
                            onClick={() => handlePayment(payment)}
                            className="bg-green-600 hover:bg-green-700"
                            size="sm"
                          >
                            <CreditCard className="mr-2 h-4 w-4" />
                            Pay Now
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center">
                <CreditCard className="mx-auto mb-2 h-12 w-12 text-gray-300" />
                <p className="text-gray-500">
                  Select a vendor to view payment details
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorPaymentSchedule;
