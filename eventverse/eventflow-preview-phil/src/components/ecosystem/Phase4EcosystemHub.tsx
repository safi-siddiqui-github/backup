
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Globe, Users, Brain, BarChart3, Zap } from "lucide-react";
import EventPortfolioManager from "./EventPortfolioManager";
import CommunityHub from "./CommunityHub";
import EnterpriseAnalyticsDashboard from "./EnterpriseAnalyticsDashboard";
import NextGenAI from "./NextGenAI";

const Phase4EcosystemHub = () => {
  const [activeTab, setActiveTab] = useState("portfolio");

  return (
    <div className="space-y-6">
      <Card className="border-2 border-gradient-to-r from-purple-200 to-blue-200 bg-gradient-to-r from-purple-50 via-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-purple-600" />
            Phase 4: Next-Generation Event Ecosystem
            <Badge variant="outline" className="bg-purple-100 text-purple-700">
              Enterprise Ready
            </Badge>
          </CardTitle>
          <p className="text-gray-600">
            Complete ecosystem with portfolio management, community features, enterprise analytics, and next-gen AI systems.
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Portfolio Management
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Community Hub
          </TabsTrigger>
          <TabsTrigger value="enterprise" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Enterprise Analytics
          </TabsTrigger>
          <TabsTrigger value="nextgen" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Next-Gen AI
          </TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-6">
          <EventPortfolioManager />
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          <CommunityHub />
        </TabsContent>

        <TabsContent value="enterprise" className="space-y-6">
          <EnterpriseAnalyticsDashboard />
        </TabsContent>

        <TabsContent value="nextgen" className="space-y-6">
          <NextGenAI />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Phase4EcosystemHub;
