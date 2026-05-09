import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Plus, Target } from "lucide-react";

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

interface AIRecommendationCardProps {
  recommendation: AIRecommendation;
  onAdd: (rec: AIRecommendation) => void;
  canAdd: boolean;
  isCommitted: boolean;
}

const AIRecommendationCard = ({ recommendation, onAdd, canAdd, isCommitted }: AIRecommendationCardProps) => {
  return (
    <Card className={`${!canAdd ? 'opacity-50' : 'hover:shadow-md hover:border-primary/50'} transition-all`}>
      <CardContent className="p-5">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-primary/5">{recommendation.category}</Badge>
              <Badge variant={recommendation.priority === 'high' ? 'destructive' : recommendation.priority === 'medium' ? 'default' : 'secondary'}>
                {recommendation.priority}
              </Badge>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {recommendation.percentageOfBudget}% of budget
              </Badge>
            </div>
            
            <h3 className="font-semibold text-lg mb-2">{recommendation.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{recommendation.description}</p>
            
            <div className="bg-accent/50 border border-accent rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-foreground mb-1">AI Insight</p>
                  <p className="text-xs text-muted-foreground">{recommendation.reasoning}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end justify-between">
            <div className="text-right mb-3">
              <div className="text-2xl font-bold text-green-600">
                ${recommendation.estimatedCost.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Estimated</div>
            </div>
            
            <Button 
              onClick={() => onAdd(recommendation)}
              disabled={!canAdd}
              size="sm"
              className="gap-2"
            >
              {isCommitted ? (
                'Budget Locked'
              ) : !canAdd ? (
                'Insufficient Budget'
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add to Budget
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendationCard;
