import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Trophy, 
  Star, 
  Users, 
  Calendar, 
  Zap,
  TrendingUp,
  Gift,
  Heart,
  Sparkles
} from "lucide-react";
import { format } from "date-fns";

interface ActivityItem {
  id: string;
  type: "achievement" | "milestone" | "review" | "event" | "level_up";
  title: string;
  description: string;
  timestamp: Date;
  xpGained?: number;
  icon: React.ComponentType<any>;
  color: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "milestone",
    title: "Million Guest Milestone!",
    description: "You've been part of hosting over 1M guests globally",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    xpGained: 1000,
    icon: Trophy,
    color: "text-yellow-500"
  },
  {
    id: "2", 
    type: "review",
    title: "5-Star Review Received",
    description: "\"Absolutely incredible event! Every detail was perfect.\"",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    xpGained: 50,
    icon: Star,
    color: "text-yellow-400"
  },
  {
    id: "3",
    type: "achievement",
    title: "Five Star Host",
    description: "Maintained 4.8+ rating with 10+ reviews",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    xpGained: 400,
    icon: Sparkles,
    color: "text-purple-500"
  },
  {
    id: "4",
    type: "event",
    title: "Event Successfully Completed",
    description: "Sarah & Michael's Wedding - 150 guests",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    xpGained: 200,
    icon: Calendar,
    color: "text-blue-500"
  },
  {
    id: "5",
    type: "level_up",
    title: "Level Up!",
    description: "Congratulations! You've reached Skilled Host (Level 3)",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    xpGained: 0,
    icon: Zap,
    color: "text-green-500"
  }
];

const LiveActivityFeed = () => {
  const getRelativeTime = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Live Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {mockActivities.map((activity) => (
              <div 
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/20 transition-all duration-200 animate-fade-in"
              >
                <div className={`bg-background rounded-full p-2 ${activity.color}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground text-sm truncate">
                      {activity.title}
                    </h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {getRelativeTime(activity.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {activity.description}
                  </p>
                  {activity.xpGained && activity.xpGained > 0 && (
                    <Badge className="mt-1 text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                      +{activity.xpGained} XP
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LiveActivityFeed;