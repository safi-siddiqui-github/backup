"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Edit2, X } from "lucide-react";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { ClientTask, Client, TaskPriority, TaskStatus } from "../../../mockClients";
import StatusBadge from "../../../components/StatusBadge";

const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
  priority: z.enum(["high", "medium", "low"]),
  status: z.enum(["pending", "in_progress", "completed", "cancelled"]),
  dueDate: z.date(),
  clientId: z.string().min(1, "Client is required"),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface ViewTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: ClientTask | null;
  client?: Client;
  onUpdate?: (updatedTask: ClientTask) => void;
}

export default function ViewTaskModal({
  open,
  onOpenChange,
  task,
  client,
  onUpdate,
}: ViewTaskModalProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      status: "pending",
      dueDate: undefined,
      clientId: "",
    },
  });

  // Initialize form when task changes
  useEffect(() => {
    if (task) {
      const dueDate = parse(task.dueDate, "dd/MM/yyyy", new Date());
      form.reset({
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        status: task.status,
        dueDate: isNaN(dueDate.getTime()) ? new Date() : dueDate,
        clientId: task.clientId,
      });
      setIsEditing(false);
    }
  }, [task, form]);

  const handleCancel = () => {
    if (task) {
      const dueDate = parse(task.dueDate, "dd/MM/yyyy", new Date());
      form.reset({
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        status: task.status,
        dueDate: isNaN(dueDate.getTime()) ? new Date() : dueDate,
        clientId: task.clientId,
      });
    }
    setIsEditing(false);
  };

  const onSubmit = (values: TaskFormValues) => {
    if (!task) return;

    const updatedTask: ClientTask = {
      ...task,
      title: values.title,
      description: values.description || undefined,
      priority: values.priority,
      status: values.status,
      dueDate: format(values.dueDate, "dd/MM/yyyy"),
    };

    onUpdate?.(updatedTask);
    setIsEditing(false);
  };

  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>{isEditing ? "Edit Task" : "Task Details"}</DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Update task information"
                  : `View task information for ${client?.name || "client"}`}
              </DialogDescription>
            </div>
            {!isEditing && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly={!isEditing}
                      className={cn(
                        "mt-1",
                        !isEditing && "bg-gray-50 dark:bg-gray-800"
                      )}
                    />
                  </FormControl>
                  {isEditing && <FormMessage />}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      readOnly={!isEditing}
                      className={cn(
                        "mt-1 min-h-[100px] resize-none",
                        !isEditing && "bg-gray-50 dark:bg-gray-800"
                      )}
                      placeholder="No description provided"
                    />
                  </FormControl>
                  {isEditing && <FormMessage />}
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    {isEditing ? (
                      <>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full bg-white dark:bg-slate-800">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </>
                    ) : (
                      <div className="mt-1">
                        <StatusBadge status={task.priority} type="priority" />
                      </div>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    {isEditing ? (
                      <>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full bg-white dark:bg-slate-800">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </>
                    ) : (
                      <div className="mt-1">
                        <StatusBadge status={task.status} type="task" />
                      </div>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  {isEditing ? (
                    <>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal bg-white dark:bg-slate-800",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </>
                  ) : (
                    <Input
                      value={task.dueDate}
                      readOnly
                      className="mt-1 bg-gray-50 dark:bg-gray-800"
                    />
                  )}
                </FormItem>
              )}
            />

            <div>
              <Label className="text-sm text-muted-foreground">Created At</Label>
              <Input
                value={task.createdAt}
                readOnly
                className="mt-1 bg-gray-50 dark:bg-gray-800"
              />
            </div>

            <DialogFooter className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                  >
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1"
                >
                  Close
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

