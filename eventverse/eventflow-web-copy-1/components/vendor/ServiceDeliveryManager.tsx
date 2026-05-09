"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowRight,
  CheckCircle,
  Edit3,
  FileText,
  Plus,
  Settings,
} from "lucide-react";
import { useState } from "react";

interface VendorUser {
  id: string;
  businessName: string;
  email: string;
  category: string;
  status: "active" | "pending" | "suspended";
  profileComplete: boolean;
}

interface ServiceDeliveryManagerProps {
  vendor: VendorUser;
}

interface DeliveryStage {
  id: string;
  name: string;
  description: string;
  duration: number; // in days
  required: boolean;
  documents: string[];
  milestones: string[];
}

interface ServiceTemplate {
  id: string;
  name: string;
  category: string;
  stages: DeliveryStage[];
  totalDuration: number;
}

const ServiceDeliveryManager = ({ vendor }: ServiceDeliveryManagerProps) => {
  const [activeTab, setActiveTab] = useState("timelines");
  const [editingTemplate, setEditingTemplate] =
    useState<ServiceTemplate | null>(null);
  const { toast } = useToast();

  // Mock data for service templates
  const serviceTemplates: ServiceTemplate[] = [
    {
      id: "1",
      name: "Wedding Catering Package",
      category: "Wedding",
      totalDuration: 90,
      stages: [
        {
          id: "1",
          name: "Initial Consultation",
          description:
            "Meet with clients to understand their vision and requirements",
          duration: 7,
          required: true,
          documents: ["Client Questionnaire", "Menu Preferences"],
          milestones: ["Requirements Gathered", "Initial Quote Provided"],
        },
        {
          id: "2",
          name: "Menu Planning & Tasting",
          description: "Design custom menu and conduct tasting session",
          duration: 14,
          required: true,
          documents: ["Custom Menu", "Tasting Notes", "Final Menu Approval"],
          milestones: ["Menu Designed", "Tasting Completed", "Menu Approved"],
        },
        {
          id: "3",
          name: "Contract & Planning",
          description: "Finalize contract and detailed event planning",
          duration: 21,
          required: true,
          documents: [
            "Service Contract",
            "Event Timeline",
            "Vendor Coordination",
          ],
          milestones: [
            "Contract Signed",
            "Timeline Approved",
            "Vendors Coordinated",
          ],
        },
        {
          id: "4",
          name: "Final Preparations",
          description: "Final confirmations and event preparation",
          duration: 14,
          required: true,
          documents: [
            "Final Guest Count",
            "Setup Schedule",
            "Emergency Contacts",
          ],
          milestones: [
            "Guest Count Confirmed",
            "Setup Planned",
            "Team Briefed",
          ],
        },
        {
          id: "5",
          name: "Event Execution",
          description: "Setup, service, and cleanup on event day",
          duration: 1,
          required: true,
          documents: ["Service Report", "Client Feedback"],
          milestones: [
            "Event Completed",
            "Cleanup Finished",
            "Feedback Collected",
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Corporate Event Catering",
      category: "Corporate",
      totalDuration: 30,
      stages: [
        {
          id: "1",
          name: "Requirements Analysis",
          description: "Understand corporate event needs and constraints",
          duration: 3,
          required: true,
          documents: [
            "Event Brief",
            "Dietary Requirements",
            "Budget Parameters",
          ],
          milestones: ["Requirements Documented", "Proposal Prepared"],
        },
        {
          id: "2",
          name: "Menu & Service Planning",
          description: "Design appropriate menu and service style",
          duration: 7,
          required: true,
          documents: ["Corporate Menu", "Service Plan", "Logistics Overview"],
          milestones: ["Menu Approved", "Service Plan Confirmed"],
        },
        {
          id: "3",
          name: "Execution & Follow-up",
          description: "Event delivery and post-event activities",
          duration: 3,
          required: true,
          documents: ["Event Report", "Invoice", "Satisfaction Survey"],
          milestones: ["Event Delivered", "Invoice Sent", "Feedback Received"],
        },
      ],
    },
  ];

  const handleSaveTemplate = () => {
    toast({
      title: "Template saved",
      description: "Service delivery template has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Service Delivery Management</h3>
          <p className="text-gray-600">
            Define your service delivery process and timelines
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Template
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timelines">Timelines</TabsTrigger>
          <TabsTrigger value="stages">Stages</TabsTrigger>
          <TabsTrigger value="standards">Standards</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
        </TabsList>

        <TabsContent value="timelines">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {serviceTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>
                        <Badge
                          variant="outline"
                          className="mr-2"
                        >
                          {template.category}
                        </Badge>
                        {template.totalDuration} days total duration
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {template.stages.map((stage, index) => (
                      <div
                        key={stage.id}
                        className="flex items-center gap-3 rounded-lg border p-3"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{stage.name}</p>
                          <p className="text-xs text-gray-600">
                            {stage.duration} days
                          </p>
                        </div>
                        {index < template.stages.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stages">
          <Card>
            <CardHeader>
              <CardTitle>Stage Configuration</CardTitle>
              <CardDescription>
                Define and customize your service delivery stages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {serviceTemplates[0].stages.map((stage, index) => (
                  <Card key={stage.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          Stage {index + 1}: {stage.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={stage.required ? "default" : "secondary"}
                          >
                            {stage.required ? "Required" : "Optional"}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor={`description-${stage.id}`}>
                            Description
                          </Label>
                          <Textarea
                            id={`description-${stage.id}`}
                            value={stage.description}
                            rows={3}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`duration-${stage.id}`}>
                            Duration (days)
                          </Label>
                          <Input
                            id={`duration-${stage.id}`}
                            type="number"
                            value={stage.duration}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Required Documents</Label>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {stage.documents.map((doc, docIndex) => (
                              <Badge
                                key={docIndex}
                                variant="outline"
                                className="text-xs"
                              >
                                <FileText className="mr-1 h-3 w-3" />
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Milestones</Label>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {stage.milestones.map(
                              (milestone, milestoneIndex) => (
                                <Badge
                                  key={milestoneIndex}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                  {milestone}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standards">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Service Level Agreements</CardTitle>
                <CardDescription>
                  Define your service commitments and response times
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="response-time">Initial Response Time</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select response time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">Within 1 hour</SelectItem>
                      <SelectItem value="2h">Within 2 hours</SelectItem>
                      <SelectItem value="4h">Within 4 hours</SelectItem>
                      <SelectItem value="24h">Within 24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="proposal-time">Proposal Delivery</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select proposal timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Within 24 hours</SelectItem>
                      <SelectItem value="48h">Within 48 hours</SelectItem>
                      <SelectItem value="72h">Within 72 hours</SelectItem>
                      <SelectItem value="1w">Within 1 week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="revision-limit">Included Revisions</Label>
                  <Input
                    id="revision-limit"
                    type="number"
                    placeholder="Number of included revisions"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Standards</CardTitle>
                <CardDescription>
                  Define your quality checkpoints and standards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="quality-checks">Quality Checkpoints</Label>
                  <Textarea
                    id="quality-checks"
                    placeholder="Describe your quality control process..."
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="satisfaction-guarantee">
                    Satisfaction Guarantee
                  </Label>
                  <Textarea
                    id="satisfaction-guarantee"
                    placeholder="Describe your satisfaction guarantee policy..."
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="packages">
          <Card>
            <CardHeader>
              <CardTitle>Service Packages</CardTitle>
              <CardDescription>
                Create different service tiers with varying timelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {["Basic", "Premium", "Luxury"].map((packageName) => (
                  <Card key={packageName}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {packageName} Package
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Timeline</span>
                          <Badge variant="outline">
                            {packageName === "Basic"
                              ? "30 days"
                              : packageName === "Premium"
                                ? "60 days"
                                : "90 days"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Consultations</span>
                          <Badge variant="outline">
                            {packageName === "Basic"
                              ? "1"
                              : packageName === "Premium"
                                ? "2"
                                : "3"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Revisions</span>
                          <Badge variant="outline">
                            {packageName === "Basic"
                              ? "2"
                              : packageName === "Premium"
                                ? "4"
                                : "Unlimited"}
                          </Badge>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full"
                        >
                          <Edit3 className="mr-2 h-4 w-4" />
                          Customize
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveTemplate}>
          <Settings className="mr-2 h-4 w-4" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default ServiceDeliveryManager;
