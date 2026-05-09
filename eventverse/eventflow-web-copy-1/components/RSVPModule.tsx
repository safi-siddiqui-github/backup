"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CustomField,
  FoodChoice,
  Guest,
  RSVPGroup,
  RSVPSettings as RSVPSettingsType,
} from "@/types/rsvp";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle,
  Clock,
  Download,
  Edit,
  Eye,
  Link2,
  Mail,
  Plus,
  Search,
  Settings,
  Trash2,
  Upload,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import AddGuestDialog from "./AddGuestDialog";
import { EventFormData } from "./EnhancedEventCreationDialog";
import GroupManagementDialog from "./GroupManagementDialog";
import RSVPFormBuilder from "./rsvp/RSVPFormBuilder";
import RSVPSettings from "./rsvp/RSVPSettings";
import RSVPForm from "./RSVPForm";

type ActiveViewType =
  | "dashboard"
  | "guests"
  | "groups"
  | "settings"
  | "form"
  | "analytics";

const RSVPModule = ({
  event,
  onBack,
}: {
  event: EventFormData;
  onBack: () => void;
}) => {
  const [activeView, setActiveView] = useState<ActiveViewType | null>(
    "dashboard",
  );
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
    responseOptions: "yes-no-maybe",
    registryLinks: [],
    enableWaitlist: false,
    collectDietaryInfo: true,
    enableCustomFields: false,
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
      dietaryRestrictions: "Vegetarian",
      invitedDate: new Date("2024-01-15"),
      respondedDate: new Date("2024-01-18"),
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike@example.com",
      group: "friends",
      status: "pending",
      plusOnes: 0,
      invitedDate: new Date("2024-01-15"),
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
      invitedDate: new Date("2024-01-15"),
      respondedDate: new Date("2024-01-20"),
    },
  ]);

  const [groups, setGroups] = useState<RSVPGroup[]>([
    {
      id: "family",
      name: "Family",
      description: "Close family members",
      color: "bg-red-500",
      memberLimit: 12,
      guestCount: 0,
    },
    {
      id: "friends",
      name: "Friends",
      description: "Personal friends",
      color: "bg-blue-500",
      memberLimit: 25,
      guestCount: 0,
    },
    {
      id: "work",
      name: "Work Colleagues",
      description: "Professional contacts",
      color: "bg-green-500",
      memberLimit: 15,
      guestCount: 0,
    },
    {
      id: "vip",
      name: "VIP Guests",
      description: "Special invited guests",
      color: "bg-purple-500",
      memberLimit: 8,
      guestCount: 0,
    },
  ]);

  // Calculate guest counts for groups
  const groupsWithCounts = groups.map((group) => ({
    ...group,
    guestCount: guests.filter((guest) => guest.group === group.id).length,
  }));

  // Helper function to get group statistics
  const getGroupStats = (groupId: string) => {
    const groupGuests = guests.filter((guest) => guest.group === groupId);
    return {
      total: groupGuests.length,
      attending: groupGuests.filter((g) => g.status === "attending").length,
      declined: groupGuests.filter((g) => g.status === "declined").length,
      pending: groupGuests.filter((g) => g.status === "pending").length,
      maybe: groupGuests.filter((g) => g.status === "maybe").length,
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "attending":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      case "maybe":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "attending":
        return <CheckCircle className="h-4 w-4" />;
      case "declined":
        return <XCircle className="h-4 w-4" />;
      case "maybe":
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch =
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || guest.status === filterStatus;
    const matchesGroup = filterGroup === "all" || guest.group === filterGroup;
    return matchesSearch && matchesStatus && matchesGroup;
  });

  const stats = {
    total: guests.length,
    attending: guests.filter((g) => g.status === "attending").length,
    declined: guests.filter((g) => g.status === "declined").length,
    pending: guests.filter((g) => g.status === "pending").length,
    maybe: guests.filter((g) => g.status === "maybe").length,
    totalWithPlusOnes: guests.reduce(
      (sum, g) => sum + (g.status === "attending" ? 1 + g.plusOnes : 0),
      0,
    ),
  };

  const addGuest = (guestData: Omit<Guest, "id" | "invitedDate">) => {
    const newGuest: Guest = {
      ...guestData,
      id: Date.now().toString(),
      invitedDate: new Date(),
    };
    setGuests([...guests, newGuest]);
  };

  if (activeView === "form") {
    return (
      <RSVPForm
        event={event}
        groups={groups}
        customFields={customFields}
        foodChoices={foodChoices}
        settings={rsvpSettings}
        onBack={() => setActiveView("dashboard")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-10 border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2 text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-white">
                  RSVP Management
                </h1>
                <p className="text-sm text-purple-100">{event.eventName}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={() => setActiveView("form")}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview Form
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
              >
                <Link2 className="mr-2 h-4 w-4" />
                Share Link
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={() => setIsAddGuestOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Guest
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-6">
        <Tabs
          value={activeView ?? ""}
          onValueChange={(value) => setActiveView(value as ActiveViewType)}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6 bg-white/95 backdrop-blur-sm">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="builder">Form Builder</TabsTrigger>
            <TabsTrigger value="guests">Guest List</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent
            value="dashboard"
            className="space-y-6"
          >
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Invited
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Attending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {stats.attending}
                  </div>
                  <div className="text-xs text-gray-500">
                    +{stats.totalWithPlusOnes - stats.attending} plus ones
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Pending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">
                    {stats.pending}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Declined
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {stats.declined}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Response Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(
                      ((stats.total - stats.pending) / stats.total) * 100,
                    )}
                    %
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2"
                    onClick={() => setIsAddGuestOpen(true)}
                  >
                    <UserPlus className="h-6 w-6" />
                    Add Guests
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2"
                  >
                    <Upload className="h-6 w-6" />
                    Import CSV
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2"
                  >
                    <Mail className="h-6 w-6" />
                    Send Invites
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2"
                  >
                    <Download className="h-6 w-6" />
                    Export List
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest RSVP responses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {guests
                    .filter((g) => g.respondedDate)
                    .sort(
                      (a, b) =>
                        (b.respondedDate?.getTime() || 0) -
                        (a.respondedDate?.getTime() || 0),
                    )
                    .slice(0, 5)
                    .map((guest) => (
                      <div
                        key={guest.id}
                        className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50"
                      >
                        {getStatusIcon(guest.status)}
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {guest.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {guest.respondedDate?.toLocaleDateString()}
                          </div>
                        </div>
                        <Badge className={getStatusColor(guest.status)}>
                          {guest.status}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value="builder"
            className="space-y-4"
          >
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

          <TabsContent
            value="guests"
            className="space-y-4"
          >
            {/* Enhanced Search and Filters */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
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
                      className="rounded-md border px-3 py-2 text-sm"
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
                      className="rounded-md border px-3 py-2 text-sm"
                    >
                      <option value="all">All Groups</option>
                      {groups.map((group) => (
                        <option
                          key={group.id}
                          value={group.id}
                        >
                          {group.name}
                        </option>
                      ))}
                    </select>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <Download className="mr-2 h-4 w-4" />
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
                          <div>
                            <div className="font-medium">{guest.name}</div>
                            {guest.dietaryRestrictions && (
                              <div className="text-xs text-gray-500">
                                Dietary: {guest.dietaryRestrictions}
                              </div>
                            )}
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
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <div
                                className={`h-2 w-2 rounded-full ${groups.find((g) => g.id === guest.group)?.color}`}
                              />
                              {groups.find((g) => g.id === guest.group)?.name}
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
                          <span className="text-sm">{guest.plusOnes}</span>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{guest.invitedDate.toLocaleDateString()}</div>
                            {guest.respondedDate && (
                              <div className="text-gray-500">
                                Responded:{" "}
                                {guest.respondedDate.toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
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

          <TabsContent
            value="groups"
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Manage Guest Groups
                </h3>
                <p className="text-sm text-purple-100">
                  Organize your guests into different categories
                </p>
              </div>
              <Button
                onClick={() => setIsGroupManagementOpen(true)}
                className="bg-white/20 text-white hover:bg-white/30"
              >
                <Settings className="mr-2 h-4 w-4" />
                Manage Groups
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {groupsWithCounts.map((group) => {
                const groupStats = getGroupStats(group.id);
                return (
                  <Card
                    key={group.id}
                    className="bg-white/95 backdrop-blur-sm"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-4 w-4 rounded-full ${group.color}`}
                        />
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                      </div>
                      <CardDescription>{group.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Total Invited:
                            </span>
                            <span className="font-medium">
                              {groupStats.total}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Attending:</span>
                            <span className="font-medium text-green-600">
                              {groupStats.attending}
                            </span>
                          </div>
                          {group.memberLimit && (
                            <div className="col-span-2 flex justify-between">
                              <span className="text-gray-600">Limit:</span>
                              <span className="font-medium">
                                {group.memberLimit}
                              </span>
                            </div>
                          )}
                        </div>

                        {group.memberLimit && (
                          <div className="h-2 w-full rounded-full bg-gray-200">
                            <div
                              className={`h-2 rounded-full ${group.color}`}
                              style={{
                                width: `${Math.min((groupStats.total / group.memberLimit) * 100, 100)}%`,
                              }}
                            />
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Users className="mr-2 h-4 w-4" />
                            View Members
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Add New Group Card */}
              <Card
                className="cursor-pointer border-2 border-dashed border-gray-300 bg-white/95 backdrop-blur-sm transition-colors hover:border-gray-400"
                onClick={() => setIsGroupManagementOpen(true)}
              >
                <CardContent className="flex h-full flex-col items-center justify-center p-6">
                  <UserPlus className="mb-2 h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Add New Group</span>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent
            value="settings"
            className="space-y-4"
          >
            <RSVPSettings
              settings={rsvpSettings}
              onUpdate={setRsvpSettings}
            />
          </TabsContent>

          <TabsContent
            value="analytics"
            className="space-y-4"
          >
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  RSVP Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Advanced analytics and reporting features coming soon...
                </p>
              </CardContent>
            </Card>
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
