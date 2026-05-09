import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Users, TrendingUp, Calendar } from "lucide-react";
import CustomerList from "./ticketing/CustomerList";

interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  capacity: number;
  sold: number;
  available: number;
  color: string;
  features: string[];
  accessLevel: string;
}

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

interface TicketTypeDetailProps {
  ticketType: TicketType | null;
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const TicketTypeDetail = ({ ticketType, isOpen, onClose, orders }: TicketTypeDetailProps) => {
  if (!ticketType) return null;

  const ticketOrders = orders.filter(order => order.ticketTypeId === ticketType.id);
  const totalRevenue = ticketOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const soldPercentage = (ticketType.sold / ticketType.capacity) * 100;
  const checkedInCount = ticketOrders.filter(order => order.checkInStatus === 'checked_in').length;
  const averagePurchase = ticketOrders.length > 0 ? totalRevenue / ticketOrders.length : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: ticketType.color }}
            />
            <DialogTitle className="text-2xl">{ticketType.name}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-2xl font-bold">${(totalRevenue / 100).toFixed(0)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Sold</p>
                    <p className="text-2xl font-bold">{ticketType.sold}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Available</p>
                    <p className="text-2xl font-bold">{ticketType.available}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Purchase</p>
                    <p className="text-2xl font-bold">${(averagePurchase / 100).toFixed(0)}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sales Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Sold: {ticketType.sold}</span>
                  <span>Capacity: {ticketType.capacity}</span>
                </div>
                <Progress value={soldPercentage} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{soldPercentage.toFixed(1)}% sold</span>
                  <span>{ticketType.available} remaining</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ticket Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-lg font-semibold">${(ticketType.price / 100).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm">{ticketType.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Access Level</p>
                  <Badge variant="outline" className="capitalize">{ticketType.accessLevel}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Features</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {ticketType.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analytics Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Orders</span>
                  <span className="font-medium">{ticketOrders.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Revenue</span>
                  <span className="font-medium">${(totalRevenue / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Checked In</span>
                  <span className="font-medium">{checkedInCount} / {ticketOrders.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Check-in Rate</span>
                  <span className="font-medium">
                    {ticketOrders.length > 0 ? Math.round((checkedInCount / ticketOrders.length) * 100) : 0}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Customers ({ticketOrders.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CustomerList 
                orders={ticketOrders}
                ticketTypeName={ticketType.name}
                maxCapacity={ticketType.capacity}
              />
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketTypeDetail;