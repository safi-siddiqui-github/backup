"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Globe } from "lucide-react";
import { useState } from "react";
import { useStandaloneAuth } from "../StandaloneAuthProvider";

export const GeneralSettings = () => {
  const { organization } = useStandaloneAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [settings, setSettings] = useState({
    name: organization?.name || "",
    type: organization?.type || ("business" as "business" | "enterprise"),
    description: "Leading event management company",
    website: "https://example.com",
    address: "123 Business St, City, State 12345",
    phone: "+1 (555) 123-4567",
    timezone: "America/New_York",
    currency: "USD",
  });

  const handleSave = async () => {
    setIsLoading(true);
    // Mock save operation
    setTimeout(() => {
      setIsLoading(false);
      // In real app, this would update the organization
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-xl font-semibold">General Settings</h2>
        <p className="text-gray-600">
          Manage your organization&apos;s basic information and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Organization Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="org-name">Organization Name</Label>
              <Input
                id="org-name"
                value={settings.name}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div>
              <Label htmlFor="org-type">Organization Type</Label>
              <Select
                value={settings.type}
                onValueChange={(value) =>
                  setSettings((prev) => ({
                    ...prev,
                    type: value as "business" | "enterprise",
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={settings.description}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Brief description of your organization"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={settings.website}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, website: e.target.value }))
              }
              placeholder="https://yourcompany.com"
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={settings.address}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, address: e.target.value }))
              }
              placeholder="Street address, city, state, zip"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={settings.phone}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, phone: e.target.value }))
              }
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Regional Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={settings.timezone}
                onValueChange={(value) =>
                  setSettings((prev) => ({ ...prev, timezone: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">
                    Pacific Time
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={settings.currency}
                onValueChange={(value) =>
                  setSettings((prev) => ({ ...prev, currency: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
