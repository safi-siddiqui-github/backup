
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Globe2, Server, Zap, Shield, DollarSign, Languages } from "lucide-react";

const GlobalInfrastructureModule = () => {
  const [regions] = useState([
    { name: "North America", status: "active", events: 45231, load: 78 },
    { name: "Europe", status: "active", events: 38749, load: 82 },
    { name: "Asia Pacific", status: "active", events: 52847, load: 71 },
    { name: "Latin America", status: "deploying", events: 12459, load: 45 },
    { name: "Middle East", status: "planned", events: 8923, load: 23 },
    { name: "Africa", status: "planned", events: 6741, load: 15 }
  ]);

  const [languages] = useState([
    "English", "Spanish", "French", "German", "Chinese", "Japanese", 
    "Korean", "Portuguese", "Arabic", "Hindi", "Russian", "Italian"
  ]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Global Infrastructure</h1>
          <p className="text-gray-600 mt-2">Worldwide deployment and localization platform</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Server className="w-4 h-4 mr-2" />
          Deploy New Region
        </Button>
      </div>

      {/* Global Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Globe2 className="w-6 h-6 text-blue-600" />
              <div>
                <div className="text-xl font-bold">6</div>
                <div className="text-xs text-gray-600">Active Regions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Languages className="w-6 h-6 text-green-600" />
              <div>
                <div className="text-xl font-bold">50+</div>
                <div className="text-xs text-gray-600">Languages</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-600" />
              <div>
                <div className="text-xl font-bold">99.9%</div>
                <div className="text-xs text-gray-600">Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-purple-600" />
              <div>
                <div className="text-xl font-bold">SOC2</div>
                <div className="text-xs text-gray-600">Compliance</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Deployment Status */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Deployment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regions.map((region, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{region.name}</h3>
                    <Badge 
                      variant={region.status === 'active' ? 'default' : 
                              region.status === 'deploying' ? 'secondary' : 'outline'}
                    >
                      {region.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {region.events.toLocaleString()} events • Load: {region.load}%
                  </p>
                  <Progress value={region.load} className="w-48 h-2 mt-2" />
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Localization & Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-blue-600" />
              Localization Engine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {languages.slice(0, 12).map((lang, index) => (
                  <Badge key={index} variant="outline" className="justify-center">
                    {lang}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-sm text-gray-600">Translation Coverage</span>
                <span className="font-medium">94%</span>
              </div>
              <Button variant="outline" className="w-full">
                Manage Translations
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Payment & Currency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium">Supported Currencies</div>
                  <div className="text-gray-600">45+ major currencies</div>
                </div>
                <div>
                  <div className="font-medium">Payment Methods</div>
                  <div className="text-gray-600">Credit cards, digital wallets</div>
                </div>
                <div>
                  <div className="font-medium">Processing Time</div>
                  <div className="text-gray-600">Instant worldwide</div>
                </div>
                <div>
                  <div className="font-medium">Compliance</div>
                  <div className="text-gray-600">PCI DSS Level 1</div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Payment Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GlobalInfrastructureModule;
