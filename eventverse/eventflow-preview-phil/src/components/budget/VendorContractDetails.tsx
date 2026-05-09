
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText,
  Download,
  Edit,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock
} from "lucide-react";
import type { VendorProfile } from "@/types/budget";
import type { VendorContract, VendorMilestone } from "./VendorManagementHub";

interface VendorContractDetailsProps {
  vendor: VendorProfile;
  contracts: VendorContract[];
  milestones: VendorMilestone[];
}

const VendorContractDetails = ({ vendor, contracts, milestones }: VendorContractDetailsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "signed":
        return "bg-blue-100 text-blue-800";
      case "pending_signature":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {contracts.map((contract) => {
        const contractMilestones = milestones.filter(m => m.contractId === contract.id);
        
        return (
          <Card key={contract.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Contract #{contract.id.split('-')[1]}
                  </CardTitle>
                  <CardDescription>
                    Proposal ID: {contract.proposalId} • Value: ${contract.value.toLocaleString()}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(contract.status)}>
                  {contract.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Contract Details */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-1">Contract Period</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {contract.startDate.toLocaleDateString()} - {contract.completionDate.toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-1">Contract Value</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      ${contract.value.toLocaleString()}
                    </div>
                  </div>
                  
                  {contract.signedDate && (
                    <div>
                      <h4 className="font-medium text-sm mb-1">Signed Date</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4" />
                        {contract.signedDate.toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-1">Terms & Conditions</h4>
                    <p className="text-sm text-gray-600">{contract.terms}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-1">Documents</h4>
                    <div className="space-y-1">
                      {contract.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{doc}</span>
                          <Button variant="ghost" size="sm">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Deliverables */}
              <div>
                <h4 className="font-medium mb-3">Deliverables</h4>
                <div className="grid grid-cols-2 gap-2">
                  {contract.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{deliverable}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Contract Milestones */}
              <div>
                <h4 className="font-medium mb-3">Contract Milestones</h4>
                <div className="space-y-2">
                  {contractMilestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          milestone.status === 'completed' ? 'bg-green-500' :
                          milestone.status === 'in_progress' ? 'bg-blue-500' :
                          milestone.status === 'overdue' ? 'bg-red-500' : 'bg-gray-300'
                        }`} />
                        <div>
                          <p className="font-medium text-sm">{milestone.title}</p>
                          <p className="text-xs text-gray-600">{milestone.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={milestone.priority === 'high' ? 'destructive' : 'outline'}>
                          {milestone.priority}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3" />
                          {milestone.dueDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Contract Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Modify Contract
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  View Full Contract
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
              
              {/* Amendments */}
              {contract.amendments.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Contract Amendments</h4>
                  <div className="space-y-2">
                    {contract.amendments.map((amendment) => (
                      <div key={amendment.id} className="p-3 border rounded bg-yellow-50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">Amendment #{amendment.id}</span>
                          <span className="text-xs text-gray-500">{amendment.date.toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-600">{amendment.description}</p>
                        {amendment.valueChange && (
                          <div className="text-sm font-medium mt-1">
                            Value Change: {amendment.valueChange > 0 ? '+' : ''}${amendment.valueChange.toLocaleString()}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default VendorContractDetails;
