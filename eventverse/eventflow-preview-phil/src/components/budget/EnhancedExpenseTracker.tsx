
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Receipt, 
  Plus, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  CreditCard
} from "lucide-react";
import type { EventBudgetCategory, PaymentMilestone } from "../../types/budget";

interface ExpenseItem {
  id: string;
  categoryId: string;
  description: string;
  plannedAmount: number;
  actualAmount: number;
  dueDate: Date;
  paidDate?: Date;
  status: 'planned' | 'approved' | 'paid' | 'overdue';
  vendorId?: string;
  receiptUrl?: string;
  paymentMethod?: string;
  notes?: string;
}

interface Props {
  categories: EventBudgetCategory[];
  expenses: ExpenseItem[];
  onAddExpense: (expense: ExpenseItem) => void;
  onUpdateExpense: (id: string, updates: Partial<ExpenseItem>) => void;
}

const MOCK_EXPENSES: ExpenseItem[] = [
  {
    id: "exp-1",
    categoryId: "cat-1",
    description: "Venue booking deposit",
    plannedAmount: 2000,
    actualAmount: 2000,
    dueDate: new Date("2024-02-01"),
    paidDate: new Date("2024-01-15"),
    status: "paid",
    paymentMethod: "Bank Transfer"
  },
  {
    id: "exp-2",
    categoryId: "cat-2",
    description: "Catering final payment",
    plannedAmount: 5000,
    actualAmount: 0,
    dueDate: new Date("2024-03-01"),
    status: "approved"
  }
];

const EnhancedExpenseTracker = ({ 
  categories, 
  expenses = MOCK_EXPENSES, 
  onAddExpense, 
  onUpdateExpense 
}: Props) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const getStatusIcon = (status: ExpenseItem["status"]) => {
    switch (status) {
      case "paid": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "approved": return <Clock className="w-4 h-4 text-blue-600" />;
      case "overdue": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Calendar className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: ExpenseItem["status"]) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800 border-green-200";
      case "approved": return "bg-blue-100 text-blue-800 border-blue-200";
      case "overdue": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || "Unknown Category";
  };

  const calculateVariance = (planned: number, actual: number) => {
    const variance = actual - planned;
    const percentage = planned > 0 ? (variance / planned) * 100 : 0;
    return { amount: variance, percentage };
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesStatus = filterStatus === "all" || expense.status === filterStatus;
    const matchesCategory = filterCategory === "all" || expense.categoryId === filterCategory;
    return matchesStatus && matchesCategory;
  });

  const totalPlanned = expenses.reduce((sum, exp) => sum + exp.plannedAmount, 0);
  const totalActual = expenses.reduce((sum, exp) => sum + exp.actualAmount, 0);
  const totalVariance = calculateVariance(totalPlanned, totalActual);

  const upcomingPayments = expenses.filter(exp => 
    exp.status === "approved" && 
    exp.dueDate > new Date()
  ).sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  const overduePayments = expenses.filter(exp => 
    exp.status !== "paid" && 
    exp.dueDate < new Date()
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-800">
              ${totalPlanned.toLocaleString()}
            </div>
            <div className="text-sm text-blue-600">Total Planned</div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-800">
              ${totalActual.toLocaleString()}
            </div>
            <div className="text-sm text-green-600">Total Spent</div>
          </CardContent>
        </Card>

        <Card className={`border-${totalVariance.amount >= 0 ? 'red' : 'green'}-200 bg-${totalVariance.amount >= 0 ? 'red' : 'green'}-50`}>
          <CardContent className="p-4 text-center">
            {totalVariance.amount >= 0 ? (
              <TrendingUp className="w-8 h-8 text-red-600 mx-auto mb-2" />
            ) : (
              <TrendingDown className="w-8 h-8 text-green-600 mx-auto mb-2" />
            )}
            <div className={`text-2xl font-bold text-${totalVariance.amount >= 0 ? 'red' : 'green'}-800`}>
              {totalVariance.amount >= 0 ? '+' : ''}${totalVariance.amount.toLocaleString()}
            </div>
            <div className={`text-sm text-${totalVariance.amount >= 0 ? 'red' : 'green'}-600`}>
              Variance ({totalVariance.percentage.toFixed(1)}%)
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-800">
              {upcomingPayments.length}
            </div>
            <div className="text-sm text-orange-600">Upcoming Payments</div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {overduePayments.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">
                {overduePayments.length} overdue payment{overduePayments.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="text-sm text-red-600 mt-1">
              Total overdue: ${overduePayments.reduce((sum, exp) => sum + exp.plannedAmount, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">All Expenses</TabsTrigger>
          <TabsTrigger value="payments">Payment Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories.map((category) => {
                const categoryExpenses = expenses.filter(exp => exp.categoryId === category.id);
                const categoryPlanned = categoryExpenses.reduce((sum, exp) => sum + exp.plannedAmount, 0);
                const categoryActual = categoryExpenses.reduce((sum, exp) => sum + exp.actualAmount, 0);
                const utilization = category.plannedAmount > 0 ? (categoryActual / category.plannedAmount) * 100 : 0;
                
                return (
                  <div key={category.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">
                          ${categoryActual.toLocaleString()} / ${category.plannedAmount.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">
                          {categoryExpenses.length} expense{categoryExpenses.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    <Progress value={utilization} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button className="ml-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Expense
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Expense List */}
          <div className="space-y-3">
            {filteredExpenses.map((expense) => {
              const variance = calculateVariance(expense.plannedAmount, expense.actualAmount);
              
              return (
                <Card key={expense.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(expense.status)}
                          <h4 className="font-medium">{expense.description}</h4>
                          <Badge variant="outline">
                            {getCategoryName(expense.categoryId)}
                          </Badge>
                          <Badge className={getStatusColor(expense.status)}>
                            {expense.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Planned: </span>
                            <span className="font-medium">${expense.plannedAmount.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Actual: </span>
                            <span className="font-medium">${expense.actualAmount.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Variance: </span>
                            <span className={`font-medium ${variance.amount >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {variance.amount >= 0 ? '+' : ''}${variance.amount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                          <span>Due: {expense.dueDate.toLocaleDateString()}</span>
                          {expense.paidDate && (
                            <span>Paid: {expense.paidDate.toLocaleDateString()}</span>
                          )}
                          {expense.paymentMethod && (
                            <span>
                              <CreditCard className="w-3 h-3 inline mr-1" />
                              {expense.paymentMethod}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{payment.description}</div>
                    <div className="text-sm text-gray-600">
                      Due: {payment.dueDate.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      ${payment.plannedAmount.toLocaleString()}
                    </div>
                    <Button size="sm" variant="outline">
                      Mark as Paid
                    </Button>
                  </div>
                </div>
              ))}
              
              {upcomingPayments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No upcoming payments
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedExpenseTracker;
