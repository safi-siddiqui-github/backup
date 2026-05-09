"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  BarChart3,
  Calculator,
  DollarSign,
  Plus,
  Settings,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface Props {
  onAddExpense: () => void;
  onManageCategories: () => void;
  onViewReports: () => void;
  onSetBudget?: () => void;
  totalBudget: number;
  totalSpent: number;
  upcomingPayments: number;
  hasBudget: boolean;
}

const SmartQuickActions = ({
  onAddExpense,
  onManageCategories,
  onViewReports,
  onSetBudget,
  totalBudget,
  totalSpent,
  upcomingPayments,
  hasBudget = false,
}: Props) => {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const utilizationRate =
    totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const actions = hasBudget
    ? [
        {
          id: "add-expense",
          title: "Add Expense",
          description: "Record a new expense",
          icon: Plus,
          onClick: onAddExpense,
          primary: true,
          gradient: "from-blue-500 to-cyan-600",
          hoverGradient: "from-blue-600 to-cyan-700",
          badge: null,
          shortcut: "Ctrl+N",
        },
        {
          id: "manage-categories",
          title: "Manage Budget",
          description: "Set up categories & limits",
          icon: Settings,
          onClick: onManageCategories,
          primary: false,
          gradient: "from-purple-500 to-indigo-600",
          hoverGradient: "from-purple-600 to-indigo-700",
          badge: utilizationRate > 80 ? "Review Needed" : null,
          shortcut: "Ctrl+B",
        },
        {
          id: "view-reports",
          title: "Analytics",
          description: "Detailed insights & reports",
          icon: BarChart3,
          onClick: onViewReports,
          primary: false,
          gradient: "from-emerald-500 to-teal-600",
          hoverGradient: "from-emerald-600 to-teal-700",
          badge: "New Data",
          shortcut: "Ctrl+R",
        },
      ]
    : [
        {
          id: "set-budget",
          title: "Set Budget",
          description: "Start with your event budget",
          icon: Calculator,
          onClick: onSetBudget || (() => {}),
          primary: true,
          gradient: "from-green-500 to-emerald-600",
          hoverGradient: "from-green-600 to-emerald-700",
          badge: "Get Started",
          shortcut: "Ctrl+B",
        },
        {
          id: "add-expense",
          title: "Add Expense",
          description: "Record a new expense",
          icon: Plus,
          onClick: onAddExpense,
          primary: false,
          gradient: "from-blue-500 to-cyan-600",
          hoverGradient: "from-blue-600 to-cyan-700",
          badge: null,
          shortcut: "Ctrl+N",
        },
        {
          id: "view-reports",
          title: "Analytics",
          description: "Detailed insights & reports",
          icon: BarChart3,
          onClick: onViewReports,
          primary: false,
          gradient: "from-emerald-500 to-teal-600",
          hoverGradient: "from-emerald-600 to-teal-700",
          badge: "Preview",
          shortcut: "Ctrl+R",
        },
      ];

  const smartSuggestions = [
    {
      title: "Budget Alert",
      description: hasBudget
        ? `${utilizationRate.toFixed(0)}% of budget used`
        : "Set your budget to get started",
      icon: hasBudget
        ? utilizationRate > 80
          ? AlertTriangle
          : TrendingUp
        : Calculator,
      color: hasBudget
        ? utilizationRate > 80
          ? "text-red-600"
          : "text-green-600"
        : "text-blue-600",
      bgColor: hasBudget
        ? utilizationRate > 80
          ? "bg-red-50"
          : "bg-green-50"
        : "bg-blue-50",
      visible: true,
    },
    {
      title: "Upcoming Payments",
      description: `${upcomingPayments} payments pending`,
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      visible: upcomingPayments > 0,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Smart Suggestions */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {smartSuggestions
          .filter((s) => s.visible)
          .map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-2 rounded-full px-3 py-2 ${suggestion.bgColor} animate-fade-in border whitespace-nowrap`}
              >
                <Icon className={`h-4 w-4 ${suggestion.color}`} />
                <span className="text-sm font-medium">
                  {suggestion.description}
                </span>
              </div>
            );
          })}
      </div>

      {/* Main Actions */}
      <Card className="border-2 border-gray-100 transition-all duration-200 hover:border-gray-200">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold text-gray-800">Quick Actions</span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {actions.map((action) => {
              const Icon = action.icon;
              const isHovered = hoveredAction === action.id;

              return (
                <div
                  key={action.id}
                  className="group relative"
                >
                  <Button
                    variant="outline"
                    onClick={action.onClick}
                    onMouseEnter={() => setHoveredAction(action.id)}
                    onMouseLeave={() => setHoveredAction(null)}
                    className={`flex h-auto w-full transform flex-col items-center gap-3 border-2 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg ${action.primary ? "border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50" : "border-gray-200 hover:border-gray-300"} ${isHovered ? "-translate-y-1 shadow-xl" : ""} `}
                  >
                    <div
                      className={`rounded-full bg-gradient-to-r p-3 transition-all duration-300 ${isHovered ? action.hoverGradient : action.gradient} ${isHovered ? "scale-110 shadow-lg" : "shadow-md"} `}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <div className="space-y-1 text-center">
                      <div className="font-semibold text-gray-800">
                        {action.title}
                      </div>
                      <div className="text-xs leading-relaxed text-gray-600">
                        {action.description}
                      </div>
                      {action.badge && (
                        <Badge
                          variant="secondary"
                          className="mt-2 text-xs"
                        >
                          {action.badge}
                        </Badge>
                      )}
                    </div>

                    {/* Keyboard Shortcut Hint */}
                    <div
                      className={`absolute top-2 right-2 rounded bg-gray-800 px-2 py-1 text-xs text-white transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"} `}
                    >
                      {action.shortcut}
                    </div>
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartQuickActions;
