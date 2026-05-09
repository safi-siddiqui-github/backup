"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  Plus,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

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

interface BudgetPlannerProps {
  budgetCategories: BudgetCategory[];
  expenses: Expense[];
  onAddCategory: (category: Omit<BudgetCategory, "id">) => void;
  onUpdateCategory: (id: string, updates: Partial<BudgetCategory>) => void;
  onDeleteCategory: (id: string) => void;
}

const BudgetPlanner = ({
  budgetCategories,
  expenses,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}: BudgetPlannerProps) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryBudget, setNewCategoryBudget] = useState("");

  const getCategorySpent = (categoryName: string) => {
    return expenses
      .filter(
        (expense) =>
          expense.category === categoryName && expense.status === "paid",
      )
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getCategoryProgress = (category: BudgetCategory) => {
    const spent = getCategorySpent(category.name);
    return category.planned > 0 ? (spent / category.planned) * 100 : 0;
  };

  const getProgressIcon = (progress: number) => {
    if (progress > 100)
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    if (progress > 80)
      return <TrendingDown className="h-4 w-4 text-yellow-500" />;
    return <TrendingUp className="h-4 w-4 text-green-500" />;
  };

  const handleAddCategory = () => {
    if (newCategoryName && newCategoryBudget) {
      const colors = [
        "#3b82f6",
        "#ef4444",
        "#10b981",
        "#f59e0b",
        "#8b5cf6",
        "#06b6d4",
      ];
      onAddCategory({
        name: newCategoryName,
        planned: parseFloat(newCategoryBudget),
        color: colors[budgetCategories.length % colors.length],
      });
      setNewCategoryName("");
      setNewCategoryBudget("");
    }
  };

  const totalBudget = budgetCategories.reduce(
    (sum, cat) => sum + cat.planned,
    0,
  );
  const totalSpent = budgetCategories.reduce(
    (sum, cat) => sum + getCategorySpent(cat.name),
    0,
  );
  const overallProgress =
    totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Budget Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold">
                ${totalBudget.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Budget</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                ${totalSpent.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ${(totalBudget - totalSpent).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
          </div>
          <Progress
            value={overallProgress}
            className="h-3"
          />
          <div className="mt-2 text-center">
            <Badge variant={overallProgress > 100 ? "destructive" : "outline"}>
              {overallProgress.toFixed(1)}% Used
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Add New Category */}
      <Card>
        <CardHeader>
          <CardTitle>Add Budget Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="categoryName">Category Name</Label>
              <Input
                id="categoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g., Catering"
              />
            </div>
            <div>
              <Label htmlFor="categoryBudget">Budget Amount</Label>
              <Input
                id="categoryBudget"
                type="number"
                value={newCategoryBudget}
                onChange={(e) => setNewCategoryBudget(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleAddCategory}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Categories */}
      <div className="space-y-4">
        {budgetCategories.map((category) => {
          const spent = getCategorySpent(category.name);
          const progress = getCategoryProgress(category);

          return (
            <Card key={category.id}>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    {getProgressIcon(progress)}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      ${spent.toLocaleString()} / $
                      {category.planned.toLocaleString()}
                    </div>
                    <Badge variant={progress > 100 ? "destructive" : "outline"}>
                      {progress.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
                <Progress
                  value={Math.min(progress, 100)}
                  className="h-3"
                />
                {progress > 100 && (
                  <div className="mt-2 text-sm text-red-600">
                    Over budget by $
                    {(spent - category.planned).toLocaleString()}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {budgetCategories.length === 0 && (
        <div className="py-12 text-center">
          <Target className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-600">
            No budget categories yet
          </h3>
          <p className="text-gray-500">
            Start by adding your first budget category above
          </p>
        </div>
      )}
    </div>
  );
};

export default BudgetPlanner;
