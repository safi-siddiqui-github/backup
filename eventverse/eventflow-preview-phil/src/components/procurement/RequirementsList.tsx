
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  DollarSign,
  Package,
  Clock
} from "lucide-react";
import { format } from "date-fns";
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
  categories
}: RequirementsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusColor = (status: Requirement["status"]) => {
    switch (status) {
      case "draft": return "bg-gray-100 text-gray-800";
      case "published": return "bg-blue-100 text-blue-800";
      case "bidding": return "bg-yellow-100 text-yellow-800";
      case "evaluation": return "bg-orange-100 text-orange-800";
      case "awarded": return "bg-green-100 text-green-800";
      case "completed": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRequirements = requirements.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || req.category === filterCategory;
    const matchesStatus = filterStatus === "all" || req.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const statuses = ["all", "draft", "published", "bidding", "evaluation", "awarded", "completed"];

  return (
    <div className="space-y-4">
      {/* Filters and Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search requirements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={onAddRequirement}>
          <Plus className="w-4 h-4 mr-2" />
          Add Requirement
        </Button>
      </div>

      {/* Requirements Grid */}
      <div className="grid gap-4">
        {filteredRequirements.map((requirement) => (
          <Card key={requirement.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-lg">{requirement.title}</h4>
                    <Badge className={getStatusColor(requirement.status)}>
                      {requirement.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {requirement.category}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {requirement.description}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      Budget: ${requirement.budgetAllocated.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="w-3 h-3" />
                      Qty: {requirement.quantity}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Deadline: {format(requirement.deadline, "MMM d, yyyy")}
                    </span>
                    {requirement.status === "bidding" && (
                      <span className="flex items-center gap-1 text-yellow-600">
                        <Clock className="w-3 h-3" />
                        Accepting Bids
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {(requirement.status === "bidding" || requirement.status === "evaluation") && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewProposals(requirement)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Proposals
                    </Button>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditRequirement(requirement)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onViewProposals(requirement)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDeleteRequirement(requirement.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
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
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No requirements found</h3>
          <p className="text-gray-500 mb-4">Start by creating your first requirement</p>
          <Button onClick={onAddRequirement}>
            <Plus className="w-4 h-4 mr-2" />
            Create First Requirement
          </Button>
        </div>
      )}
    </div>
  );
};

export default RequirementsList;
