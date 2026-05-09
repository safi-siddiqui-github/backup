"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Layout, Palette, Users } from "lucide-react";

interface VenueTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  capacity: string;
  features: string[];
  canvasData: string;
  preview: string;
}

interface VenueTemplatesProps {
  onSelectTemplate: (template: VenueTemplate) => void;
}

const VenueTemplates = ({ onSelectTemplate }: VenueTemplatesProps) => {
  const templates: VenueTemplate[] = [
    {
      id: "blank",
      name: "Blank Canvas",
      description:
        "Start with a completely blank canvas to design your unique venue layout",
      category: "Custom",
      capacity: "Any",
      features: ["Drawing Tools", "Shape Library", "Text Labels"],
      canvasData: "",
      preview: "🎨",
    },
    {
      id: "reception-hall",
      name: "Reception Hall",
      description:
        "Classic wedding reception layout with dance floor and dining area",
      category: "Wedding",
      capacity: "150-300",
      features: ["Dance Floor", "Head Table", "Guest Tables", "Bar Area"],
      canvasData:
        '{"version":"5.3.0","objects":[{"type":"rect","version":"5.3.0","originX":"left","originY":"top","left":150,"top":100,"width":200,"height":150,"fill":"transparent","stroke":"#3b82f6","strokeWidth":2}]}',
      preview: "💒",
    },
    {
      id: "cocktail-space",
      name: "Cocktail Reception",
      description:
        "Standing reception layout for networking and cocktail events",
      category: "Corporate",
      capacity: "50-150",
      features: [
        "Bar Stations",
        "Lounge Areas",
        "Standing Tables",
        "Networking Zones",
      ],
      canvasData:
        '{"version":"5.3.0","objects":[{"type":"circle","version":"5.3.0","originX":"left","originY":"top","left":100,"top":100,"radius":50,"fill":"transparent","stroke":"#16a34a","strokeWidth":2}]}',
      preview: "🍸",
    },
    {
      id: "conference-room",
      name: "Conference Center",
      description: "Professional meeting and conference room setup",
      category: "Corporate",
      capacity: "20-100",
      features: [
        "Presentation Stage",
        "Classroom Seating",
        "AV Equipment",
        "Breakout Areas",
      ],
      canvasData: '{"version":"5.3.0","objects":[]}',
      preview: "💼",
    },
    {
      id: "theater-style",
      name: "Theater Style",
      description: "Auditorium seating for presentations and performances",
      category: "Performance",
      capacity: "100-500",
      features: ["Tiered Seating", "Center Aisle", "Stage Area", "Sound Booth"],
      canvasData: '{"version":"5.3.0","objects":[]}',
      preview: "🎭",
    },
    {
      id: "banquet-hall",
      name: "Banquet Hall",
      description: "Formal dining setup for galas and special dinners",
      category: "Formal",
      capacity: "100-400",
      features: [
        "Round Tables",
        "Head Table",
        "Service Area",
        "Entertainment Space",
      ],
      canvasData: '{"version":"5.3.0","objects":[]}',
      preview: "🍽️",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Wedding":
        return "bg-pink-100 text-pink-700";
      case "Corporate":
        return "bg-blue-100 text-blue-700";
      case "Performance":
        return "bg-purple-100 text-purple-700";
      case "Formal":
        return "bg-amber-100 text-amber-700";
      case "Custom":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold">Venue Layout Templates</h2>
        <p className="text-muted-foreground">
          Choose a template to get started quickly, or start with a blank canvas
          for complete customization
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="cursor-pointer transition-shadow hover:shadow-lg"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="mb-2 text-4xl">{template.preview}</div>
                <Badge className={getCategoryColor(template.category)}>
                  {template.category}
                </Badge>
              </div>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription className="text-sm">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-muted-foreground flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {template.capacity}
                </div>
                <div className="flex items-center gap-1">
                  <Layout className="h-4 w-4" />
                  {template.features.length} features
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Key Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {template.features.slice(0, 3).map((feature, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs"
                    >
                      {feature}
                    </Badge>
                  ))}
                  {template.features.length > 3 && (
                    <Badge
                      variant="outline"
                      className="text-xs"
                    >
                      +{template.features.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <Button
                onClick={() => onSelectTemplate(template)}
                className="w-full"
                variant={template.id === "blank" ? "outline" : "default"}
              >
                {template.id === "blank" ? (
                  <>
                    <Palette className="mr-2 h-4 w-4" />
                    Start Drawing
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Use Template
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/30 border-dashed">
        <CardContent className="pt-6">
          <div className="space-y-2 text-center">
            <Layout className="text-muted-foreground mx-auto h-12 w-12" />
            <h3 className="font-semibold">Custom Templates Coming Soon</h3>
            <p className="text-muted-foreground text-sm">
              We&apos;re working on more specialized templates for different
              venue types. For now, you can create your own custom layouts using
              our drawing tools.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VenueTemplates;
