"use client";

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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  CreditCard,
  FileText,
  Globe,
  Mail,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { useState } from "react";

interface TicketingSettingsProps {
  eventId: string;
}

const TicketingSettings = ({ eventId }: TicketingSettingsProps) => {
  const [settings, setSettings] = useState({
    // General Settings
    ticketingEnabled: true,
    salesOpen: true,
    refundsEnabled: true,
    transfersEnabled: true,
    maxTicketsPerOrder: 10,

    // Payment Settings
    currency: "USD",
    taxRate: 0,
    processingFeeRate: 3.0,
    acceptCreditCards: true,
    acceptPaypal: false,
    acceptBankTransfer: false,

    // Email Settings
    sendConfirmationEmails: true,
    sendReminderEmails: true,
    reminderDaysBeforeEvent: 1,
    customEmailTemplate: "",

    // Branding
    logoUrl: "",
    primaryColor: "#3B82F6",
    customFooterText: "",

    // Access Control
    requirePhoneNumber: false,
    requireAddress: false,
    allowGuestCheckout: true,

    // Terms & Policies
    termsAndConditions: "",
    refundPolicy: "",
    privacyPolicy: "",
  });

  const { toast } = useToast();

  const handleSaveSettings = () => {
    // Save settings logic would go here
    toast({
      title: "Settings Saved",
      description: "Your ticketing settings have been updated successfully.",
    });
  };

  const handleSettingChange = (key: string, value: unknown) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Ticketing Settings</h2>
          <p className="text-purple-100">
            Configure your event ticketing preferences
          </p>
        </div>
        <Button
          onClick={handleSaveSettings}
          className="bg-gradient-to-r from-purple-600 to-blue-600"
        >
          Save All Settings
        </Button>
      </div>

      <Tabs
        defaultValue="general"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger
            value="general"
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            className="flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Payment
          </TabsTrigger>
          <TabsTrigger
            value="email"
            className="flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger
            value="branding"
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            Branding
          </TabsTrigger>
          <TabsTrigger
            value="access"
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Access
          </TabsTrigger>
          <TabsTrigger
            value="policies"
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Policies
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent
          value="general"
          className="mt-6"
        >
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>General Ticketing Settings</CardTitle>
              <CardDescription>
                Configure basic ticketing functionality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ticketingEnabled">Enable Ticketing</Label>
                    <Switch
                      id="ticketingEnabled"
                      checked={settings.ticketingEnabled}
                      onCheckedChange={(value) =>
                        handleSettingChange("ticketingEnabled", value)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="salesOpen">Sales Open</Label>
                    <Switch
                      id="salesOpen"
                      checked={settings.salesOpen}
                      onCheckedChange={(value) =>
                        handleSettingChange("salesOpen", value)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="refundsEnabled">Allow Refunds</Label>
                    <Switch
                      id="refundsEnabled"
                      checked={settings.refundsEnabled}
                      onCheckedChange={(value) =>
                        handleSettingChange("refundsEnabled", value)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="transfersEnabled">Allow Transfers</Label>
                    <Switch
                      id="transfersEnabled"
                      checked={settings.transfersEnabled}
                      onCheckedChange={(value) =>
                        handleSettingChange("transfersEnabled", value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="maxTicketsPerOrder">
                      Max Tickets per Order
                    </Label>
                    <Input
                      id="maxTicketsPerOrder"
                      type="number"
                      value={settings.maxTicketsPerOrder}
                      onChange={(e) =>
                        handleSettingChange(
                          "maxTicketsPerOrder",
                          parseInt(e.target.value),
                        )
                      }
                      min="1"
                      max="50"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent
          value="payment"
          className="mt-6"
        >
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Payment Configuration</CardTitle>
              <CardDescription>Set up payment methods and fees</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={settings.currency}
                      onValueChange={(value) =>
                        handleSettingChange("currency", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CAD">
                          CAD - Canadian Dollar
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={settings.taxRate}
                      onChange={(e) =>
                        handleSettingChange(
                          "taxRate",
                          parseFloat(e.target.value),
                        )
                      }
                      step="0.1"
                      min="0"
                      max="50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="processingFeeRate">
                      Processing Fee Rate (%)
                    </Label>
                    <Input
                      id="processingFeeRate"
                      type="number"
                      value={settings.processingFeeRate}
                      onChange={(e) =>
                        handleSettingChange(
                          "processingFeeRate",
                          parseFloat(e.target.value),
                        )
                      }
                      step="0.1"
                      min="0"
                      max="10"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Payment Methods</h4>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="acceptCreditCards">
                      Credit/Debit Cards
                    </Label>
                    <Switch
                      id="acceptCreditCards"
                      checked={settings.acceptCreditCards}
                      onCheckedChange={(value) =>
                        handleSettingChange("acceptCreditCards", value)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="acceptPaypal">PayPal</Label>
                    <Switch
                      id="acceptPaypal"
                      checked={settings.acceptPaypal}
                      onCheckedChange={(value) =>
                        handleSettingChange("acceptPaypal", value)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="acceptBankTransfer">Bank Transfer</Label>
                    <Switch
                      id="acceptBankTransfer"
                      checked={settings.acceptBankTransfer}
                      onCheckedChange={(value) =>
                        handleSettingChange("acceptBankTransfer", value)
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent
          value="email"
          className="mt-6"
        >
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Configure automated email communications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sendConfirmationEmails">
                      Send Confirmation Emails
                    </Label>
                    <Switch
                      id="sendConfirmationEmails"
                      checked={settings.sendConfirmationEmails}
                      onCheckedChange={(value) =>
                        handleSettingChange("sendConfirmationEmails", value)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="sendReminderEmails">
                      Send Reminder Emails
                    </Label>
                    <Switch
                      id="sendReminderEmails"
                      checked={settings.sendReminderEmails}
                      onCheckedChange={(value) =>
                        handleSettingChange("sendReminderEmails", value)
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="reminderDaysBeforeEvent">
                      Reminder Days Before Event
                    </Label>
                    <Input
                      id="reminderDaysBeforeEvent"
                      type="number"
                      value={settings.reminderDaysBeforeEvent}
                      onChange={(e) =>
                        handleSettingChange(
                          "reminderDaysBeforeEvent",
                          parseInt(e.target.value),
                        )
                      }
                      min="1"
                      max="30"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customEmailTemplate">
                      Custom Email Template
                    </Label>
                    <Textarea
                      id="customEmailTemplate"
                      value={settings.customEmailTemplate}
                      onChange={(e) =>
                        handleSettingChange(
                          "customEmailTemplate",
                          e.target.value,
                        )
                      }
                      placeholder="Custom message to include in confirmation emails..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Settings */}
        <TabsContent
          value="branding"
          className="mt-6"
        >
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Branding & Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of your ticketing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <Input
                      id="logoUrl"
                      value={settings.logoUrl}
                      onChange={(e) =>
                        handleSettingChange("logoUrl", e.target.value)
                      }
                      placeholder="https://example.com/logo.png"
                    />
                  </div>

                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) =>
                          handleSettingChange("primaryColor", e.target.value)
                        }
                        className="h-10 w-16"
                      />
                      <Input
                        value={settings.primaryColor}
                        onChange={(e) =>
                          handleSettingChange("primaryColor", e.target.value)
                        }
                        placeholder="#3B82F6"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customFooterText">Custom Footer Text</Label>
                    <Textarea
                      id="customFooterText"
                      value={settings.customFooterText}
                      onChange={(e) =>
                        handleSettingChange("customFooterText", e.target.value)
                      }
                      placeholder="Add custom text to appear at the bottom of tickets..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Control */}
        <TabsContent
          value="access"
          className="mt-6"
        >
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>
                Configure customer requirements and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requirePhoneNumber">
                      Require Phone Number
                    </Label>
                    <p className="text-sm text-gray-600">
                      Customers must provide phone number during checkout
                    </p>
                  </div>
                  <Switch
                    id="requirePhoneNumber"
                    checked={settings.requirePhoneNumber}
                    onCheckedChange={(value) =>
                      handleSettingChange("requirePhoneNumber", value)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requireAddress">Require Address</Label>
                    <p className="text-sm text-gray-600">
                      Customers must provide billing address
                    </p>
                  </div>
                  <Switch
                    id="requireAddress"
                    checked={settings.requireAddress}
                    onCheckedChange={(value) =>
                      handleSettingChange("requireAddress", value)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowGuestCheckout">
                      Allow Guest Checkout
                    </Label>
                    <p className="text-sm text-gray-600">
                      Allow purchases without creating an account
                    </p>
                  </div>
                  <Switch
                    id="allowGuestCheckout"
                    checked={settings.allowGuestCheckout}
                    onCheckedChange={(value) =>
                      handleSettingChange("allowGuestCheckout", value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Policies */}
        <TabsContent
          value="policies"
          className="mt-6"
        >
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Terms & Policies
              </CardTitle>
              <CardDescription>
                Set up legal terms and conditions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="termsAndConditions">Terms and Conditions</Label>
                <Textarea
                  id="termsAndConditions"
                  value={settings.termsAndConditions}
                  onChange={(e) =>
                    handleSettingChange("termsAndConditions", e.target.value)
                  }
                  placeholder="Enter your terms and conditions..."
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="refundPolicy">Refund Policy</Label>
                <Textarea
                  id="refundPolicy"
                  value={settings.refundPolicy}
                  onChange={(e) =>
                    handleSettingChange("refundPolicy", e.target.value)
                  }
                  placeholder="Enter your refund policy..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="privacyPolicy">Privacy Policy</Label>
                <Textarea
                  id="privacyPolicy"
                  value={settings.privacyPolicy}
                  onChange={(e) =>
                    handleSettingChange("privacyPolicy", e.target.value)
                  }
                  placeholder="Enter your privacy policy..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TicketingSettings;
