"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Plus, X } from "lucide-react";
import { useState } from "react";

interface ContractDialogProps {
  children: React.ReactNode;
  clientId?: string;
}

const ContractDialog = ({ children, clientId }: ContractDialogProps) => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [newDeliverable, setNewDeliverable] = useState("");
  const [contract, setContract] = useState({
    clientName: clientId || "",
    projectName: "",
    amount: "",
    paymentTerms: "50% deposit, 50% on completion",
    template: "catering",
  });
  const { toast } = useToast();

  const contractTemplates = [
    { id: "catering", name: "Catering Service Agreement" },
    { id: "photography", name: "Photography Contract" },
    { id: "venue", name: "Venue Rental Agreement" },
    { id: "custom", name: "Custom Contract" },
  ];

  const addDeliverable = () => {
    if (
      newDeliverable.trim() &&
      !deliverables.includes(newDeliverable.trim())
    ) {
      setDeliverables([...deliverables, newDeliverable.trim()]);
      setNewDeliverable("");
    }
  };

  const removeDeliverable = (deliverable: string) => {
    setDeliverables(deliverables.filter((d) => d !== deliverable));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating contract:", {
      ...contract,
      deliverables,
      startDate,
      endDate,
    });
    toast({
      title: "Contract created",
      description: "Your contract has been created successfully.",
    });
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Contract</DialogTitle>
          <DialogDescription>
            Generate a professional contract for your client
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientName">Client Name</Label>
              <Select
                value={contract.clientName}
                onValueChange={(value) =>
                  setContract((prev) => ({ ...prev, clientName: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="elite">Elite Events Inc</SelectItem>
                  <SelectItem value="maria">Maria Rodriguez</SelectItem>
                  <SelectItem value="robert">Robert Chen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={contract.projectName}
                onChange={(e) =>
                  setContract((prev) => ({
                    ...prev,
                    projectName: e.target.value,
                  }))
                }
                placeholder="Wedding Catering Services"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="template">Contract Template</Label>
            <Select
              value={contract.template}
              onValueChange={(value) =>
                setContract((prev) => ({ ...prev, template: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {contractTemplates.map((template) => (
                  <SelectItem
                    key={template.id}
                    value={template.id}
                  >
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate
                      ? startDate.toLocaleDateString()
                      : "Select start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? endDate.toLocaleDateString() : "Select end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Contract Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={contract.amount}
                onChange={(e) =>
                  setContract((prev) => ({ ...prev, amount: e.target.value }))
                }
                placeholder="7500"
                required
              />
            </div>

            <div>
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Select
                value={contract.paymentTerms}
                onValueChange={(value) =>
                  setContract((prev) => ({ ...prev, paymentTerms: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50% deposit, 50% on completion">
                    50% deposit, 50% on completion
                  </SelectItem>
                  <SelectItem value="30% deposit, 70% on completion">
                    30% deposit, 70% on completion
                  </SelectItem>
                  <SelectItem value="100% upfront">100% upfront</SelectItem>
                  <SelectItem value="Net 30">Net 30</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Deliverables</Label>
            <div className="mb-2 flex gap-2">
              <Input
                value={newDeliverable}
                onChange={(e) => setNewDeliverable(e.target.value)}
                placeholder="Add deliverable"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addDeliverable())
                }
              />
              <Button
                type="button"
                onClick={addDeliverable}
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {deliverables.map((deliverable, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {deliverable}
                  <button
                    type="button"
                    onClick={() => removeDeliverable(deliverable)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
            >
              Create Contract
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContractDialog;
