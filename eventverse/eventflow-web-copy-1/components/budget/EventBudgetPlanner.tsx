"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Lightbulb, Plus, Target, Users } from "lucide-react";
import { useEffect, useState } from "react";
import type {
  BudgetTemplate,
  EventBudgetCategory,
  SmartSuggestion,
} from "../../types/budget";

interface Props {
  eventType: string;
  eventSize: number;
  totalBudget: number;
  categories: EventBudgetCategory[];
  onUpdateCategories: (categories: EventBudgetCategory[]) => void;
  onTotalBudgetChange: (amount: number) => void;
}

const BUDGET_TEMPLATES: BudgetTemplate[] = [
  {
    eventType: "Wedding",
    categories: [
      {
        name: "Venue",
        percentage: 40,
        priority: "high",
        subcategories: ["Reception Hall", "Ceremony Space", "Setup"],
      },
      {
        name: "Catering",
        percentage: 25,
        priority: "high",
        subcategories: ["Food", "Beverages", "Service"],
      },
      {
        name: "Photography",
        percentage: 10,
        priority: "medium",
        subcategories: ["Photographer", "Videographer", "Editing"],
      },
      {
        name: "Music & Entertainment",
        percentage: 8,
        priority: "medium",
        subcategories: ["DJ", "Band", "Sound System"],
      },
      {
        name: "Flowers & Decor",
        percentage: 8,
        priority: "medium",
        subcategories: ["Bouquet", "Centerpieces", "Ceremony Decor"],
      },
      {
        name: "Transportation",
        percentage: 3,
        priority: "low",
        subcategories: ["Wedding Car", "Guest Transport"],
      },
      {
        name: "Miscellaneous",
        percentage: 6,
        priority: "low",
        subcategories: ["Tips", "Emergency Fund"],
      },
    ],
  },
  {
    eventType: "Corporate",
    categories: [
      {
        name: "Venue",
        percentage: 35,
        priority: "high",
        subcategories: ["Conference Room", "AV Equipment", "Catering Space"],
      },
      {
        name: "Catering",
        percentage: 30,
        priority: "high",
        subcategories: ["Breakfast", "Lunch", "Coffee Breaks"],
      },
      {
        name: "Technology",
        percentage: 15,
        priority: "high",
        subcategories: ["AV Equipment", "Live Streaming", "Tech Support"],
      },
      {
        name: "Speakers",
        percentage: 10,
        priority: "medium",
        subcategories: ["Keynote Speaker", "Workshop Leaders"],
      },
      {
        name: "Materials",
        percentage: 5,
        priority: "medium",
        subcategories: ["Brochures", "Swag", "Name Tags"],
      },
      {
        name: "Marketing",
        percentage: 5,
        priority: "low",
        subcategories: ["Promotion", "Signage", "Photography"],
      },
    ],
  },
];

const EventBudgetPlanner = ({
  eventType,
  eventSize,
  totalBudget,
  categories,
  onUpdateCategories,
  onTotalBudgetChange,
}: Props) => {
  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);
  const [showTemplate, setShowTemplate] = useState(false);

  useEffect(() => {
    generateSmartSuggestions();
  }, [eventType, eventSize, totalBudget]);

  const generateSmartSuggestions = () => {
    const newSuggestions: SmartSuggestion[] = [];

    // Budget suggestions based on event type and size
    if (totalBudget > 0) {
      const perPersonBudget = totalBudget / eventSize;
      if (perPersonBudget < 50 && eventType === "Wedding") {
        newSuggestions.push({
          type: "budget",
          title: "Budget may be too low",
          description: `$${perPersonBudget.toFixed(0)} per person seems low for a wedding. Consider $150-300 per person.`,
          confidence: 0.8,
        });
      }
    }

    // Category suggestions based on event type
    const template = BUDGET_TEMPLATES.find((t) => t.eventType === eventType);
    if (template && categories.length === 0) {
      newSuggestions.push({
        type: "category",
        title: "Use budget template",
        description: `Apply recommended ${eventType.toLowerCase()} budget breakdown to get started quickly.`,
        confidence: 0.9,
        action: () => applyTemplate(template),
      });
    }

    setSuggestions(newSuggestions);
  };

  const applyTemplate = (template: BudgetTemplate) => {
    const newCategories: EventBudgetCategory[] = template.categories.map(
      (cat, index) => ({
        id: `cat-${index}`,
        name: cat.name,
        plannedAmount: Math.round((totalBudget * cat.percentage) / 100),
        actualSpent: 0,
        committed: 0,
        color: getColorForCategory(cat.name),
        priority: cat.priority,
        eventType,
        subcategories: cat.subcategories.map((sub, subIndex) => ({
          id: `sub-${index}-${subIndex}`,
          name: sub,
          plannedAmount: 0,
          actualSpent: 0,
        })),
        vendors: [],
        paymentSchedule: [],
      }),
    );

    onUpdateCategories(newCategories);
    setShowTemplate(false);
  };

  const getColorForCategory = (categoryName: string): string => {
    const colors = {
      Venue: "#8B5CF6",
      Catering: "#10B981",
      Photography: "#F59E0B",
      "Music & Entertainment": "#EF4444",
      "Flowers & Decor": "#EC4899",
      Transportation: "#06B6D4",
      Technology: "#3B82F6",
      Speakers: "#84CC16",
      Materials: "#F97316",
      Marketing: "#6366F1",
    };
    return colors[categoryName as keyof typeof colors] || "#8B5CF6";
  };

  const addCustomCategory = () => {
    const newCategory: EventBudgetCategory = {
      id: `cat-${Date.now()}`,
      name: "New Category",
      plannedAmount: 0,
      actualSpent: 0,
      committed: 0,
      color: "#8B5CF6",
      priority: "medium",
      eventType,
      subcategories: [],
      vendors: [],
      paymentSchedule: [],
    };

    onUpdateCategories([...categories, newCategory]);
  };

  const updateCategoryAmount = (categoryId: string, amount: number) => {
    const updated = categories.map((cat) =>
      cat.id === categoryId ? { ...cat, plannedAmount: amount } : cat,
    );
    onUpdateCategories(updated);
  };

  const totalPlanned = categories.reduce(
    (sum, cat) => sum + cat.plannedAmount,
    0,
  );
  const totalCommitted = categories.reduce(
    (sum, cat) => sum + cat.committed,
    0,
  );
  const budgetUtilization =
    totalBudget > 0 ? (totalPlanned / totalBudget) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Event Budget Planning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="total-budget">Total Budget</Label>
              <div className="relative">
                <DollarSign className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                <Input
                  id="total-budget"
                  type="number"
                  value={totalBudget}
                  onChange={(e) => onTotalBudgetChange(Number(e.target.value))}
                  className="pl-10"
                  placeholder="Enter total budget"
                />
              </div>
            </div>
            <div>
              <Label>Per Person Budget</Label>
              <div className="text-2xl font-bold text-blue-600">
                ${eventSize > 0 ? (totalBudget / eventSize).toFixed(0) : "0"}
              </div>
              <div className="text-sm text-gray-600">
                <Users className="mr-1 inline h-3 w-3" />
                {eventSize} guests
              </div>
            </div>
            <div>
              <Label>Budget Allocation</Label>
              <div className="text-2xl font-bold text-green-600">
                {budgetUtilization.toFixed(1)}%
              </div>
              <Progress
                value={budgetUtilization}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Suggestions */}
      {suggestions.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <Lightbulb className="h-5 w-5" />
              Smart Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-white p-3"
              >
                <div>
                  <div className="font-medium">{suggestion.title}</div>
                  <div className="text-sm text-gray-600">
                    {suggestion.description}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {Math.round(suggestion.confidence * 100)}% confident
                  </Badge>
                  {suggestion.action && (
                    <Button
                      size="sm"
                      onClick={suggestion.action}
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Budget Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Budget Categories</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowTemplate(true)}
              >
                Use Template
              </Button>
              <Button onClick={addCustomCategory}>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map((category) => {
            const utilization =
              category.plannedAmount > 0
                ? (category.committed / category.plannedAmount) * 100
                : 0;

            return (
              <div
                key={category.id}
                className="rounded-lg border p-4 transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium">{category.name}</span>
                    <Badge
                      variant={
                        category.priority === "high"
                          ? "default"
                          : category.priority === "medium"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {category.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Planned</div>
                      <Input
                        type="number"
                        value={category.plannedAmount}
                        onChange={(e) =>
                          updateCategoryAmount(
                            category.id,
                            Number(e.target.value),
                          )
                        }
                        className="w-32 text-right"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      ${category.committed.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">Committed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      ${category.actualSpent.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">Spent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-600">
                      $
                      {Math.max(
                        0,
                        category.plannedAmount - category.committed,
                      ).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">Remaining</div>
                  </div>
                </div>

                <Progress
                  value={utilization}
                  className="h-2"
                />
                <div className="mt-1 flex justify-between text-xs text-gray-600">
                  <span>{utilization.toFixed(1)}% utilized</span>
                  <span>{category.vendors.length} vendors assigned</span>
                </div>
              </div>
            );
          })}

          {categories.length === 0 && (
            <div className="py-12 text-center">
              <Target className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2 text-lg font-medium text-gray-600">
                No budget categories yet
              </h3>
              <p className="mb-4 text-gray-500">
                Add categories to start planning your event budget
              </p>
              <Button onClick={() => setShowTemplate(true)}>
                <Lightbulb className="mr-2 h-4 w-4" />
                Use Budget Template
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventBudgetPlanner;
