import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Edit, Trash2, Lock, Target, TrendingUp, DollarSign } from "lucide-react";
import type { BudgetExpenseItem } from "./ComprehensiveBudgetModule";
import BudgetItemCostDisplay from "./BudgetItemCostDisplay";

interface SelectedItemsSidebarProps {
  items: BudgetExpenseItem[];
  totalBudget: number;
  totalAllocated: number;
  totalActual: number;
  isCommitted: boolean;
  onEdit: (item: BudgetExpenseItem) => void;
  onDelete: (item: BudgetExpenseItem) => void;
}

const SelectedItemsSidebar = ({
  items,
  totalBudget,
  totalAllocated,
  totalActual,
  isCommitted,
  onEdit,
  onDelete
}: SelectedItemsSidebarProps) => {
  const remainingBudget = Math.max(0, totalBudget - totalAllocated);
  const budgetUtilization = totalBudget > 0 ? (totalAllocated / totalBudget) * 100 : 0;

  return (
    <Card className="sticky top-4 h-[calc(100vh-8rem)]">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="w-5 h-5" />
          Selected Items ({items.length})
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-[calc(100%-5rem)]">
        {/* Summary Stats */}
        <div className="px-4 pb-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Budget</span>
            <span className="font-semibold">${totalBudget.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Allocated</span>
            <span className="font-semibold text-purple-600">${totalAllocated.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Remaining</span>
            <span className={`font-semibold ${remainingBudget === 0 ? 'text-red-600' : 'text-green-600'}`}>
              ${remainingBudget.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Usage</span>
            <Badge variant={budgetUtilization >= 100 ? 'destructive' : budgetUtilization >= 90 ? 'default' : 'secondary'}>
              {budgetUtilization.toFixed(1)}%
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Items List */}
        <ScrollArea className="flex-1 px-4">
          {items.length > 0 ? (
            <div className="space-y-3 py-4">
              {items.map((item) => (
                <Card key={item.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 mb-1 flex-wrap">
                            <Badge variant="outline" className="text-xs">{item.category}</Badge>
                            {item.aiSuggested && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                                <Brain className="w-3 h-3" />
                              </Badge>
                            )}
                          </div>
                          <h4 className="font-medium text-sm truncate">{item.title}</h4>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => onEdit(item)}
                            disabled={isCommitted}
                          >
                            {isCommitted ? <Lock className="w-3 h-3" /> : <Edit className="w-3 h-3" />}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-7 w-7 text-red-600 hover:text-red-700"
                            onClick={() => onDelete(item)}
                            disabled={isCommitted}
                          >
                            {isCommitted ? <Lock className="w-3 h-3" /> : <Trash2 className="w-3 h-3" />}
                          </Button>
                        </div>
                      </div>
                      
                      <BudgetItemCostDisplay 
                        item={item} 
                        showActualCost={item.status !== 'planning'} 
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Target className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No items selected yet</p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Add items from recommendations or create custom expenses
              </p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SelectedItemsSidebar;
