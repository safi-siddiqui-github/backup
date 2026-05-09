
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { BudgetExpenseItem } from "./ComprehensiveBudgetModule";

interface BudgetItemCostDisplayProps {
  item: BudgetExpenseItem;
  showActualCost?: boolean;
}

const BudgetItemCostDisplay = ({ item, showActualCost = true }: BudgetItemCostDisplayProps) => {
  const variance = item.actualCost - item.allocatedBudget;
  const variancePercentage = item.allocatedBudget > 0 ? (variance / item.allocatedBudget) * 100 : 0;
  const utilizationPercentage = item.allocatedBudget > 0 ? (item.actualCost / item.allocatedBudget) * 100 : 0;

  const getVarianceBadge = () => {
    if (!showActualCost || item.actualCost === 0) return null;
    
    if (Math.abs(variance) < 1) {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <Minus className="w-3 h-3 mr-1" />
          On Budget
        </Badge>
      );
    }
    
    if (variance > 0) {
      return (
        <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-200">
          <TrendingUp className="w-3 h-3 mr-1" />
          +${Math.abs(variance).toLocaleString()} ({Math.abs(variancePercentage).toFixed(1)}%)
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <TrendingDown className="w-3 h-3 mr-1" />
          -${Math.abs(variance).toLocaleString()} ({Math.abs(variancePercentage).toFixed(1)}%)
        </Badge>
      );
    }
  };

  const getStatusLabel = () => {
    switch (item.status) {
      case 'planning':
        return 'Planned';
      case 'contracted':
        return 'Contracted';
      case 'completed':
        return 'Final';
      default:
        return 'Planned';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{getStatusLabel()}:</span>
            <span className="font-bold text-blue-600">
              ${item.allocatedBudget.toLocaleString()}
            </span>
          </div>
          
          {showActualCost && item.actualCost > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Actual:</span>
              <span className="font-bold text-green-600">
                ${item.actualCost.toLocaleString()}
              </span>
            </div>
          )}
        </div>
        
        <div className="text-right">
          {getVarianceBadge()}
        </div>
      </div>
      
      {showActualCost && item.actualCost > 0 && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Budget Utilization</span>
            <span>{utilizationPercentage.toFixed(1)}%</span>
          </div>
          <Progress 
            value={Math.min(utilizationPercentage, 100)} 
            className={`h-2 ${utilizationPercentage > 100 ? 'bg-red-100' : 'bg-gray-100'}`}
          />
        </div>
      )}
    </div>
  );
};

export default BudgetItemCostDisplay;
