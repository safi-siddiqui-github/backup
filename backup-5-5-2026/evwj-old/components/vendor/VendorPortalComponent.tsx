"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActivityNavigationStore } from "@/lib/activity-navigation-store";
import { useVendorNavigationStore } from "@/lib/lib-vendor-navigation-store";
import {
  BarChart3,
  Bell,
  Building2,
  FileText,
  MessageSquare,
  Receipt,
  Store,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import AIDashboardContent from "./ai-dashboard/AIDashboardContent";
import BillingContent from "./billing/BillingContent";
import ClientHubContent from "./client-hub/ClientHubContent";
import VendorCommunicationsContent from "./communications/VendorCommunicationsContent";
import DocumentsTab from "./documents/DocumentsTab";
import SmartLeadsContent from "./smart-leads/SmartLeadsContent";

export type VendorTabValue =
  | "ai-dashboard"
  | "smart-leads"
  | "client-hub"
  | "communications"
  | "billing"
  | "documents"
  | "event-booths"
  | "vendor-presets";

export default function VendorPortalComponent() {
  const [activeTab, setActiveTab] = useState<VendorTabValue>("ai-dashboard");
  const { leadToOpen } = useVendorNavigationStore();
  const { navigationTarget, clearNavigation } = useActivityNavigationStore();

  const handleTabChange = (value: string) => {
    const tabValue = value as VendorTabValue;
    setActiveTab(tabValue);
  };

  // Auto-switch to smart-leads tab when navigating to a lead
  useEffect(() => {
    if (leadToOpen) {
      setActiveTab("smart-leads");
    }
  }, [leadToOpen]);

  // Handle activity navigation
  useEffect(() => {
    if (navigationTarget) {
      if (navigationTarget.type === "main-tab") {
        setActiveTab(navigationTarget.tab);
        clearNavigation();
      } else if (navigationTarget.type === "lead") {
        // Use the lead navigation store to open the lead
        useVendorNavigationStore
          .getState()
          .navigateToLead(navigationTarget.leadId, navigationTarget.initialTab);
        setActiveTab("smart-leads");
        clearNavigation();
      } else if (navigationTarget.type === "client") {
        setActiveTab("client-hub");
        // ClientHubContent will handle opening the specific client
        // Don't clear navigation here - let ClientHubContent handle it
      }
    }
  }, [navigationTarget, clearNavigation]);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      {/* Navigation Tabs */}
      <Tabs
        defaultValue="ai-dashboard"
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="*:data-[slot=tabs-trigger]:hover:bg-background h-full w-full justify-start gap-2 overflow-x-auto bg-linear-to-r from-background/80 to-muted/20 border shadow-md transition-all duration-300 hover:shadow-lg hover:from-primary/5 hover:to-secondary/5 hover:border-primary/20 rounded-xl p-[3px] *:data-[slot=tabs-trigger]:cursor-pointer">
          <TabsTrigger
            value="ai-dashboard"
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg dark:text-slate-300"
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>

          <TabsTrigger
            value="smart-leads"
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg dark:text-slate-300"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Leads</span>
          </TabsTrigger>

          <TabsTrigger
            value="client-hub"
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg dark:text-slate-300"
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Client Hub</span>
          </TabsTrigger>

          <TabsTrigger
            value="communications"
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg dark:text-slate-300"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Communications</span>
          </TabsTrigger>

          <TabsTrigger
            value="billing"
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg dark:text-slate-300"
          >
            <Receipt className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>

          <TabsTrigger
            value="documents"
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg dark:text-slate-300"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Documents</span>
          </TabsTrigger>

          <TabsTrigger
            value="event-booths"
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg dark:text-slate-300"
          >
            <Store className="h-4 w-4" />
            <span className="hidden sm:inline">Event Booths</span>
          </TabsTrigger>

          <TabsTrigger
            value="vendor-presets"
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 data-[state=active]:bg-linear-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg dark:text-slate-300"
          >
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Vendor Presets</span>
          </TabsTrigger>
        </TabsList>

        {/* AI Dashboard Tab Content */}
        <TabsContent
          value="ai-dashboard"
          className="mt-6"
        >
          <AIDashboardContent />
        </TabsContent>

        {/* Smart Leads Tab Content */}
        <TabsContent
          value="smart-leads"
          className="mt-6"
        >
          <SmartLeadsContent />
        </TabsContent>

        {/* Client Hub Tab Content */}
        <TabsContent
          value="client-hub"
          className="mt-6"
        >
          <ClientHubContent />
        </TabsContent>

        {/* Communications Tab Content */}
        <TabsContent
          value="communications"
          className="mt-6"
        >
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="mb-2 text-2xl font-bold">Communications</h2>
              <p className="text-muted-foreground">
                Messages and conversations with clients
              </p>
            </div>
            <VendorCommunicationsContent />
          </div>
        </TabsContent>

        {/* Billing Tab Content */}
        <TabsContent
          value="billing"
          className="mt-6"
        >
          <BillingContent />
        </TabsContent>

        {/* Documents Tab Content */}
        <TabsContent
          value="documents"
          className="mt-6"
        >
          <DocumentsTab />
        </TabsContent>

        {/* Event Booths Tab Content */}
        <TabsContent
          value="event-booths"
          className="mt-6"
        >
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="mb-2 text-2xl font-bold">Event Booths</h2>
              <p className="text-muted-foreground">
                Manage your event booth listings and availability
              </p>
            </div>
            <div className="bg-card rounded-lg border p-6">
              <p className="text-muted-foreground">
                Event Booths content will be displayed here
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Vendor Presets Tab Content */}
        <TabsContent
          value="vendor-presets"
          className="mt-6"
        >
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="mb-2 text-2xl font-bold">Vendor Presets</h2>
              <p className="text-muted-foreground">
                Manage your vendor presets and configurations
              </p>
            </div>
            <div className="bg-card rounded-lg border p-6">
              <p className="text-muted-foreground">
                Vendor Presets content will be displayed here
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
