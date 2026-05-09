"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  Calculator,
  CheckCircle,
  DollarSign,
  Edit3,
  Sparkles,
  Target,
} from "lucide-react";
import { useState } from "react";

interface BudgetSetupWizardProps {
  currentBudget: number;
  eventType: string;
  eventSize: number;
  eventDate: Date;
  isCommitted: boolean;
  onBudgetChange: (budget: number) => void;
  onGenerateRecommendations: (budget?: number) => void;
}

const BudgetSetupWizard = ({
  currentBudget,
  eventType,
  eventSize,
  eventDate,
  isCommitted,
  onBudgetChange,
  onGenerateRecommendations,
}: BudgetSetupWizardProps) => {
  const [budgetInput, setBudgetInput] = useState(currentBudget.toString());
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [tempBudget, setTempBudget] = useState(currentBudget.toString());

  const hasBudget = currentBudget > 0;

  const handleSetBudget = () => {
    const budget = parseFloat(budgetInput);
    if (budget > 0) {
      console.log("Setting budget:", budget);
      onBudgetChange(budget);
      onGenerateRecommendations(budget);
    }
  };

  const handleEditBudget = () => {
    const budget = parseFloat(tempBudget);
    if (budget > 0) {
      console.log("Updating budget:", budget);
      onBudgetChange(budget);
      setShowEditDialog(false);
      onGenerateRecommendations(budget);
    }
  };

  const getBudgetRecommendation = () => {
    const baseAmount = eventSize * 150; // Base $150 per person
    const eventMultiplier =
      eventType.toLowerCase() === "wedding"
        ? 1.5
        : eventType.toLowerCase() === "corporate"
          ? 0.8
          : 1.0;
    return Math.round(baseAmount * eventMultiplier);
  };

  const recommendedBudget = getBudgetRecommendation();

  if (!hasBudget) {
    return (
      <Card className="border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
        <CardHeader className="pb-4 text-center">
          <div className="mx-auto mb-4 w-fit rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-4">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
            Set Your Event Budget
          </CardTitle>
          <p className="mx-auto max-w-md text-gray-600">
            Get started with AI-powered budget recommendations tailored for your{" "}
            {eventType.toLowerCase()} event
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Event Summary */}
          <div className="flex justify-center gap-6 rounded-lg border bg-white/60 p-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">
                {eventType}
              </div>
              <div className="text-sm text-gray-500">Event Type</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-purple-600">
                {eventSize}
              </div>
              <div className="text-sm text-gray-500">Guests</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-cyan-600">
                {eventDate.toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-500">Date</div>
            </div>
          </div>

          {/* Budget Input */}
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="budget-input"
                className="text-base font-medium"
              >
                Total Event Budget
              </Label>
              <div className="relative mt-2">
                <DollarSign className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <Input
                  id="budget-input"
                  type="number"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                  className="h-14 border-2 pl-12 text-center text-xl font-semibold focus:border-blue-500"
                  placeholder="0"
                  disabled={isCommitted}
                />
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  AI Recommendation
                </span>
              </div>
              <div className="mb-1 text-lg font-bold text-green-700">
                ${recommendedBudget.toLocaleString()}
              </div>
              <p className="text-sm text-green-600">
                Based on {eventSize} guests and {eventType.toLowerCase()}{" "}
                industry standards
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 border-green-300 text-green-700 hover:bg-green-100"
                onClick={() => setBudgetInput(recommendedBudget.toString())}
              >
                Use Recommendation
              </Button>
            </div>

            <Button
              onClick={handleSetBudget}
              size="lg"
              className="h-12 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-lg hover:from-blue-700 hover:to-purple-700"
              disabled={
                !budgetInput || parseFloat(budgetInput) <= 0 || isCommitted
              }
            >
              {isCommitted ? (
                "Budget Committed"
              ) : (
                <>
                  <Target className="mr-2 h-5 w-5" />
                  Start Budget Planning
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-600 p-3">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-800">
                ${currentBudget.toLocaleString()}
              </div>
              <div className="text-sm text-green-600">Total Event Budget</div>
              {isCommitted && (
                <Badge className="mt-1 bg-green-600">
                  <AlertCircle className="mr-1 h-3 w-3" />
                  Committed
                </Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Dialog
              open={showEditDialog}
              onOpenChange={setShowEditDialog}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-100"
                  disabled={isCommitted}
                >
                  <Edit3 className="mr-2 h-4 w-4" />
                  {isCommitted ? "Budget Locked" : "Edit Budget"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Total Budget</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="edit-budget">New Budget Amount</Label>
                    <div className="relative mt-2">
                      <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                      <Input
                        id="edit-budget"
                        type="number"
                        value={tempBudget}
                        onChange={(e) => setTempBudget(e.target.value)}
                        className="pl-10 text-lg"
                        placeholder="Enter new budget"
                      />
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Current budget: ${currentBudget.toLocaleString()}</p>
                    <p>Recommended: ${recommendedBudget.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={handleEditBudget}
                      disabled={!tempBudget || parseFloat(tempBudget) <= 0}
                      className="flex-1"
                    >
                      Update Budget
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowEditDialog(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetSetupWizard;
