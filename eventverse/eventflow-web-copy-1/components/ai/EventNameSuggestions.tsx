"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RefreshCw, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";
import { EventFormData } from "../EnhancedEventCreationDialog";

interface Props {
  // eventType: string;
  eventType: EventFormData["eventType"];
  description?: string;
  onSuggestionSelect: (name: string) => void;
  currentName?: string;
}

const EventNameSuggestions = ({
  eventType,
  description,
  onSuggestionSelect,
  currentName,
}: Props) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSuggestions = () => {
    setIsGenerating(true);

    // Simulate AI generation with contextual suggestions
    const templates = {
      Wedding: [
        "Forever Begins Today",
        "Love's Perfect Celebration",
        "Our Beautiful Beginning",
        "A Day of Pure Joy",
        "Hearts United in Love",
      ],
      Corporate: [
        "Innovation Summit 2024",
        "Future Forward Conference",
        "Excellence in Leadership",
        "Breaking Boundaries Event",
        "Inspiring Growth Together",
      ],
      Birthday: [
        "Another Year of Awesome",
        "Celebrating Life's Journey",
        "Birthday Bash Extraordinaire",
        "Cheers to Another Year",
        "Making Memories Together",
      ],
      Cultural: [
        "Art & Soul Exhibition",
        "Cultural Heritage Celebration",
        "Traditions Come Alive",
        "Community Arts Festival",
        "Cultural Mosaic Event",
      ],
      Charity: [
        "Hope & Healing Gala",
        "Making a Difference Together",
        "Compassion in Action",
        "Hearts for a Cause",
        "Building Better Tomorrow",
      ],
      Festival: [
        "Summer Vibes Festival",
        "Music & Magic Weekend",
        "Community Celebration Fest",
        "Rhythm & Joy Festival",
        "Stars Under the Sky",
      ],
    };

    setTimeout(() => {
      const eventSuggestions =
        templates[eventType as keyof typeof templates] || templates.Corporate;
      setSuggestions(eventSuggestions);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-purple-600" />
            <span className="font-medium text-purple-800">
              AI Event Name Generator
            </span>
            <Badge
              variant="secondary"
              className="bg-purple-100 text-xs text-purple-700"
            >
              Smart
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={generateSuggestions}
            disabled={isGenerating}
            className="border-purple-300 text-purple-700 hover:bg-purple-100"
          >
            {isGenerating ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {isGenerating ? "Generating..." : "Generate Ideas"}
          </Button>
        </div>

        {suggestions.length > 0 && (
          <div className="space-y-2">
            <p className="mb-2 text-sm text-purple-700">
              AI-generated suggestions for your {eventType?.toLowerCase()}:
            </p>
            <div className="grid grid-cols-1 gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSuggestionSelect(suggestion)}
                  className={cn(
                    "hover:bg-purple-25 rounded-lg border-2 p-3 text-left transition-all hover:border-purple-400",
                    currentName === suggestion
                      ? "border-purple-500 bg-purple-100"
                      : "border-purple-200 bg-white",
                  )}
                >
                  <span className="font-medium text-gray-800">
                    {suggestion}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {suggestions.length === 0 && (
          <p className="py-4 text-center text-sm text-gray-600">
            Click &quot;Generate Ideas&quot; to get AI-powered name suggestions
            for your {eventType?.toLowerCase()}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default EventNameSuggestions;
