
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, Lock, Users, DollarSign, FileText } from "lucide-react";

interface BudgetCommitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  expenseItemsCount: number;
  totalBudget: number;
}

const BudgetCommitDialog = ({
  open,
  onOpenChange,
  onConfirm,
  expenseItemsCount,
  totalBudget
}: BudgetCommitDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Commit Budget
          </DialogTitle>
          <DialogDescription>
            You're about to make your budget visible to vendors and enable proposal submissions.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Budget Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <span>Total Budget: ${totalBudget.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Expense Items: {expenseItemsCount}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">What happens when you commit:</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 mt-0.5 text-green-600" />
                <span>Vendors can see your expense items and requirements</span>
              </div>
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 mt-0.5 text-green-600" />
                <span>Vendors can submit proposals for your project</span>
              </div>
              <div className="flex items-start gap-2">
                <Lock className="w-4 h-4 mt-0.5 text-orange-600" />
                <span>Budget editing will be locked (can be uncommitted later)</span>
              </div>
            </div>
          </div>
          
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You can uncommit your budget later if you need to make changes, but this may affect vendor proposals already submitted.
            </AlertDescription>
          </Alert>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="w-4 h-4 mr-2" />
            Commit Budget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetCommitDialog;

