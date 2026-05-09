import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Users, 
  Utensils, 
  Camera, 
  User, 
  DoorOpen,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  Eye,
  EyeOff,
  Home
} from 'lucide-react';
import { GuestDiscoveryTab } from './GuestDiscoveryTab';
import { VenueRoomSelector } from './VenueRoomSelector';
import type { VenueFeature, TableGuest, TableLayout } from '@/types';

interface EnhancedGuestSeatingViewProps {
  guestName: string;
  guestEmail: string;
  tableNumber: number;
  seatNumber: number;
}


export const EnhancedGuestSeatingView: React.FC<EnhancedGuestSeatingViewProps> = ({
  guestName,
  guestEmail,
  tableNumber,
  seatNumber
}) => {
  const [activeRoom, setActiveRoom] = useState('main-hall');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [showVenueInfo, setShowVenueInfo] = useState(true);

  // Mock venue features
  const venueFeatures: VenueFeature[] = [
    { id: '1', name: 'Main Bar', type: 'bar', x: 100, y: 50 },
    { id: '2', name: "Men&apos;s Restroom", type: 'restroom', x: 300, y: 30 },
    { id: '3', name: "Women&apos;s Restroom", type: 'restroom', x: 320, y: 30 },
    { id: '4', name: 'Emergency Exit', type: 'exit', x: 400, y: 100 },
    { id: '5', name: 'Main Stage', type: 'stage', x: 200, y: 250 },
    { id: '6', name: 'Photo Booth', type: 'photo_booth', x: 50, y: 200 },
    { id: '7', name: 'Gift Table', type: 'gift_table', x: 350, y: 180 },
  ];

  // Mock tables (simplified positions)
  const tables: TableLayout[] = [
    { number: 1, x: 150, y: 100, guests: 8 },
    { number: 2, x: 250, y: 100, guests: 6 },
    { number: 3, x: 150, y: 150, guests: 8 }, // Guest's table
    { number: 4, x: 250, y: 150, guests: 8 },
    { number: 5, x: 200, y: 200, guests: 10 },
  ];

  // Mock table guests for selected table
  const tableGuests: TableGuest[] = [
    {
      id: '1',
      name: 'Emma Thompson',
      avatar: '/api/placeholder/32/32',
      relationToHost: 'College Friend',
      dietaryRestrictions: ['vegetarian']
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: '/api/placeholder/32/32',
      relationToHost: 'Work Colleague',
      dietaryRestrictions: []
    },
    {
      id: '3',
      name: guestName,
      relationToHost: 'Guest',
      dietaryRestrictions: []
    }
  ];

  const getFeatureIcon = (type: string) => {
    switch (type) {
      case 'bar': return Utensils;
      case 'restroom': return User;
      case 'exit': return DoorOpen;
      case 'stage': return Camera;
      case 'photo_booth': return Camera;
      case 'gift_table': return MapPin;
      default: return MapPin;
    }
  };

  const getFeatureColor = (type: string) => {
    switch (type) {
      case 'bar': return 'text-primary';
      case 'restroom': return 'text-muted-foreground';
      case 'exit': return 'text-destructive';
      case 'stage': return 'text-warning';
      case 'photo_booth': return 'text-success';
      case 'gift_table': return 'text-accent-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => setZoomLevel(1);
  const handleTableClick = (tableNum: number) => {
    setSelectedTable(selectedTable === tableNum ? null : tableNum);
  };

  return (
    <div className="space-y-6">
      {/* Clean hero header */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">Welcome to the Celebration</h1>
            <p className="text-muted-foreground">
              Hi {guestName}! You're seated at Table {tableNumber}, Seat {seatNumber}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Main tabs */}
      <Tabs defaultValue="venue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="venue">Interactive Venue</TabsTrigger>
          <TabsTrigger value="guests">Discover Guests</TabsTrigger>
          <TabsTrigger value="details">My Details</TabsTrigger>
        </TabsList>

        <TabsContent value="venue" className="space-y-6">
          {/* Room selector */}
          <VenueRoomSelector
            currentRoomId={activeRoom}
            onRoomChange={setActiveRoom}
          />

          {/* Venue map controls */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Venue Layout</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowVenueInfo(!showVenueInfo)}
                  >
                    {showVenueInfo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="ml-1 text-xs">{showVenueInfo ? 'Hide' : 'Show'} Info</span>
                  </Button>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" onClick={handleZoomOut}>
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleResetZoom}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleZoomIn}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Interactive venue map */}
              <div className="relative bg-muted/30 rounded-lg overflow-hidden" style={{ height: '400px' }}>
                <div 
                  className="relative w-full h-full"
                  style={{ 
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  {/* Venue features */}
                  {venueFeatures.map((feature) => {
                    const FeatureIcon = getFeatureIcon(feature.type);
                    return (
                      <div
                        key={feature.id}
                        className="absolute cursor-pointer group"
                        style={{ left: `${feature.x}px`, top: `${feature.y}px` }}
                        title={feature.name}
                      >
                        <div className="relative">
                          <FeatureIcon className={`h-6 w-6 ${getFeatureColor(feature.type)} group-hover:scale-110 transition-transform`} />
                          {showVenueInfo && (
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                              {feature.name}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Tables */}
                  {tables.map((table) => (
                    <div
                      key={table.number}
                      className={`absolute cursor-pointer group`}
                      style={{ left: `${table.x}px`, top: `${table.y}px` }}
                      onClick={() => handleTableClick(table.number)}
                    >
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all ${
                        table.number === tableNumber 
                          ? 'bg-primary text-primary-foreground border-primary shadow-lg' 
                          : selectedTable === table.number
                          ? 'bg-accent text-accent-foreground border-accent'
                          : 'bg-card text-card-foreground border-border hover:border-primary hover:shadow-md'
                      }`}>
                        {table.number}
                      </div>
                      {showVenueInfo && (
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-card border border-border rounded px-2 py-1 whitespace-nowrap">
                            {table.guests} guests
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Table details when selected */}
              {selectedTable && (
                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Table {selectedTable}</span>
                    {selectedTable === tableNumber && (
                      <Badge variant="secondary" className="text-xs">Your Table</Badge>
                    )}
                  </div>
                  <div className="grid gap-2 max-h-20 overflow-y-auto">
                    {tableGuests.map((guest) => (
                      <div key={guest.id} className="flex items-center gap-3 text-sm">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={guest.avatar} alt={guest.name} />
                          <AvatarFallback className="text-xs">
                            {guest.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-foreground">{guest.name}</span>
                        <span className="text-muted-foreground">• {guest.relationToHost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Simple venue guide */}
          {showVenueInfo && (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Bar & Drinks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Restrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-success" />
                    <span className="text-muted-foreground">Photo Booth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DoorOpen className="h-4 w-4 text-destructive" />
                    <span className="text-muted-foreground">Emergency Exit</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="guests">
          <GuestDiscoveryTab
            currentGuest={{ name: guestName, email: guestEmail }}
            eventId="attend-1"
          />
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          {/* My seating info */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Your Seating Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-semibold text-foreground">{tableNumber}</div>
                  <div className="text-sm text-muted-foreground">Table Number</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-semibold text-foreground">{seatNumber}</div>
                  <div className="text-sm text-muted-foreground">Seat Number</div>
                </div>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-3 text-foreground">Your Table Companions</h4>
                <div className="space-y-2">
                  {tableGuests.filter(guest => guest.name !== guestName).map((guest) => (
                    <div key={guest.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={guest.avatar} alt={guest.name} />
                        <AvatarFallback>{guest.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm text-foreground">{guest.name}</div>
                        <div className="text-xs text-muted-foreground">{guest.relationToHost}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dining preferences */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Dining Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Menu Selection</span>
                  <span className="text-sm font-medium text-foreground">Chicken Marsala</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Dietary Restrictions</span>
                  <span className="text-sm font-medium text-foreground">None</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Beverage Preference</span>
                  <span className="text-sm font-medium text-foreground">Wine Package</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};