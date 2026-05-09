"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  DollarSign,
  Download,
  FileText,
  Printer,
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

interface BudgetReportsProps {
  budgetCategories: BudgetCategory[];
  expenses: Expense[];
  vendors: Vendor[];
}

const BudgetReports = ({
  budgetCategories,
  expenses,
  vendors,
}: BudgetReportsProps) => {
  const [reportType, setReportType] = useState("summary");
  const [timeRange, setTimeRange] = useState("all");

  // Calculate summary data
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

  // Category analysis
  const categoryAnalysis = budgetCategories.map((category) => {
    const categoryExpenses = expenses.filter(
      (exp) => exp.category === category.name,
    );
    const spent = categoryExpenses.reduce(
      (sum, exp) => sum + (exp.status === "paid" ? exp.amount : 0),
      0,
    );
    const committed = categoryExpenses.reduce(
      (sum, exp) =>
        sum +
        (exp.status === "approved" || exp.status === "paid" ? exp.amount : 0),
      0,
    );

    return {
      name: category.name,
      planned: category.planned,
      spent,
      committed,
      remaining: Math.max(0, category.planned - committed),
      utilization:
        category.planned > 0 ? (committed / category.planned) * 100 : 0,
      variance: committed - category.planned,
      expenseCount: categoryExpenses.length,
    };
  });

  // Vendor analysis
  const vendorAnalysis = vendors
    .map((vendor) => {
      const vendorExpenses = expenses.filter(
        (exp) => exp.vendor === vendor.name,
      );
      const totalSpent = vendorExpenses.reduce(
        (sum, exp) => sum + (exp.status === "paid" ? exp.amount : 0),
        0,
      );
      const totalCommitted = vendorExpenses.reduce(
        (sum, exp) =>
          sum +
          (exp.status === "approved" || exp.status === "paid" ? exp.amount : 0),
        0,
      );

      return {
        name: vendor.name,
        category: vendor.category,
        rating: vendor.rating,
        totalSpent,
        totalCommitted,
        expenseCount: vendorExpenses.length,
        averageExpense:
          vendorExpenses.length > 0 ? totalSpent / vendorExpenses.length : 0,
      };
    })
    .sort((a, b) => b.totalSpent - a.totalSpent);

  // Monthly spending trend
  const monthlySpending = expenses
    .filter((exp) => exp.status === "paid")
    .reduce(
      (acc, exp) => {
        const month = format(exp.date, "MMM yyyy");
        acc[month] = (acc[month] || 0) + exp.amount;
        return acc;
      },
      {} as Record<string, number>,
    );

  const monthlyData = Object.entries(monthlySpending).map(
    ([month, amount]) => ({
      month,
      amount,
    }),
  );

  const budgetUtilization =
    totalBudget > 0 ? (totalCommitted / totalBudget) * 100 : 0;
  const budgetVariance = totalCommitted - totalBudget;

  const handleExportReport = () => {
    // Implementation for exporting report
    console.log("Exporting report...");
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <Select
            value={reportType}
            onValueChange={setReportType}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="summary">Budget Summary</SelectItem>
              <SelectItem value="detailed">Detailed Analysis</SelectItem>
              <SelectItem value="vendor">Vendor Performance</SelectItem>
              <SelectItem value="variance">Variance Report</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleExportReport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            variant="outline"
            onClick={handlePrintReport}
          >
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-blue-50 p-4 text-center">
              <DollarSign className="mx-auto mb-2 h-8 w-8 text-blue-600" />
              <div className="text-2xl font-bold">
                ${totalBudget.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Budget</div>
            </div>
            <div className="rounded-lg bg-red-50 p-4 text-center">
              <TrendingDown className="mx-auto mb-2 h-8 w-8 text-red-600" />
              <div className="text-2xl font-bold">
                ${totalSpent.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
            <div className="rounded-lg bg-green-50 p-4 text-center">
              <TrendingUp className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <div className="text-2xl font-bold">
                ${(totalBudget - totalCommitted).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
            <div className="rounded-lg bg-purple-50 p-4 text-center">
              <Target className="mx-auto mb-2 h-8 w-8 text-purple-600" />
              <div className="text-2xl font-bold">
                {budgetUtilization.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Utilization</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-2 flex justify-between text-sm">
              <span>Budget Utilization</span>
              <span>{budgetUtilization.toFixed(1)}%</span>
            </div>
            <Progress
              value={Math.min(budgetUtilization, 100)}
              className="h-3"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-semibold">Budget Performance</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Categories:</span>
                  <span>{budgetCategories.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Expenses:</span>
                  <span>{expenses.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Vendors:</span>
                  <span>{vendors.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Budget Variance:</span>
                  <span
                    className={
                      budgetVariance > 0 ? "text-red-600" : "text-green-600"
                    }
                  >
                    ${Math.abs(budgetVariance).toLocaleString()}
                    {budgetVariance > 0 ? " over" : " under"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-semibold">Key Insights</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  {budgetUtilization > 100
                    ? "⚠️ Budget exceeded. Review spending in overallocated categories."
                    : budgetUtilization > 80
                      ? "📊 Budget utilization is high. Monitor remaining expenses carefully."
                      : "✅ Budget utilization is healthy. Good cost control maintained."}
                </p>
                <p>Generated on {format(new Date(), "PPP")}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Reports */}
      {reportType === "summary" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryAnalysis.map((category, index) => (
                  <div
                    key={index}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.name}</span>
                      <Badge
                        variant={
                          category.utilization > 100 ? "destructive" : "outline"
                        }
                      >
                        {category.utilization.toFixed(0)}%
                      </Badge>
                    </div>
                    <Progress
                      value={Math.min(category.utilization, 100)}
                      className="h-2"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>
                        ${category.committed.toLocaleString()} / $
                        {category.planned.toLocaleString()}
                      </span>
                      <span>{category.expenseCount} expenses</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Spending */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Spending Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
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
        </div>
      )}

      {reportType === "vendor" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Vendor Performance Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vendorAnalysis.slice(0, 10).map((vendor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <div className="font-medium">{vendor.name}</div>
                    <div className="text-sm text-gray-600">
                      {vendor.category}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      ${vendor.totalSpent.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {vendor.expenseCount} expenses • Rating: {vendor.rating}/5
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BudgetReports;
