import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Bell, 
  Calendar,
  Star,
  MessageSquare,
  ArrowRight,
  Brain,
  Target,
  Zap,
  Clock,
  CheckCircle,
  TrendingDown,
  AlertCircle,
  FileText,
  ArrowUpRight
} from "lucide-react";

interface VendorUser {
  id: string;
  businessName: string;
  email: string;
  category: string;
  status: "active" | "pending" | "suspended";
  profileComplete: boolean;
}

interface EnhancedVendorDashboardProps {
  vendor: VendorUser;
}

const EnhancedVendorDashboard = ({ vendor }: EnhancedVendorDashboardProps) => {
  // Mock data - replace with real data
  const metrics = {
    businessHealth: 87,
    monthlyRevenue: 12500,
    revenueGrowth: 12,
    activeClients: 8,
    clientGrowth: 3,
    newLeads: 5,
    conversionRate: 32,
    avgResponseTime: "2.5 hours",
    projectCompletionRate: 96,
    customerSatisfaction: 4.8,
    pendingTasks: 7
  };

  const aiInsights = [
    { 
      type: "opportunity", 
      icon: Target,
      title: "High-value lead detected", 
      description: "Johnson Wedding ($15K budget) matches your specialty perfectly",
      confidence: 92,
      action: "Generate Proposal",
      priority: "high"
    },
    { 
      type: "action", 
      icon: Clock,
      title: "Response time alert", 
      description: "3 leads haven't received responses in 48+ hours",
      confidence: 95,
      action: "Send Messages",
      priority: "urgent"
    },
    { 
      type: "insight", 
      icon: TrendingUp,
      title: "Pricing optimization", 
      description: "Market analysis suggests 8% price increase opportunity for wedding photography",
      confidence: 78,
      action: "Review Pricing",
      priority: "medium"
    }
  ];

  const recentActivity = [
    { icon: MessageSquare, title: "New message from Sarah & Michael", time: "5 min ago", type: "message" },
    { icon: DollarSign, title: "Payment received - $2,500", time: "2 hours ago", type: "payment" },
    { icon: Bell, title: "New lead: Corporate Event", time: "3 hours ago", type: "lead" },
    { icon: CheckCircle, title: "Contract signed by Elite Events", time: "Yesterday", type: "contract" },
    { icon: Calendar, title: "Upcoming: Johnson Wedding Setup", time: "Tomorrow", type: "event" }
  ];

  const upcomingEvents = [
    { client: "Sarah & Michael Wedding", date: "Dec 28, 2024", time: "2:00 PM", status: "confirmed" },
    { client: "Elite Events Corp Meeting", date: "Jan 2, 2025", time: "10:00 AM", status: "pending" },
    { client: "Johnson Wedding Consultation", date: "Jan 5, 2025", time: "3:30 PM", status: "confirmed" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500/10 text-red-600 border-red-200";
      case "high": return "bg-orange-500/10 text-orange-600 border-orange-200";
      case "medium": return "bg-blue-500/10 text-blue-600 border-blue-200";
      default: return "bg-gray-500/10 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Business Health Overview Hero Card */}
      <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white border-0">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome back, {vendor.businessName}!</h2>
              <p className="text-blue-100">Here's your business snapshot for today</p>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              <Brain className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-blue-100 text-sm mb-1">Business Health</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold">{metrics.businessHealth}</span>
                <span className="text-xl mb-1">/100</span>
              </div>
              <Progress value={metrics.businessHealth} className="mt-2 h-2 bg-white/20" />
            </div>

            <div>
              <p className="text-blue-100 text-sm mb-1">Revenue this Month</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">${metrics.monthlyRevenue.toLocaleString()}</span>
                <span className="text-green-300 text-sm flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{metrics.revenueGrowth}%
                </span>
              </div>
            </div>

            <div>
              <p className="text-blue-100 text-sm mb-1">Active Clients</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{metrics.activeClients}</span>
                <span className="text-green-300 text-sm">+{metrics.clientGrowth} new</span>
              </div>
            </div>

            <div>
              <p className="text-blue-100 text-sm mb-1">Pending Tasks</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{metrics.pendingTasks}</span>
                <span className="text-yellow-300 text-sm">Need attention</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                AI Business Insights
              </CardTitle>
              <CardDescription>Top 3 recommendations to grow your business</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiInsights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200"
                >
                  <div className="p-2 bg-white rounded-lg">
                    <IconComponent className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-gray-900">{insight.title}</span>
                      <Badge variant="secondary" className="text-xs">
                        {insight.confidence}% confidence
                      </Badge>
                      <Badge className={getPriorityColor(insight.priority)}>
                        {insight.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                    <Button size="sm" variant="outline">
                      {insight.action}
                      <ArrowUpRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.newLeads}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2</span> from last week
            </p>
            <Progress value={60} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> this month
            </p>
            <Progress value={metrics.conversionRate} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgResponseTime}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-30min</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.customerSatisfaction}/5.0</div>
            <p className="text-xs text-muted-foreground">
              Based on 23 reviews
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <IconComponent className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Your schedule for the next week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:border-purple-300 transition-colors">
                  <div>
                    <p className="font-medium text-gray-900">{event.client}</p>
                    <p className="text-sm text-gray-600">{event.date} • {event.time}</p>
                  </div>
                  <Badge variant={event.status === "confirmed" ? "default" : "secondary"}>
                    {event.status}
                  </Badge>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                View Full Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            Quick Actions
          </CardTitle>
          <CardDescription>Common tasks to keep your business running smoothly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <Button variant="outline" className="h-24 flex-col gap-2">
              <Brain className="w-6 h-6 text-purple-600" />
              <span className="text-xs">AI Proposal</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              <span className="text-xs">Message Client</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <DollarSign className="w-6 h-6 text-green-600" />
              <span className="text-xs">Create Invoice</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <Calendar className="w-6 h-6 text-orange-600" />
              <span className="text-xs">Schedule Event</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <Target className="w-6 h-6 text-pink-600" />
              <span className="text-xs">Score Leads</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <FileText className="w-6 h-6 text-indigo-600" />
              <span className="text-xs">View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedVendorDashboard;
