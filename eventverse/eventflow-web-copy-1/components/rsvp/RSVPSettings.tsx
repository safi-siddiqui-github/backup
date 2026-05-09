"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { RSVPSettings as RSVPSettingsType, RegistryLink } from "@/types/rsvp";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Clock,
  Gift,
  Link2,
  Plus,
  Shield,
  Trash2,
} from "lucide-react";
import { useState } from "react";

interface RSVPSettingsProps {
  settings: RSVPSettingsType;
  onUpdate: (settings: RSVPSettingsType) => void;
}

const RSVPSettings = ({ settings, onUpdate }: RSVPSettingsProps) => {
  const [registryLinks, setRegistryLinks] = useState<RegistryLink[]>(
    settings.registryLinks || [],
  );
  const [newRegistry, setNewRegistry] = useState({
    name: "",
    url: "",
    platform: "",
    description: "",
  });

  const handleSettingChange = (
    key: keyof RSVPSettingsType,
    value: string | number | boolean | RegistryLink[] | Date | undefined,
  ) => {
    onUpdate({ ...settings, [key]: value });
  };

  const addRegistryLink = () => {
    if (newRegistry.name && newRegistry.url) {
      const newLink: RegistryLink = {
        id: Date.now().toString(),
        ...newRegistry,
      };
      const updatedLinks = [...registryLinks, newLink];
      setRegistryLinks(updatedLinks);
      handleSettingChange("registryLinks", updatedLinks);
      setNewRegistry({ name: "", url: "", platform: "", description: "" });
    }
  };

  const removeRegistryLink = (id: string) => {
    const updatedLinks = registryLinks.filter((link) => link.id !== id);
    setRegistryLinks(updatedLinks);
    handleSettingChange("registryLinks", updatedLinks);
  };

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="basic"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Settings</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="registry">Registry</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        <TabsContent
          value="basic"
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Response Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>RSVP Deadline</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !settings.deadline && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {settings.deadline
                          ? format(settings.deadline, "PPP")
                          : "Select deadline"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={settings.deadline}
                        onSelect={(date) =>
                          handleSettingChange("deadline", date)
                        }
                        initialFocus
                        className="pointer-events-auto p-3"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Response Options</Label>
                  <Select
                    value={settings.responseOptions}
                    onValueChange={(value) =>
                      handleSettingChange("responseOptions", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes-no">Yes / No</SelectItem>
                      <SelectItem value="yes-no-maybe">
                        Yes / No / Maybe
                      </SelectItem>
                      <SelectItem value="custom">Custom Options</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Capacity Limit (Optional)</Label>
                  <Input
                    type="number"
                    value={settings.capacityLimit || ""}
                    onChange={(e) =>
                      handleSettingChange(
                        "capacityLimit",
                        e.target.value ? parseInt(e.target.value) : undefined,
                      )
                    }
                    placeholder="No limit"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Maximum Plus Ones</Label>
                  <Input
                    type="number"
                    value={settings.maxPlusOnes}
                    onChange={(e) =>
                      handleSettingChange(
                        "maxPlusOnes",
                        parseInt(e.target.value) || 0,
                      )
                    }
                    min="0"
                    max="10"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="plus-ones">Allow Plus Ones</Label>
                  <Switch
                    id="plus-ones"
                    checked={settings.allowPlusOnes}
                    onCheckedChange={(checked) =>
                      handleSettingChange("allowPlusOnes", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="waitlist">Enable Waitlist</Label>
                  <Switch
                    id="waitlist"
                    checked={settings.enableWaitlist}
                    onCheckedChange={(checked) =>
                      handleSettingChange("enableWaitlist", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="dietary">Collect Dietary Information</Label>
                  <Switch
                    id="dietary"
                    checked={settings.collectDietaryInfo}
                    onCheckedChange={(checked) =>
                      handleSettingChange("collectDietaryInfo", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="custom-fields">Enable Custom Fields</Label>
                  <Switch
                    id="custom-fields"
                    checked={settings.enableCustomFields}
                    onCheckedChange={(checked) =>
                      handleSettingChange("enableCustomFields", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="access"
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Access Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="public">Public Registration</Label>
                    <p className="text-sm text-gray-500">
                      Allow anyone with the link to RSVP
                    </p>
                  </div>
                  <Switch
                    id="public"
                    checked={settings.publicRegistration}
                    onCheckedChange={(checked) =>
                      handleSettingChange("publicRegistration", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="approval">Require Approval</Label>
                    <p className="text-sm text-gray-500">
                      Manually approve each RSVP
                    </p>
                  </div>
                  <Switch
                    id="approval"
                    checked={settings.requireApproval}
                    onCheckedChange={(checked) =>
                      handleSettingChange("requireApproval", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reminders">Automatic Reminders</Label>
                    <p className="text-sm text-gray-500">
                      Send reminder emails automatically
                    </p>
                  </div>
                  <Switch
                    id="reminders"
                    checked={settings.autoReminders}
                    onCheckedChange={(checked) =>
                      handleSettingChange("autoReminders", checked)
                    }
                  />
                </div>
              </div>

              {settings.publicRegistration && (
                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="mb-2 font-medium text-blue-800">
                    Shareable Event Page
                  </h4>
                  <p className="mb-3 text-sm text-blue-700">
                    Your event will be accessible via a public link that you can
                    share on social media, email, or anywhere else.
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value="https://eventflow.app/events/demo-event-123"
                      readOnly
                      className="bg-white"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                    >
                      <Link2 className="mr-2 h-4 w-4" />
                      Copy Link
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="registry"
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Gift Registry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Registry Name</Label>
                  <Input
                    value={newRegistry.name}
                    onChange={(e) =>
                      setNewRegistry({ ...newRegistry, name: e.target.value })
                    }
                    placeholder="Wedding Registry"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select
                    value={newRegistry.platform}
                    onValueChange={(value) =>
                      setNewRegistry({ ...newRegistry, platform: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amazon">Amazon</SelectItem>
                      <SelectItem value="target">Target</SelectItem>
                      <SelectItem value="walmart">Walmart</SelectItem>
                      <SelectItem value="bed-bath-beyond">
                        Bed Bath & Beyond
                      </SelectItem>
                      <SelectItem value="williams-sonoma">
                        Williams Sonoma
                      </SelectItem>
                      <SelectItem value="honeymoon-fund">
                        Honeymoon Fund
                      </SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Registry URL</Label>
                <Input
                  value={newRegistry.url}
                  onChange={(e) =>
                    setNewRegistry({ ...newRegistry, url: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label>Description (Optional)</Label>
                <Textarea
                  value={newRegistry.description}
                  onChange={(e) =>
                    setNewRegistry({
                      ...newRegistry,
                      description: e.target.value,
                    })
                  }
                  placeholder="Brief description of the registry"
                  rows={2}
                />
              </div>

              <Button
                onClick={addRegistryLink}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Registry
              </Button>

              {registryLinks.length > 0 && (
                <div className="space-y-2">
                  <Label>Current Registries</Label>
                  <div className="space-y-2">
                    {registryLinks.map((registry) => (
                      <div
                        key={registry.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div>
                          <div className="font-medium">{registry.name}</div>
                          <div className="text-sm text-gray-500">
                            {registry.platform}
                          </div>
                          {registry.description && (
                            <div className="text-xs text-gray-400">
                              {registry.description}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRegistryLink(registry.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="communication"
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Communication Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Invitation Template</Label>
                  <Select defaultValue="default">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default Template</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Reminder Schedule</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">
                        Standard (2 weeks, 1 week, 3 days)
                      </SelectItem>
                      <SelectItem value="frequent">
                        Frequent (2 weeks, 1 week, 3 days, 1 day)
                      </SelectItem>
                      <SelectItem value="minimal">
                        Minimal (1 week, 3 days)
                      </SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Custom Message</Label>
                <Textarea
                  placeholder="Add a personal message to your invitations..."
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Send reminders via text message
                  </p>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RSVPSettings;
