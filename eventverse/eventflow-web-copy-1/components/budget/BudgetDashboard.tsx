"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  PieChart,
  Receipt,
  TrendingUp,
} from "lucide-react";
import BudgetHealthWidget from "./BudgetHealthWidget";
import CategoryOverview from "./CategoryOverview";
import QuickActions from "./QuickActions";

// Define legacy types for backward compatibility
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

interface BudgetDashboardProps {
  budgetCategories: BudgetCategory[];
  expenses: Expense[];
  onAddExpense: () => void;
  onManageCategories: () => void;
  onViewReports: () => void;
}

const BudgetDashboard = ({
  budgetCategories,
  expenses,
  onAddExpense,
  onManageCategories,
  onViewReports,
}: BudgetDashboardProps) => {
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

  const budgetHealth =
    totalBudget > 0
      ? Math.round((1 - totalCommitted / totalBudget) * 100)
      : 100;
  const recentExpenses = expenses.slice(0, 3);
  const upcomingPayments = expenses
    .filter((exp) => exp.status === "approved")
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Budget Health Overview */}
      <BudgetHealthWidget
        totalBudget={totalBudget}
        totalSpent={totalSpent}
        totalCommitted={totalCommitted}
        healthScore={budgetHealth}
      />

      {/* Quick Actions */}
      <QuickActions
        onAddExpense={onAddExpense}
        onManageCategories={onManageCategories}
        onViewReports={onViewReports}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Category Overview */}
        <CategoryOverview
          budgetCategories={budgetCategories}
          expenses={expenses}
        />

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentExpenses.length > 0 ? (
              <>
                {recentExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <div>
                      <div className="font-medium">{expense.description}</div>
                      <div className="text-sm text-gray-600">
                        {expense.category}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        ${expense.amount.toLocaleString()}
                      </div>
                      <Badge
                        variant={
                          expense.status === "paid" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {expense.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="mt-3 w-full"
                >
                  View All Expenses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            ) : (
              <div className="py-8 text-center text-gray-500">
                <Receipt className="mx-auto mb-3 h-12 w-12 opacity-30" />
                <p>No expenses recorded yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Upcoming Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingPayments.length > 0 ? (
              <div className="space-y-3">
                {upcomingPayments.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <div className="font-medium">{expense.description}</div>
                      <div className="text-sm text-gray-600">
                        Due:{" "}
                        {expense.dueDate
                          ? expense.dueDate.toLocaleDateString()
                          : "Not set"}
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-orange-600">
                      ${expense.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                <CheckCircle className="mx-auto mb-3 h-12 w-12 opacity-30" />
                <p>No pending payments</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Budget Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Budget Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-blue-500"></div>
                  <div>
                    <div className="font-medium text-blue-800">
                      Budget Status
                    </div>
                    <div className="text-sm text-blue-700">
                      {budgetHealth >= 80
                        ? "Your budget is on track! Keep monitoring expenses."
                        : budgetHealth >= 60
                          ? "Budget usage is moderate. Watch for overspending."
                          : "Budget alert! Consider reviewing planned expenses."}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={onViewReports}
              >
                <PieChart className="mr-2 h-4 w-4" />
                View Detailed Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetDashboard;
