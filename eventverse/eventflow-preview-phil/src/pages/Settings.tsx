
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "next-themes";
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  CreditCard, 
  Camera,
  Mail,
  Phone,
  MapPin,
  Building,
  Briefcase,
  Award,
  Link as LinkIcon,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  X,
  Star,
  Music,
  PartyPopper,
  Briefcase as BriefcaseIcon,
  Cake,
  Palette as PaletteIcon,
  Trophy,
  Heart,
  Sparkles,
  UserMinus,
  Building2,
  CheckCircle2,
  Users,
  Crown,
  ExternalLink,
  LogOut,
  MessageSquare,
  Hash
} from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  isPublicOrganizer: z.boolean(),
  businessName: z.string().optional(),
  businessLicense: z.string().optional(),
  insuranceInfo: z.string().optional(),
  eventTypes: z.array(z.string()).optional(),
  serviceAreas: z.array(z.string()).optional(),
  priceRangeMin: z.number().optional(),
  priceRangeMax: z.number().optional(),
  advanceBookingDays: z.number().optional(),
  depositRequired: z.boolean().optional(),
  cancellationPolicy: z.string().optional(),
});

const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  eventReminders: z.boolean(),
  rsvpUpdates: z.boolean(),
  marketingEmails: z.boolean(),
});

const Settings = () => {
  const { user, updateUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [isUploading, setIsUploading] = useState(false);
  const [newInterest, setNewInterest] = useState("");
  
  // Organization preferences
  const [primaryOrgId, setPrimaryOrgId] = useState<string | null>(
    user?.organizationMemberships?.find(org => org.role === 'owner')?.organizationId || null
  );
  const [separateOrgEvents, setSeparateOrgEvents] = useState(true);
  
  // Mock data for event interests
  const [eventInterests, setEventInterests] = useState([
    { id: "1", name: "Music Concerts", icon: "Music", color: "from-purple-500 to-pink-500" },
    { id: "2", name: "Tech Conferences", icon: "BriefcaseIcon", color: "from-blue-500 to-cyan-500" },
    { id: "3", name: "Art Exhibitions", icon: "PaletteIcon", color: "from-orange-500 to-yellow-500" },
    { id: "4", name: "Sports Events", icon: "Trophy", color: "from-green-500 to-emerald-500" },
    { id: "5", name: "Food Festivals", icon: "Cake", color: "from-red-500 to-pink-500" },
  ]);

  // Mock data for followed organizers
  const [followedOrganizers, setFollowedOrganizers] = useState([
    { 
      id: "1", 
      name: "Live Nation Events", 
      type: "Music Promoter",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=LiveNation",
      followersCount: "125K",
      upcomingEvents: 23
    },
    { 
      id: "2", 
      name: "TechCrunch", 
      type: "Conference Organizer",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=TechCrunch",
      followersCount: "89K",
      upcomingEvents: 8
    },
    { 
      id: "3", 
      name: "Art Basel", 
      type: "Art Gallery",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=ArtBasel",
      followersCount: "56K",
      upcomingEvents: 12
    },
    { 
      id: "4", 
      name: "Food & Wine Magazine", 
      type: "Culinary Events",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=FoodWine",
      followersCount: "42K",
      upcomingEvents: 15
    },
    { 
      id: "5", 
      name: "Marathon Runners Club", 
      type: "Sports Organization",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=Marathon",
      followersCount: "34K",
      upcomingEvents: 6
    },
  ]);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      location: user?.location || "",
      phone: user?.phone || "",
      company: user?.company || "",
      jobTitle: user?.jobTitle || "",
      website: user?.website || "",
      isPublicOrganizer: user?.isPublicOrganizer || false,
      businessName: user?.organizerProfile?.businessName || "",
      businessLicense: user?.organizerProfile?.businessLicense || "",
      insuranceInfo: user?.organizerProfile?.insuranceInfo || "",
      eventTypes: user?.organizerProfile?.eventTypes || [],
      serviceAreas: user?.organizerProfile?.serviceAreas || [],
      priceRangeMin: user?.organizerProfile?.priceRange?.min || 0,
      priceRangeMax: user?.organizerProfile?.priceRange?.max || 0,
      advanceBookingDays: user?.organizerProfile?.bookingPreferences?.advanceBookingDays || 30,
      depositRequired: user?.organizerProfile?.bookingPreferences?.depositRequired || false,
      cancellationPolicy: user?.organizerProfile?.bookingPreferences?.cancellationPolicy || "",
    },
  });

  const notificationForm = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: user?.notificationPreferences?.email ?? true,
      smsNotifications: user?.notificationPreferences?.sms ?? false,
      pushNotifications: user?.notificationPreferences?.push ?? true,
      eventReminders: true,
      rsvpUpdates: true,
      marketingEmails: false,
    },
  });

  const onProfileSubmit = (values: z.infer<typeof profileSchema>) => {
    const { isPublicOrganizer, businessName, businessLicense, insuranceInfo, eventTypes, serviceAreas, priceRangeMin, priceRangeMax, advanceBookingDays, depositRequired, cancellationPolicy, ...basicProfile } = values;
    
    const updatedProfile = {
      ...basicProfile,
      isPublicOrganizer,
      organizerProfile: isPublicOrganizer ? {
        businessName,
        businessLicense,
        insuranceInfo,
        eventTypes: eventTypes || [],
        serviceAreas: serviceAreas || [],
        priceRange: {
          min: priceRangeMin || 0,
          max: priceRangeMax || 0,
          currency: 'USD'
        },
        portfolioImages: user?.organizerProfile?.portfolioImages || [],
        availability: user?.organizerProfile?.availability || {
          daysAvailable: [],
          hoursOfOperation: { start: '09:00', end: '17:00' }
        },
        bookingPreferences: {
          advanceBookingDays: advanceBookingDays || 30,
          depositRequired: depositRequired || false,
          cancellationPolicy: cancellationPolicy || ""
        }
      } : undefined
    };

    updateUser(updatedProfile);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const onNotificationSubmit = (values: z.infer<typeof notificationSchema>) => {
    updateUser({
      notificationPreferences: {
        email: values.emailNotifications,
        sms: values.smsNotifications,
        push: values.pushNotifications,
      },
    });
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved.",
    });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          updateUser({ profilePhoto: e.target?.result as string });
          setIsUploading(false);
          toast({
            title: "Profile photo updated",
            description: "Your profile photo has been updated successfully.",
          });
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const exportData = () => {
    const dataToExport = {
      profile: user,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eventflow-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Data exported",
      description: "Your data has been exported successfully.",
    });
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      const colors = [
        "from-purple-500 to-pink-500",
        "from-blue-500 to-cyan-500",
        "from-orange-500 to-yellow-500",
        "from-green-500 to-emerald-500",
        "from-red-500 to-pink-500",
        "from-indigo-500 to-purple-500"
      ];
      const newId = String(eventInterests.length + 1);
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      setEventInterests([...eventInterests, { 
        id: newId, 
        name: newInterest, 
        icon: "Sparkles",
        color: randomColor 
      }]);
      setNewInterest("");
      toast({
        title: "Interest added",
        description: `${newInterest} has been added to your interests.`,
      });
    }
  };

  const removeInterest = (id: string) => {
    const interest = eventInterests.find(i => i.id === id);
    setEventInterests(eventInterests.filter(i => i.id !== id));
    toast({
      title: "Interest removed",
      description: `${interest?.name} has been removed from your interests.`,
    });
  };

  const unfollowOrganizer = (id: string) => {
    const organizer = followedOrganizers.find(o => o.id === id);
    setFollowedOrganizers(followedOrganizers.filter(o => o.id !== id));
    toast({
      title: "Unfollowed",
      description: `You've unfollowed ${organizer?.name}.`,
    });
  };

  const handleSetPrimaryOrg = (orgId: string) => {
    setPrimaryOrgId(orgId);
    toast({
      title: "Primary organization updated",
      description: "This organization will be used by default for new events.",
    });
  };

  const handleLeaveOrganization = (orgId: string, orgName: string) => {
    toast({
      title: "Left organization",
      description: `You have left ${orgName}. You can rejoin if invited again.`,
      variant: "destructive"
    });
  };

  const handleToggleEventSeparation = (enabled: boolean) => {
    setSeparateOrgEvents(enabled);
    toast({
      title: enabled ? "Event separation enabled" : "Event separation disabled",
      description: enabled 
        ? "Personal and organization events will be shown separately."
        : "All events will be shown together.",
    });
  };

  // Organization Card sub-component
  const OrganizationCard = ({ organization, isPrimary, onSetPrimary, onLeave }: {
    organization: {
      organizationId: string;
      organizationName: string;
      role: 'owner' | 'admin' | 'member' | 'viewer' | 'check_in';
      logoUrl?: string;
      verifiedBadge: boolean;
      integrationSource?: 'microsoft_teams' | 'slack' | 'manual';
      joinedDate?: Date;
    };
    isPrimary: boolean;
    onSetPrimary: () => void;
    onLeave: () => void;
  }) => {
    const getRoleBadgeColor = (role: string) => {
      switch(role) {
        case 'owner': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
        case 'admin': return 'bg-gradient-to-r from-purple-500 to-pink-500';
        case 'member': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
        case 'viewer': return 'bg-gradient-to-r from-gray-500 to-slate-500';
        case 'check_in': return 'bg-gradient-to-r from-green-500 to-emerald-500';
        default: return 'bg-gray-500';
      }
    };

    const getRoleIcon = (role: string) => {
      switch(role) {
        case 'owner': return <Crown className="w-3 h-3" />;
        case 'admin': return <Shield className="w-3 h-3" />;
        case 'member': return <Users className="w-3 h-3" />;
        case 'viewer': return <Eye className="w-3 h-3" />;
        case 'check_in': return <CheckCircle2 className="w-3 h-3" />;
        default: return null;
      }
    };

    return (
      <div className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
        isPrimary 
          ? "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300 shadow-sm" 
          : "bg-card border-border hover:border-muted-foreground/20"
      }`}>
        <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
          <AvatarImage src={organization.logoUrl} alt={organization.organizationName} />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
            {organization.organizationName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="font-semibold truncate">{organization.organizationName}</h4>
            {organization.verifiedBadge && (
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
            {isPrimary && (
              <Badge className="text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0">
                <Star className="w-3 h-3 mr-1" />
                Primary
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap mb-2">
            <Badge className={`text-xs text-white border-0 ${getRoleBadgeColor(organization.role)}`}>
              {getRoleIcon(organization.role)}
              <span className="ml-1 capitalize">{organization.role.replace('_', ' ')}</span>
            </Badge>
            
            {organization.integrationSource && (
              <Badge variant="outline" className="text-xs">
                {organization.integrationSource === 'microsoft_teams' && (
                  <>
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Microsoft Teams
                  </>
                )}
                {organization.integrationSource === 'slack' && (
                  <>
                    <Hash className="w-3 h-3 mr-1" />
                    Slack
                  </>
                )}
                {organization.integrationSource === 'manual' && 'Manual Invite'}
              </Badge>
            )}
          </div>

          {organization.joinedDate && (
            <p className="text-xs text-muted-foreground">
              Member since {new Date(organization.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {!isPrimary && organization.role !== 'owner' && (
            <Button variant="outline" size="sm" onClick={onSetPrimary}>
              Set as Primary
            </Button>
          )}
          {organization.role !== 'owner' && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-destructive hover:text-destructive hover:bg-destructive/10" 
              onClick={onLeave}
            >
              <LogOut className="w-4 h-4 mr-1" />
              Leave
            </Button>
          )}
      <Button variant="outline" size="sm" asChild>
          <Link to={`/org/${organization.organizationId}`}>
            <Building2 className="w-4 h-4 mr-1" />
            View Profile
          </Link>
        </Button>
        {organization.role === 'owner' && (
          <Button variant="ghost" size="sm" asChild>
            <a href={`/org/${organization.organizationId}/settings`}>
              <ExternalLink className="w-4 h-4 mr-1" />
              Manage
            </a>
          </Button>
        )}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            Social
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Account
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and professional details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo Section */}
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user?.profilePhoto} />
                  <AvatarFallback className="bg-purple-600 text-white text-2xl">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Label htmlFor="photo-upload">Profile Photo</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isUploading}
                      onClick={() => document.getElementById('photo-upload')?.click()}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      {isUploading ? "Uploading..." : "Change Photo"}
                    </Button>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="City, Country" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={profileForm.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input {...field} type="url" placeholder="https://..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Tell us about yourself..."
                            className="min-h-[100px]"
                          />
                        </FormControl>
                        <FormDescription>
                          {field.value?.length || 0}/500 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  {/* Event Organizer Section */}
                  <div className="space-y-6">
                    <FormField
                      control={profileForm.control}
                      name="isPublicOrganizer"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 dark:border-blue-800 p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base font-semibold flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-600" />
                              Become a Public Event Organizer
                            </FormLabel>
                            <FormDescription>
                              Enable this to showcase your event organizing services and appear in our organizer directory
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {profileForm.watch("isPublicOrganizer") && (
                      <div className="space-y-6 animate-in slide-in-from-top-2 border border-gray-200 rounded-lg p-6 bg-gray-50/50 dark:bg-gray-900/50 dark:border-gray-700">
                        <div>
                          <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            Business Information
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={profileForm.control}
                              name="businessName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Business Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Your business or organization name" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={profileForm.control}
                              name="businessLicense"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Business License (Optional)</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="License number" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={profileForm.control}
                            name="insuranceInfo"
                            render={({ field }) => (
                              <FormItem className="mt-4">
                                <FormLabel>Insurance Information (Optional)</FormLabel>
                                <FormControl>
                                  <Textarea {...field} placeholder="General liability, professional liability details" rows={2} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div>
                          <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            Service Specialization
                          </h4>
                          <div className="space-y-6">
                            <div>
                              <Label className="text-base font-medium">Event Types You Specialize In</Label>
                              <p className="text-sm text-muted-foreground mb-3">Select all event types you have experience organizing</p>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {[
                                  'Corporate Conferences', 'Luxury Weddings', 'Product Launches', 'Trade Shows', 
                                  'Gala Dinners', 'Award Ceremonies', 'Team Building', 'Fundraisers',
                                  'Board Meetings', 'Networking Events', 'Art Exhibitions', 'Fashion Shows'
                                ].map((type) => (
                                  <div key={type} className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      id={`eventType-${type}`}
                                      checked={(profileForm.watch("eventTypes") || []).includes(type)}
                                      onChange={(e) => {
                                        const currentTypes = profileForm.getValues("eventTypes") || [];
                                        const updatedTypes = e.target.checked
                                          ? [...currentTypes, type]
                                          : currentTypes.filter(t => t !== type);
                                        profileForm.setValue("eventTypes", updatedTypes);
                                      }}
                                      className="rounded border-input"
                                    />
                                    <Label htmlFor={`eventType-${type}`} className="text-sm cursor-pointer font-normal">
                                      {type}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-base font-medium">Years of Experience</Label>
                                <Select defaultValue="3-5">
                                  <SelectTrigger className="mt-2">
                                    <SelectValue placeholder="Select experience level" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="0-1">0-1 years</SelectItem>
                                    <SelectItem value="1-3">1-3 years</SelectItem>
                                    <SelectItem value="3-5">3-5 years</SelectItem>
                                    <SelectItem value="5-10">5-10 years</SelectItem>
                                    <SelectItem value="10+">10+ years</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-base font-medium">Team Size</Label>
                                <Select defaultValue="solo">
                                  <SelectTrigger className="mt-2">
                                    <SelectValue placeholder="Select team size" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="solo">Solo Organizer</SelectItem>
                                    <SelectItem value="2-5">2-5 people</SelectItem>
                                    <SelectItem value="6-15">6-15 people</SelectItem>
                                    <SelectItem value="16+">16+ people</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div>
                              <Label className="text-base font-medium">Service Areas</Label>
                              <p className="text-sm text-muted-foreground mb-2">Geographic regions where you provide services</p>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {[
                                  'San Francisco Bay Area', 'Los Angeles Area', 'San Diego County',
                                  'Orange County', 'Sacramento Region', 'Central Valley',
                                  'Monterey Peninsula', 'Wine Country', 'Available for Travel'
                                ].map((area) => (
                                  <div key={area} className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      id={`serviceArea-${area}`}
                                      checked={(profileForm.watch("serviceAreas") || []).includes(area)}
                                      onChange={(e) => {
                                        const currentAreas = profileForm.getValues("serviceAreas") || [];
                                        const updatedAreas = e.target.checked
                                          ? [...currentAreas, area]
                                          : currentAreas.filter(a => a !== area);
                                        profileForm.setValue("serviceAreas", updatedAreas);
                                      }}
                                      className="rounded border-input"
                                    />
                                    <Label htmlFor={`serviceArea-${area}`} className="text-sm cursor-pointer font-normal">
                                      {area}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <Label className="text-base font-medium">Pricing Structure</Label>
                              <p className="text-sm text-muted-foreground mb-3">Your typical event pricing range (USD)</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={profileForm.control}
                                  name="priceRangeMin"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Starting Price ($)</FormLabel>
                                      <FormControl>
                                        <Input {...field} type="number" placeholder="2,500" onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                                      </FormControl>
                                      <FormDescription>Minimum project cost</FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={profileForm.control}
                                  name="priceRangeMax"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Premium Price ($)</FormLabel>
                                      <FormControl>
                                        <Input {...field} type="number" placeholder="25,000" onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                                      </FormControl>
                                      <FormDescription>High-end project range</FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            Business Operations
                          </h4>
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={profileForm.control}
                                name="advanceBookingDays"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Advance Booking Required</FormLabel>
                                    <Select defaultValue="30" onValueChange={(value) => field.onChange(parseInt(value))}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select timeframe" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="7">1 week</SelectItem>
                                        <SelectItem value="14">2 weeks</SelectItem>
                                        <SelectItem value="30">1 month</SelectItem>
                                        <SelectItem value="60">2 months</SelectItem>
                                        <SelectItem value="90">3 months</SelectItem>
                                        <SelectItem value="180">6 months</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div>
                                <Label>Average Response Time</Label>
                                <Select defaultValue="4">
                                  <SelectTrigger className="mt-2">
                                    <SelectValue placeholder="Response time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">Within 1 hour</SelectItem>
                                    <SelectItem value="4">Within 4 hours</SelectItem>
                                    <SelectItem value="24">Within 24 hours</SelectItem>
                                    <SelectItem value="48">Within 48 hours</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label>Events Per Month Capacity</Label>
                                <Select defaultValue="3-5">
                                  <SelectTrigger className="mt-2">
                                    <SelectValue placeholder="Monthly capacity" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1-2">1-2 events</SelectItem>
                                    <SelectItem value="3-5">3-5 events</SelectItem>
                                    <SelectItem value="6-10">6-10 events</SelectItem>
                                    <SelectItem value="10+">10+ events</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Payment Terms</Label>
                                <Select defaultValue="50-upfront">
                                  <SelectTrigger className="mt-2">
                                    <SelectValue placeholder="Payment structure" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="full-upfront">100% upfront</SelectItem>
                                    <SelectItem value="50-upfront">50% upfront, 50% on completion</SelectItem>
                                    <SelectItem value="33-33-33">33% upfront, 33% midway, 33% completion</SelectItem>
                                    <SelectItem value="net-30">Net 30 terms</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <FormField
                                control={profileForm.control}
                                name="depositRequired"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4">
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-base">Deposit Required</FormLabel>
                                      <FormDescription>
                                        Require a security deposit for event bookings
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={profileForm.control}
                              name="cancellationPolicy"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Cancellation & Refund Policy</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      {...field} 
                                      placeholder="e.g., Full refund if cancelled 60+ days in advance, 50% refund for 30-59 days, 25% refund for 14-29 days, no refund within 14 days of event date."
                                      rows={4} 
                                      className="min-h-[100px]"
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Clear policy helps build trust with potential clients
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600">
                    Save Changes
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          {/* Event Type Interests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                Event Type Interests
              </CardTitle>
              <CardDescription>
                Select your favorite event types to get personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                {eventInterests.map((interest) => {
                  const IconComponent = interest.icon === "Music" ? Music : 
                                       interest.icon === "BriefcaseIcon" ? BriefcaseIcon :
                                       interest.icon === "PaletteIcon" ? PaletteIcon :
                                       interest.icon === "Trophy" ? Trophy :
                                       interest.icon === "Cake" ? Cake :
                                       Sparkles;
                  
                  return (
                    <Badge 
                      key={interest.id}
                      className={`bg-gradient-to-r ${interest.color} text-white border-0 px-4 py-2 text-sm flex items-center gap-2 hover:opacity-90 transition-opacity`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {interest.name}
                      <button
                        onClick={() => removeInterest(interest.id)}
                        className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
              
              <div className="flex gap-2 pt-4">
                <Input
                  placeholder="Add new interest (e.g., Comedy Shows, Workshops)"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                  className="flex-1"
                />
                <Button 
                  onClick={addInterest}
                  className="bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Interest
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Followed Organizers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Followed Event Organizers
              </CardTitle>
              <CardDescription>
                Stay updated with events from your favorite organizers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {followedOrganizers.map((organizer) => (
                  <div
                    key={organizer.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={organizer.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                          {organizer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-foreground">{organizer.name}</h4>
                        <p className="text-sm text-muted-foreground">{organizer.type}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {organizer.followersCount} followers
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {organizer.upcomingEvents} upcoming events
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => unfollowOrganizer(organizer.id)}
                      className="hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <UserMinus className="w-4 h-4 mr-2" />
                      Unfollow
                    </Button>
                  </div>
                ))}
                
                {followedOrganizers.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>You're not following any organizers yet.</p>
                    <p className="text-sm mt-2">Browse events to discover organizers to follow!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Social Media Integrations */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media Integrations</CardTitle>
              <CardDescription>
                Connect your social accounts to enable marketing campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => {
                const dialog = document.querySelector('[role="dialog"]');
                if (!dialog) {
                  // Trigger social integration dialog
                  window.dispatchEvent(new CustomEvent('open-social-integration'));
                }
              }}>
                Manage Social Accounts
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Connected accounts: LinkedIn, Instagram, Facebook, TikTok
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified about events and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={notificationForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Email Notifications</FormLabel>
                            <FormDescription>
                              Receive notifications via email
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="smsNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">SMS Notifications</FormLabel>
                            <FormDescription>
                              Receive important updates via text message
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="pushNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Push Notifications</FormLabel>
                            <FormDescription>
                              Receive push notifications in your browser
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="eventReminders"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Event Reminders</FormLabel>
                            <FormDescription>
                              Get reminded about upcoming events
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="rsvpUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">RSVP Updates</FormLabel>
                            <FormDescription>
                              Get notified when guests RSVP to your events
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="marketingEmails"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Marketing Emails</FormLabel>
                            <FormDescription>
                              Receive updates about new features and tips
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600">
                    Save Preferences
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your privacy and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Profile Visibility</Label>
                    <p className="text-sm text-muted-foreground">
                      Make your profile visible to other event organizers
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Show in Search Results</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow your events to appear in public search results
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Contact Information</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow guests to see your contact information
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Analytics Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve EventFlow by sharing anonymous usage data
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Management</h3>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={exportData}>
                    <Download className="w-4 h-4 mr-2" />
                    Export My Data
                  </Button>
                  <Button variant="destructive" className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how EventFlow looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base">Theme</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Choose your preferred color scheme
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      onClick={() => setTheme("light")}
                      className="justify-start"
                    >
                      <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-300 mr-2" />
                      Light
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      onClick={() => setTheme("dark")}
                      className="justify-start"
                    >
                      <div className="w-4 h-4 rounded-full bg-gray-900 mr-2" />
                      Dark
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      onClick={() => setTheme("system")}
                      className="justify-start"
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-white to-gray-900 mr-2" />
                      System
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-base">Language</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Choose your preferred language
                  </p>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <Label className="text-base">Timezone</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Select your timezone for accurate event scheduling
                  </p>
                  <Select defaultValue={user?.timezone || "America/Los_Angeles"}>
                    <SelectTrigger className="w-[300px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>
                Manage your EventFlow subscription and billing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Current Plan</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={user?.plan === 'premium' ? 'default' : 'secondary'}>
                      {user?.plan?.toUpperCase() || 'FREE'}
                    </Badge>
                    {user?.plan === 'premium' && (
                      <span className="text-sm text-green-600">$5.99/month</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Events Created</p>
                  <p className="font-medium">{user?.eventsCreated || 0} / {user?.plan === 'premium' ? '∞' : '3'}</p>
                </div>
              </div>

              {user?.plan !== 'premium' && (
                <div className="space-y-4">
                  <h3 className="font-medium">Upgrade to Premium</h3>
                  <div className="grid gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-purple-600">Premium Features</h4>
                      <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                        <li>• Unlimited events</li>
                        <li>• Advanced seating arrangements</li>
                        <li>• Digital check-in system</li>
                        <li>• Budget tracking & vendor management</li>
                        <li>• Media albums with QR sharing</li>
                        <li>• Priority support</li>
                      </ul>
                      <Button className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600">
                        Upgrade to Premium - $5.99/month
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Usage Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{user?.totalEventsHosted || 0}</p>
                    <p className="text-sm text-muted-foreground">Events Hosted</p>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{user?.totalAttendeesHosted || 0}</p>
                    <p className="text-sm text-muted-foreground">Total Attendees</p>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{user?.averageRating || 0}</p>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">{user?.responseRate || 0}%</p>
                    <p className="text-sm text-muted-foreground">Response Rate</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
              <CardDescription>
                Manage your account security and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Password</h3>
                    <p className="text-sm text-muted-foreground">
                      Last changed 30 days ago
                    </p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline">Setup 2FA</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Login Sessions</h3>
                    <p className="text-sm text-muted-foreground">
                      View and manage your active sessions
                    </p>
                  </div>
                  <Button variant="outline">Manage Sessions</Button>
                </div>
              </div>

              <Separator />

              {/* Organization Affiliations Section */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Organization Affiliations
                  </CardTitle>
                  <CardDescription>
                    Manage your organization memberships and event creation preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Event Separation Toggle */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="space-y-1">
                      <h4 className="font-medium">Separate Organization Events</h4>
                      <p className="text-sm text-muted-foreground">
                        Keep personal and organization events in separate views
                      </p>
                    </div>
                    <Switch
                      checked={separateOrgEvents}
                      onCheckedChange={handleToggleEventSeparation}
                    />
                  </div>

                  {/* Organization List */}
                  {user?.organizationMemberships && user.organizationMemberships.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Your Organizations</h4>
                        <Badge variant="outline" className="text-xs">
                          {user.organizationMemberships.length} {user.organizationMemberships.length === 1 ? 'organization' : 'organizations'}
                        </Badge>
                      </div>
                      
                      {user.organizationMemberships.map((org) => (
                        <OrganizationCard
                          key={org.organizationId}
                          organization={org}
                          isPrimary={primaryOrgId === org.organizationId}
                          onSetPrimary={() => handleSetPrimaryOrg(org.organizationId)}
                          onLeave={() => handleLeaveOrganization(org.organizationId, org.organizationName)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed rounded-lg">
                      <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                      <h4 className="font-medium mb-1">No Organization Affiliations</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        You're not currently affiliated with any organizations
                      </p>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Join an Organization
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium text-red-600">Danger Zone</h3>
                <div className="border border-red-200 rounded-lg p-4 space-y-4">
                  <div>
                    <h4 className="font-medium">Deactivate Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Temporarily disable your account. You can reactivate it anytime.
                    </p>
                    <Button variant="outline" className="mt-2 text-red-600 border-red-200">
                      Deactivate Account
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium text-red-600">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <Button variant="destructive" className="mt-2">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
