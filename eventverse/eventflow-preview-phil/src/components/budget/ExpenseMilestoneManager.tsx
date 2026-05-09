import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  Plus,
  Edit,
  Trash2,
  AlertCircle
} from "lucide-react";
import type { ExpenseMilestone } from "@/types/budget";
import MilestoneFormDialog from "./MilestoneFormDialog";

interface ExpenseMilestoneManagerProps {
  milestones: ExpenseMilestone[];
  allocatedBudget: number;
  onChange: (milestones: ExpenseMilestone[]) => void;
  readOnly?: boolean;
}

const ExpenseMilestoneManager = ({
  milestones,
  allocatedBudget,
  onChange,
  readOnly = false
}: ExpenseMilestoneManagerProps) => {
  const [showMilestoneDialog, setShowMilestoneDialog] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<ExpenseMilestone | null>(null);

  const totalMilestonePayments = milestones.reduce((sum, m) => sum + m.paymentAmount, 0);
  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const progressPercentage = milestones.length > 0 
    ? (completedMilestones / milestones.length) * 100 
    : 0;

  const handleAddMilestone = () => {
    setEditingMilestone(null);
    setShowMilestoneDialog(true);
  };

  const handleEditMilestone = (milestone: ExpenseMilestone) => {
    setEditingMilestone(milestone);
    setShowMilestoneDialog(true);
  };

  const handleDeleteMilestone = (milestoneId: string) => {
    const milestone = milestones.find(m => m.id === milestoneId);
    if (milestone && (milestone.status === 'in_progress' || milestone.status === 'completed')) {
      if (!confirm('This milestone is already in progress or completed. Are you sure you want to delete it?')) {
        return;
      }
    }
    onChange(milestones.filter(m => m.id !== milestoneId));
  };

  const handleSaveMilestone = (milestone: Omit<ExpenseMilestone, 'id'> | ExpenseMilestone) => {
    if ('id' in milestone && milestone.id) {
      // Update existing
      onChange(milestones.map(m => m.id === milestone.id ? milestone as ExpenseMilestone : m));
    } else {
      // Add new
      const newMilestone: ExpenseMilestone = {
        ...(milestone as Omit<ExpenseMilestone, 'id'>),
        id: Date.now().toString(),
      };
      onChange([...milestones, newMilestone]);
    }
  };

  const handleToggleDeliverable = (milestoneId: string, deliverableId: string) => {
    onChange(milestones.map(milestone => {
      if (milestone.id === milestoneId) {
        return {
          ...milestone,
          deliverables: milestone.deliverables.map(d => 
            d.id === deliverableId 
              ? { ...d, completed: !d.completed, completedDate: !d.completed ? new Date() : undefined }
              : d
          )
        };
      }
      return milestone;
    }));
  };

  const getStatusColor = (status: ExpenseMilestone['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: ExpenseMilestone['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4 animate-pulse" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Summary Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-foreground">Milestones</h3>
          <p className="text-xs text-muted-foreground">
            {milestones.length} milestone{milestones.length !== 1 ? 's' : ''} • 
            ${totalMilestonePayments.toLocaleString()} total payments
          </p>
        </div>
        {!readOnly && (
          <Button size="sm" onClick={handleAddMilestone} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Milestone
          </Button>
        )}
      </div>

      {/* Progress Overview */}
      {milestones.length > 0 && (
        <div className="p-3 bg-muted rounded-lg space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">{completedMilestones} of {milestones.length} completed</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between items-center text-xs">
            <span className={totalMilestonePayments > allocatedBudget ? 'text-red-600 font-medium' : 'text-muted-foreground'}>
              Total Payments: ${totalMilestonePayments.toLocaleString()}
            </span>
            <span className="text-muted-foreground">
              Allocated Budget: ${allocatedBudget.toLocaleString()}
            </span>
          </div>
          {totalMilestonePayments > allocatedBudget && (
            <div className="flex items-center gap-2 text-xs text-red-600 mt-2">
              <AlertCircle className="w-3 h-3" />
              Milestone payments exceed allocated budget by ${(totalMilestonePayments - allocatedBudget).toLocaleString()}
            </div>
          )}
        </div>
      )}

      {/* Milestones List */}
      <div className="space-y-3">
        {milestones.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No milestones defined yet. Add milestones to track deliverables and payments.
          </div>
        ) : (
          milestones.map((milestone, index) => {
            const completedDeliverables = milestone.deliverables.filter(d => d.completed).length;
            const deliverableProgress = milestone.deliverables.length > 0 
              ? (completedDeliverables / milestone.deliverables.length) * 100 
              : 0;

            return (
              <Card key={milestone.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground">#{index + 1}</span>
                        <h4 className="font-semibold text-foreground">{milestone.name}</h4>
                        <Badge className={`${getStatusColor(milestone.status)} border text-xs`}>
                          {getStatusIcon(milestone.status)}
                          <span className="ml-1">{milestone.status.replace('_', ' ')}</span>
                        </Badge>
                      </div>
                      {milestone.description && (
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      )}
                    </div>
                    {!readOnly && (
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleEditMilestone(milestone)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleDeleteMilestone(milestone.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Payment:</span>
                      <span className="font-semibold text-foreground">
                        ${milestone.paymentAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Due:</span>
                      <span className="font-semibold text-foreground">
                        {new Date(milestone.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {milestone.deliverables.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-muted-foreground">Deliverables</span>
                        <span className="text-muted-foreground">
                          {completedDeliverables} of {milestone.deliverables.length} completed
                        </span>
                      </div>
                      <Progress value={deliverableProgress} className="h-1.5 mb-2" />
                      <div className="space-y-2">
                        {milestone.deliverables.map(deliverable => (
                          <div 
                            key={deliverable.id}
                            className="flex items-start gap-2 text-sm"
                          >
                            <Checkbox 
                              checked={deliverable.completed}
                              onCheckedChange={() => !readOnly && handleToggleDeliverable(milestone.id, deliverable.id)}
                              disabled={readOnly}
                              className="mt-0.5"
                            />
                            <span className={deliverable.completed ? 'line-through text-muted-foreground' : 'text-foreground'}>
                              {deliverable.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <MilestoneFormDialog
        open={showMilestoneDialog}
        onOpenChange={setShowMilestoneDialog}
        onSave={handleSaveMilestone}
        milestone={editingMilestone}
        allocatedBudget={allocatedBudget}
        existingMilestones={milestones}
      />
    </div>
  );
};

export default ExpenseMilestoneManager;
