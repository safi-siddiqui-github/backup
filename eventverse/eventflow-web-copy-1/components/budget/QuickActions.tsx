"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Plus, Settings } from "lucide-react";

interface Props {
  onAddExpense: () => void;
  onManageCategories: () => void;
  onViewReports: () => void;
}

const QuickActions = ({
  onAddExpense,
  onManageCategories,
  onViewReports,
}: Props) => {
  const actions = [
    {
      title: "Add Expense",
      description: "Record a new expense",
      icon: Plus,
      onClick: onAddExpense,
      primary: true,
    },
    {
      title: "Manage Categories",
      description: "Set up budget categories",
      icon: Settings,
      onClick: onManageCategories,
      primary: false,
    },
    {
      title: "View Reports",
      description: "Detailed analytics",
      icon: BarChart3,
      onClick: onViewReports,
      primary: false,
    },
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.title}
                variant={action.primary ? "default" : "outline"}
                onClick={action.onClick}
                className="flex h-auto flex-col items-center gap-2 p-4"
              >
                <Icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs opacity-75">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
