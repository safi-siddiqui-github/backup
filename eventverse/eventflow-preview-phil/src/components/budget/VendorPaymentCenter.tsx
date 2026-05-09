
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  DollarSign,
  Receipt,
  Download,
  Send,
  Users,
  TrendingUp
} from "lucide-react";
import type { Proposal } from "./ComprehensiveBudgetModule";
import type { VendorProfile } from "@/types/budget";

interface VendorPaymentCenterProps {
  acceptedProposals: Proposal[];
  vendors: VendorProfile[];
  onProcessPayment: (proposalId: string, amount: number) => void;
}

interface PaymentRecord {
  id: string;
  proposalId: string;
  vendorId: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  dueDate: Date;
  paidDate?: Date;
  milestone: string;
  receiptUrl?: string;
}

// Mock payment data
const MOCK_PAYMENTS: PaymentRecord[] = [
  {
    id: "pay-1",
    proposalId: "prop-1",
    vendorId: "vendor-1",
    amount: 3900,
    status: 'pending',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    milestone: "Contract Signing - 50% Deposit"
  },
  {
    id: "pay-2",
    proposalId: "prop-1",
    vendorId: "vendor-1",
    amount: 3900,
    status: 'pending',
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    milestone: "Event Day - Final Payment"
  },
  {
    id: "pay-3",
    proposalId: "prop-2",
    vendorId: "vendor-3",
    amount: 725,
    status: 'completed',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    paidDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    milestone: "Booking Confirmation - 25% Deposit",
    receiptUrl: "#"
  }
];

const VendorPaymentCenter = ({ acceptedProposals, vendors, onProcessPayment }: VendorPaymentCenterProps) => {
  const [payments, setPayments] = useState<PaymentRecord[]>(MOCK_PAYMENTS);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const getVendorById = (vendorId: string) => {
    return vendors.find(v => v.id === vendorId);
  };

  const getProposalById = (proposalId: string) => {
    return acceptedProposals.find(p => p.id === proposalId);
  };

  const getStatusColor = (status: PaymentRecord['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: PaymentRecord['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <TrendingUp className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <AlertTriangle className="w-4 h-4" />;
      default: return <Receipt className="w-4 h-4" />;
    }
  };

  const pendingPayments = payments.filter(p => p.status === 'pending');
  const completedPayments = payments.filter(p => p.status === 'completed');
  const totalPaid = completedPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalPending = pendingPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);

  const upcomingPayments = pendingPayments
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    .slice(0, 3);

  const overDuePayments = pendingPayments.filter(
    payment => payment.dueDate.getTime() < Date.now()
  );

  const handleProcessPayment = async (payment: PaymentRecord) => {
    setSelectedPayment(payment);
    setShowPaymentDialog(true);
  };

  const handleConfirmPayment = async () => {
    if (!selectedPayment) return;
    
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setPayments(prev => 
        prev.map(payment => 
          payment.id === selectedPayment.id
            ? {
                ...payment,
                status: 'completed' as const,
                paidDate: new Date(),
                receiptUrl: `#receipt-${payment.id}`
              }
            : payment
        )
      );
      
      onProcessPayment(selectedPayment.proposalId, selectedPayment.amount);
      setProcessingPayment(false);
      setShowPaymentDialog(false);
      setSelectedPayment(null);
    }, 2000);
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      {/* Payment Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Payment Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{totalAmount > 0 ? Math.round((totalPaid / totalAmount) * 100) : 0}% Complete</span>
            </div>
            <Progress value={totalAmount > 0 ? (totalPaid / totalAmount) * 100 : 0} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Paid:</span>
                <div className="font-bold text-green-600">${totalPaid.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-gray-600">Pending:</span>
                <div className="font-bold text-yellow-600">${totalPending.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-gray-600">Total:</span>
                <div className="font-bold text-blue-600">${totalAmount.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Payments Alert */}
      {upcomingPayments.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="w-5 h-5" />
              Upcoming Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingPayments.map((payment) => {
                const vendor = getVendorById(payment.vendorId);
                const daysUntilDue = getDaysUntilDue(payment.dueDate);
                const isOverdue = daysUntilDue < 0;
                
                return (
                  <div key={payment.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <div className="font-medium">{vendor?.name}</div>
                      <div className="text-sm text-gray-600">{payment.milestone}</div>
                      <div className={`text-sm ${isOverdue ? 'text-red-600' : 'text-orange-600'}`}>
                        {isOverdue ? `${Math.abs(daysUntilDue)} days overdue` : `Due in ${daysUntilDue} days`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">${payment.amount.toLocaleString()}</div>
                      <Button 
                        onClick={() => handleProcessPayment(payment)}
                        className={`mt-1 ${isOverdue ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'}`}
                        size="sm"
                      >
                        <CreditCard className="w-4 h-4 mr-1" />
                        Pay Now
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Payments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-blue-600" />
            Payment Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => {
              const vendor = getVendorById(payment.vendorId);
              const proposal = getProposalById(payment.proposalId);
              const daysUntilDue = getDaysUntilDue(payment.dueDate);
              const isOverdue = payment.status === 'pending' && daysUntilDue < 0;
              
              return (
                <div key={payment.id} className={`p-4 border rounded-lg ${isOverdue ? 'border-red-200 bg-red-50' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{vendor?.name}</h4>
                        <Badge className={`${getStatusColor(payment.status)} border`}>
                          {getStatusIcon(payment.status)}
                          <span className="ml-1 capitalize">{payment.status}</span>
                        </Badge>
                        {isOverdue && (
                          <Badge variant="destructive">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Overdue
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Service:</span>
                          <div className="font-medium">{proposal?.title || 'Unknown Service'}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Milestone:</span>
                          <div className="font-medium">{payment.milestone}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Due Date:</span>
                          <div className="font-medium">
                            {payment.dueDate.toLocaleDateString()}
                            {payment.status === 'pending' && (
                              <span className={`ml-2 ${isOverdue ? 'text-red-600' : 'text-orange-600'}`}>
                                ({isOverdue ? `${Math.abs(daysUntilDue)} days overdue` : `${daysUntilDue} days`})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {payment.paidDate && (
                        <div className="text-sm text-green-600 mt-2">
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                          Paid on {payment.paidDate.toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold">${payment.amount.toLocaleString()}</div>
                      
                      <div className="flex items-center gap-2 mt-2">
                        {payment.status === 'pending' && (
                          <Button 
                            onClick={() => handleProcessPayment(payment)}
                            className="bg-blue-600 hover:bg-blue-700"
                            size="sm"
                          >
                            <CreditCard className="w-4 h-4 mr-1" />
                            Pay Now
                          </Button>
                        )}
                        
                        {payment.status === 'completed' && payment.receiptUrl && (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Receipt
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Payment Processing Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Payment</DialogTitle>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Vendor:</span>
                    <div className="font-medium">{getVendorById(selectedPayment.vendorId)?.name}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Amount:</span>
                    <div className="font-bold text-green-600">${selectedPayment.amount.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Milestone:</span>
                    <div className="font-medium">{selectedPayment.milestone}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Due Date:</span>
                    <div className="font-medium">{selectedPayment.dueDate.toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Payment Method</h4>
                <p className="text-sm text-blue-700">
                  This payment will be processed through your connected Stripe account. 
                  You will receive a receipt and the vendor will be notified immediately.
                </p>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleConfirmPayment}
                  disabled={processingPayment}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {processingPayment ? (
                    <>
                      <TrendingUp className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Confirm Payment
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {payments.length === 0 && (
        <div className="text-center py-12">
          <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No payments scheduled</h3>
          <p className="text-gray-500">Payments will appear here once you accept vendor proposals</p>
        </div>
      )}
    </div>
  );
};

export default VendorPaymentCenter;
