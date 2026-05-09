import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  PieChart, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  ChevronDown,
  ChevronRight,
  Eye,
  Plus
} from "lucide-react";

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

interface AnimatedCategoryOverviewProps {
  budgetCategories: BudgetCategory[];
  expenses: Expense[];
  onAddExpense: () => void;
}

const AnimatedCategoryOverview = ({ budgetCategories, expenses, onAddExpense }: AnimatedCategoryOverviewProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const getCategorySpent = (categoryName: string) => {
    return expenses
      .filter(expense => expense.category === categoryName && expense.status === "paid")
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getCategoryCommitted = (categoryName: string) => {
    return expenses
      .filter(expense => expense.category === categoryName && 
        (expense.status === "approved" || expense.status === "paid"))
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getCategoryExpenses = (categoryName: string) => {
    return expenses.filter(expense => expense.category === categoryName);
  };

  const getUtilizationTrend = (utilization: number) => {
    if (utilization > 100) return { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" };
    if (utilization > 80) return { icon: TrendingUp, color: "text-yellow-500", bg: "bg-yellow-50" };
    return { icon: TrendingDown, color: "text-green-500", bg: "bg-green-50" };
  };

  return (
    <Card className="border-2 border-gray-100 hover:border-gray-200 transition-all duration-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-600" />
            Budget Categories
          </div>
          <Button variant="ghost" size="sm" onClick={onAddExpense} className="hover:bg-blue-50">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {budgetCategories.length > 0 ? (
          <div className="space-y-3">
            {budgetCategories.map((category) => {
              const spent = getCategorySpent(category.name);
              const committed = getCategoryCommitted(category.name);
              const utilization = category.planned > 0 ? (committed / category.planned) * 100 : 0;
              const isOverBudget = utilization > 100;
              const isExpanded = expandedCategory === category.id;
              const isHovered = hoveredCategory === category.id;
              const categoryExpenses = getCategoryExpenses(category.name);
              const trend = getUtilizationTrend(utilization);
              const TrendIcon = trend.icon;

              return (
                <div key={category.id} className="space-y-2">
                  <div 
                    className={`
                      p-4 rounded-lg border transition-all duration-300 cursor-pointer
                      ${isHovered ? 'border-gray-300 shadow-md bg-gray-50' : 'border-gray-200 bg-white'}
                      ${isOverBudget ? 'border-red-200 bg-red-50' : ''}
                      hover:shadow-sm
                    `}
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                          )}
                          <div 
                            className="w-4 h-4 rounded-full transition-all duration-300 hover:scale-110"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="font-medium text-gray-800">{category.name}</span>
                        </div>
                        
                        <div className={`p-1 rounded-full ${trend.bg}`}>
                          <TrendIcon className={`w-3 h-3 ${trend.color}`} />
                        </div>
                        
                        {isOverBudget && (
                          <Badge variant="destructive" className="text-xs animate-pulse">
                            Over Budget
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">
                            ${committed.toLocaleString()} / ${category.planned.toLocaleString()}
                          </span>
                          <Badge 
                            variant={isOverBudget ? "destructive" : utilization > 80 ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            {utilization.toFixed(0)}%
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {categoryExpenses.length} expense{categoryExpenses.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Progress 
                        value={Math.min(utilization, 100)} 
                        className={`h-3 transition-all duration-500 ${isHovered ? 'scale-[1.02]' : ''}`}
                      />
                      
                      {utilization > 100 && (
                        <div className="text-xs text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Over by ${(committed - category.planned).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="ml-6 pl-4 border-l-2 border-gray-200 space-y-3 animate-fade-in">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-xs text-blue-600 font-medium">Spent</div>
                          <div className="text-lg font-bold text-blue-800">${spent.toLocaleString()}</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-xs text-green-600 font-medium">Remaining</div>
                          <div className="text-lg font-bold text-green-800">
                            ${Math.max(0, category.planned - committed).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      {/* Subcategories */}
                      {category.subcategories && category.subcategories.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-gray-600">Subcategories</div>
                          {category.subcategories.map((sub, index) => {
                            const subUtilization = sub.planned > 0 ? (sub.spent / sub.planned) * 100 : 0;
                            return (
                              <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                                <span className="text-sm">{sub.name}</span>
                                <div className="flex items-center gap-2">
                                  <Progress value={subUtilization} className="w-20 h-2" />
                                  <span className="text-xs font-medium">{subUtilization.toFixed(0)}%</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <PieChart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No budget categories yet</h3>
            <p className="text-gray-500 mb-4">Create your first budget category to get started</p>
            <Button onClick={onAddExpense} className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700">
              <Plus className="w-4 h-4 mr-2" />
              Set Up Budget
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnimatedCategoryOverview;
