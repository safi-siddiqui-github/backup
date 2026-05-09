"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Eye, Rocket, Zap } from "lucide-react";
import { useState } from "react";

const InnovationLabModule = () => {
  const [projects] = useState([
    {
      name: "AR Event Experiences",
      category: "Augmented Reality",
      status: "beta",
      progress: 85,
      description: "Immersive AR overlays for event navigation and networking",
    },
    {
      name: "Blockchain Ticketing",
      category: "Blockchain",
      status: "production",
      progress: 100,
      description:
        "NFT-based tickets with fraud prevention and resale tracking",
    },
    {
      name: "IoT Venue Intelligence",
      category: "Internet of Things",
      status: "alpha",
      progress: 60,
      description:
        "Smart sensors for real-time venue monitoring and optimization",
    },
    {
      name: "Voice AI Assistant",
      category: "AI/ML",
      status: "development",
      progress: 40,
      description: "Natural language event planning and management assistant",
    },
    {
      name: "Holographic Presentations",
      category: "Mixed Reality",
      status: "research",
      progress: 25,
      description: "3D holographic speakers for remote event participation",
    },
    {
      name: "Neural Interface Control",
      category: "BCI",
      status: "concept",
      progress: 10,
      description:
        "Brain-computer interface for accessibility and enhanced interaction",
    },
  ]);

  const [technologies] = useState([
    { name: "AR/VR", adoption: 78, trending: "+15%" },
    { name: "Blockchain", adoption: 45, trending: "+28%" },
    { name: "IoT", adoption: 62, trending: "+12%" },
    { name: "AI/ML", adoption: 89, trending: "+22%" },
    { name: "5G/Edge", adoption: 34, trending: "+35%" },
    { name: "Quantum", adoption: 5, trending: "+8%" },
  ]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Innovation Lab</h1>
          <p className="mt-2 text-gray-600">
            Future technologies and experimental features
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
          <Rocket className="mr-2 h-4 w-4" />
          Submit Innovation Proposal
        </Button>
      </div>

      {/* Innovation Portfolio */}
      <div className="grid gap-6">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="overflow-hidden"
          >
            <CardContent className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <Badge
                      variant={
                        project.status === "production"
                          ? "default"
                          : project.status === "beta"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {project.status}
                    </Badge>
                    <Badge variant="outline">{project.category}</Badge>
                  </div>
                  <p className="mb-3 text-gray-600">{project.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="text-gray-500">Progress:</span>
                      <span className="ml-1 font-medium">
                        {project.progress}%
                      </span>
                    </div>
                    <Progress
                      value={project.progress}
                      className="h-2 w-32"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    View Details
                  </Button>
                  {project.status === "beta" && (
                    <Button size="sm">Try Beta</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Technology Adoption Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Technology Adoption Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="rounded-lg bg-gray-50 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-medium">{tech.name}</h4>
                  <Badge
                    variant="outline"
                    className="border-green-600 text-green-600"
                  >
                    {tech.trending}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Progress
                    value={tech.adoption}
                    className="h-2 flex-1"
                  />
                  <span className="text-sm text-gray-600">
                    {tech.adoption}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Innovation Partnerships */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              Research Partnerships
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3">
                <div>
                  <div className="font-medium">MIT Media Lab</div>
                  <div className="text-sm text-gray-600">AR/VR Research</div>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
                <div>
                  <div className="font-medium">Stanford AI Lab</div>
                  <div className="text-sm text-gray-600">ML & NLP</div>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-purple-50 p-3">
                <div>
                  <div className="font-medium">Oxford Internet Institute</div>
                  <div className="text-sm text-gray-600">Digital Society</div>
                </div>
                <Badge variant="outline">Planning</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-indigo-600" />
              Innovation Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Patents Filed</span>
                <span className="font-medium">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Prototypes</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Research Papers</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Innovation Budget</span>
                <span className="font-medium">$2.4M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Beta Users</span>
                <span className="font-medium">15,847</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InnovationLabModule;
