"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DollarSign, FileText, Settings, Zap } from "lucide-react";
import { useState } from "react";

interface VendorUser {
  id: string;
  businessName: string;
  email: string;
  category: string;
  status: "active" | "pending" | "suspended";
  profileComplete: boolean;
}

interface InvoiceAutomationPanelProps {
  vendor: VendorUser;
}

const InvoiceAutomationPanel = ({ vendor }: InvoiceAutomationPanelProps) => {
  const [automationSettings, setAutomationSettings] = useState({
    autoGenerateInvoices: true,
    sendReminders: true,
    milestoneInvoicing: true,
    latePaymentFees: false,
  });

  const automationRules = [
    {
      id: "1",
      name: "Deposit Invoice",
      trigger: "Contract Signed",
      action: "Generate 50% deposit invoice",
      status: "active",
      lastTriggered: "2 days ago",
    },
    {
      id: "2",
      name: "Milestone Payments",
      trigger: "Milestone Completed",
      action: "Generate progress payment invoice",
      status: "active",
      lastTriggered: "1 week ago",
    },
    {
      id: "3",
      name: "Final Payment",
      trigger: "Project Completion",
      action: "Generate final invoice",
      status: "active",
      lastTriggered: "3 days ago",
    },
    {
      id: "4",
      name: "Payment Reminders",
      trigger: "2 days before due",
      action: "Send reminder email",
      status: "active",
      lastTriggered: "1 day ago",
    },
  ];

  const recentInvoices = [
    {
      id: "INV-001",
      client: "Johnson Wedding",
      amount: 4250,
      status: "paid",
      dueDate: "2024-01-15",
    },
    {
      id: "INV-002",
      client: "Elite Events",
      amount: 1600,
      status: "pending",
      dueDate: "2024-01-20",
    },
    {
      id: "INV-003",
      client: "Birthday Party",
      amount: 900,
      status: "overdue",
      dueDate: "2024-01-10",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-600" />
          Invoice Automation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Automation Settings */}
        <div className="space-y-4">
          <h4 className="font-medium">Automation Settings</h4>
          <div className="space-y-3">
            {Object.entries(automationSettings).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between"
              >
                <Label
                  htmlFor={key}
                  className="text-sm capitalize"
                >
                  {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                </Label>
                <Switch
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) =>
                    setAutomationSettings((prev) => ({
                      ...prev,
                      [key]: checked,
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Automation Rules */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Active Automation Rules</h4>
            <Button
              size="sm"
              variant="outline"
            >
              <Settings className="mr-2 h-4 w-4" />
              Manage Rules
            </Button>
          </div>
          <div className="space-y-2">
            {automationRules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="text-sm font-medium">{rule.name}</p>
                  <p className="text-xs text-gray-600">
                    {rule.trigger} → {rule.action}
                  </p>
                </div>
                <div className="text-right">
                  <Badge
                    variant={rule.status === "active" ? "default" : "secondary"}
                  >
                    {rule.status}
                  </Badge>
                  <p className="mt-1 text-xs text-gray-500">
                    {rule.lastTriggered}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="space-y-4">
          <h4 className="font-medium">Recent Invoices</h4>
          <div className="space-y-2">
            {recentInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="text-sm font-medium">{invoice.id}</p>
                  <p className="text-xs text-gray-600">{invoice.client}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ${invoice.amount.toLocaleString()}
                  </p>
                  <Badge className={getStatusColor(invoice.status)}>
                    {invoice.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
          >
            <FileText className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
          <Button
            variant="outline"
            size="sm"
          >
            <DollarSign className="mr-2 h-4 w-4" />
            Payment Reports
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceAutomationPanel;
