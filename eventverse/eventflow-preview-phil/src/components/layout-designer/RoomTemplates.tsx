import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RoomTemplate {
  id: string;
  name: string;
  description: string;
  category: 'dining' | 'conference' | 'event' | 'hospitality';
  layout: any;
  preview: string;
}

const ROOM_TEMPLATES: RoomTemplate[] = [
  {
    id: 'ballroom',
    name: 'Grand Ballroom',
    description: 'Large event space with stage area',
    category: 'event',
    layout: {
      walls: [
        {
          id: 'wall-1',
          type: 'exterior',
          points: [
            { x: 100, y: 100 },
            { x: 800, y: 100 },
            { x: 800, y: 600 },
            { x: 100, y: 600 },
            { x: 100, y: 100 }
          ],
          thickness: 12,
          color: 'hsl(var(--foreground))'
        }
      ],
      rooms: [
        {
          id: 'room-1',
          name: 'Grand Ballroom',
          type: 'ballroom',
          walls: ['wall-1'],
          area: 3500,
          color: 'hsl(var(--primary))',
          capacity: 400
        }
      ],
      elements: [
        {
          id: 'stage-1',
          type: 'stage',
          x: 650,
          y: 150,
          width: 100,
          height: 80,
          rotation: 0
        }
      ]
    },
    preview: '🏛️'
  },
  {
    id: 'conference-room',
    name: 'Conference Room',
    description: 'Professional meeting space',
    category: 'conference',
    layout: {
      walls: [
        {
          id: 'wall-1',
          type: 'interior',
          points: [
            { x: 200, y: 200 },
            { x: 600, y: 200 },
            { x: 600, y: 400 },
            { x: 200, y: 400 },
            { x: 200, y: 200 }
          ],
          thickness: 6,
          color: 'hsl(var(--muted-foreground))'
        }
      ],
      rooms: [
        {
          id: 'room-1',
          name: 'Conference Room',
          type: 'conference',
          walls: ['wall-1'],
          area: 800,
          color: 'hsl(var(--primary))',
          capacity: 20
        }
      ],
      elements: [
        {
          id: 'door-1',
          type: 'door',
          x: 380,
          y: 195,
          width: 40,
          height: 10,
          rotation: 0
        }
      ]
    },
    preview: '🏢'
  }
];

interface RoomTemplatesProps {
  onSelectTemplate: (template: RoomTemplate) => void;
  onClose: () => void;
}

const RoomTemplates = ({ onSelectTemplate, onClose }: RoomTemplatesProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-auto m-4">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Room Templates</h2>
              <p className="text-sm text-muted-foreground">Choose a template to start with</p>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROOM_TEMPLATES.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{template.preview}</span>
                    <div>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {template.category} • {template.layout.rooms[0]?.capacity} capacity
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {template.description}
                  </p>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => onSelectTemplate(template)}
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomTemplates;