import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableIcon, Users, Clock, MoreVertical, Edit, Copy, Trash2 } from "lucide-react";
import { useVenueHierarchy } from "@/hooks/useVenueHierarchy";
import { AssignedGuestList } from "./AssignedGuestList";
import type { SeatingArrangement, Guest } from "@/types/venue";

interface ArrangementCardProps {
  arrangement: SeatingArrangement;
  onEdit: () => void;
}

const ArrangementCard = ({ arrangement, onEdit }: ArrangementCardProps) => {
  const { duplicateArrangement, deleteArrangement } = useVenueHierarchy();

  const tableCount = arrangement.tables?.length || 0;
  const chairCount = arrangement.chairs?.length || 0;
  const seatCount = arrangement.seats?.length || 0;

  const totalCapacity =
    (arrangement.tables?.reduce((sum, t) => sum + t.seats, 0) || 0) +
    chairCount +
    seatCount;

  const assignedCount =
    (arrangement.tables?.reduce(
      (sum, t) => sum + Object.keys(t.seatAssignments || {}).length,
      0
    ) || 0) + (arrangement.chairs?.filter((c) => c.guest).length || 0);

  // Get all assigned guests
  const assignedGuests: Guest[] = [
    ...(arrangement.tables?.flatMap(t => Object.values(t.seatAssignments || {})) || []),
    ...(arrangement.chairs?.filter(c => c.guest).map(c => c.guest!) || [])
  ];

  // Helper function to get guest assignment details
  const getGuestAssignment = (guest: Guest) => {
    // Check tables
    const table = arrangement.tables?.find(t =>
      Object.values(t.seatAssignments || {}).some(g => g.id === guest.id)
    );
    if (table) {
      const seatNumber = Object.entries(table.seatAssignments || {}).find(
        ([_, g]) => g.id === guest.id
      )?.[0];
      return {
        tableName: table.name,
        seatNumber: seatNumber ? parseInt(seatNumber) : undefined
      };
    }

    // Check chairs
    const chair = arrangement.chairs?.find(c => c.guest?.id === guest.id);
    if (chair) {
      return { chairName: chair.name };
    }

    return {};
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newName = `${arrangement.name} (Copy)`;
    duplicateArrangement(arrangement.id, newName);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Delete arrangement "${arrangement.name}"?`)) {
      deleteArrangement(arrangement.id);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={onEdit}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {arrangement.name}
            </h3>
            {arrangement.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {arrangement.description}
              </p>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicate}>
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Time Range */}
        {(arrangement.startTime || arrangement.endTime) && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
            <Clock className="w-3 h-3" />
            <span>
              {arrangement.startTime} - {arrangement.endTime}
            </span>
          </div>
        )}

        {/* Stats */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <TableIcon className="w-4 h-4" />
              <span>Tables</span>
            </div>
            <span className="font-medium text-foreground">{tableCount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Capacity</span>
            </div>
            <span className="font-medium text-foreground">{totalCapacity}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Assigned</span>
            </div>
            {assignedGuests.length > 0 ? (
              <AssignedGuestList
                guests={assignedGuests}
                arrangementName={arrangement.name}
                totalCapacity={totalCapacity}
                getGuestAssignment={getGuestAssignment}
              />
            ) : (
              <span className="font-medium text-foreground">
                {assignedCount} / {totalCapacity}
              </span>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <Badge variant={arrangement.isActive ? "default" : "secondary"} className="text-xs">
          {arrangement.isActive ? "Active" : "Inactive"}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default ArrangementCard;
