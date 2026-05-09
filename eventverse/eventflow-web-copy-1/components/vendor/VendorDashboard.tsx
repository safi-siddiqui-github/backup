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
import {
  ArrowRight,
  Bell,
  Calendar,
  DollarSign,
  File,
  MessageSquare,
  Plus,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import ContractDialog from "./dialogs/ContractDialog";
import InvoiceDialog from "./dialogs/InvoiceDialog";
import MessageDialog from "./dialogs/MessageDialog";
import TaskDialog from "./dialogs/TaskDialog";

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
    reviewCount: 23,
  };

  const recentActivity = [
    {
      id: 1,
      type: "lead",
      message: "New lead from Wedding Budget",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "contract",
      message: "Contract signed by Sarah & Michael",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "payment",
      message: "Payment received - $2,500",
      time: "2 days ago",
    },
    {
      id: 4,
      type: "review",
      message: "New 5-star review received",
      time: "3 days ago",
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      task: "Deliver catering proposal to Johnson Wedding",
      due: "Today",
    },
    { id: 2, task: "Follow up with Elite Events inquiry", due: "Tomorrow" },
    { id: 3, task: "Submit invoice for completed project", due: "Dec 28" },
    { id: 4, task: "Schedule consultation with new client", due: "Dec 30" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <h2 className="mb-2 text-2xl font-bold">
          Welcome back, {vendor.businessName}!
        </h2>
        <p className="mb-4 text-blue-100">
          Here&apos;s what&apos;s happening with your business today
        </p>
        {!vendor.profileComplete && (
          <div className="mt-4 rounded-lg bg-white/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Complete Your Profile</h3>
                <p className="text-sm text-blue-100">
                  Add photos, services, and portfolio to attract more clients
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
              >
                Complete Profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.monthlyRevenue.toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Clients
            </CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeClients}</div>
            <p className="text-muted-foreground text-xs">
              <span className="text-green-600">+2</span> new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Contracts
            </CardTitle>
            <File className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pendingContracts}</div>
            <p className="text-muted-foreground text-xs">Worth $8,500 total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.rating}</div>
            <p className="text-muted-foreground text-xs">
              {metrics.reviewCount} reviews
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates from your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 rounded-lg bg-gray-50 p-3"
                >
                  <div className="mt-2 h-2 w-2 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="mt-4 w-full"
            >
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Tasks
            </CardTitle>
            <CardDescription>
              Don&apos;t miss these important deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.task}</p>
                    <p className="text-xs text-gray-500">Due: {task.due}</p>
                  </div>
                  <Badge
                    variant={task.due === "Today" ? "destructive" : "secondary"}
                  >
                    {task.due}
                  </Badge>
                </div>
              ))}
            </div>
            <TaskDialog>
              <Button
                variant="outline"
                className="mt-4 w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
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
          <CardDescription>
            Common tasks to manage your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <ContractDialog>
              <Button className="h-20 flex-col gap-2">
                <Plus className="h-6 w-6" />
                Create Contract
              </Button>
            </ContractDialog>

            <MessageDialog>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
              >
                <MessageSquare className="h-6 w-6" />
                Message Client
              </Button>
            </MessageDialog>

            <InvoiceDialog>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
              >
                <DollarSign className="h-6 w-6" />
                Send Invoice
              </Button>
            </InvoiceDialog>

            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
            >
              <TrendingUp className="h-6 w-6" />
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorDashboard;
