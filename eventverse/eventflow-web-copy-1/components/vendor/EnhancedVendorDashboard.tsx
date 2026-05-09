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
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  ChartBar,
  CheckCircle,
  Clock,
  DollarSign,
  Plus,
  Target,
  Zap,
} from "lucide-react";
import { useState } from "react";
import AIProposalGenerator from "./ai/AIProposalGenerator";
import SmartLeadScoring from "./ai/SmartLeadScoring";
import PaymentRequestDialog from "./dialogs/PaymentRequestDialog";
import InvoiceAutomationPanel from "./InvoiceAutomationPanel";

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
  const [activeAIFeature, setActiveAIFeature] = useState<string | null>(null);

  // Enhanced metrics with AI insights
  const metrics = {
    monthlyRevenue: 12500,
    activeClients: 8,
    pendingContracts: 3,
    newLeads: 5,
    rating: 4.8,
    reviewCount: 23,
    aiLeadScore: 85,
    conversionRate: 32,
    avgResponseTime: "2.5 hours",
    projectCompletionRate: 96,
  };

  const aiInsights = [
    {
      type: "opportunity",
      title: "High-value lead detected",
      description: "Johnson Wedding ($15K budget) matches your specialty",
      confidence: 92,
      action: "Generate proposal",
    },
    {
      type: "pricing",
      title: "Pricing optimization",
      description: "Consider 8% price increase for wedding photography",
      confidence: 78,
      action: "Update pricing",
    },
    {
      type: "follow-up",
      title: "Follow-up reminder",
      description: "3 leads haven't been contacted in 48+ hours",
      confidence: 95,
      action: "Send messages",
    },
  ];

  const upcomingPayments = [
    {
      client: "Sarah & Michael",
      amount: 2500,
      dueDate: "Today",
      status: "pending",
    },
    {
      client: "Elite Events Corp",
      amount: 3200,
      dueDate: "Dec 28",
      status: "scheduled",
    },
    {
      client: "Johnson Wedding",
      amount: 1800,
      dueDate: "Jan 2",
      status: "draft",
    },
  ];

  return (
    <div className="space-y-6">
      {/* AI-Enhanced Welcome Section */}
      <div className="rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold">
              Welcome back, {vendor.businessName}!
            </h2>
            <p className="mb-4 text-blue-100">
              AI insights and opportunities are ready for you
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                <span className="text-sm">
                  AI Lead Score: {metrics.aiLeadScore}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                <span className="text-sm">
                  Conversion Rate: {metrics.conversionRate}%
                </span>
              </div>
            </div>
          </div>
          <Badge className="border-white/30 bg-white/20 text-white">
            <Zap className="mr-1 h-3 w-3" />
            AI Powered
          </Badge>
        </div>
      </div>

      {/* AI Insights Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Business Insights
          </CardTitle>
          <CardDescription>
            Smart recommendations to grow your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiInsights.map((insight, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-4"
              >
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-medium">{insight.title}</span>
                    <Badge
                      variant="secondary"
                      className="text-xs"
                    >
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                >
                  {insight.action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Metrics Grid */}
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
            <Progress
              value={75}
              className="mt-2 h-1"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lead Conversion
            </CardTitle>
            <Target className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.conversionRate}%</div>
            <p className="text-muted-foreground text-xs">
              <span className="text-green-600">+5%</span> this month
            </p>
            <Progress
              value={metrics.conversionRate}
              className="mt-2 h-1"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Response Time
            </CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgResponseTime}</div>
            <p className="text-muted-foreground text-xs">
              <span className="text-green-600">-30min</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <CheckCircle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.projectCompletionRate}%
            </div>
            <p className="text-muted-foreground text-xs">Industry leading</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* AI-Powered Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Smart Actions
            </CardTitle>
            <CardDescription>
              AI-recommended actions for your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <AIProposalGenerator>
                <Button className="h-20 flex-col gap-2 bg-gradient-to-br from-purple-600 to-blue-600">
                  <Brain className="h-6 w-6" />
                  AI Proposal
                </Button>
              </AIProposalGenerator>

              <SmartLeadScoring>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                >
                  <Target className="h-6 w-6" />
                  Score Leads
                </Button>
              </SmartLeadScoring>

              <PaymentRequestDialog>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                >
                  <DollarSign className="h-6 w-6" />
                  Request Payment
                </Button>
              </PaymentRequestDialog>

              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
              >
                <ChartBar className="h-6 w-6" />
                <span className="text-sm">Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Payment Management
            </CardTitle>
            <CardDescription>
              Upcoming payments and invoice automation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingPayments.map((payment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{payment.client}</p>
                    <p className="text-sm text-gray-600">
                      ${payment.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        payment.status === "pending"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {payment.status}
                    </Badge>
                    <p className="mt-1 text-xs text-gray-500">
                      {payment.dueDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              className="mt-4 w-full"
              variant="outline"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Automation Panel */}
      <InvoiceAutomationPanel vendor={vendor} />
    </div>
  );
};

export default EnhancedVendorDashboard;
