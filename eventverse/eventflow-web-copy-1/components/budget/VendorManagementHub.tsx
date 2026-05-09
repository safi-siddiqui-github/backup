"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { VendorProfile } from "@/types/budget";
import {
  AlertTriangle,
  Clock,
  DollarSign,
  Grid,
  List,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";
import type { Proposal } from "./ComprehensiveBudgetModule";
import VendorDetailView from "./VendorDetailView";
import VendorRelationshipCard from "./VendorRelationshipCard";

export interface VendorContract {
  id: string;
  vendorId: string;
  proposalId: string;
  status:
    | "draft"
    | "pending_signature"
    | "signed"
    | "active"
    | "completed"
    | "terminated";
  signedDate?: Date;
  startDate: Date;
  completionDate: Date;
  value: number;
  terms: string;
  deliverables: string[];
  documents: string[];
  amendments: {
    id: string;
    date: Date;
    description: string;
    valueChange?: number;
  }[];
}

export interface VendorMilestone {
  id: string;
  vendorId: string;
  contractId: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "pending" | "in_progress" | "completed" | "overdue";
  priority: "high" | "medium" | "low";
  dependencies?: string[];
}

export interface VendorCommunication {
  id: string;
  vendorId: string;
  type: "email" | "call" | "meeting" | "message";
  subject: string;
  content: string;
  date: Date;
  sender: "host" | "vendor";
  attachments?: string[];
}

interface VendorManagementHubProps {
  vendors: VendorProfile[];
  acceptedProposals: Proposal[];
  onContactVendor: (vendorId: string, message: string) => void;
  onProcessPayment: (proposalId: string, amount: number) => void;
}

const VendorManagementHub = ({
  vendors,
  acceptedProposals,
  onContactVendor,
  onProcessPayment,
}: VendorManagementHubProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedVendor, setSelectedVendor] = useState<VendorProfile | null>(
    null,
  );

  // Mock data for contracts, milestones, and communications
  const contracts: VendorContract[] = acceptedProposals.map((proposal) => ({
    id: `contract-${proposal.id}`,
    vendorId: proposal.vendorId,
    proposalId: proposal.id,
    status: "active",
    signedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    completionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    value: proposal.totalCost,
    terms: "Standard service agreement with milestone payments",
    deliverables: proposal.deliverables,
    documents: [`contract-${proposal.id}.pdf`, `proposal-${proposal.id}.pdf`],
    amendments: [],
  }));

  const milestones: VendorMilestone[] = contracts.flatMap((contract) => [
    {
      id: `milestone-${contract.id}-1`,
      vendorId: contract.vendorId,
      contractId: contract.id,
      title: "Initial Setup",
      description: "Begin service setup and initial preparations",
      dueDate: new Date(contract.startDate.getTime() + 3 * 24 * 60 * 60 * 1000),
      status: "pending",
      priority: "high",
    },
    {
      id: `milestone-${contract.id}-2`,
      vendorId: contract.vendorId,
      contractId: contract.id,
      title: "Mid-point Review",
      description: "Review progress and make adjustments",
      dueDate: new Date(
        contract.startDate.getTime() + 14 * 24 * 60 * 60 * 1000,
      ),
      status: "pending",
      priority: "medium",
    },
    {
      id: `milestone-${contract.id}-3`,
      vendorId: contract.vendorId,
      contractId: contract.id,
      title: "Final Delivery",
      description: "Complete service delivery",
      dueDate: contract.completionDate,
      status: "pending",
      priority: "high",
    },
  ]);

  const communications: VendorCommunication[] = contracts.map((contract) => ({
    id: `comm-${contract.id}`,
    vendorId: contract.vendorId,
    type: "email",
    subject: "Contract Confirmation",
    content:
      "Thank you for accepting our proposal. Looking forward to working with you!",
    date: contract.signedDate || new Date(),
    sender: "vendor",
  }));

  // Get contracted vendors (those with accepted proposals)
  const contractedVendors = vendors.filter((vendor) =>
    acceptedProposals.some((proposal) => proposal.vendorId === vendor.id),
  );

  // Filter vendors based on search and status
  const filteredVendors = contractedVendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === "all") return matchesSearch;

    const vendorContracts = contracts.filter((c) => c.vendorId === vendor.id);
    const matchesStatus = vendorContracts.some(
      (c) => c.status === statusFilter,
    );

    return matchesSearch && matchesStatus;
  });

  // Calculate overview statistics
  const totalContractValue = contracts.reduce(
    (sum, contract) => sum + contract.value,
    0,
  );
  const activeContracts = contracts.filter((c) => c.status === "active").length;
  const overdueMilestones = milestones.filter(
    (m) =>
      m.status === "overdue" ||
      (m.status === "pending" && m.dueDate < new Date()),
  ).length;
  const upcomingDeadlines = milestones.filter(
    (m) =>
      m.dueDate >= new Date() &&
      m.dueDate <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  ).length;

  // If a vendor is selected, show the detail view
  if (selectedVendor) {
    const vendorContracts = contracts.filter(
      (c) => c.vendorId === selectedVendor.id,
    );
    const vendorMilestones = milestones.filter(
      (m) => m.vendorId === selectedVendor.id,
    );
    const vendorCommunications = communications.filter(
      (c) => c.vendorId === selectedVendor.id,
    );

    return (
      <VendorDetailView
        vendor={selectedVendor}
        contracts={vendorContracts}
        milestones={vendorMilestones}
        communications={vendorCommunications}
        onBack={() => setSelectedVendor(null)}
        onContactVendor={onContactVendor}
        onProcessPayment={onProcessPayment}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Active Vendors</p>
                <p className="text-2xl font-bold">{contractedVendors.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Contracts</p>
                <p className="text-2xl font-bold">
                  ${totalContractValue.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Upcoming Deadlines</p>
                <p className="text-2xl font-bold">{upcomingDeadlines}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Overdue Items</p>
                <p className="text-2xl font-bold">{overdueMilestones}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Current Vendors</span>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="mb-6 flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="signed">Signed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Vendors Grid/List */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                : "space-y-4"
            }
          >
            {filteredVendors.map((vendor) => {
              const vendorContracts = contracts.filter(
                (c) => c.vendorId === vendor.id,
              );
              const vendorMilestones = milestones.filter(
                (m) => m.vendorId === vendor.id,
              );
              const vendorCommunications = communications.filter(
                (c) => c.vendorId === vendor.id,
              );

              return (
                <VendorRelationshipCard
                  key={vendor.id}
                  vendor={vendor}
                  contracts={vendorContracts}
                  milestones={vendorMilestones}
                  communications={vendorCommunications}
                  onContactVendor={onContactVendor}
                  onViewDetails={() => setSelectedVendor(vendor)}
                  viewMode={viewMode}
                />
              );
            })}
          </div>

          {filteredVendors.length === 0 && (
            <div className="py-12 text-center">
              <Users className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2 text-lg font-medium text-gray-600">
                No vendors found
              </h3>
              <p className="text-gray-500">
                {contractedVendors.length === 0
                  ? "No vendors have been contracted yet"
                  : "Try adjusting your search criteria"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorManagementHub;
