import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Users, UserPlus, MessageSquare, Heart, MapPin } from 'lucide-react';
import type { Guest, GuestInfo, GuestDiscoveryFilter } from '@/types';

// Mock data - same structure as before but cleaner display
const mockGuests: Guest[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    email: 'emma.thompson@email.com',
    relationToHost: 'College Friend',
    rsvpStatus: 'confirmed',
    tableNumber: 3,
    seatNumber: 2,
    dietaryRestrictions: ['vegetarian'],
    interests: ['photography', 'travel'],
    mutualConnections: 2,
    avatar: '/api/placeholder/32/32'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    relationToHost: 'Work Colleague',
    rsvpStatus: 'confirmed',
    tableNumber: 5,
    seatNumber: 1,
    dietaryRestrictions: [],
    interests: ['music', 'cooking'],
    mutualConnections: 1,
    avatar: '/api/placeholder/32/32'
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah.williams@email.com',
    relationToHost: 'Family Friend',
    rsvpStatus: 'pending',
    tableNumber: 2,
    seatNumber: 4,
    dietaryRestrictions: ['gluten-free'],
    interests: ['reading', 'yoga'],
    mutualConnections: 3,
    avatar: '/api/placeholder/32/32'
  }
];

interface GuestDiscoveryTabProps {
  currentGuest: GuestInfo;
  eventId: string;
}

export const GuestDiscoveryTab: React.FC<GuestDiscoveryTabProps> = ({ currentGuest, eventId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOptions: GuestDiscoveryFilter[] = [
    { value: 'all', label: 'All Guests', count: mockGuests.length },
    { value: 'confirmed', label: 'Confirmed', count: mockGuests.filter(g => g.rsvpStatus === 'confirmed').length },
    { value: 'mutual', label: 'Mutual Friends', count: mockGuests.filter(g => g.mutualConnections > 0).length },
  ];

  const filteredGuests = mockGuests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.relationToHost.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'confirmed' && guest.rsvpStatus === 'confirmed') ||
                         (selectedFilter === 'mutual' && guest.mutualConnections > 0);
    
    return matchesSearch && matchesFilter;
  });

  const handleConnect = (guestId: string) => {
    console.log('Connecting with guest:', guestId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'declined': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Clean stats header */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-semibold text-foreground">{mockGuests.length}</div>
              <div className="text-sm text-muted-foreground">Total Guests</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-foreground">
                {mockGuests.filter(g => g.rsvpStatus === 'confirmed').length}
              </div>
              <div className="text-sm text-muted-foreground">Confirmed</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-foreground">
                {mockGuests.filter(g => g.mutualConnections > 0).length}
              </div>
              <div className="text-sm text-muted-foreground">Mutual Friends</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simple search and filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedFilter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(option.value)}
              className="text-sm"
            >
              {option.label} ({option.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Clean guest list */}
      <div className="space-y-3">
        {filteredGuests.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No guests found</p>
            </CardContent>
          </Card>
        ) : (
          filteredGuests.map((guest) => (
            <Card key={guest.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={guest.avatar} alt={guest.name} />
                    <AvatarFallback>{guest.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">{guest.name}</h3>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(guest.rsvpStatus).split(' ')[0]}`} />
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{guest.relationToHost}</p>
                    
                    {guest.mutualConnections > 0 && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Heart className="h-3 w-3" />
                        {guest.mutualConnections} mutual friend{guest.mutualConnections > 1 ? 's' : ''}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      Table {guest.tableNumber}, Seat {guest.seatNumber}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleConnect(guest.id)}
                      className="h-8 px-3"
                    >
                      <UserPlus className="h-3 w-3 mr-1" />
                      Connect
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-8 px-3"
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
                
                {(guest.interests.length > 0 || guest.dietaryRestrictions.length > 0) && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex flex-wrap gap-1">
                      {guest.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="text-xs px-2 py-0.5">
                          {interest}
                        </Badge>
                      ))}
                      {guest.dietaryRestrictions.map((restriction) => (
                        <Badge 
                          key={restriction} 
                          variant="outline" 
                          className="text-xs px-2 py-0.5 border-warning text-warning-foreground"
                        >
                          {restriction}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};