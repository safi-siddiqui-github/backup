import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Website, Page, Section } from "@/types/website";
import { SectionRenderer } from "./SectionRenderer";
import { StickyHeader } from './StickyHeader';

interface WebsitePreviewProps {
  website: Website;
  page: Page;
  device: 'desktop' | 'tablet' | 'mobile';
  selectedSection: string | null;
  onSectionSelect: (sectionId: string | null) => void;
  onSectionReorder: (startIndex: number, endIndex: number) => void;
  onPageChange?: (pageId: string) => void;
  editMode: boolean;
}

export const WebsitePreview = ({ 
  website, 
  page, 
  device, 
  selectedSection, 
  onSectionSelect, 
  onSectionReorder,
  onPageChange,
  editMode 
}: WebsitePreviewProps) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const getDeviceClass = () => {
    switch (device) {
      case 'mobile': return 'max-w-sm mx-auto';
      case 'tablet': return 'max-w-2xl mx-auto';
      default: return 'w-full';
    }
  };

  const getSectionStyle = (section: Section) => {
    const style: React.CSSProperties = {};
    
    if (section.styling?.backgroundColor) {
      if (section.styling.backgroundColor.includes('hsl(var(')) {
        // Handle CSS variables
        style.backgroundColor = section.styling.backgroundColor;
      } else {
        style.backgroundColor = section.styling.backgroundColor;
      }
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

  const renderSection = (section: Section) => {
    const isSelected = selectedSection === section.id;
    const isHovered = hoveredSection === section.id;
    const showControls = editMode && (isSelected || isHovered);

    return (
      <div
        key={section.id}
        className={`relative ${editMode ? 'cursor-pointer' : ''} ${
          isSelected ? 'ring-2 ring-violet-500 ring-offset-2' : ''
        } ${isHovered && editMode ? 'ring-1 ring-violet-300' : ''} scroll-mt-20`}
        style={getSectionStyle(section)}
        onClick={(e) => {
          if (editMode) {
            e.stopPropagation();
            onSectionSelect(section.id);
          }
        }}
        onMouseEnter={() => editMode && setHoveredSection(section.id)}
        onMouseLeave={() => editMode && setHoveredSection(null)}
      >
        {/* Section Controls */}
        {showControls && (
          <div className="absolute top-2 right-2 flex gap-1 z-10 bg-white rounded-md shadow-md p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = page.sections.findIndex(s => s.id === section.id);
                if (currentIndex > 0) {
                  onSectionReorder(currentIndex, currentIndex - 1);
                }
              }}
              disabled={page.sections.findIndex(s => s.id === section.id) === 0}
            >
              <ArrowUp className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = page.sections.findIndex(s => s.id === section.id);
                if (currentIndex < page.sections.length - 1) {
                  onSectionReorder(currentIndex, currentIndex + 1);
                }
              }}
              disabled={page.sections.findIndex(s => s.id === section.id) === page.sections.length - 1}
            >
              <ArrowDown className="w-3 h-3" />
            </Button>
          </div>
        )}

        {/* Section Content */}
        <SectionRenderer section={section} />
      </div>
    );
  };

  return (
    <div className={`mx-auto bg-background transition-all duration-300 ${getDeviceClass()}`}>
      {/* Sticky Header */}
      <StickyHeader
        website={website}
        pages={website.pages}
        currentPage={page}
        onPageChange={onPageChange}
        isEditMode={editMode}
      />
      
      {/* Main Content with proper scroll offset for sticky header */}
      <div className="scroll-mt-16">
        {page.sections.length > 0 ? (
          page.sections
            .sort((a, b) => a.order - b.order)
            .map((section) => renderSection(section))
        ) : (
          <div className="flex items-center justify-center h-96 text-muted-foreground">
            <div className="text-center">
              <p className="text-lg mb-2">No sections added yet</p>
              <p className="text-sm">Add sections from the content library to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};