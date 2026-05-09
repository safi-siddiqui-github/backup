import { useState, useCallback, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Edit, 
  Trash2, 
  Move,
  Layers,
  Grid,
  Settings,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import { Website, Page, Section, SectionType, Coordinates } from "@/types/website";
import { useUnifiedDrag } from "@/hooks/useUnifiedDrag";
import { FloatingSection } from "./FloatingSection";
import { DragPreview } from "./DragPreview";
import { DropZones } from "./DropZones";
import { toast } from "sonner";

interface CanvasPreviewProps {
  website: Website;
  page: Page;
  device: 'desktop' | 'tablet' | 'mobile';
  selectedSection: string | null;
  onSectionSelect: (sectionId: string | null) => void;
  onSectionUpdate: (sectionId: string, updates: Partial<Section>) => void;
  onSectionDelete: (sectionId: string) => void;
  onSectionCreate?: (sectionType: SectionType, coordinates: Coordinates, content?: any) => void;
  editMode: boolean;
}

export const CanvasPreview = ({ 
  website, 
  page, 
  device, 
  selectedSection, 
  onSectionSelect, 
  onSectionUpdate,
  onSectionDelete,
  onSectionCreate,
  editMode 
}: CanvasPreviewProps) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const {
    dragState,
    dropZones,
    startSectionDrag,
    showGuides,
    gridSize
  } = useUnifiedDrag({
    canvasRef,
    gridSize: 20,
    snapToGrid: true,
    showGuides: showGrid,
    onSectionUpdate,
    onSectionCreate
  });

  const getDeviceClass = () => {
    switch (device) {
      case 'mobile': return 'w-[375px] h-[667px]';
      case 'tablet': return 'w-[768px] h-[1024px]';
      default: return 'w-[1200px] h-[800px] min-h-screen';
    }
  };

  const getSectionStyle = (section: Section) => {
    const style: React.CSSProperties = {};
    
    // Apply positioning if it exists
    if (section.positioning?.type === 'absolute' || section.positioning?.isFloating) {
      const coords = section.positioning.coordinates;
      style.position = 'absolute';
      style.left = coords.x;
      style.top = coords.y;
      style.width = coords.width || 'auto';
      style.height = coords.height || 'auto';
      style.zIndex = section.positioning.zIndex;
    }
    
    // Apply styling
    if (section.styling?.backgroundColor) {
      style.backgroundColor = section.styling.backgroundColor;
    }
    
    if (section.styling?.textColor) {
      style.color = section.styling.textColor;
    }
    
    if (section.styling?.padding) {
      style.padding = section.styling.padding;
    }
    
    if (section.styling?.backgroundImage) {
      style.backgroundImage = `url(${section.styling.backgroundImage})`;
      style.backgroundSize = section.styling.backgroundSize || 'cover';
      style.backgroundPosition = section.styling.backgroundPosition || 'center';
      style.backgroundRepeat = 'no-repeat';
    }
    
    if (section.styling?.borderRadius) {
      style.borderRadius = section.styling.borderRadius;
    }

    return style;
  };

  const handleSectionMouseDown = useCallback((e: React.MouseEvent, section: Section) => {
    if (!editMode) return;
    e.stopPropagation();
    startSectionDrag(section, e, 'reposition-section');
  }, [editMode, startSectionDrag]);

  const renderSection = (section: Section) => {
    const isSelected = selectedSection === section.id;
    const isHovered = hoveredSection === section.id;
    const showControls = editMode && (isSelected || isHovered);
    const isFloating = section.positioning?.isFloating;
    const isDragging = dragState.isDragging && dragState.draggedSection?.id === section.id;

    // If it's a floating section, use the FloatingSection component
    if (isFloating) {
      return (
        <FloatingSection
          key={section.id}
          section={section}
          isSelected={isSelected}
          editMode={editMode}
          onSelect={onSectionSelect}
          onUpdate={onSectionUpdate}
          onDelete={onSectionDelete}
        >
          {renderSectionContent(section)}
        </FloatingSection>
      );
    }

    // Regular section rendering for non-floating sections
    return (
      <div
        key={section.id}
        className={`relative ${editMode ? 'cursor-pointer' : ''} ${
          isSelected ? 'ring-2 ring-violet-500 ring-offset-2' : ''
        } ${isHovered && editMode ? 'ring-1 ring-violet-300' : ''} ${isDragging ? 'opacity-50' : ''}`}
        style={getSectionStyle(section)}
        onClick={(e) => {
          if (editMode) {
            e.stopPropagation();
            onSectionSelect(section.id);
          }
        }}
        onMouseDown={(e) => handleSectionMouseDown(e, section)}
        onMouseEnter={() => editMode && setHoveredSection(section.id)}
        onMouseLeave={() => editMode && setHoveredSection(null)}
      >
        {/* Section Controls for regular sections */}
        {showControls && !isFloating && (
          <div className="absolute -top-8 left-0 flex gap-1 z-50 bg-white rounded-md shadow-md p-1 border">
            <Badge variant="outline" className="text-xs">
              {section.type}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onSectionDelete(section.id);
              }}
              className="h-6 w-6 p-0"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}

        {/* Section Content */}
        {renderSectionContent(section)}
      </div>
    );
  };

  const renderSectionContent = (section: Section) => {
    // Enhanced content rendering for floating sections
    if (section.positioning?.isFloating) {
      // Provide a more compact but functional preview for floating sections
      switch (section.type) {
        case 'hero':
          return (
            <div className="text-center p-2">
              <h3 className="text-sm font-bold mb-1 truncate">{section.content.title || 'Hero Section'}</h3>
              {section.content.subtitle && (
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{section.content.subtitle}</p>
              )}
              {section.content.buttons && section.content.buttons.length > 0 && (
                <Button size="sm" variant="outline" className="text-xs">
                  {section.content.buttons[0].text}
                </Button>
              )}
            </div>
          );
        
        case 'contact':
        case 'rsvp':
          return (
            <div className="p-2">
              <h4 className="text-sm font-medium mb-2">{section.content.title || 'Form'}</h4>
              <div className="space-y-1">
                <div className="h-6 bg-muted rounded text-xs flex items-center px-2">Name</div>
                <div className="h-6 bg-muted rounded text-xs flex items-center px-2">Email</div>
                <Button size="sm" className="w-full text-xs">Submit</Button>
              </div>
            </div>
          );
        
        case 'countdown':
          return (
            <div className="text-center p-2">
              <h4 className="text-sm font-medium mb-2">{section.content.title || 'Countdown'}</h4>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div className="bg-muted rounded p-1">12<br/>Days</div>
                <div className="bg-muted rounded p-1">05<br/>Hours</div>
              </div>
            </div>
          );
        
        case 'gallery':
          return (
            <div className="p-2">
              <h4 className="text-sm font-medium mb-2">{section.content.title || 'Gallery'}</h4>
              <div className="grid grid-cols-2 gap-1">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-square bg-muted rounded"></div>
                ))}
              </div>
            </div>
          );
        
        case 'map':
          return (
            <div className="p-2 text-center">
              <h4 className="text-sm font-medium mb-2">{section.content.title || 'Location'}</h4>
              <div className="aspect-video bg-muted rounded flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Map View</span>
              </div>
            </div>
          );
        
        default:
          return (
            <div className="p-2">
              <h4 className="text-sm font-medium mb-1">{section.content.title || section.type}</h4>
              <p className="text-xs text-muted-foreground line-clamp-3">
                {section.content.description || section.content.content || 'Click to edit content'}
              </p>
            </div>
          );
      }
    }

    // Full content rendering for regular sections (keep existing logic)
    switch (section.type) {
      case 'hero':
        return (
          <div className="py-20 px-8 text-center relative min-h-[300px]">
            {section.content.title && (
              <h1 className="text-4xl font-bold mb-4">{section.content.title}</h1>
            )}
            {section.content.subtitle && (
              <h2 className="text-xl mb-6 opacity-90">{section.content.subtitle}</h2>
            )}
            {section.content.description && (
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-80">{section.content.description}</p>
            )}
          </div>
        );
      
      case 'text':
      case 'about':
        return (
          <div className="py-8 px-8">
            {section.content.title && (
              <h2 className="text-2xl font-bold mb-4">{section.content.title}</h2>
            )}
            {section.content.description && (
              <p className="text-muted-foreground">{section.content.description}</p>
            )}
            {section.content.content && (
              <div className="mt-4 prose">
                <p>{section.content.content}</p>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="py-8 px-8 min-h-[120px] flex items-center justify-center bg-muted/50">
            <div className="text-center">
              <div className="font-medium">{section.type.charAt(0).toUpperCase() + section.type.slice(1)} Section</div>
              <div className="text-sm text-muted-foreground mt-1">Click to edit content</div>
            </div>
          </div>
        );
    }
  };

  // Separate floating and static sections
  const staticSections = page.sections.filter(section => !section.positioning?.isFloating);
  const floatingSections = page.sections.filter(section => section.positioning?.isFloating);

  return (
    <div className="relative overflow-hidden">
      {/* Canvas Controls */}
      {editMode && (
        <div className="absolute top-4 right-4 z-40 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowGrid(!showGrid)}
          >
            <Grid className={`w-4 h-4 ${showGrid ? 'text-violet-600' : ''}`} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="outline" 
            size="sm"
            onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Main Canvas */}
      <div 
        ref={canvasRef}
        className={`relative mx-auto border-2 border-muted ${getDeviceClass()} bg-background overflow-auto`}
        style={{ 
          transform: `scale(${zoom})`,
          transformOrigin: 'top center'
        }}
        onClick={(e) => {
          if (editMode) {
            onSectionSelect(null);
          }
        }}
      >
        {/* Grid Overlay */}
        {editMode && showGrid && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
              `,
              backgroundSize: `${gridSize}px ${gridSize}px`
            }}
          />
        )}

        {/* Drop Zones */}
        <DropZones zones={dropZones} isVisible={editMode && dragState.isDragging} />

        {/* Static Sections */}
        <div className="relative">
          {staticSections
            .sort((a, b) => a.order - b.order)
            .map(section => renderSection(section))
          }
        </div>

        {/* Floating Sections */}
        {floatingSections.map(section => renderSection(section))}

        {/* Drag Preview */}
        {dragState.isDragging && dragState.draggedSection && (
          <DragPreview
            section={dragState.draggedSection}
            position={dragState.currentPosition}
            isVisible={true}
            opacity={0.8}
          />
        )}
        
        {/* Empty State */}
        {page.sections.length === 0 && (
          <div className="flex items-center justify-center h-full text-center p-8">
            <div>
              <div className="text-muted-foreground mb-2">Your canvas is empty</div>
              <div className="text-sm text-muted-foreground">
                Add content blocks from the sidebar to get started
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};