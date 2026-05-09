import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Module {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  price: number;
  recommended?: boolean;
  popular?: boolean;
  premium?: boolean;
}

interface ModuleCardProps {
  module: Module;
  isSelected: boolean;
  isRecommended: boolean;
  onToggle: () => void;
}

const ModuleCard = ({ module, isSelected, isRecommended, onToggle }: ModuleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showExpanded, setShowExpanded] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    hoverTimerRef.current = setTimeout(() => {
      setShowExpanded(true);
    }, 2000);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setShowExpanded(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  // Mock showcase images (would be from module data in production)
  const showcaseImages = [
    `https://placehold.co/300x160/6366f1/ffffff?text=${encodeURIComponent(module.name + " 1")}`,
    `https://placehold.co/300x160/8b5cf6/ffffff?text=${encodeURIComponent(module.name + " 2")}`,
  ];

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <Card 
        className={cn(
          "cursor-pointer transition-all duration-300 relative h-full",
          showExpanded 
            ? "absolute z-50 shadow-2xl border-purple-400 scale-105 min-h-[400px]" 
            : "hover:shadow-lg min-h-[140px]",
          isSelected ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"
        )}
        onClick={onToggle}
        style={showExpanded ? { width: '350px' } : undefined}
      >
        {/* Badges */}
        <div className="absolute top-2 right-2 flex gap-1 z-10">
          {module.recommended && (
            <Badge className="bg-green-100 text-green-700 text-xs">Recommended</Badge>
          )}
          {module.popular && (
            <Badge className="bg-orange-100 text-orange-700 text-xs">Popular</Badge>
          )}
          {module.premium && (
            <Badge className="bg-purple-100 text-purple-700 text-xs">Premium</Badge>
          )}
          {isRecommended && (
            <Badge className="bg-blue-100 text-blue-700 text-xs">For You</Badge>
          )}
        </div>

        <CardHeader className={cn("pb-3", showExpanded ? "p-4" : "p-4")}>
          <div className="flex items-center gap-3">
            <div className={cn("text-3xl transition-transform", showExpanded && "scale-110")}>
              {module.icon}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className={cn(showExpanded ? "text-lg" : "text-base leading-tight")}>
                {module.name}
              </CardTitle>
              {!showExpanded && (
                <CardDescription className="text-xs mt-1 line-clamp-2">{module.description}</CardDescription>
              )}
              {showExpanded && (
                <CardDescription className="text-sm mt-1">{module.description}</CardDescription>
              )}
            </div>
            <div className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
              isSelected ? "border-purple-500 bg-purple-500" : "border-gray-300"
            )}>
              {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className={cn("pt-0", showExpanded ? "p-4 space-y-3" : "p-4 space-y-2")}>
          <div className="flex items-center justify-between">
            <span className={cn("font-bold text-gray-800", showExpanded ? "text-lg" : "text-lg")}>
              {module.price === 0 ? "Free" : `$${module.price}/mo`}
            </span>
            {!showExpanded && (
              <Button 
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className="h-8 px-4 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
              >
                {isSelected ? "✓" : "Select"}
              </Button>
            )}
          </div>

          {/* Expanded Content */}
          {showExpanded && (
            <div className="space-y-3 animate-fade-in">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-700">Features:</h4>
                <ul className="space-y-1">
                  {module.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <Circle className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature Showcase */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-700">Preview:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {showcaseImages.map((img, idx) => (
                    <div 
                      key={idx}
                      className="rounded-md border border-gray-200 overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50"
                    >
                      <img 
                        src={img} 
                        alt={`${module.name} showcase ${idx + 1}`}
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                variant={isSelected ? "default" : "outline"}
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
              >
                {isSelected ? "Selected ✓" : "Select Module"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleCard;
