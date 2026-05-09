import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PurchaseHistory as PurchaseHistoryType } from "@/types/ticketing";
import { Receipt, Calendar, Ticket, DollarSign } from "lucide-react";
import { format } from "date-fns";

interface PurchaseHistoryProps {
  history: PurchaseHistoryType;
  onViewReceipt: (receiptNumber: string) => void;
}

const PurchaseHistory = ({ history, onViewReceipt }: PurchaseHistoryProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'refunded':
        return <Badge className="bg-red-500">Refunded</Badge>;
      case 'partially-refunded':
        return <Badge className="bg-orange-500">Partially Refunded</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="w-5 h-5" />
          Purchase History
        </CardTitle>
        <CardDescription>
          View all your past ticket purchases and receipts
        </CardDescription>
      </CardHeader>
      <CardContent>
        {history.purchases.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Receipt className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No purchase history yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.purchases.map((purchase) => (
              <Card key={purchase.id} className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{purchase.eventName}</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>Event: {format(purchase.eventDate, "MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Receipt className="w-3 h-3" />
                          <span>Purchased: {format(purchase.purchaseDate, "MMM d, yyyy")}</span>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(purchase.status)}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Ticket className="w-4 h-4 text-muted-foreground" />
                        <span>{purchase.ticketCount} {purchase.ticketCount === 1 ? 'ticket' : 'tickets'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-600">${purchase.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onViewReceipt(purchase.receiptNumber)}
                    >
                      <Receipt className="w-3 h-3 mr-2" />
                      View Receipt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PurchaseHistory;
