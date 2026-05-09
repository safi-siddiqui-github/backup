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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { TicketType } from "@/types/rsvp";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Clock,
  DollarSign,
  Gift,
  Percent,
  Plus,
  QrCode,
  Settings,
  Share,
  Ticket,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import CheckInSystem from "./CheckInSystem";
import PromoCodeManager, { PromoCode } from "./PromoCodeManager";
import ReferralCodeManager, { ReferralCode } from "./ReferralCodeManager";
import TicketingAnalytics from "./TicketingAnalytics";
import TicketingSettings from "./TicketingSettings";
import TicketReservationSystem, {
  Reservation,
} from "./TicketReservationSystem";
import TicketTypeManager from "./TicketTypeManager";

// interface TicketType {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   currency: string;
//   capacity: number;
//   sold: number;
//   available: number;
//   saleStart: Date;
//   saleEnd: Date;
//   isActive: boolean;
//   color: string;
//   features: string[];
//   accessLevel: string;
// }

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  ticketType: string;
  quantity: number;
  totalAmount: number;
  status: "pending" | "paid" | "cancelled" | "refunded";
  purchaseDate: Date;
  checkInStatus: "not_checked_in" | "checked_in";
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
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [referralCodes, setReferralCodes] = useState<ReferralCode[]>([]);
  const { toast } = useToast();

  // Load sample data
  useEffect(() => {
    const sampleTicketTypes: TicketType[] = [
      {
        id: "1",
        name: "General Admission",
        description: "Standard event access",
        price: 2500,
        currency: "USD",
        capacity: 100,
        sold: 45,
        available: 55,
        saleStart: new Date("2024-01-01"),
        saleEnd: new Date("2024-12-31"),
        isActive: true,
        color: "#3B82F6",
        features: ["Event Access", "Welcome Drink"],
        accessLevel: "general",
      },
      {
        id: "2",
        name: "VIP Premium",
        description: "Premium experience with exclusive benefits",
        price: 7500,
        currency: "USD",
        capacity: 25,
        sold: 12,
        available: 13,
        saleStart: new Date("2024-01-01"),
        saleEnd: new Date("2024-12-31"),
        isActive: true,
        color: "#F59E0B",
        features: [
          "VIP Lounge Access",
          "Premium Seating",
          "Complimentary Drinks",
          "Meet & Greet",
        ],
        accessLevel: "vip",
      },
      {
        id: "3",
        name: "Early Bird",
        description: "Limited time discount ticket",
        price: 1999,
        currency: "USD",
        capacity: 50,
        sold: 50,
        available: 0,
        saleStart: new Date("2024-01-01"),
        saleEnd: new Date("2024-06-01"),
        isActive: false,
        color: "#10B981",
        features: ["Event Access", "Early Entry"],
        accessLevel: "general",
      },
    ];

    const sampleOrders: Order[] = [
      {
        id: "ORD001",
        customerName: "John Smith",
        customerEmail: "john@example.com",
        ticketType: "General Admission",
        quantity: 2,
        totalAmount: 5000,
        status: "paid",
        purchaseDate: new Date("2024-05-20"),
        checkInStatus: "checked_in",
        qrCode: "QR123456789",
      },
      {
        id: "ORD002",
        customerName: "Sarah Johnson",
        customerEmail: "sarah@example.com",
        ticketType: "VIP Premium",
        quantity: 1,
        totalAmount: 7500,
        status: "paid",
        purchaseDate: new Date("2024-05-21"),
        checkInStatus: "not_checked_in",
        qrCode: "QR987654321",
      },
    ];

    setTicketTypes(sampleTicketTypes);
    setOrders(sampleOrders);
  }, []);

  const getTotalRevenue = () => {
    return orders
      .filter((order) => order.status === "paid")
      .reduce((total, order) => total + order.totalAmount, 0);
  };

  const getTotalSold = () => {
    return ticketTypes.reduce((total, type) => total + (type?.sold ?? 0), 0);
  };

  const getTotalReserved = () => {
    return reservations.reduce((total, res) => total + (res?.quantity ?? 0), 0);
  };

  const getCheckInRate = () => {
    const checkedIn = orders.filter(
      (order) => order.checkInStatus === "checked_in",
    ).length;
    const total = orders.filter((order) => order.status === "paid").length;
    return total > 0 ? Math.round((checkedIn / total) * 100) : 0;
  };

  // const handleReservationComplete = (reservationData: Reservation) => {
  const handleReservationComplete = (reservationData: Reservation) => {
    const newReservation = {
      ...reservationData,
      id: `RES${reservations.length + 1}`.padStart(6, "0"),
      createdDate: new Date(),
      status: "active",
    } as Reservation;

    setReservations([...reservations, newReservation]);

    // Update ticket type available count
    setTicketTypes((prev) =>
      prev.map((type) =>
        type.id === reservationData?.ticketTypeId
          ? {
              ...type,
              available:
                (type?.available ?? 0) - (reservationData?.quantity ?? 0),
            }
          : type,
      ),
    );

    toast({
      title: "Tickets Reserved!",
      description: `${reservationData.quantity} tickets reserved successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2 text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-white">
                  Ticketing Management
                </h1>
                <p className="text-sm text-purple-100">
                  Manage tickets, reservations & sales
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-green-500/20 text-green-200">
                {getTotalSold()} Sold
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-200">
                {getTotalReserved()} Reserved
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-200">
                ${(getTotalRevenue() / 100).toFixed(2)} Revenue
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-6 grid w-full grid-cols-8">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="tickets"
              className="flex items-center gap-2"
            >
              <Ticket className="h-4 w-4" />
              Tickets
            </TabsTrigger>
            <TabsTrigger
              value="reservations"
              className="flex items-center gap-2"
            >
              <Gift className="h-4 w-4" />
              Reservations
            </TabsTrigger>
            <TabsTrigger
              value="promo"
              className="flex items-center gap-2"
            >
              <Percent className="h-4 w-4" />
              Promo Codes
            </TabsTrigger>
            <TabsTrigger
              value="referrals"
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Referrals
            </TabsTrigger>
            <TabsTrigger
              value="checkin"
              className="flex items-center gap-2"
            >
              <QrCode className="h-4 w-4" />
              Check-in
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent
            value="overview"
            className="space-y-6"
          >
            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Sales</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {getTotalSold()}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Reserved</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {getTotalReserved()}
                      </p>
                    </div>
                    <Gift className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${(getTotalRevenue() / 100).toFixed(0)}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Check-in Rate</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {getCheckInRate()}%
                      </p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    Reserve Tickets
                  </CardTitle>
                  <CardDescription>
                    Reserve complimentary tickets for VIPs, staff, or sponsors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setActiveTab("reservations")}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Reservation
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Percent className="h-5 w-5" />
                    Promo Codes
                  </CardTitle>
                  <CardDescription>
                    Create discount codes to boost sales and engagement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setActiveTab("promo")}
                    variant="outline"
                    className="w-full"
                  >
                    <Percent className="mr-2 h-4 w-4" />
                    Manage Promos
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Referral Partners
                  </CardTitle>
                  <CardDescription>
                    Partner with influencers and track commission-based sales
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setActiveTab("referrals")}
                    variant="outline"
                    className="w-full"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Manage Referrals
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share className="h-5 w-5" />
                    Share Sales Link
                  </CardTitle>
                  <CardDescription>
                    Get a shareable link for customers to purchase tickets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    <Share className="mr-2 h-4 w-4" />
                    Get Sales Link
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Ticket Types Overview */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Ticket Types Performance</span>
                  <Button
                    onClick={() => setActiveTab("tickets")}
                    size="sm"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Manage Tickets
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ticketTypes.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: ticket.color }}
                        />
                        <div>
                          <h4 className="font-medium">{ticket.name}</h4>
                          <p className="text-sm text-gray-600">
                            ${((ticket?.price ?? 0) / 100).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {ticket.sold} sold / {ticket.capacity} total
                        </p>
                        <div className="flex items-center gap-2">
                          {(ticket.available ?? 0) > 0 ? (
                            <Badge className="bg-green-100 text-green-800">
                              {ticket.available} available
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800">
                              Sold Out
                            </Badge>
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
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-gray-600">
                          {order.ticketType} × {order.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${(order.totalAmount / 100).toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              order.status === "paid" ? "default" : "secondary"
                            }
                          >
                            {order.status}
                          </Badge>
                          {order.checkInStatus === "checked_in" ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <TicketingAnalytics
              ticketTypes={ticketTypes}
              orders={orders}
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
