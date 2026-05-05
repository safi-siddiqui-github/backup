"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileStack, User, LogOut, Brain, Building2, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/lib-routes";
import { toast } from "sonner";
import ThemeHandleComponent from "@/components/general/theme/ThemeHandleComponent";

export default function VendorPortalHeader() {
  const router = useRouter();

  const handleSignOut = () => {
    // TODO: Add login route when login page is implemented
    router.push("/");
    toast("Signed out successfully");
  };

  const handleViewProfile = () => {
    router.push(Routes.web.vendor.profile);
  };

  const handleSwitchToUserProfile = () => {
    router.push(Routes.web.general.home);
  };

  // Get vendor info from user store or use mock data
  // const vendorName = userStore?.user?.firstname || "Demo Vendor Business";
  // const vendorEmail = userStore?.user?.email || "neqifit@mailinator.com";
  const vendorName =  "Demo Vendor Business";
  const vendorEmail = "neqifit@mailinator.com";
  const vendorCategory = "Catering"; // TODO: Get from user store
  const vendorStatus = "Active"; // TODO: Get from user store
  const initials = vendorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-900">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Left Section - Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-linear-to-r from-purple-600 to-cyan-600">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                Vendor Portal
              </h1>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-xs px-2 py-0.5"
              >
                <span className="mr-1"><Brain className="h-4 w-4" /></span>
                AI Enhanced
              </Badge>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
            Demo Vendor Business
            </p>
          </div>
        </div>

        {/* Right Section - Profile */}
        <div className="flex items-center gap-4">
          {/* Profile Avatar with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-linear-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64"
            >
              {/* Vendor Info */}
              <div className="px-2 py-3">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-linear-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {vendorName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {vendorEmail}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <Badge
                    variant="outline"
                    className="w-fit text-xs bg-gray-100 dark:bg-gray-800"
                  >
                    {vendorCategory}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="w-fit text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800"
                  >
                    {vendorStatus}
                  </Badge>
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Menu Items */}
              <DropdownMenuItem
                onClick={handleSwitchToUserProfile}
                className="cursor-pointer"
              >
                <Home className="mr-2 h-4 w-4" />
                <span>Switch to User Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleViewProfile}
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                <span>View Profile</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Dark Mode Toggle */}
              <ThemeHandleComponent />

              <DropdownMenuSeparator />

              {/* Sign Out */}
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

