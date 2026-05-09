
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Building, Trees, Zap, Presentation, Briefcase, Plus, Armchair, Table } from "lucide-react";
import { venueTemplates, type VenueTemplate } from "./VenueTemplates";

interface VenueTemplateDialogProps {
  onSelectTemplate: (template: VenueTemplate | null) => void;
  onClose: () => void;
}

const getTemplateIcon = (templateId: string) => {
  switch (templateId) {
    case "hall": return Building;
    case "stadium": return Zap;
    case "outdoor": return Trees;
    case "arena": return MapPin;
    case "theater": return Presentation;
    case "conference": return Briefcase;
    default: return Building;
  }
};

const VenueTemplateDialog = ({ onSelectTemplate, onClose }: VenueTemplateDialogProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<VenueTemplate | null>(null);

  const handleSelectTemplate = () => {
    onSelectTemplate(selectedTemplate);
  };

  const handleStartBlank = () => {
    onSelectTemplate(null);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose a Venue Template</DialogTitle>
          <p className="text-sm text-gray-600">
            Start with a pre-designed layout and customize it to your needs, or begin with a blank canvas.
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {venueTemplates.map((template) => {
            const Icon = getTemplateIcon(template.id);
            const isSelected = selectedTemplate?.id === template.id;
            
            return (
              <div
                key={template.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedTemplate(template)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-purple-600' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-3 h-3" />
                      <span>Up to {template.capacity} guests</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${template.venueType === 'seat-based' ? 'bg-blue-50 border-blue-300' : 'bg-green-50 border-green-300'}`}
                  >
                    {template.venueType === 'seat-based' ? (
                      <><Armchair className="w-3 h-3 mr-1" />Individual Seats</>
                    ) : (
                      <><Table className="w-3 h-3 mr-1" />Table-based</>
                    )}
                  </Badge>
                  {template.venueType === 'table-based' && (
                    <Badge variant="outline" className="text-xs">
                      {template.tables.length} tables
                    </Badge>
                  )}
                  {template.venueType === 'seat-based' && template.seatSections && (
                    <Badge variant="outline" className="text-xs">
                      {template.seatSections.length} sections
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {template.venueObjects.length} objects
                  </Badge>
                </div>

                {/* Mini preview visualization */}
                <div className="mt-3 h-20 bg-gray-50 rounded border relative overflow-hidden">
                  <div className="absolute inset-0 p-1">
                    {/* Venue Objects */}
                    {template.venueObjects.slice(0, 3).map((obj, index) => (
                      <div
                        key={index}
                        className="absolute bg-blue-200 rounded opacity-60"
                        style={{
                          left: `${(obj.x / 700) * 100}%`,
                          top: `${(obj.y / 500) * 100}%`,
                          width: `${Math.max(6, (obj.width / 700) * 100)}%`,
                          height: `${Math.max(4, (obj.height / 500) * 100)}%`,
                        }}
                      />
                    ))}
                    
                    {/* Tables or Seat Sections */}
                    {template.venueType === 'table-based' ? (
                      template.tables.slice(0, 6).map((table, index) => (
                        <div
                          key={index}
                          className={`absolute bg-purple-200 opacity-60 ${
                            table.shape === 'round' ? 'rounded-full' : 'rounded'
                          }`}
                          style={{
                            left: `${(table.x / 700) * 100}%`,
                            top: `${(table.y / 500) * 100}%`,
                            width: '8%',
                            height: '12%',
                          }}
                        />
                      ))
                    ) : (
                      template.seatSections?.slice(0, 4).map((section, index) => (
                        <div
                          key={index}
                          className="absolute bg-orange-200 rounded opacity-60"
                          style={{
                            left: `${(section.startX / 700) * 100}%`,
                            top: `${(section.startY / 500) * 100}%`,
                            width: '12%',
                            height: '8%',
                          }}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Blank Canvas Option */}
          <div
            className={`border-2 border-dashed rounded-lg p-4 cursor-pointer transition-all hover:shadow-md flex flex-col items-center justify-center min-h-[200px] ${
              selectedTemplate === null ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => setSelectedTemplate(null)}
          >
            <div className={`p-3 rounded-lg mb-3 ${selectedTemplate === null ? 'bg-purple-100' : 'bg-gray-100'}`}>
              <Plus className={`w-6 h-6 ${selectedTemplate === null ? 'text-purple-600' : 'text-gray-400'}`} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Start from Scratch</h3>
            <p className="text-sm text-gray-600 text-center">
              Begin with a blank canvas and design your layout from the ground up
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={selectedTemplate ? handleSelectTemplate : handleStartBlank}>
            {selectedTemplate ? `Use ${selectedTemplate.name}` : 'Start with Blank Canvas'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VenueTemplateDialog;
