import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  Calendar,
  User,
  FileText,
  DollarSign,
  Lock,
  ChevronDown,
  ChevronUp,
  Package,
  ClipboardCheck,
  ArrowUp
} from "lucide-react";
import type { VendorProfile } from "@/types/budget";
import type { VendorContract, VendorMilestone } from "./VendorManagementHub";

interface ProjectTimelineViewProps {
  vendor: VendorProfile;
  contracts: VendorContract[];
  milestones: VendorMilestone[];
}

// Mock service delivery stages that would come from ServiceDeliveryManager
const serviceStages = [
  {
    id: "1",
    name: "Initial Consultation",
    description: "Meet with clients to understand their vision and requirements",
    duration: 7,
    status: "completed" as const,
    completedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    requiresPayment: true,
    paymentAmount: 500,
    paymentStatus: "paid" as const,
    deliverables: [
      "Initial questionnaire completed",
      "Design preferences documented",
      "Budget discussion finalized"
    ],
    requirements: ["Deposit payment", "Signed consultation agreement"],
    actionItems: [
      { type: "vendor" as const, description: "Send consultation summary", completed: true },
      { type: "client" as const, description: "Review and approve vision board", completed: true }
    ]
  },
  {
    id: "2", 
    name: "Menu Planning & Tasting",
    description: "Design custom menu and conduct tasting session",
    duration: 14,
    status: "in_progress" as const,
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    progress: 60,
    requiresPayment: false,
    deliverables: [
      "Three custom menu options presented",
      "Tasting session scheduled and completed",
      "Final menu selection confirmed",
      "Dietary restrictions accommodated"
    ],
    requirements: ["Completion of initial consultation", "Guest count estimate"],
    actionItems: [
      { type: "vendor" as const, description: "Prepare tasting samples", completed: true },
      { type: "client" as const, description: "Provide final guest count", completed: false },
      { type: "vendor" as const, description: "Finalize menu pricing", completed: false }
    ]
  },
  {
    id: "3",
    name: "Contract & Planning",
    description: "Finalize contract and detailed event planning",
    duration: 21,
    status: "blocked" as const,
    estimatedStart: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
    requiresPayment: true,
    paymentAmount: 2500,
    paymentDueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    paymentStatus: "pending" as const,
    deliverables: [
      "Final contract signed",
      "Event timeline created",
      "Vendor coordination plan",
      "Setup and logistics confirmed"
    ],
    requirements: ["50% deposit payment required", "Menu finalized", "Venue access confirmed"],
    actionItems: [
      { type: "client" as const, description: "Make 50% deposit payment", completed: false },
      { type: "vendor" as const, description: "Send final contract", completed: false },
      { type: "client" as const, description: "Provide venue contact details", completed: false }
    ]
  },
  {
    id: "4",
    name: "Final Preparations",
    description: "Final confirmations and event preparation",
    duration: 14,
    status: "pending" as const,
    estimatedStart: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    requiresPayment: false,
    deliverables: [
      "Final guest count confirmed",
      "Equipment and supplies ordered",
      "Staff assignments finalized",
      "Backup plans established"
    ],
    requirements: ["Contract signed", "Final headcount received"],
    actionItems: [
      { type: "client" as const, description: "Provide final headcount", completed: false },
      { type: "vendor" as const, description: "Confirm equipment delivery", completed: false }
    ]
  },
  {
    id: "5",
    name: "Event Execution",
    description: "Setup, service, and cleanup on event day",
    duration: 1,
    status: "pending" as const,
    estimatedStart: new Date(Date.now() + 44 * 24 * 60 * 60 * 1000),
    requiresPayment: true,
    paymentAmount: 2500,
    paymentDueDate: new Date(Date.now() + 44 * 24 * 60 * 60 * 1000),
    paymentStatus: "pending" as const,
    deliverables: [
      "On-site setup completed 2 hours before service",
      "Full meal service for confirmed guest count",
      "Professional cleanup and breakdown",
      "Final walkthrough with venue"
    ],
    requirements: ["Final payment due on event day", "Venue access granted"],
    actionItems: [
      { type: "client" as const, description: "Final payment upon completion", completed: false },
      { type: "vendor" as const, description: "Arrive for setup", completed: false }
    ]
  }
];

const ProjectTimelineView = ({ vendor, contracts, milestones }: ProjectTimelineViewProps) => {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const activeContract = contracts.find(c => c.status === 'active');
  
  // Calculate overall progress
  const completedStages = serviceStages.filter(s => s.status === 'completed').length;
  const inProgressStages = serviceStages.filter(s => s.status === 'in_progress');
  const totalProgress = completedStages + (inProgressStages.length > 0 ? inProgressStages[0].progress / 100 : 0);
  const overallProgress = (totalProgress / serviceStages.length) * 100;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "in_progress":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-gray-400" />;
      case "blocked":
        return <Lock className="w-5 h-5 text-red-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-gray-100 text-gray-600";
      case "blocked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-orange-100 text-orange-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200 animate-pulse";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getDeadlineUrgency = (date: Date | undefined) => {
    if (!date) return null;
    const daysUntil = Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntil < 0) return { 
      color: 'bg-red-100 text-red-800 border-red-300', 
      label: 'OVERDUE', 
      urgent: true,
      days: Math.abs(daysUntil)
    };
    if (daysUntil <= 7) return { 
      color: 'bg-orange-100 text-orange-800 border-orange-300', 
      label: `${daysUntil}d left`, 
      urgent: true,
      days: daysUntil
    };
    if (daysUntil <= 14) return { 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300', 
      label: `${daysUntil}d left`, 
      urgent: false,
      days: daysUntil
    };
    return { 
      color: 'bg-green-100 text-green-800 border-green-300', 
      label: `${daysUntil}d left`, 
      urgent: false,
      days: daysUntil
    };
  };

  return (
    <div className="space-y-6">
      {/* Service Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Service Delivery Timeline</CardTitle>
          <CardDescription>Track progress through vendor-defined service stages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serviceStages.map((stage, index) => (
              <Collapsible
                key={stage.id}
                open={expandedStage === stage.id}
                onOpenChange={(open) => setExpandedStage(open ? stage.id : null)}
              >
                <div 
                  className={`
                    relative border rounded-lg transition-all duration-300 cursor-pointer
                    ${expandedStage === stage.id 
                      ? 'shadow-xl ring-2 ring-primary/20 bg-accent/5' 
                      : 'hover:shadow-lg hover:-translate-y-1 hover:border-primary/40'
                    }
                    ${stage.status === 'blocked' ? 'border-red-300 bg-red-50/50' : ''}
                  `}
                >
                  {/* Payment Badge */}
                  {stage.requiresPayment && (
                    <div className={`absolute -top-3 -right-3 px-3 py-1 rounded-full border-2 flex items-center gap-1.5 text-xs font-semibold ${getPaymentStatusColor(stage.paymentStatus!)}`}>
                      <DollarSign className="w-3 h-3" />
                      ${stage.paymentAmount?.toLocaleString()}
                      {stage.paymentStatus === 'pending' && ' DUE'}
                    </div>
                  )}

                  <CollapsibleTrigger className="w-full p-4 text-left">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-200 bg-white shadow-sm">
                        {getStatusIcon(stage.status)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-base">{stage.name}</h4>
                            {stage.status === 'blocked' && (
                              <Badge className="bg-red-100 text-red-800 border-red-200">
                                <Lock className="w-3 h-3 mr-1" />
                                Blocked
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {stage.status !== 'completed' && (() => {
                              const deadline = getDeadlineUrgency(stage.estimatedStart || stage.paymentDueDate);
                              if (deadline) {
                                return (
                                  <Badge className={`${deadline.color} border flex items-center gap-1`}>
                                    {deadline.urgent && <AlertTriangle className="w-3 h-3" />}
                                    <Clock className="w-3 h-3" />
                                    {deadline.label}
                                  </Badge>
                                );
                              }
                              return null;
                            })()}
                            <Badge className={getStatusColor(stage.status)}>
                              {stage.status.replace('_', ' ')}
                            </Badge>
                            {expandedStage === stage.id ? (
                              <ChevronUp className="w-4 h-4 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-500" />
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{stage.description}</p>
                        
                        {stage.status === "in_progress" && stage.progress && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium">Progress</span>
                              <span className="text-xs text-muted-foreground">{stage.progress}%</span>
                            </div>
                            <Progress value={stage.progress} className="h-2" />
                          </div>
                        )}
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {stage.status === "completed" && stage.completedDate ? (
                              <span>Completed: {stage.completedDate.toLocaleDateString()}</span>
                            ) : stage.status === "in_progress" && stage.startDate ? (
                              <span>Started: {stage.startDate.toLocaleDateString()}</span>
                            ) : stage.estimatedStart ? (
                              <span>Est. Start: {stage.estimatedStart.toLocaleDateString()}</span>
                            ) : null}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{stage.duration} day{stage.duration !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="px-4 pb-4">
                    <Separator className="mb-4" />
                    
                    <div className="space-y-4">
                      {/* Payment Information */}
                      {stage.requiresPayment && (
                        <div className={`p-3 rounded-lg border-2 ${
                          stage.paymentStatus === 'paid' ? 'bg-green-50 border-green-200' : 
                          stage.paymentStatus === 'pending' ? 'bg-amber-50 border-amber-200' : 
                          'bg-red-50 border-red-200'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-sm flex items-center gap-2">
                              <DollarSign className="w-4 h-4" />
                              Payment Required
                            </h5>
                            {stage.paymentStatus === 'paid' && (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                          <div className="text-sm space-y-1">
                            <p><strong>Amount:</strong> ${stage.paymentAmount?.toLocaleString()}</p>
                            {stage.paymentDueDate && (
                              <p><strong>Due Date:</strong> {stage.paymentDueDate.toLocaleDateString()}</p>
                            )}
                            {stage.paymentStatus === 'pending' && (
                              <Button size="sm" className="mt-2">
                                <DollarSign className="w-3 h-3 mr-1" />
                                Make Payment
                              </Button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Requirements */}
                      {stage.requirements && stage.requirements.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <ClipboardCheck className="w-4 h-4" />
                            Requirements
                          </h5>
                          <ul className="space-y-1">
                            {stage.requirements.map((req, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Deliverables */}
                      {stage.deliverables && stage.deliverables.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Deliverables
                          </h5>
                          <ul className="space-y-1">
                            {stage.deliverables.map((deliverable, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                {stage.status === 'completed' ? (
                                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                ) : (
                                  <div className="w-4 h-4 rounded border border-gray-300 mt-0.5 flex-shrink-0" />
                                )}
                                <span>{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Action Items */}
                      {stage.actionItems && stage.actionItems.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Action Items</h5>
                          <div className="space-y-2">
                            {stage.actionItems.map((item, idx) => (
                              <div key={idx} className={`p-2 rounded-md text-sm flex items-start gap-2 ${
                                item.type === 'vendor' ? 'bg-blue-50' : 'bg-purple-50'
                              }`}>
                                {item.completed ? (
                                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                ) : (
                                  <Clock className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                )}
                                <div className="flex-1">
                                  <span className={item.completed ? 'line-through text-muted-foreground' : ''}>
                                    {item.description}
                                  </span>
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    {item.type}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </div>
                
                {index < serviceStages.length - 1 && (
                  <div className="flex justify-center my-2">
                    <ArrowRight className="w-4 h-4 text-gray-400 rotate-90" />
                  </div>
                )}
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default ProjectTimelineView;
