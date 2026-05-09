import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Plus, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  ArrowRight,
  PieChart,
  Receipt,
  Target
} from "lucide-react";
import BudgetHealthWidget from "./BudgetHealthWidget";
import QuickActions from "./QuickActions";
import CategoryOverview from "./CategoryOverview";

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
  onViewReports 
}: BudgetDashboardProps) => {
  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.planned, 0);
  const totalSpent = expenses.reduce((sum, exp) => sum + (exp.status === "paid" ? exp.amount : 0), 0);
  const totalCommitted = expenses.reduce((sum, exp) => sum + 
    (exp.status === "approved" || exp.status === "paid" ? exp.amount : 0), 0);
  
  const budgetHealth = totalBudget > 0 ? Math.round((1 - (totalCommitted / totalBudget)) * 100) : 100;
  const recentExpenses = expenses.slice(0, 3);
  const upcomingPayments = expenses.filter(exp => exp.status === "approved").slice(0, 3);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Overview */}
        <CategoryOverview 
          budgetCategories={budgetCategories}
          expenses={expenses}
        />

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentExpenses.length > 0 ? (
              <>
                {recentExpenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{expense.description}</div>
                      <div className="text-sm text-gray-600">{expense.category}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${expense.amount.toLocaleString()}</div>
                      <Badge variant={expense.status === "paid" ? "default" : "secondary"} className="text-xs">
                        {expense.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-3">
                  View All Expenses
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Receipt className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No expenses recorded yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Upcoming Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingPayments.length > 0 ? (
              <div className="space-y-3">
                {upcomingPayments.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{expense.description}</div>
                      <div className="text-sm text-gray-600">
                        Due: {expense.dueDate ? expense.dueDate.toLocaleDateString() : "Not set"}
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-orange-600">
                      ${expense.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No pending payments</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Budget Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Budget Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-blue-800">Budget Status</div>
                    <div className="text-sm text-blue-700">
                      {budgetHealth >= 80 ? "Your budget is on track! Keep monitoring expenses." :
                       budgetHealth >= 60 ? "Budget usage is moderate. Watch for overspending." :
                       "Budget alert! Consider reviewing planned expenses."}
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" onClick={onViewReports}>
                <PieChart className="w-4 h-4 mr-2" />
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
