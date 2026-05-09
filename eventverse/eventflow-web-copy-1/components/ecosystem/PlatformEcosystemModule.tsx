"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Code,
  DollarSign,
  Download,
  Star,
  Store,
} from "lucide-react";
import { useState } from "react";

const PlatformEcosystemModule = () => {
  const [marketplaceStats] = useState({
    totalApps: 847,
    activePartners: 234,
    monthlyDownloads: 45230,
    revenueShare: 2.8,
    developerSatisfaction: 4.7,
  });

  const [featuredApps] = useState([
    {
      name: "EventFlow CRM",
      developer: "SalesForce Integration",
      category: "Customer Management",
      rating: 4.8,
      downloads: 12450,
      price: "Free",
      icon: "🔗",
    },
    {
      name: "Smart Catering",
      developer: "FoodTech Solutions",
      category: "Catering & Food",
      rating: 4.6,
      downloads: 8920,
      price: "$29/mo",
      icon: "🍽️",
    },
    {
      name: "Live Stream Pro",
      developer: "StreamMax",
      category: "Broadcasting",
      rating: 4.9,
      downloads: 15670,
      price: "$49/mo",
      icon: "📹",
    },
    {
      name: "Security Guard",
      developer: "SafeEvent Inc",
      category: "Security",
      rating: 4.7,
      downloads: 6340,
      price: "$99/mo",
      icon: "🛡️",
    },
  ]);

  const [partnerPrograms] = useState([
    {
      name: "Technology Partner",
      level: "Gold",
      benefits: ["API Access", "Marketing Support", "Revenue Share"],
      partners: 45,
    },
    {
      name: "Solution Provider",
      level: "Silver",
      benefits: ["White Label", "Training", "Support"],
      partners: 78,
    },
    {
      name: "Developer Community",
      level: "Bronze",
      benefits: ["SDK Access", "Documentation", "Forums"],
      partners: 156,
    },
  ]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Platform Ecosystem
          </h1>
          <p className="mt-2 text-gray-600">
            App marketplace and developer partnerships
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Code className="mr-2 h-4 w-4" />
            Developer Portal
          </Button>
          <Button className="bg-gradient-to-r from-green-600 to-blue-600">
            <Store className="mr-2 h-4 w-4" />
            Browse Marketplace
          </Button>
        </div>
      </div>

      {/* Marketplace Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Store className="h-6 w-6 text-blue-600" />
              <div>
                <div className="text-xl font-bold">
                  {marketplaceStats.totalApps}
                </div>
                <div className="text-xs text-gray-600">Apps Available</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-green-600" />
              <div>
                <div className="text-xl font-bold">
                  {marketplaceStats.activePartners}
                </div>
                <div className="text-xs text-gray-600">Active Partners</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Download className="h-6 w-6 text-purple-600" />
              <div>
                <div className="text-xl font-bold">
                  {marketplaceStats.monthlyDownloads.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">Monthly Downloads</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-yellow-600" />
              <div>
                <div className="text-xl font-bold">
                  ${marketplaceStats.revenueShare}M
                </div>
                <div className="text-xs text-gray-600">Revenue Share</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="h-6 w-6 text-orange-600" />
              <div>
                <div className="text-xl font-bold">
                  {marketplaceStats.developerSatisfaction}
                </div>
                <div className="text-xs text-gray-600">Dev Satisfaction</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Apps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5 text-blue-600" />
            Featured Marketplace Apps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featuredApps.map((app, index) => (
              <Card
                key={index}
                className="border-2 transition-colors hover:border-blue-200"
              >
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="mb-2 text-3xl">{app.icon}</div>
                    <h3 className="mb-1 font-semibold">{app.name}</h3>
                    <p className="mb-2 text-sm text-gray-600">
                      {app.developer}
                    </p>
                    <Badge
                      variant="outline"
                      className="mb-3"
                    >
                      {app.category}
                    </Badge>
                    <div className="mb-2 flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span className="text-sm font-medium">{app.rating}</span>
                      <span className="text-xs text-gray-500">
                        ({app.downloads.toLocaleString()})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{app.price}</span>
                      <Button size="sm">Install</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Partner Programs */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {partnerPrograms.map((program, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{program.name}</span>
                <Badge
                  variant={
                    program.level === "Gold"
                      ? "default"
                      : program.level === "Silver"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {program.level}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-medium">Benefits:</h4>
                  <ul className="space-y-1">
                    {program.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t pt-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Active Partners
                    </span>
                    <span className="font-medium">{program.partners}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Join Program
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Developer Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-green-600" />
            Developer Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-blue-50 p-6 text-center">
              <Code className="mx-auto mb-4 h-12 w-12 text-blue-600" />
              <h3 className="mb-2 text-lg font-medium">API Documentation</h3>
              <p className="mb-4 text-gray-600">
                Comprehensive guides and references
              </p>
              <Button variant="outline">View Docs</Button>
            </div>
            <div className="rounded-lg bg-green-50 p-6 text-center">
              <Building2 className="mx-auto mb-4 h-12 w-12 text-green-600" />
              <h3 className="mb-2 text-lg font-medium">SDK & Tools</h3>
              <p className="mb-4 text-gray-600">
                Development kits for all platforms
              </p>
              <Button variant="outline">Download SDK</Button>
            </div>
            <div className="rounded-lg bg-purple-50 p-6 text-center">
              <Star className="mx-auto mb-4 h-12 w-12 text-purple-600" />
              <h3 className="mb-2 text-lg font-medium">Community</h3>
              <p className="mb-4 text-gray-600">
                Connect with other developers
              </p>
              <Button variant="outline">Join Forum</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformEcosystemModule;
