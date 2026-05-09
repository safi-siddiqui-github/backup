import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import CustomerAvatar from "./CustomerAvatar";
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

interface BuyersListProps {
  orders: Order[];
  maxDisplay?: number;
  allOrders?: Order[];
}

const BuyersList = ({ orders, maxDisplay = 5, allOrders = [] }: BuyersListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Get unique customers (by email)
  const uniqueCustomers = orders.reduce((acc, order) => {
    if (!acc.find(o => o.customerEmail === order.customerEmail)) {
      acc.push(order);
    }
    return acc;
  }, [] as Order[]);

  // Filter by search query
  const filteredCustomers = uniqueCustomers.filter(order =>
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedCustomers = isExpanded ? filteredCustomers : filteredCustomers.slice(0, maxDisplay);
  const remainingCount = uniqueCustomers.length - maxDisplay;

  if (orders.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No buyers yet</p>
    );
  }

  return (
    <div className="space-y-3">
      {/* Avatar Stack (Collapsed View) */}
      {!isExpanded && (
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {displayedCustomers.map((order) => (
              <CustomerAvatar
                key={order.id}
                customerName={order.customerName}
                avatar={order.avatar}
                size="sm"
                onClick={() => setSelectedOrder(order)}
                className="border-2 border-background"
              />
            ))}
          </div>
          {remainingCount > 0 && (
            <span className="text-sm text-muted-foreground">
              +{remainingCount} more
            </span>
          )}
        </div>
      )}

      {/* Expand/Collapse Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-4 h-4 mr-2" />
            Hide Buyers
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4 mr-2" />
            View All Buyers ({uniqueCustomers.length})
          </>
        )}
      </Button>

      {/* Expanded List */}
      {isExpanded && (
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search buyers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Customer List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {displayedCustomers.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
                onClick={() => setSelectedOrder(order)}
              >
                <CustomerAvatar
                  customerName={order.customerName}
                  avatar={order.avatar}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{order.customerName}</p>
                  <p className="text-xs text-muted-foreground truncate">{order.customerEmail}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredCustomers.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No buyers found
            </p>
          )}
        </div>
      )}

      {/* Customer Profile Dialog */}
      <CustomerProfileDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        allOrders={allOrders.length > 0 ? allOrders : orders}
      />
    </div>
  );
};

export default BuyersList;
