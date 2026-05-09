
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Ticket, DollarSign, TrendingUp, Users, CheckCircle, Clock } from "lucide-react";

interface TicketingAnalyticsProps {
  eventId: string;
}

const TicketingAnalytics = ({ eventId }: TicketingAnalyticsProps) => {
  const ticketOverview = {
    totalRevenue: 24750,
    ticketsSold: 189,
    totalCapacity: 250,
    avgTicketPrice: 131,
    salesRate: 75.6
  };

  const ticketTypes = [
    { type: "Early Bird", price: 99, sold: 45, capacity: 50, revenue: 4455 },
    { type: "Regular", price: 149, sold: 89, capacity: 150, revenue: 13261 },
    { type: "VIP", price: 299, sold: 25, capacity: 30, revenue: 7475 },
    { type: "Student", price: 79, sold: 30, capacity: 20, revenue: 2370 }
  ];

  const dailySales = [
    { date: "Mar 1", sales: 12, revenue: 1188 },
    { date: "Mar 8", sales: 28, revenue: 2772 },
    { date: "Mar 15", sales: 35, revenue: 5215 },
    { date: "Mar 22", sales: 42, revenue: 6258 },
    { date: "Mar 29", sales: 38, revenue: 5814 },
    { date: "Apr 5", sales: 22, revenue: 3278 },
    { date: "Today", sales: 12, revenue: 1788 }
  ];

  const chartConfig = {
    sales: { label: "Tickets Sold", color: "#3B82F6" },
    revenue: { label: "Revenue", color: "#10B981" }
  };

  return (
    <div className="space-y-6">
      {/* Ticketing Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-green-600" />
              <div>
                <div className="text-xl font-bold">${ticketOverview.totalRevenue.toLocaleString()}</div>
                <div className="text-xs text-gray-600">Total Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Ticket className="w-6 h-6 text-blue-600" />
              <div>
                <div className="text-xl font-bold">{ticketOverview.ticketsSold}</div>
                <div className="text-xs text-gray-600">Tickets Sold</div>
                <Badge variant="outline" className="mt-1">{ticketOverview.salesRate}%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-600" />
              <div>
                <div className="text-xl font-bold">{ticketOverview.totalCapacity}</div>
                <div className="text-xs text-gray-600">Total Capacity</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-orange-600" />
              <div>
                <div className="text-xl font-bold">${ticketOverview.avgTicketPrice}</div>
                <div className="text-xs text-gray-600">Avg. Ticket Price</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-red-600" />
              <div>
                <div className="text-xl font-bold">156</div>
                <div className="text-xs text-gray-600">Checked In</div>
                <Badge variant="outline" className="mt-1">82.5%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-yellow-600" />
              <div>
                <div className="text-xl font-bold">33</div>
                <div className="text-xs text-gray-600">Pending Check-in</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Sales Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Ticket Type Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Ticket Type Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ticketTypes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sold" fill="var(--color-sales)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Ticket Type Details */}
      <Card>
        <CardHeader>
          <CardTitle>Ticket Type Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ticketTypes.map((ticket, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{ticket.type}</div>
                  <div className="text-sm text-gray-600">${ticket.price} per ticket</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="font-medium">{ticket.sold}/{ticket.capacity}</div>
                    <div className="text-xs text-gray-600">Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">${ticket.revenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Revenue</div>
                  </div>
                  <Badge className={
                    (ticket.sold / ticket.capacity) > 0.8 ? "bg-green-500" :
                    (ticket.sold / ticket.capacity) > 0.5 ? "bg-yellow-500" : "bg-red-500"
                  }>
                    {Math.round((ticket.sold / ticket.capacity) * 100)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketingAnalytics;
