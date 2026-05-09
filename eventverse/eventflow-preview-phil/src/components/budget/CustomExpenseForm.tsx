import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, AlertTriangle } from "lucide-react";

interface CustomExpenseFormProps {
  customItem: {
    category: string;
    subcategory: string;
    title: string;
    description: string;
    estimatedCost: string;
    priority: 'high' | 'medium' | 'low';
    requirements: string;
  };
  remainingBudget: number;
  isCommitted: boolean;
  isFormValid: boolean;
  onFieldChange: (field: string, value: string) => void;
  onSubmit: () => void;
}

const CustomExpenseForm = ({
  customItem,
  remainingBudget,
  isCommitted,
  isFormValid,
  onFieldChange,
  onSubmit
}: CustomExpenseFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Custom Expense
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={customItem.category} 
              onValueChange={(value) => onFieldChange('category', value)}
              disabled={isCommitted}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Venue">Venue</SelectItem>
                <SelectItem value="Catering">Catering</SelectItem>
                <SelectItem value="Photography">Photography</SelectItem>
                <SelectItem value="Florals">Florals</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Audio/Visual">Audio/Visual</SelectItem>
                <SelectItem value="Transportation">Transportation</SelectItem>
                <SelectItem value="Decorations">Decorations</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={customItem.title}
              onChange={(e) => onFieldChange('title', e.target.value)}
              placeholder="e.g., Reception Venue"
              disabled={isCommitted}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={customItem.description}
            onChange={(e) => onFieldChange('description', e.target.value)}
            placeholder="Brief description of the expense"
            rows={3}
            disabled={isCommitted}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="estimatedCost">Estimated Cost *</Label>
            <Input
              id="estimatedCost"
              type="number"
              value={customItem.estimatedCost}
              onChange={(e) => onFieldChange('estimatedCost', e.target.value)}
              placeholder="0.00"
              disabled={isCommitted}
            />
            {customItem.estimatedCost && parseFloat(customItem.estimatedCost) > remainingBudget && (
              <p className="text-xs text-red-600 mt-1">
                Exceeds remaining budget (${remainingBudget.toLocaleString()})
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select 
              value={customItem.priority} 
              onValueChange={(value: 'high' | 'medium' | 'low') => onFieldChange('priority', value)}
              disabled={isCommitted}
            >
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
        </div>
        
        {!isFormValid && customItem.title && customItem.category && customItem.estimatedCost && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {parseFloat(customItem.estimatedCost) <= 0 ? "Cost must be greater than 0" :
               parseFloat(customItem.estimatedCost) > remainingBudget ? "Insufficient budget remaining" :
               "Please complete all required fields"}
            </AlertDescription>
          </Alert>
        )}
        
        <Button 
          onClick={onSubmit} 
          className="w-full"
          disabled={isCommitted || !isFormValid}
        >
          <Plus className="w-4 h-4 mr-2" />
          {isCommitted ? 'Budget Locked' : 
           !isFormValid ? 'Complete Form to Add' : 
           'Add to Budget'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomExpenseForm;
