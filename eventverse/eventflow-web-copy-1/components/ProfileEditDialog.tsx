"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  Briefcase,
  Camera,
  Facebook,
  Globe,
  Instagram,
  Link,
  Linkedin,
  Plus,
  Twitter,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ProfileTypeSwitcher from "./ProfileTypeSwitcher";
import SocialIntegrationDialog from "./SocialIntegrationDialog";

interface ProfileEditDialogProps {
  open: boolean;
  onClose: () => void;
}

const ProfileEditDialog = ({ open, onClose }: ProfileEditDialogProps) => {
  const { user, updateUser } = useAuth();
  const [showSocialDialog, setShowSocialDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    location: user?.location || "",
    bio: user?.bio || "",
    phone: user?.phone || "",
    profilePhoto: user?.profilePhoto || "",
    coverPhoto: user?.coverPhoto || "",
    company: user?.company || "",
    jobTitle: user?.jobTitle || "",
    industry: user?.industry || "",
    yearsHosting: user?.yearsHosting || 0,
    website: user?.website || "",
    timezone: user?.timezone || "UTC",
    language: user?.language || "en",
    specializations: user?.specializations || [],
    certifications: user?.certifications || [],
    socialLinks: user?.socialLinks || {},
    notificationPreferences: user?.notificationPreferences || {
      email: true,
      sms: false,
      push: true,
    },
    isPublicOrganizer: user?.isPublicOrganizer || false,
    organizerProfile: user?.organizerProfile || {
      businessName: "",
      businessLicense: "",
      insuranceInfo: "",
      eventTypes: [],
      serviceAreas: [],
      priceRange: { min: 0, max: 0, currency: "USD" },
      portfolioImages: [],
      availability: {
        daysAvailable: [],
        hoursOfOperation: { start: "09:00", end: "17:00" },
      },
      bookingPreferences: {
        advanceBookingDays: 30,
        depositRequired: false,
        cancellationPolicy: "",
      },
    },
  });

  const [newSpecialization, setNewSpecialization] = useState("");
  const [newCertification, setNewCertification] = useState("");

  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Entertainment",
    "Hospitality",
    "Non-profit",
    "Government",
    "Retail",
    "Manufacturing",
    "Other",
  ];

  const timezones = [
    "UTC",
    "EST",
    "CST",
    "MST",
    "PST",
    "GMT",
    "CET",
    "JST",
    "AEST",
    "IST",
  ];

  const eventTypes = [
    "Corporate Events",
    "Weddings",
    "Conferences",
    "Trade Shows",
    "Social Events",
    "Fundraisers",
    "Product Launches",
    "Team Building",
    "Workshops",
    "Festivals",
  ];

  const handleSave = () => {
    updateUser(formData);
    onClose();
  };

  const handlePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "cover",
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === "profile") {
          setFormData({
            ...formData,
            profilePhoto: e.target?.result as string,
          });
        } else {
          setFormData({ ...formData, coverPhoto: e.target?.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addSpecialization = () => {
    if (
      newSpecialization.trim() &&
      !formData.specializations.includes(newSpecialization.trim())
    ) {
      setFormData({
        ...formData,
        specializations: [
          ...formData.specializations,
          newSpecialization.trim(),
        ],
      });
      setNewSpecialization("");
    }
  };

  const removeSpecialization = (specialization: string) => {
    setFormData({
      ...formData,
      specializations: formData.specializations.filter(
        (s) => s !== specialization,
      ),
    });
  };

  const addCertification = () => {
    if (
      newCertification.trim() &&
      !formData.certifications.includes(newCertification.trim())
    ) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, newCertification.trim()],
      });
      setNewCertification("");
    }
  };

  const removeCertification = (certification: string) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter(
        (c) => c !== certification,
      ),
    });
  };

  const profileCompleteness = user?.profileCompleteness || 0;

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Edit Profile
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Profile Completeness:
              </span>
              <Progress
                value={profileCompleteness}
                className="w-20"
              />
              <span className="text-sm font-medium">
                {profileCompleteness}%
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="profile-type"
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="profile-type">Profile Type</TabsTrigger>
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="specializations">Expertise</TabsTrigger>
            <TabsTrigger value="organizer">Event Organizer</TabsTrigger>
            <TabsTrigger value="social">Social & Contact</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent
            value="profile-type"
            className="mt-6 space-y-6"
          >
            <div className="space-y-6">
              <ProfileTypeSwitcher />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-lg border bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold">Personal Profile</h4>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Share your personal interests, hobbies, and social
                    connections. Perfect for casual events and building personal
                    relationships.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• Personal interests and hobbies</li>
                    <li>• Social media profiles</li>
                    <li>• Casual bio and photos</li>
                    <li>• Personal event history</li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-gradient-to-br from-purple-50 to-pink-50 p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold">Professional Profile</h4>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Showcase your business credentials, expertise, and
                    professional achievements. Ideal for corporate events and
                    client relationships.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• Business credentials and certifications</li>
                    <li>• Professional experience</li>
                    <li>• LinkedIn integration</li>
                    <li>• Corporate event portfolio</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-violet-200 bg-gradient-to-r from-violet-50 to-purple-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Link className="h-5 w-5 text-violet-600" />
                  <h4 className="font-semibold">Social Media Integration</h4>
                </div>
                <p className="text-muted-foreground mb-3 text-sm">
                  Connect your LinkedIn and Instagram profiles to automatically
                  import professional information and showcase your visual
                  portfolio.
                </p>
                <Button
                  onClick={() => setShowSocialDialog(true)}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:opacity-90"
                >
                  <Link className="mr-2 h-4 w-4" />
                  Manage Social Integrations
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="basic"
            className="mt-6 space-y-6"
          >
            {/* Cover Photo */}
            <div>
              <Label>Cover Photo</Label>
              <div className="relative h-32 overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                {formData.coverPhoto && (
                  <>
                    {/* <img
                      src={formData.coverPhoto}
                      alt="Cover"
                      className="h-full w-full object-cover"
                    /> */}

                    <Image
                      src={formData.coverPhoto}
                      alt="Cover"
                      className="h-full w-full object-cover"
                    />
                  </>
                )}
                <label className="absolute top-2 right-2 cursor-pointer rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, "cover")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={formData.profilePhoto}
                    alt={formData.name}
                  />
                  <AvatarFallback className="text-lg">
                    {formData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <label className="absolute right-0 bottom-0 cursor-pointer rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, "profile")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Basic Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell others about yourself and your event hosting experience..."
                rows={4}
              />
            </div>
          </TabsContent>

          <TabsContent
            value="professional"
            className="mt-6 space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="Your company or organization"
                />
              </div>

              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                  placeholder="Event Manager, CEO, etc."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) =>
                    setFormData({ ...formData, industry: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem
                        key={industry}
                        value={industry}
                      >
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="yearsHosting">Years Hosting Events</Label>
                <Input
                  id="yearsHosting"
                  type="number"
                  value={formData.yearsHosting}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      yearsHosting: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="specializations"
            className="mt-6 space-y-6"
          >
            <div>
              <Label>Event Specializations</Label>
              <div className="mb-3 flex gap-2">
                <Input
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  placeholder="Add a specialization"
                  onKeyPress={(e) => e.key === "Enter" && addSpecialization()}
                />
                <Button
                  onClick={addSpecialization}
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.specializations.map((spec, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {spec}
                    <button
                      onClick={() => removeSpecialization(spec)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Certifications & Credentials</Label>
              <div className="mb-3 flex gap-2">
                <Input
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  placeholder="Add a certification"
                  onKeyPress={(e) => e.key === "Enter" && addCertification()}
                />
                <Button
                  onClick={addCertification}
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.certifications.map((cert, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    {cert}
                    <button
                      onClick={() => removeCertification(cert)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="organizer"
            className="mt-6 space-y-6"
          >
            <div className="space-y-6">
              {/* Public Organizer Toggle */}
              <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:border-blue-800 dark:from-blue-900/20 dark:to-purple-900/20">
                <div>
                  <h3 className="text-foreground font-semibold">
                    Become a Public Event Organizer
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Enable this to showcase your event organizing services and
                    appear in our organizer directory
                  </p>
                </div>
                <Switch
                  checked={formData.isPublicOrganizer}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isPublicOrganizer: checked })
                  }
                />
              </div>

              {formData.isPublicOrganizer && (
                <div className="animate-in slide-in-from-top-2 space-y-6">
                  {/* Business Information */}
                  <div className="space-y-4">
                    <h4 className="text-foreground font-medium">
                      Business Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          value={formData.organizerProfile.businessName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              organizerProfile: {
                                ...formData.organizerProfile,
                                businessName: e.target.value,
                              },
                            })
                          }
                          placeholder="Your business or organization name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="businessLicense">
                          Business License (Optional)
                        </Label>
                        <Input
                          id="businessLicense"
                          value={formData.organizerProfile.businessLicense}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              organizerProfile: {
                                ...formData.organizerProfile,
                                businessLicense: e.target.value,
                              },
                            })
                          }
                          placeholder="License number"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="insuranceInfo">
                        Insurance Information (Optional)
                      </Label>
                      <Textarea
                        id="insuranceInfo"
                        value={formData.organizerProfile.insuranceInfo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            organizerProfile: {
                              ...formData.organizerProfile,
                              insuranceInfo: e.target.value,
                            },
                          })
                        }
                        placeholder="General liability, professional liability details"
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* Event Types */}
                  <div>
                    <Label>Event Types You Specialize In</Label>
                    <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-3">
                      {eventTypes.map((type) => (
                        <div
                          key={type}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={`eventType-${type}`}
                            checked={formData.organizerProfile.eventTypes.includes(
                              type,
                            )}
                            onChange={(e) => {
                              const updatedTypes = e.target.checked
                                ? [
                                    ...formData.organizerProfile.eventTypes,
                                    type,
                                  ]
                                : formData.organizerProfile.eventTypes.filter(
                                    (t) => t !== type,
                                  );
                              setFormData({
                                ...formData,
                                organizerProfile: {
                                  ...formData.organizerProfile,
                                  eventTypes: updatedTypes,
                                },
                              });
                            }}
                            className="rounded"
                          />
                          <Label
                            htmlFor={`eventType-${type}`}
                            className="cursor-pointer text-sm"
                          >
                            {type}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Service Areas */}
                  <div>
                    <Label htmlFor="serviceAreas">Service Areas</Label>
                    <p className="text-muted-foreground mb-2 text-sm">
                      Add the locations where you provide event organizing
                      services
                    </p>
                    <div className="space-y-2">
                      {formData.organizerProfile.serviceAreas.map(
                        (area, index) => (
                          <div
                            key={index}
                            className="flex gap-2"
                          >
                            <Input
                              value={area}
                              onChange={(e) => {
                                const newAreas = [
                                  ...formData.organizerProfile.serviceAreas,
                                ];
                                newAreas[index] = e.target.value;
                                setFormData({
                                  ...formData,
                                  organizerProfile: {
                                    ...formData.organizerProfile,
                                    serviceAreas: newAreas,
                                  },
                                });
                              }}
                              placeholder="e.g., San Francisco Bay Area"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newAreas =
                                  formData.organizerProfile.serviceAreas.filter(
                                    (_, i) => i !== index,
                                  );
                                setFormData({
                                  ...formData,
                                  organizerProfile: {
                                    ...formData.organizerProfile,
                                    serviceAreas: newAreas,
                                  },
                                });
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ),
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            organizerProfile: {
                              ...formData.organizerProfile,
                              serviceAreas: [
                                ...formData.organizerProfile.serviceAreas,
                                "",
                              ],
                            },
                          });
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Service Area
                      </Button>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <Label>Price Range (Optional)</Label>
                    <div className="mt-2 grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="minPrice">Minimum ($)</Label>
                        <Input
                          id="minPrice"
                          type="number"
                          value={
                            formData.organizerProfile.priceRange?.min || ""
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              organizerProfile: {
                                ...formData.organizerProfile,
                                priceRange: {
                                  ...formData.organizerProfile.priceRange,
                                  min: parseInt(e.target.value) || 0,
                                },
                              },
                            })
                          }
                          placeholder="5000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="maxPrice">Maximum ($)</Label>
                        <Input
                          id="maxPrice"
                          type="number"
                          value={
                            formData.organizerProfile.priceRange?.max || ""
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              organizerProfile: {
                                ...formData.organizerProfile,
                                priceRange: {
                                  ...formData.organizerProfile.priceRange,
                                  max: parseInt(e.target.value) || 0,
                                },
                              },
                            })
                          }
                          placeholder="50000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="currency">Currency</Label>
                        <Select
                          value={
                            formData.organizerProfile.priceRange?.currency ||
                            "USD"
                          }
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              organizerProfile: {
                                ...formData.organizerProfile,
                                priceRange: {
                                  ...formData.organizerProfile.priceRange,
                                  currency: value,
                                },
                              },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Booking Preferences */}
                  <div className="space-y-4">
                    <h4 className="text-foreground font-medium">
                      Booking Preferences
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="advanceBooking">
                          Advance Booking Required (Days)
                        </Label>
                        <Input
                          id="advanceBooking"
                          type="number"
                          value={
                            formData.organizerProfile.bookingPreferences
                              ?.advanceBookingDays || ""
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              organizerProfile: {
                                ...formData.organizerProfile,
                                bookingPreferences: {
                                  ...formData.organizerProfile
                                    .bookingPreferences,
                                  advanceBookingDays:
                                    parseInt(e.target.value) || 30,
                                },
                              },
                            })
                          }
                          placeholder="30"
                        />
                      </div>
                      <div className="mt-6 flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="depositRequired"
                          checked={
                            formData.organizerProfile.bookingPreferences
                              ?.depositRequired || false
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              organizerProfile: {
                                ...formData.organizerProfile,
                                bookingPreferences: {
                                  ...formData.organizerProfile
                                    .bookingPreferences,
                                  depositRequired: e.target.checked,
                                },
                              },
                            })
                          }
                          className="rounded"
                        />
                        <Label
                          htmlFor="depositRequired"
                          className="cursor-pointer"
                        >
                          Deposit Required
                        </Label>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cancellationPolicy">
                        Cancellation Policy
                      </Label>
                      <Textarea
                        id="cancellationPolicy"
                        value={
                          formData.organizerProfile.bookingPreferences
                            ?.cancellationPolicy || ""
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            organizerProfile: {
                              ...formData.organizerProfile,
                              bookingPreferences: {
                                ...formData.organizerProfile.bookingPreferences,
                                cancellationPolicy: e.target.value,
                              },
                            },
                          })
                        }
                        placeholder="Describe your cancellation and refund policy"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent
            value="social"
            className="mt-6 space-y-6"
          >
            <Button
              onClick={() => setShowSocialDialog(true)}
              className="mb-6 w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:opacity-90"
            >
              <Link className="mr-2 h-4 w-4" />
              Manage Social Integrations
            </Button>

            <div>
              <Label htmlFor="website">Website</Label>
              <div className="relative">
                <Globe className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  placeholder="https://yourwebsite.com"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Social Media Links</Label>

              <div className="relative">
                <Linkedin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-blue-600" />
                <Input
                  value={formData.socialLinks.linkedin || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: {
                        ...formData.socialLinks,
                        linkedin: e.target.value,
                      },
                    })
                  }
                  placeholder="LinkedIn Profile URL"
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <Twitter className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-blue-400" />
                <Input
                  value={formData.socialLinks.twitter || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: {
                        ...formData.socialLinks,
                        twitter: e.target.value,
                      },
                    })
                  }
                  placeholder="Twitter Profile URL"
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <Instagram className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-pink-500" />
                <Input
                  value={formData.socialLinks.instagram || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: {
                        ...formData.socialLinks,
                        instagram: e.target.value,
                      },
                    })
                  }
                  placeholder="Instagram Profile URL"
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <Facebook className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-blue-700" />
                <Input
                  value={formData.socialLinks.facebook || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialLinks: {
                        ...formData.socialLinks,
                        facebook: e.target.value,
                      },
                    })
                  }
                  placeholder="Facebook Profile URL"
                  className="pl-10"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="preferences"
            className="mt-6 space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={formData.timezone}
                  onValueChange={(value) =>
                    setFormData({ ...formData, timezone: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem
                        key={tz}
                        value={tz}
                      >
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language">Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) =>
                    setFormData({ ...formData, language: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Notification Preferences</Label>

              <div className="flex items-center justify-between">
                <span className="text-sm">Email Notifications</span>
                <Switch
                  checked={formData.notificationPreferences.email}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      notificationPreferences: {
                        ...formData.notificationPreferences,
                        email: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">SMS Notifications</span>
                <Switch
                  checked={formData.notificationPreferences.sms}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      notificationPreferences: {
                        ...formData.notificationPreferences,
                        sms: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Push Notifications</span>
                <Switch
                  checked={formData.notificationPreferences.push}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      notificationPreferences: {
                        ...formData.notificationPreferences,
                        push: checked,
                      },
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-3 border-t pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1"
          >
            Save Changes
          </Button>
        </div>

        <SocialIntegrationDialog
          open={showSocialDialog}
          onClose={() => setShowSocialDialog(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;
