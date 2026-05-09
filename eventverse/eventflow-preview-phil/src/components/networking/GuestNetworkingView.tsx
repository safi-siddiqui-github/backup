import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus, Calendar, MessageSquare, Search, Building2, Briefcase } from "lucide-react";
import { NetworkingAttendee, ConnectionRequest, ScheduledMeeting } from "@/types/networking";

interface GuestNetworkingViewProps {
  event: any;
}

const GuestNetworkingView = ({ event }: GuestNetworkingViewProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");

  // Mock attendees data
  const mockAttendees: NetworkingAttendee[] = useMemo(() => [
    { id: '1', name: 'Sarah Johnson', email: 'sarah.j@techcorp.com', company: 'TechCorp Inc.', role: 'CEO', interests: ['AI', 'Leadership', 'Innovation'], connectionStatus: 'connected', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'Michael Chen', email: 'mchen@startupventures.com', company: 'Startup Ventures', role: 'CTO', interests: ['Web3', 'Cloud', 'Security'], connectionStatus: 'none', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Emily Rodriguez', email: 'emily.r@designstudio.com', company: 'Design Studio', role: 'Design Director', interests: ['UX', 'Branding', 'Innovation'], connectionStatus: 'connected', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: '4', name: 'David Kim', email: 'dkim@datainsights.io', company: 'Data Insights', role: 'Data Scientist', interests: ['ML', 'Analytics', 'AI'], connectionStatus: 'pending', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: '5', name: 'Jessica Martinez', email: 'jmartinez@marketpro.com', company: 'MarketPro', role: 'Marketing VP', interests: ['Growth', 'Strategy', 'Content'], connectionStatus: 'connected', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: '6', name: 'Alex Thompson', email: 'athompson@cloudtech.com', company: 'CloudTech', role: 'Engineering Manager', interests: ['DevOps', 'Cloud', 'Leadership'], connectionStatus: 'none', avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: '7', name: 'Priya Patel', email: 'ppatel@financeai.com', company: 'Finance AI', role: 'Product Manager', interests: ['Fintech', 'AI', 'Product'], connectionStatus: 'connected', avatar: 'https://i.pravatar.cc/150?img=7' },
    { id: '8', name: 'James Wilson', email: 'jwilson@salesforce.com', company: 'Salesforce', role: 'Sales Director', interests: ['Sales', 'CRM', 'Strategy'], connectionStatus: 'none', avatar: 'https://i.pravatar.cc/150?img=8' },
  ], []);

  const myConnections = mockAttendees.filter(a => a.connectionStatus === 'connected');
  
  const mockPendingRequests: ConnectionRequest[] = useMemo(() => [
    { id: '1', from: mockAttendees[3], to: mockAttendees[0], message: 'Would love to discuss ML applications!', timestamp: new Date(), status: 'pending' },
    { id: '2', from: mockAttendees[5], to: mockAttendees[0], message: 'Interested in your cloud architecture approach', timestamp: new Date(), status: 'pending' },
  ], [mockAttendees]);

  const mockMeetings: ScheduledMeeting[] = useMemo(() => [
    { id: '1', attendee: mockAttendees[0], date: new Date(Date.now() + 86400000), time: '10:00 AM', duration: 30, location: 'Conference Room A', status: 'scheduled' },
    { id: '2', attendee: mockAttendees[2], date: new Date(Date.now() + 86400000), time: '2:00 PM', duration: 45, location: 'Networking Lounge', status: 'scheduled' },
    { id: '3', attendee: mockAttendees[4], date: new Date(Date.now() + 172800000), time: '11:30 AM', duration: 30, location: 'Coffee Bar', status: 'scheduled' },
  ], [mockAttendees]);

  const filteredAttendees = mockAttendees.filter(attendee => {
    const matchesSearch = attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         attendee.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         attendee.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || attendee.role.toLowerCase().includes(filterRole.toLowerCase());
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Networking Hub
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Connect with {mockAttendees.length}+ attendees and schedule meetings
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-3xl font-bold text-purple-600">{myConnections.length}</div>
              <div className="text-sm text-muted-foreground">Connections</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{mockPendingRequests.length}</div>
              <div className="text-sm text-muted-foreground">Pending Requests</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-3xl font-bold text-green-600">{mockMeetings.length}</div>
              <div className="text-sm text-muted-foreground">Scheduled Meetings</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="directory" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="directory">Directory</TabsTrigger>
          <TabsTrigger value="connections">My Connections</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search attendees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border rounded-md bg-background"
            >
              <option value="all">All Roles</option>
              <option value="ceo">CEO</option>
              <option value="cto">CTO</option>
              <option value="manager">Manager</option>
              <option value="director">Director</option>
            </select>
          </div>

          <div className="grid gap-4">
            {filteredAttendees.map((attendee) => (
              <Card key={attendee.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={attendee.avatar} />
                      <AvatarFallback>{attendee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{attendee.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Building2 className="w-4 h-4" />
                        <span>{attendee.company}</span>
                        <span>•</span>
                        <Briefcase className="w-4 h-4" />
                        <span>{attendee.role}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {attendee.interests.map((interest) => (
                          <Badge key={interest} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {attendee.connectionStatus === 'connected' && (
                          <>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Message
                            </Button>
                            <Button size="sm" variant="outline">
                              <Calendar className="w-4 h-4 mr-2" />
                              Schedule Meeting
                            </Button>
                          </>
                        )}
                        {attendee.connectionStatus === 'pending' && (
                          <Button size="sm" variant="outline" disabled>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Request Pending
                          </Button>
                        )}
                        {attendee.connectionStatus === 'none' && (
                          <Button size="sm">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connections" className="space-y-4">
          <div className="grid gap-4">
            {myConnections.map((connection) => (
              <Card key={connection.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={connection.avatar} />
                      <AvatarFallback>{connection.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{connection.name}</h3>
                      <p className="text-sm text-muted-foreground">{connection.company} • {connection.role}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          {mockPendingRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={request.from.avatar} />
                    <AvatarFallback>{request.from.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{request.from.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{request.from.company} • {request.from.role}</p>
                    <p className="text-sm italic mb-3">"{request.message}"</p>
                    <div className="flex gap-2">
                      <Button size="sm">Accept</Button>
                      <Button size="sm" variant="outline">Decline</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="meetings" className="space-y-4">
          {mockMeetings.map((meeting) => (
            <Card key={meeting.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={meeting.attendee.avatar} />
                    <AvatarFallback>{meeting.attendee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{meeting.attendee.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{meeting.attendee.company}</p>
                    <div className="flex items-center gap-4 text-sm mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {meeting.date.toLocaleDateString()}
                      </span>
                      <span>{meeting.time}</span>
                      <span>• {meeting.duration} min</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">📍 {meeting.location}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Reschedule</Button>
                      <Button size="sm" variant="outline">Cancel</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuestNetworkingView;
