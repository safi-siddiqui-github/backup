import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Trophy, 
  Users, 
  Calendar,
  Star,
  Sparkles,
  TrendingUp
} from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  description: string;
  current: number;
  target: number;
  category: "guests" | "events" | "rating" | "streak";
  icon: React.ComponentType<any>;
  reward: string;
  timeEstimate: string;
}

const upcomingMilestones: Milestone[] = [
  {
    id: "5k_guests",
    title: "5K Community Builder",
    description: "Host a total of 5,000 guests",
    current: 3847,
    target: 5000,
    category: "guests",
    icon: Users,
    reward: "Premium templates & Priority support",
    timeEstimate: "2 months"
  },
  {
    id: "perfect_month",
    title: "Perfect Month",
    description: "Maintain 5.0 rating for 30 days",
    current: 18,
    target: 30,
    category: "rating",
    icon: Star,
    reward: "Gold badge & Feature spotlight",
    timeEstimate: "12 days"
  },
  {
    id: "century_events",
    title: "Century Host",
    description: "Complete 100 successful events",
    current: 73,
    target: 100,
    category: "events",
    icon: Calendar,
    reward: "Custom branding options",
    timeEstimate: "4 months"
  },
  {
    id: "innovation_master",
    title: "Innovation Master",
    description: "Use all 15 platform modules",
    current: 12,
    target: 15,
    category: "streak",
    icon: Sparkles,
    reward: "Beta access & API keys",
    timeEstimate: "1 month"
  }
];

const MilestoneCountdown = () => {
  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "bg-gradient-to-r from-green-500 to-emerald-500";
    if (progress >= 70) return "bg-gradient-to-r from-yellow-500 to-orange-500";
    if (progress >= 50) return "bg-gradient-to-r from-blue-500 to-purple-500";
    return "bg-gradient-to-r from-gray-500 to-gray-600";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "guests": return Users;
      case "events": return Calendar;
      case "rating": return Star;
      case "streak": return Sparkles;
      default: return Target;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-500" />
          Milestone Countdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {upcomingMilestones.map((milestone) => {
            const progress = (milestone.current / milestone.target) * 100;
            const remaining = milestone.target - milestone.current;
            
            return (
              <div key={milestone.id} className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-full p-2">
                      <milestone.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        {milestone.title}
                        {progress >= 90 && (
                          <Badge className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                            Almost there!
                          </Badge>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {milestone.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>ETA: {milestone.timeEstimate}</span>
                        <span>•</span>
                        <span>Reward: {milestone.reward}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      {remaining.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">to go</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      {milestone.current.toLocaleString()} / {milestone.target.toLocaleString()}
                    </span>
                    <span className="font-medium text-foreground">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="relative">
                    <Progress value={progress} className="h-3" />
                    <div 
                      className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {progress >= 95 && (
                  <div className="p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800 dark:text-green-400">
                          Almost unlocked! Just {remaining} more to go!
                        </span>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 text-white border-0">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Push Forward
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MilestoneCountdown;