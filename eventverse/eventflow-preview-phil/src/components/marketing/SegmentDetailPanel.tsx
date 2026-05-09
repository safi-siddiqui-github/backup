import { GuestSegment, HistoricalGuest, MarketingCampaign } from "@/types/marketing";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Users, Filter, TrendingUp, DollarSign, 
  Calendar, Edit, Download, Trash2, Target, MapPin
} from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AvatarStack } from "./AvatarStack";

interface SegmentDetailPanelProps {
  segment: GuestSegment | null;
  guests: HistoricalGuest[];
  campaigns: MarketingCampaign[];
  isOpen: boolean;
  onClose: () => void;
  onEdit: (segment: GuestSegment) => void;
  onDelete: (segmentId: string) => void;
  onCreateCampaign: (segment: GuestSegment) => void;
}

const SegmentDetailPanel = ({
  segment,
  guests,
  campaigns,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onCreateCampaign
}: SegmentDetailPanelProps) => {
  if (!segment) return null;

  // Get guests in this segment
  const segmentGuests = guests.filter(g => g.segments.includes(segment.id));
  
  // Calculate analytics
  const totalSpent = segmentGuests.reduce((acc, g) => acc + g.totalSpent, 0);
  const avgSpent = segmentGuests.length > 0 ? totalSpent / segmentGuests.length : 0;
  const totalEvents = segmentGuests.reduce((acc, g) => acc + g.attendanceCount, 0);

  // Age distribution
  const ageDistribution = segmentGuests.reduce((acc, g) => {
    const range = g.demographics?.ageRange || 'Unknown';
    acc[range] = (acc[range] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const ageData = Object.entries(ageDistribution).map(([range, count]) => ({
    name: range,
    value: count
  }));

  // Event type distribution
  const eventTypeDistribution = segmentGuests.reduce((acc, g) => {
    g.eventHistory.forEach(event => {
      acc[event.eventType] = (acc[event.eventType] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const eventTypeData = Object.entries(eventTypeDistribution).map(([type, count]) => ({
    name: type,
    count: count
  }));

  // Location distribution
  const locationDistribution = segmentGuests.reduce((acc, g) => {
    const location = g.demographics?.location || 'Unknown';
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topLocations = Object.entries(locationDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Campaigns using this segment
  const campaignsUsingSegment = campaigns.filter(c => 
    c.targetSegments.includes(segment.id)
  );

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  const getFilterDescription = (filter: any) => {
    const operatorText = {
      'equals': 'is',
      'contains': 'contains',
      'greaterThan': 'greater than',
      'lessThan': 'less than',
      'between': 'between',
      'in': 'in'
    }[filter.operator] || filter.operator;

    const valueText = Array.isArray(filter.value) 
      ? filter.value.join(', ') 
      : typeof filter.value === 'object' && 'min' in filter.value
        ? `${filter.value.min} - ${filter.value.max}`
        : filter.value;

    return `${filter.field.replace(/([A-Z])/g, ' $1').trim()} ${operatorText} ${valueText}`;
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <SheetTitle className="text-2xl">{segment.name}</SheetTitle>
              <p className="text-sm text-muted-foreground mt-1">{segment.description}</p>
            </div>
            <Badge variant={segment.type === 'auto' ? 'default' : 'secondary'}>
              {segment.type === 'auto' ? 'Automatic' : 'Custom'}
            </Badge>
          </div>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Segment Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5" />
                Segment Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-3xl font-bold">{segment.guestCount}</p>
                  <p className="text-xs text-muted-foreground">Total Guests</p>
                </div>
                <div className="text-center p-4 bg-green-500/10 rounded-lg">
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-500" />
                  <p className="text-3xl font-bold">${avgSpent.toFixed(0)}</p>
                  <p className="text-xs text-muted-foreground">Avg Spent</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Spending</p>
                  <p className="font-semibold text-lg">${totalSpent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Events</p>
                  <p className="font-semibold text-lg">{totalEvents}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p className="font-medium">{new Date(segment.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{new Date(segment.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filter Criteria */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filter Criteria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {segment.filters.map((filter, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {idx > 0 && <span className="text-xs text-muted-foreground font-semibold">AND</span>}
                    <Badge variant="outline" className="font-normal">
                      {getFilterDescription(filter)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Guest Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5" />
                Guest Preview
              </CardTitle>
              <CardDescription>
                Showing {Math.min(10, segmentGuests.length)} of {segmentGuests.length} guests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <AvatarStack count={segmentGuests.length} maxVisible={8} size="md" />
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {segmentGuests.slice(0, 10).map((guest) => (
                  <div key={guest.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                        {guest.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{guest.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{guest.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">${guest.totalSpent.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{guest.attendanceCount} events</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Segment Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Age Distribution */}
              {ageData.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-3">Age Distribution</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={ageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="hsl(var(--primary))"
                        dataKey="value"
                      >
                        {ageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Event Type Distribution */}
              {eventTypeData.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-3">Event Type Attendance</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={eventTypeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Top Locations */}
              {topLocations.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-3">Top Locations</h4>
                  <div className="space-y-2">
                    {topLocations.map(([location, count]) => (
                      <div key={location} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{location}</span>
                        </div>
                        <Badge variant="secondary">{count} guests</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Campaign Usage */}
          {campaignsUsingSegment.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Campaign Usage
                </CardTitle>
                <CardDescription>
                  This segment is used in {campaignsUsingSegment.length} campaign{campaignsUsingSegment.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {campaignsUsingSegment.map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{campaign.name}</p>
                        <p className="text-sm text-muted-foreground">{campaign.description}</p>
                      </div>
                      <Badge variant="outline">{campaign.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button onClick={() => onEdit(segment)} variant="default">
                <Edit className="w-4 h-4 mr-2" />
                Edit Segment
              </Button>
              <Button onClick={() => onCreateCampaign(segment)} variant="outline">
                <Target className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Guest List
              </Button>
              <Button 
                onClick={() => onDelete(segment.id)} 
                variant="destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Segment
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SegmentDetailPanel;
