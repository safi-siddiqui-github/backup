
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Globe2, Zap, Building2, Brain, Rocket, Users } from "lucide-react";
import GlobalInfrastructureModule from "./GlobalInfrastructureModule";
import InnovationLabModule from "./InnovationLabModule";
import PlatformEcosystemModule from "./PlatformEcosystemModule";
import GlobalAnalyticsModule from "./GlobalAnalyticsModule";
import SocialImpactModule from "./SocialImpactModule";
import ResearchHubModule from "./ResearchHubModule";

const Phase5GlobalHub = () => {
  const [activeTab, setActiveTab] = useState("infrastructure");

  return (
    <div className="space-y-6">
      <Card className="border-2 border-gradient-to-r from-purple-200 via-blue-200 to-green-200 bg-gradient-to-r from-purple-50 via-blue-50 via-green-50 to-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe2 className="w-6 h-6 text-purple-600" />
            Phase 5: Global Event Technology Platform
            <Badge variant="outline" className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700">
              Global Scale
            </Badge>
          </CardTitle>
          <p className="text-gray-600">
            A comprehensive global ecosystem with advanced technologies, innovation labs, marketplace, and worldwide impact measurement.
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="infrastructure" className="flex items-center gap-2">
            <Globe2 className="w-4 h-4" />
            Global Infrastructure
          </TabsTrigger>
          <TabsTrigger value="innovation" className="flex items-center gap-2">
            <Rocket className="w-4 h-4" />
            Innovation Lab
          </TabsTrigger>
          <TabsTrigger value="ecosystem" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Platform Ecosystem
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Global Analytics
          </TabsTrigger>
          <TabsTrigger value="impact" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Social Impact
          </TabsTrigger>
          <TabsTrigger value="research" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Research Hub
          </TabsTrigger>
        </TabsList>

        <TabsContent value="infrastructure" className="space-y-6">
          <GlobalInfrastructureModule />
        </TabsContent>

        <TabsContent value="innovation" className="space-y-6">
          <InnovationLabModule />
        </TabsContent>

        <TabsContent value="ecosystem" className="space-y-6">
          <PlatformEcosystemModule />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <GlobalAnalyticsModule />
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <SocialImpactModule />
        </TabsContent>

        <TabsContent value="research" className="space-y-6">
          <ResearchHubModule />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Phase5GlobalHub;
