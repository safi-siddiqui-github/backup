import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { moduleGradients } from '@/utils/attendingColors';

interface QuickActionCardProps {
  id: string;
  label: string;
  icon: LucideIcon;
  status: string;
  badge?: string;
  description?: string;
  onClick: () => void;
}

export const QuickActionCard = ({
  label,
  icon: Icon,
  status,
  badge,
  description,
  onClick,
  id
}: QuickActionCardProps) => {
  const gradient = moduleGradients[id] || 'from-purple-400 to-indigo-600';
  
  const getStatusBadge = () => {
    if (status === 'hot') {
      return (
        <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 animate-pulse">
          🔥 Live Now!
        </Badge>
      );
    }
    if (status === 'pending') {
      return <Badge className="bg-amber-500 text-white border-0">Action Required</Badge>;
    }
    if (status === 'completed') {
      return <Badge className="bg-green-500 text-white border-0">✓ Completed</Badge>;
    }
    return <Badge className="bg-blue-500 text-white border-0">Available</Badge>;
  };

  return (
    <Card 
      className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-card hover:-translate-y-1 hover:scale-[1.02]"
      onClick={onClick}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      <CardContent className="relative p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className={`rounded-2xl p-4 bg-gradient-to-br ${gradient} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
          {label}
        </h3>
        
        {description && (
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
        )}
        
        {getStatusBadge()}
        
        {badge && (
          <div className="absolute -top-2 -right-2">
            <Badge className="bg-red-500 text-white text-xs animate-pulse shadow-lg">
              {badge}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
