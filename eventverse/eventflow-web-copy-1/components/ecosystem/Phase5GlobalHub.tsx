"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Building2, Globe2, Rocket, Users, Zap } from "lucide-react";
import { useState } from "react";
import GlobalAnalyticsModule from "./GlobalAnalyticsModule";
import GlobalInfrastructureModule from "./GlobalInfrastructureModule";
import InnovationLabModule from "./InnovationLabModule";
import PlatformEcosystemModule from "./PlatformEcosystemModule";
import ResearchHubModule from "./ResearchHubModule";
import SocialImpactModule from "./SocialImpactModule";

const Phase5GlobalHub = () => {
  const [activeTab, setActiveTab] = useState("infrastructure");

  return (
    <div className="space-y-6">
      <Card className="border-gradient-to-r border-2 bg-gradient-to-r from-purple-50 from-purple-200 via-blue-50 via-blue-200 via-green-50 to-green-200 to-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe2 className="h-6 w-6 text-purple-600" />
            Phase 5: Global Event Technology Platform
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700"
            >
              Global Scale
            </Badge>
          </CardTitle>
          <p className="text-gray-600">
            A comprehensive global ecosystem with advanced technologies,
            innovation labs, marketplace, and worldwide impact measurement.
          </p>
        </CardHeader>
      </Card>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger
            value="infrastructure"
            className="flex items-center gap-2"
          >
            <Globe2 className="h-4 w-4" />
            Global Infrastructure
          </TabsTrigger>
          <TabsTrigger
            value="innovation"
            className="flex items-center gap-2"
          >
            <Rocket className="h-4 w-4" />
            Innovation Lab
          </TabsTrigger>
          <TabsTrigger
            value="ecosystem"
            className="flex items-center gap-2"
          >
            <Building2 className="h-4 w-4" />
            Platform Ecosystem
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="flex items-center gap-2"
          >
            <Brain className="h-4 w-4" />
            Global Analytics
          </TabsTrigger>
          <TabsTrigger
            value="impact"
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Social Impact
          </TabsTrigger>
          <TabsTrigger
            value="research"
            className="flex items-center gap-2"
          >
            <Zap className="h-4 w-4" />
            Research Hub
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="infrastructure"
          className="space-y-6"
        >
          <GlobalInfrastructureModule />
        </TabsContent>

        <TabsContent
          value="innovation"
          className="space-y-6"
        >
          <InnovationLabModule />
        </TabsContent>

        <TabsContent
          value="ecosystem"
          className="space-y-6"
        >
          <PlatformEcosystemModule />
        </TabsContent>

        <TabsContent
          value="analytics"
          className="space-y-6"
        >
          <GlobalAnalyticsModule />
        </TabsContent>

        <TabsContent
          value="impact"
          className="space-y-6"
        >
          <SocialImpactModule />
        </TabsContent>

        <TabsContent
          value="research"
          className="space-y-6"
        >
          <ResearchHubModule />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Phase5GlobalHub;
