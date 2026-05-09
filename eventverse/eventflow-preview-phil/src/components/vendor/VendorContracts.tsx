import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  File, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Send,
  Download,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface VendorUser {
  id: string;
  businessName: string;
  email: string;
  category: string;
  status: "active" | "pending" | "suspended";
  profileComplete: boolean;
}

interface VendorContractsProps {
  vendor: VendorUser;
}

interface Contract {
  id: string;
  clientName: string;
  projectName: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: "draft" | "sent" | "signed" | "completed" | "cancelled";
  paymentTerms: string;
  deliverables: string[];
  changeOrders: number;
  lastModified: string;
}

const VendorContracts = ({ vendor }: VendorContractsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock contracts data
  const [contracts] = useState<Contract[]>([
    {
      id: "CTR-001",
      clientName: "Sarah Johnson",
      projectName: "Wedding Catering Services",
      amount: 7500,
      startDate: "2024-08-10",
      endDate: "2024-08-15",
      status: "signed",
      paymentTerms: "50% deposit, 50% on completion",
      deliverables: ["Full service catering for 150 guests", "Setup and cleanup", "Wedding cake"],
      changeOrders: 1,
      lastModified: "2024-01-15"
    },
    {
      id: "CTR-002",
      clientName: "Elite Events Inc",
      projectName: "Corporate Gala Catering",
      amount: 12000,
      startDate: "2024-09-15",
      endDate: "2024-09-20",
      status: "sent",
      paymentTerms: "30% deposit, 70% on completion",
      deliverables: ["Cocktail reception", "Three-course dinner", "Bar service"],
      changeOrders: 0,
      lastModified: "2024-01-12"
    },
    {
      id: "CTR-003",
      clientName: "Maria Rodriguez",
      projectName: "Birthday Party Catering",
      amount: 3500,
      startDate: "2024-07-25",
      endDate: "2024-07-30",
      status: "completed",
      paymentTerms: "50% deposit, 50% on completion",
      deliverables: ["BBQ catering for 75 guests", "Setup and cleanup"],
      changeOrders: 0,
      lastModified: "2024-01-10"
    },
    {
      id: "CTR-004",
      clientName: "Robert Chen",
      projectName: "Anniversary Celebration",
      amount: 5000,
      startDate: "2024-06-20",
      endDate: "2024-06-25",
      status: "draft",
      paymentTerms: "50% deposit, 50% on completion",
      deliverables: ["Italian dinner for 100 guests", "Wine service", "Setup"],
      changeOrders: 0,
      lastModified: "2024-01-08"
    }
  ]);

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || contract.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Contract["status"]) => {
    switch (status) {
      case "draft": return "bg-gray-100 text-gray-800";
      case "sent": return "bg-yellow-100 text-yellow-800";
      case "signed": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: Contract["status"]) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "signed": return <File className="w-4 h-4 text-blue-600" />;
      case "sent": return <Clock className="w-4 h-4 text-yellow-600" />;
      case "cancelled": return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Edit className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTotalValue = () => {
    return contracts.reduce((sum, contract) => sum + contract.amount, 0);
  };

  const getActiveContracts = () => {
    return contracts.filter(contract => contract.status === "signed").length;
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contracts</p>
                <p className="text-2xl font-bold">{contracts.length}</p>
              </div>
              <File className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold">{getActiveContracts()}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">${getTotalValue().toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold">
                  {contracts.filter(c => c.status === "sent").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search contracts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="signed">Signed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Contract
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contracts List */}
      <div className="space-y-4">
        {filteredContracts.map((contract) => (
          <Card key={contract.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-lg">{contract.projectName}</CardTitle>
                    <Badge className={getStatusColor(contract.status)}>
                      {getStatusIcon(contract.status)}
                      <span className="ml-1">{contract.status}</span>
                    </Badge>
                  </div>
                  <CardDescription>
                    {contract.clientName} • Contract #{contract.id}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    ${contract.amount.toLocaleString()}
                  </p>
                  {contract.changeOrders > 0 && (
                    <p className="text-sm text-orange-600">
                      {contract.changeOrders} change order(s)
                    </p>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Timeline */}
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Start: {new Date(contract.startDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    End: {new Date(contract.endDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Modified: {new Date(contract.lastModified).toLocaleDateString()}
                  </div>
                </div>

                {/* Payment Terms */}
                <div>
                  <h4 className="text-sm font-medium mb-1">Payment Terms</h4>
                  <p className="text-sm text-gray-600">{contract.paymentTerms}</p>
                </div>

                {/* Deliverables */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Deliverables</h4>
                  <div className="flex flex-wrap gap-2">
                    {contract.deliverables.map((deliverable, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {deliverable}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  {contract.status === "draft" && (
                    <Button size="sm">
                      <Send className="w-4 h-4 mr-2" />
                      Send to Client
                    </Button>
                  )}
                  {contract.status === "signed" && (
                    <Button size="sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Complete
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContracts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <File className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contracts found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your filters to see more contracts."
                : "Create your first contract to get started."}
            </p>
            <Button className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Create New Contract
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VendorContracts;
