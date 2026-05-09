"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  Brain,
  CheckCircle,
  Edit,
  Info,
  Lightbulb,
  Lock,
  Plus,
  Sparkles,
  Target,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import BudgetCommitDialog from "./BudgetCommitDialog";
import BudgetItemCostDisplay from "./BudgetItemCostDisplay";
import BudgetSetupWizard from "./BudgetSetupWizard";
import type { BudgetExpenseItem } from "./ComprehensiveBudgetModule";
import DeleteExpenseDialog from "./DeleteExpenseDialog";
import EditExpenseDialog from "./EditExpenseDialog";

interface CompactAIExpensePlannerProps {
  eventType: string;
  eventSize: number;
  eventDate: Date;
  totalBudget: number;
  expenseItems: BudgetExpenseItem[];
  isCommitted: boolean;
  onAddExpenseItem: (item: Omit<BudgetExpenseItem, "id">) => void;
  onUpdateExpenseItem: (
    id: string,
    updates: Partial<BudgetExpenseItem>,
  ) => void;
  onDeleteExpenseItem: (id: string) => void;
  onTotalBudgetChange: (budget: number) => void;
  onCommitBudget: () => void;
}

interface AIRecommendation {
  category: string;
  subcategory: string;
  title: string;
  description: string;
  estimatedCost: number;
  priority: "high" | "medium" | "low";
  reasoning: string;
  percentageOfBudget: number;
}

const BUDGET_ALLOCATIONS = {
  wedding: {
    Venue: { percentage: 35, description: "Reception and ceremony venues" },
    Catering: { percentage: 40, description: "Food, beverages, and service" },
    Photography: {
      percentage: 12,
      description: "Professional photography and videography",
    },
    Florals: {
      percentage: 8,
      description: "Bridal bouquet, centerpieces, and decorations",
    },
    Entertainment: {
      percentage: 5,
      description: "DJ, band, or live entertainment",
    },
  },
  corporate: {
    Venue: {
      percentage: 35,
      description: "Conference or meeting space rental",
    },
    Catering: {
      percentage: 30,
      description: "Breakfast, lunch, and refreshments",
    },
    "Audio/Visual": {
      percentage: 20,
      description: "Presentation equipment and tech support",
    },
    Speakers: {
      percentage: 15,
      description: "Keynote speakers and presenters",
    },
  },
  birthday: {
    Venue: { percentage: 30, description: "Party venue or space rental" },
    Catering: { percentage: 35, description: "Food, cake, and beverages" },
    Entertainment: {
      percentage: 25,
      description: "Activities, games, or performers",
    },
    Decorations: {
      percentage: 10,
      description: "Balloons, banners, and party supplies",
    },
  },
};

const CompactAIExpensePlanner = ({
  eventType,
  eventSize,
  eventDate,
  totalBudget,
  expenseItems,
  isCommitted,
  onAddExpenseItem,
  onUpdateExpenseItem,
  onDeleteExpenseItem,
  onTotalBudgetChange,
  onCommitBudget,
}: CompactAIExpensePlannerProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>(
    [],
  );
  const [editingItem, setEditingItem] = useState<BudgetExpenseItem | null>(
    null,
  );
  const [deletingItem, setDeletingItem] = useState<BudgetExpenseItem | null>(
    null,
  );
  const [showCommitDialog, setShowCommitDialog] = useState(false);
  const [customItem, setCustomItem] = useState({
    category: "",
    subcategory: "",
    title: "",
    description: "",
    estimatedCost: "",
    priority: "medium" as "high" | "medium" | "low",
    requirements: "",
  });

  const totalAllocated = expenseItems.reduce(
    (sum, item) => sum + item.allocatedBudget,
    0,
  );
  const totalActual = expenseItems.reduce(
    (sum, item) => sum + item.actualCost,
    0,
  );
  const remainingBudget = Math.max(0, totalBudget - totalAllocated);
  const budgetUtilization =
    totalBudget > 0 ? (totalAllocated / totalBudget) * 100 : 0;
  const actualUtilization =
    totalBudget > 0 ? (totalActual / totalBudget) * 100 : 0;
  const canCommitBudget = totalBudget > 0 && expenseItems.length > 0;

  const generateAIRecommendations = (budget: number = totalBudget) => {
    console.log("Generating AI recommendations for budget:", budget);
    setIsGenerating(true);

    setTimeout(() => {
      const allocation =
        BUDGET_ALLOCATIONS[
          eventType.toLowerCase() as keyof typeof BUDGET_ALLOCATIONS
        ] || BUDGET_ALLOCATIONS.wedding;
      const newRecommendations: AIRecommendation[] = [];

      Object.entries(allocation).forEach(([category, config]) => {
        const budgetAmount = (budget * config.percentage) / 100;

        newRecommendations.push({
          category,
          subcategory: category,
          title: `${category} for ${eventType}`,
          description: config.description,
          estimatedCost: budgetAmount,
          priority:
            config.percentage > 20
              ? "high"
              : config.percentage > 10
                ? "medium"
                : "low",
          reasoning: `Based on ${eventType.toLowerCase()} industry standards, ${category.toLowerCase()} typically accounts for ${config.percentage}% of the total budget. This allocation ensures balanced spending across all essential categories.`,
          percentageOfBudget: config.percentage,
        });
      });

      console.log("Generated recommendations:", newRecommendations);
      setRecommendations(newRecommendations);
      setIsGenerating(false);
    }, 1500);
  };

  const canAddRecommendation = (cost: number) => {
    const canAdd = remainingBudget >= cost;
    console.log("Can add recommendation:", { cost, remainingBudget, canAdd });
    return canAdd;
  };

  const addRecommendation = (recommendation: AIRecommendation) => {
    if (isCommitted || !canAddRecommendation(recommendation.estimatedCost)) {
      console.log("Cannot add recommendation:", {
        isCommitted,
        canAdd: canAddRecommendation(recommendation.estimatedCost),
      });
      return;
    }

    console.log("Adding recommendation:", recommendation.title);
    onAddExpenseItem({
      category: recommendation.category,
      subcategory: recommendation.subcategory,
      title: recommendation.title,
      description: recommendation.description,
      estimatedCost: recommendation.estimatedCost,
      allocatedBudget: recommendation.estimatedCost,
      actualCost: 0,
      priority: recommendation.priority,
      status: "planning",
      aiSuggested: true,
      requirements: `Professional ${recommendation.category.toLowerCase()} service for ${eventSize} guests`,
      deadline: new Date(eventDate.getTime() - 30 * 24 * 60 * 60 * 1000),
    });
  };

  const addCustomExpenseItem = () => {
    if (isCommitted) {
      console.log("Cannot add custom item: budget is committed");
      return;
    }

    const cost = parseFloat(customItem.estimatedCost) || 0;
    console.log("Attempting to add custom item:", {
      title: customItem.title,
      category: customItem.category,
      cost,
      canAdd: canAddRecommendation(cost),
    });

    if (
      customItem.title.trim() &&
      customItem.category &&
      cost > 0 &&
      canAddRecommendation(cost)
    ) {
      console.log("Adding custom expense item:", customItem.title);
      onAddExpenseItem({
        category: customItem.category,
        subcategory: customItem.subcategory || customItem.category,
        title: customItem.title,
        description: customItem.description,
        estimatedCost: cost,
        allocatedBudget: cost,
        actualCost: 0,
        priority: customItem.priority,
        status: "planning",
        aiSuggested: false,
        requirements: customItem.requirements,
        deadline: new Date(eventDate.getTime() - 14 * 24 * 60 * 60 * 1000),
      });

      // Reset form
      setCustomItem({
        category: "",
        subcategory: "",
        title: "",
        description: "",
        estimatedCost: "",
        priority: "medium",
        requirements: "",
      });
    } else {
      console.log("Validation failed:", {
        hasTitle: !!customItem.title.trim(),
        hasCategory: !!customItem.category,
        validCost: cost > 0,
        hasBudget: canAddRecommendation(cost),
      });
    }
  };

  const getBudgetStatus = () => {
    if (budgetUtilization >= 100)
      return { color: "destructive", text: "Budget Exceeded" };
    if (budgetUtilization >= 90)
      return { color: "warning", text: "Budget Warning" };
    return { color: "default", text: "On Track" };
  };

  const budgetStatus = getBudgetStatus();

  // Check if custom form is valid
  const isCustomFormValid =
    customItem.title.trim() &&
    customItem.category &&
    parseFloat(customItem.estimatedCost) > 0 &&
    canAddRecommendation(parseFloat(customItem.estimatedCost) || 0);

  return (
    <div className="space-y-4">
      {/* Commit Status Alert */}
      {isCommitted && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>Budget Committed:</strong> Your budget is now visible to
            vendors. To make changes, you&apos;ll need to uncommit first.
          </AlertDescription>
        </Alert>
      )}

      {/* Enhanced Budget Setup */}
      <BudgetSetupWizard
        currentBudget={totalBudget}
        eventType={eventType}
        eventSize={eventSize}
        eventDate={eventDate}
        isCommitted={isCommitted}
        onBudgetChange={onTotalBudgetChange}
        onGenerateRecommendations={generateAIRecommendations}
      />

      {totalBudget > 0 && (
        <>
          {/* Budget Overview */}
          <Card>
            <CardContent className="p-4">
              <div className="mb-3 grid grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">
                    ${totalBudget.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">Total Budget</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600">
                    ${totalAllocated.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">Planned</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-600">
                    ${totalActual.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">Actual</div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-xl font-bold ${remainingBudget === 0 ? "text-red-600" : "text-green-600"}`}
                  >
                    ${remainingBudget.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">Remaining</div>
                </div>
                <div className="text-center">
                  <Badge
                    variant={
                      budgetStatus.color === "destructive"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {budgetUtilization.toFixed(1)}%
                  </Badge>
                  <div className="text-xs text-gray-600">
                    {budgetStatus.text}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Planned Budget Usage</span>
                  <span>{budgetUtilization.toFixed(1)}%</span>
                </div>
                <Progress
                  value={Math.min(budgetUtilization, 100)}
                  className="h-2"
                />
                {totalActual > 0 && (
                  <>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Actual Spending</span>
                      <span>{actualUtilization.toFixed(1)}%</span>
                    </div>
                    <Progress
                      value={Math.min(actualUtilization, 100)}
                      className="h-2 bg-orange-100"
                    />
                  </>
                )}
              </div>

              {/* Commit Budget Section */}
              {canCommitBudget && !isCommitted && (
                <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-green-800">
                        Ready to Commit Budget?
                      </h4>
                      <p className="text-sm text-green-700">
                        Lock your budget and start receiving vendor proposals
                      </p>
                    </div>
                    <Button
                      onClick={() => setShowCommitDialog(true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Commit Budget
                    </Button>
                  </div>
                </div>
              )}

              {budgetUtilization >= 90 && (
                <Alert className="mt-3">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    {budgetUtilization >= 100
                      ? "Budget exceeded! Consider removing items or increasing budget."
                      : "Budget warning! You're using over 90% of your budget."}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Tabs
            defaultValue="recommendations"
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recommendations">
                AI Recommendations ({recommendations.length})
              </TabsTrigger>
              <TabsTrigger value="manual">Add Custom</TabsTrigger>
              <TabsTrigger value="current">
                Current Items ({expenseItems.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="recommendations"
              className="space-y-3"
            >
              {isCommitted && (
                <Alert className="mb-4">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Budget is committed. To add new recommendations, uncommit
                    your budget first.
                  </AlertDescription>
                </Alert>
              )}

              {totalBudget > 0 &&
                recommendations.length === 0 &&
                !isGenerating && (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Brain className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                      <h3 className="mb-2 text-lg font-medium text-gray-600">
                        AI Recommendations Ready
                      </h3>
                      <p className="mb-4 text-gray-500">
                        Get personalized budget recommendations based on your
                        event type and size
                      </p>
                      <Button
                        onClick={() => generateAIRecommendations()}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate AI Recommendations
                      </Button>
                    </CardContent>
                  </Card>
                )}

              {isGenerating ? (
                <div className="py-8 text-center">
                  <Sparkles className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-500" />
                  <p className="text-gray-600">
                    Generating budget recommendations...
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recommendations.map((rec, index) => {
                    const canAdd =
                      canAddRecommendation(rec.estimatedCost) && !isCommitted;
                    return (
                      <Card
                        key={index}
                        className={`${!canAdd ? "opacity-50" : "hover:shadow-md"} transition-shadow`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-2">
                                <Badge variant="outline">{rec.category}</Badge>
                                <Badge
                                  variant={
                                    rec.priority === "high"
                                      ? "destructive"
                                      : "secondary"
                                  }
                                >
                                  {rec.priority}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="text-green-600"
                                >
                                  {rec.percentageOfBudget}%
                                </Badge>
                              </div>
                              <h3 className="font-semibold">{rec.title}</h3>
                              <p className="mb-2 text-sm text-gray-600">
                                {rec.description}
                              </p>
                              <div className="rounded bg-blue-50 p-2 text-xs text-blue-700">
                                <Lightbulb className="mr-1 inline h-3 w-3" />
                                {rec.reasoning}
                              </div>
                            </div>
                            <div className="ml-4 text-right">
                              <div className="mb-2 text-lg font-bold text-green-600">
                                ${rec.estimatedCost.toLocaleString()}
                              </div>
                              <Button
                                onClick={() => addRecommendation(rec)}
                                disabled={!canAdd}
                                size="sm"
                              >
                                {isCommitted ? (
                                  "Budget Committed"
                                ) : !canAddRecommendation(rec.estimatedCost) ? (
                                  "Insufficient Budget"
                                ) : (
                                  <>
                                    <Plus className="mr-1 h-4 w-4" />
                                    Add
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent
              value="manual"
              className="space-y-4"
            >
              {isCommitted && (
                <Alert className="mb-4">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Budget is committed. To add custom items, uncommit your
                    budget first.
                  </AlertDescription>
                </Alert>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add Custom Expense</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={customItem.category}
                        onValueChange={(value) =>
                          setCustomItem({ ...customItem, category: value })
                        }
                        disabled={isCommitted}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Venue">Venue</SelectItem>
                          <SelectItem value="Catering">Catering</SelectItem>
                          <SelectItem value="Photography">
                            Photography
                          </SelectItem>
                          <SelectItem value="Florals">Florals</SelectItem>
                          <SelectItem value="Entertainment">
                            Entertainment
                          </SelectItem>
                          <SelectItem value="Audio/Visual">
                            Audio/Visual
                          </SelectItem>
                          <SelectItem value="Transportation">
                            Transportation
                          </SelectItem>
                          <SelectItem value="Decorations">
                            Decorations
                          </SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={customItem.title}
                        onChange={(e) =>
                          setCustomItem({
                            ...customItem,
                            title: e.target.value,
                          })
                        }
                        placeholder="e.g., Wedding Reception Venue"
                        disabled={isCommitted}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={customItem.description}
                      onChange={(e) =>
                        setCustomItem({
                          ...customItem,
                          description: e.target.value,
                        })
                      }
                      placeholder="Brief description"
                      rows={2}
                      disabled={isCommitted}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="estimatedCost">Cost</Label>
                      <Input
                        id="estimatedCost"
                        type="number"
                        value={customItem.estimatedCost}
                        onChange={(e) =>
                          setCustomItem({
                            ...customItem,
                            estimatedCost: e.target.value,
                          })
                        }
                        placeholder="0.00"
                        disabled={isCommitted}
                      />
                      {customItem.estimatedCost &&
                        parseFloat(customItem.estimatedCost) >
                          remainingBudget && (
                          <p className="mt-1 text-xs text-red-600">
                            Exceeds remaining budget ($
                            {remainingBudget.toLocaleString()})
                          </p>
                        )}
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={customItem.priority}
                        onValueChange={(value: "high" | "medium" | "low") =>
                          setCustomItem({ ...customItem, priority: value })
                        }
                        disabled={isCommitted}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {!isCustomFormValid &&
                    customItem.title &&
                    customItem.category &&
                    customItem.estimatedCost && (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          {parseFloat(customItem.estimatedCost) <= 0
                            ? "Cost must be greater than 0"
                            : !canAddRecommendation(
                                  parseFloat(customItem.estimatedCost),
                                )
                              ? "Insufficient budget remaining"
                              : "Please complete all required fields"}
                        </AlertDescription>
                      </Alert>
                    )}

                  <Button
                    onClick={addCustomExpenseItem}
                    className="w-full"
                    disabled={isCommitted || !isCustomFormValid}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {isCommitted
                      ? "Budget Committed"
                      : !isCustomFormValid
                        ? "Complete Form to Add"
                        : "Add Expense Item"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="current"
              className="space-y-3"
            >
              {expenseItems.length > 0 ? (
                <div className="space-y-3">
                  {expenseItems.map((item) => (
                    <Card
                      key={item.id}
                      className="transition-shadow hover:shadow-md"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <Badge variant="outline">{item.category}</Badge>
                              <Badge
                                variant={
                                  item.priority === "high"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {item.priority}
                              </Badge>
                              {item.aiSuggested && (
                                <Badge
                                  variant="outline"
                                  className="bg-blue-50 text-blue-700"
                                >
                                  <Brain className="mr-1 h-3 w-3" />
                                  AI
                                </Badge>
                              )}
                            </div>
                            <h3 className="mb-2 font-semibold">{item.title}</h3>
                            <p className="mb-3 text-sm text-gray-600">
                              {item.description}
                            </p>
                            <BudgetItemCostDisplay
                              item={item}
                              showActualCost={item.status !== "planning"}
                            />
                          </div>
                          <div className="ml-4 text-right">
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingItem(item)}
                                disabled={isCommitted}
                              >
                                {isCommitted ? (
                                  <Lock className="h-4 w-4" />
                                ) : (
                                  <Edit className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDeletingItem(item)}
                                className="text-red-600 hover:text-red-700"
                                disabled={isCommitted}
                              >
                                {isCommitted ? (
                                  <Lock className="h-4 w-4" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Target className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                  <p className="text-gray-600">No expense items yet</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Add items from AI recommendations or create custom expenses
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}

      <EditExpenseDialog
        open={!!editingItem}
        onOpenChange={(open) => !open && setEditingItem(null)}
        onSave={(updates) => {
          if (editingItem) {
            onUpdateExpenseItem(editingItem.id, updates);
            setEditingItem(null);
          }
        }}
        expenseItem={editingItem}
      />

      <DeleteExpenseDialog
        open={!!deletingItem}
        onOpenChange={(open) => !open && setDeletingItem(null)}
        onConfirm={() => {
          if (deletingItem) {
            onDeleteExpenseItem(deletingItem.id);
            setDeletingItem(null);
          }
        }}
        expenseTitle={deletingItem?.title || ""}
      />

      <BudgetCommitDialog
        open={showCommitDialog}
        onOpenChange={setShowCommitDialog}
        onConfirm={() => {
          onCommitBudget();
          setShowCommitDialog(false);
        }}
        expenseItemsCount={expenseItems.length}
        totalBudget={totalBudget}
      />
    </div>
  );
};

export default CompactAIExpensePlanner;
