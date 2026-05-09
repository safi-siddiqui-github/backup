"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { VendorProfile } from "@/types/budget";
import {
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Globe,
  Mail,
  Phone,
  Star,
} from "lucide-react";
import { useState } from "react";
import ProjectTimelineView from "./ProjectTimelineView";
import VendorCommunicationDetails from "./VendorCommunicationDetails";
import VendorContractDetails from "./VendorContractDetails";
import type {
  VendorCommunication,
  VendorContract,
  VendorMilestone,
} from "./VendorManagementHub";
import VendorPaymentDetails from "./VendorPaymentDetails";

interface VendorDetailViewProps {
  vendor: VendorProfile;
  contracts: VendorContract[];
  milestones: VendorMilestone[];
  communications: VendorCommunication[];
  onBack: () => void;
  onContactVendor: (vendorId: string, message: string) => void;
  onProcessPayment: (proposalId: string, amount: number) => void;
}

const VendorDetailView = ({
  vendor,
  contracts,
  milestones,
  communications,
  onBack,
  onContactVendor,
  onProcessPayment,
}: VendorDetailViewProps) => {
  const [activeTab, setActiveTab] = useState("timeline");

  // Calculate overview stats for this vendor
  const totalContractValue = contracts.reduce(
    (sum, contract) => sum + contract.value,
    0,
  );
  const activeContracts = contracts.filter((c) => c.status === "active").length;
  const completedMilestones = milestones.filter(
    (m) => m.status === "completed",
  ).length;
  const upcomingMilestones = milestones.filter(
    (m) =>
      m.status === "pending" &&
      m.dueDate >= new Date() &&
      m.dueDate <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Vendors
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-bold text-white">
              {vendor.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{vendor.name}</h1>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="outline">{vendor.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{vendor.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{vendor.contact.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{vendor.contact.phone}</span>
            </div>
            {vendor.contact.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-500" />
                <a
                  href={vendor.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Website
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-xl font-bold">
                  ${totalContractValue.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Active Contracts</p>
                <p className="text-xl font-bold">{activeContracts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-xl font-bold">{upcomingMilestones}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-bold">{completedMilestones}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendor-Specific Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">Service Timeline</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        <TabsContent
          value="timeline"
          className="mt-6"
        >
          <ProjectTimelineView
            vendor={vendor}
            contracts={contracts}
            milestones={milestones}
          />
        </TabsContent>

        <TabsContent
          value="contracts"
          className="mt-6"
        >
          <VendorContractDetails
            vendor={vendor}
            contracts={contracts}
            milestones={milestones}
          />
        </TabsContent>

        <TabsContent
          value="payments"
          className="mt-6"
        >
          <VendorPaymentDetails
            vendor={vendor}
            contracts={contracts}
            onProcessPayment={onProcessPayment}
          />
        </TabsContent>

        <TabsContent
          value="communication"
          className="mt-6"
        >
          <VendorCommunicationDetails
            vendor={vendor}
            communications={communications}
            onContactVendor={onContactVendor}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorDetailView;
