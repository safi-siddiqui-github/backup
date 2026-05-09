import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronDown, ChevronUp, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomerProfileDialog from "./CustomerProfileDialog";

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

interface CustomerListProps {
  orders: Order[];
  ticketTypeName: string;
  maxCapacity: number;
  maxDisplay?: number;
}

const CustomerList = ({ orders, ticketTypeName, maxCapacity, maxDisplay = 5 }: CustomerListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedOrders = isExpanded ? filteredOrders : filteredOrders.slice(0, maxDisplay);
  const checkedInCount = orders.filter(order => order.checkInStatus === 'checked_in').length;
  const totalCustomers = orders.length;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600',
      'from-red-500 to-red-600',
      'from-indigo-500 to-indigo-600',
      'from-yellow-500 to-yellow-600'
    ];
    return colors[index % colors.length];
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">No customers have purchased this ticket type yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Avatar Stack */}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {orders.slice(0, maxDisplay).map((order, index) => (
            <Avatar
              key={order.id}
              className="w-8 h-8 border-2 border-background hover:scale-110 hover:z-10 transition-transform cursor-pointer"
              onClick={() => setSelectedOrder(order)}
            >
              <AvatarImage src={order.avatar} alt={order.customerName} />
              <AvatarFallback className={cn("text-white text-xs font-medium bg-gradient-to-br", getAvatarColor(index))}>
                {getInitials(order.customerName)}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        {orders.length > maxDisplay && (
          <span className="text-sm text-muted-foreground font-medium">
            +{orders.length - maxDisplay} more
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {totalCustomers} customer{totalCustomers !== 1 ? 's' : ''} • {checkedInCount} checked in
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-7 px-2 text-xs"
        >
          {isExpanded ? (
            <>
              Collapse <ChevronUp className="w-3 h-3 ml-1" />
            </>
          ) : (
            <>
              Expand <ChevronDown className="w-3 h-3 ml-1" />
            </>
          )}
        </Button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="space-y-3 animate-fade-in">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-muted/50"
            />
          </div>

          {/* Customer Cards */}
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {displayedOrders.map((order, index) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer group"
                onClick={() => setSelectedOrder(order)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="w-10 h-10 border-2 border-background group-hover:scale-105 transition-transform">
                    <AvatarImage src={order.avatar} alt={order.customerName} />
                    <AvatarFallback className={cn("text-white font-medium text-sm bg-gradient-to-br", getAvatarColor(index))}>
                      {getInitials(order.customerName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{order.customerName}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{order.quantity}x ticket{order.quantity > 1 ? 's' : ''}</span>
                      <span>•</span>
                      <span>${(order.totalAmount / 100).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={order.status === 'paid' ? 'default' : 'secondary'} className="text-xs capitalize">
                    {order.status}
                  </Badge>
                  {order.checkInStatus === 'checked_in' ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-6 text-muted-foreground text-sm">
              No customers found matching "{searchQuery}"
            </div>
          )}
        </div>
      )}

      {/* Profile Dialog */}
      <CustomerProfileDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        allOrders={orders}
      />
    </div>
  );
};

export default CustomerList;
