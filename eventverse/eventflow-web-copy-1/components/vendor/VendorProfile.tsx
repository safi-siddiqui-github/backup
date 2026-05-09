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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Building2,
  Globe,
  Layout,
  Mail,
  MapPin,
  Phone,
  Plus,
  Save,
  Star,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ActiveProjectsDashboard from "./ActiveProjectsDashboard";
import EnhancedVenueManagement from "./EnhancedVenueManagement";
import ServiceDeliveryManager from "./ServiceDeliveryManager";

interface VendorUser {
  id: string;
  businessName: string;
  email: string;
  category: string;
  status: "active" | "pending" | "suspended";
  profileComplete: boolean;
}

interface VendorProfileProps {
  vendor: VendorUser;
  onUpdate: (vendor: VendorUser) => void;
}

const VendorProfile = ({ vendor, onUpdate }: VendorProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showVenueManagement, setShowVenueManagement] = useState(
    vendor.category === "Venue" && !vendor.profileComplete,
  );
  const [profileData, setProfileData] = useState({
    businessName: vendor.businessName,
    category: vendor.category,
    description: "Premium catering services for weddings and special events",
    phone: "+1-555-0123",
    email: vendor.email,
    website: "www.example.com",
    address: "123 Business St, City, ST 12345",
    serviceArea: "50 miles",
    yearEstablished: "2015",
    teamSize: "10-20",
    priceRange: "$50-100 per person",
    services: [
      "Full Service Catering",
      "Wedding Cakes",
      "Bar Service",
      "Setup & Cleanup",
    ],
    specialties: ["Italian Cuisine", "Vegan Options", "Gluten-Free"],
    portfolio: [
      { id: 1, name: "Elegant Wedding Setup", url: "/placeholder.svg" },
      { id: 2, name: "Corporate Event", url: "/placeholder.svg" },
      { id: 3, name: "Birthday Celebration", url: "/placeholder.svg" },
    ],
  });
  const [newService, setNewService] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("");
  const { toast } = useToast();

  // Show venue management if explicitly requested
  if (showVenueManagement) {
    return (
      <EnhancedVenueManagement
        vendor={vendor}
        onBack={() => setShowVenueManagement(false)}
      />
    );
  }

  const categories = [
    "Venue",
    "Catering",
    "Entertainment",
    "Photography",
    "Videography",
    "Florist",
    "Decoration",
    "Transportation",
    "Audio/Visual",
    "Security",
    "Cleaning",
    "Rental",
    "Wedding Planning",
    "Beauty Services",
    "Other",
  ];

  const handleSave = () => {
    const updatedVendor = {
      ...vendor,
      businessName: profileData.businessName,
      category: profileData.category,
      profileComplete: true,
    };

    onUpdate(updatedVendor);
    localStorage.setItem("vendor_user", JSON.stringify(updatedVendor));
    setIsEditing(false);

    toast({
      title: "Profile updated",
      description: "Your business profile has been successfully updated.",
    });
  };

  const addService = () => {
    if (
      newService.trim() &&
      !profileData.services.includes(newService.trim())
    ) {
      setProfileData((prev) => ({
        ...prev,
        services: [...prev.services, newService.trim()],
      }));
      setNewService("");
    }
  };

  const removeService = (service: string) => {
    setProfileData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service),
    }));
  };

  const addSpecialty = () => {
    if (
      newSpecialty.trim() &&
      !profileData.specialties.includes(newSpecialty.trim())
    ) {
      setProfileData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()],
      }));
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (specialty: string) => {
    setProfileData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((s) => s !== specialty),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-2xl font-bold text-white">
                {profileData.businessName.charAt(0)}
              </div>
              <div>
                <CardTitle className="text-2xl">
                  {profileData.businessName}
                </CardTitle>
                <CardDescription className="mt-1 flex items-center gap-2">
                  <Badge>{profileData.category}</Badge>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    4.8 (23 reviews)
                  </span>
                </CardDescription>
              </div>
            </div>
            <Button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="flex items-center gap-2"
            >
              {isEditing ? (
                <Save className="h-4 w-4" />
              ) : (
                <Building2 className="h-4 w-4" />
              )}
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Venue Setup CTA for new venue vendors */}
      {vendor.category === "Venue" && !vendor.profileComplete && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Building2 className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Set Up Your Venue Layouts
                  </h3>
                  <p className="text-muted-foreground">
                    Design your venue floor plans with our advanced drawing
                    tools to showcase your space to potential clients.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowVenueManagement(true)}
                className="shrink-0"
              >
                <Layout className="mr-2 h-4 w-4" />
                Design Venues
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs
        defaultValue="basic"
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          {vendor.category === "Venue" && (
            <TabsTrigger value="venues">Venue Management</TabsTrigger>
          )}
          <TabsTrigger value="delivery">Service Delivery</TabsTrigger>
          <TabsTrigger value="projects">Active Projects</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* Keep existing TabsContent for basic, services, delivery, portfolio, and reviews */}
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Basic details about your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={profileData.businessName}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        businessName: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={profileData.category}
                    onValueChange={(value) =>
                      setProfileData((prev) => ({ ...prev, category: value }))
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  value={profileData.description}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Describe your business and what makes you unique..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                      id="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          website: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="serviceArea">Service Area</Label>
                  <Input
                    id="serviceArea"
                    value={profileData.serviceArea}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        serviceArea: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    placeholder="e.g., 50 miles from city center"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Business Address</Label>
                <div className="relative">
                  <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="yearEstablished">Year Established</Label>
                  <Input
                    id="yearEstablished"
                    value={profileData.yearEstablished}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        yearEstablished: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input
                    id="teamSize"
                    value={profileData.teamSize}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        teamSize: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="priceRange">Price Range</Label>
                  <Input
                    id="priceRange"
                    value={profileData.priceRange}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        priceRange: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    placeholder="e.g., $50-100 per person"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {vendor.category === "Venue" && (
          <TabsContent value="venues">
            <EnhancedVenueManagement
              vendor={vendor}
              onBack={() => {}}
            />
          </TabsContent>
        )}

        <TabsContent value="services">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
                <CardDescription>
                  List the services your business provides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        placeholder="Add a service"
                        onKeyPress={(e) => e.key === "Enter" && addService()}
                      />
                      <Button
                        onClick={addService}
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {profileData.services.map((service, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {service}
                        {isEditing && (
                          <button
                            onClick={() => removeService(service)}
                            className="ml-1 hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specialties</CardTitle>
                <CardDescription>
                  What makes your business unique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        value={newSpecialty}
                        onChange={(e) => setNewSpecialty(e.target.value)}
                        placeholder="Add a specialty"
                        onKeyPress={(e) => e.key === "Enter" && addSpecialty()}
                      />
                      <Button
                        onClick={addSpecialty}
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {profileData.specialties.map((specialty, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        {specialty}
                        {isEditing && (
                          <button
                            onClick={() => removeSpecialty(specialty)}
                            className="ml-1 hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="delivery">
          <ServiceDeliveryManager vendor={vendor} />
        </TabsContent>

        <TabsContent value="projects">
          <ActiveProjectsDashboard vendor={vendor} />
        </TabsContent>

        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
              <CardDescription>
                Showcase your best work to attract clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {profileData.portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="group relative"
                  >
                    {/* <img
                      src={item.url}
                      alt={item.name}
                      className="h-48 w-full rounded-lg object-cover"
                    /> */}

                    <Image
                      src={item.url}
                      alt={item.name}
                      className="h-48 w-full rounded-lg object-cover"
                    />

                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="text-sm font-medium text-white">
                        {item.name}
                      </p>
                    </div>
                  </div>
                ))}

                {isEditing && (
                  <div className="flex h-48 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-blue-500">
                    <div className="text-center">
                      <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                      <p className="text-sm text-gray-500">Upload Image</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
              <CardDescription>
                See what your clients are saying
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <div
                    key={review}
                    className="rounded-lg border p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                          J
                        </div>
                        <span className="font-medium">John Smith</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      &quot;Absolutely amazing service! The catering was perfect
                      for our wedding. Professional, delicious food, and great
                      presentation. Highly recommended!&quot;
                    </p>
                    <p className="mt-2 text-xs text-gray-400">2 weeks ago</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorProfile;
