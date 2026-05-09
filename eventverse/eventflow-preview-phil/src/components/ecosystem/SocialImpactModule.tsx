
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Leaf, Users, Globe, Award, Target } from "lucide-react";

const SocialImpactModule = () => {
  const [impactMetrics] = useState({
    carbonOffset: 2847.3,
    accessibilityScore: 94.2,
    diversityIndex: 87.6,
    socialEvents: 15847
  });

  const [sustainabilityGoals] = useState([
    { goal: "Carbon Neutral Events", progress: 78, target: "100% by 2025" },
    { goal: "Zero Waste Initiative", progress: 65, target: "90% reduction" },
    { goal: "Renewable Energy", progress: 82, target: "100% clean energy" },
    { goal: "Local Sourcing", progress: 71, target: "80% local vendors" }
  ]);

  const [accessibilityFeatures] = useState([
    { feature: "Screen Reader Support", coverage: 98 },
    { feature: "Wheelchair Accessibility", coverage: 92 },
    { feature: "Sign Language Interpreters", coverage: 76 },
    { feature: "Sensory Accommodations", coverage: 84 },
    { feature: "Translation Services", coverage: 89 },
    { feature: "Mobility Assistance", coverage: 91 }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Social Impact</h1>
          <p className="text-gray-600 mt-2">Sustainability, accessibility, and positive social change</p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-blue-600">
          <Heart className="w-4 h-4 mr-2" />
          Impact Report
        </Button>
      </div>

      {/* Impact Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Leaf className="w-6 h-6 text-green-600" />
              <div>
                <div className="text-xl font-bold">{impactMetrics.carbonOffset}T</div>
                <div className="text-xs text-gray-600">CO₂ Offset</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-600" />
              <div>
                <div className="text-xl font-bold">{impactMetrics.accessibilityScore}%</div>
                <div className="text-xs text-gray-600">Accessibility Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-purple-600" />
              <div>
                <div className="text-xl font-bold">{impactMetrics.diversityIndex}%</div>
                <div className="text-xs text-gray-600">Diversity Index</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-red-600" />
              <div>
                <div className="text-xl font-bold">{impactMetrics.socialEvents.toLocaleString()}</div>
                <div className="text-xs text-gray-600">Social Events</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sustainability Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            Sustainability Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sustainabilityGoals.map((goal, index) => (
              <div key={index} className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-green-900">{goal.goal}</h4>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {goal.progress}%
                  </Badge>
                </div>
                <Progress value={goal.progress} className="h-3 mb-2" />
                <p className="text-sm text-green-700">Target: {goal.target}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Accessibility Coverage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accessibilityFeatures.map((feature, index) => (
              <div key={index} className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-blue-900">{feature.feature}</h4>
                  <span className="text-sm text-blue-700">{feature.coverage}%</span>
                </div>
                <Progress value={feature.coverage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Impact Programs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Impact Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900">Event Accessibility Fund</h4>
                <p className="text-purple-700 text-sm mt-1">
                  Supporting accessibility improvements for underserved communities
                </p>
                <div className="mt-2">
                  <span className="text-sm text-purple-600">Funded: $2.4M</span>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">Carbon Offset Initiative</h4>
                <p className="text-green-700 text-sm mt-1">
                  Automatic carbon footprint calculation and offset programs
                </p>
                <div className="mt-2">
                  <span className="text-sm text-green-600">Offset: 2,847 tons CO₂</span>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Diversity & Inclusion</h4>
                <p className="text-blue-700 text-sm mt-1">
                  Tools and resources for creating inclusive events
                </p>
                <div className="mt-2">
                  <span className="text-sm text-blue-600">Events: 15,847</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              Impact Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Nonprofit Events Supported</span>
                <span className="font-medium">3,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Community Outreach Programs</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Accessibility Certifications</span>
                <span className="font-medium">892</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Waste Reduction</span>
                <span className="font-medium">67%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Local Vendor Partnerships</span>
                <span className="font-medium">4,523</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Scholarship Recipients</span>
                <span className="font-medium">1,234</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialImpactModule;
