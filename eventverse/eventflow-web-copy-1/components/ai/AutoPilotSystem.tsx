"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Bot,
  CheckCircle,
  Clock,
  DollarSign,
  Mail,
  Settings,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { EventFormData } from "../EnhancedEventCreationDialog";

interface AutomationTask {
  id: string;
  name: string;
  description: string;
  status: "pending" | "running" | "completed" | "scheduled";
  progress: number;
  estimatedTime: string;
  category: "setup" | "marketing" | "operations" | "communication";
  priority: "high" | "medium" | "low";
}

interface Props {
  eventData: EventFormData;
  onUpdateEvent: (updates: Partial<EventFormData>) => void;
}

const AutoPilotSystem = ({ eventData, onUpdateEvent }: Props) => {
  const [isAutoPilotEnabled, setIsAutoPilotEnabled] = useState(false);
  const [tasks, setTasks] = useState<AutomationTask[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [automationSettings, setAutomationSettings] = useState({
    autoInvitations: true,
    dynamicPricing: true,
    smartReminders: true,
    vendorMatching: true,
    realTimeOptimization: true,
  });

  useEffect(() => {
    generateAutomationTasks();
  }, [eventData, isAutoPilotEnabled]);

  const generateAutomationTasks = () => {
    const newTasks: AutomationTask[] = [];

    if (isAutoPilotEnabled) {
      // Setup tasks
      newTasks.push({
        id: "1",
        name: "Venue Layout Optimization",
        description:
          "AI-optimized seating arrangement based on guest preferences",
        status: "running",
        progress: 65,
        estimatedTime: "2 min",
        category: "setup",
        priority: "high",
      });

      newTasks.push({
        id: "2",
        name: "Smart Schedule Generation",
        description: "Creating optimal event timeline with buffer times",
        status: "completed",
        progress: 100,
        estimatedTime: "Complete",
        category: "setup",
        priority: "high",
      });

      // Marketing tasks
      newTasks.push({
        id: "3",
        name: "Dynamic Pricing Setup",
        description: "Configuring AI-driven pricing strategy",
        status: "scheduled",
        progress: 0,
        estimatedTime: "5 min",
        category: "marketing",
        priority: "medium",
      });

      newTasks.push({
        id: "4",
        name: "Social Media Automation",
        description: "Setting up automated promotional posts",
        status: "pending",
        progress: 0,
        estimatedTime: "3 min",
        category: "marketing",
        priority: "medium",
      });

      // Communication tasks
      newTasks.push({
        id: "5",
        name: "Invitation Optimization",
        description: "AI-optimized invitation timing and content",
        status: "running",
        progress: 30,
        estimatedTime: "4 min",
        category: "communication",
        priority: "high",
      });

      newTasks.push({
        id: "6",
        name: "Smart Reminder System",
        description: "Setting up intelligent guest reminders",
        status: "pending",
        progress: 0,
        estimatedTime: "2 min",
        category: "communication",
        priority: "medium",
      });

      // Operations tasks
      newTasks.push({
        id: "7",
        name: "Vendor Matching",
        description: "AI-powered vendor recommendation and booking",
        status: "scheduled",
        progress: 0,
        estimatedTime: "8 min",
        category: "operations",
        priority: "low",
      });
    }

    setTasks(newTasks);

    // Calculate overall progress
    const totalTasks = newTasks.length;
    const completedTasks = newTasks.filter(
      (t) => t.status === "completed",
    ).length;
    const runningTasks = newTasks.filter((t) => t.status === "running");
    const runningProgress =
      runningTasks.reduce((sum, t) => sum + t.progress, 0) / 100;

    const progress =
      totalTasks > 0
        ? ((completedTasks + runningProgress) / totalTasks) * 100
        : 0;
    setOverallProgress(Math.floor(progress));
  };

  const toggleAutoPilot = () => {
    setIsAutoPilotEnabled(!isAutoPilotEnabled);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "running":
        return <Zap className="h-4 w-4 animate-pulse text-blue-500" />;
      case "scheduled":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "setup":
        return Settings;
      case "marketing":
        return DollarSign;
      case "communication":
        return Mail;
      case "operations":
        return Users;
      default:
        return Settings;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50";
      case "medium":
        return "border-yellow-200 bg-yellow-50";
      case "low":
        return "border-green-200 bg-green-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-indigo-600" />
            AutoPilot Event Management
            <Badge
              variant="outline"
              className="bg-indigo-100 text-indigo-700"
            >
              {isAutoPilotEnabled ? "Active" : "Standby"}
            </Badge>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Label
              htmlFor="autopilot-toggle"
              className="text-sm"
            >
              Enable AutoPilot
            </Label>
            <Switch
              id="autopilot-toggle"
              checked={isAutoPilotEnabled}
              onCheckedChange={toggleAutoPilot}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isAutoPilotEnabled ? (
          <>
            {/* Overall Progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Automation Progress</span>
                <span className="text-lg font-bold text-indigo-600">
                  {overallProgress}%
                </span>
              </div>
              <Progress
                value={overallProgress}
                className="h-3"
              />
              <p className="text-sm text-gray-600">
                {tasks.filter((t) => t.status === "completed").length} of{" "}
                {tasks.length} tasks completed
              </p>
            </div>

            {/* Automation Settings */}
            <div className="rounded-lg border bg-white p-4">
              <h4 className="mb-3 flex items-center gap-2 font-semibold">
                <Settings className="h-4 w-4" />
                Automation Settings
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {Object.entries(automationSettings).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between"
                  >
                    <Label className="text-sm">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </Label>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        setAutomationSettings((prev) => ({
                          ...prev,
                          [key]: checked,
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Task List */}
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 font-semibold">
                <Zap className="h-4 w-4" />
                Active Automation Tasks
              </h4>

              {tasks.map((task) => {
                const CategoryIcon = getCategoryIcon(task.category);

                return (
                  <Card
                    key={task.id}
                    className={`p-4 ${getPriorityColor(task.priority)}`}
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <CategoryIcon className="h-5 w-5 text-gray-600" />
                        <div>
                          <h5 className="font-medium text-gray-800">
                            {task.name}
                          </h5>
                          <p className="text-sm text-gray-600">
                            {task.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <Badge
                          variant="outline"
                          className="text-xs"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">
                          {task.estimatedTime}
                        </span>
                      </div>
                      <Progress
                        value={task.progress}
                        className="h-2"
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <Bot className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              AutoPilot Standby
            </h3>
            <p className="mb-4 text-gray-600">
              Enable AutoPilot to automatically optimize and manage your event
              with AI-powered automation.
            </p>
            <Button
              onClick={toggleAutoPilot}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Bot className="mr-2 h-4 w-4" />
              Activate AutoPilot
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AutoPilotSystem;
