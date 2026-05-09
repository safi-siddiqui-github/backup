import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExpenseMilestone } from "@/types/budget";

interface MilestoneFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (milestone: Omit<ExpenseMilestone, 'id'> | ExpenseMilestone) => void;
  milestone: ExpenseMilestone | null;
  allocatedBudget: number;
  existingMilestones: ExpenseMilestone[];
}

const MilestoneFormDialog = ({
  open,
  onOpenChange,
  onSave,
  milestone,
  allocatedBudget,
  existingMilestones
}: MilestoneFormDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    paymentAmount: "",
    dueDate: new Date(),
    status: 'pending' as ExpenseMilestone['status'],
  });
  const [deliverables, setDeliverables] = useState<Array<{ id: string; description: string; completed: boolean }>>([]);

  useEffect(() => {
    if (milestone) {
      setFormData({
        name: milestone.name,
        description: milestone.description || "",
        paymentAmount: milestone.paymentAmount.toString(),
        dueDate: new Date(milestone.dueDate),
        status: milestone.status,
      });
      setDeliverables(milestone.deliverables);
    } else {
      setFormData({
        name: "",
        description: "",
        paymentAmount: "",
        dueDate: new Date(),
        status: 'pending',
      });
      setDeliverables([]);
    }
  }, [milestone, open]);

  const handleAddDeliverable = () => {
    setDeliverables([
      ...deliverables,
      { id: Date.now().toString(), description: "", completed: false }
    ]);
  };

  const handleUpdateDeliverable = (id: string, description: string) => {
    setDeliverables(deliverables.map(d => 
      d.id === id ? { ...d, description } : d
    ));
  };

  const handleRemoveDeliverable = (id: string) => {
    setDeliverables(deliverables.filter(d => d.id !== id));
  };

  const calculateTotalPayments = () => {
    const otherMilestonesTotal = existingMilestones
      .filter(m => !milestone || m.id !== milestone.id)
      .reduce((sum, m) => sum + m.paymentAmount, 0);
    return otherMilestonesTotal + (parseFloat(formData.paymentAmount) || 0);
  };

  const totalPayments = calculateTotalPayments();
  const exceedsBudget = totalPayments > allocatedBudget;

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert('Please enter a milestone name');
      return;
    }

    if (!formData.paymentAmount || parseFloat(formData.paymentAmount) < 0) {
      alert('Please enter a valid payment amount (0 or greater)');
      return;
    }

    const validDeliverables = deliverables.filter(d => d.description.trim());

    const milestoneData: Omit<ExpenseMilestone, 'id'> | ExpenseMilestone = {
      ...(milestone ? { id: milestone.id } : {}),
      name: formData.name,
      description: formData.description || undefined,
      paymentAmount: parseFloat(formData.paymentAmount),
      dueDate: formData.dueDate,
      deliverables: validDeliverables,
      status: formData.status,
      completedDate: milestone?.completedDate,
    } as any;

    onSave(milestoneData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {milestone ? 'Edit Milestone' : 'Add New Milestone'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Milestone Name */}
          <div>
            <Label htmlFor="name">Milestone Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Initial Deposit, Final Payment"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Additional details about this milestone..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
            />
          </div>

          {/* Payment Amount and Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="payment">Payment Amount *</Label>
              <Input
                id="payment"
                type="number"
                placeholder="0"
                value={formData.paymentAmount}
                onChange={(e) => setFormData({ ...formData, paymentAmount: e.target.value })}
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <Label>Due Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dueDate ? format(formData.dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dueDate}
                    onSelect={(date) => date && setFormData({ ...formData, dueDate: date })}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Budget Warning */}
          {exceedsBudget && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-sm">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">Budget Exceeded</p>
                <p className="text-red-700">
                  Total milestone payments (${totalPayments.toLocaleString()}) exceed allocated budget 
                  (${allocatedBudget.toLocaleString()}) by ${(totalPayments - allocatedBudget).toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {/* Deliverables */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Deliverables</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleAddDeliverable}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Deliverable
              </Button>
            </div>
            
            {deliverables.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4 bg-muted rounded-lg">
                No deliverables added. It's recommended to add at least one deliverable.
              </p>
            ) : (
              <div className="space-y-2">
                {deliverables.map((deliverable) => (
                  <div key={deliverable.id} className="flex gap-2">
                    <Input
                      placeholder="Describe the deliverable..."
                      value={deliverable.description}
                      onChange={(e) => handleUpdateDeliverable(deliverable.id, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveDeliverable(deliverable.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {milestone ? 'Update Milestone' : 'Add Milestone'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MilestoneFormDialog;
