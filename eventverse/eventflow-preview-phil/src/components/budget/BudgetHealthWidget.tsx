
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";

interface Props {
  totalBudget: number;
  totalSpent: number;
  totalCommitted: number;
  healthScore: number;
}

const BudgetHealthWidget = ({ totalBudget, totalSpent, totalCommitted, healthScore }: Props) => {
  const remainingBudget = totalBudget - totalCommitted;
  const utilizationRate = totalBudget > 0 ? (totalCommitted / totalBudget) * 100 : 0;

  const getHealthStatus = () => {
    if (healthScore >= 80) return { 
      status: "Excellent", 
      color: "bg-green-100 text-green-800", 
      icon: CheckCircle,
      iconColor: "text-green-600"
    };
    if (healthScore >= 60) return { 
      status: "Good", 
      color: "bg-blue-100 text-blue-800", 
      icon: TrendingUp,
      iconColor: "text-blue-600"
    };
    if (healthScore >= 40) return { 
      status: "Warning", 
      color: "bg-yellow-100 text-yellow-800", 
      icon: TrendingDown,
      iconColor: "text-yellow-600"
    };
    return { 
      status: "Critical", 
      color: "bg-red-100 text-red-800", 
      icon: AlertTriangle,
      iconColor: "text-red-600"
    };
  };

  const healthStatus = getHealthStatus();
  const HealthIcon = healthStatus.icon;

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Budget Health Score */}
          <div className="lg:col-span-1 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <HealthIcon className={`w-6 h-6 ${healthStatus.iconColor}`} />
              <span className="text-lg font-semibold">Budget Health</span>
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-2">{healthScore}%</div>
            <Badge className={healthStatus.color}>{healthStatus.status}</Badge>
          </div>

          {/* Budget Breakdown */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">${totalBudget.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Budget</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">${totalSpent.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Spent</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${remainingBudget.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Remaining</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Budget Utilization</span>
                <span>{utilizationRate.toFixed(1)}%</span>
              </div>
              <Progress 
                value={Math.min(utilizationRate, 100)} 
                className="h-3"
              />
              {utilizationRate > 100 && (
                <div className="text-xs text-red-600 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Over budget by ${(totalCommitted - totalBudget).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetHealthWidget;
