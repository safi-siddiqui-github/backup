"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { VendorProfile } from "@/types/budget";
import { Clock, DollarSign, FileText } from "lucide-react";
import { useState } from "react";
import type { BudgetExpenseItem } from "./ComprehensiveBudgetModule";

interface ProposalRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vendor: VendorProfile | null;
  expenseItem: BudgetExpenseItem | null;
  onSubmit: (requestData: ProposalRequestData) => void;
}

export interface ProposalRequestData {
  vendorId: string;
  expenseItemId: string;
  customRequirements: string;
  budgetRange: {
    min: number;
    max: number;
  };
  timeline: string;
  urgency: "low" | "medium" | "high";
  additionalServices: string[];
  contactPreference: "email" | "phone" | "both";
}

const ProposalRequestDialog = ({
  open,
  onOpenChange,
  vendor,
  expenseItem,
  onSubmit,
}: ProposalRequestDialogProps) => {
  const [formData, setFormData] = useState({
    customRequirements: "",
    budgetMin: "",
    budgetMax: "",
    timeline: "",
    urgency: "medium" as "low" | "medium" | "high",
    additionalServices: [] as string[],
    contactPreference: "email" as "email" | "phone" | "both",
  });

  const handleSubmit = () => {
    if (!vendor || !expenseItem) return;

    const requestData: ProposalRequestData = {
      vendorId: vendor.id,
      expenseItemId: expenseItem.id,
      customRequirements: formData.customRequirements,
      budgetRange: {
        min: parseFloat(formData.budgetMin) || 0,
        max: parseFloat(formData.budgetMax) || expenseItem.allocatedBudget,
      },
      timeline: formData.timeline,
      urgency: formData.urgency,
      additionalServices: formData.additionalServices,
      contactPreference: formData.contactPreference,
    };

    onSubmit(requestData);
    onOpenChange(false);

    // Reset form
    setFormData({
      customRequirements: "",
      budgetMin: "",
      budgetMax: "",
      timeline: "",
      urgency: "medium",
      additionalServices: [],
      contactPreference: "email",
    });
  };

  const toggleAdditionalService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter((s) => s !== service)
        : [...prev.additionalServices, service],
    }));
  };

  if (!vendor || !expenseItem) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Request Proposal from {vendor.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Expense Item Summary */}
          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 font-medium">Expense Item Details</h3>
            <p className="mb-2 text-sm text-gray-600">{expenseItem.title}</p>
            <p className="mb-2 text-sm text-gray-600">
              {expenseItem.description}
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                <DollarSign className="mr-1 h-3 w-3" />
                Budget: ${expenseItem.allocatedBudget.toLocaleString()}
              </Badge>
              <Badge variant="outline">{expenseItem.priority} priority</Badge>
            </div>
          </div>

          {/* Vendor Summary */}
          <div className="rounded-lg bg-blue-50 p-4">
            <h3 className="mb-2 font-medium">Vendor Information</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{vendor.name}</p>
                <p className="text-sm text-gray-600">{vendor.location}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-medium">{vendor.rating}</span>
                  <span className="text-gray-500">
                    ({vendor.reviewCount} reviews)
                  </span>
                </div>
                <Badge className="bg-green-100 text-xs text-green-800">
                  {vendor.responseTime}
                </Badge>
              </div>
            </div>
          </div>

          {/* Custom Requirements */}
          <div>
            <Label htmlFor="requirements">
              Detailed Requirements & Specifications
            </Label>
            <Textarea
              id="requirements"
              placeholder="Please describe your specific needs, preferences, style requirements, and any special considerations for this project..."
              value={formData.customRequirements}
              onChange={(e) =>
                setFormData({ ...formData, customRequirements: e.target.value })
              }
              className="mt-2 min-h-[120px]"
            />
          </div>

          {/* Budget Range */}
          <div>
            <Label>Budget Range</Label>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="budgetMin"
                  className="text-sm text-gray-600"
                >
                  Minimum
                </Label>
                <Input
                  id="budgetMin"
                  type="number"
                  placeholder="Min budget"
                  value={formData.budgetMin}
                  onChange={(e) =>
                    setFormData({ ...formData, budgetMin: e.target.value })
                  }
                />
              </div>
              <div>
                <Label
                  htmlFor="budgetMax"
                  className="text-sm text-gray-600"
                >
                  Maximum
                </Label>
                <Input
                  id="budgetMax"
                  type="number"
                  placeholder={`Max budget (${expenseItem.allocatedBudget})`}
                  value={formData.budgetMax}
                  onChange={(e) =>
                    setFormData({ ...formData, budgetMax: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Timeline & Urgency */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timeline">Preferred Timeline</Label>
              <Input
                id="timeline"
                placeholder="e.g., 2-3 weeks, By March 15th"
                value={formData.timeline}
                onChange={(e) =>
                  setFormData({ ...formData, timeline: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="urgency">Urgency Level</Label>
              <Select
                value={formData.urgency}
                onValueChange={(value: "low" | "medium" | "high") =>
                  setFormData({ ...formData, urgency: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      Low - Flexible timing
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      Medium - Standard timeline
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-red-600" />
                      High - Rush job
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Services */}
          <div>
            <Label>Additional Services (Optional)</Label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {vendor.services.map((service) => (
                <div
                  key={service}
                  onClick={() => toggleAdditionalService(service)}
                  className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                    formData.additionalServices.includes(service)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-sm font-medium">{service}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Preference */}
          <div>
            <Label>Preferred Contact Method</Label>
            <Select
              value={formData.contactPreference}
              onValueChange={(value: "email" | "phone" | "both") =>
                setFormData({ ...formData, contactPreference: value })
              }
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email only</SelectItem>
                <SelectItem value="phone">Phone only</SelectItem>
                <SelectItem value="both">Both email and phone</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1"
            >
              Send Proposal Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProposalRequestDialog;
