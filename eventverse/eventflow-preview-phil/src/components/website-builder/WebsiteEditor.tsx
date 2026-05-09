import { useState, useCallback, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Layout, 
  Eye, 
  Settings, 
  Smartphone, 
  Monitor, 
  Tablet,
  Save,
  Undo,
  Redo,
  Plus,
  Edit,
  MousePointer,
  Palette,
  Check,
  X
} from "lucide-react";
import { useWebsiteBuilder } from "@/hooks/useWebsiteBuilder";
import { SectionType, Coordinates } from "@/types/website";
import { ContentBlockLibrary } from "./ContentBlockLibrary";
import { SectionEditor } from "./SectionEditor";
import { FloatingSectionEditor } from "./FloatingSectionEditor";
import { Website, Page } from "@/types/website";
import { SectionRenderer } from "./SectionRenderer";
import { DraggableSection } from "./DraggableSection";
import { useSectionDragHandler } from "./SectionDragHandler";
import { FloatingContentLibrary } from "./FloatingContentLibrary";
import { ThemeEditor } from "./ThemeEditor";
import { PageNavigationTabs } from "./PageNavigationTabs";
import { AddPageDialog } from "./AddPageDialog";
import { toast } from "sonner";

interface WebsiteEditorProps {
  eventId?: string;
  websiteId?: string;
  onBack: () => void;
}

import { StickyHeader } from './StickyHeader';

export const WebsiteEditor = ({ eventId, websiteId, onBack }: WebsiteEditorProps) => {
  console.log("WebsiteEditor component loaded", { eventId, websiteId });
  
  const {
    currentWebsite,
    currentPage,
    selectedSection,
    isPreviewMode,
    previewDevice,
    setSelectedSection,
    setIsPreviewMode,
    setPreviewDevice,
    addSection,
    updateSection,
    deleteSection,
    reorderSections,
    updateTheme,
    updateWebsite,
    addPage,
    deletePage,
    duplicatePage,
    switchToPage,
  } = useWebsiteBuilder(eventId, websiteId);

  console.log("WebsiteEditor state:", { 
    currentWebsite: currentWebsite?.name, 
    currentPage: currentPage?.name,
    hasWebsite: !!currentWebsite 
  });

  const [activeTab, setActiveTab] = useState('content');
  const [canvasMode, setCanvasMode] = useState(false);
  const [floatingEditorPosition, setFloatingEditorPosition] = useState<{ x: number; y: number } | null>(null);
  const [showAddPageDialog, setShowAddPageDialog] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(currentWebsite?.name || '');
  const contentContainerRef = useRef<HTMLDivElement>(null);
  
  // Drag and drop functionality for section reordering
  const {
    dragState,
    handleDragStart,
    handleDragOver,
    handleDrop,
    resetDragState
  } = useSectionDragHandler(reorderSections);

  // All hooks must be called before any early returns
  const handleSave = () => {
    toast.success('Website saved successfully!');
  };

  const handleCreatePage = (name: string, path: string, template?: string) => {
    addPage(name, path);
  };

  const handleEditName = () => {
    setIsEditingName(true);
    setEditedName(currentWebsite?.name || '');
  };

  const handleSaveName = () => {
    if (editedName.trim() && currentWebsite) {
      const updatedWebsite = { ...currentWebsite, name: editedName.trim() };
      updateWebsite(updatedWebsite);
      setIsEditingName(false);
      toast.success('Website name updated!');
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setEditedName(currentWebsite?.name || '');
  };

  // Simplified floating section creation for better reliability
  const createFloatingSection = useCallback((sectionType: SectionType, coordinates: Coordinates, content?: any) => {
    const sectionContent = content || {
      title: `${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)} Content`,
      description: 'Edit this floating section'
    };
    
    // Add section with positioning immediately
    addSection(sectionType, sectionContent);
    
    // Update with positioning after a short delay to ensure the section exists
    setTimeout(() => {
      if (currentPage) {
        const lastSection = currentPage.sections[currentPage.sections.length - 1];
        if (lastSection) {
          updateSection(lastSection.id, {
            positioning: {
              type: 'absolute' as const,
              coordinates,
              zIndex: 1000,
              responsive: {
                desktop: coordinates,
                tablet: { 
                  x: coordinates.x, 
                  y: coordinates.y, 
                  width: Math.max(150, coordinates.width * 0.9), 
                  height: Math.max(80, coordinates.height * 0.9) 
                },
                mobile: { 
                  x: Math.min(coordinates.x, 250), 
                  y: coordinates.y, 
                  width: Math.max(120, coordinates.width * 0.8), 
                  height: Math.max(60, coordinates.height * 0.8) 
                }
              },
              isFloating: true
            }
          });
          toast.success(`${sectionType} section added to canvas`);
        }
      }
    }, 100);
  }, [addSection, updateSection, currentPage]);

  const handleAddSection = (sectionType: any, content: any) => {
    const newSectionId = addSection(sectionType, content);
    
    // Scroll to the newly added section with smooth animation
    if (newSectionId) {
      setTimeout(() => {
        const element = document.querySelector(`[data-section-id="${newSectionId}"]`);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest' 
          });
          
          // Add a subtle highlight animation
          element.classList.add('animate-pulse');
          setTimeout(() => {
            element.classList.remove('animate-pulse');
          }, 2000);
        }
      }, 100); // Small delay to ensure DOM is updated
    }
  };

  const handleAddFloatingSection = (sectionType: any, position: { x: number; y: number }) => {
    const coordinates = { x: position.x, y: position.y, width: 200, height: 100 };
    createFloatingSection(sectionType, coordinates);
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop': return <Monitor className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  // Early return AFTER all hooks have been called
  if (!currentWebsite || !currentPage) {
    console.log("No website or page found, showing fallback", { currentWebsite: !!currentWebsite, currentPage: !!currentPage });
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <Layout className="w-16 h-16 mx-auto mb-4 text-violet-600" />
          <h2 className="text-xl font-semibold mb-2">No Website Selected</h2>
          <p className="text-muted-foreground mb-4">Please select or create a website to edit</p>
          <Button onClick={onBack}>Go Back</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      {/* Top Toolbar */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                ← Back
              </Button>
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="h-8 w-48"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSaveName();
                        } else if (e.key === 'Escape') {
                          handleCancelEdit();
                        }
                      }}
                      autoFocus
                    />
                    <Button size="sm" variant="ghost" onClick={handleSaveName}>
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h1 className="font-semibold">{currentWebsite.name}</h1>
                    <Button size="sm" variant="ghost" onClick={handleEditName}>
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Mode Toggle */}
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant={!canvasMode ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCanvasMode(false)}
                >
                  <Layout className="w-4 h-4 mr-2" />
                  Standard
                </Button>
                <Button
                  variant={canvasMode ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCanvasMode(true)}
                >
                  <MousePointer className="w-4 h-4 mr-2" />
                  Canvas
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Device Preview Buttons */}
              <div className="flex gap-1 bg-muted rounded-lg p-1">
                {(['desktop', 'tablet', 'mobile'] as const).map((device) => (
                  <Button
                    key={device}
                    variant={previewDevice === device ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setPreviewDevice(device)}
                  >
                    {getDeviceIcon(device)}
                  </Button>
                ))}
              </div>

              {/* Action Buttons */}
              <Button variant="outline" size="sm">
                <Undo className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Redo className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsPreviewMode(!isPreviewMode)}>
                <Eye className="w-4 h-4" />
                {isPreviewMode ? 'Edit' : 'Preview'}
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Page Navigation */}
        <div className="border-t bg-gray-50/50 px-4 py-2">
          <PageNavigationTabs
            pages={currentWebsite?.pages || []}
            currentPageId={currentPage?.id || null}
            onPageSelect={switchToPage}
            onAddPage={() => setShowAddPageDialog(true)}
            onDuplicatePage={duplicatePage}
            onDeletePage={deletePage}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Left Sidebar - Content & Tools */}
          {!isPreviewMode && (
            <div className="col-span-3">
              <Card className="h-full">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="content">
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </TabsTrigger>
                    <TabsTrigger value="edit">
                      <Layout className="w-4 h-4 mr-2" />
                      Edit
                    </TabsTrigger>
                    <TabsTrigger value="theme">
                      <Palette className="w-4 h-4 mr-2" />
                      Theme
                    </TabsTrigger>
                    <TabsTrigger value="canvas">
                      <MousePointer className="w-4 h-4 mr-2" />
                      Canvas
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="mt-4 p-4 h-[calc(100%-60px)] overflow-y-auto">
                    <ContentBlockLibrary onAddSection={handleAddSection} />
                  </TabsContent>

                  <TabsContent value="edit" className="mt-4 p-4 h-[calc(100%-60px)] overflow-y-auto">
                    {selectedSection ? (
                      <SectionEditor
                        section={currentPage.sections.find(s => s.id === selectedSection)!}
                        onUpdate={updateSection}
                        onDelete={deleteSection}
                        onDeselect={() => setSelectedSection(null)}
                      />
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        <Layout className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Select a section to edit</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="theme" className="mt-4 p-4 h-[calc(100%-60px)] overflow-y-auto">
                    <ThemeEditor
                      theme={currentWebsite.theme}
                      onUpdate={updateTheme}
                    />
                  </TabsContent>

                   <TabsContent value="canvas" className="mt-4 p-4 h-[calc(100%-60px)] overflow-y-auto">
                     <FloatingContentLibrary 
                       onAddFloatingSection={handleAddFloatingSection}
                       onStartDrag={(sectionType, event) => {
                         // This will be handled by the canvas's unified drag system
                         console.log('Starting drag for:', sectionType);
                       }}
                     />
                   </TabsContent>
                </Tabs>
              </Card>
            </div>
          )}

          {/* Main Preview Area */}
          <div className={`${isPreviewMode ? 'col-span-12' : 'col-span-9'}`}>
            <Card className="h-full">
              <CardContent className="p-0 h-full">
                  <div 
                    ref={contentContainerRef}
                    className="h-full overflow-auto"
                  >
                    {currentPage.sections.length > 0 ? (
                       <>
                         {/* Sticky Header */}
                         <StickyHeader
                           website={currentWebsite}
                           pages={currentWebsite.pages}
                           currentPage={currentPage}
                           onPageChange={switchToPage}
                           isEditMode={!isPreviewMode}
                         />
                         {/* Main Content */}
                         {currentPage.sections.map((section, index) => (
                           <DraggableSection
                             key={section.id}
                             section={section}
                             index={index}
                             isSelected={selectedSection === section.id}
                             isPreviewMode={isPreviewMode}
                             containerRef={contentContainerRef}
                             onSelect={(sectionId, position) => {
                               setSelectedSection(sectionId);
                               if (position) {
                                 setFloatingEditorPosition(position);
                               }
                             }}
                             onDragStart={handleDragStart}
                             onDragOver={handleDragOver}
                             onDrop={handleDrop}
                             onResize={updateSection}
                             onDelete={deleteSection}
                             isDragOver={dragState.dragOverIndex === index}
                             draggedIndex={dragState.draggedIndex}
                           />
                         ))}
                       </>
                     ) : (
                      <div className="h-full flex items-center justify-center text-center p-8">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Welcome to {currentWebsite.name}</h3>
                          <p className="text-muted-foreground">Add sections from the content library to build your website</p>
                        </div>
                      </div>
                    )}
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Section Editor */}
      {selectedSection && floatingEditorPosition && (
        <FloatingSectionEditor
          section={currentPage.sections.find(s => s.id === selectedSection)!}
          position={floatingEditorPosition}
          onUpdate={updateSection}
          onDelete={(sectionId) => {
            deleteSection(sectionId);
            setSelectedSection(null);
            setFloatingEditorPosition(null);
          }}
          onClose={() => {
            setSelectedSection(null);
            setFloatingEditorPosition(null);
          }}
        />
      )}

      <AddPageDialog
        open={showAddPageDialog}
        onOpenChange={setShowAddPageDialog}
        onCreatePage={handleCreatePage}
      />
    </div>
  );
};