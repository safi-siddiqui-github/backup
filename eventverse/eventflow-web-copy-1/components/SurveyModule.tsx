"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BarChart3, Clock, FileText, Users } from "lucide-react";
import { useState } from "react";
import SurveyList from "./survey/SurveyList";
import SurveyQRCode from "./survey/SurveyQRCode";

interface SurveyModuleProps {
  eventId: string;
  onBack: () => void;
}

const SurveyModule = ({ eventId, onBack }: SurveyModuleProps) => {
  const [activeTab, setActiveTab] = useState("surveys");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2 text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-white">Survey Center</h1>
                <p className="text-sm text-purple-100">
                  Create & Analyze Event Surveys
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-6">
        {/* Quick Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <FileText className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <div className="text-2xl font-bold text-gray-800">3</div>
              <div className="text-sm text-gray-600">Active Surveys</div>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Users className="mx-auto mb-2 h-6 w-6 text-green-600" />
              <div className="text-2xl font-bold text-gray-800">156</div>
              <div className="text-sm text-gray-600">Total Responses</div>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <BarChart3 className="mx-auto mb-2 h-6 w-6 text-purple-600" />
              <div className="text-2xl font-bold text-gray-800">78%</div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Clock className="mx-auto mb-2 h-6 w-6 text-orange-600" />
              <div className="text-2xl font-bold text-gray-800">2.5</div>
              <div className="text-sm text-gray-600">Avg. Minutes</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="bg-white/95 shadow-xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-gray-800">Survey Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="surveys">My Surveys</TabsTrigger>
                <TabsTrigger value="share">Share & QR</TabsTrigger>
              </TabsList>

              <TabsContent
                value="surveys"
                className="mt-6"
              >
                <SurveyList eventId={eventId} />
              </TabsContent>

              <TabsContent
                value="share"
                className="mt-6"
              >
                <SurveyQRCode eventId={eventId} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SurveyModule;
