import { useState, useMemo } from "react";
import { HistoricalGuest, GuestSegment } from "@/types/marketing";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Mail, Phone, MapPin, Plus, Trash2, ArrowUpDown, ChevronDown, FileText, Code, Sheet, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import GuestFilterPanel, { GuestFilters } from "./GuestFilterPanel";
import TableSortHeader from "./TableSortHeader";
import { GuestDetailPanel } from "./GuestDetailPanel";

interface GuestDirectoryProps {
  guests: HistoricalGuest[];
  segments: GuestSegment[];
}

const GuestDirectory = ({ guests, segments }: GuestDirectoryProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<HistoricalGuest | null>(null);
  const [showGuestDetail, setShowGuestDetail] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddToSegmentDialog, setShowAddToSegmentDialog] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{ column: string; direction: 'asc' | 'desc' }>({
    column: 'lastEventDate',
    direction: 'desc'
  });
  const [filters, setFilters] = useState<GuestFilters>({
    segments: [],
    eventTypes: [],
    ageRange: { min: 18, max: 65 },
    spendingRange: { min: 0, max: 10000 },
    spendingLevel: 'all',
    attendanceRange: { min: 0, max: 100 },
    attendanceLevel: 'all',
    lastEventPeriod: 'all',
    optOuts: [],
    location: '',
    avgTicketPriceRange: { min: 0, max: 500 },
    multiTicketBuyersOnly: false,
    totalTicketsRange: { min: 0, max: 20 },
    purchaseFrequency: 'all',
    birthdayMonths: [],
    daysSinceLastEvent: undefined,
    lifetimeValueRange: { min: 0, max: 10000 },
    rsvpReliability: 'all',
    frequentPlusOneBringers: false,
    avgPlusOnesRange: { min: 0, max: 5 }
  });

  const handleSort = (column: string) => {
    setSortConfig({
      column,
      direction: sortConfig.column === column && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const filteredAndSortedGuests = useMemo(() => {
    let filtered = guests.filter(guest => {
      // Search filter
      if (searchTerm && !(
        guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.email.toLowerCase().includes(searchTerm.toLowerCase())
      )) {
        return false;
      }

      // Segment filter
      if (filters.segments.length > 0) {
        if (!filters.segments.some(s => guest.segments.includes(s))) {
          return false;
        }
      }

      // Event type filter
      if (filters.eventTypes.length > 0) {
        const guestEventTypes = guest.eventHistory.map(e => e.eventType);
        if (!filters.eventTypes.some(t => guestEventTypes.includes(t))) {
          return false;
        }
      }

      // Age range filter
      if (guest.demographics?.ageRange) {
        const [min, max] = guest.demographics.ageRange.split('-').map(Number);
        if (max < filters.ageRange.min || min > filters.ageRange.max) {
          return false;
        }
      }

      // Spending filter
      if (filters.spendingLevel !== 'all') {
        if (filters.spendingLevel === 'high' && guest.totalSpent < 1000) return false;
        if (filters.spendingLevel === 'medium' && (guest.totalSpent < 500 || guest.totalSpent >= 1000)) return false;
        if (filters.spendingLevel === 'low' && guest.totalSpent >= 500) return false;
      }

      // Attendance filter
      if (filters.attendanceLevel !== 'all') {
        if (filters.attendanceLevel === 'frequent' && guest.attendanceCount < 3) return false;
        if (filters.attendanceLevel === 'occasional' && (guest.attendanceCount < 2 || guest.attendanceCount > 3)) return false;
        if (filters.attendanceLevel === 'first-time' && guest.attendanceCount !== 1) return false;
      }

      // Last event date filter
      if (filters.lastEventPeriod !== 'all') {
        const daysSinceLastEvent = Math.floor((Date.now() - new Date(guest.lastEventDate).getTime()) / (1000 * 60 * 60 * 24));
        if (filters.lastEventPeriod === '30days' && daysSinceLastEvent > 30) return false;
        if (filters.lastEventPeriod === '6months' && daysSinceLastEvent > 180) return false;
        if (filters.lastEventPeriod === '1year' && daysSinceLastEvent > 365) return false;
        if (filters.lastEventPeriod === 'over1year' && daysSinceLastEvent <= 365) return false;
      }

      // Location filter
      if (filters.location && guest.demographics?.location) {
        if (!guest.demographics.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
      }

      // Opt-out filters
      if (filters.optOuts.length > 0) {
        const hasOptOut = filters.optOuts.some(opt => {
          if (opt === 'email') return guest.optOuts.email;
          if (opt === 'sms') return guest.optOuts.sms;
          if (opt === 'physicalMail') return guest.optOuts.physicalMail;
          return false;
        });
        if (!hasOptOut) return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortConfig.column) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'lastEventDate':
          aValue = new Date(a.lastEventDate).getTime();
          bValue = new Date(b.lastEventDate).getTime();
          break;
        case 'totalSpent':
          aValue = a.totalSpent;
          bValue = b.totalSpent;
          break;
        case 'attendanceCount':
          aValue = a.attendanceCount;
          bValue = b.attendanceCount;
          break;
        case 'segments':
          aValue = a.segments.length;
          bValue = b.segments.length;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [guests, searchTerm, filters, sortConfig]);

  const getSegmentName = (segmentId: string) => {
    const segment = segments.find(s => s.id === segmentId);
    return segment?.name || segmentId;
  };

  const getSpendingColor = (amount: number) => {
    if (amount >= 1000) return 'text-green-600 dark:text-green-400';
    if (amount >= 500) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-muted-foreground';
  };

  const toggleGuestSelection = (guestId: string) => {
    setSelectedGuests(prev =>
      prev.includes(guestId)
        ? prev.filter(id => id !== guestId)
        : [...prev, guestId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedGuests.length === filteredAndSortedGuests.length) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests(filteredAndSortedGuests.map(g => g.id));
    }
  };

  const handleGuestClick = (guest: HistoricalGuest) => {
    setSelectedGuest(guest);
    setShowGuestDetail(true);
  };

  const getSortLabel = () => {
    const labels: Record<string, string> = {
      name: 'Name',
      lastEventDate: 'Last Event',
      totalSpent: 'Total Spent',
      attendanceCount: 'Attendance',
      segments: 'Segments'
    };
    return labels[sortConfig.column] || 'Sort';
  };

  // Export Functions
  const prepareExportData = () => {
    return selectedGuests.map(guestId => {
      const guest = guests.find(g => g.id === guestId)!;
      return {
        Name: guest.name,
        Email: guest.email,
        Phone: guest.phone || '',
        Location: guest.demographics?.location || '',
        'Age Range': guest.demographics?.ageRange || '',
        'Total Spent': guest.totalSpent,
        'Attendance Count': guest.attendanceCount,
        'Last Event': new Date(guest.lastEventDate).toLocaleDateString(),
        Segments: guest.segments.map(s => getSegmentName(s)).join(', '),
        'Opt-out Email': guest.optOuts.email,
        'Opt-out SMS': guest.optOuts.sms,
        'Opt-out Mail': guest.optOuts.physicalMail
      };
    });
  };

  const exportToCSV = () => {
    const data = prepareExportData();
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header as keyof typeof row]}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guests-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `${selectedGuests.length} guests exported as CSV`,
    });
  };

  const exportToJSON = () => {
    const data = prepareExportData();
    const jsonContent = JSON.stringify(data, null, 2);

    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guests-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `${selectedGuests.length} guests exported as JSON`,
    });
  };

  const exportToExcel = () => {
    const data = prepareExportData();
    const headers = Object.keys(data[0]);
    
    // Create TSV format (tab-separated values, opens well in Excel)
    const tsvContent = [
      headers.join('\t'),
      ...data.map(row => headers.map(header => row[header as keyof typeof row]).join('\t'))
    ].join('\n');

    const blob = new Blob([tsvContent], { type: 'text/tab-separated-values' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guests-${new Date().toISOString().split('T')[0]}.xls`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `${selectedGuests.length} guests exported as Excel`,
    });
  };

  // Add to Segment
  const handleAddToSegment = () => {
    if (!selectedSegmentId) return;

    const segmentName = getSegmentName(selectedSegmentId);
    toast({
      title: "Added to Segment",
      description: `${selectedGuests.length} guests added to ${segmentName}`,
    });

    setShowAddToSegmentDialog(false);
    setSelectedSegmentId("");
    setSelectedGuests([]);
  };

  // Remove Guests
  const handleRemoveGuests = () => {
    toast({
      title: "Guests Removed",
      description: `${selectedGuests.length} guests have been removed`,
      variant: "destructive",
    });

    setShowRemoveDialog(false);
    setSelectedGuests([]);
  };

  const activeFilterCount = 
    filters.segments.length +
    filters.eventTypes.length +
    (filters.spendingLevel !== 'all' ? 1 : 0) +
    (filters.attendanceLevel !== 'all' ? 1 : 0) +
    (filters.lastEventPeriod !== 'all' ? 1 : 0) +
    filters.optOuts.length +
    (filters.location ? 1 : 0) +
    (filters.multiTicketBuyersOnly ? 1 : 0) +
    (filters.purchaseFrequency !== 'all' ? 1 : 0) +
    filters.birthdayMonths.length +
    (filters.daysSinceLastEvent ? 1 : 0) +
    (filters.rsvpReliability !== 'all' ? 1 : 0) +
    (filters.frequentPlusOneBringers ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Search and Actions Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search guests by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
            >
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="mr-2">{activeFilterCount}</Badge>
              )}
              Filters
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  {getSortLabel()}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleSort('name')}>
                  Name {sortConfig.column === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('lastEventDate')}>
                  Last Event {sortConfig.column === 'lastEventDate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('totalSpent')}>
                  Total Spent {sortConfig.column === 'totalSpent' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('attendanceCount')}>
                  Attendance {sortConfig.column === 'attendanceCount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('segments')}>
                  Segments {sortConfig.column === 'segments' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Bulk Actions Bar */}
          {selectedGuests.length > 0 && (
            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <Checkbox
                checked={selectedGuests.length === filteredAndSortedGuests.length}
                onCheckedChange={toggleSelectAll}
              />
              <span className="text-sm font-medium">
                {selectedGuests.length} guest{selectedGuests.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2 ml-auto">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setShowAddToSegmentDialog(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Segment
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Export
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={exportToCSV}>
                      <FileText className="w-4 h-4 mr-2" />
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={exportToJSON}>
                      <Code className="w-4 h-4 mr-2" />
                      Export as JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={exportToExcel}>
                      <Sheet className="w-4 h-4 mr-2" />
                      Export as Excel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setShowRemoveDialog(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Filter Panel */}
        {showFilters && (
          <div className="lg:col-span-1">
            <GuestFilterPanel
              segments={segments}
              filters={filters}
              onFiltersChange={setFilters}
              guestCount={filteredAndSortedGuests.length}
            />
          </div>
        )}

        {/* Guest Table */}
        <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedGuests.length === filteredAndSortedGuests.length && filteredAndSortedGuests.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead>
                      <TableSortHeader
                        column="name"
                        label="Guest"
                        currentSort={sortConfig}
                        onSort={handleSort}
                      />
                    </TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Demographics</TableHead>
                    <TableHead>
                      <TableSortHeader
                        column="attendanceCount"
                        label="Events"
                        currentSort={sortConfig}
                        onSort={handleSort}
                      />
                    </TableHead>
                    <TableHead>
                      <TableSortHeader
                        column="totalSpent"
                        label="Total Spent"
                        currentSort={sortConfig}
                        onSort={handleSort}
                      />
                    </TableHead>
                    <TableHead>
                      <TableSortHeader
                        column="segments"
                        label="Segments"
                        currentSort={sortConfig}
                        onSort={handleSort}
                      />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedGuests.map((guest, idx) => (
                    <TableRow 
                      key={guest.id} 
                      className={`hover:bg-muted/50 cursor-pointer transition-colors ${
                        idx % 2 === 0 ? 'bg-muted/20' : ''
                      }`}
                      onClick={() => handleGuestClick(guest)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedGuests.includes(guest.id)}
                          onCheckedChange={() => toggleGuestSelection(guest.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-sm">
                              {guest.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{guest.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Last: {new Date(guest.lastEventDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className={`w-3 h-3 ${guest.optOuts.email ? 'text-destructive' : 'text-muted-foreground'}`} />
                            <span className={guest.optOuts.email ? 'line-through text-muted-foreground' : ''}>
                              {guest.email}
                            </span>
                          </div>
                          {guest.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className={`w-3 h-3 ${guest.optOuts.sms ? 'text-destructive' : 'text-muted-foreground'}`} />
                              <span className={guest.optOuts.sms ? 'line-through text-muted-foreground' : ''}>
                                {guest.phone}
                              </span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {guest.demographics ? (
                          <div className="space-y-1">
                            <Badge variant="outline" className="text-xs">
                              {guest.demographics.ageRange}
                            </Badge>
                            {guest.demographics.location && (
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {guest.demographics.location}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{guest.attendanceCount} events</p>
                          <p className="text-xs text-muted-foreground">
                            {guest.eventHistory[0]?.eventType}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className={`font-semibold ${getSpendingColor(guest.totalSpent)}`}>
                          ${guest.totalSpent.toLocaleString()}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {guest.segments.slice(0, 2).map((segmentId) => (
                            <Badge key={segmentId} variant="secondary" className="text-xs">
                              {getSegmentName(segmentId)}
                            </Badge>
                          ))}
                          {guest.segments.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{guest.segments.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {filteredAndSortedGuests.length === 0 && (
            <Card className="mt-4">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No guests found matching your criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Add to Segment Dialog */}
      <Dialog open={showAddToSegmentDialog} onOpenChange={setShowAddToSegmentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Guests to Segment</DialogTitle>
            <DialogDescription>
              Add {selectedGuests.length} selected guest{selectedGuests.length !== 1 ? 's' : ''} to a segment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Segment</label>
              <Select value={selectedSegmentId} onValueChange={setSelectedSegmentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a segment..." />
                </SelectTrigger>
                <SelectContent>
                  {segments.map((segment) => (
                    <SelectItem key={segment.id} value={segment.id}>
                      {segment.name} ({segment.guestCount} guests)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-lg border p-4 bg-muted/50">
              <p className="text-sm font-medium mb-2">Selected Guests:</p>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {selectedGuests.slice(0, 10).map(guestId => {
                  const guest = guests.find(g => g.id === guestId);
                  return guest ? (
                    <p key={guest.id} className="text-sm text-muted-foreground">
                      • {guest.name}
                    </p>
                  ) : null;
                })}
                {selectedGuests.length > 10 && (
                  <p className="text-sm text-muted-foreground">
                    ... and {selectedGuests.length - 10} more
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddToSegmentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddToSegment} disabled={!selectedSegmentId}>
              Add to Segment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Confirmation Dialog */}
      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Remove Guests
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {selectedGuests.length} guest{selectedGuests.length !== 1 ? 's' : ''}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="rounded-lg border p-4 bg-muted/50 max-h-60 overflow-y-auto">
            {selectedGuests.slice(0, 10).map(guestId => {
              const guest = guests.find(g => g.id === guestId);
              return guest ? (
                <p key={guest.id} className="text-sm text-muted-foreground py-1">
                  • {guest.name} ({guest.email})
                </p>
              ) : null;
            })}
            {selectedGuests.length > 10 && (
              <p className="text-sm text-muted-foreground py-1">
                ... and {selectedGuests.length - 10} more
              </p>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleRemoveGuests}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove Guests
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Guest Detail Panel */}
      <GuestDetailPanel
        guest={selectedGuest}
        segments={segments}
        isOpen={showGuestDetail}
        onClose={() => {
          setShowGuestDetail(false);
          setSelectedGuest(null);
        }}
      />
    </div>
  );
};

export default GuestDirectory;