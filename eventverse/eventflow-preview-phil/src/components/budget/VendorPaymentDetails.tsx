
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign,
  Calendar,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  Receipt,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { VendorProfile } from "@/types/budget";
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
    receiptUrl: "/receipts/receipt-001.pdf",
    receiptNumber: "REC-2024-001",
    transactionId: "TXN-ABC123"
  },
  {
    id: "payment-2",
    description: "Progress Payment (40%)",
    amount: 2000,
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: "due" as const,
    linkedMilestone: "Menu Planning & Tasting"
  },
  {
    id: "payment-3",
    description: "Final Payment (30%)",
    amount: 1500,
    dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    status: "pending" as const,
    linkedMilestone: "Event Execution"
  }
];

const VendorPaymentDetails = ({ vendor, contracts, onProcessPayment }: VendorPaymentDetailsProps) => {
  const { toast } = useToast();
  const totalContractValue = contracts.reduce((sum, contract) => sum + contract.value, 0);
  const totalPaid = paymentSchedule.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalDue = paymentSchedule.filter(p => p.status === 'due').reduce((sum, p) => sum + p.amount, 0);
  const paymentProgress = (totalPaid / totalContractValue) * 100;

  const handleDownloadReceipt = (payment: typeof paymentSchedule[0]) => {
    toast({
      title: "Receipt Downloaded",
      description: `Receipt ${payment.receiptNumber} has been downloaded.`,
    });
    // In production, this would download the actual receipt
    window.open(payment.receiptUrl, '_blank');
  };

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
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "due":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-gray-400" />;
      case "overdue":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Schedule</CardTitle>
          <CardDescription>Milestone-based payments linked to service delivery stages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentSchedule.map((payment) => (
              <div key={payment.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getPaymentStatusIcon(payment.status)}
                    <div>
                      <h4 className="font-medium">{payment.description}</h4>
                      <p className="text-sm text-gray-600">Linked to: {payment.linkedMilestone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">${payment.amount.toLocaleString()}</p>
                    <Badge className={getPaymentStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Due: {payment.dueDate.toLocaleDateString()}
                  </div>
                  
                  {payment.status === 'paid' && payment.paidDate && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        Paid: {payment.paidDate.toLocaleDateString()}
                      </div>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadReceipt(payment)}
                      >
                        <Receipt className="w-4 h-4 mr-2" />
                        Download Receipt
                      </Button>
                    </div>
                  )}
                  
                  {payment.status === 'due' && (
                    <Button 
                      size="sm"
                      onClick={() => onProcessPayment('proposal-1', payment.amount)}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
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
          <CardDescription>Complete record of all payments made to this vendor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentSchedule
              .filter(p => p.status === 'paid')
              .map((payment) => (
                <div key={`history-${payment.id}`} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">{payment.description}</p>
                      <p className="text-xs text-gray-600">
                        Paid on {payment.paidDate?.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-medium">${payment.amount.toLocaleString()}</p>
                      <Badge variant="outline" className="text-xs">
                        Completed
                      </Badge>
                    </div>
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadReceipt(payment)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            
            {paymentSchedule.filter(p => p.status === 'paid').length === 0 && (
              <p className="text-gray-500 text-center py-4">No payments recorded yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorPaymentDetails;
