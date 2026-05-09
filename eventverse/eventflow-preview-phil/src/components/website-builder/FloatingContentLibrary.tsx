import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MousePointer, 
  Type, 
  Image, 
  Mail,
  Calendar,
  Users,
  CreditCard,
  MapPin,
  Clock,
  Star,
  Heart,
  Camera,
  MessageCircle,
  Phone,
  Share2,
  Bell,
  Play
} from "lucide-react";
import { SectionType } from "@/types/website";
import { DraggableLibraryItem } from "./DraggableLibraryItem";

interface FloatingBlock {
  id: string;
  name: string;
  icon: any;
  type: SectionType | 'widget';
  category: 'corners' | 'floating' | 'widgets' | 'overlay';
  description: string;
  defaultSize: { width: number; height: number };
}

interface FloatingContentLibraryProps {
  onAddFloatingSection: (blockType: SectionType, position: { x: number; y: number }) => void;
  onStartDrag?: (blockType: SectionType, event: React.MouseEvent) => void;
}

export const FloatingContentLibrary = ({ onAddFloatingSection, onStartDrag }: FloatingContentLibraryProps) => {
  const floatingBlocks: FloatingBlock[] = [
    // Corner Blocks
    {
      id: 'corner-contact',
      name: 'Contact Button',
      icon: Phone,
      type: 'contact',
      category: 'corners',
      description: 'Quick contact button for corners',
      defaultSize: { width: 120, height: 40 }
    },
    {
      id: 'corner-rsvp',
      name: 'RSVP Button',
      icon: Users,
      type: 'rsvp',
      category: 'corners',
      description: 'Quick RSVP access',
      defaultSize: { width: 100, height: 40 }
    },
    {
      id: 'corner-share',
      name: 'Share Widget',
      icon: Share2,
      type: 'text',
      category: 'corners',
      description: 'Social sharing buttons',
      defaultSize: { width: 150, height: 50 }
    },
    
    // Floating Content
    {
      id: 'floating-announcement',
      name: 'Announcement',
      icon: Bell,
      type: 'text',
      category: 'floating',
      description: 'Important announcement banner',
      defaultSize: { width: 300, height: 80 }
    },
    {
      id: 'floating-countdown',
      name: 'Mini Countdown',
      icon: Clock,
      type: 'countdown',
      category: 'floating',
      description: 'Compact countdown timer',
      defaultSize: { width: 200, height: 100 }
    },
    {
      id: 'floating-gallery',
      name: 'Photo Preview',
      icon: Camera,
      type: 'gallery',
      category: 'floating',
      description: 'Mini photo gallery',
      defaultSize: { width: 150, height: 150 }
    },
    
    // Widgets
    {
      id: 'widget-chat',
      name: 'Chat Bubble',
      icon: MessageCircle,
      type: 'text',
      category: 'widgets',
      description: 'Support chat widget',
      defaultSize: { width: 60, height: 60 }
    },
    {
      id: 'widget-video',
      name: 'Video Player',
      icon: Play,
      type: 'text',
      category: 'widgets',
      description: 'Floating video player',
      defaultSize: { width: 250, height: 140 }
    },
    {
      id: 'widget-map',
      name: 'Quick Map',
      icon: MapPin,
      type: 'map',
      category: 'widgets',
      description: 'Mini location map',
      defaultSize: { width: 200, height: 150 }
    },
    
    // Overlay Elements
    {
      id: 'overlay-tickets',
      name: 'Ticket Banner',
      icon: CreditCard,
      type: 'ticketing',
      category: 'overlay',
      description: 'Sticky ticket sales banner',
      defaultSize: { width: 400, height: 60 }
    },
    {
      id: 'overlay-schedule',
      name: 'Next Event',
      icon: Calendar,
      type: 'schedule',
      category: 'overlay',
      description: 'Upcoming event preview',
      defaultSize: { width: 250, height: 100 }
    }
  ];

  const categories = [
    { 
      id: 'corners', 
      name: 'Corner Elements', 
      icon: MousePointer,
      description: 'Perfect for top/bottom corners' 
    },
    { 
      id: 'floating', 
      name: 'Floating Content', 
      icon: Star,
      description: 'Positioned anywhere on screen' 
    },
    { 
      id: 'widgets', 
      name: 'Mini Widgets', 
      icon: Heart,
      description: 'Small interactive elements' 
    },
    { 
      id: 'overlay', 
      name: 'Overlay Banners', 
      icon: Bell,
      description: 'Sticky elements over content' 
    }
  ];

  const getCornerPresets = () => [
    { name: 'Top Left', x: 20, y: 20 },
    { name: 'Top Right', x: window.innerWidth - 200, y: 20 },
    { name: 'Bottom Left', x: 20, y: window.innerHeight - 100 },
    { name: 'Bottom Right', x: window.innerWidth - 200, y: window.innerHeight - 100 }
  ];

  const handleAddBlock = (block: FloatingBlock, cornerPosition?: { x: number; y: number }) => {
    // Use corner position if provided, otherwise center of screen
    const position = cornerPosition || { 
      x: Math.max(100, (window.innerWidth / 2) - (block.defaultSize.width / 2)), 
      y: Math.max(100, (window.innerHeight / 2) - (block.defaultSize.height / 2))
    };

    if (block.type !== 'widget') {
      onAddFloatingSection(block.type as SectionType, position);
    }
  };

  return (
    <div className="space-y-6 max-h-screen overflow-y-auto">
      <div>
        <h3 className="font-semibold mb-2">Floating & Corner Elements</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add elements that can be positioned anywhere on the canvas
        </p>
      </div>

      {/* Quick Corner Placement */}
      <Card className="p-4 bg-gradient-to-r from-violet-50 to-blue-50 border-violet-200">
        <div className="mb-3">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <MousePointer className="w-4 h-4" />
            Quick Corner Placement
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {getCornerPresets().map(corner => (
            <Button
              key={corner.name}
              variant="outline"
              size="sm"
              className="text-xs h-8"
              onClick={() => {
                const contactBlock = floatingBlocks.find(b => b.id === 'corner-contact');
                if (contactBlock) {
                  handleAddBlock(contactBlock, corner);
                }
              }}
            >
              {corner.name}
            </Button>
          ))}
        </div>
      </Card>

      {/* Category Sections */}
      {categories.map(category => {
        const blocks = floatingBlocks.filter(block => block.category === category.id);
        
        return (
          <div key={category.id}>
            <div className="flex items-center gap-2 mb-3">
              <category.icon className="w-4 h-4 text-muted-foreground" />
              <div>
                <h4 className="font-medium text-sm">{category.name}</h4>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {blocks.map(block => (
                <DraggableLibraryItem
                  key={block.id}
                  block={block}
                  category={category}
                  onAddBlock={handleAddBlock}
                  onStartDrag={onStartDrag}
                />
              ))}
            </div>
          </div>
        );
      })}

      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground leading-relaxed">
          💡 <strong>Pro Tips:</strong>
          <br />• Click any block to place it at screen center
          <br />• Use corner presets for quick positioning
          <br />• Drag elements after placing to fine-tune position
          <br />• Floating elements work great for call-to-actions and widgets
        </p>
      </div>
    </div>
  );
};