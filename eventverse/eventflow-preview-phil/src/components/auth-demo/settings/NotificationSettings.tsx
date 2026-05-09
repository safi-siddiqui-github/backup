
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Bell, Mail, Smartphone, Globe } from "lucide-react";

export const NotificationSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const [settings, setSettings] = useState({
    emailNotifications: {
      eventUpdates: true,
      teamInvites: true,
      securityAlerts: true,
      billing: true,
      marketing: false
    },
    pushNotifications: {
      eventReminders: true,
      teamActivity: false,
      systemAlerts: true
    },
    frequency: 'immediate',
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    },
    webhook: {
      enabled: false,
      url: ''
    }
  });

  const handleSave = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Notification Settings</h2>
        <p className="text-gray-600">Configure how and when you receive notifications.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Event Updates</Label>
              <p className="text-sm text-gray-600">Changes to events and schedules</p>
            </div>
            <Switch 
              checked={settings.emailNotifications.eventUpdates}
              onCheckedChange={(checked) => setSettings(prev => ({
                ...prev,
                emailNotifications: { ...prev.emailNotifications, eventUpdates: checked }
              }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Team Invitations</Label>
              <p className="text-sm text-gray-600">New team member invites and responses</p>
            </div>
            <Switch 
              checked={settings.emailNotifications.teamInvites}
              onCheckedChange={(checked) => setSettings(prev => ({
                ...prev,
                emailNotifications: { ...prev.emailNotifications, teamInvites: checked }
              }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Security Alerts</Label>
              <p className="text-sm text-gray-600">Login attempts and security events</p>
            </div>
            <Switch 
              checked={settings.emailNotifications.securityAlerts}
              onCheckedChange={(checked) => setSettings(prev => ({
                ...prev,
                emailNotifications: { ...prev.emailNotifications, securityAlerts: checked }
              }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Billing & Payments</Label>
              <p className="text-sm text-gray-600">Invoice and payment notifications</p>
            </div>
            <Switch 
              checked={settings.emailNotifications.billing}
              onCheckedChange={(checked) => setSettings(prev => ({
                ...prev,
                emailNotifications: { ...prev.emailNotifications, billing: checked }
              }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Marketing & Updates</Label>
              <p className="text-sm text-gray-600">Product updates and promotional content</p>
            </div>
            <Switch 
              checked={settings.emailNotifications.marketing}
              onCheckedChange={(checked) => setSettings(prev => ({
                ...prev,
                emailNotifications: { ...prev.emailNotifications, marketing: checked }
              }))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Push Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Event Reminders</Label>
              <p className="text-sm text-gray-600">Upcoming event notifications</p>
            </div>
            <Switch 
              checked={settings.pushNotifications.eventReminders}
              onCheckedChange={(checked) => setSettings(prev => ({
                ...prev,
                pushNotifications: { ...prev.pushNotifications, eventReminders: checked }
              }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Team Activity</Label>
              <p className="text-sm text-gray-600">Team member actions and updates</p>
            </div>
            <Switch 
              checked={settings.pushNotifications.teamActivity}
              onCheckedChange={(checked) => setSettings(prev => ({
                ...prev,
                pushNotifications: { ...prev.pushNotifications, teamActivity: checked }
              }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">System Alerts</Label>
              <p className="text-sm text-gray-600">Important system notifications</p>
            </div>
            <Switch 
              checked={settings.pushNotifications.systemAlerts}
              onCheckedChange={(checked) => setSettings(prev => ({
                ...prev,
                pushNotifications: { ...prev.pushNotifications, systemAlerts: checked }
              }))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="frequency">Notification Frequency</Label>
            <Select value={settings.frequency} onValueChange={(value) => 
              setSettings(prev => ({ ...prev, frequency: value }))
            }>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="hourly">Hourly Digest</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
                <SelectItem value="weekly">Weekly Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Quiet Hours</Label>
                <p className="text-sm text-gray-600">Disable notifications during specified hours</p>
              </div>
              <Switch 
                checked={settings.quietHours.enabled}
                onCheckedChange={(checked) => setSettings(prev => ({
                  ...prev,
                  quietHours: { ...prev.quietHours, enabled: checked }
                }))}
              />
            </div>

            {settings.quietHours.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quiet-start">Start Time</Label>
                  <Input
                    id="quiet-start"
                    type="time"
                    value={settings.quietHours.start}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      quietHours: { ...prev.quietHours, start: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="quiet-end">End Time</Label>
                  <Input
                    id="quiet-end"
                    type="time"
                    value={settings.quietHours.end}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      quietHours: { ...prev.quietHours, end: e.target.value }
                    }))}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Webhook Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Enable Webhooks</Label>
              <p className="text-sm text-gray-600">Send notifications to external services</p>
            </div>
            <Switch 
              checked={settings.webhook.enabled}
              onCheckedChange={(checked) => setSettings(prev => ({
                ...prev,
                webhook: { ...prev.webhook, enabled: checked }
              }))}
            />
          </div>

          {settings.webhook.enabled && (
            <div>
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                value={settings.webhook.url}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  webhook: { ...prev.webhook, url: e.target.value }
                }))}
                placeholder="https://your-app.com/webhook"
                className="mt-2"
              />
              <p className="text-sm text-gray-600 mt-1">
                Events will be sent as POST requests to this URL
              </p>
            </div>
          )}
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
