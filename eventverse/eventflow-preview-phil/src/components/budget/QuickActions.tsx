
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Settings, BarChart3, Calculator } from "lucide-react";

interface Props {
  onAddExpense: () => void;
  onManageCategories: () => void;
  onViewReports: () => void;
}

const QuickActions = ({ onAddExpense, onManageCategories, onViewReports }: Props) => {
  const actions = [
    {
      title: "Add Expense",
      description: "Record a new expense",
      icon: Plus,
      onClick: onAddExpense,
      primary: true
    },
    {
      title: "Manage Categories",
      description: "Set up budget categories",
      icon: Settings,
      onClick: onManageCategories,
      primary: false
    },
    {
      title: "View Reports",
      description: "Detailed analytics",
      icon: BarChart3,
      onClick: onViewReports,
      primary: false
    }
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.title}
                variant={action.primary ? "default" : "outline"}
                onClick={action.onClick}
                className="h-auto p-4 flex flex-col items-center gap-2"
              >
                <Icon className="w-6 h-6" />
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
