import { Section } from "@/types/website";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DragPreviewProps {
  section: Section;
  position: { x: number; y: number };
  isVisible: boolean;
  opacity?: number;
}

export const DragPreview = ({ 
  section, 
  position, 
  isVisible, 
  opacity = 0.7 
}: DragPreviewProps) => {
  if (!isVisible) return null;

  const renderPreviewContent = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="p-3 text-center">
            <h4 className="text-sm font-bold mb-1 truncate">
              {section.content.title || 'Hero Section'}
            </h4>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {section.content.subtitle || 'Hero subtitle'}
            </p>
          </div>
        );
      
      case 'contact':
      case 'rsvp':
        return (
          <div className="p-3">
            <h4 className="text-sm font-medium mb-2">
              {section.content.title || 'Form'}
            </h4>
            <div className="space-y-1">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-6 bg-primary/20 rounded text-xs flex items-center justify-center">
                Submit
              </div>
            </div>
          </div>
        );
      
      case 'countdown':
        return (
          <div className="p-3 text-center">
            <h4 className="text-sm font-medium mb-2">
              {section.content.title || 'Countdown'}
            </h4>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div className="bg-muted rounded p-1">12<br/>Days</div>
              <div className="bg-muted rounded p-1">05<br/>Hours</div>
            </div>
          </div>
        );
      
      case 'gallery':
        return (
          <div className="p-3">
            <h4 className="text-sm font-medium mb-2">
              {section.content.title || 'Gallery'}
            </h4>
            <div className="grid grid-cols-2 gap-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-muted rounded"></div>
              ))}
            </div>
          </div>
        );
      
      case 'map':
        return (
          <div className="p-3 text-center">
            <h4 className="text-sm font-medium mb-2">
              {section.content.title || 'Location'}
            </h4>
            <div className="aspect-video bg-muted rounded flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Map View</span>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-3">
            <h4 className="text-sm font-medium mb-1">
              {section.content.title || section.type}
            </h4>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {section.content.description || section.content.content || 'Content preview'}
            </p>
          </div>
        );
    }
  };

  return (
    <Card
      className="pointer-events-none border-2 border-dashed border-violet-400 bg-white/90 shadow-2xl"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: section.positioning?.coordinates.width || 200,
        height: section.positioning?.coordinates.height || 100,
        opacity,
        zIndex: 9999,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {/* Preview Header */}
      <div className="flex items-center justify-between p-2 bg-violet-100 border-b">
        <Badge variant="outline" className="text-xs">
          {section.type}
        </Badge>
        <span className="text-xs text-violet-600 font-medium">
          Dragging...
        </span>
      </div>
      
      {/* Preview Content */}
      <div className="flex-1 overflow-hidden">
        {renderPreviewContent()}
      </div>
    </Card>
  );
};