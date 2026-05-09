"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

interface TaskDialogProps {
  children: React.ReactNode;
}

const TaskDialog = ({ children }: TaskDialogProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    client: "",
    dueDate: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating task:", task);
    toast({
      title: "Task created",
      description: "Your task has been added successfully.",
    });
    setOpen(false);
    setTask({
      title: "",
      description: "",
      priority: "medium",
      client: "",
      dueDate: "",
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>Add a new task to your workflow</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={task.title}
              onChange={(e) =>
                setTask((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={task.description}
              onChange={(e) =>
                setTask((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Task details..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={task.priority}
                onValueChange={(value) =>
                  setTask((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? date.toLocaleDateString() : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label htmlFor="client">Assign to Client</Label>
            <Select
              value={task.client}
              onValueChange={(value) =>
                setTask((prev) => ({ ...prev, client: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select client (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                <SelectItem value="elite">Elite Events Inc</SelectItem>
                <SelectItem value="maria">Maria Rodriguez</SelectItem>
              </SelectContent>
            </Select>
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
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
