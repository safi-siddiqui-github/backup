"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { DollarSign, Receipt, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Define types locally
interface BudgetCategory {
  id: string;
  name: string;
  planned: number;
  color: string;
  subcategories?: { name: string; planned: number; spent: number }[];
}

interface Expense {
  id: number;
  category: string;
  subcategory?: string;
  vendor?: string;
  description: string;
  amount: number;
  date: Date;
  status: "planned" | "approved" | "paid" | "overdue";
  paymentMethod?: string;
  dueDate?: Date;
  notes?: string;
  receipt?: string;
}

interface Vendor {
  id: number;
  name: string;
  category: string;
  contact: string;
  rating: number;
  description: string;
}

interface BudgetAnalyticsProps {
  budgetCategories: BudgetCategory[];
  expenses: Expense[];
  vendors: Vendor[];
}

const BudgetAnalytics = ({
  budgetCategories,
  expenses,
  vendors,
}: BudgetAnalyticsProps) => {
  const [timeRange, setTimeRange] = useState("30");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Calculate analytics data
  const totalBudget = budgetCategories.reduce(
    (sum, cat) => sum + cat.planned,
    0,
  );
  const totalSpent = expenses.reduce(
    (sum, exp) => sum + (exp.status === "paid" ? exp.amount : 0),
    0,
  );
  const totalCommitted = expenses.reduce(
    (sum, exp) =>
      sum +
      (exp.status === "approved" || exp.status === "paid" ? exp.amount : 0),
    0,
  );

  // Generate spending trend data
  const days = parseInt(timeRange);
  const dateRange = eachDayOfInterval({
    start: subDays(new Date(), days),
    end: new Date(),
  });

  const spendingTrend = dateRange.map((date) => {
    const dayExpenses = expenses.filter(
      (exp) =>
        format(exp.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd") &&
        exp.status === "paid",
    );
    return {
      date: format(date, "MMM dd"),
      amount: dayExpenses.reduce((sum, exp) => sum + exp.amount, 0),
    };
  });

  // Category breakdown
  const categoryBreakdown = budgetCategories.map((category) => {
    const categoryExpenses = expenses.filter(
      (exp) => exp.category === category.name && exp.status === "paid",
    );
    const spent = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    return {
      name: category.name,
      planned: category.planned,
      spent: spent,
      remaining: Math.max(0, category.planned - spent),
      utilization: category.planned > 0 ? (spent / category.planned) * 100 : 0,
    };
  });

  // Vendor performance
  const vendorPerformance = vendors
    .map((vendor) => {
      const vendorExpenses = expenses.filter(
        (exp) => exp.vendor === vendor.name,
      );
      const totalSpent = vendorExpenses.reduce(
        (sum, exp) => sum + (exp.status === "paid" ? exp.amount : 0),
        0,
      );
      return {
        name: vendor.name,
        category: vendor.category,
        totalSpent,
        expenseCount: vendorExpenses.length,
        rating: vendor.rating,
      };
    })
    .sort((a, b) => b.totalSpent - a.totalSpent);

  const budgetUtilization =
    totalBudget > 0 ? (totalCommitted / totalBudget) * 100 : 0;
  const remainingBudget = totalBudget - totalCommitted;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold">
                  ${totalBudget.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-red-600">
                  ${totalSpent.toLocaleString()}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Remaining</p>
                <p className="text-2xl font-bold text-green-600">
                  ${remainingBudget.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Utilization</p>
                <p className="text-2xl font-bold">
                  {budgetUtilization.toFixed(1)}%
                </p>
              </div>
              <Receipt className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {budgetCategories.map((cat) => (
                <SelectItem
                  key={cat.id}
                  value={cat.name}
                >
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Spending Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Spending Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={spendingTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                <Bar
                  dataKey="amount"
                  fill="#3b82f6"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryBreakdown.map((category, index) => (
                <div
                  key={index}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                    <div className="text-right">
                      <div className="text-sm">
                        ${category.spent.toLocaleString()} / $
                        {category.planned.toLocaleString()}
                      </div>
                      <Badge
                        variant={
                          category.utilization > 100 ? "destructive" : "outline"
                        }
                        className="text-xs"
                      >
                        {category.utilization.toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress
                    value={Math.min(category.utilization, 100)}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Top Vendors by Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vendorPerformance.slice(0, 5).map((vendor, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <div>
                  <div className="font-medium">{vendor.name}</div>
                  <div className="text-sm text-gray-600">{vendor.category}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    ${vendor.totalSpent.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {vendor.expenseCount} expenses
                  </div>
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
