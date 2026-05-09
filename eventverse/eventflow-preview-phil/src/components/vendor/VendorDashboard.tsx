
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  Users, 
  File, 
  TrendingUp, 
  Bell, 
  Calendar,
  Star,
  MessageSquare,
  Plus,
  ArrowRight
} from "lucide-react";
import TaskDialog from "./dialogs/TaskDialog";
import ContractDialog from "./dialogs/ContractDialog";
import MessageDialog from "./dialogs/MessageDialog";
import InvoiceDialog from "./dialogs/InvoiceDialog";

interface VendorUser {
  id: string;
  businessName: string;
  email: string;
  category: string;
  status: "active" | "pending" | "suspended";
  profileComplete: boolean;
}

interface VendorDashboardProps {
  vendor: VendorUser;
}

const VendorDashboard = ({ vendor }: VendorDashboardProps) => {
  // Mock data for dashboard metrics
  const metrics = {
    monthlyRevenue: 12500,
    activeClients: 8,
    pendingContracts: 3,
    newLeads: 5,
    rating: 4.8,
    reviewCount: 23
  };

  const recentActivity = [
    { id: 1, type: "lead", message: "New lead from Wedding Budget", time: "2 hours ago" },
    { id: 2, type: "contract", message: "Contract signed by Sarah & Michael", time: "1 day ago" },
    { id: 3, type: "payment", message: "Payment received - $2,500", time: "2 days ago" },
    { id: 4, type: "review", message: "New 5-star review received", time: "3 days ago" }
  ];

  const upcomingTasks = [
    { id: 1, task: "Deliver catering proposal to Johnson Wedding", due: "Today" },
    { id: 2, task: "Follow up with Elite Events inquiry", due: "Tomorrow" },
    { id: 3, task: "Submit invoice for completed project", due: "Dec 28" },
    { id: 4, task: "Schedule consultation with new client", due: "Dec 30" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {vendor.businessName}!</h2>
        <p className="text-blue-100 mb-4">Here's what's happening with your business today</p>
        {!vendor.profileComplete && (
          <div className="bg-white/20 rounded-lg p-4 mt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Complete Your Profile</h3>
                <p className="text-sm text-blue-100">Add photos, services, and portfolio to attract more clients</p>
              </div>
              <Button variant="secondary" size="sm">
                Complete Profile
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeClients}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2</span> new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Contracts</CardTitle>
            <File className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pendingContracts}</div>
            <p className="text-xs text-muted-foreground">
              Worth $8,500 total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.rating}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.reviewCount} reviews
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates from your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Tasks
            </CardTitle>
            <CardDescription>Don't miss these important deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.task}</p>
                    <p className="text-xs text-gray-500">Due: {task.due}</p>
                  </div>
                  <Badge variant={task.due === "Today" ? "destructive" : "secondary"}>
                    {task.due}
                  </Badge>
                </div>
              ))}
            </div>
            <TaskDialog>
              <Button variant="outline" className="w-full mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </TaskDialog>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to manage your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ContractDialog>
              <Button className="h-20 flex-col gap-2">
                <Plus className="w-6 h-6" />
                Create Contract
              </Button>
            </ContractDialog>
            
            <MessageDialog>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <MessageSquare className="w-6 h-6" />
                Message Client
              </Button>
            </MessageDialog>
            
            <InvoiceDialog>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <DollarSign className="w-6 h-6" />
                Send Invoice
              </Button>
            </InvoiceDialog>
            
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="w-6 h-6" />
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorDashboard;
