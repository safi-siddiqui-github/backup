"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AlertTriangle,
  CheckCircle,
  DollarSign,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface BudgetAnalyticsProps {
  eventId: string;
}

const BudgetAnalytics = ({ eventId }: BudgetAnalyticsProps) => {
  const budgetOverview = {
    totalBudget: 50000,
    spent: 38750,
    remaining: 11250,
    percentageSpent: 77.5,
  };

  const categorySpending = [
    {
      category: "Venue",
      budgeted: 15000,
      spent: 15000,
      remaining: 0,
      color: "#3B82F6",
    },
    {
      category: "Catering",
      budgeted: 12000,
      spent: 9800,
      remaining: 2200,
      color: "#10B981",
    },
    {
      category: "Photography",
      budgeted: 8000,
      spent: 7500,
      remaining: 500,
      color: "#F59E0B",
    },
    {
      category: "Flowers",
      budgeted: 5000,
      spent: 3200,
      remaining: 1800,
      color: "#EF4444",
    },
    {
      category: "Music/DJ",
      budgeted: 4000,
      spent: 3250,
      remaining: 750,
      color: "#8B5CF6",
    },
    {
      category: "Other",
      budgeted: 6000,
      spent: 0,
      remaining: 6000,
      color: "#6B7280",
    },
  ];

  const monthlySpending = [
    { month: "Jan", planned: 5000, actual: 4200 },
    { month: "Feb", planned: 8000, actual: 9100 },
    { month: "Mar", planned: 12000, actual: 11800 },
    { month: "Apr", planned: 15000, actual: 13650 },
    { month: "May", planned: 10000, actual: 0 },
  ];

  const vendorPayments = [
    {
      vendor: "Grand Venue Hall",
      amount: 15000,
      status: "Paid",
      dueDate: "Mar 1",
    },
    {
      vendor: "Elite Catering Co.",
      amount: 9800,
      status: "Paid",
      dueDate: "Apr 15",
    },
    {
      vendor: "Picture Perfect",
      amount: 7500,
      status: "Paid",
      dueDate: "May 1",
    },
    {
      vendor: "Bloom & Blossom",
      amount: 3200,
      status: "Pending",
      dueDate: "May 10",
    },
    {
      vendor: "Sound Waves DJ",
      amount: 3250,
      status: "Overdue",
      dueDate: "Apr 20",
    },
  ];

  const budgetHealthScore = 85;

  const chartConfig = {
    spent: { label: "Spent", color: "#3B82F6" },
    remaining: { label: "Remaining", color: "#10B981" },
    planned: { label: "Planned", color: "#8B5CF6" },
    actual: { label: "Actual", color: "#F59E0B" },
  };

  return (
    <div className="space-y-6">
      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-green-600" />
              <div>
                <div className="text-xl font-bold">
                  ${budgetOverview.totalBudget.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">Total Budget</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingDown className="h-6 w-6 text-red-600" />
              <div>
                <div className="text-xl font-bold">
                  ${budgetOverview.spent.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">Spent</div>
                <Badge
                  variant="outline"
                  className="mt-1"
                >
                  {budgetOverview.percentageSpent}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <div>
                <div className="text-xl font-bold">
                  ${budgetOverview.remaining.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">Remaining</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-purple-600" />
              <div>
                <div className="text-xl font-bold">{budgetHealthScore}</div>
                <div className="text-xs text-gray-600">Health Score</div>
                <Badge
                  variant="outline"
                  className="mt-1"
                >
                  Excellent
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
              <div>
                <div className="text-xl font-bold">2</div>
                <div className="text-xs text-gray-600">Pending Payments</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Category Spending */}
        <Card>
          <CardHeader>
            <CardTitle>Budget by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <BarChart data={categorySpending}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="category"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="spent"
                    fill="var(--color-spent)"
                  />
                  <Bar
                    dataKey="remaining"
                    fill="var(--color-remaining)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Spending Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spending Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <LineChart data={monthlySpending}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="planned"
                    stroke="var(--color-planned)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="var(--color-actual)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Details */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categorySpending.map((category, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <div>
                    <div className="font-medium">{category.category}</div>
                    <div className="text-sm text-gray-600">
                      ${category.spent.toLocaleString()} of $
                      {category.budgeted.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    ${category.remaining.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Remaining</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vendor Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Payment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vendorPayments.map((payment, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <div className="font-medium">{payment.vendor}</div>
                  <div className="text-sm text-gray-600">
                    Due: {payment.dueDate}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">
                      ${payment.amount.toLocaleString()}
                    </div>
                  </div>
                  <Badge
                    className={
                      payment.status === "Paid"
                        ? "bg-green-500"
                        : payment.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }
                  >
                    {payment.status}
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

export default BudgetAnalytics;
