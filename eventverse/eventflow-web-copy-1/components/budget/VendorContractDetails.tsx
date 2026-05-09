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
import type { VendorProfile } from "@/types/budget";
import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  Edit,
  FileText,
} from "lucide-react";
import type { VendorContract, VendorMilestone } from "./VendorManagementHub";

interface VendorContractDetailsProps {
  vendor: VendorProfile;
  contracts: VendorContract[];
  milestones: VendorMilestone[];
}

const VendorContractDetails = ({
  vendor,
  contracts,
  milestones,
}: VendorContractDetailsProps) => {
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
        const contractMilestones = milestones.filter(
          (m) => m.contractId === contract.id,
        );

        return (
          <Card key={contract.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Contract #{contract.id.split("-")[1]}
                  </CardTitle>
                  <CardDescription>
                    Proposal ID: {contract.proposalId} • Value: $
                    {contract.value.toLocaleString()}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(contract.status)}>
                  {contract.status.replace("_", " ")}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Contract Details */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <h4 className="mb-1 text-sm font-medium">
                      Contract Period
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {contract.startDate.toLocaleDateString()} -{" "}
                      {contract.completionDate.toLocaleDateString()}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-1 text-sm font-medium">Contract Value</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="h-4 w-4" />$
                      {contract.value.toLocaleString()}
                    </div>
                  </div>

                  {contract.signedDate && (
                    <div>
                      <h4 className="mb-1 text-sm font-medium">Signed Date</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4" />
                        {contract.signedDate.toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="mb-1 text-sm font-medium">
                      Terms & Conditions
                    </h4>
                    <p className="text-sm text-gray-600">{contract.terms}</p>
                  </div>

                  <div>
                    <h4 className="mb-1 text-sm font-medium">Documents</h4>
                    <div className="space-y-1">
                      {contract.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded bg-gray-50 p-2"
                        >
                          <span className="text-sm">{doc}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="mb-3 font-medium">Deliverables</h4>
                <div className="grid grid-cols-2 gap-2">
                  {contract.deliverables.map((deliverable, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded border p-2"
                    >
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{deliverable}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contract Milestones */}
              <div>
                <h4 className="mb-3 font-medium">Contract Milestones</h4>
                <div className="space-y-2">
                  {contractMilestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="flex items-center justify-between rounded border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            milestone.status === "completed"
                              ? "bg-green-500"
                              : milestone.status === "in_progress"
                                ? "bg-blue-500"
                                : milestone.status === "overdue"
                                  ? "bg-red-500"
                                  : "bg-gray-300"
                          }`}
                        />
                        <div>
                          <p className="text-sm font-medium">
                            {milestone.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            milestone.priority === "high"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {milestone.priority}
                        </Badge>
                        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {milestone.dueDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contract Actions */}
              <div className="flex gap-2 border-t pt-4">
                <Button
                  variant="outline"
                  size="sm"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Modify Contract
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Full Contract
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>

              {/* Amendments */}
              {contract.amendments.length > 0 && (
                <div>
                  <h4 className="mb-3 font-medium">Contract Amendments</h4>
                  <div className="space-y-2">
                    {contract.amendments.map((amendment) => (
                      <div
                        key={amendment.id}
                        className="rounded border bg-yellow-50 p-3"
                      >
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Amendment #{amendment.id}
                          </span>
                          <span className="text-xs text-gray-500">
                            {amendment.date.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {amendment.description}
                        </p>
                        {amendment.valueChange && (
                          <div className="mt-1 text-sm font-medium">
                            Value Change: {amendment.valueChange > 0 ? "+" : ""}
                            ${amendment.valueChange.toLocaleString()}
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
