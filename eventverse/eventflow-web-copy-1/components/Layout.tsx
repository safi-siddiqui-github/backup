"use client";

import { Button } from "@/components/ui/button";
import { Grid3X3, Plus } from "lucide-react";
import { ReactNode, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
import { Routes } from "@/lib/routes";
import Link from "next/link";
import BreadcrumbNavigation from "./BreadcrumbNavigation";
import EnhancedEventCreationDialog from "./EnhancedEventCreationDialog";
import ProfileDropdown from "./ProfileDropdown";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // const location = useLocation();
  const location = {
    pathname: "/",
  };
  const isPublicEventsPage = location.pathname === "/public-events";
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Don't show header on public events page since it has its own header
  if (isPublicEventsPage) {
    return <>{children}</>;
  }

  const handleEventCreated = (eventData: unknown) => {
    setShowCreateDialog(false);
    // You could add navigation logic here if needed
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={Routes.home}
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              EventFlow
            </Link>

            <div className="flex items-center gap-4">
              <Button
                asChild
                variant="outline"
              >
                <Link href={Routes.home}>
                  <Grid3X3 className="mr-2 h-4 w-4" />
                  Modules
                </Link>
              </Button>
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
              <ProfileDropdown />
            </div>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="mx-auto max-w-7xl border-t border-gray-100 px-6 dark:border-gray-700">
          <BreadcrumbNavigation />
        </div>
      </header>

      {/* Content */}
      <main>{children}</main>

      <EnhancedEventCreationDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onEventCreated={handleEventCreated}
      />
    </div>
  );
};

export default Layout;
