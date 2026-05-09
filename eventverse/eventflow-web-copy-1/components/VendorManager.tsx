"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Calendar,
  DollarSign,
  Edit,
  FileText,
  Globe,
  Mail,
  MoreVertical,
  Phone,
  Plus,
  Search,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";

// Define types locally
interface Vendor {
  id: number;
  name: string;
  category: string;
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
  rating: number;
  description: string;
  services: string[];
  status: "active" | "inactive" | "pending";
  contracts?: { status: string }[];
  notes?: string;
}

interface Expense {
  id: number;
  category: string;
  subcategory?: string;
  vendor?: string;
  description: string;
  amount: number;
  date: Date;
  status: "planned" | "approved" | "paid" | "overdue";
  paymentMethod?: string;
  dueDate?: Date;
  notes?: string;
  receipt?: string;
}

interface VendorManagerProps {
  vendors: Vendor[];
  expenses: Expense[];
  onAddVendor: () => void;
  onEditVendor: (vendor: Vendor) => void;
  onDeleteVendor: (id: number) => void;
  onUpdateVendor: (id: number, updates: Partial<Vendor>) => void;
}

const VendorManager = ({
  vendors,
  expenses,
  onAddVendor,
  onEditVendor,
  onDeleteVendor,
  onUpdateVendor,
}: VendorManagerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusColor = (status: Vendor["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < rating ? "fill-current text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  const getVendorExpenses = (vendorName: string) => {
    return expenses.filter((expense) => expense.vendor === vendorName);
  };

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || vendor.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || vendor.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ["all", ...new Set(vendors.map((v) => v.category))];
  const statuses = ["all", "active", "inactive", "pending"];

  return (
    <div className="space-y-4">
      {/* Filters and Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search vendors..."
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
              {categories.map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                >
                  {category === "all" ? "All Categories" : category}
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

        <Button onClick={onAddVendor}>
          <Plus className="mr-2 h-4 w-4" />
          Add Vendor
        </Button>
      </div>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredVendors.map((vendor) => {
          const vendorExpenses = getVendorExpenses(vendor.name);
          const totalExpenses = vendorExpenses.reduce(
            (sum, exp) => sum + exp.amount,
            0,
          );

          return (
            <Card
              key={vendor.id}
              className="transition-shadow hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-1 text-lg">
                      {vendor.name}
                    </CardTitle>
                    <div className="mb-2 flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="text-xs"
                      >
                        {vendor.category}
                      </Badge>
                      <Badge
                        className={`text-xs ${getStatusColor(vendor.status)}`}
                      >
                        {vendor.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(vendor.rating)}
                      <span className="ml-1 text-sm text-gray-600">
                        ({vendor.rating.toFixed(1)})
                      </span>
                    </div>
                  </div>

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
                      <DropdownMenuItem onClick={() => onEditVendor(vendor)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDeleteVendor(vendor.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Contact Information */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-3 w-3" />
                    <a
                      href={`mailto:${vendor.contact.email}`}
                      className="hover:text-blue-600"
                    >
                      {vendor.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-3 w-3" />
                    <a
                      href={`tel:${vendor.contact.phone}`}
                      className="hover:text-blue-600"
                    >
                      {vendor.contact.phone}
                    </a>
                  </div>
                  {vendor.contact.website && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="h-3 w-3" />
                      <a
                        href={vendor.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600"
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>

                {/* Services */}
                <div className="mb-4">
                  <h5 className="mb-2 text-sm font-medium">Services</h5>
                  <div className="flex flex-wrap gap-1">
                    {vendor.services?.slice(0, 3).map((service, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {service}
                      </Badge>
                    ))}
                    {vendor.services && vendor.services.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="text-xs"
                      >
                        +{vendor.services.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <DollarSign className="h-3 w-3" />
                      Total Spent
                    </div>
                    <span className="font-medium">
                      ${totalExpenses.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <FileText className="h-3 w-3" />
                      Expenses
                    </div>
                    <span className="font-medium">{vendorExpenses.length}</span>
                  </div>
                  {vendor.contracts && vendor.contracts.length > 0 && (
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="h-3 w-3" />
                        Active Contracts
                      </div>
                      <span className="font-medium">
                        {
                          vendor.contracts.filter((c) => c.status === "active")
                            .length
                        }
                      </span>
                    </div>
                  )}
                </div>

                {vendor.notes && (
                  <div className="mt-3 rounded bg-gray-50 p-2 text-xs text-gray-600">
                    <strong>Notes:</strong> {vendor.notes}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredVendors.length === 0 && (
        <div className="py-12 text-center">
          <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-600">
            No vendors found
          </h3>
          <p className="mb-4 text-gray-500">
            Add vendors to manage your event suppliers
          </p>
          <Button onClick={onAddVendor}>
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Vendor
          </Button>
        </div>
      )}
    </div>
  );
};

export default VendorManager;
