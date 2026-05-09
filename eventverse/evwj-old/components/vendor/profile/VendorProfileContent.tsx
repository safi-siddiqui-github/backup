"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Star, User, Briefcase, FolderKanban, Image, MessageSquare, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VendorProfileProvider } from "./context/VendorProfileContext";
import BasicInfoTab from "./tabs/basic-info";
import ServicesTab from "./tabs/services";
import ActiveProjectsTab from "./tabs/active-projects";
import PortfolioTab from "./tabs/portfolio";
import ReviewsTab from "./tabs/reviews";

export default function VendorProfileContent() {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("basic-info");

  // Mock vendor data
  const vendorName = "Demo Vendor Business";
  const vendorCategory = "Catering";
  const vendorRating = 4.8;
  const reviewCount = 23;

  const initials = vendorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleEditProfile = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <VendorProfileProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/vendor")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Vendor Portal
          </Button>
        </div>

        {/* Profile Header */}
        <div className="mb-6 rounded-lg border bg-white p-6 dark:bg-slate-900">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            {/* Profile Info */}
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-2xl font-bold text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                  {vendorName}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  >
                    {vendorCategory}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{vendorRating}</span>
                    <span>({reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <Button
              onClick={handleEditProfile}
              variant={isEditMode ? "default" : "outline"}
              className="w-full shrink-0 sm:w-auto"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              {isEditMode ? "Save Profile" : "Edit Profile"}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="flex w-full flex-wrap gap-2 sm:grid sm:grid-cols-3 lg:w-auto lg:inline-grid lg:grid-cols-5 lg:gap-0">
            <TabsTrigger
              value="basic-info"
              className="flex flex-1 min-w-0 items-center justify-center gap-1.5 rounded-full px-3 py-2 sm:px-4 sm:py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg sm:flex-initial"
            >
              <User className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Basic Info</span>
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="flex flex-1 min-w-0 items-center justify-center gap-1.5 rounded-full px-3 py-2 sm:px-4 sm:py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg sm:flex-initial"
            >
              <Briefcase className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger
              value="active-projects"
              className="flex flex-1 min-w-0 items-center justify-center gap-1.5 rounded-full px-3 py-2 sm:px-4 sm:py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg sm:flex-initial"
            >
              <FolderKanban className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Active Projects</span>
            </TabsTrigger>
            <TabsTrigger
              value="portfolio"
              className="flex flex-1 min-w-0 items-center justify-center gap-1.5 rounded-full px-3 py-2 sm:px-4 sm:py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg sm:flex-initial"
            >
              <Image className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Portfolio</span>
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="flex flex-1 min-w-0 items-center justify-center gap-1.5 rounded-full px-3 py-2 sm:px-4 sm:py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg sm:flex-initial"
            >
              <MessageSquare className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Reviews</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic-info" className="space-y-4">
            <BasicInfoTab isEditMode={isEditMode} />
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <ServicesTab isEditMode={isEditMode} />
          </TabsContent>

          <TabsContent value="active-projects" className="space-y-4">
            <ActiveProjectsTab />
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-4">
            <PortfolioTab isEditMode={isEditMode} />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <ReviewsTab />
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </VendorProfileProvider>
  );
}

