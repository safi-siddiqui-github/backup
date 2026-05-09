
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  EyeOff,
  Zap
} from "lucide-react";

interface Props {
  totalBudget: number;
  totalSpent: number;
  totalCommitted: number;
  healthScore: number;
}

const InteractiveBudgetHealth = ({ totalBudget, totalSpent, totalCommitted, healthScore }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  
  const remainingBudget = totalBudget - totalCommitted;
  const utilizationRate = totalBudget > 0 ? (totalCommitted / totalBudget) * 100 : 0;
  const spentRate = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const getHealthStatus = () => {
    if (healthScore >= 80) return { 
      status: "Excellent", 
      color: "from-green-500 to-emerald-600",
      textColor: "text-green-700",
      bgColor: "bg-green-50 border-green-200",
      icon: CheckCircle,
      iconColor: "text-green-600"
    };
    if (healthScore >= 60) return { 
      status: "Good", 
      color: "from-blue-500 to-cyan-600",
      textColor: "text-blue-700", 
      bgColor: "bg-blue-50 border-blue-200",
      icon: TrendingUp,
      iconColor: "text-blue-600"
    };
    if (healthScore >= 40) return { 
      status: "Warning", 
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-700",
      bgColor: "bg-amber-50 border-amber-200", 
      icon: TrendingDown,
      iconColor: "text-amber-600"
    };
    return { 
      status: "Critical", 
      color: "from-red-500 to-rose-600",
      textColor: "text-red-700",
      bgColor: "bg-red-50 border-red-200",
      icon: AlertTriangle,
      iconColor: "text-red-600"
    };
  };

  const healthStatus = getHealthStatus();
  const HealthIcon = healthStatus.icon;

  return (
    <Card className={`${healthStatus.bgColor} border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer`} 
          onClick={() => setIsExpanded(!isExpanded)}>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Header with Health Score */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full bg-gradient-to-r ${healthStatus.color} shadow-md`}>
                <HealthIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Budget Health</h3>
                <Badge className={`${healthStatus.bgColor} ${healthStatus.textColor} font-medium`}>
                  {healthStatus.status}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold bg-gradient-to-r ${healthStatus.color} bg-clip-text text-transparent`}>
                {healthScore}%
              </div>
              <Button variant="ghost" size="sm" onClick={(e) => {
                e.stopPropagation();
                setShowDetails(!showDetails);
              }}>
                {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Main Metrics Grid */}
          {showDetails && (
            <div className="grid grid-cols-3 gap-4 animate-fade-in">
              <div className="text-center p-4 bg-white/80 rounded-lg backdrop-blur-sm hover:bg-white transition-colors">
                <div className="text-2xl font-bold text-gray-800">${totalBudget.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Budget</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-gray-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/80 rounded-lg backdrop-blur-sm hover:bg-white transition-colors">
                <div className="text-2xl font-bold text-blue-600">${totalSpent.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Spent</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                       style={{ width: `${Math.min(spentRate, 100)}%` }}></div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/80 rounded-lg backdrop-blur-sm hover:bg-white transition-colors">
                <div className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${remainingBudget.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Remaining</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className={`h-2 rounded-full transition-all duration-500 ${remainingBudget >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                       style={{ width: `${Math.max(0, Math.min((remainingBudget / totalBudget) * 100, 100))}%` }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Budget Utilization Progress */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Budget Utilization</span>
              <span className="text-sm font-semibold">{utilizationRate.toFixed(1)}%</span>
            </div>
            <div className="relative">
              <Progress 
                value={Math.min(utilizationRate, 100)} 
                className="h-4 bg-gray-200 transition-all duration-500"
              />
              {utilizationRate > 100 && (
                <div className="absolute top-0 left-0 w-full h-4 bg-red-500 rounded-full animate-pulse opacity-75"></div>
              )}
            </div>
            {utilizationRate > 100 && (
              <div className="flex items-center gap-2 text-sm text-red-600 animate-fade-in">
                <AlertTriangle className="w-4 h-4" />
                Over budget by ${(totalCommitted - totalBudget).toLocaleString()}
              </div>
            )}
          </div>

          {/* Expandable Details */}
          {isExpanded && (
            <div className="space-y-4 pt-4 border-t border-gray-200 animate-fade-in">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Zap className="w-4 h-4" />
                Quick Insights
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-white/60 rounded-lg">
                  <div className="text-sm text-gray-600">Daily Burn Rate</div>
                  <div className="text-lg font-semibold">${(totalSpent / 30).toFixed(0)}/day</div>
                </div>
                <div className="p-3 bg-white/60 rounded-lg">
                  <div className="text-sm text-gray-600">Projected Total</div>
                  <div className="text-lg font-semibold">${(totalCommitted + (remainingBudget * 0.1)).toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveBudgetHealth;
