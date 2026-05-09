
import { SeatingArrangement } from "@/types";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, MoreHorizontal, Trash2, ChevronDown } from 'lucide-react';
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useVenueHierarchy } from '@/hooks/useVenueHierarchy';
import { useLocationContext } from '@/hooks/useLocationContext';

const ArrangementSelector = () => {
  const { hierarchy, addArrangement, navigateToArrangement, currentArrangement } = useVenueHierarchy();
  const { selectedLocationId, currentLocationData } = useLocationContext();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newArrangementName, setNewArrangementName] = useState('');
  const [newVenueType, setNewVenueType] = useState<'table-based' | 'seat-based'>('table-based');
  const [arrangementToDelete, setArrangementToDelete] = useState<SeatingArrangement | null>(null);

  if (!selectedLocationId || !currentLocationData || !currentLocationData.currentSection) {
    return (
      <div className="p-4 text-center text-gray-500">
        Please select a section first
      </div>
    );
  }

  const { currentSection } = currentLocationData;

  const handleAddArrangement = () => {
    if (newArrangementName.trim() && currentSection) {
      addArrangement(currentSection.id, {
        name: newArrangementName.trim(),
        sectionId: currentSection.id,
        venueType: newVenueType,
        tables: [],
        chairs: [],
        seats: [],
        seatSections: [],
        venueObjects: []
      });
      setNewArrangementName('');
      setShowAddDialog(false);
    }
  };

  const handleDeleteArrangement = () => {
    if (arrangementToDelete) {
      // TODO: Implement arrangement deletion in useVenueHierarchy
      console.log('Deleting arrangement:', arrangementToDelete.name);
      setArrangementToDelete(null);
      setShowDeleteDialog(false);
    }
  };

  const handleArrangementSelect = (arrangementId: string) => {
    navigateToArrangement(selectedLocationId, currentSection.id, arrangementId);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <Calendar className="w-5 h-5 text-purple-600" />
        
        {currentSection.arrangements.length === 0 ? (
          <div>
            <h3 className="font-medium">No arrangements yet</h3>
            <p className="text-sm text-gray-500">Add your first arrangement to get started</p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-medium">
                  {currentArrangement ? currentArrangement.name : 'Select Arrangement'}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {currentSection.arrangements.map((arrangement: SeatingArrangement) => (
                  <DropdownMenuItem
                    key={arrangement.id}
                    onClick={() => handleArrangementSelect(arrangement.id)}
                    className={currentArrangement?.id === arrangement.id ? 'bg-purple-50' : ''}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    <div className="flex-1">
                      <div className="font-medium">{arrangement.name}</div>
                      <div className="text-xs text-gray-500">
                        {arrangement.venueType === 'table-based' ? 'Table-based' : 'Seat-based'}
                      </div>
                    </div>
                    {currentArrangement?.id === arrangement.id && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              setArrangementToDelete(arrangement);
                              setShowDeleteDialog(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Arrangement
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {currentArrangement && (
              <Badge variant="outline" className="text-xs">
                {currentArrangement.venueType === 'table-based' ? 'Tables' : 'Seats'}
              </Badge>
            )}
          </div>
        )}
      </div>

      <Button size="sm" onClick={() => setShowAddDialog(true)}>
        <Plus className="w-4 h-4 mr-1" />
        Add Arrangement
      </Button>

      {/* Add Arrangement Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Arrangement</DialogTitle>
            <DialogDescription>
              Create a new seating arrangement in {currentSection.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="arrangement-name">Arrangement Name</Label>
              <Input
                id="arrangement-name"
                value={newArrangementName}
                onChange={(e) => setNewArrangementName(e.target.value)}
                placeholder="e.g., Dinner Setup, Cocktail Hour"
              />
            </div>
            <div>
              <Label htmlFor="venue-type">Venue Type</Label>
              <Select value={newVenueType} onValueChange={(value: 'table-based' | 'seat-based') => setNewVenueType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="table-based">Table-based (Round tables, rectangular tables)</SelectItem>
                  <SelectItem value="seat-based">Seat-based (Individual seats, theater style)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddArrangement} disabled={!newArrangementName.trim()}>
              Add Arrangement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Arrangement Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Arrangement</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{arrangementToDelete?.name}"? 
              All guest assignments will be lost. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteArrangement} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ArrangementSelector;
