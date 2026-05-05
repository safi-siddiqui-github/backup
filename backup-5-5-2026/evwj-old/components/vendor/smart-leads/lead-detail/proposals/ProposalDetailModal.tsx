"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  X,
  MessageSquare,
  CheckCircle2,
  Edit,
  Plus,
  Trash2,
  Send,
  Calendar,
  Clock,
  ChevronDown,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Proposal } from "./types";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface TimelineSection {
  id: string;
  heading: string;
  points: string[];
  immutable?: boolean;
}

interface TimelineEntry {
  id: string;
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  paymentRequired: boolean;
  paymentAmount: number;
  sections: TimelineSection[];
}

interface ProposalDetailModalProps {
  proposal: Proposal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (proposalId: string, status: Proposal["status"]) => void;
  onSaveNew?: (proposalData: Partial<Proposal>) => void;
  onSaveEdit?: (proposalId: string, updatedData: Partial<Proposal>) => void;
  isCreateMode?: boolean;
}

export default function ProposalDetailModal({
  proposal,
  open,
  onOpenChange,
  onStatusChange,
  onSaveNew,
  onSaveEdit,
  isCreateMode = false,
}: ProposalDetailModalProps) {
  // const userStore = useUserStore();
  const [isEditMode, setIsEditMode] = useState(isCreateMode);
  const [declineDialogOpen, setDeclineDialogOpen] = useState(false);
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);

  // Get vendor name from user store or use default
  // const defaultVendorName = userStore?.user?.firstname 
  //   ? `${userStore.user.firstname}${userStore.user.lastname ? ` ${userStore.user.lastname}` : ''}`
  //   : "Demo Vendor Business";
  const defaultVendorName ="Demo Vendor Business"

  // Editable fields state - always use default vendor name for vendor's own proposals
  const [editedVendorName, setEditedVendorName] = useState(
    isCreateMode ? defaultVendorName : (proposal?.vendorName || defaultVendorName)
  );
  const [editedTotalCost, setEditedTotalCost] = useState(proposal?.totalCost || 0);
  const [editedTimeline, setEditedTimeline] = useState(proposal?.timeline || "");
  const [editedValidUntil, setEditedValidUntil] = useState(proposal?.validUntil || "");
  const [editedSubmitted, setEditedSubmitted] = useState(proposal?.submitted || new Date().toISOString().split("T")[0]);
  const [editedTerms, setEditedTerms] = useState(proposal?.termsAndConditions || "");
  const [editedCategory, setEditedCategory] = useState(proposal?.category || "");
  const [editedDescription, setEditedDescription] = useState(proposal?.description || "");
  const [editedBudget, setEditedBudget] = useState(proposal?.budget || 0);

  // Predefined categories
  const categories = [
    "Venue",
    "Catering",
    "Entertainment",
    "Photography",
    "Videography",
    "Florist",
    "Decoration",
    "Transportation",
    "Audio/Visual",
    "Security",
    "Cleaning",
    "Rental",
    "Wedding Planning",
    "Beauty Services",
  ];

  // Cost breakdown state
  const [costBreakdown, setCostBreakdown] = useState(proposal?.costBreakdown || []);

  const createSectionsFromProposal = (): TimelineSection[] => {
    if (!proposal) {
      return [
        {
          id: "deliverables",
          heading: "Deliverables",
          points: [""],
          immutable: true,
        },
        {
          id: "requirements",
          heading: "Requirements",
          points: [""],
          immutable: true,
        },
      ];
    }

    const requirementPoints =
      proposal.paymentSchedule.length > 0
        ? proposal.paymentSchedule.map(
            (milestone) =>
              `${milestone.milestone} — ${milestone.percentage}% ( $${milestone.amount.toLocaleString()} ) due ${milestone.date}`,
          )
        : ["Define requirements for this timeline"];

    const deliverablePoints =
      proposal.deliverables.length > 0
        ? proposal.deliverables
        : ["Describe the deliverables for this timeline"];

    return [
      {
        id: "deliverables",
        heading: "Deliverables",
        points: deliverablePoints,
        immutable: true,
      },
      {
        id: "requirements",
        heading: "Requirements",
        points: requirementPoints,
        immutable: true,
      },
    ];
  };

  const createInitialTimelines = (): TimelineEntry[] => {
    if (!proposal) {
      return [
        {
          id: "timeline-1",
          title: "Project Timeline",
          description: "",
          startDate: new Date().toISOString().split("T")[0],
          dueDate: "",
          paymentRequired: false,
          paymentAmount: 0,
          sections: createSectionsFromProposal(),
        },
      ];
    }

    return [
      {
        id: "timeline-1",
        title: "Project Timeline",
        description: `Key milestones for ${proposal.vendorName}`,
        startDate: proposal.submitted,
        dueDate: proposal.validUntil,
        paymentRequired: proposal.paymentSchedule.length > 0,
        paymentAmount: proposal.paymentSchedule.reduce(
          (sum, milestone) => sum + milestone.amount,
          0,
        ),
        sections: createSectionsFromProposal(),
      },
    ];
  };

  const createEmptyTimeline = (): TimelineEntry => {
    const timestamp = Date.now().toString();
    return {
      id: `timeline-${timestamp}`,
      title: "New Timeline",
      description: "",
      startDate: proposal?.submitted || new Date().toISOString().split("T")[0],
      dueDate: proposal?.validUntil || "",
      paymentRequired: false,
      paymentAmount: 0,
      sections: [
        {
          id: `deliverables-${timestamp}`,
          heading: "Deliverables",
          points: [""],
          immutable: true,
        },
        {
          id: `requirements-${timestamp}`,
          heading: "Requirements",
          points: [""],
          immutable: true,
        },
      ],
    };
  };

  const [timelines, setTimelines] = useState<TimelineEntry[]>(() => createInitialTimelines());

  // Cost breakdown handlers
  const addCostRow = () => {
    setCostBreakdown([
      ...costBreakdown,
      { item: "", quantity: 1, unitPrice: 0, total: 0 },
    ]);
  };

  const removeCostRow = (index: number) => {
    setCostBreakdown(costBreakdown.filter((_, i) => i !== index));
  };

  const updateCostRow = (index: number, field: string, value: any) => {
    const updated = [...costBreakdown];
    updated[index] = { ...updated[index], [field]: value };
    
    // Recalculate total for the row
    if (field === "quantity" || field === "unitPrice") {
      updated[index].total = updated[index].quantity * updated[index].unitPrice;
    }
    
    setCostBreakdown(updated);
    
    // Update total cost
    const newTotal = updated.reduce((sum, item) => sum + item.total, 0);
    setEditedTotalCost(newTotal);
  };

  // Timeline handlers
  const addTimeline = () => {
    setTimelines((prev) => [...prev, createEmptyTimeline()]);
  };

  const removeTimeline = (timelineId: string) => {
    setTimelines((prev) => prev.filter((timeline) => timeline.id !== timelineId));
  };

  // Calculate total payment amount across all timelines
  const calculateTotalPayments = (timelines: TimelineEntry[]): number => {
    return timelines
      .filter((t) => t.paymentRequired)
      .reduce((sum, t) => sum + (t.paymentAmount || 0), 0);
  };

  // Auto-split total cost across payment-required timelines
  const autoSplitPayments = (currentTimelines: TimelineEntry[], totalCost: number) => {
    const paymentRequiredTimelines = currentTimelines.filter((t) => t.paymentRequired);
    if (paymentRequiredTimelines.length === 0 || totalCost <= 0) return;

    const splitAmount = totalCost / paymentRequiredTimelines.length;
    const roundedAmount = Math.floor(splitAmount * 100) / 100; // Round to 2 decimals
    const remainder = totalCost - roundedAmount * paymentRequiredTimelines.length;

    setTimelines((prev) =>
      prev.map((timeline) => {
        if (timeline.paymentRequired) {
          // Add remainder to the first timeline
          const isFirst = paymentRequiredTimelines[0].id === timeline.id;
          return {
            ...timeline,
            paymentAmount: isFirst ? roundedAmount + remainder : roundedAmount,
          };
        }
        return timeline;
      }),
    );
  };

  const updateTimelineField = <K extends keyof TimelineEntry>(
    timelineId: string,
    key: K,
    value: TimelineEntry[K],
  ) => {
    setTimelines((prev) => {
      const updated = prev.map((timeline) =>
        timeline.id === timelineId ? { ...timeline, [key]: value } : timeline,
      );

      // If paymentRequired is being enabled and no payments exist, auto-split
      if (key === "paymentRequired" && value === true) {
        const existingPayments = calculateTotalPayments(
          prev.filter((t) => t.id !== timelineId && t.paymentRequired)
        );
        if (existingPayments === 0 && editedTotalCost > 0) {
          // Auto-split when enabling first payment
          setTimeout(() => autoSplitPayments(updated, editedTotalCost), 0);
        }
      }

      return updated;
    });
  };

  const addSectionToTimeline = (timelineId: string) => {
    setTimelines((prev) =>
      prev.map((timeline) =>
        timeline.id === timelineId
          ? {
              ...timeline,
              sections: [
                ...timeline.sections,
                {
                  id: `section-${timeline.sections.length + 1}-${Date.now()}`,
                  heading: "New Section Title",
                  points: [""],
                },
              ],
            }
          : timeline,
      ),
    );
  };

  const removeSectionFromTimeline = (timelineId: string, sectionId: string) => {
    setTimelines((prev) =>
      prev.map((timeline) => {
        if (timeline.id !== timelineId) return timeline;
        const section = timeline.sections.find((s) => s.id === sectionId);
        if (section?.immutable) return timeline;
        return {
          ...timeline,
          sections: timeline.sections.filter((s) => s.id !== sectionId),
        };
      }),
    );
  };

  const updateTimelineSectionHeading = (
    timelineId: string,
    sectionId: string,
    heading: string,
  ) => {
    setTimelines((prev) =>
      prev.map((timeline) =>
        timeline.id === timelineId
          ? {
              ...timeline,
              sections: timeline.sections.map((section) =>
                section.id === sectionId ? { ...section, heading } : section,
              ),
            }
          : timeline,
      ),
    );
  };

  const addPointToTimelineSection = (timelineId: string, sectionId: string) => {
    setTimelines((prev) =>
      prev.map((timeline) =>
        timeline.id === timelineId
          ? {
              ...timeline,
              sections: timeline.sections.map((section) =>
                section.id === sectionId
                  ? { ...section, points: [...section.points, ""] }
                  : section,
              ),
            }
          : timeline,
      ),
    );
  };

  const removePointFromTimelineSection = (
    timelineId: string,
    sectionId: string,
    pointIndex: number,
  ) => {
    setTimelines((prev) =>
      prev.map((timeline) =>
        timeline.id === timelineId
          ? {
              ...timeline,
              sections: timeline.sections.map((section) => {
                if (section.id !== sectionId) return section;
                if (section.points.length <= 1 && section.immutable) {
                  return section;
                }
                const updatedPoints = section.points.filter((_, idx) => idx !== pointIndex);
                return {
                  ...section,
                  points: updatedPoints.length === 0 ? [""] : updatedPoints,
                };
              }),
            }
          : timeline,
      ),
    );
  };

  const updateTimelineSectionPoint = (
    timelineId: string,
    sectionId: string,
    pointIndex: number,
    value: string,
  ) => {
    setTimelines((prev) =>
      prev.map((timeline) =>
        timeline.id === timelineId
          ? {
              ...timeline,
              sections: timeline.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      points: section.points.map((point, idx) =>
                        idx === pointIndex ? value : point,
                      ),
                    }
                  : section,
              ),
            }
          : timeline,
      ),
    );
  };

  // Edit mode handlers
  const handleEditToggle = () => {
    if (isCreateMode) return; // Can't toggle in create mode
    
    if (isEditMode) {
      // Cancel edit - reset to original values
      if (proposal) {
        setEditedVendorName(proposal.vendorName);
        setEditedTotalCost(proposal.totalCost);
        setEditedTimeline(proposal.timeline);
        setEditedValidUntil(proposal.validUntil);
        setEditedSubmitted(proposal.submitted);
        setEditedTerms(proposal.termsAndConditions);
        setEditedCategory(proposal.category);
        setEditedDescription(proposal.description);
        setEditedBudget(proposal.budget);
        setCostBreakdown(proposal.costBreakdown);
        setTimelines(createInitialTimelines());
      }
    }
    setIsEditMode(!isEditMode);
  };

  const handleSaveAndResend = () => {
    if (!editedVendorName.trim()) {
      toast.error("Vendor name required", {
        description: "Please provide the vendor name before saving.",
      });
      return;
    }

    if (!editedCategory.trim()) {
      toast.error("Category required", {
        description: "Please select a category for this proposal.",
      });
      return;
    }

    if (!editedTimeline.trim()) {
      toast.error("Timeline summary required", {
        description: "Please describe the proposal timeline in the summary field.",
      });
      return;
    }

    if (!editedValidUntil) {
      toast.error("Valid-until date missing", {
        description: "Please choose when this proposal expires.",
      });
      return;
    }

    if (!editedSubmitted) {
      toast.error("Submitted date missing", {
        description: "Please choose when this proposal was submitted.",
      });
      return;
    }

    const hasCostItems =
      costBreakdown.length > 0 &&
      costBreakdown.some(
        (item) =>
          item.item.trim().length > 0 &&
          item.quantity > 0 &&
          item.unitPrice > 0 &&
          item.total > 0,
      );

    if (!hasCostItems) {
      toast.error("Cost breakdown required", {
        description: "Add at least one line item with quantity and pricing.",
      });
      return;
    }

    if (!timelines.length) {
      toast.error("Timeline required", {
        description: "Create at least one timeline for this proposal.",
      });
      return;
    }

    for (const [index, timeline] of timelines.entries()) {
      const label = `Timeline ${index + 1}`;

      if (!timeline.title.trim()) {
        toast.error("Timeline title required", {
          description: `${label} needs a title.`,
        });
        return;
      }

      if (!timeline.description.trim()) {
        toast.error("Timeline description required", {
          description: `${label} needs a description.`,
        });
        return;
      }

      if (!timeline.startDate || !timeline.dueDate) {
        toast.error("Timeline dates required", {
          description: `${label} needs both a start date and a due date.`,
        });
        return;
      }

      if (timeline.paymentRequired && timeline.paymentAmount <= 0) {
        toast.error("Payment amount required", {
          description: `${label} requires a payment amount greater than zero.`,
        });
        return;
      }

      const deliverablesSection = timeline.sections.find(
        (section) => section.heading.toLowerCase() === "deliverables",
      );

      const hasDeliverables =
        deliverablesSection &&
        deliverablesSection.points.some((point) => point.trim().length > 0);

      if (!hasDeliverables) {
        toast.error("Deliverables required", {
          description: `${label} must include at least one deliverable.`,
        });
        return;
      }
    }

    // Validate total payments don't exceed total cost
    const totalPayments = calculateTotalPayments(timelines);
    if (totalPayments > editedTotalCost) {
      toast.error("Payment amounts exceed total cost", {
        description: `Total payments ($${totalPayments.toLocaleString()}) cannot exceed total cost ($${editedTotalCost.toLocaleString()}). Please adjust the payment amounts.`,
        duration: 5000,
      });
      return;
    }

    // Extract deliverables from timelines
    const allDeliverables: string[] = [];
    const allPaymentSchedule: any[] = [];
    
    timelines.forEach((timeline) => {
      const deliverablesSection = timeline.sections.find(
        (s) => s.heading.toLowerCase() === "deliverables"
      );
      if (deliverablesSection) {
        allDeliverables.push(...deliverablesSection.points.filter((p) => p.trim()));
      }
      
      if (timeline.paymentRequired && timeline.paymentAmount > 0) {
        allPaymentSchedule.push({
          milestone: timeline.title,
          percentage: 100,
          amount: timeline.paymentAmount,
          date: timeline.dueDate,
        });
      }
    });

    const proposalData: Partial<Proposal> = {
      vendorName: editedVendorName,
      vendorCompany: editedVendorName, // Can be updated if needed
      category: editedCategory,
      totalCost: editedTotalCost,
      budget: editedBudget,
      description: editedDescription,
      timeline: editedTimeline,
      validUntil: editedValidUntil,
      submitted: editedSubmitted,
      termsAndConditions: editedTerms,
      costBreakdown,
      deliverables: allDeliverables,
      paymentSchedule: allPaymentSchedule,
    };

    if (isCreateMode && onSaveNew) {
      onSaveNew(proposalData);
      toast.success("Proposal Created!", {
        description: "Your proposal has been created successfully.",
        duration: 4000,
      });
    } else if (proposal && onSaveEdit) {
      onSaveEdit(proposal.id, proposalData);
      toast.success("Proposal Updated!", {
        description: "A new version of the proposal has been created.",
        duration: 4000,
      });
    }
    
    setIsEditMode(false);
    onOpenChange(false);
  };

  const handleDecline = () => {
    if (!proposal) return;
    setDeclineDialogOpen(true);
  };

  const handleAccept = () => {
    if (!proposal) return;
    setAcceptDialogOpen(true);
  };

  const handleNegotiate = () => {
    if (!proposal) return;
    setIsEditMode(true);
    toast.info("Negotiation Mode", {
      description: "Edit the proposal details. Changes will be saved as a new version.",
      duration: 3000,
    });
  };

  const handleConfirmDecline = () => {
    if (!proposal) return;
    onStatusChange(proposal.id, "archived");
    toast.success("Proposal Declined", {
      description: `${proposal.vendorName}'s proposal has been declined and archived.`,
      duration: 3000,
    });
    setDeclineDialogOpen(false);
    onOpenChange(false);
  };

  const handleConfirmAccept = () => {
    if (!proposal) return;
    onStatusChange(proposal.id, "hired");
    toast.success("Proposal Accepted!", {
      description: `${proposal.vendorName} has been hired for ${proposal.category}. Total: $${proposal.totalCost.toLocaleString()}`,
      duration: 4000,
    });
    setAcceptDialogOpen(false);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] w-[95vw] max-w-5xl! overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <DialogTitle className="text-lg sm:text-xl">
                  {isCreateMode ? "Create New Proposal" : "Proposal Information"}
                </DialogTitle>
                {!isCreateMode && proposal?.version && proposal.version > 1 && (
                  <Badge
                    variant="secondary"
                    className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                  >
                    v{proposal.version}
                  </Badge>
                )}
              </div>
              {!isCreateMode && (
                <Button
                  variant={isEditMode ? "default" : "outline"}
                  size="sm"
                  onClick={isEditMode ? handleEditToggle : handleNegotiate}
                >
                  {isEditMode ? (
                    <>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Negotiate 
                    </>
                  )}
                </Button>
              )}
            </div>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6">
            {/* Personal Information Section */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Vendor Name
                  </Label>
                  {isEditMode ? (
                    <Input
                      value={editedVendorName}
                      onChange={(e) => setEditedVendorName(e.target.value)}
                      className="mt-1"
                      placeholder="Enter vendor name"
                      disabled
                    />
                  ) : (
                    <p className="mt-1 text-lg font-semibold">{editedVendorName}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Category
                  </Label>
                  {isEditMode ? (
                    <Select
                      value={editedCategory}
                      onValueChange={setEditedCategory}
                    >
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="mt-1 text-lg font-semibold">{editedCategory}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Total Cost
                  </Label>
                  {isEditMode ? (
                    <Input
                      type="number"
                      value={editedTotalCost}
                      onChange={(e) => setEditedTotalCost(Number(e.target.value))}
                      className="mt-1"
                      disabled
                    />
                  ) : (
                    <p className="mt-1 text-lg font-semibold text-green-600">
                      ${editedTotalCost.toLocaleString()}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Budget
                  </Label>
                  {isEditMode ? (
                    <Input
                      type="number"
                      value={editedBudget}
                      onChange={(e) => setEditedBudget(Number(e.target.value))}
                      className="mt-1"
                      placeholder="Enter budget"
                    />
                  ) : (
                    <p className="mt-1 text-lg font-semibold">
                      ${editedBudget.toLocaleString()}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Timeline Summary
                  </Label>
                  {isEditMode ? (
                    <Input
                      value={editedTimeline}
                      onChange={(e) => setEditedTimeline(e.target.value)}
                      className="mt-1"
                      placeholder="e.g., 4-6 weeks"
                    />
                  ) : (
                    <p className="mt-1 text-lg font-semibold">{editedTimeline}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Valid Until
                  </Label>
                  {isEditMode ? (
                    <Input
                      type="date"
                      value={editedValidUntil}
                      onChange={(e) => setEditedValidUntil(e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-lg font-semibold">{editedValidUntil}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Submitted Date
                  </Label>
                  {isEditMode ? (
                    <Input
                      type="date"
                      value={editedSubmitted}
                      onChange={(e) => setEditedSubmitted(e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-lg font-semibold">{editedSubmitted}</p>
                  )}
                </div>
                {isEditMode && (
                  <div className="sm:col-span-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Description
                    </Label>
                    <Textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="mt-1"
                      placeholder="Describe your proposal..."
                      rows={3}
                    />
                  </div>
                )}
              </div>
              {!isEditMode && editedDescription && (
                <div className="mt-4">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Description
                  </Label>
                  <p className="mt-1 text-sm text-muted-foreground">{editedDescription}</p>
                </div>
              )}
            </div>

            <Separator />

            {/* Cost Breakdown Section */}
            <div>
              <div className="mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h3 className="text-base sm:text-lg font-semibold">Cost Breakdown</h3>
                {isEditMode && (
                  <Button size="sm" onClick={addCostRow} variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Row
                  </Button>
                )}
              </div>
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-2 sm:p-3 text-left text-xs sm:text-sm font-medium">Item</th>
                      <th className="p-2 sm:p-3 text-right text-xs sm:text-sm font-medium">Quantity</th>
                      <th className="p-2 sm:p-3 text-right text-xs sm:text-sm font-medium">Unit Price</th>
                      <th className="p-2 sm:p-3 text-right text-xs sm:text-sm font-medium">Total</th>
                      {isEditMode && (
                        <th className="p-2 sm:p-3 text-center text-xs sm:text-sm font-medium">Action</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {costBreakdown.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2 sm:p-3 text-xs sm:text-sm">
                          {isEditMode ? (
                            <Input
                              value={item.item}
                              onChange={(e) =>
                                updateCostRow(index, "item", e.target.value)
                              }
                              placeholder="Item name"
                            />
                          ) : (
                            item.item
                          )}
                        </td>
                        <td className="p-2 sm:p-3 text-right text-xs sm:text-sm">
                          {isEditMode ? (
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateCostRow(index, "quantity", Number(e.target.value))
                              }
                              className="text-right w-20"
                            />
                          ) : (
                            item.quantity
                          )}
                        </td>
                        <td className="p-2 sm:p-3 text-right text-xs sm:text-sm">
                          {isEditMode ? (
                            <Input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) =>
                                updateCostRow(index, "unitPrice", Number(e.target.value))
                              }
                              className="text-right w-24"
                            />
                          ) : (
                            `$${item.unitPrice.toLocaleString()}`
                          )}
                        </td>
                        <td className="p-2 sm:p-3 text-right text-xs sm:text-sm font-medium">
                          ${item.total.toLocaleString()}
                        </td>
                        {isEditMode && (
                          <td className="p-2 sm:p-3 text-center">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeCostRow(index)}
                              className="h-8 w-8 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        )}
                      </tr>
                    ))}
                    <tr className="border-t bg-muted font-semibold">
                      <td colSpan={3} className="p-2 sm:p-3 text-xs sm:text-sm">
                        Total
                      </td>
                      <td className="p-2 sm:p-3 text-right text-xs sm:text-sm">
                        ${editedTotalCost.toLocaleString()}
                      </td>
                      {isEditMode && <td></td>}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <Separator />

            {/* Timelines */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Timelines</h3>
                {isEditMode && (
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      onClick={addTimeline} 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Timeline
                    </Button>
                  </div>
                )}
              </div>
              {timelines.length === 0 ? (
                <Card>
                  <CardContent className="flex h-40 items-center justify-center text-sm text-muted-foreground">
                    {isEditMode
                      ? "Add your first timeline to outline milestones and deliverables."
                      : "No timelines defined for this proposal yet."}
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {timelines.map((timeline, index) => {
                    // Check if timeline is complete (all required fields filled)
                    const isComplete = 
                      timeline.title.trim() !== "" &&
                      timeline.description.trim() !== "" &&
                      timeline.startDate !== "" &&
                      timeline.dueDate !== "" &&
                      (!timeline.paymentRequired || timeline.paymentAmount > 0) &&
                      timeline.sections.some(section => 
                        section.heading.toLowerCase() === "deliverables" &&
                        section.points.some(point => point.trim() !== "")
                      );
                    
                    return (
                    <Collapsible key={timeline.id} defaultOpen={!isComplete}>
                      <Card>
                        <CollapsibleTrigger asChild>
                          <div className="group flex cursor-pointer items-center justify-between gap-3 border-b-0 px-4 py-3 sm:px-6 group-data-[state=open]:border-b group-data-[state=open]:border-border">
                            <div className="flex flex-1 items-center gap-3 justify-between">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-base font-semibold sm:text-lg">
                                    {timeline.title || `Timeline ${index + 1}`}
                                  </h4>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground sm:text-sm">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{timeline.startDate || "No start date"}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{timeline.dueDate || "No due date"}</span>
                                  </div>
                                  {timeline.description && (
                                    <span className="line-clamp-1 max-w-[220px] sm:max-w-xs">
                                      {timeline.description}
                                    </span>
                                  )}
                                </div>
                              </div>
                            <div className="flex items-center gap-2">
                              {isEditMode && timelines.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-600 hover:text-red-700"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    removeTimeline(timeline.id);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </div>
                          </div>
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <CardContent className="space-y-6 p-4 sm:p-6">
                            {isEditMode ? (
                          <div className="space-y-6">
                            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                              <div className="flex-1 space-y-3">
                                <div>
                                  <Label className="text-sm font-semibold">Timeline Title</Label>
                                  <Input
                                    value={timeline.title}
                                    onChange={(e) =>
                                      updateTimelineField(timeline.id, "title", e.target.value)
                                    }
                                    placeholder="Enter timeline title"
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label className="text-sm font-semibold">Description</Label>
                                  <Textarea
                                    value={timeline.description}
                                    onChange={(e) =>
                                      updateTimelineField(timeline.id, "description", e.target.value)
                                    }
                                    placeholder="Describe the purpose of this timeline..."
                                    rows={3}
                                    className="mt-1 resize-none"
                                  />
                                </div>
                              </div>
                              {timelines.length > 1 && (
                                <Button
                                  variant="ghost"
                                  className="text-red-600 hover:text-red-700 self-start"
                                  onClick={() => removeTimeline(timeline.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Remove Timeline
                                </Button>
                              )}
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                              <div>
                                <Label className="text-sm font-semibold">Start Date</Label>
                                <Input
                                  type="date"
                                  value={timeline.startDate}
                                  onChange={(e) =>
                                    updateTimelineField(timeline.id, "startDate", e.target.value)
                                  }
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label className="text-sm font-semibold">Due Date</Label>
                                <Input
                                  type="date"
                                  value={timeline.dueDate}
                                  onChange={(e) =>
                                    updateTimelineField(timeline.id, "dueDate", e.target.value)
                                  }
                                  className="mt-1"
                                />
                              </div>
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                  <Label className="text-sm font-semibold">Payment Required</Label>
                                  {(() => {
                                    const totalPayments = calculateTotalPayments(timelines);
                                    const paymentRequiredCount = timelines.filter(
                                      (t) => t.paymentRequired
                                    ).length;
                                    
                                    if (paymentRequiredCount > 0) {
                                      const remaining = editedTotalCost - totalPayments;
                                      return (
                                        <div className="flex items-center gap-2">
                                          <div className={cn(
                                            "text-xs",
                                            totalPayments > editedTotalCost 
                                              ? "text-red-600 font-semibold" 
                                              : "text-muted-foreground"
                                          )}>
                                            Total: ${totalPayments.toLocaleString()} / ${editedTotalCost.toLocaleString()}
                                            {totalPayments > editedTotalCost && (
                                              <span className="ml-1">(Exceeded)</span>
                                            )}
                                            {totalPayments < editedTotalCost && remaining > 0 && (
                                              <span className="ml-1 text-green-600">(Remaining: ${remaining.toLocaleString()})</span>
                                            )}
                                          </div>
                                          {paymentRequiredCount > 1 && totalPayments !== editedTotalCost && (
                                            <Button
                                              type="button"
                                              size="sm"
                                              variant="ghost"
                                              className="h-6 px-2 text-xs"
                                              onClick={() => autoSplitPayments(timelines, editedTotalCost)}
                                            >
                                              Auto-Split
                                            </Button>
                                          )}
                                        </div>
                                      );
                                    }
                                    return null;
                                  })()}
                                </div>
                                <div className="flex items-center gap-3 rounded-lg border bg-muted/40 px-3 py-2">
                                  <Switch
                                    checked={timeline.paymentRequired}
                                    onCheckedChange={(value) => {
                                      updateTimelineField(timeline.id, "paymentRequired", value);
                                      if (!value) {
                                        updateTimelineField(timeline.id, "paymentAmount", 0);
                                        
                                        // Re-distribute remaining payments if others exist
                                        setTimeout(() => {
                                          setTimelines((current) => {
                                            const remainingTimelines = current.filter(
                                              (t) => t.paymentRequired
                                            );
                                            if (remainingTimelines.length > 0 && editedTotalCost > 0) {
                                              autoSplitPayments(current, editedTotalCost);
                                            }
                                            return current;
                                          });
                                        }, 0);
                                      }
                                    }}
                                  />
                                  <span className="text-sm text-muted-foreground">
                                    {timeline.paymentRequired ? "Required" : "Not required"}
                                  </span>
                                </div>
                                {timeline.paymentRequired && (
                                  <div className="space-y-1">
                                    <Input
                                      type="number"
                                      min={0}
                                      step="0.01"
                                      value={timeline.paymentAmount > 0 ? timeline.paymentAmount : ""}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        
                                        // Allow empty string
                                        if (value === "") {
                                          updateTimelineField(timeline.id, "paymentAmount", 0);
                                          return;
                                        }
                                        
                                        const amount = parseFloat(value);
                                        if (Number.isNaN(amount) || amount < 0) {
                                          return;
                                        }
                                        
                                        // Calculate total payments with this new amount
                                        const otherPayments = timelines
                                          .filter((t) => t.id !== timeline.id && t.paymentRequired)
                                          .reduce((sum, t) => sum + (t.paymentAmount || 0), 0);
                                        const totalPayments = otherPayments + amount;
                                        
                                        // Don't show toast, just update and show error below
                                        updateTimelineField(
                                          timeline.id,
                                          "paymentAmount",
                                          amount,
                                        );
                                      }}
                                      placeholder="Enter payment amount"
                                      className={(() => {
                                        const otherPayments = timelines
                                          .filter((t) => t.id !== timeline.id && t.paymentRequired)
                                          .reduce((sum, t) => sum + (t.paymentAmount || 0), 0);
                                        const totalPayments = otherPayments + (timeline.paymentAmount || 0);
                                        return totalPayments > editedTotalCost
                                          ? "border-red-500 focus-visible:ring-red-500"
                                          : "";
                                      })()}
                                    />
                                    {(() => {
                                      const otherPayments = timelines
                                        .filter((t) => t.id !== timeline.id && t.paymentRequired)
                                        .reduce((sum, t) => sum + (t.paymentAmount || 0), 0);
                                      const totalPayments = otherPayments + (timeline.paymentAmount || 0);
                                      const remaining = editedTotalCost - otherPayments;
                                      
                                      if (totalPayments > editedTotalCost) {
                                        return (
                                          <p className="text-xs text-red-600">
                                            Payment amount exceeds total cost. Maximum allowed: ${remaining.toLocaleString()}
                                          </p>
                                        );
                                      }
                                      
                                      if (remaining < editedTotalCost && remaining > 0 && timeline.paymentAmount > 0) {
                                        return (
                                          <p className="text-xs text-muted-foreground">
                                            Remaining: ${remaining.toLocaleString()}
                                          </p>
                                        );
                                      }
                                      
                                      return null;
                                    })()}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="space-y-5">
                              {timeline.sections.map((section) => (
                                <Card key={section.id} className="border-dashed">
                                  <CardContent className="space-y-3 p-4">
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="flex-1">
                                        {section.immutable ? (
                                          <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                            {section.heading}
                                            {section.heading.toLowerCase() === "requirements" && (
                                              <span className="text-xs font-normal text-muted-foreground">
                                                (optional)
                                              </span>
                                            )}
                                          </div>
                                        ) : (
                                          <Input
                                            value={section.heading}
                                            onChange={(e) =>
                                              updateTimelineSectionHeading(
                                                timeline.id,
                                                section.id,
                                                e.target.value,
                                              )
                                            }
                                            className="mt-1"
                                            placeholder="Section heading"
                                          />
                                        )}
                                      </div>
                                      {!section.immutable && (
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8 text-red-600 hover:text-red-700"
                                          onClick={() =>
                                            removeSectionFromTimeline(timeline.id, section.id)
                                          }
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      )}
                                    </div>

                                    <div className="space-y-2">
                                      {section.points.map((point, pointIndex) => (
                                        <div
                                          key={`${section.id}-point-${pointIndex}`}
                                          className="flex items-start gap-2"
                                        >
                                          <CheckCircle2 className="mt-2 h-4 w-4 shrink-0 text-green-600" />
                                          <div className="flex flex-1 items-center gap-2">
                                            <Input
                                              value={point}
                                              onChange={(e) =>
                                                updateTimelineSectionPoint(
                                                  timeline.id,
                                                  section.id,
                                                  pointIndex,
                                                  e.target.value,
                                                )
                                              }
                                              placeholder="Detail for this section"
                                            />
                                            {(section.points.length > 1 || !section.immutable) && (
                                              <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-600 hover:text-red-700"
                                                onClick={() =>
                                                  removePointFromTimelineSection(
                                                    timeline.id,
                                                    section.id,
                                                    pointIndex,
                                                  )
                                                }
                                              >
                                                <Trash2 className="h-4 w-4" />
                                              </Button>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>

                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="mt-2"
                                      onClick={() => addPointToTimelineSection(timeline.id, section.id)}
                                    >
                                      <Plus className="mr-2 h-3 w-3" />
                                      Add Point
                                    </Button>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addSectionToTimeline(timeline.id)}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Section
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-5">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-lg font-semibold">{timeline.title}</h4>
                                  <span className="text-xs text-muted-foreground">
                                    Timeline {index + 1}
                                  </span>
                                </div>
                                {timeline.description && (
                                  <p className="text-sm text-muted-foreground">
                                    {timeline.description}
                                  </p>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{timeline.startDate || "No start date"}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{timeline.dueDate || "No due date"}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <CheckCircle2
                                    className={cn(
                                      "h-4 w-4",
                                      timeline.paymentRequired ? "text-green-600" : "text-muted-foreground",
                                    )}
                                  />
                                  <span>
                                    {timeline.paymentRequired
                                      ? `Payment required${
                                          timeline.paymentAmount > 0
                                            ? ` ($${timeline.paymentAmount.toLocaleString()})`
                                            : ""
                                        }`
                                      : "No payment required"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {timeline.paymentRequired && (
                              <div className="rounded-lg border bg-muted/40 p-4">
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  <h5 className="text-sm font-semibold uppercase text-muted-foreground">
                                    Payment Amount
                                  </h5>
                                </div>
                                <p className="mt-2 text-lg font-semibold text-green-600">
                                  {timeline.paymentAmount > 0
                                    ? `$${timeline.paymentAmount.toLocaleString()}`
                                    : "Not specified"}
                                </p>
                              </div>
                            )}

                            <div className="space-y-4">
                              {timeline.sections.map((section) => (
                                <div key={section.id} className="rounded-lg border bg-muted/40 p-4">
                                  <div className="flex items-center gap-2">
                                    <h5 className="text-sm font-semibold uppercase text-muted-foreground">
                                      {section.heading}
                                    </h5>
                                    {section.heading.toLowerCase() === "requirements" && (
                                      <span className="text-xs font-normal lowercase text-muted-foreground">
                                        (optional)
                                      </span>
                                    )}
                                  </div>
                                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                                    {section.points
                                      .filter((point) => point.trim().length > 0)
                                      .map((point, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                                          <span>{point}</span>
                                        </li>
                                      ))}
                                    {section.points.filter((point) => point.trim().length > 0).length === 0 && (
                                      <li className="text-xs text-muted-foreground/80">
                                        No items added yet.
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
                    );
                  })}
            </div>
          )}
            </div>

            <Separator />

            {/* Terms & Conditions */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">Terms & Conditions</h3>
              {isEditMode ? (
                <Textarea
                  value={editedTerms}
                  onChange={(e) => setEditedTerms(e.target.value)}
                  rows={4}
                  placeholder="Enter terms and conditions..."
                />
              ) : (
                <Card className="bg-muted">
                  <CardContent className="p-4">
                    <p className="text-sm">{editedTerms}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Action Buttons */}
            {isEditMode ? (
              <div className="flex flex-col sm:flex-row gap-3">
                {!isCreateMode && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleEditToggle}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={handleSaveAndResend}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isCreateMode ? (
                    "Create Proposal"
                  ) : (
                    <>
                      <span className="hidden sm:inline">Save & Create New Version</span>
                      <span className="sm:hidden">Save & Update</span>
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="outline"
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={handleDecline}
                >
                  <X className="mr-2 h-4 w-4" />
                  Decline
                </Button>
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={handleAccept}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Accept
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Decline Confirmation Dialog */}
      {proposal && (
        <ConfirmationDialog
          open={declineDialogOpen}
          onOpenChange={setDeclineDialogOpen}
          onConfirm={handleConfirmDecline}
          title="Decline Proposal?"
          description={`Are you sure you want to decline ${proposal.vendorName}'s proposal? This will move the proposal to the Archived tab and cannot be undone.`}
          confirmText="Decline Proposal"
          variant="destructive"
        />
      )}

      {/* Accept Confirmation Dialog */}
      {proposal && (
        <ConfirmationDialog
          open={acceptDialogOpen}
          onOpenChange={setAcceptDialogOpen}
          onConfirm={handleConfirmAccept}
          title="Accept Proposal?"
          description={`Are you sure you want to accept ${proposal.vendorName}'s proposal for ${proposal.category}? Total Cost: $${proposal.totalCost.toLocaleString()}. This will move the proposal to the Hired tab.`}
          confirmText="Accept Proposal"
          variant="success"
        />
      )}
    </>
  );
}

