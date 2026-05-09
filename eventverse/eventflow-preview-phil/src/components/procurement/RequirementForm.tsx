
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Requirement } from "./types";

interface RequirementFormProps {
  requirement?: Requirement;
  onSave: (requirement: Partial<Requirement>) => void;
  onClose: () => void;
  isEditing?: boolean;
  categories: string[];
}

const RequirementForm = ({ requirement, onSave, onClose, isEditing = false, categories }: RequirementFormProps) => {
  const [formData, setFormData] = useState({
    title: requirement?.title || "",
    description: requirement?.description || "",
    category: requirement?.category || "",
    budgetAllocated: requirement?.budgetAllocated || 0,
    specifications: requirement?.specifications || "",
    quantity: requirement?.quantity || 1,
    deadline: requirement?.deadline || new Date(),
    specialInstructions: requirement?.specialInstructions || "",
    deliveryLocation: requirement?.deliveryLocation || ""
  });

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Requirement" : "Create New Requirement"}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Wedding Photography Services"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="budget">Budget Allocated *</Label>
              <Input
                id="budget"
                type="number"
                value={formData.budgetAllocated}
                onChange={(e) => setFormData({ ...formData, budgetAllocated: Number(e.target.value) })}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of what you need..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="specifications">Specifications & Requirements</Label>
            <Textarea
              id="specifications"
              value={formData.specifications}
              onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
              placeholder="Technical specifications, quality requirements, etc."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                min="1"
              />
            </div>
            
            <div>
              <Label>Deadline *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.deadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.deadline ? format(formData.deadline, "PPP") : "Select deadline"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.deadline}
                    onSelect={(date) => date && setFormData({ ...formData, deadline: date })}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label htmlFor="location">Delivery Location</Label>
            <Input
              id="location"
              value={formData.deliveryLocation}
              onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
              placeholder="Event venue address or delivery location"
            />
          </div>

          <div>
            <Label htmlFor="instructions">Special Instructions</Label>
            <Textarea
              id="instructions"
              value={formData.specialInstructions}
              onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
              placeholder="Any special requirements, accessibility needs, timing constraints..."
              rows={2}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{isEditing ? "Update" : "Create"} Requirement</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequirementForm;
