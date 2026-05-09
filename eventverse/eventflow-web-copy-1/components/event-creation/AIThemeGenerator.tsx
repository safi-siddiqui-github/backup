"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCw, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";
import { EventFormData } from "../EnhancedEventCreationDialog";

interface GeneratedTheme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  effects: string[];
  mood: string;
  description: string;
}

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
}

const AIThemeGenerator = ({ formData, onUpdate }: Props) => {
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTheme, setGeneratedTheme] = useState<GeneratedTheme | null>(
    null,
  );
  const { toast } = useToast();

  const generateTheme = async () => {
    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please describe your desired theme first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate AI processing - in real implementation, this would call OpenAI API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock AI response based on description keywords
      const theme = processThemeDescription(description);
      setGeneratedTheme(theme);

      // Apply the generated theme
      onUpdate({
        theme: {
          ...formData.theme,
          primaryColor: theme.primaryColor,
          secondaryColor: theme.secondaryColor,
          template: "ai-generated",
          effects: theme.effects,
          mood: theme.mood,
          generatedName: theme.name,
        },
      });

      toast({
        title: "Theme Generated!",
        description: `Created "${theme.name}" theme based on your description`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate theme. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const processThemeDescription = (desc: string): GeneratedTheme => {
    const lower = desc.toLowerCase();

    // Winter/Snow themes
    if (
      lower.includes("winter") ||
      lower.includes("snow") ||
      lower.includes("ice")
    ) {
      return {
        name: "Winter Wonderland",
        primaryColor: "#3B82F6",
        secondaryColor: "#E0F2FE",
        accentColor: "#FFFFFF",
        effects: ["snow", "sparkles"],
        mood: "elegant",
        description: "Cool blues and whites with falling snow effects",
      };
    }

    // Beach/Ocean themes
    if (
      lower.includes("beach") ||
      lower.includes("ocean") ||
      lower.includes("tropical")
    ) {
      return {
        name: "Tropical Paradise",
        primaryColor: "#06B6D4",
        secondaryColor: "#FED7AA",
        accentColor: "#10B981",
        effects: ["waves", "palm-sway"],
        mood: "relaxed",
        description:
          "Ocean blues and sunset oranges with gentle wave animations",
      };
    }

    // Elegant/Wedding themes
    if (
      lower.includes("elegant") ||
      lower.includes("wedding") ||
      lower.includes("gold")
    ) {
      return {
        name: "Golden Elegance",
        primaryColor: "#F59E0B",
        secondaryColor: "#1F2937",
        accentColor: "#FEF3C7",
        effects: ["subtle-glow", "elegant-fade"],
        mood: "sophisticated",
        description: "Rich gold and charcoal with subtle glowing effects",
      };
    }

    // Fun/Kids themes
    if (
      lower.includes("fun") ||
      lower.includes("kids") ||
      lower.includes("rainbow") ||
      lower.includes("colorful")
    ) {
      return {
        name: "Rainbow Celebration",
        primaryColor: "#EC4899",
        secondaryColor: "#8B5CF6",
        accentColor: "#F59E0B",
        effects: ["confetti", "bounce", "rainbow-gradient"],
        mood: "playful",
        description: "Vibrant colors with confetti and bouncing animations",
      };
    }

    // Corporate/Professional themes
    if (
      lower.includes("corporate") ||
      lower.includes("professional") ||
      lower.includes("business")
    ) {
      return {
        name: "Professional Edge",
        primaryColor: "#1E40AF",
        secondaryColor: "#64748B",
        accentColor: "#F8FAFC",
        effects: ["subtle-slide", "clean-transitions"],
        mood: "professional",
        description:
          "Clean blues and grays with smooth, professional animations",
      };
    }

    // Default modern theme
    return {
      name: "Modern Vibes",
      primaryColor: "#8B5CF6",
      secondaryColor: "#3B82F6",
      accentColor: "#F3F4F6",
      effects: ["gradient-shift", "smooth-transitions"],
      mood: "contemporary",
      description: "Purple and blue gradients with modern smooth effects",
    };
  };

  const regenerateTheme = () => {
    if (description.trim()) {
      generateTheme();
    }
  };

  const examplePrompts = [
    "Elegant winter wedding",
    "Fun tropical party",
    "Professional conference",
  ];

  return (
    <div className="space-y-4">
      <div className="mb-4 flex items-center gap-2">
        <Wand2 className="h-5 w-5 text-purple-600" />
        <h4 className="text-lg font-semibold text-gray-900">
          AI Theme Generator
        </h4>
        <Badge
          variant="secondary"
          className="bg-purple-100 text-xs text-purple-800"
        >
          Beta
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <div>
            <Label
              htmlFor="theme-description"
              className="text-sm font-medium text-gray-700"
            >
              Describe your ideal theme
            </Label>
            <Input
              id="theme-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Elegant winter wedding with gold accents..."
              className="mt-1"
              disabled={isGenerating}
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={generateTheme}
              disabled={isGenerating || !description.trim()}
              className="flex items-center gap-2"
              size="sm"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {isGenerating ? "Generating..." : "Generate"}
            </Button>

            {generatedTheme && (
              <Button
                variant="outline"
                onClick={regenerateTheme}
                disabled={isGenerating}
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Regenerate
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-500">Try:</span>
            {examplePrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs text-gray-600 hover:text-purple-600"
                onClick={() => setDescription(prompt)}
                disabled={isGenerating}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>

        {generatedTheme && (
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <h5 className="font-semibold">{generatedTheme.name}</h5>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-xs text-purple-800"
                >
                  Generated
                </Badge>
              </div>

              <p className="mb-3 text-sm text-gray-600">
                {generatedTheme.description}
              </p>

              <div className="space-y-2">
                <div>
                  <Label className="text-xs text-gray-500">Colors</Label>
                  <div className="mt-1 flex gap-2">
                    <div
                      className="h-6 w-6 rounded border-2 border-white shadow-sm"
                      style={{ backgroundColor: generatedTheme.primaryColor }}
                      title="Primary"
                    />
                    <div
                      className="h-6 w-6 rounded border-2 border-white shadow-sm"
                      style={{ backgroundColor: generatedTheme.secondaryColor }}
                      title="Secondary"
                    />
                    {generatedTheme.accentColor && (
                      <div
                        className="h-6 w-6 rounded border-2 border-white shadow-sm"
                        style={{ backgroundColor: generatedTheme.accentColor }}
                        title="Accent"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-gray-500">Effects</Label>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <Badge
                      variant="outline"
                      className="text-xs"
                    >
                      {generatedTheme.mood}
                    </Badge>
                    {generatedTheme.effects.slice(0, 2).map((effect, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs"
                      >
                        {effect}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AIThemeGenerator;
