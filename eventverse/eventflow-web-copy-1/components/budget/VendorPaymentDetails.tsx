"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { VendorProfile } from "@/types/budget";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
} from "lucide-react";
import type { VendorContract } from "./VendorManagementHub";

interface VendorPaymentDetailsProps {
  vendor: VendorProfile;
  contracts: VendorContract[];
  onProcessPayment: (proposalId: string, amount: number) => void;
}

// Mock payment schedule data
const paymentSchedule = [
  {
    id: "payment-1",
    description: "Initial Deposit (30%)",
    amount: 1500,
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: "paid" as const,
    paidDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    linkedMilestone: "Initial Consultation",
  },
  {
    id: "payment-2",
    description: "Progress Payment (40%)",
    amount: 2000,
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: "due" as const,
    linkedMilestone: "Menu Planning & Tasting",
  },
  {
    id: "payment-3",
    description: "Final Payment (30%)",
    amount: 1500,
    dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    status: "pending" as const,
    linkedMilestone: "Event Execution",
  },
];

const VendorPaymentDetails = ({
  vendor,
  contracts,
  onProcessPayment,
}: VendorPaymentDetailsProps) => {
  const totalContractValue = contracts.reduce(
    (sum, contract) => sum + contract.value,
    0,
  );
  const totalPaid = paymentSchedule
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalDue = paymentSchedule
    .filter((p) => p.status === "due")
    .reduce((sum, p) => sum + p.amount, 0);
  const paymentProgress = (totalPaid / totalContractValue) * 100;

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "due":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-600";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "due":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-gray-400" />;
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Paid</p>
                <p className="text-xl font-bold">
                  ${totalPaid.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Amount Due</p>
                <p className="text-xl font-bold">
                  ${totalDue.toLocaleString()}
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
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-xl font-bold">
                  ${totalContractValue.toLocaleString()}
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
          <CardDescription>
            Overall payment completion for all contracts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-600">
                {Math.round(paymentProgress)}% paid
              </span>
            </div>
            <Progress
              value={paymentProgress}
              className="h-3"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>${totalPaid.toLocaleString()} paid</span>
              <span>
                ${(totalContractValue - totalPaid).toLocaleString()} remaining
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Schedule</CardTitle>
          <CardDescription>
            Milestone-based payments linked to service delivery stages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentSchedule.map((payment) => (
              <div
                key={payment.id}
                className="rounded-lg border p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getPaymentStatusIcon(payment.status)}
                    <div>
                      <h4 className="font-medium">{payment.description}</h4>
                      <p className="text-sm text-gray-600">
                        Linked to: {payment.linkedMilestone}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ${payment.amount.toLocaleString()}
                    </p>
                    <Badge className={getPaymentStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    Due: {payment.dueDate.toLocaleDateString()}
                  </div>

                  {payment.status === "paid" && payment.paidDate && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      Paid: {payment.paidDate.toLocaleDateString()}
                    </div>
                  )}

                  {payment.status === "due" && (
                    <Button
                      size="sm"
                      onClick={() =>
                        onProcessPayment("proposal-1", payment.amount)
                      }
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay Now
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            Complete record of all payments made to this vendor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentSchedule
              .filter((p) => p.status === "paid")
              .map((payment) => (
                <div
                  key={`history-${payment.id}`}
                  className="flex items-center justify-between rounded border p-3"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">
                        {payment.description}
                      </p>
                      <p className="text-xs text-gray-600">
                        Paid on {payment.paidDate?.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${payment.amount.toLocaleString()}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-xs"
                    >
                      Completed
                    </Badge>
                  </div>
                </div>
              ))}

            {paymentSchedule.filter((p) => p.status === "paid").length ===
              0 && (
              <p className="py-4 text-center text-gray-500">
                No payments recorded yet
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorPaymentDetails;
