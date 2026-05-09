
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  MessageSquare,
  FileText,
  ArrowRight
} from "lucide-react";

interface VendorUser {
  id: string;
  businessName: string;
  email: string;
  category: string;
  status: "active" | "pending" | "suspended";
  profileComplete: boolean;
}

interface ActiveProjectsDashboardProps {
  vendor: VendorUser;
}

// Mock active projects data
const activeProjects = [
  {
    id: "project-1",
    clientName: "Sarah & Michael Johnson",
    eventType: "Wedding",
    eventDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    contractValue: 5000,
    currentStage: "Menu Planning & Tasting",
    stageProgress: 60,
    nextMilestone: "Tasting Session",
    nextMilestoneDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    overallProgress: 35,
    status: "on_track" as const,
    unreadMessages: 2
  },
  {
    id: "project-2",
    clientName: "Elite Events Inc",
    eventType: "Corporate Gala",
    eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    contractValue: 12000,
    currentStage: "Final Preparations",
    stageProgress: 80,
    nextMilestone: "Staff Briefing",
    nextMilestoneDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    overallProgress: 75,
    status: "on_track" as const,
    unreadMessages: 0
  },
  {
    id: "project-3",
    clientName: "Birthday Celebration",
    eventType: "Private Party",
    eventDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    contractValue: 2500,
    currentStage: "Contract & Planning",
    stageProgress: 30,
    nextMilestone: "Menu Approval",
    nextMilestoneDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    overallProgress: 45,
    status: "at_risk" as const,
    unreadMessages: 3
  }
];

const ActiveProjectsDashboard = ({ vendor }: ActiveProjectsDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const totalProjects = activeProjects.length;
  const totalValue = activeProjects.reduce((sum, project) => sum + project.contractValue, 0);
  const upcomingMilestones = activeProjects.filter(p => 
    p.nextMilestoneDate <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ).length;
  const atRiskProjects = activeProjects.filter(p => p.status === 'at_risk').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on_track":
        return "bg-green-100 text-green-800";
      case "at_risk":
        return "bg-yellow-100 text-yellow-800";
      case "delayed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on_track":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "at_risk":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "delayed":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Active Projects</h2>
        <p className="text-gray-600">Monitor progress across all your client engagements</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold">{totalProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Due This Week</p>
                <p className="text-2xl font-bold">{upcomingMilestones}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">At Risk</p>
                <p className="text-2xl font-bold">{atRiskProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Project Overview</TabsTrigger>
          <TabsTrigger value="timelines">Service Timelines</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="space-y-4">
            {activeProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {project.clientName}
                        {project.unreadMessages > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {project.unreadMessages} new
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {project.eventType} • Event Date: {project.eventDate.toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${project.contractValue.toLocaleString()}</p>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Current Stage */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Current Stage: {project.currentStage}</span>
                        <span className="text-sm text-gray-600">{project.stageProgress}% Complete</span>
                      </div>
                      <Progress value={project.stageProgress} className="h-2" />
                    </div>
                    
                    {/* Overall Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm text-gray-600">{project.overallProgress}% Complete</span>
                      </div>
                      <Progress value={project.overallProgress} className="h-2" />
                    </div>
                    
                    {/* Next Milestone */}
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(project.status)}
                        <div>
                          <p className="font-medium text-sm">Next: {project.nextMilestone}</p>
                          <p className="text-xs text-gray-600">
                            Due: {project.nextMilestoneDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message Client
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Update Timeline
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        View Contract
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timelines" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Delivery Timelines</CardTitle>
              <CardDescription>Track progress through your defined service stages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activeProjects.map((project) => (
                  <div key={`timeline-${project.id}`} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">{project.clientName}</h4>
                      <Badge variant="outline">{project.currentStage}</Badge>
                    </div>
                    
                    {/* Stage Progress Visualization */}
                    <div className="flex items-center gap-2">
                      {["Initial Consultation", "Menu Planning & Tasting", "Contract & Planning", "Final Preparations", "Event Execution"].map((stage, index) => (
                        <div key={stage} className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            stage === project.currentStage ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' :
                            index < ["Initial Consultation", "Menu Planning & Tasting", "Contract & Planning", "Final Preparations", "Event Execution"].indexOf(project.currentStage) ? 'bg-green-100 text-green-600' :
                            'bg-gray-100 text-gray-400'
                          }`}>
                            {index + 1}
                          </div>
                          {index < 4 && (
                            <div className={`w-8 h-1 ${
                              index < ["Initial Consultation", "Menu Planning & Tasting", "Contract & Planning", "Final Preparations", "Event Execution"].indexOf(project.currentStage) ? 'bg-green-300' : 'bg-gray-200'
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Communications</CardTitle>
              <CardDescription>Latest messages and updates from your clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeProjects
                  .filter(p => p.unreadMessages > 0)
                  .map((project) => (
                    <div key={`comm-${project.id}`} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{project.clientName}</h4>
                        <Badge variant="destructive">{project.unreadMessages} unread</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Latest message about {project.currentStage.toLowerCase()} requirements...
                      </p>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        View Conversation
                      </Button>
                    </div>
                  ))}
                
                {activeProjects.filter(p => p.unreadMessages > 0).length === 0 && (
                  <p className="text-gray-500 text-center py-8">No unread messages</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ActiveProjectsDashboard;
