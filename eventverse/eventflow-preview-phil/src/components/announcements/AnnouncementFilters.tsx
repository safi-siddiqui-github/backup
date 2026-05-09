import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";
import { AnnouncementFilters as Filters } from "@/types/announcement";

interface AnnouncementFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  unreadCount: number;
  urgentCount: number;
}

const AnnouncementFilters = ({
  filters,
  onFiltersChange,
  searchQuery,
  onSearchChange,
  unreadCount,
  urgentCount
}: AnnouncementFiltersProps) => {
  const hasActiveFilters = filters.type !== 'all' || filters.status !== 'all' || filters.requiresAck !== null;

  const clearFilters = () => {
    onFiltersChange({
      type: 'all',
      status: 'all',
      requiresAck: null
    });
    onSearchChange('');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground" />
        
        <Select
          value={filters.type}
          onValueChange={(value: any) => onFiltersChange({ ...filters, type: value })}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="announcement">Announcements</SelectItem>
            <SelectItem value="schedule-change">Schedule Changes</SelectItem>
            <SelectItem value="weather">Weather</SelectItem>
            <SelectItem value="parking">Parking</SelectItem>
            <SelectItem value="safety">Safety</SelectItem>
            <SelectItem value="general">General</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value: any) => onFiltersChange({ ...filters, status: value })}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="unread">
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant={filters.requiresAck === true ? "default" : "outline"}
          size="sm"
          onClick={() => onFiltersChange({ 
            ...filters, 
            requiresAck: filters.requiresAck === true ? null : true 
          })}
        >
          Requires Acknowledgement
        </Button>

        {unreadCount > 0 && (
          <Badge variant="secondary" className="ml-auto">
            {unreadCount} unread
          </Badge>
        )}
        
        {urgentCount > 0 && (
          <Badge variant="destructive">
            {urgentCount} urgent
          </Badge>
        )}
      </div>
    </div>
  );
};

export default AnnouncementFilters;
