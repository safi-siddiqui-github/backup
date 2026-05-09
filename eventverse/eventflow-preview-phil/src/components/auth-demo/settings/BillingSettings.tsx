
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { CreditCard, Receipt, TrendingUp, Calendar } from "lucide-react";

export const BillingSettings = () => {
  const [currentPlan] = useState({
    name: "Business Pro",
    price: 99,
    period: "month",
    features: ["Up to 50 team members", "Unlimited events", "Advanced analytics", "Priority support"],
    usage: {
      members: { current: 12, limit: 50 },
      events: { current: 28, limit: -1 },
      storage: { current: 2.3, limit: 100 }
    }
  });

  const billingHistory = [
    { date: "2024-01-01", amount: 99, status: "paid", invoice: "INV-001" },
    { date: "2023-12-01", amount: 99, status: "paid", invoice: "INV-002" },
    { date: "2023-11-01", amount: 99, status: "paid", invoice: "INV-003" },
    { date: "2023-10-01", amount: 79, status: "paid", invoice: "INV-004" }
  ];

  const plans = [
    { 
      name: "Starter", 
      price: 29, 
      members: 10, 
      features: ["Basic analytics", "Email support"] 
    },
    { 
      name: "Business Pro", 
      price: 99, 
      members: 50, 
      features: ["Advanced analytics", "Priority support"], 
      current: true 
    },
    { 
      name: "Enterprise", 
      price: 299, 
      members: -1, 
      features: ["Custom integrations", "Dedicated support"] 
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Billing & Subscription</h2>
        <p className="text-gray-600">Manage your subscription, usage, and billing information.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
              <p className="text-gray-600">
                ${currentPlan.price}/{currentPlan.period}
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <div className="space-y-2 mb-4">
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline">Change Plan</Button>
            <Button variant="outline">Cancel Subscription</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Usage Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-sm font-medium">Team Members</Label>
              <span className="text-sm text-gray-600">
                {currentPlan.usage.members.current} / {currentPlan.usage.members.limit}
              </span>
            </div>
            <Progress value={(currentPlan.usage.members.current / currentPlan.usage.members.limit) * 100} />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-sm font-medium">Events This Month</Label>
              <span className="text-sm text-gray-600">
                {currentPlan.usage.events.current} / Unlimited
              </span>
            </div>
            <Progress value={15} />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-sm font-medium">Storage Used</Label>
              <span className="text-sm text-gray-600">
                {currentPlan.usage.storage.current} GB / {currentPlan.usage.storage.limit} GB
              </span>
            </div>
            <Progress value={(currentPlan.usage.storage.current / currentPlan.usage.storage.limit) * 100} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div key={plan.name} className={`border rounded-lg p-4 ${
                plan.current ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{plan.name}</h3>
                  {plan.current && <Badge>Current</Badge>}
                </div>
                <div className="text-2xl font-bold mb-2">${plan.price}</div>
                <div className="text-sm text-gray-600 mb-3">
                  {plan.members === -1 ? 'Unlimited' : `Up to ${plan.members}`} members
                </div>
                <div className="space-y-1 mb-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="text-sm text-gray-600">• {feature}</div>
                  ))}
                </div>
                {!plan.current && (
                  <Button variant="outline" className="w-full">
                    {plan.price > currentPlan.price ? 'Upgrade' : 'Downgrade'}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Billing History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {billingHistory.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-medium">{new Date(item.date).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-600">{item.invoice}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium">${item.amount}</span>
                  <Badge variant={item.status === 'paid' ? 'default' : 'destructive'}>
                    {item.status}
                  </Badge>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
