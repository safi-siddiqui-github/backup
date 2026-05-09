
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
  MoreVertical, 
  Edit, 
  Trash2, 
  Star, 
  Phone, 
  Mail,
  Users,
  DollarSign,
  Filter,
  Globe,
  FileText,
  Calendar
} from "lucide-react";

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
  onUpdateVendor
}: VendorManagerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusColor = (status: Vendor["status"]) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const getVendorExpenses = (vendorName: string) => {
    return expenses.filter(expense => expense.vendor === vendorName);
  };

  const filteredVendors = vendors
    .filter(vendor => {
      const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vendor.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "all" || vendor.category === filterCategory;
      const matchesStatus = filterStatus === "all" || vendor.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });

  const categories = ["all", ...new Set(vendors.map(v => v.category))];
  const statuses = ["all", "active", "inactive", "pending"];

  return (
    <div className="space-y-4">
      {/* Filters and Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search vendors..."
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
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
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

        <Button onClick={onAddVendor}>
          <Plus className="w-4 h-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVendors.map((vendor) => {
          const vendorExpenses = getVendorExpenses(vendor.name);
          const totalExpenses = vendorExpenses.reduce((sum, exp) => sum + exp.amount, 0);
          
          return (
            <Card key={vendor.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{vendor.name}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {vendor.category}
                      </Badge>
                      <Badge className={`text-xs ${getStatusColor(vendor.status)}`}>
                        {vendor.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(vendor.rating)}
                      <span className="text-sm text-gray-600 ml-1">
                        ({vendor.rating.toFixed(1)})
                      </span>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditVendor(vendor)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDeleteVendor(vendor.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Contact Information */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-3 h-3" />
                    <a href={`mailto:${vendor.contact.email}`} className="hover:text-blue-600">
                      {vendor.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-3 h-3" />
                    <a href={`tel:${vendor.contact.phone}`} className="hover:text-blue-600">
                      {vendor.contact.phone}
                    </a>
                  </div>
                  {vendor.contact.website && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="w-3 h-3" />
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
                  <h5 className="text-sm font-medium mb-2">Services</h5>
                  <div className="flex flex-wrap gap-1">
                    {vendor.services?.slice(0, 3).map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {vendor.services && vendor.services.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{vendor.services.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <DollarSign className="w-3 h-3" />
                      Total Spent
                    </div>
                    <span className="font-medium">${totalExpenses.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <div className="flex items-center gap-1 text-gray-600">
                      <FileText className="w-3 h-3" />
                      Expenses
                    </div>
                    <span className="font-medium">{vendorExpenses.length}</span>
                  </div>
                  {vendor.contracts && vendor.contracts.length > 0 && (
                    <div className="flex items-center justify-between text-sm mt-1">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="w-3 h-3" />
                        Active Contracts
                      </div>
                      <span className="font-medium">
                        {vendor.contracts.filter(c => c.status === 'active').length}
                      </span>
                    </div>
                  )}
                </div>

                {vendor.notes && (
                  <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
                    <strong>Notes:</strong> {vendor.notes}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredVendors.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No vendors found</h3>
          <p className="text-gray-500 mb-4">Add vendors to manage your event suppliers</p>
          <Button onClick={onAddVendor}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Vendor
          </Button>
        </div>
      )}
    </div>
  );
};

export default VendorManager;
