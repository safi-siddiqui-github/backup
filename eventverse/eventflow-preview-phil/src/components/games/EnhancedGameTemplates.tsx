import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Star, Clock, Users, Play } from "lucide-react";
import { enhancedGameTemplates } from '@/data/enhancedGameTemplates';
import { EnhancedGameTemplate } from '@/types/enhanced-games';

interface EnhancedGameTemplatesProps {
  onBack: () => void;
  onSelectTemplate: (template: EnhancedGameTemplate) => void;
}

const EnhancedGameTemplates = ({ onBack, onSelectTemplate }: EnhancedGameTemplatesProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const getFilteredTemplates = () => {
    if (!searchQuery) return enhancedGameTemplates;
    return enhancedGameTemplates.filter(template => 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/10">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-lg font-semibold text-white">Game Templates</h2>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        {getFilteredTemplates().map((template) => (
          <div key={template.id} className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-800">{template.name}</h3>
                  {template.featured && (
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {template.duration}min
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {template.minParticipants}-{template.maxParticipants === 1000 ? '∞' : template.maxParticipants}
                  </div>
                  <Badge variant="secondary">
                    {template.difficulty}
                  </Badge>
                </div>
              </div>
            </div>

            <Button
              onClick={() => onSelectTemplate(template)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Play className="w-4 h-4 mr-2" />
              Use Template
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedGameTemplates;