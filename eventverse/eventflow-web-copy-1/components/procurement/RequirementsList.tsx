"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  DollarSign,
  Edit,
  Eye,
  MoreVertical,
  Package,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import type { Requirement } from "./types";

interface RequirementsListProps {
  requirements: Requirement[];
  onAddRequirement: () => void;
  onEditRequirement: (requirement: Requirement) => void;
  onDeleteRequirement: (id: string) => void;
  onViewProposals: (requirement: Requirement) => void;
  categories: string[];
}

const RequirementsList = ({
  requirements,
  onAddRequirement,
  onEditRequirement,
  onDeleteRequirement,
  onViewProposals,
  categories,
}: RequirementsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusColor = (status: Requirement["status"]) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "published":
        return "bg-blue-100 text-blue-800";
      case "bidding":
        return "bg-yellow-100 text-yellow-800";
      case "evaluation":
        return "bg-orange-100 text-orange-800";
      case "awarded":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRequirements = requirements.filter((req) => {
    const matchesSearch =
      req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || req.category === filterCategory;
    const matchesStatus = filterStatus === "all" || req.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const statuses = [
    "all",
    "draft",
    "published",
    "bidding",
    "evaluation",
    "awarded",
    "completed",
  ];

  return (
    <div className="space-y-4">
      {/* Filters and Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search requirements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-10"
            />
          </div>

          <Select
            value={filterCategory}
            onValueChange={setFilterCategory}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filterStatus}
            onValueChange={setFilterStatus}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem
                  key={status}
                  value={status}
                >
                  {status === "all"
                    ? "All Status"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={onAddRequirement}>
          <Plus className="mr-2 h-4 w-4" />
          Add Requirement
        </Button>
      </div>

      {/* Requirements Grid */}
      <div className="grid gap-4">
        {filteredRequirements.map((requirement) => (
          <Card
            key={requirement.id}
            className="transition-shadow hover:shadow-md"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <h4 className="text-lg font-medium">{requirement.title}</h4>
                    <Badge className={getStatusColor(requirement.status)}>
                      {requirement.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs"
                    >
                      {requirement.category}
                    </Badge>
                  </div>

                  <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                    {requirement.description}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      Budget: ${requirement.budgetAllocated.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      Qty: {requirement.quantity}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Deadline: {format(requirement.deadline, "MMM d, yyyy")}
                    </span>
                    {requirement.status === "bidding" && (
                      <span className="flex items-center gap-1 text-yellow-600">
                        <Clock className="h-3 w-3" />
                        Accepting Bids
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {(requirement.status === "bidding" ||
                    requirement.status === "evaluation") && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewProposals(requirement)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View Proposals
                    </Button>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onEditRequirement(requirement)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onViewProposals(requirement)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDeleteRequirement(requirement.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequirements.length === 0 && (
        <div className="py-12 text-center">
          <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-600">
            No requirements found
          </h3>
          <p className="mb-4 text-gray-500">
            Start by creating your first requirement
          </p>
          <Button onClick={onAddRequirement}>
            <Plus className="mr-2 h-4 w-4" />
            Create First Requirement
          </Button>
        </div>
      )}
    </div>
  );
};

export default RequirementsList;
