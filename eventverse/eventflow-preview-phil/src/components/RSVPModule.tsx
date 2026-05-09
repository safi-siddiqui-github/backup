import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Mail,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Settings,
  Upload,
  Link2,
  BarChart3
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AddGuestDialog from "./AddGuestDialog";
import RSVPForm from "./RSVPForm";
import GroupManagementDialog from "./GroupManagementDialog";
import RSVPSettings from "./rsvp/RSVPSettings";
import RSVPFormBuilder from "./rsvp/RSVPFormBuilder";
import GuestList from "./rsvp/GuestList";
import { cn } from "@/lib/utils";
import { RSVPGroup, Guest, RSVPSettings as RSVPSettingsType, CustomField, FoodChoice } from "@/types/rsvp";

const RSVPModule = ({ event, onBack }) => {
  const [activeView, setActiveView] = useState<'dashboard' | 'guests' | 'groups' | 'settings' | 'form' | 'analytics' | 'builder'>('dashboard');
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);
  const [isGroupManagementOpen, setIsGroupManagementOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterGroup, setFilterGroup] = useState<string>("all");

  // Enhanced state management
  const [rsvpSettings, setRsvpSettings] = useState<RSVPSettingsType>({
    allowPlusOnes: true,
    maxPlusOnes: 2,
    publicRegistration: false,
    requireApproval: false,
    autoReminders: true,
    responseOptions: 'yes-no-maybe',
    registryLinks: [],
    enableWaitlist: false,
    collectDietaryInfo: true,
    enableCustomFields: false
  });

  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [foodChoices, setFoodChoices] = useState<FoodChoice[]>([]);

  // Mock data
  const [guests, setGuests] = useState<Guest[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1234567890",
      group: "family",
      status: "attending",
      plusOnes: 1,
      plusOneNames: ["John Johnson"],
      dietaryRestrictions: "Vegetarian",
      invitedDate: new Date('2024-01-15'),
      respondedDate: new Date('2024-01-18'),
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike@example.com",
      group: "friends",
      status: "pending",
      plusOnes: 0,
      invitedDate: new Date('2024-01-15'),
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: "3",
      name: "Emma Davis",
      email: "emma@example.com",
      phone: "+1987654321",
      group: "work",
      status: "declined",
      plusOnes: 0,
      notes: "Travel conflict",
      invitedDate: new Date('2024-01-15'),
      respondedDate: new Date('2024-01-20'),
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      email: "alex@example.com",
      phone: "+1555123456",
      group: "friends",
      status: "attending",
      plusOnes: 2,
      plusOneNames: ["Maria Rodriguez", "Carlos Rodriguez"],
      dietaryRestrictions: "Gluten-free",
      invitedDate: new Date('2024-01-16'),
      respondedDate: new Date('2024-01-19'),
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: "5",
      name: "Lisa Thompson",
      email: "lisa@example.com",
      group: "work",
      status: "maybe",
      plusOnes: 1,
      plusOneNames: ["David Thompson"],
      invitedDate: new Date('2024-01-17'),
      respondedDate: new Date('2024-01-21')
    }
  ]);

  const [groups, setGroups] = useState<RSVPGroup[]>([
    { id: "family", name: "Family", description: "Close family members", color: "bg-red-500", memberLimit: 12, guestCount: 0 },
    { id: "friends", name: "Friends", description: "Personal friends", color: "bg-blue-500", memberLimit: 25, guestCount: 0 },
    { id: "work", name: "Work Colleagues", description: "Professional contacts", color: "bg-green-500", memberLimit: 15, guestCount: 0 },
    { id: "vip", name: "VIP Guests", description: "Special invited guests", color: "bg-purple-500", memberLimit: 8, guestCount: 0 }
  ]);

  // Calculate guest counts for groups
  const groupsWithCounts = groups.map(group => ({
    ...group,
    guestCount: guests.filter(guest => guest.group === group.id).length
  }));

  // Helper function to get group statistics
  const getGroupStats = (groupId: string) => {
    const groupGuests = guests.filter(guest => guest.group === groupId);
    return {
      total: groupGuests.length,
      attending: groupGuests.filter(g => g.status === 'attending').length,
      declined: groupGuests.filter(g => g.status === 'declined').length,
      pending: groupGuests.filter(g => g.status === 'pending').length,
      maybe: groupGuests.filter(g => g.status === 'maybe').length
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'attending': return 'bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20';
      case 'declined': return 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20';
      case 'maybe': return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'attending': return <CheckCircle className="w-4 h-4" />;
      case 'declined': return <XCircle className="w-4 h-4" />;
      case 'maybe': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || guest.status === filterStatus;
    const matchesGroup = filterGroup === 'all' || guest.group === filterGroup;
    return matchesSearch && matchesStatus && matchesGroup;
  });

  const stats = {
    total: guests.length,
    attending: guests.filter(g => g.status === 'attending').length,
    declined: guests.filter(g => g.status === 'declined').length,
    pending: guests.filter(g => g.status === 'pending').length,
    maybe: guests.filter(g => g.status === 'maybe').length,
    totalWithPlusOnes: guests.reduce((sum, g) => sum + (g.status === 'attending' ? 1 + g.plusOnes : 0), 0)
  };

  const addGuest = (guestData: Omit<Guest, 'id' | 'invitedDate'>) => {
    const newGuest: Guest = {
      ...guestData,
      id: Date.now().toString(),
      invitedDate: new Date()
    };
    setGuests([...guests, newGuest]);
  };

  if (activeView === 'form') {
    return (
      <RSVPForm 
        event={event} 
        groups={groups} 
        customFields={customFields}
        foodChoices={foodChoices}
        settings={rsvpSettings}
        onBack={() => setActiveView('dashboard')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-foreground">RSVP Management</h1>
                <p className="text-muted-foreground text-sm">{event.eventName}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setActiveView('form')}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview Form
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
              >
                <Link2 className="w-4 h-4 mr-2" />
                Share Link
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsAddGuestOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Guest
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/95 backdrop-blur-sm">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="builder">Form Builder</TabsTrigger>
            <TabsTrigger value="guests">Guest List</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Invited</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                </CardContent>
              </Card>
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Attending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.attending}</div>
                  <div className="text-xs text-gray-500">+{stats.totalWithPlusOnes - stats.attending} plus ones</div>
                </CardContent>
              </Card>
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                </CardContent>
              </Card>
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Declined</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{stats.declined}</div>
                </CardContent>
              </Card>
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Response Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(((stats.total - stats.pending) / stats.total) * 100)}%
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 backdrop-blur-xl border-border/30 shadow-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50"></div>
              <CardHeader className="relative z-10 pb-4">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent flex items-center gap-2">
                  🎉 Recent Activity
                </CardTitle>
                <CardDescription className="text-muted-foreground/80 font-medium">
                  Hot off the press! Your latest RSVP responses
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {guests
                    .filter(g => g.respondedDate)
                    .sort((a, b) => (b.respondedDate?.getTime() || 0) - (a.respondedDate?.getTime() || 0))
                    .slice(0, 5)
                    .map((guest, index) => (
                      <div 
                        key={guest.id} 
                         className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-background/80 to-muted/20 border border-border/30 hover:from-primary/5 hover:to-secondary/5 hover:border-primary/20 transition-all duration-300 shadow-md hover:shadow-lg animate-fade-in group"
                         style={{ animationDelay: `${index * 100}ms` }}
                       >
                         <div className="flex-shrink-0">
                           <div className="relative">
                             <Avatar className="w-12 h-12 border-2 border-background">
                               <AvatarImage src={guest.avatar} alt={guest.name} />
                               <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                 {guest.name.split(' ').map(n => n[0]).join('')}
                               </AvatarFallback>
                             </Avatar>
                             <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-background">
                               {guest.status === 'attending' && (
                                 <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-xs">🎊</div>
                               )}
                               {guest.status === 'declined' && (
                                 <div className="w-6 h-6 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center text-xs">😔</div>
                               )}
                               {guest.status === 'maybe' && (
                                 <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs">🤔</div>
                               )}
                               {guest.status === 'pending' && (
                                 <div className="w-6 h-6 bg-gradient-to-br from-gray-400 to-slate-500 rounded-full flex items-center justify-center text-xs">⏳</div>
                               )}
                             </div>
                           </div>
                         </div>
                         <div className="flex-1 min-w-0">
                           <div className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                             {guest.name}
                           </div>
                           <div className="text-sm text-muted-foreground flex items-center gap-2">
                             <span>📅 {guest.respondedDate?.toLocaleDateString()}</span>
                             {guest.status === 'attending' && guest.plusOnes > 0 && (
                               <span className="text-green-600 font-medium">
                                 {guest.plusOneNames && guest.plusOneNames.length > 0 
                                   ? `+${guest.plusOneNames.join(', ')} 👥`
                                   : `+${guest.plusOnes} guest${guest.plusOnes > 1 ? 's' : ''} 👥`
                                 }
                               </span>
                             )}
                           </div>
                         </div>
                        <Badge 
                          className={cn(
                            "text-white font-semibold px-3 py-1 shadow-md",
                            guest.status === 'attending' && "bg-gradient-to-r from-green-500 to-emerald-600 animate-pulse",
                            guest.status === 'declined' && "bg-gradient-to-r from-red-500 to-rose-600",
                            guest.status === 'maybe' && "bg-gradient-to-r from-yellow-500 to-orange-600",
                            guest.status === 'pending' && "bg-gradient-to-r from-gray-500 to-slate-600"
                          )}
                        >
                          {guest.status === 'attending' && "🎉 Coming!"}
                          {guest.status === 'declined' && "❌ Can't make it"}
                          {guest.status === 'maybe' && "🤷 Maybe"}
                          {guest.status === 'pending' && "⌛ Pending"}
                        </Badge>
                      </div>
                    ))}
                  {guests.filter(g => g.respondedDate).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <div className="text-6xl mb-4">📭</div>
                      <p className="text-lg font-medium">No responses yet!</p>
                      <p className="text-sm">Your guests will appear here once they RSVP</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="builder" className="space-y-4">
            <RSVPFormBuilder
              customFields={customFields}
              onUpdateCustomFields={setCustomFields}
              foodChoices={foodChoices}
              onUpdateFoodChoices={setFoodChoices}
              settings={rsvpSettings}
              onUpdateSettings={setRsvpSettings}
              groups={groups}
              event={event}
            />
          </TabsContent>

          <TabsContent value="guests" className="space-y-4">
            {/* Enhanced Search and Filters */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search guests..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="border rounded-md px-3 py-2 text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="attending">Attending</option>
                      <option value="declined">Declined</option>
                      <option value="maybe">Maybe</option>
                      <option value="pending">Pending</option>
                    </select>
                    <select
                      value={filterGroup}
                      onChange={(e) => setFilterGroup(e.target.value)}
                      className="border rounded-md px-3 py-2 text-sm"
                    >
                      <option value="all">All Groups</option>
                      {groups.map(group => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                      ))}
                    </select>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guest Table */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Guest</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Group</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Plus Ones</TableHead>
                      <TableHead>Invited</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGuests.map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={guest.avatar} alt={guest.name} />
                              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                {guest.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{guest.name}</div>
                              {guest.dietaryRestrictions && (
                                <div className="text-xs text-gray-500">
                                  Dietary: {guest.dietaryRestrictions}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{guest.email}</div>
                            {guest.phone && (
                              <div className="text-gray-500">{guest.phone}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {guest.group && (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${groups.find(g => g.id === guest.group)?.color}`} />
                              {groups.find(g => g.id === guest.group)?.name}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(guest.status)}
                            <Badge className={getStatusColor(guest.status)}>
                              {guest.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {guest.plusOnes === 0 ? (
                              <span className="text-gray-500">None</span>
                            ) : guest.plusOneNames && guest.plusOneNames.length > 0 ? (
                              <div>
                                <div className="font-medium text-primary">+{guest.plusOnes}</div>
                                <div className="text-xs text-gray-600">
                                  {guest.plusOneNames.join(', ')}
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div className="font-medium text-primary">+{guest.plusOnes}</div>
                                <div className="text-xs text-gray-500">
                                  {guest.plusOnes === 1 ? 'guest' : 'guests'}
                                </div>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{guest.invitedDate.toLocaleDateString()}</div>
                            {guest.respondedDate && (
                              <div className="text-gray-500">
                                Responded: {guest.respondedDate.toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Mail className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="groups" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-white">Manage Guest Groups</h3>
                <p className="text-purple-100 text-sm">Organize your guests into different categories</p>
              </div>
              <Button 
                onClick={() => setIsGroupManagementOpen(true)}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                <Settings className="w-4 h-4 mr-2" />
                Manage Groups
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {groupsWithCounts.map((group) => {
                const groupStats = getGroupStats(group.id);
                return (
                  <Card key={group.id} className="bg-white/95 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${group.color}`} />
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                      </div>
                      <CardDescription>{group.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Invited:</span>
                            <span className="font-medium">{groupStats.total}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Attending:</span>
                            <span className="font-medium text-green-600">{groupStats.attending}</span>
                          </div>
                          {group.memberLimit && (
                            <div className="flex justify-between col-span-2">
                              <span className="text-gray-600">Limit:</span>
                              <span className="font-medium">{group.memberLimit}</span>
                            </div>
                          )}
                        </div>
                        
                        {group.memberLimit && (
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${group.color}`}
                              style={{ width: `${Math.min((groupStats.total / group.memberLimit) * 100, 100)}%` }}
                            />
                          </div>
                        )}

                        <div className="pt-2">
                          <GuestList 
                            guests={guests}
                            groupId={group.id}
                            groupName={group.name}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              {/* Add New Group Card */}
              <Card 
                className="bg-white/95 backdrop-blur-sm border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer"
                onClick={() => setIsGroupManagementOpen(true)}
              >
                <CardContent className="flex flex-col items-center justify-center h-full p-6">
                  <UserPlus className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Add New Group</span>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <RSVPSettings settings={rsvpSettings} onUpdate={setRsvpSettings} />
          </TabsContent>

        </Tabs>
      </div>

      <AddGuestDialog
        isOpen={isAddGuestOpen}
        onClose={() => setIsAddGuestOpen(false)}
        onAddGuest={addGuest}
        groups={groups}
      />

      <GroupManagementDialog
        isOpen={isGroupManagementOpen}
        onClose={() => setIsGroupManagementOpen(false)}
        groups={groupsWithCounts}
        onUpdateGroups={setGroups}
      />
    </div>
  );
};

export default RSVPModule;
