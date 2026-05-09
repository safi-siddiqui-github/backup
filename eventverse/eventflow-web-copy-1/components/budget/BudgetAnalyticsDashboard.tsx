"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { VendorProfile } from "@/types/budget";
import {
  AlertTriangle,
  Award,
  Calendar,
  CheckCircle,
  DollarSign,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { BudgetExpenseItem, Proposal } from "./ComprehensiveBudgetModule";

interface BudgetAnalyticsDashboardProps {
  expenseItems: BudgetExpenseItem[];
  proposals: Proposal[];
  vendors: VendorProfile[];
  totalBudget: number;
  actualCost: number;
}

const BudgetAnalyticsDashboard = ({
  expenseItems,
  proposals,
  vendors,
  totalBudget,
  actualCost,
}: BudgetAnalyticsDashboardProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "week" | "month" | "quarter"
  >("month");

  // Calculate analytics data
  const allocatedBudget = expenseItems.reduce(
    (sum, item) => sum + item.allocatedBudget,
    0,
  );
  const budgetVariance = totalBudget - actualCost;
  const budgetUtilization =
    totalBudget > 0 ? (actualCost / totalBudget) * 100 : 0;

  const acceptedProposals = proposals.filter((p) => p.status === "accepted");
  const avgProposalValue =
    proposals.length > 0
      ? proposals.reduce((sum, p) => sum + p.totalCost, 0) / proposals.length
      : 0;

  // Category breakdown data
  const categoryData = expenseItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = {
          allocated: 0,
          actual: 0,
          count: 0,
        };
      }
      acc[item.category].allocated += item.allocatedBudget;
      acc[item.category].count += 1;

      // Calculate actual spending from accepted proposals
      const categoryProposals = acceptedProposals.filter(
        (p) =>
          expenseItems.find((ei) => ei.id === p.expenseItemId)?.category ===
          item.category,
      );
      acc[item.category].actual += categoryProposals.reduce(
        (sum, p) => sum + p.totalCost,
        0,
      );

      return acc;
    },
    {} as Record<string, { allocated: number; actual: number; count: number }>,
  );

  const categoryChartData = Object.entries(categoryData).map(
    ([category, data]) => ({
      category,
      allocated: data.allocated,
      actual: data.actual,
      variance: data.allocated - data.actual,
    }),
  );

  // Budget utilization by priority
  const priorityData = expenseItems.reduce(
    (acc, item) => {
      if (!acc[item.priority]) {
        acc[item.priority] = { allocated: 0, count: 0 };
      }
      acc[item.priority].allocated += item.allocatedBudget;
      acc[item.priority].count += 1;
      return acc;
    },
    {} as Record<string, { allocated: number; count: number }>,
  );

  const priorityChartData = Object.entries(priorityData).map(
    ([priority, data]) => ({
      priority: priority.charAt(0).toUpperCase() + priority.slice(1),
      value: data.allocated,
      count: data.count,
    }),
  );

  // Vendor performance data
  const vendorPerformance = vendors
    .map((vendor) => {
      const vendorProposals = proposals.filter((p) => p.vendorId === vendor.id);
      const acceptedCount = vendorProposals.filter(
        (p) => p.status === "accepted",
      ).length;
      const avgResponseTime = vendor.responseTime;

      return {
        name: vendor.name,
        rating: vendor.rating,
        proposals: vendorProposals.length,
        accepted: acceptedCount,
        successRate:
          vendorProposals.length > 0
            ? (acceptedCount / vendorProposals.length) * 100
            : 0,
        category: vendor.category,
      };
    })
    .filter((v) => v.proposals > 0);

  // Timeline data (mock for demonstration)
  const timelineData = [
    { month: "Jan", budgeted: 5000, spent: 4500 },
    { month: "Feb", budgeted: 8000, spent: 7200 },
    { month: "Mar", budgeted: 12000, spent: 11800 },
    { month: "Apr", budgeted: 25000, spent: actualCost },
  ];

  const COLORS = [
    "#8B5CF6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#3B82F6",
    "#EC4899",
  ];

  const getPerformanceIcon = (
    value: number,
    threshold: number,
    reverse = false,
  ) => {
    const isGood = reverse ? value < threshold : value > threshold;
    return isGood ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return "text-green-600";
    if (variance < -1000) return "text-red-600";
    return "text-yellow-600";
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Budget Utilization</div>
                <div className="text-2xl font-bold">
                  {budgetUtilization.toFixed(1)}%
                </div>
              </div>
              <div className="rounded-lg bg-blue-100 p-2">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <Progress
              value={budgetUtilization}
              className="mt-2 h-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Budget Variance</div>
                <div
                  className={`text-2xl font-bold ${getVarianceColor(budgetVariance)}`}
                >
                  {budgetVariance >= 0 ? "+" : ""}$
                  {budgetVariance.toLocaleString()}
                </div>
              </div>
              <div className="rounded-lg bg-green-100 p-2">
                {getPerformanceIcon(budgetVariance, 0)}
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {budgetVariance >= 0 ? "Under budget" : "Over budget"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Avg Proposal Value</div>
                <div className="text-2xl font-bold">
                  ${avgProposalValue.toLocaleString()}
                </div>
              </div>
              <div className="rounded-lg bg-purple-100 p-2">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              From {proposals.length} proposals
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Vendor Response</div>
                <div className="text-2xl font-bold">92%</div>
              </div>
              <div className="rounded-lg bg-green-100 p-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-500">Avg response rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Budget vs Actual Spending */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-blue-600" />
            Budget vs Actual Spending by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={categoryChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "",
                ]}
              />
              <Legend />
              <Bar
                dataKey="allocated"
                fill="#8B5CF6"
                name="Allocated Budget"
              />
              <Bar
                dataKey="actual"
                fill="#10B981"
                name="Actual Spending"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              Budget Allocation by Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer
              width="100%"
              height={250}
            >
              <PieChart>
                <Pie
                  data={priorityChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ priority, value }) =>
                    `${priority}: $${value.toLocaleString()}`
                  }
                >
                  {priorityChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    "Budget",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Spending Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Spending Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer
              width="100%"
              height={250}
            >
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    "",
                  ]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="budgeted"
                  stroke="#8B5CF6"
                  name="Budgeted"
                />
                <Line
                  type="monotone"
                  dataKey="spent"
                  stroke="#10B981"
                  name="Actual Spent"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-600" />
            Vendor Performance Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vendorPerformance.slice(0, 5).map((vendor, index) => (
              <div
                key={vendor.name}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="text-lg font-bold text-gray-400">
                    #{index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold">{vendor.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Badge variant="outline">{vendor.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{vendor.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">
                      {vendor.proposals}
                    </div>
                    <div className="text-xs text-gray-600">Proposals</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">
                      {vendor.accepted}
                    </div>
                    <div className="text-xs text-gray-600">Accepted</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">
                      {vendor.successRate.toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-600">Success Rate</div>
                  </div>
                </div>

                {vendor.successRate >= 80 && (
                  <Badge className="bg-green-100 text-green-800">
                    <Award className="mr-1 h-3 w-3" />
                    Top Performer
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights and Recommendations */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <TrendingUp className="h-5 w-5" />
            Budget Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium text-blue-800">Cost Optimization</h4>
              <div className="space-y-2 text-sm">
                {budgetVariance < 0 && (
                  <div className="flex items-start gap-2 rounded bg-red-100 p-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-red-600" />
                    <span className="text-red-800">
                      You&apos;re over budget by $
                      {Math.abs(budgetVariance).toLocaleString()}. Consider
                      renegotiating or finding alternatives.
                    </span>
                  </div>
                )}
                {budgetUtilization < 80 && (
                  <div className="flex items-start gap-2 rounded bg-green-100 p-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                    <span className="text-green-800">
                      Great job staying within budget! You have $
                      {budgetVariance.toLocaleString()} remaining.
                    </span>
                  </div>
                )}
                <div className="flex items-start gap-2 rounded bg-blue-100 p-2">
                  <TrendingUp className="mt-0.5 h-4 w-4 text-blue-600" />
                  <span className="text-blue-800">
                    Consider requesting multiple proposals for remaining items
                    to ensure competitive pricing.
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-blue-800">Vendor Selection</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2 rounded bg-purple-100 p-2">
                  <Star className="mt-0.5 h-4 w-4 text-purple-600" />
                  <span className="text-purple-800">
                    Focus on vendors with 4.5+ ratings and high response rates
                    for better service.
                  </span>
                </div>
                <div className="flex items-start gap-2 rounded bg-yellow-100 p-2">
                  <Calendar className="mt-0.5 h-4 w-4 text-yellow-600" />
                  <span className="text-yellow-800">
                    Book high-priority vendors early to secure availability and
                    better rates.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetAnalyticsDashboard;
