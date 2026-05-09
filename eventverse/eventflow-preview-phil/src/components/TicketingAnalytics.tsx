
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, DollarSign, Users, Calendar, Clock, Target } from "lucide-react";

interface TicketingAnalyticsProps {
  ticketTypes: any[];
  orders: any[];
}

const TicketingAnalytics = ({ ticketTypes, orders }: TicketingAnalyticsProps) => {
  const paidOrders = orders.filter(order => order.status === 'paid');
  
  // Sales by ticket type
  const salesByType = ticketTypes.map(type => ({
    name: type.name,
    sold: type.sold,
    revenue: (type.sold * type.price) / 100,
    capacity: type.capacity,
    color: type.color
  }));

  // Sales over time (mock data for demo)
  const salesOverTime = [
    { date: '2024-05-01', sales: 5, revenue: 250 },
    { date: '2024-05-02', sales: 8, revenue: 400 },
    { date: '2024-05-03', sales: 12, revenue: 600 },
    { date: '2024-05-04', sales: 15, revenue: 750 },
    { date: '2024-05-05', sales: 23, revenue: 1150 },
    { date: '2024-05-06', sales: 31, revenue: 1550 },
    { date: '2024-05-07', sales: 38, revenue: 1900 }
  ];

  // Check-in analytics
  const checkedInCount = paidOrders.filter(order => order.checkInStatus === 'checked_in').length;
  const checkInRate = paidOrders.length > 0 ? Math.round((checkedInCount / paidOrders.length) * 100) : 0;

  // Revenue analytics
  const totalRevenue = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const averageOrderValue = paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0;

  // Conversion metrics (mock data)
  const conversionMetrics = {
    pageViews: 1250,
    ticketViews: 890,
    addToCart: 320,
    purchases: paidOrders.length,
    conversionRate: Math.round((paidOrders.length / 890) * 100)
  };

  const COLORS = ['#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Analytics & Reports</h2>
        <p className="text-purple-100">Track your ticket sales performance and attendee insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${(totalRevenue / 100).toFixed(2)}
                </p>
                <p className="text-xs text-green-600">+12% from last week</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tickets Sold</p>
                <p className="text-2xl font-bold text-gray-900">
                  {ticketTypes.reduce((sum, type) => sum + type.sold, 0)}
                </p>
                <p className="text-xs text-blue-600">
                  {Math.round((ticketTypes.reduce((sum, type) => sum + type.sold, 0) / 
                  ticketTypes.reduce((sum, type) => sum + type.capacity, 0)) * 100)}% capacity
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${(averageOrderValue / 100).toFixed(2)}
                </p>
                <p className="text-xs text-purple-600">Per transaction</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Check-in Rate</p>
                <p className="text-2xl font-bold text-gray-900">{checkInRate}%</p>
                <p className="text-xs text-orange-600">
                  {checkedInCount} of {paidOrders.length} attendees
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Ticket Type */}
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Sales by Ticket Type</CardTitle>
            <CardDescription>Revenue and quantity breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'sold' ? `${value} tickets` : `$${value}`,
                    name === 'sold' ? 'Sold' : 'Revenue'
                  ]}
                />
                <Bar dataKey="sold" fill="#3B82F6" />
                <Bar dataKey="revenue" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ticket Distribution */}
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Ticket Distribution</CardTitle>
            <CardDescription>Sales by ticket type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesByType}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="sold"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {salesByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} tickets`, 'Sold']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Timeline */}
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Sales Over Time
            </CardTitle>
            <CardDescription>Daily sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  formatter={(value, name) => [
                    name === 'sales' ? `${value} tickets` : `$${value}`,
                    name === 'sales' ? 'Tickets Sold' : 'Revenue'
                  ]}
                />
                <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>Track customer journey to purchase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Page Views</span>
                <span className="font-medium">{conversionMetrics.pageViews}</span>
              </div>
              <Progress value={100} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Ticket Views</span>
                <span className="font-medium">{conversionMetrics.ticketViews}</span>
              </div>
              <Progress value={(conversionMetrics.ticketViews / conversionMetrics.pageViews) * 100} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Add to Cart</span>
                <span className="font-medium">{conversionMetrics.addToCart}</span>
              </div>
              <Progress value={(conversionMetrics.addToCart / conversionMetrics.pageViews) * 100} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Purchases</span>
                <span className="font-medium">{conversionMetrics.purchases}</span>
              </div>
              <Progress value={(conversionMetrics.purchases / conversionMetrics.pageViews) * 100} className="h-2" />
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Conversion Rate</span>
                <Badge className="bg-green-100 text-green-800">
                  {conversionMetrics.conversionRate}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ticket Performance Table */}
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Ticket Performance Summary</CardTitle>
          <CardDescription>Detailed breakdown by ticket type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salesByType.map((ticket, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: ticket.color }}
                    />
                    <h4 className="font-medium">{ticket.name}</h4>
                  </div>
                  <Badge variant="outline">
                    {Math.round((ticket.sold / ticket.capacity) * 100)}% sold
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Sold</p>
                    <p className="font-medium">{ticket.sold} / {ticket.capacity}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Revenue</p>
                    <p className="font-medium">${ticket.revenue.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Remaining</p>
                    <p className="font-medium">{ticket.capacity - ticket.sold}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Potential Revenue</p>
                    <p className="font-medium">
                      ${((ticket.capacity - ticket.sold) * (ticket.revenue / ticket.sold || 0)).toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <Progress 
                  value={(ticket.sold / ticket.capacity) * 100} 
                  className="mt-3"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketingAnalytics;
