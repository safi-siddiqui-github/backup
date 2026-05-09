
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, FileText, BarChart3, Users, Clock, Eye } from "lucide-react";
import SurveyCreator from "./survey/SurveyCreator";
import SurveyList from "./survey/SurveyList";
import SurveyResponses from "./survey/SurveyResponses";
import SurveyQRCode from "./survey/SurveyQRCode";
import SurveyFormRenderer from "./survey/SurveyFormRenderer";

interface SurveyModuleProps {
  eventId: string;
  onBack: () => void;
}

const SurveyModule = ({ eventId, onBack }: SurveyModuleProps) => {
  const [activeTab, setActiveTab] = useState("surveys");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/10 p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-white">Survey Center</h1>
                <p className="text-purple-100 text-sm">Create & Analyze Event Surveys</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <FileText className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-gray-800">3</div>
              <div className="text-sm text-gray-600">Active Surveys</div>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-gray-800">156</div>
              <div className="text-sm text-gray-600">Total Responses</div>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-gray-800">78%</div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-gray-800">2.5</div>
              <div className="text-sm text-gray-600">Avg. Minutes</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-800">Survey Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="surveys">My Surveys</TabsTrigger>
                <TabsTrigger value="share">Share & QR</TabsTrigger>
              </TabsList>

              <TabsContent value="surveys" className="mt-6">
                <SurveyList eventId={eventId} />
              </TabsContent>

              <TabsContent value="share" className="mt-6">
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
