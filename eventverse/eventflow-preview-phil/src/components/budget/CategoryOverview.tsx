import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PieChart, AlertTriangle } from "lucide-react";

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

interface Props {
  budgetCategories: BudgetCategory[];
  expenses: Expense[];
}

const CategoryOverview = ({ budgetCategories, expenses }: Props) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="w-5 h-5" />
          Budget Categories
        </CardTitle>
      </CardHeader>
      <CardContent>
        {budgetCategories.length > 0 ? (
          <div className="space-y-4">
            {budgetCategories.slice(0, 4).map((category) => {
              const spent = getCategorySpent(category.name);
              const committed = getCategoryCommitted(category.name);
              const utilization = category.planned > 0 ? (committed / category.planned) * 100 : 0;
              const isOverBudget = utilization > 100;

              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-medium">{category.name}</span>
                      {isOverBudget && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">
                        ${committed.toLocaleString()} / ${category.planned.toLocaleString()}
                      </div>
                      <Badge 
                        variant={isOverBudget ? "destructive" : utilization > 80 ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {utilization.toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(utilization, 100)} 
                    className="h-2"
                  />
                </div>
              );
            })}
            
            {budgetCategories.length > 4 && (
              <div className="text-center pt-2">
                <span className="text-sm text-gray-500">
                  +{budgetCategories.length - 4} more categories
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <PieChart className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No budget categories set up yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryOverview;
