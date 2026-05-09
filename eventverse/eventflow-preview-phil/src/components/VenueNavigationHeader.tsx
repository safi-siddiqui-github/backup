
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ChevronDown, 
  ChevronRight, 
  MapPin, 
  Building2, 
  Calendar,
  Plus,
  Copy,
  Settings,
  Clock,
  Users,
  Eye,
  EyeOff
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useVenueHierarchy } from '@/hooks/useVenueHierarchy';

interface VenueNavigationHeaderProps {
  onToggleTimeline?: () => void;
  onToggleAnalytics?: () => void;
  showTimeline?: boolean;
  showAnalytics?: boolean;
}

const VenueNavigationHeader = ({ 
  onToggleTimeline, 
  onToggleAnalytics,
  showTimeline = false,
  showAnalytics = false 
}: VenueNavigationHeaderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState<'location' | 'section' | 'arrangement' | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  
  const {
    hierarchy,
    currentLocation,
    currentSection,
    currentArrangement,
    navigateToArrangement,
    addLocation,
    addSection,
    addArrangement,
    duplicateArrangement
  } = useVenueHierarchy();

  const handleAddItem = () => {
    if (!newItemName.trim()) return;

    switch (showAddDialog) {
      case 'location':
        addLocation({
          name: newItemName,
          description: newItemDescription
        });
        break;
      case 'section':
        if (currentLocation) {
          addSection(currentLocation.id, {
            name: newItemName,
            description: newItemDescription,
            locationId: currentLocation.id
          });
        }
        break;
      case 'arrangement':
        if (currentSection) {
          addArrangement(currentSection.id, {
            name: newItemName,
            description: newItemDescription,
            sectionId: currentSection.id,
            venueType: 'table-based',
            tables: [],
            chairs: [],
            seats: [],
            seatSections: [],
            venueObjects: []
          });
        }
        break;
    }

    setNewItemName('');
    setNewItemDescription('');
    setShowAddDialog(null);
  };

  const handleDuplicate = () => {
    if (currentArrangement) {
      const newName = `${currentArrangement.name} (Copy)`;
      duplicateArrangement(currentArrangement.id, newName);
    }
  };

  const getTotalGuests = (arrangement: any) => {
    const tableGuests = arrangement.tables?.reduce((sum: number, table: any) => 
      sum + Object.keys(table.seatAssignments || {}).length, 0) || 0;
    const seatGuests = arrangement.seats?.filter((seat: any) => seat.guest).length || 0;
    return tableGuests + seatGuests;
  };

  const getTotalCapacity = (arrangement: any) => {
    const tableCapacity = arrangement.tables?.reduce((sum: number, table: any) => sum + table.seats, 0) || 0;
    const seatCapacity = arrangement.seats?.length || 0;
    return tableCapacity + seatCapacity;
  };

  return (
    <div className="border-b bg-white">
      {/* Main Navigation Bar */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Button>

            {/* Current Path Display */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="font-medium">
                    {currentLocation?.name || 'No Location'}
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {hierarchy.locations.map(location => (
                    <DropdownMenuItem
                      key={location.id}
                      onClick={() => {
                        const firstSection = location.sections[0];
                        const firstArrangement = firstSection?.arrangements[0];
                        if (firstSection && firstArrangement) {
                          navigateToArrangement(location.id, firstSection.id, firstArrangement.id);
                        }
                      }}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {location.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <span className="text-gray-400">→</span>

              <Building2 className="w-4 h-4 text-green-600" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="font-medium">
                    {currentSection?.name || 'No Section'}
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {currentLocation?.sections.map(section => (
                    <DropdownMenuItem
                      key={section.id}
                      onClick={() => {
                        const firstArrangement = section.arrangements[0];
                        if (firstArrangement) {
                          navigateToArrangement(currentLocation.id, section.id, firstArrangement.id);
                        }
                      }}
                    >
                      <Building2 className="w-4 h-4 mr-2" />
                      {section.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <span className="text-gray-400">→</span>

              <Calendar className="w-4 h-4 text-purple-600" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="font-medium">
                    {currentArrangement?.name || 'No Arrangement'}
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {currentSection?.arrangements.map(arrangement => (
                    <DropdownMenuItem
                      key={arrangement.id}
                      onClick={() => navigateToArrangement(
                        currentLocation!.id,
                        currentSection!.id,
                        arrangement.id
                      )}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      <div className="flex flex-col">
                        <span>{arrangement.name}</span>
                        {arrangement.startTime && (
                          <span className="text-xs text-gray-500">
                            {arrangement.startTime} - {arrangement.endTime}
                          </span>
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Current Arrangement Info */}
            {currentArrangement && (
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="outline" className="text-xs">
                  {getTotalGuests(currentArrangement)}/{getTotalCapacity(currentArrangement)} guests
                </Badge>
                {currentArrangement.startTime && (
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {currentArrangement.startTime}
                  </Badge>
                )}
                <Badge variant={currentArrangement.venueType === 'table-based' ? 'default' : 'secondary'} className="text-xs">
                  {currentArrangement.venueType === 'table-based' ? 'Tables' : 'Individual Seats'}
                </Badge>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <Dialog open={!!showAddDialog} onOpenChange={() => setShowAddDialog(null)}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setShowAddDialog('location')}>
                    <MapPin className="w-4 h-4 mr-2" />
                    New Location
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setShowAddDialog('section')}
                    disabled={!currentLocation}
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    New Section
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setShowAddDialog('arrangement')}
                    disabled={!currentSection}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    New Arrangement
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Add New {showAddDialog?.charAt(0).toUpperCase() + showAddDialog?.slice(1)}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      placeholder="Enter name..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      value={newItemDescription}
                      onChange={(e) => setNewItemDescription(e.target.value)}
                      placeholder="Optional description..."
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAddDialog(null)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddItem} disabled={!newItemName.trim()}>
                      Add {showAddDialog}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button 
              size="sm" 
              variant="outline"
              onClick={handleDuplicate}
              disabled={!currentArrangement}
            >
              <Copy className="w-4 h-4 mr-1" />
              Duplicate
            </Button>

            {onToggleTimeline && (
              <Button 
                size="sm" 
                variant={showTimeline ? "default" : "outline"}
                onClick={onToggleTimeline}
              >
                <Clock className="w-4 h-4 mr-1" />
                Timeline
              </Button>
            )}

            {onToggleAnalytics && (
              <Button 
                size="sm" 
                variant={showAnalytics ? "default" : "outline"}
                onClick={onToggleAnalytics}
              >
                {showAnalytics ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Hierarchy View */}
      {isExpanded && (
        <div className="border-t bg-gray-50 p-4">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Event Hierarchy</h3>
            {hierarchy.locations.map(location => (
              <div key={location.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">{location.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {location.sections.length} sections
                  </Badge>
                </div>
                {location.sections.map(section => (
                  <div key={section.id} className="ml-6 space-y-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{section.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {section.arrangements.length} arrangements
                      </Badge>
                    </div>
                    {section.arrangements.map(arrangement => (
                      <div 
                        key={arrangement.id} 
                        className={`ml-6 flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                          arrangement.id === currentArrangement?.id 
                            ? 'bg-purple-100 border border-purple-200' 
                            : 'hover:bg-white'
                        }`}
                        onClick={() => navigateToArrangement(location.id, section.id, arrangement.id)}
                      >
                        <Calendar className="w-3 h-3 text-purple-600" />
                        <span className="text-sm">{arrangement.name}</span>
                        {arrangement.startTime && (
                          <Badge variant="outline" className="text-xs">
                            {arrangement.startTime}
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          <Users className="w-3 h-3 mr-1" />
                          {getTotalGuests(arrangement)}/{getTotalCapacity(arrangement)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueNavigationHeader;
