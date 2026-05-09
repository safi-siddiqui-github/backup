import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Ticket, DollarSign, Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";
import CustomerAvatar from "./CustomerAvatar";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  avatar?: string;
  ticketType: string;
  ticketTypeId: string;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  purchaseDate: Date;
  checkInStatus: 'not_checked_in' | 'checked_in';
  qrCode: string;
}

interface CustomerProfileDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  allOrders: Order[];
}

const CustomerProfileDialog = ({ order, isOpen, onClose, allOrders }: CustomerProfileDialogProps) => {
  if (!order) return null;

  // Get all orders from this customer
  const customerOrders = allOrders.filter(o => o.customerEmail === order.customerEmail);
  const totalSpent = customerOrders
    .filter(o => o.status === 'paid')
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const totalTickets = customerOrders.reduce((sum, o) => o.quantity, 0);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'paid':
        return { icon: CheckCircle2, className: 'bg-green-100 text-green-800', label: 'Paid' };
      case 'pending':
        return { icon: Clock, className: 'bg-yellow-100 text-yellow-800', label: 'Pending' };
      case 'cancelled':
        return { icon: XCircle, className: 'bg-red-100 text-red-800', label: 'Cancelled' };
      case 'refunded':
        return { icon: XCircle, className: 'bg-gray-100 text-gray-800', label: 'Refunded' };
      default:
        return { icon: Clock, className: 'bg-gray-100 text-gray-800', label: status };
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <CustomerAvatar 
              customerName={order.customerName}
              avatar={order.avatar}
              size="lg"
            />
            <div className="flex-1">
              <DialogTitle>{order.customerName}</DialogTitle>
              <DialogDescription>{order.customerEmail}</DialogDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${order.customerEmail}`}>
                <Mail className="w-4 h-4 mr-2" />
                Email
              </a>
            </Button>
          </div>
        </DialogHeader>

        <Separator />

        {/* Customer Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <Ticket className="w-5 h-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{totalTickets}</p>
            <p className="text-sm text-muted-foreground">Total Tickets</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <DollarSign className="w-5 h-5 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">${(totalSpent / 100).toFixed(0)}</p>
            <p className="text-sm text-muted-foreground">Total Spent</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <Calendar className="w-5 h-5 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{customerOrders.length}</p>
            <p className="text-sm text-muted-foreground">Orders</p>
          </div>
        </div>

        <Separator />

        {/* Order History */}
        <div>
          <h3 className="font-semibold mb-3">Order History</h3>
          <div className="space-y-3">
            {customerOrders.map((orderItem) => {
              const statusConfig = getStatusConfig(orderItem.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <div key={orderItem.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{orderItem.ticketType}</p>
                      <Badge className={statusConfig.className}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig.label}
                      </Badge>
                    </div>
                    <p className="font-bold">${(orderItem.totalAmount / 100).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Quantity: {orderItem.quantity}</span>
                    <span>{orderItem.purchaseDate.toLocaleDateString()}</span>
                  </div>
                  {orderItem.checkInStatus === 'checked_in' && (
                    <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Checked In
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerProfileDialog;
