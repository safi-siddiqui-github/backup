import { SessionTrack } from "@/types/conferenceScheduling";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Users, Calendar } from "lucide-react";
import { AnimatedCounter } from "@/components/attending/AnimatedCounter";
import { Progress } from "@/components/ui/progress";

interface EnhancedTrackCardProps {
  track: SessionTrack;
  sessionCount: number;
  totalRegistered: number;
  totalCapacity: number;
  onEdit: (track: SessionTrack) => void;
  onDelete: (trackId: string) => void;
}

const EnhancedTrackCard = ({
  track,
  sessionCount,
  totalRegistered,
  totalCapacity,
  onEdit,
  onDelete
}: EnhancedTrackCardProps) => {
  const utilizationPercent = totalCapacity > 0 ? Math.round((totalRegistered / totalCapacity) * 100) : 0;
  
  // Map color classes to gradient classes
  const getGradientClasses = (colorClass: string) => {
    const colorMap: Record<string, string> = {
      'bg-blue-500': 'from-blue-500/20 to-blue-600/10 border-l-blue-500',
      'bg-green-500': 'from-green-500/20 to-green-600/10 border-l-green-500',
      'bg-purple-500': 'from-purple-500/20 to-purple-600/10 border-l-purple-500',
      'bg-red-500': 'from-red-500/20 to-red-600/10 border-l-red-500',
      'bg-orange-500': 'from-orange-500/20 to-orange-600/10 border-l-orange-500',
      'bg-indigo-500': 'from-indigo-500/20 to-indigo-600/10 border-l-indigo-500',
      'bg-pink-500': 'from-pink-500/20 to-pink-600/10 border-l-pink-500',
      'bg-teal-500': 'from-teal-500/20 to-teal-600/10 border-l-teal-500',
    };
    return colorMap[colorClass] || 'from-primary/20 to-primary/10 border-l-primary';
  };

  const gradientClasses = getGradientClasses(track.color);

  return (
    <div 
      className={`relative overflow-hidden rounded-xl border-l-4 ${gradientClasses} border border-border bg-gradient-to-br hover:scale-[1.02] transition-all duration-300 hover:shadow-lg group`}
    >
      {/* Main Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {track.icon && <span className="text-2xl">{track.icon}</span>}
              <h3 className="text-xl font-bold text-foreground">{track.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{track.description}</p>
          </div>
          
          {/* Action Buttons - Show on hover */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(track)}
              className="h-8 w-8 p-0"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(track.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-background/50">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <AnimatedCounter 
                  value={sessionCount} 
                  className="text-2xl font-bold text-foreground"
                />
              </div>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-background/50">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <AnimatedCounter 
                  value={totalRegistered} 
                  className="text-2xl font-bold text-foreground"
                />
              </div>
              <p className="text-xs text-muted-foreground">Registered</p>
            </div>
          </div>
        </div>

        {/* Capacity Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Capacity Utilization</span>
            <span className="font-semibold text-foreground">
              <AnimatedCounter value={utilizationPercent} suffix="%" />
            </span>
          </div>
          <Progress value={utilizationPercent} className="h-2" />
        </div>

        {/* Footer Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="text-xs text-muted-foreground">
            Avg. capacity: <span className="font-semibold text-foreground">
              {sessionCount > 0 ? Math.round(totalRegistered / sessionCount) : 0}
            </span> per session
          </div>
          {utilizationPercent >= 90 && (
            <Badge variant="secondary" className="bg-red-500/10 text-red-500 border-red-500/20">
              Near Full
            </Badge>
          )}
          {utilizationPercent >= 70 && utilizationPercent < 90 && (
            <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
              Filling Up
            </Badge>
          )}
          {utilizationPercent < 70 && utilizationPercent > 0 && (
            <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
              Available
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedTrackCard;
