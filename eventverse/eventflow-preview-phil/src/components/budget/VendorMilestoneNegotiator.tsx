import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon,
  DollarSign,
  ArrowRight,
  Plus,
  X,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExpenseMilestone, MilestoneAdjustment } from "@/types/budget";

interface VendorMilestoneNegotiatorProps {
  originalMilestones: ExpenseMilestone[];
  onAdjustmentsChange: (adjustments: MilestoneAdjustment[]) => void;
}

const VendorMilestoneNegotiator = ({
  originalMilestones,
  onAdjustmentsChange
}: VendorMilestoneNegotiatorProps) => {
  const [adjustments, setAdjustments] = useState<Map<string, MilestoneAdjustment>>(new Map());
  const [expandedMilestones, setExpandedMilestones] = useState<Set<string>>(new Set());

  useEffect(() => {
    onAdjustmentsChange(Array.from(adjustments.values()));
  }, [adjustments, onAdjustmentsChange]);

  const handleMilestoneAdjustment = (
    milestoneId: string,
    field: keyof Pick<ExpenseMilestone, 'name' | 'description' | 'paymentAmount' | 'dueDate'>,
    value: any
  ) => {
    const original = originalMilestones.find(m => m.id === milestoneId);
    if (!original) return;

    const currentAdjustment = adjustments.get(milestoneId) || {
      milestoneId,
      originalMilestone: original,
      proposedMilestone: { ...original },
      changes: [],
      reason: ""
    };

    const proposed = { ...currentAdjustment.proposedMilestone, [field]: value };
    const changes: string[] = [];

    if (proposed.name !== original.name) changes.push('name');
    if (proposed.description !== original.description) changes.push('description');
    if (proposed.paymentAmount !== original.paymentAmount) changes.push('paymentAmount');
    if (new Date(proposed.dueDate).getTime() !== new Date(original.dueDate).getTime()) changes.push('dueDate');

    if (changes.length > 0) {
      setAdjustments(new Map(adjustments.set(milestoneId, {
        ...currentAdjustment,
        proposedMilestone: proposed,
        changes
      })));
    } else {
      const newAdjustments = new Map(adjustments);
      newAdjustments.delete(milestoneId);
      setAdjustments(newAdjustments);
    }
  };

  const handleDeliverableAdjustment = (milestoneId: string, deliverables: ExpenseMilestone['deliverables']) => {
    const original = originalMilestones.find(m => m.id === milestoneId);
    if (!original) return;

    const currentAdjustment = adjustments.get(milestoneId) || {
      milestoneId,
      originalMilestone: original,
      proposedMilestone: { ...original },
      changes: [],
      reason: ""
    };

    const proposed = { ...currentAdjustment.proposedMilestone, deliverables };
    const changes = [...currentAdjustment.changes];
    
    const deliverablesChanged = JSON.stringify(deliverables) !== JSON.stringify(original.deliverables);
    if (deliverablesChanged && !changes.includes('deliverables')) {
      changes.push('deliverables');
    } else if (!deliverablesChanged) {
      const index = changes.indexOf('deliverables');
      if (index > -1) changes.splice(index, 1);
    }

    if (changes.length > 0) {
      setAdjustments(new Map(adjustments.set(milestoneId, {
        ...currentAdjustment,
        proposedMilestone: proposed,
        changes
      })));
    } else {
      const newAdjustments = new Map(adjustments);
      newAdjustments.delete(milestoneId);
      setAdjustments(newAdjustments);
    }
  };

  const handleReasonChange = (milestoneId: string, reason: string) => {
    const adjustment = adjustments.get(milestoneId);
    if (adjustment) {
      setAdjustments(new Map(adjustments.set(milestoneId, { ...adjustment, reason })));
    }
  };

  const toggleMilestoneExpansion = (milestoneId: string) => {
    const newExpanded = new Set(expandedMilestones);
    if (newExpanded.has(milestoneId)) {
      newExpanded.delete(milestoneId);
    } else {
      newExpanded.add(milestoneId);
    }
    setExpandedMilestones(newExpanded);
  };

  const addDeliverable = (milestoneId: string) => {
    const adjustment = adjustments.get(milestoneId);
    const original = originalMilestones.find(m => m.id === milestoneId);
    if (!original) return;

    const currentDeliverables = adjustment?.proposedMilestone.deliverables || original.deliverables;
    const newDeliverables = [
      ...currentDeliverables,
      { id: Date.now().toString(), description: "", completed: false }
    ];

    handleDeliverableAdjustment(milestoneId, newDeliverables);
  };

  const updateDeliverable = (milestoneId: string, deliverableId: string, description: string) => {
    const adjustment = adjustments.get(milestoneId);
    const original = originalMilestones.find(m => m.id === milestoneId);
    if (!original) return;

    const currentDeliverables = adjustment?.proposedMilestone.deliverables || original.deliverables;
    const newDeliverables = currentDeliverables.map(d =>
      d.id === deliverableId ? { ...d, description } : d
    );

    handleDeliverableAdjustment(milestoneId, newDeliverables);
  };

  const removeDeliverable = (milestoneId: string, deliverableId: string) => {
    const adjustment = adjustments.get(milestoneId);
    const original = originalMilestones.find(m => m.id === milestoneId);
    if (!original) return;

    const currentDeliverables = adjustment?.proposedMilestone.deliverables || original.deliverables;
    const newDeliverables = currentDeliverables.filter(d => d.id !== deliverableId);

    handleDeliverableAdjustment(milestoneId, newDeliverables);
  };

  const getProposedValue = (milestoneId: string) => {
    return adjustments.get(milestoneId)?.proposedMilestone || 
           originalMilestones.find(m => m.id === milestoneId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-blue-800">
          Review the host's proposed milestones below. You can adjust payment amounts, due dates, 
          deliverables, or add/remove milestones to better match your workflow.
        </p>
      </div>

      {originalMilestones.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No milestones defined by the host.
        </div>
      ) : (
        <div className="space-y-4">
          {originalMilestones.map((original, index) => {
            const proposed = getProposedValue(original.id);
            const adjustment = adjustments.get(original.id);
            const isExpanded = expandedMilestones.has(original.id);
            const hasChanges = adjustment && adjustment.changes.length > 0;

            return (
              <Card key={original.id} className={hasChanges ? 'border-blue-500 border-2' : ''}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-muted-foreground">Milestone #{index + 1}</span>
                        {hasChanges && (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            {adjustment.changes.length} change{adjustment.changes.length > 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-base">
                        {hasChanges && adjustment.changes.includes('name') ? (
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground line-through">{original.name}</div>
                            <div className="text-blue-600">{proposed?.name}</div>
                          </div>
                        ) : (
                          original.name
                        )}
                      </CardTitle>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleMilestoneExpansion(original.id)}
                    >
                      {isExpanded ? 'Collapse' : 'Adjust'}
                    </Button>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="space-y-4">
                    {/* Name */}
                    <div>
                      <Label>Milestone Name</Label>
                      <div className="flex gap-2 items-center mt-1">
                        <Input
                          value={proposed?.name || ""}
                          onChange={(e) => handleMilestoneAdjustment(original.id, 'name', e.target.value)}
                          placeholder="Milestone name"
                        />
                        {proposed?.name !== original.name && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                            <span className="line-through">{original.name}</span>
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={proposed?.description || ""}
                        onChange={(e) => handleMilestoneAdjustment(original.id, 'description', e.target.value)}
                        placeholder="Additional details..."
                        rows={2}
                      />
                    </div>

                    {/* Payment and Due Date */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Payment Amount</Label>
                        <div className="space-y-1">
                          <Input
                            type="number"
                            value={proposed?.paymentAmount || 0}
                            onChange={(e) => handleMilestoneAdjustment(original.id, 'paymentAmount', parseFloat(e.target.value) || 0)}
                            min="0"
                            step="0.01"
                          />
                          {proposed?.paymentAmount !== original.paymentAmount && (
                            <div className="text-xs text-muted-foreground">
                              Original: ${original.paymentAmount.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label>Due Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !proposed?.dueDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {proposed?.dueDate ? format(new Date(proposed.dueDate), "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={proposed?.dueDate ? new Date(proposed.dueDate) : undefined}
                              onSelect={(date) => date && handleMilestoneAdjustment(original.id, 'dueDate', date)}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        {proposed && new Date(proposed.dueDate).getTime() !== new Date(original.dueDate).getTime() && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Original: {format(new Date(original.dueDate), "PPP")}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Deliverables</Label>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addDeliverable(original.id)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {(proposed?.deliverables || []).map((deliverable) => (
                          <div key={deliverable.id} className="flex gap-2">
                            <Input
                              value={deliverable.description}
                              onChange={(e) => updateDeliverable(original.id, deliverable.id, e.target.value)}
                              placeholder="Deliverable description..."
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeDeliverable(original.id, deliverable.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reason for Changes */}
                    {hasChanges && (
                      <div>
                        <Label>Reason for Adjustments *</Label>
                        <Textarea
                          value={adjustment?.reason || ""}
                          onChange={(e) => handleReasonChange(original.id, e.target.value)}
                          placeholder="Explain why these adjustments are necessary..."
                          rows={2}
                        />
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VendorMilestoneNegotiator;
