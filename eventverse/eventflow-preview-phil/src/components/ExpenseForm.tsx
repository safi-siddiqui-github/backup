import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ExpenseFormData } from "@/types";

// Define types locally that extend the base types
interface Expense extends ExpenseFormData {
  id: number;
}

type ExpenseFieldHandler = (field: string, value: string | number | Date | undefined) => void;

interface Vendor {
  id: number;
  name: string;
  category: string;
  contact: string;
  rating: number;
  description: string;
}

interface BudgetCategory {
  id: string;
  name: string;
  planned: number;
  color: string;
  subcategories?: { name: string; planned: number; spent: number }[];
}

interface ExpenseFormProps {
  expense?: Expense;
  vendors: Vendor[];
  budgetCategories: BudgetCategory[];
  onSave: (expense: Partial<Expense>) => void;
  onClose: () => void;
  isEditing: boolean;
}

const ExpenseForm = ({ expense, vendors, budgetCategories, onSave, onClose, isEditing }: ExpenseFormProps) => {
  const [formData, setFormData] = useState({
    category: expense?.category || "",
    subcategory: expense?.subcategory || "none",
    vendor: expense?.vendor || "none",
    description: expense?.description || "",
    amount: expense?.amount || 0,
    date: expense?.date || new Date(),
    status: expense?.status || "planned" as Expense["status"],
    paymentMethod: expense?.paymentMethod || "none",
    dueDate: expense?.dueDate,
    notes: expense?.notes || "",
    receipt: expense?.receipt || ""
  });

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [dueDatePickerOpen, setDueDatePickerOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.description || formData.amount <= 0) return;
    
    // Convert "none" values back to empty strings before saving
    const submitData = {
      ...formData,
      vendor: formData.vendor === "none" ? "" : formData.vendor,
      paymentMethod: formData.paymentMethod === "none" ? "" : formData.paymentMethod,
      subcategory: formData.subcategory === "none" ? "" : formData.subcategory
    };
    
    onSave(submitData as Partial<Expense>);
  };

  const handleInputChange: ExpenseFieldHandler = (field: string, value: string | number | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedCategory = budgetCategories.find(cat => cat.name === formData.category);
  
  // More robust filtering to ensure no empty strings are used as SelectItem values
  const availableSubcategories = selectedCategory?.subcategories?.filter(sub => {
    const hasValidName = sub.name && typeof sub.name === 'string' && sub.name.trim() !== "";
    console.log('Subcategory filter check:', { name: sub.name, hasValidName });
    return hasValidName;
  }) || [];
  
  console.log('Available subcategories after filtering:', availableSubcategories);

  const paymentMethods = [
    "Cash", "Credit Card", "Debit Card", "Bank Transfer", "Check", "PayPal", "Venmo", "Other"
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Expense" : "Add New Expense"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {budgetCategories.map(category => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subcategory */}
            <div>
              <Label htmlFor="subcategory">Subcategory</Label>
              <Select 
                value={formData.subcategory} 
                onValueChange={(value) => handleInputChange("subcategory", value)}
                disabled={!formData.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No subcategory</SelectItem>
                  {availableSubcategories.map((subcategory, index) => (
                    <SelectItem key={`${subcategory.name}-${index}`} value={subcategory.name}>
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description of the expense"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Amount */}
            <div>
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", Number(e.target.value))}
                placeholder="0.00"
                required
                min="0"
              />
            </div>

            {/* Vendor */}
            <div>
              <Label htmlFor="vendor">Vendor</Label>
              <Select value={formData.vendor} onValueChange={(value) => handleInputChange("vendor", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No vendor selected</SelectItem>
                  {vendors.map(vendor => (
                    <SelectItem key={vendor.id} value={vendor.name}>
                      {vendor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <Label>Date *</Label>
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => {
                      handleInputChange("date", date);
                      setDatePickerOpen(false);
                    }}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Status */}
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Payment Method */}
            <div>
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No payment method</SelectItem>
                  {paymentMethods.map(method => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Due Date */}
            <div>
              <Label>Due Date</Label>
              <Popover open={dueDatePickerOpen} onOpenChange={setDueDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dueDate ? format(formData.dueDate, "PPP") : <span>No due date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dueDate}
                    onSelect={(date) => {
                      handleInputChange("dueDate", date);
                      setDueDatePickerOpen(false);
                    }}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Additional notes about this expense"
              rows={3}
            />
          </div>

          {/* Receipt Upload */}
          <div>
            <Label htmlFor="receipt">Receipt</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Upload receipt (coming soon)</p>
              <p className="text-xs text-gray-500">Drag and drop or click to browse</p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!formData.category || !formData.description || formData.amount <= 0}
            >
              {isEditing ? "Update" : "Add"} Expense
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseForm;
