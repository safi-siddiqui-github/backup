import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Search } from "lucide-react";
import { EnhancedGameTemplate } from "@/types/enhanced-games";
import { enhancedGameTemplates } from "@/data/enhancedGameTemplates";
import GameIconAnimated from "./GameIconAnimated";
import { cn } from "@/lib/utils";

interface GameTemplateGridProps {
  onSelectTemplate: (template: EnhancedGameTemplate) => void;
  onBack: () => void;
}

const difficultyColors = {
  'Easy': 'bg-success text-success-foreground',
  'Medium': 'bg-warning text-warning-foreground',
  'Hard': 'bg-destructive text-destructive-foreground'
};

const GameTemplateGrid = ({ onSelectTemplate, onBack }: GameTemplateGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = enhancedGameTemplates.filter((template) => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Choose a Game Template</h1>
              <p className="text-sm text-muted-foreground">
                {filteredTemplates.length} games available
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games..."
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 py-6">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No games found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className={cn(
                  "group cursor-pointer transition-all duration-300",
                  "hover:scale-105 hover:shadow-xl hover:border-primary"
                )}
                onClick={() => onSelectTemplate(template)}
              >
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto mb-4">
                    <GameIconAnimated type={template.type} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-center mb-2 text-foreground">
                    {template.name}
                  </h3>

                  {/* Badges */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Badge className={difficultyColors[template.difficulty]} variant="default">
                      {template.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>

                  {/* Description - Hidden by default, shown on hover */}
                  <p className="text-sm text-muted-foreground text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 justify-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {template.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs px-2 py-0.5 bg-accent rounded-full text-accent-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameTemplateGrid;
