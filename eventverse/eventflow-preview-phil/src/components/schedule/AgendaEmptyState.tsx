import { Calendar, Plus, Coffee, Users, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AgendaEmptyStateProps {
  onAddItem: () => void;
}

const AgendaEmptyState = ({ onAddItem }: AgendaEmptyStateProps) => {
  const suggestions = [
    { icon: Presentation, label: "Session", color: "from-blue-500 to-blue-600", bgClass: "bg-blue-500/10 dark:bg-blue-500/20" },
    { icon: Users, label: "Workshop", color: "from-green-500 to-green-600", bgClass: "bg-green-500/10 dark:bg-green-500/20" },
    { icon: Coffee, label: "Break", color: "from-orange-500 to-orange-600", bgClass: "bg-orange-500/10 dark:bg-orange-500/20" },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      {/* Illustration */}
      <div className="relative mb-6">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
            <Calendar className="w-16 h-16 text-primary" />
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
          <Plus className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>

      {/* Headline */}
      <h3 className="text-2xl font-bold mb-2 text-foreground">No schedule items yet</h3>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        Add your first agenda item to get started with planning your event timeline
      </p>

      {/* CTA Button */}
      <Button
        onClick={onAddItem}
        size="lg"
        className="mb-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add First Item
      </Button>

      {/* Suggestion Cards */}
      <div className="w-full max-w-2xl">
        <p className="text-sm text-muted-foreground mb-3 text-center">Try adding:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {suggestions.map((suggestion) => {
            const Icon = suggestion.icon;
            return (
              <Card
                key={suggestion.label}
                className="cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-105"
                onClick={onAddItem}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${suggestion.bgClass} border border-border`}>
                    <Icon className={`w-5 h-5 bg-gradient-to-br ${suggestion.color} text-transparent bg-clip-text`} strokeWidth={2.5} />
                  </div>
                  <span className="font-semibold text-foreground">{suggestion.label}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AgendaEmptyState;
