
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Edit } from "lucide-react";
import type { BudgetExpenseItem } from "./ComprehensiveBudgetModule";
import ExpenseMilestoneManager from "./ExpenseMilestoneManager";

interface EditExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updates: Partial<BudgetExpenseItem>) => void;
  expenseItem: BudgetExpenseItem | null;
}

const EditExpenseDialog = ({ open, onOpenChange, onSave, expenseItem }: EditExpenseDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    estimatedCost: "",
    allocatedBudget: "",
    priority: "medium" as 'high' | 'medium' | 'low',
    requirements: "",
    milestones: [] as BudgetExpenseItem['milestones']
  });

  useEffect(() => {
    if (expenseItem) {
      setFormData({
        title: expenseItem.title,
        description: expenseItem.description,
        estimatedCost: expenseItem.estimatedCost.toString(),
        allocatedBudget: expenseItem.allocatedBudget.toString(),
        priority: expenseItem.priority,
        requirements: expenseItem.requirements || "",
        milestones: expenseItem.milestones || []
      });
    }
  }, [expenseItem]);

  const handleSave = () => {
    onSave({
      title: formData.title,
      description: formData.description,
      estimatedCost: parseFloat(formData.estimatedCost),
      allocatedBudget: parseFloat(formData.allocatedBudget),
      priority: formData.priority,
      requirements: formData.requirements,
      milestones: formData.milestones
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5 text-blue-600" />
            Edit Expense Item
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="estimatedCost">Estimated Cost</Label>
              <Input
                id="estimatedCost"
                type="number"
                value={formData.estimatedCost}
                onChange={(e) => setFormData({...formData, estimatedCost: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="allocatedBudget">Allocated Budget</Label>
              <Input
                id="allocatedBudget"
                type="number"
                value={formData.allocatedBudget}
                onChange={(e) => setFormData({...formData, allocatedBudget: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select value={formData.priority} onValueChange={(value: 'high' | 'medium' | 'low') => setFormData({...formData, priority: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => setFormData({...formData, requirements: e.target.value})}
            />
          </div>

          <Separator className="my-4" />

          {/* Milestones Section */}
          <div>
            <ExpenseMilestoneManager
              milestones={formData.milestones || []}
              allocatedBudget={parseFloat(formData.allocatedBudget) || 0}
              onChange={(milestones) => setFormData({...formData, milestones})}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditExpenseDialog;
