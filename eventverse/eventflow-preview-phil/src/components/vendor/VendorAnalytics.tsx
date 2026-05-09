
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Calendar,
  Star,
  Eye,
  MessageSquare,
  Download,
  BarChart3
} from "lucide-react";

interface VendorUser {
  id: string;
  businessName: string;
  email: string;
  category: string;
  status: "active" | "pending" | "suspended";
  profileComplete: boolean;
}

interface VendorAnalyticsProps {
  vendor: VendorUser;
}

const VendorAnalytics = ({ vendor }: VendorAnalyticsProps) => {
  // Mock analytics data
  const analytics = {
    revenue: {
      thisMonth: 12500,
      lastMonth: 8300,
      growth: 50.6
    },
    leads: {
      thisMonth: 15,
      lastMonth: 12,
      conversionRate: 33.3
    },
    clients: {
      active: 8,
      new: 3,
      retention: 87.5
    },
    profile: {
      views: 245,
      inquiries: 23,
      rating: 4.8,
      reviews: 32
    }
  };

  const monthlyData = [
    { month: "Jan", revenue: 8500, leads: 12, clients: 5 },
    { month: "Feb", revenue: 9200, leads: 15, clients: 6 },
    { month: "Mar", revenue: 11800, leads: 18, clients: 7 },
    { month: "Apr", revenue: 13400, leads: 22, clients: 8 },
    { month: "May", revenue: 12100, leads: 19, clients: 7 },
    { month: "Jun", revenue: 15600, leads: 25, clients: 9 }
  ];

  const topServices = [
    { name: "Wedding Catering", bookings: 45, revenue: 67500 },
    { name: "Corporate Events", bookings: 28, revenue: 42000 },
    { name: "Birthday Parties", bookings: 35, revenue: 21000 },
    { name: "Anniversary Celebrations", bookings: 18, revenue: 18000 }
  ];

  const clientSources = [
    { source: "Event Budget Leads", percentage: 45, count: 12 },
    { source: "Referrals", percentage: 30, count: 8 },
    { source: "Website", percentage: 15, count: 4 },
    { source: "Social Media", percentage: 10, count: 3 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Analytics & Reports</h2>
          <p className="text-gray-600">Track your business performance and growth</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="last-30-days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
              <SelectItem value="last-year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">${analytics.revenue.thisMonth.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +{analytics.revenue.growth}% from last month
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Leads</p>
                <p className="text-2xl font-bold">{analytics.leads.thisMonth}</p>
                <p className="text-xs text-blue-600">
                  {analytics.leads.conversionRate}% conversion rate
                </p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold">{analytics.clients.active}</p>
                <p className="text-xs text-purple-600">
                  {analytics.clients.retention}% retention rate
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-bold">{analytics.profile.rating}</p>
                <p className="text-xs text-yellow-600">
                  {analytics.profile.reviews} reviews
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.month}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(data.revenue / 16000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold min-w-[80px] text-right">
                      ${data.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
            <CardDescription>Where your clients are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientSources.map((source, index) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{source.source}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{source.count} clients</span>
                      <Badge variant="outline">{source.percentage}%</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Services */}
        <Card>
          <CardHeader>
            <CardTitle>Top Services</CardTitle>
            <CardDescription>Your most popular service offerings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={service.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-gray-600">{service.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">${service.revenue.toLocaleString()}</p>
                    <Badge variant="outline">#{index + 1}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>Key business insights and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Strong Growth</span>
                </div>
                <p className="text-sm text-green-700">
                  Your revenue increased by 50.6% this month. Keep up the excellent work!
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">High Rating</span>
                </div>
                <p className="text-sm text-blue-700">
                  Your 4.8-star rating is excellent. Consider showcasing more reviews on your profile.
                </p>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Lead Response</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Respond to leads within 2 hours to increase conversion by up to 30%.
                </p>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-800">Seasonal Trend</span>
                </div>
                <p className="text-sm text-purple-700">
                  Wedding season is approaching. Consider updating your pricing and availability.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Performance</CardTitle>
          <CardDescription>How your vendor profile is performing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{analytics.profile.views}</p>
              <p className="text-sm text-gray-600">Profile Views</p>
              <p className="text-xs text-green-600">+12% this week</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">{analytics.profile.inquiries}</p>
              <p className="text-sm text-gray-600">Inquiries</p>
              <p className="text-xs text-green-600">+8% this week</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">{analytics.profile.rating}</p>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-xs text-gray-500">Based on {analytics.profile.reviews} reviews</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{analytics.leads.conversionRate}%</p>
              <p className="text-sm text-gray-600">Lead Conversion</p>
              <p className="text-xs text-green-600">+5% this month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorAnalytics;
