
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Shield } from "lucide-react";
import { useStandaloneAuth } from "../StandaloneAuthProvider";

export const TeamSettings = () => {
  const { organization } = useStandaloneAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const [settings, setSettings] = useState({
    allowInvites: organization?.settings.allowInvites ?? true,
    defaultRole: organization?.settings.defaultRole || "viewer" as "checkin" | "viewer",
    maxMembers: organization?.settings.maxMembers || 50,
    requireApproval: false,
    allowGuestInvites: true,
    sessionTimeout: 24
  });

  const handleSave = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const roleDescriptions = {
    admin: "Full access to all features and user management",
    viewer: "Read-only access to events and analytics", 
    checkin: "Can scan tickets and manage guest check-ins"
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Team Settings</h2>
        <p className="text-gray-600">Configure how your team works together and manages access.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{organization?.members.length || 0}</div>
              <div className="text-sm text-blue-800">Current Members</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{settings.maxMembers - (organization?.members.length || 0)}</div>
              <div className="text-sm text-green-800">Available Slots</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-purple-800">Pending Invites</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Invitation Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Allow Team Invitations</Label>
              <p className="text-sm text-gray-600">Enable team members to invite new users</p>
            </div>
            <Switch 
              checked={settings.allowInvites}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, allowInvites: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Require Admin Approval</Label>
              <p className="text-sm text-gray-600">New invitations need admin approval</p>
            </div>
            <Switch 
              checked={settings.requireApproval}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, requireApproval: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Allow Guest Invitations</Label>
              <p className="text-sm text-gray-600">Enable external guest invitations</p>
            </div>
            <Switch 
              checked={settings.allowGuestInvites}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, allowGuestInvites: checked }))}
            />
          </div>

          <div>
            <Label htmlFor="default-role">Default Role for New Members</Label>
            <Select value={settings.defaultRole} onValueChange={(value) => 
              setSettings(prev => ({ ...prev, defaultRole: value as "checkin" | "viewer" }))
            }>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viewer">Viewer</SelectItem>
                <SelectItem value="checkin">Check-in</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-600 mt-1">
              {roleDescriptions[settings.defaultRole as keyof typeof roleDescriptions]}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Role Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(roleDescriptions).map(([role, description]) => (
              <div key={role} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant={role === 'admin' ? 'default' : 'secondary'}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
