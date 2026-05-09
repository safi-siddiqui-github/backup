"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Brain, Globe, Users } from "lucide-react";
import { useState } from "react";
import CommunityHub from "./CommunityHub";
import EnterpriseAnalyticsDashboard from "./EnterpriseAnalyticsDashboard";
import EventPortfolioManager from "./EventPortfolioManager";
import NextGenAI from "./NextGenAI";

const Phase4EcosystemHub = () => {
  const [activeTab, setActiveTab] = useState("portfolio");

  return (
    <div className="space-y-6">
      <Card className="border-gradient-to-r border-2 bg-gradient-to-r from-purple-50 from-purple-200 via-blue-50 to-blue-200 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-purple-600" />
            Phase 4: Next-Generation Event Ecosystem
            <Badge
              variant="outline"
              className="bg-purple-100 text-purple-700"
            >
              Enterprise Ready
            </Badge>
          </CardTitle>
          <p className="text-gray-600">
            Complete ecosystem with portfolio management, community features,
            enterprise analytics, and next-gen AI systems.
          </p>
        </CardHeader>
      </Card>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            value="portfolio"
            className="flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            Portfolio Management
          </TabsTrigger>
          <TabsTrigger
            value="community"
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Community Hub
          </TabsTrigger>
          <TabsTrigger
            value="enterprise"
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            Enterprise Analytics
          </TabsTrigger>
          <TabsTrigger
            value="nextgen"
            className="flex items-center gap-2"
          >
            <Brain className="h-4 w-4" />
            Next-Gen AI
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="portfolio"
          className="space-y-6"
        >
          <EventPortfolioManager />
        </TabsContent>

        <TabsContent
          value="community"
          className="space-y-6"
        >
          <CommunityHub />
        </TabsContent>

        <TabsContent
          value="enterprise"
          className="space-y-6"
        >
          <EnterpriseAnalyticsDashboard />
        </TabsContent>

        <TabsContent
          value="nextgen"
          className="space-y-6"
        >
          <NextGenAI />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Phase4EcosystemHub;
