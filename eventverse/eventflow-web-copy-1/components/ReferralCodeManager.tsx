"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Copy, Plus, Users } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export interface ReferralCode {
  id: string;
  code: string;
  influencerName: string;
  influencerEmail: string;
  commissionType: "percentage" | "fixed";
  commissionRate: number;
  totalClicks: number;
  totalSales: number;
  totalRevenue: number;
  totalCommission: number;
  commissionOwed: number;
  commissionPaid: number;
  isActive: boolean;
  createdDate: Date;
  lastUsed?: Date;
  notes: string;
  paymentStatus: "pending" | "processing" | "paid";
  influencer?: string;
}

interface ReferralCodeManagerProps {
  referralCodes: ReferralCode[];
  onReferralCodesChange: (codes: ReferralCode[]) => void;
}

const ReferralCodeManager = ({
  referralCodes,
  onReferralCodesChange,
}: ReferralCodeManagerProps) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingCode, setEditingCode] = useState<ReferralCode | null>(null);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      influencerName: "",
      influencerEmail: "",
      commissionType: "percentage",
      commissionRate: "",
      notes: "",
    },
  });

  const generateReferralCode = (name: string) => {
    const cleanName = name.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const randomSuffix = Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase();
    return `${cleanName.substring(0, 4)}${randomSuffix}`;
  };

  //
  // interface ReferralCodeFormValues {
  //   code: string;
  //   influencerName: string;
  //   influencerEmail: string;
  //   commissionType: "percentage" | "fixed";
  //   commissionRate: string; // string in form, convert -> number
  //   notes: string;
  //   isActive: boolean;
  //   paymentStatus: "pending" | "processing" | "paid";
  // }

  interface ReferralCodeFormValues {
    influencerName: string;
    influencerEmail: string;
    commissionType: string;
    commissionRate: string; // string in form, convert -> number
    notes: string;

    // system/defaulted values
    code?: string;
    isActive?: boolean;
    paymentStatus?: "pending" | "processing" | "paid";
  }

  const handleCreateReferralCode: SubmitHandler<ReferralCodeFormValues> = (
    data,
  ) => {
    // const handleCreateReferralCode = (data: Partial<ReferralCode>) => {
    const referralCode = generateReferralCode(data?.influencerName ?? "");

    const newReferralCode: ReferralCode = {
      id: `REF${referralCodes.length + 1}`.padStart(8, "0"),
      code: referralCode,
      influencerName: data?.influencerName ?? "",
      influencerEmail: data?.influencerEmail ?? "",
      commissionType: data?.commissionType as ReferralCode["commissionType"],
      commissionRate: parseFloat(String(data.commissionRate)),
      totalClicks: 0,
      totalSales: 0,
      totalRevenue: 0,
      totalCommission: 0,
      commissionOwed: 0,
      commissionPaid: 0,
      isActive: true,
      createdDate: new Date(),
      notes: data?.notes ?? "",
      paymentStatus: "pending",
      influencer: "",
    };

    onReferralCodesChange([...referralCodes, newReferralCode]);
    setShowCreateDialog(false);
    form.reset();

    toast({
      title: "Referral Code Created!",
      description: `${referralCode} has been created for ${data.influencerName}.`,
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: "Referral code copied to clipboard",
    });
  };

  const handleCopyLink = (code: string) => {
    const link = `${window.location.origin}/tickets?ref=${code}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Referral Link Copied",
      description: "Referral link copied to clipboard",
    });
  };

  const handleMarkAsPaid = (codeId: string) => {
    const updatedCodes = referralCodes.map((code) => {
      if (code.id === codeId) {
        return {
          ...code,
          commissionPaid: code.commissionPaid + code.commissionOwed,
          commissionOwed: 0,
          paymentStatus: "paid" as const,
        };
      }
      return code;
    });
    onReferralCodesChange(updatedCodes);

    const code = referralCodes.find((c) => c.id === codeId);
    toast({
      title: "Commission Marked as Paid",
      description: `Payment recorded for ${code?.influencerName}.`,
    });
  };

  const handleToggleStatus = (codeId: string) => {
    const updatedCodes = referralCodes.map((code) =>
      code.id === codeId ? { ...code, isActive: !code.isActive } : code,
    );
    onReferralCodesChange(updatedCodes);

    const code = referralCodes.find((c) => c.id === codeId);
    toast({
      title: code?.isActive ? "Code Deactivated" : "Code Activated",
      description: `${code?.code} has been ${code?.isActive ? "deactivated" : "activated"}.`,
    });
  };

  const getCommissionDisplay = (code: ReferralCode) => {
    return code.commissionType === "percentage"
      ? `${code.commissionRate}% commission`
      : `$${code.commissionRate} per sale`;
  };

  const getConversionRate = (code: ReferralCode) => {
    return code.totalClicks > 0
      ? ((code.totalSales / code.totalClicks) * 100).toFixed(1)
      : "0";
  };

  const getTotalCommissionOwed = () => {
    return referralCodes.reduce(
      (total, code) => total + code.commissionOwed,
      0,
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Referral Codes</h2>
          <p className="text-purple-100">
            Manage influencer partnerships and track commissions
          </p>
        </div>
        <div className="flex gap-2">
          <div className="text-right">
            <p className="text-sm text-purple-100">Total Commission Owed</p>
            <p className="text-lg font-bold text-yellow-400">
              ${getTotalCommissionOwed().toFixed(2)}
            </p>
          </div>
          <Dialog
            open={showCreateDialog}
            onOpenChange={setShowCreateDialog}
          >
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Influencer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Influencer Partner</DialogTitle>
                <DialogDescription>
                  Create a referral code for an influencer or partner
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleCreateReferralCode)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="influencerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Influencer Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Sarah Johnson"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="influencerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="sarah@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="commissionType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Commission Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="percentage">
                                Percentage of Sale
                              </SelectItem>
                              <SelectItem value="fixed">
                                Fixed Amount per Sale
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="commissionRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Commission Rate</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="e.g. 10 for 10% or $10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Partnership details, special terms, etc..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2 pt-4">
                    <Button
                      type="submit"
                      className="flex-1"
                    >
                      Create Referral Code
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowCreateDialog(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Referral Codes List */}
      <div className="space-y-4">
        {referralCodes.map((code) => (
          <Card
            key={code.id}
            className="bg-white/95 backdrop-blur-sm"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5" />
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {code.influencerName}
                      <Badge
                        className={
                          code.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {code.isActive ? "Active" : "Inactive"}
                      </Badge>
                      {code.commissionOwed > 0 && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Payment Due
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{code.influencerEmail}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyCode(code.code)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Code
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyLink(code.code)}
                  >
                    Copy Link
                  </Button>
                  {code.commissionOwed > 0 && (
                    <Button
                      size="sm"
                      onClick={() => handleMarkAsPaid(code.id)}
                    >
                      Mark as Paid
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant={code.isActive ? "destructive" : "default"}
                    onClick={() => handleToggleStatus(code.id)}
                  >
                    {code.isActive ? "Deactivate" : "Activate"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                <div>
                  <p className="text-sm text-gray-600">Referral Code</p>
                  <p className="font-mono text-lg font-bold">{code.code}</p>
                  <p className="text-sm text-gray-500">
                    {getCommissionDisplay(code)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Performance</p>
                  <p className="font-medium">{code.totalClicks} clicks</p>
                  <p className="text-sm text-gray-500">
                    {code.totalSales} sales ({getConversionRate(code)}%)
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Revenue Generated</p>
                  <p className="font-medium text-green-600">
                    ${code.totalRevenue.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">Total sales</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Commission</p>
                  <p className="font-medium">
                    ${code.totalCommission.toFixed(2)} total
                  </p>
                  <p className="text-sm text-gray-500">
                    ${code.commissionPaid.toFixed(2)} paid
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount Owed</p>
                  <p className="font-bold text-yellow-600">
                    ${code.commissionOwed.toFixed(2)}
                  </p>
                  <Badge
                    variant={
                      code.paymentStatus === "paid" ? "default" : "secondary"
                    }
                  >
                    {code.paymentStatus}
                  </Badge>
                </div>
              </div>
              {code.notes && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <p className="text-sm text-gray-600">Notes</p>
                    <p className="text-sm">{code.notes}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {referralCodes.length === 0 && (
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="py-8 text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No referral partners yet
            </h3>
            <p className="mb-4 text-gray-600">
              Add influencers and partners to grow your event reach with
              commission-based referrals.
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add First Partner
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReferralCodeManager;
