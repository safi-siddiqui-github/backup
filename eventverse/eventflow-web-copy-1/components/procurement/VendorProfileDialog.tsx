"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Award,
  Building,
  FileText,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Star,
  Video,
} from "lucide-react";
import { useState } from "react";
import type { Proposal } from "./types";

interface VendorProfile {
  id: string;
  name: string;
  businessType: string;
  description: string;
  location: string;
  rating: number;
  totalReviews: number;
  yearsInBusiness: number;
  projectsCompleted: number;
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
  services: string[];
  certifications: string[];
  portfolio: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    budget: number;
    completedDate: string;
  }[];
  reviews: {
    id: string;
    clientName: string;
    rating: number;
    comment: string;
    date: string;
    projectType: string;
  }[];
  performance: {
    onTimeDelivery: number;
    budgetAdherence: number;
    qualityScore: number;
    responseTime: string;
  };
}

interface VendorProfileDialogProps {
  proposal: Proposal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContactVendor: (proposal: Proposal) => void;
  onViewProposalDetails: (proposal: Proposal) => void;
}

const VendorProfileDialog = ({
  proposal,
  open,
  onOpenChange,
  onContactVendor,
  onViewProposalDetails,
}: VendorProfileDialogProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  if (!proposal) return null;

  // Mock vendor profile data - in real app this would come from API
  const vendorProfile: VendorProfile = {
    id: proposal.vendorId,
    name: proposal.vendorName,
    businessType: "Full-Service Event Planning",
    description:
      "We specialize in creating memorable corporate events, weddings, and social gatherings with attention to detail and exceptional service.",
    location: "New York, NY",
    rating: 4.8,
    totalReviews: 127,
    yearsInBusiness: 8,
    projectsCompleted: 342,
    contact: {
      email: "contact@elitecatering.com",
      phone: "+1 (555) 123-4567",
      website: "www.elitecatering.com",
    },
    services: [
      "Event Planning",
      "Catering",
      "Venue Decoration",
      "Audio/Visual",
      "Photography",
    ],
    certifications: [
      "ServSafe Certified",
      "Event Planning Institute",
      "ISO 9001:2015",
    ],
    portfolio: [
      {
        id: "1",
        title: "Corporate Gala 2023",
        description:
          "500-person corporate event with full catering and entertainment",
        imageUrl: "/placeholder.svg",
        budget: 75000,
        completedDate: "2023-11-15",
      },
      {
        id: "2",
        title: "Wedding Reception",
        description: "Elegant wedding reception for 200 guests",
        imageUrl: "/placeholder.svg",
        budget: 45000,
        completedDate: "2023-09-22",
      },
    ],
    reviews: [
      {
        id: "1",
        clientName: "Sarah Johnson",
        rating: 5,
        comment:
          "Absolutely fantastic service! They exceeded our expectations.",
        date: "2023-12-01",
        projectType: "Corporate Event",
      },
      {
        id: "2",
        clientName: "Michael Chen",
        rating: 4,
        comment: "Great attention to detail and professional team.",
        date: "2023-10-15",
        projectType: "Wedding",
      },
    ],
    performance: {
      onTimeDelivery: 96,
      budgetAdherence: 94,
      qualityScore: 98,
      responseTime: "< 2 hours",
    },
  };

  const handleContactVendor = () => {
    onContactVendor(proposal);
    toast({
      title: "Starting conversation",
      description: `Opening chat with ${vendorProfile.name}`,
    });
  };

  const handleScheduleCall = () => {
    toast({
      title: "Call scheduled",
      description: `Video call scheduled with ${vendorProfile.name}`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-current text-yellow-400"
            : i < rating
              ? "fill-current text-yellow-400 opacity-50"
              : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">
                {vendorProfile.name}
              </DialogTitle>
              <DialogDescription className="mt-1 text-base">
                {vendorProfile.businessType} • {vendorProfile.location}
              </DialogDescription>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {renderStars(vendorProfile.rating)}
                  <span className="text-sm font-medium">
                    {vendorProfile.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({vendorProfile.totalReviews} reviews)
                  </span>
                </div>
                <Badge variant="outline">
                  {vendorProfile.yearsInBusiness} years in business
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => onViewProposalDetails(proposal)}>
                <FileText className="mr-2 h-4 w-4" />
                View Proposal
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent
            value="overview"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-700">
                    {vendorProfile.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        {vendorProfile.projectsCompleted} projects completed
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{vendorProfile.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    onClick={handleContactVendor}
                    className="w-full"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Start Chat
                  </Button>
                  <Button
                    onClick={handleScheduleCall}
                    variant="outline"
                    className="w-full"
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Schedule Call
                  </Button>
                  <Button
                    onClick={() => onViewProposalDetails(proposal)}
                    variant="outline"
                    className="w-full"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View Proposal
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {vendorProfile.services.map((service) => (
                      <Badge
                        key={service}
                        variant="secondary"
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {vendorProfile.certifications.map((cert) => (
                      <div
                        key={cert}
                        className="flex items-center gap-2"
                      >
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent
            value="portfolio"
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Recent Projects</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {vendorProfile.portfolio.map((project) => (
                <Card key={project.id}>
                  <div className="aspect-video rounded-t-lg bg-gray-100"></div>
                  <CardContent className="p-4">
                    <h4 className="mb-2 font-semibold">{project.title}</h4>
                    <p className="mb-3 text-sm text-gray-600">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-green-600">
                        ${project.budget.toLocaleString()}
                      </span>
                      <span className="text-gray-500">
                        {new Date(project.completedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent
            value="reviews"
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Client Reviews</h3>
              <div className="flex items-center gap-1">
                {renderStars(vendorProfile.rating)}
                <span className="ml-2 font-medium">
                  {vendorProfile.rating} out of 5
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {vendorProfile.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{review.clientName}</h4>
                        <div className="mt-1 flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div>{review.projectType}</div>
                        <div>{new Date(review.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent
            value="performance"
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {vendorProfile.performance.onTimeDelivery}%
                  </div>
                  <div className="text-sm text-gray-600">On-Time Delivery</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {vendorProfile.performance.budgetAdherence}%
                  </div>
                  <div className="text-sm text-gray-600">Budget Adherence</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {vendorProfile.performance.qualityScore}%
                  </div>
                  <div className="text-sm text-gray-600">Quality Score</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {vendorProfile.performance.responseTime}
                  </div>
                  <div className="text-sm text-gray-600">Avg Response</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent
            value="contact"
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Business Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{vendorProfile.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{vendorProfile.contact.phone}</span>
                  </div>
                  {vendorProfile.contact.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span>{vendorProfile.contact.website}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Communication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={handleContactVendor}
                    className="w-full"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  <Button
                    onClick={handleScheduleCall}
                    variant="outline"
                    className="w-full"
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Schedule Video Call
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default VendorProfileDialog;
