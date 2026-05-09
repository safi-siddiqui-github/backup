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
import { Progress } from "@/components/ui/progress";
import type { VendorProfile } from "@/types/budget";
import {
  ArrowRight,
  Calendar,
  Clock,
  DollarSign,
  MessageSquare,
  Star,
} from "lucide-react";
import type {
  VendorCommunication,
  VendorContract,
  VendorMilestone,
} from "./VendorManagementHub";

interface VendorRelationshipCardProps {
  vendor: VendorProfile;
  contracts: VendorContract[];
  milestones: VendorMilestone[];
  communications: VendorCommunication[];
  onContactVendor: (vendorId: string, message: string) => void;
  onViewDetails: () => void;
  viewMode: "grid" | "list";
}

const VendorRelationshipCard = ({
  vendor,
  contracts,
  milestones,
  communications,
  onContactVendor,
  onViewDetails,
  viewMode,
}: VendorRelationshipCardProps) => {
  const totalValue = contracts.reduce(
    (sum, contract) => sum + contract.value,
    0,
  );
  const activeContracts = contracts.filter((c) => c.status === "active").length;
  const completedMilestones = milestones.filter(
    (m) => m.status === "completed",
  ).length;
  const totalMilestones = milestones.length;
  const progress =
    totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;
  const unreadMessages = communications.filter(
    (c) =>
      c.sender === "vendor" &&
      c.date > new Date(Date.now() - 24 * 60 * 60 * 1000),
  ).length;

  const upcomingMilestone = milestones
    .filter((m) => m.status === "pending" && m.dueDate >= new Date())
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())[0];

  if (viewMode === "list") {
    return (
      <Card
        className="cursor-pointer transition-shadow hover:shadow-md"
        onClick={onViewDetails}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 font-bold text-white">
                {vendor.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium">{vendor.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Badge variant="outline">{vendor.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{vendor.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Value</p>
                <p className="font-bold">${totalValue.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Progress</p>
                <p className="font-bold">{Math.round(progress)}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Status</p>
                <Badge variant={activeContracts > 0 ? "default" : "secondary"}>
                  {activeContracts > 0 ? "Active" : "Inactive"}
                </Badge>
              </div>

              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={onViewDetails}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 font-bold text-white">
              {vendor.name.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-lg">{vendor.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Badge variant="outline">{vendor.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{vendor.rating.toFixed(1)}</span>
                </div>
              </CardDescription>
            </div>
          </div>

          {unreadMessages > 0 && (
            <Badge
              variant="destructive"
              className="text-xs"
            >
              {unreadMessages} new
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Contract Overview */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-gray-600">Total Value</p>
              <p className="font-medium">${totalValue.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-gray-600">Active Contracts</p>
              <p className="font-medium">{activeContracts}</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Project Progress</span>
            <span className="text-sm text-gray-600">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress
            value={progress}
            className="h-2"
          />
        </div>

        {/* Next Milestone */}
        {upcomingMilestone && (
          <div className="rounded-lg bg-blue-50 p-3">
            <div className="mb-1 flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Next Milestone</span>
            </div>
            <p className="text-sm text-gray-700">{upcomingMilestone.title}</p>
            <p className="text-xs text-gray-500">
              Due: {upcomingMilestone.dueDate.toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onContactVendor(vendor.id, "");
            }}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Message
          </Button>
          <Button
            variant="outline"
            size="sm"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorRelationshipCard;
