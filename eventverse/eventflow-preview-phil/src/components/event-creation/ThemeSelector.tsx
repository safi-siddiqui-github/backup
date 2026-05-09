
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventFormData } from "../EnhancedEventCreationDialog";

const themeTemplates = [
  { 
    id: "modern", 
    name: "Modern Minimal", 
    colors: ["#8B5CF6", "#3B82F6"], 
    preview: "Clean lines, bold typography",
    recommended: true
  },
  { 
    id: "elegant", 
    name: "Elegant Gold", 
    colors: ["#F59E0B", "#1F2937"], 
    preview: "Classic sophistication" 
  },
  { 
    id: "vibrant", 
    name: "Vibrant Sunset", 
    colors: ["#EF4444", "#F97316"], 
    preview: "Energetic and bold" 
  },
  { 
    id: "nature", 
    name: "Nature Green", 
    colors: ["#10B981", "#059669"], 
    preview: "Fresh and organic" 
  },
  { 
    id: "ocean", 
    name: "Ocean Blue", 
    colors: ["#3B82F6", "#1E40AF"], 
    preview: "Calm and professional" 
  }
];

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
}

const ThemeSelector = ({ formData, onUpdate }: Props) => {
  const applyThemeTemplate = (template: typeof themeTemplates[0]) => {
    onUpdate({
      theme: {
        ...formData.theme,
        primaryColor: template.colors[0],
        secondaryColor: template.colors[1],
        template: template.id
      }
    });
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold flex items-center gap-2">
        <Palette className="w-4 h-4" />
        Choose Theme
      </Label>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {themeTemplates.map((template) => (
          <Card
            key={template.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              formData.theme.template === template.id 
                ? "border-purple-500 bg-purple-50" 
                : "hover:border-gray-300"
            )}
            onClick={() => applyThemeTemplate(template)}
          >
            <CardContent className="p-4">
              <div className="flex gap-2 mb-2">
                {template.colors.map((color, index) => (
                  <div 
                    key={index}
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm" 
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="font-medium text-sm">{template.name}</p>
              <p className="text-xs text-gray-600">{template.preview}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
