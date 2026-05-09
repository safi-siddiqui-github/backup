
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Download,
  Upload,
  Search
} from "lucide-react";
import type { VendorProfile } from "@/types/budget";
import type { VendorContract, VendorMilestone } from "./VendorManagementHub";

interface ContractManagementProps {
  contracts: VendorContract[];
  vendors: VendorProfile[];
  milestones: VendorMilestone[];
}

const ContractManagement = ({ contracts, vendors, milestones }: ContractManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContract, setSelectedContract] = useState<VendorContract | null>(null);

  const filteredContracts = contracts.filter(contract => {
    const vendor = vendors.find(v => v.id === contract.vendorId);
    const matchesSearch = vendor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || contract.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'signed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'pending_signature': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-orange-100 text-orange-800';
      case 'terminated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'signed': return <FileText className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending_signature': return <Clock className="w-4 h-4" />;
      case 'draft': return <FileText className="w-4 h-4" />;
      case 'terminated': return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Contract Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Contracts</p>
                <p className="text-2xl font-bold">{contracts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold">
                  {contracts.filter(c => c.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Pending Signature</p>
                <p className="text-2xl font-bold">
                  {contracts.filter(c => c.status === 'pending_signature').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">
                  ${contracts.reduce((sum, c) => sum + c.value, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search contracts or vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending_signature">Pending Signature</SelectItem>
                <SelectItem value="signed">Signed</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="terminated">Terminated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Contracts List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredContracts.map(contract => {
                const vendor = vendors.find(v => v.id === contract.vendorId);
                if (!vendor) return null;

                return (
                  <div
                    key={contract.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedContract?.id === contract.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedContract(contract)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{vendor.name}</h4>
                        <p className="text-sm text-gray-600">{vendor.category}</p>
                      </div>
                      <Badge className={getStatusColor(contract.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(contract.status)}
                          {contract.status.replace('_', ' ')}
                        </div>
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${contract.value.toLocaleString()}</span>
                      <span className="text-sm text-gray-600">
                        Due: {contract.completionDate.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Contract Details */}
        <Card>
          <CardHeader>
            <CardTitle>Contract Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedContract ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Contract Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contract ID:</span>
                      <span>{selectedContract.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Value:</span>
                      <span className="font-medium">${selectedContract.value.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Date:</span>
                      <span>{selectedContract.startDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completion Date:</span>
                      <span>{selectedContract.completionDate.toLocaleDateString()}</span>
                    </div>
                    {selectedContract.signedDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Signed Date:</span>
                        <span>{selectedContract.signedDate.toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Terms & Conditions</h4>
                  <p className="text-sm text-gray-700">{selectedContract.terms}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Deliverables</h4>
                  <ul className="space-y-1">
                    {selectedContract.deliverables.map((deliverable, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Documents</h4>
                  <div className="space-y-2">
                    {selectedContract.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{doc}</span>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                  <Button className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    View Full Contract
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Select a contract to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContractManagement;
