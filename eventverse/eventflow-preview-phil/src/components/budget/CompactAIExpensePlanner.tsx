import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Sparkles, 
  Plus, 
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react";
import type { BudgetExpenseItem } from "./ComprehensiveBudgetModule";
import EditExpenseDialog from "./EditExpenseDialog";
import DeleteExpenseDialog from "./DeleteExpenseDialog";
import BudgetCommitDialog from "./BudgetCommitDialog";
import BudgetSetupWizard from "./BudgetSetupWizard";
import AIRecommendationCard from "./AIRecommendationCard";
import SelectedItemsSidebar from "./SelectedItemsSidebar";
import CustomExpenseForm from "./CustomExpenseForm";

interface CompactAIExpensePlannerProps {
  eventType: string;
  eventSize: number;
  eventDate: Date;
  totalBudget: number;
  expenseItems: BudgetExpenseItem[];
  isCommitted: boolean;
  onAddExpenseItem: (item: Omit<BudgetExpenseItem, 'id'>) => void;
  onUpdateExpenseItem: (id: string, updates: Partial<BudgetExpenseItem>) => void;
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
  priority: 'high' | 'medium' | 'low';
  reasoning: string;
  percentageOfBudget: number;
}

const BUDGET_ALLOCATIONS = {
  wedding: {
    "Venue": { percentage: 35, description: "Reception and ceremony venues" },
    "Catering": { percentage: 40, description: "Food, beverages, and service" },
    "Photography": { percentage: 12, description: "Professional photography and videography" },
    "Florals": { percentage: 8, description: "Bridal bouquet, centerpieces, and decorations" },
    "Entertainment": { percentage: 5, description: "DJ, band, or live entertainment" }
  },
  corporate: {
    "Venue": { percentage: 35, description: "Conference or meeting space rental" },
    "Catering": { percentage: 30, description: "Breakfast, lunch, and refreshments" },
    "Audio/Visual": { percentage: 20, description: "Presentation equipment and tech support" },
    "Speakers": { percentage: 15, description: "Keynote speakers and presenters" }
  },
  birthday: {
    "Venue": { percentage: 30, description: "Party venue or space rental" },
    "Catering": { percentage: 35, description: "Food, cake, and beverages" },
    "Entertainment": { percentage: 25, description: "Activities, games, or performers" },
    "Decorations": { percentage: 10, description: "Balloons, banners, and party supplies" }
  }
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
  onCommitBudget
}: CompactAIExpensePlannerProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [editingItem, setEditingItem] = useState<BudgetExpenseItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<BudgetExpenseItem | null>(null);
  const [showCommitDialog, setShowCommitDialog] = useState(false);
  const [customItem, setCustomItem] = useState({
    category: "",
    subcategory: "",
    title: "",
    description: "",
    estimatedCost: "",
    priority: "medium" as 'high' | 'medium' | 'low',
    requirements: ""
  });

  const totalAllocated = expenseItems.reduce((sum, item) => sum + item.allocatedBudget, 0);
  const totalActual = expenseItems.reduce((sum, item) => sum + item.actualCost, 0);
  const remainingBudget = Math.max(0, totalBudget - totalAllocated);
  const budgetUtilization = totalBudget > 0 ? (totalAllocated / totalBudget) * 100 : 0;
  const actualUtilization = totalBudget > 0 ? (totalActual / totalBudget) * 100 : 0;
  const canCommitBudget = totalBudget > 0 && expenseItems.length > 0;

  const generateAIRecommendations = (budget: number = totalBudget) => {
    console.log('Generating AI recommendations for budget:', budget);
    setIsGenerating(true);
    
    setTimeout(() => {
      const allocation = BUDGET_ALLOCATIONS[eventType.toLowerCase() as keyof typeof BUDGET_ALLOCATIONS] || BUDGET_ALLOCATIONS.wedding;
      const newRecommendations: AIRecommendation[] = [];

      Object.entries(allocation).forEach(([category, config]) => {
        const budgetAmount = (budget * config.percentage) / 100;
        
        newRecommendations.push({
          category,
          subcategory: category,
          title: `${category} for ${eventType}`,
          description: config.description,
          estimatedCost: budgetAmount,
          priority: config.percentage > 20 ? 'high' : config.percentage > 10 ? 'medium' : 'low',
          reasoning: `Based on ${eventType.toLowerCase()} industry standards, ${category.toLowerCase()} typically accounts for ${config.percentage}% of the total budget. This allocation ensures balanced spending across all essential categories.`,
          percentageOfBudget: config.percentage
        });
      });

      console.log('Generated recommendations:', newRecommendations);
      setRecommendations(newRecommendations);
      setIsGenerating(false);
    }, 1500);
  };

  const canAddRecommendation = (cost: number) => {
    const canAdd = remainingBudget >= cost;
    console.log('Can add recommendation:', { cost, remainingBudget, canAdd });
    return canAdd;
  };

  const addRecommendation = (recommendation: AIRecommendation) => {
    if (isCommitted || !canAddRecommendation(recommendation.estimatedCost)) {
      console.log('Cannot add recommendation:', { isCommitted, canAdd: canAddRecommendation(recommendation.estimatedCost) });
      return;
    }

    console.log('Adding recommendation:', recommendation.title);
    onAddExpenseItem({
      category: recommendation.category,
      subcategory: recommendation.subcategory,
      title: recommendation.title,
      description: recommendation.description,
      estimatedCost: recommendation.estimatedCost,
      allocatedBudget: recommendation.estimatedCost,
      actualCost: 0,
      priority: recommendation.priority,
      status: 'planning',
      aiSuggested: true,
      requirements: `Professional ${recommendation.category.toLowerCase()} service for ${eventSize} guests`,
      deadline: new Date(eventDate.getTime() - 30 * 24 * 60 * 60 * 1000)
    });
  };

  const addCustomExpenseItem = () => {
    if (isCommitted) {
      console.log('Cannot add custom item: budget is committed');
      return;
    }
    
    const cost = parseFloat(customItem.estimatedCost) || 0;
    console.log('Attempting to add custom item:', { 
      title: customItem.title, 
      category: customItem.category, 
      cost, 
      canAdd: canAddRecommendation(cost) 
    });
    
    if (customItem.title.trim() && customItem.category && cost > 0 && canAddRecommendation(cost)) {
      console.log('Adding custom expense item:', customItem.title);
      onAddExpenseItem({
        category: customItem.category,
        subcategory: customItem.subcategory || customItem.category,
        title: customItem.title,
        description: customItem.description,
        estimatedCost: cost,
        allocatedBudget: cost,
        actualCost: 0,
        priority: customItem.priority,
        status: 'planning',
        aiSuggested: false,
        requirements: customItem.requirements,
        deadline: new Date(eventDate.getTime() - 14 * 24 * 60 * 60 * 1000)
      });
      
      // Reset form
      setCustomItem({
        category: "",
        subcategory: "",
        title: "",
        description: "",
        estimatedCost: "",
        priority: "medium",
        requirements: ""
      });
    } else {
      console.log('Validation failed:', {
        hasTitle: !!customItem.title.trim(),
        hasCategory: !!customItem.category,
        validCost: cost > 0,
        hasBudget: canAddRecommendation(cost)
      });
    }
  };

  const handleCustomFieldChange = (field: string, value: string) => {
    setCustomItem(prev => ({ ...prev, [field]: value }));
  };

  const getBudgetStatus = () => {
    if (budgetUtilization >= 100) return { color: 'destructive', text: 'Budget Exceeded' };
    if (budgetUtilization >= 90) return { color: 'warning', text: 'Budget Warning' };
    return { color: 'default', text: 'On Track' };
  };

  const budgetStatus = getBudgetStatus();

  // Check if custom form is valid
  const isCustomFormValid = customItem.title.trim() && 
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
            <strong>Budget Committed:</strong> Your budget is now visible to vendors. To make changes, you'll need to uncommit first.
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
              <div className="grid grid-cols-5 gap-4 mb-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">${totalBudget.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Total Budget</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600">${totalAllocated.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Planned</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-600">${totalActual.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Actual</div>
                </div>
                <div className="text-center">
                  <div className={`text-xl font-bold ${remainingBudget === 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ${remainingBudget.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">Remaining</div>
                </div>
                <div className="text-center">
                  <Badge variant={budgetStatus.color === 'destructive' ? 'destructive' : 'outline'}>
                    {budgetUtilization.toFixed(1)}%
                  </Badge>
                  <div className="text-xs text-gray-600">{budgetStatus.text}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Planned Budget Usage</span>
                  <span>{budgetUtilization.toFixed(1)}%</span>
                </div>
                <Progress value={Math.min(budgetUtilization, 100)} className="h-2" />
                {totalActual > 0 && (
                  <>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Actual Spending</span>
                      <span>{actualUtilization.toFixed(1)}%</span>
                    </div>
                    <Progress value={Math.min(actualUtilization, 100)} className="h-2 bg-orange-100" />
                  </>
                )}
              </div>
              
              {/* Commit Budget Section */}
              {canCommitBudget && !isCommitted && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-green-800">Ready to Commit Budget?</h4>
                      <p className="text-sm text-green-700">Lock your budget and start receiving vendor proposals</p>
                    </div>
                    <Button 
                      onClick={() => setShowCommitDialog(true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
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
                      : "Budget warning! You're using over 90% of your budget."
                    }
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Two Column Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Selection Zone (60%) */}
            <div className="col-span-7">
              <Tabs defaultValue="ai-recommendations" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="ai-recommendations" className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    AI Recommendations
                    {recommendations.length > 0 && (
                      <Badge variant="secondary" className="ml-2">{recommendations.length}</Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="custom-expense" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Custom Expense
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="ai-recommendations" className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Smart budget suggestions based on your event type
                    </p>

                    {isCommitted && (
                      <Alert className="mb-4">
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Budget is committed. To add new recommendations, uncommit your budget first.
                        </AlertDescription>
                      </Alert>
                    )}

                    {totalBudget > 0 && recommendations.length === 0 && !isGenerating && (
                      <Card>
                        <CardContent className="p-8 text-center">
                          <Brain className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">AI Recommendations Ready</h3>
                          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            Get personalized budget recommendations based on your event type, size, and industry standards
                          </p>
                          <Button 
                            onClick={() => generateAIRecommendations()}
                            size="lg"
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate AI Recommendations
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                    
                    {isGenerating ? (
                      <div className="text-center py-12">
                        <Sparkles className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                        <p className="text-muted-foreground">Generating intelligent budget recommendations...</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recommendations.map((rec, index) => {
                          const canAdd = canAddRecommendation(rec.estimatedCost) && !isCommitted;
                          return (
                            <AIRecommendationCard
                              key={index}
                              recommendation={rec}
                              onAdd={addRecommendation}
                              canAdd={canAdd}
                              isCommitted={isCommitted}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="custom-expense" className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add your own budget items
                    </p>

                    {isCommitted && (
                      <Alert className="mb-4">
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Budget is committed. To add custom items, uncommit your budget first.
                        </AlertDescription>
                      </Alert>
                    )}

                    <CustomExpenseForm
                      customItem={customItem}
                      remainingBudget={remainingBudget}
                      isCommitted={isCommitted}
                      isFormValid={isCustomFormValid}
                      onFieldChange={handleCustomFieldChange}
                      onSubmit={addCustomExpenseItem}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Selected Items (40%) */}
            <div className="col-span-5">
              <SelectedItemsSidebar
                items={expenseItems}
                totalBudget={totalBudget}
                totalAllocated={totalAllocated}
                totalActual={totalActual}
                isCommitted={isCommitted}
                onEdit={setEditingItem}
                onDelete={setDeletingItem}
              />
            </div>
          </div>
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
