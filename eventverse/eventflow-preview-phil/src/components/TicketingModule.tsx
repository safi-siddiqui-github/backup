
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Plus, QrCode, BarChart3, Settings, Users, DollarSign, Ticket, CheckCircle2, Clock, AlertTriangle, Gift, Share, UserPlus, Percent } from "lucide-react";
import TicketTypeManager from "./TicketTypeManager";
import CheckInSystem from "./CheckInSystem";
import TicketingAnalytics from "./TicketingAnalytics";
import TicketingSettings from "./TicketingSettings";
import TicketReservationSystem from "./TicketReservationSystem";
import PromoCodeManager from "./PromoCodeManager";
import ReferralCodeManager from "./ReferralCodeManager";
import CustomerAvatar from "./ticketing/CustomerAvatar";
import CustomerProfileDialog from "./ticketing/CustomerProfileDialog";
import { useToast } from "@/hooks/use-toast";

interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  capacity: number;
  sold: number;
  available: number;
  saleStart: Date;
  saleEnd: Date;
  isActive: boolean;
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

interface TicketingModuleProps {
  eventId: string;
  onBack: () => void;
}

const TicketingModule = ({ eventId, onBack }: TicketingModuleProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [promoCodes, setPromoCodes] = useState<any[]>([]);
  const [referralCodes, setReferralCodes] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Order | null>(null);
  const { toast } = useToast();

  // Load sample data
  useEffect(() => {
    const sampleTicketTypes: TicketType[] = [
      {
        id: '1',
        name: 'General Admission',
        description: 'Standard event access',
        price: 2500,
        currency: 'USD',
        capacity: 100,
        sold: 45,
        available: 55,
        saleStart: new Date('2024-01-01'),
        saleEnd: new Date('2024-12-31'),
        isActive: true,
        color: '#3B82F6',
        features: ['Event Access', 'Welcome Drink'],
        accessLevel: 'general'
      },
      {
        id: '2',
        name: 'VIP Premium',
        description: 'Premium experience with exclusive benefits',
        price: 7500,
        currency: 'USD',
        capacity: 25,
        sold: 12,
        available: 13,
        saleStart: new Date('2024-01-01'),
        saleEnd: new Date('2024-12-31'),
        isActive: true,
        color: '#F59E0B',
        features: ['VIP Lounge Access', 'Premium Seating', 'Complimentary Drinks', 'Meet & Greet'],
        accessLevel: 'vip'
      },
      {
        id: '3',
        name: 'Early Bird',
        description: 'Limited time discount ticket',
        price: 1999,
        currency: 'USD',
        capacity: 50,
        sold: 50,
        available: 0,
        saleStart: new Date('2024-01-01'),
        saleEnd: new Date('2024-06-01'),
        isActive: false,
        color: '#10B981',
        features: ['Event Access', 'Early Entry'],
        accessLevel: 'general'
      }
    ];

    const sampleOrders: Order[] = [
      {
        id: 'ORD001',
        customerName: 'John Smith',
        customerEmail: 'john@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
        ticketType: 'General Admission',
        ticketTypeId: '1',
        quantity: 2,
        totalAmount: 5000,
        status: 'paid',
        purchaseDate: new Date('2024-05-20'),
        checkInStatus: 'checked_in',
        qrCode: 'QR123456789'
      },
      {
        id: 'ORD002',
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        ticketType: 'VIP Premium',
        ticketTypeId: '2',
        quantity: 1,
        totalAmount: 7500,
        status: 'paid',
        purchaseDate: new Date('2024-05-21'),
        checkInStatus: 'not_checked_in',
        qrCode: 'QR987654321'
      },
      {
        id: 'ORD003',
        customerName: 'Mike Davis',
        customerEmail: 'mike@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
        ticketType: 'General Admission',
        ticketTypeId: '1',
        quantity: 1,
        totalAmount: 2500,
        status: 'paid',
        purchaseDate: new Date('2024-05-22'),
        checkInStatus: 'not_checked_in',
        qrCode: 'QR456789123'
      },
      {
        id: 'ORD004',
        customerName: 'Emily Chen',
        customerEmail: 'emily@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
        ticketType: 'VIP Premium',
        ticketTypeId: '2',
        quantity: 2,
        totalAmount: 15000,
        status: 'paid',
        purchaseDate: new Date('2024-05-23'),
        checkInStatus: 'checked_in',
        qrCode: 'QR789123456'
      },
      {
        id: 'ORD005',
        customerName: 'Alex Rodriguez',
        customerEmail: 'alex@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
        ticketType: 'Early Bird',
        ticketTypeId: '3',
        quantity: 1,
        totalAmount: 1999,
        status: 'paid',
        purchaseDate: new Date('2024-04-15'),
        checkInStatus: 'checked_in',
        qrCode: 'QR321654987'
      }
    ];

    setTicketTypes(sampleTicketTypes);
    setOrders(sampleOrders);

    // Sample Reservations
    const sampleReservations = [
      {
        id: 'RES001',
        ticketTypeId: '2',
        ticketTypeName: 'VIP Premium',
        quantity: 2,
        guestName: 'David Martinez',
        guestEmail: 'david@example.com',
        reason: 'vip',
        notes: 'VIP guest from corporate partner',
        status: 'sent',
        createdDate: new Date('2024-05-15'),
        qrCodes: ['RES_170001_1', 'RES_170001_2']
      },
      {
        id: 'RES002',
        ticketTypeId: '1',
        ticketTypeName: 'General Admission',
        quantity: 3,
        guestName: 'Jennifer Lee',
        guestEmail: 'jennifer@example.com',
        reason: 'press',
        notes: 'Media coverage representative',
        status: 'active',
        createdDate: new Date('2024-05-18'),
        qrCodes: ['RES_170002_1', 'RES_170002_2', 'RES_170002_3']
      },
      {
        id: 'RES003',
        ticketTypeId: '1',
        ticketTypeName: 'General Admission',
        quantity: 4,
        guestName: 'Robert Chen',
        guestEmail: 'robert@example.com',
        reason: 'sponsor',
        notes: 'Gold sponsor package',
        status: 'redeemed',
        createdDate: new Date('2024-05-10'),
        qrCodes: ['RES_170003_1', 'RES_170003_2', 'RES_170003_3', 'RES_170003_4']
      },
      {
        id: 'RES004',
        ticketTypeId: '2',
        ticketTypeName: 'VIP Premium',
        quantity: 1,
        guestName: 'Maria Garcia',
        guestEmail: 'maria@example.com',
        reason: 'speaker',
        notes: 'Keynote speaker',
        status: 'sent',
        createdDate: new Date('2024-05-20'),
        qrCodes: ['RES_170004_1']
      },
      {
        id: 'RES005',
        ticketTypeId: '1',
        ticketTypeName: 'General Admission',
        quantity: 2,
        guestName: 'Thomas Wilson',
        guestEmail: 'thomas@example.com',
        reason: 'staff',
        notes: 'Event staff members',
        status: 'active',
        createdDate: new Date('2024-05-22'),
        qrCodes: ['RES_170005_1', 'RES_170005_2']
      }
    ];
    setReservations(sampleReservations);

    // Sample Promo Codes
    const samplePromoCodes = [
      {
        id: 'PROMO001',
        code: 'EARLYBIRD',
        name: 'Early Bird Special',
        description: '20% off for early ticket purchases',
        type: 'percentage',
        value: 20,
        maxUses: 100,
        usesRemaining: 67,
        totalUses: 33,
        minOrderAmount: 0,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2024-06-30'),
        isActive: true,
        createdDate: new Date('2024-01-01'),
        totalRevenue: 8250,
        totalDiscount: 2062.50
      },
      {
        id: 'PROMO002',
        code: 'SUMMER50',
        name: 'Summer Festival Discount',
        description: '$50 off any ticket purchase',
        type: 'fixed',
        value: 50,
        maxUses: 50,
        usesRemaining: 28,
        totalUses: 22,
        minOrderAmount: 100,
        validFrom: new Date('2024-05-01'),
        validUntil: new Date('2024-08-31'),
        isActive: true,
        createdDate: new Date('2024-05-01'),
        totalRevenue: 5500,
        totalDiscount: 1100
      },
      {
        id: 'PROMO003',
        code: 'BOGO2024',
        name: 'Buy One Get One',
        description: 'Buy one ticket, get one free',
        type: 'bogo',
        value: 100,
        maxUses: 25,
        usesRemaining: 13,
        totalUses: 12,
        minOrderAmount: 0,
        validFrom: new Date('2024-04-01'),
        validUntil: new Date('2024-07-31'),
        isActive: true,
        createdDate: new Date('2024-04-01'),
        totalRevenue: 6000,
        totalDiscount: 3000
      },
      {
        id: 'PROMO004',
        code: 'VIPSAVE',
        name: 'VIP Exclusive',
        description: '15% off VIP tickets only',
        type: 'percentage',
        value: 15,
        maxUses: 999999,
        usesRemaining: 999991,
        totalUses: 8,
        minOrderAmount: 50,
        validFrom: new Date('2024-03-01'),
        validUntil: new Date('2024-12-31'),
        isActive: true,
        createdDate: new Date('2024-03-01'),
        totalRevenue: 9600,
        totalDiscount: 1694
      },
      {
        id: 'PROMO005',
        code: 'EXPIRED10',
        name: 'Expired Promo',
        description: '10% off - No longer active',
        type: 'percentage',
        value: 10,
        maxUses: 200,
        usesRemaining: 0,
        totalUses: 200,
        minOrderAmount: 0,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2024-03-31'),
        isActive: false,
        createdDate: new Date('2024-01-01'),
        totalRevenue: 15000,
        totalDiscount: 1500
      }
    ];
    setPromoCodes(samplePromoCodes);

    // Sample Referral Codes
    const sampleReferralCodes = [
      {
        id: 'REF001',
        code: 'SARA1A2B',
        influencerName: 'Sarah Johnson',
        influencerEmail: 'sarah.j@influencer.com',
        commissionType: 'percentage',
        commissionRate: 10,
        totalClicks: 487,
        totalSales: 45,
        totalRevenue: 11250,
        totalCommission: 1125,
        commissionOwed: 562.50,
        commissionPaid: 562.50,
        isActive: true,
        createdDate: new Date('2024-02-15'),
        lastUsed: new Date('2024-05-22'),
        notes: 'Instagram influencer with 50k followers',
        paymentStatus: 'pending'
      },
      {
        id: 'REF002',
        code: 'MIKE3C4D',
        influencerName: 'Mike Thompson',
        influencerEmail: 'mike@eventpromo.com',
        commissionType: 'fixed',
        commissionRate: 25,
        totalClicks: 312,
        totalSales: 28,
        totalRevenue: 7000,
        totalCommission: 700,
        commissionOwed: 0,
        commissionPaid: 700,
        isActive: true,
        createdDate: new Date('2024-03-01'),
        lastUsed: new Date('2024-05-20'),
        notes: 'YouTube content creator partnership',
        paymentStatus: 'paid'
      },
      {
        id: 'REF003',
        code: 'EMLY5E6F',
        influencerName: 'Emily Rodriguez',
        influencerEmail: 'emily.r@partners.com',
        commissionType: 'percentage',
        commissionRate: 12,
        totalClicks: 856,
        totalSales: 67,
        totalRevenue: 16750,
        totalCommission: 2010,
        commissionOwed: 1250,
        commissionPaid: 760,
        isActive: true,
        createdDate: new Date('2024-01-20'),
        lastUsed: new Date('2024-05-23'),
        notes: 'TikTok influencer - high engagement rate',
        paymentStatus: 'pending'
      },
      {
        id: 'REF004',
        code: 'JAME7G8H',
        influencerName: 'James Patterson',
        influencerEmail: 'james@eventmarketing.com',
        commissionType: 'fixed',
        commissionRate: 15,
        totalClicks: 198,
        totalSales: 15,
        totalRevenue: 3750,
        totalCommission: 225,
        commissionOwed: 225,
        commissionPaid: 0,
        isActive: true,
        createdDate: new Date('2024-04-10'),
        lastUsed: new Date('2024-05-18'),
        notes: 'Local radio host partnership',
        paymentStatus: 'pending'
      },
      {
        id: 'REF005',
        code: 'LISA9I0J',
        influencerName: 'Lisa Chen',
        influencerEmail: 'lisa@socialmedia.com',
        commissionType: 'percentage',
        commissionRate: 8,
        totalClicks: 1024,
        totalSales: 92,
        totalRevenue: 23000,
        totalCommission: 1840,
        commissionOwed: 0,
        commissionPaid: 1840,
        isActive: true,
        createdDate: new Date('2024-02-01'),
        lastUsed: new Date('2024-05-21'),
        notes: 'Facebook group admin - large community',
        paymentStatus: 'paid'
      },
      {
        id: 'REF006',
        code: 'DAVI1K2L',
        influencerName: 'David Lee',
        influencerEmail: 'david.l@blogger.com',
        commissionType: 'percentage',
        commissionRate: 15,
        totalClicks: 143,
        totalSales: 8,
        totalRevenue: 2000,
        totalCommission: 300,
        commissionOwed: 0,
        commissionPaid: 300,
        isActive: false,
        createdDate: new Date('2024-01-15'),
        lastUsed: new Date('2024-03-28'),
        notes: 'Partnership ended - mutual agreement',
        paymentStatus: 'paid'
      }
    ];
    setReferralCodes(sampleReferralCodes);
  }, []);

  const getTotalRevenue = () => {
    return orders
      .filter(order => order.status === 'paid')
      .reduce((total, order) => total + order.totalAmount, 0);
  };

  const getTotalSold = () => {
    return ticketTypes.reduce((total, type) => total + type.sold, 0);
  };

  const getTotalReserved = () => {
    return reservations.reduce((total, res) => total + res.quantity, 0);
  };

  const getCheckInRate = () => {
    const checkedIn = orders.filter(order => order.checkInStatus === 'checked_in').length;
    const total = orders.filter(order => order.status === 'paid').length;
    return total > 0 ? Math.round((checkedIn / total) * 100) : 0;
  };

  const handleReservationComplete = (reservationData: any) => {
    const newReservation = {
      id: `RES${reservations.length + 1}`.padStart(6, '0'),
      ...reservationData,
      createdDate: new Date(),
      status: 'active'
    };
    
    setReservations([...reservations, newReservation]);
    
    // Update ticket type available count
    setTicketTypes(prev => prev.map(type => 
      type.id === reservationData.ticketTypeId 
        ? { ...type, available: type.available - reservationData.quantity }
        : type
    ));
    
    toast({
      title: "Tickets Reserved!",
      description: `${reservationData.quantity} tickets reserved successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-foreground">Ticketing Management</h1>
                <p className="text-muted-foreground text-sm">Manage tickets, reservations & sales</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20">
                {getTotalSold()} Sold
              </Badge>
              <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20">
                {getTotalReserved()} Reserved
              </Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                ${(getTotalRevenue() / 100).toFixed(2)} Revenue
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tickets" className="flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              Tickets
            </TabsTrigger>
            <TabsTrigger value="reservations" className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Reservations
            </TabsTrigger>
            <TabsTrigger value="promo" className="flex items-center gap-2">
              <Percent className="w-4 h-4" />
              Promo Codes
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Referrals
            </TabsTrigger>
            <TabsTrigger value="checkin" className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              Check-in
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Sales</p>
                      <p className="text-2xl font-bold text-foreground">{getTotalSold()}</p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Reserved</p>
                      <p className="text-2xl font-bold text-foreground">{getTotalReserved()}</p>
                    </div>
                    <Gift className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="text-2xl font-bold text-foreground">${(getTotalRevenue() / 100).toFixed(0)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Check-in Rate</p>
                      <p className="text-2xl font-bold text-foreground">{getCheckInRate()}%</p>
                    </div>
                    <CheckCircle2 className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>


            {/* Ticket Types Overview */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Ticket Types Performance</span>
                  <Button onClick={() => setActiveTab("tickets")} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Manage Tickets
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ticketTypes.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: ticket.color }}
                        />
                        <div>
                          <h4 className="font-medium">{ticket.name}</h4>
                          <p className="text-sm text-gray-600">${(ticket.price / 100).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{ticket.sold} sold / {ticket.capacity} total</p>
                        <div className="flex items-center gap-2">
                          {ticket.available > 0 ? (
                            <Badge className="bg-green-100 text-green-800">{ticket.available} available</Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800">Sold Out</Badge>
                          )}
                          <Button 
                            size="sm" 
                            onClick={() => setActiveTab("reservations")}
                          >
                            Reserve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="space-y-3">
                   {orders.slice(0, 5).map((order) => (
                     <div 
                       key={order.id} 
                       className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                       onClick={() => setSelectedCustomer(order)}
                     >
                       <div className="flex items-center gap-3">
                         <CustomerAvatar
                           customerName={order.customerName}
                           avatar={order.avatar}
                           size="md"
                         />
                         <div>
                           <p className="font-medium">{order.customerName}</p>
                           <p className="text-sm text-gray-600">{order.ticketType} × {order.quantity}</p>
                         </div>
                       </div>
                      <div className="text-right">
                        <p className="font-medium">${(order.totalAmount / 100).toFixed(2)}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={order.status === 'paid' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                          {order.checkInStatus === 'checked_in' ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <Clock className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <CustomerProfileDialog
                  order={selectedCustomer}
                  isOpen={!!selectedCustomer}
                  onClose={() => setSelectedCustomer(null)}
                  allOrders={orders}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tickets Tab */}
          <TabsContent value="tickets">
            <TicketTypeManager 
              ticketTypes={ticketTypes}
              onTicketTypesChange={setTicketTypes}
              orders={orders}
            />
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations">
            <TicketReservationSystem 
              ticketTypes={ticketTypes}
              reservations={reservations}
              onReservationComplete={handleReservationComplete}
              onReservationsChange={setReservations}
            />
          </TabsContent>

          {/* Promo Codes Tab */}
          <TabsContent value="promo">
            <PromoCodeManager 
              promoCodes={promoCodes}
              onPromoCodesChange={setPromoCodes}
            />
          </TabsContent>

          {/* Referral Codes Tab */}
          <TabsContent value="referrals">
            <ReferralCodeManager 
              referralCodes={referralCodes}
              onReferralCodesChange={setReferralCodes}
            />
          </TabsContent>

          {/* Check-in Tab */}
          <TabsContent value="checkin">
            <CheckInSystem 
              orders={orders}
              onOrdersChange={setOrders}
              ticketTypes={ticketTypes}
            />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <TicketingSettings eventId={eventId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TicketingModule;
