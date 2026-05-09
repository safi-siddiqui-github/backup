"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUnifiedDrag } from "@/hooks/useUnifiedDrag";
import {
  Coordinates,
  Page,
  Section,
  SectionType,
  Website,
} from "@/types/website";
import { Grid, Trash2, ZoomIn, ZoomOut } from "lucide-react";
import { RefObject, useCallback, useRef, useState } from "react";
import { DragPreview } from "./DragPreview";
import { DropZones } from "./DropZones";
import { FloatingSection } from "./FloatingSection";

interface CanvasPreviewProps {
  website: Website;
  page: Page;
  device: "desktop" | "tablet" | "mobile";
  selectedSection: string | null;
  onSectionSelect: (sectionId: string | null) => void;
  onSectionUpdate: (sectionId: string, updates: Partial<Section>) => void;
  onSectionDelete: (sectionId: string) => void;
  onSectionCreate?: (
    sectionType: SectionType,
    coordinates: Coordinates,
    content?: unknown,
  ) => void;
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
  editMode,
}: CanvasPreviewProps) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);

  const canvasRef = useRef<HTMLElement | null>(null);

  const { dragState, dropZones, startSectionDrag, showGuides, gridSize } =
    useUnifiedDrag({
      canvasRef,
      gridSize: 20,
      snapToGrid: true,
      showGuides: showGrid,
      onSectionUpdate,
      onSectionCreate,
    });

  const getDeviceClass = () => {
    switch (device) {
      case "mobile":
        return "w-[375px] h-[667px]";
      case "tablet":
        return "w-[768px] h-[1024px]";
      default:
        return "w-[1200px] h-[800px] min-h-screen";
    }
  };

  const getSectionStyle = (section: Section) => {
    const style: React.CSSProperties = {};

    // Apply positioning if it exists
    if (
      section.positioning?.type === "absolute" ||
      section.positioning?.isFloating
    ) {
      const coords = section.positioning.coordinates;
      style.position = "absolute";
      style.left = coords.x;
      style.top = coords.y;
      style.width = coords.width || "auto";
      style.height = coords.height || "auto";
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
      style.backgroundSize = section.styling.backgroundSize || "cover";
      style.backgroundPosition = section.styling.backgroundPosition || "center";
      style.backgroundRepeat = "no-repeat";
    }

    if (section.styling?.borderRadius) {
      style.borderRadius = section.styling.borderRadius;
    }

    return style;
  };

  const handleSectionMouseDown = useCallback(
    (e: React.MouseEvent, section: Section) => {
      if (!editMode) return;
      e.stopPropagation();
      startSectionDrag(section, e, "reposition-section");
    },
    [editMode, startSectionDrag],
  );

  const renderSection = (section: Section) => {
    const isSelected = selectedSection === section.id;
    const isHovered = hoveredSection === section.id;
    const showControls = editMode && (isSelected || isHovered);
    const isFloating = section.positioning?.isFloating;
    const isDragging =
      dragState.isDragging && dragState.draggedSection?.id === section.id;

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
        className={`relative ${editMode ? "cursor-pointer" : ""} ${
          isSelected ? "ring-2 ring-violet-500 ring-offset-2" : ""
        } ${isHovered && editMode ? "ring-1 ring-violet-300" : ""} ${isDragging ? "opacity-50" : ""}`}
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
          <div className="absolute -top-8 left-0 z-50 flex gap-1 rounded-md border bg-white p-1 shadow-md">
            <Badge
              variant="outline"
              className="text-xs"
            >
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
              <Trash2 className="h-3 w-3" />
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
        case "hero":
          return (
            <div className="p-2 text-center">
              <h3 className="mb-1 truncate text-sm font-bold">
                {section.content.title || "Hero Section"}
              </h3>
              {section.content.subtitle && (
                <p className="text-muted-foreground mb-2 line-clamp-2 text-xs">
                  {section.content.subtitle}
                </p>
              )}
              {section.content.buttons &&
                section.content.buttons.length > 0 && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                  >
                    {section.content.buttons[0].text}
                  </Button>
                )}
            </div>
          );

        case "contact":
        case "rsvp":
          return (
            <div className="p-2">
              <h4 className="mb-2 text-sm font-medium">
                {section.content.title || "Form"}
              </h4>
              <div className="space-y-1">
                <div className="bg-muted flex h-6 items-center rounded px-2 text-xs">
                  Name
                </div>
                <div className="bg-muted flex h-6 items-center rounded px-2 text-xs">
                  Email
                </div>
                <Button
                  size="sm"
                  className="w-full text-xs"
                >
                  Submit
                </Button>
              </div>
            </div>
          );

        case "countdown":
          return (
            <div className="p-2 text-center">
              <h4 className="mb-2 text-sm font-medium">
                {section.content.title || "Countdown"}
              </h4>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div className="bg-muted rounded p-1">
                  12
                  <br />
                  Days
                </div>
                <div className="bg-muted rounded p-1">
                  05
                  <br />
                  Hours
                </div>
              </div>
            </div>
          );

        case "gallery":
          return (
            <div className="p-2">
              <h4 className="mb-2 text-sm font-medium">
                {section.content.title || "Gallery"}
              </h4>
              <div className="grid grid-cols-2 gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-muted aspect-square rounded"
                  ></div>
                ))}
              </div>
            </div>
          );

        case "map":
          return (
            <div className="p-2 text-center">
              <h4 className="mb-2 text-sm font-medium">
                {section.content.title || "Location"}
              </h4>
              <div className="bg-muted flex aspect-video items-center justify-center rounded">
                <span className="text-muted-foreground text-xs">Map View</span>
              </div>
            </div>
          );

        default:
          return (
            <div className="p-2">
              <h4 className="mb-1 text-sm font-medium">
                {section.content.title || section.type}
              </h4>
              <p className="text-muted-foreground line-clamp-3 text-xs">
                {section.content.description ||
                  section.content.content ||
                  "Click to edit content"}
              </p>
            </div>
          );
      }
    }

    // Full content rendering for regular sections (keep existing logic)
    switch (section.type) {
      case "hero":
        return (
          <div className="relative min-h-[300px] px-8 py-20 text-center">
            {section.content.title && (
              <h1 className="mb-4 text-4xl font-bold">
                {section.content.title}
              </h1>
            )}
            {section.content.subtitle && (
              <h2 className="mb-6 text-xl opacity-90">
                {section.content.subtitle}
              </h2>
            )}
            {section.content.description && (
              <p className="mx-auto mb-8 max-w-2xl text-lg opacity-80">
                {section.content.description}
              </p>
            )}
          </div>
        );

      case "text":
      case "about":
        return (
          <div className="px-8 py-8">
            {section.content.title && (
              <h2 className="mb-4 text-2xl font-bold">
                {section.content.title}
              </h2>
            )}
            {section.content.description && (
              <p className="text-muted-foreground">
                {section.content.description}
              </p>
            )}
            {section.content.content && (
              <div className="prose mt-4">
                <p>{section.content.content}</p>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="bg-muted/50 flex min-h-[120px] items-center justify-center px-8 py-8">
            <div className="text-center">
              <div className="font-medium">
                {section.type.charAt(0).toUpperCase() + section.type.slice(1)}{" "}
                Section
              </div>
              <div className="text-muted-foreground mt-1 text-sm">
                Click to edit content
              </div>
            </div>
          </div>
        );
    }
  };

  // Separate floating and static sections
  const staticSections = page.sections.filter(
    (section) => !section.positioning?.isFloating,
  );
  const floatingSections = page.sections.filter(
    (section) => section.positioning?.isFloating,
  );

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
            <Grid className={`h-4 w-4 ${showGrid ? "text-violet-600" : ""}`} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom((prev) => Math.min(prev + 0.1, 2))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom((prev) => Math.max(prev - 0.1, 0.5))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Main Canvas */}
      <div
        ref={canvasRef as RefObject<HTMLDivElement>}
        className={`border-muted relative mx-auto border-2 ${getDeviceClass()} bg-background overflow-auto`}
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top center",
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
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
              `,
              backgroundSize: `${gridSize}px ${gridSize}px`,
            }}
          />
        )}

        {/* Drop Zones */}
        <DropZones
          zones={dropZones}
          isVisible={editMode && dragState.isDragging}
        />

        {/* Static Sections */}
        <div className="relative">
          {staticSections
            .sort((a, b) => a.order - b.order)
            .map((section) => renderSection(section))}
        </div>

        {/* Floating Sections */}
        {floatingSections.map((section) => renderSection(section))}

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
          <div className="flex h-full items-center justify-center p-8 text-center">
            <div>
              <div className="text-muted-foreground mb-2">
                Your canvas is empty
              </div>
              <div className="text-muted-foreground text-sm">
                Add content blocks from the sidebar to get started
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
