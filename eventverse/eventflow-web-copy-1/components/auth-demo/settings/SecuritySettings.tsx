"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Clock, Eye, Shield } from "lucide-react";
import { useState } from "react";

export const SecuritySettings = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [settings, setSettings] = useState({
    twoFactorRequired: false,
    sessionTimeout: 24,
    passwordExpiry: 90,
    loginNotifications: true,
    auditLogging: true,
    ipRestriction: false,
    dataRetention: 365,
  });

  const auditLogs = [
    {
      action: "User login",
      user: "john@example.com",
      timestamp: "2024-01-15 09:30",
      ip: "192.168.1.100",
      status: "success",
    },
    {
      action: "Role changed",
      user: "admin@example.com",
      timestamp: "2024-01-15 08:15",
      ip: "192.168.1.101",
      status: "success",
    },
    {
      action: "Failed login",
      user: "unknown@example.com",
      timestamp: "2024-01-15 07:45",
      ip: "203.0.113.0",
      status: "failed",
    },
    {
      action: "Organization settings updated",
      user: "admin@example.com",
      timestamp: "2024-01-14 16:20",
      ip: "192.168.1.101",
      status: "success",
    },
  ];

  const handleSave = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-xl font-semibold">Security Settings</h2>
        <p className="text-gray-600">
          Configure security policies and access controls for your organization.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Authentication & Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">
                Require Two-Factor Authentication
              </Label>
              <p className="text-sm text-gray-600">
                Mandatory 2FA for all team members
              </p>
            </div>
            <Switch
              checked={settings.twoFactorRequired}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({ ...prev, twoFactorRequired: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">
                Login Notifications
              </Label>
              <p className="text-sm text-gray-600">
                Email alerts for new login attempts
              </p>
            </div>
            <Switch
              checked={settings.loginNotifications}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({
                  ...prev,
                  loginNotifications: checked,
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">
                IP Address Restrictions
              </Label>
              <p className="text-sm text-gray-600">
                Limit access to specific IP ranges
              </p>
            </div>
            <Switch
              checked={settings.ipRestriction}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({ ...prev, ipRestriction: checked }))
              }
            />
          </div>

          <div>
            <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
            <Select
              value={settings.sessionTimeout.toString()}
              onValueChange={(value) =>
                setSettings((prev) => ({
                  ...prev,
                  sessionTimeout: parseInt(value),
                }))
              }
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 hour</SelectItem>
                <SelectItem value="8">8 hours</SelectItem>
                <SelectItem value="24">24 hours</SelectItem>
                <SelectItem value="168">7 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Data & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Audit Logging</Label>
              <p className="text-sm text-gray-600">
                Track all user actions and system events
              </p>
            </div>
            <Switch
              checked={settings.auditLogging}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({ ...prev, auditLogging: checked }))
              }
            />
          </div>

          <div>
            <Label htmlFor="password-expiry">Password Expiry (days)</Label>
            <Select
              value={settings.passwordExpiry.toString()}
              onValueChange={(value) =>
                setSettings((prev) => ({
                  ...prev,
                  passwordExpiry: parseInt(value),
                }))
              }
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="365">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="data-retention">Data Retention (days)</Label>
            <Select
              value={settings.dataRetention.toString()}
              onValueChange={(value) =>
                setSettings((prev) => ({
                  ...prev,
                  dataRetention: parseInt(value),
                }))
              }
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
                <SelectItem value="1095">3 years</SelectItem>
                <SelectItem value="2555">7 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Recent Security Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditLogs.map((log, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      log.status === "success" ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <div>
                    <div className="font-medium">{log.action}</div>
                    <div className="text-sm text-gray-600">by {log.user}</div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div>{log.timestamp}</div>
                  <div>IP: {log.ip}</div>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            className="mt-4 w-full"
          >
            View Full Audit Log
          </Button>
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
