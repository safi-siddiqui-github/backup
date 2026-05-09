import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit3, Users, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { EventLocationSection } from "../EnhancedEventCreationDialog";

interface Props {
  sections: EventLocationSection[];
  onSectionsUpdate: (sections: EventLocationSection[]) => void;
  venueName: string;
}

const LocationSectionManager = ({ sections, onSectionsUpdate, venueName }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [newSection, setNewSection] = useState({
    name: "",
    description: "",
    capacity: ""
  });

  const handleAddSection = () => {
    if (!newSection.name.trim()) return;

    const section: EventLocationSection = {
      id: Math.random().toString(36).substr(2, 9),
      name: newSection.name.trim(),
      description: newSection.description.trim() || undefined,
      capacity: newSection.capacity ? parseInt(newSection.capacity) : undefined
    };

    onSectionsUpdate([...sections, section]);
    setNewSection({ name: "", description: "", capacity: "" });
  };

  const handleUpdateSection = (sectionId: string, updates: Partial<EventLocationSection>) => {
    onSectionsUpdate(
      sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    );
    setEditingSection(null);
  };

  const handleDeleteSection = (sectionId: string) => {
    onSectionsUpdate(sections.filter(section => section.id !== sectionId));
  };

  const totalCapacity = sections.reduce((sum, section) => sum + (section.capacity || 0), 0);

  return (
    <Card className="border-purple-200 bg-purple-50/50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-purple-100/50 transition-colors rounded-t-lg">
            <CardTitle className="flex items-center justify-between text-purple-800">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-purple-500 rounded-md flex items-center justify-center">
                  <Users className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm">Sections/Rooms in {venueName || 'this venue'}</span>
                {sections.length > 0 && (
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
                    {sections.length} section{sections.length !== 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                {totalCapacity > 0 && (
                  <Badge variant="secondary" className="bg-purple-200 text-purple-800">
                    {totalCapacity} total capacity
                  </Badge>
                )}
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <p className="text-purple-700 text-sm">
              Add sections or rooms within this venue. This helps with organizing seating arrangements and guest management.
            </p>

            {/* Existing Sections */}
            {sections.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-purple-800 text-sm">Current Sections</h4>
                {sections.map(section => (
                  <div key={section.id} className="bg-white border border-purple-200 rounded-lg p-4">
                    {editingSection === section.id ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs">Section Name</Label>
                            <Input
                              value={section.name}
                              onChange={(e) => handleUpdateSection(section.id, { name: e.target.value })}
                              className="h-9"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Capacity</Label>
                            <Input
                              type="number"
                              value={section.capacity || ""}
                              onChange={(e) => handleUpdateSection(section.id, { 
                                capacity: e.target.value ? parseInt(e.target.value) : undefined 
                              })}
                              className="h-9"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs">Description</Label>
                          <Textarea
                            value={section.description || ""}
                            onChange={(e) => handleUpdateSection(section.id, { description: e.target.value })}
                            className="h-20"
                          />
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline" onClick={() => setEditingSection(null)}>
                            Cancel
                          </Button>
                          <Button size="sm" onClick={() => setEditingSection(null)}>
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">{section.name}</h5>
                          {section.description && (
                            <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                          )}
                          {section.capacity && (
                            <Badge variant="outline" className="mt-2 text-xs">
                              Capacity: {section.capacity}
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingSection(section.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit3 className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteSection(section.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Add New Section */}
            <div className="border-t border-purple-200 pt-4">
              <h4 className="font-medium text-purple-800 text-sm mb-3">Add New Section</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Section Name *</Label>
                    <Input
                      placeholder="e.g., Main Hall, VIP Area"
                      value={newSection.name}
                      onChange={(e) => setNewSection({ ...newSection, name: e.target.value })}
                      className="h-9"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Capacity (Optional)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 50"
                      value={newSection.capacity}
                      onChange={(e) => setNewSection({ ...newSection, capacity: e.target.value })}
                      className="h-9"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Description (Optional)</Label>
                  <Textarea
                    placeholder="Brief description of this section..."
                    value={newSection.description}
                    onChange={(e) => setNewSection({ ...newSection, description: e.target.value })}
                    className="h-20"
                  />
                </div>
                <div className="flex justify-end">
                  <Button 
                    onClick={handleAddSection} 
                    disabled={!newSection.name.trim()}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Section
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default LocationSectionManager;
