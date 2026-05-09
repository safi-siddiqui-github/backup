import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Receipt,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Sparkles,
  Calendar,
  DollarSign
} from "lucide-react";
import InteractiveBudgetHealth from "./InteractiveBudgetHealth";
import SmartQuickActions from "./SmartQuickActions";
import AnimatedCategoryOverview from "./AnimatedCategoryOverview";

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

interface EnhancedBudgetDashboardProps {
  budgetCategories: BudgetCategory[];
  expenses: Expense[];
  onAddExpense: () => void;
  onManageCategories: () => void;
  onViewReports: () => void;
}

const EnhancedBudgetDashboard = ({ 
  budgetCategories, 
  expenses, 
  onAddExpense, 
  onManageCategories,
  onViewReports 
}: EnhancedBudgetDashboardProps) => {
  const [activeTab, setActiveTab] = useState<"recent" | "upcoming">("recent");

  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.planned, 0);
  const totalSpent = expenses.reduce((sum, exp) => sum + (exp.status === "paid" ? exp.amount : 0), 0);
  const totalCommitted = expenses.reduce((sum, exp) => sum + 
    (exp.status === "approved" || exp.status === "paid" ? exp.amount : 0), 0);
  
  const budgetHealth = totalBudget > 0 ? Math.round((1 - (totalCommitted / totalBudget)) * 100) : 100;
  const recentExpenses = expenses.slice(0, 5);
  const upcomingPayments = expenses.filter(exp => exp.status === "approved").slice(0, 5);

  const getStatusIcon = (status: Expense["status"]) => {
    switch (status) {
      case "paid": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "approved": return <Clock className="w-4 h-4 text-blue-600" />;
      case "overdue": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Expense["status"]) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800 border-green-200";
      case "approved": return "bg-blue-100 text-blue-800 border-blue-200";
      case "overdue": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Budget Health */}
      <InteractiveBudgetHealth 
        totalBudget={totalBudget}
        totalSpent={totalSpent}
        totalCommitted={totalCommitted}
        healthScore={budgetHealth}
      />

      {/* Smart Quick Actions */}
      <SmartQuickActions 
        onAddExpense={onAddExpense}
        onManageCategories={onManageCategories}
        onViewReports={onViewReports}
        totalBudget={totalBudget}
        totalSpent={totalSpent}
        upcomingPayments={upcomingPayments.length}
        hasBudget={totalBudget > 0}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Category Overview */}
        <AnimatedCategoryOverview 
          budgetCategories={budgetCategories}
          expenses={expenses}
          onAddExpense={onAddExpense}
        />

        {/* Enhanced Activity Feed */}
        <Card className="border-2 border-gray-100 hover:border-gray-200 transition-all duration-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-green-600" />
                Activity Feed
              </div>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button 
                  variant={activeTab === "recent" ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => setActiveTab("recent")}
                  className="text-xs"
                >
                  Recent
                </Button>
                <Button 
                  variant={activeTab === "upcoming" ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => setActiveTab("upcoming")}
                  className="text-xs"
                >
                  Upcoming
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-3">
            {activeTab === "recent" ? (
              recentExpenses.length > 0 ? (
                <>
                  {recentExpenses.map((expense, index) => (
                    <div key={expense.id} 
                         className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-gray-100 hover:to-gray-150 transition-all duration-200 cursor-pointer hover:shadow-sm"
                         style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex items-center gap-3">
                        {getStatusIcon(expense.status)}
                        <div>
                          <div className="font-medium text-gray-800">{expense.description}</div>
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <span>{expense.category}</span>
                            <Calendar className="w-3 h-3" />
                            <span>{expense.date.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg">${expense.amount.toLocaleString()}</div>
                        <Badge className={`text-xs border ${getStatusColor(expense.status)}`}>
                          {expense.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4 hover:bg-gray-50">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    View All Expenses
                  </Button>
                </>
              ) : (
                <div className="text-center py-12">
                  <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No recent activity</h3>
                  <p className="text-gray-500 mb-4">Start tracking your expenses</p>
                  <Button onClick={onAddExpense} className="bg-gradient-to-r from-green-500 to-emerald-600">
                    <Receipt className="w-4 h-4 mr-2" />
                    Add First Expense
                  </Button>
                </div>
              )
            ) : (
              upcomingPayments.length > 0 ? (
                <>
                  {upcomingPayments.map((expense, index) => (
                    <div key={expense.id}
                         className="flex items-center justify-between p-3 border border-orange-200 bg-orange-50 rounded-lg hover:bg-orange-100 transition-all duration-200 cursor-pointer"
                         style={{ animationDelay: `${index * 100}ms` }}>
                      <div>
                        <div className="font-medium text-gray-800">{expense.description}</div>
                        <div className="text-sm text-orange-700 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Due: {expense.dueDate ? expense.dueDate.toLocaleDateString() : "Not set"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-orange-600">
                          ${expense.amount.toLocaleString()}
                        </div>
                        <Badge className="bg-orange-200 text-orange-800 text-xs">
                          Pending
                        </Badge>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">All caught up!</h3>
                  <p className="text-gray-500">No pending payments</p>
                </div>
              )
            )}
          </CardContent>
        </Card>

        {/* Smart Insights Panel */}
        <Card className="lg:col-span-2 border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Smart Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/80 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Budget Health</span>
                </div>
                <p className="text-sm text-gray-700">
                  {budgetHealth >= 80 ? "Excellent! Your spending is well within budget limits." :
                   budgetHealth >= 60 ? "Good progress. Monitor upcoming expenses closely." :
                   "Consider reviewing your budget allocation and upcoming payments."}
                </p>
              </div>
              
              <div className="p-4 bg-white/80 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Spending Pattern</span>
                </div>
                <p className="text-sm text-gray-700">
                  You've spent ${totalSpent.toLocaleString()} this period. 
                  {totalSpent > totalBudget * 0.5 ? " Consider slowing down spending." : " You're on track!"}
                </p>
              </div>
              
              <div className="p-4 bg-white/80 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-800">Upcoming</span>
                </div>
                <p className="text-sm text-gray-700">
                  {upcomingPayments.length > 0 ? 
                    `${upcomingPayments.length} payments pending totaling $${upcomingPayments.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString()}.` :
                    "No pending payments. Great job staying current!"
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedBudgetDashboard;
