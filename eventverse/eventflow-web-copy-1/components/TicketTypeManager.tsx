"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { TicketType } from "@/types/rsvp";
import {
  Copy,
  Edit,
  Eye,
  EyeOff,
  Gift,
  Plus,
  Share,
  Ticket,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Order } from "./TicketingModule";

// interface TicketType {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   currency: string;
//   capacity: number;
//   sold: number;
//   available: number;
//   saleStart: Date;
//   saleEnd: Date;
//   isActive: boolean;
//   color: string;
//   features: string[];
//   accessLevel: string;
// }

interface TicketTypeManagerProps {
  ticketTypes: TicketType[];
  onTicketTypesChange: (ticketTypes: TicketType[]) => void;
  // orders: OrderType[];
  orders: Order[];
}

const TicketTypeManager = ({
  ticketTypes,
  onTicketTypesChange,
  orders,
}: TicketTypeManagerProps) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      capacity: "",
      saleStart: "",
      saleEnd: "",
      isActive: true,
      color: "#3B82F6",
      features: "",
      accessLevel: "general",
    },
  });

  // const handleCreateTicket = (data: Partial<TicketType>) => {
  //   const newTicket: Partial<TicketType> = {
  //     id: `ticket_${Date.now()}`,
  //     name: data?.name ?? "",
  //     description: data?.description ?? "",
  //     price: parseInt(String(data.price)) * 100, // Convert to cents
  //     currency: "USD",
  //     capacity: parseInt(String(data.capacity)),
  //     sold: 0,
  //     available: parseInt(String(data.capacity)),
  //     saleStart: new Date(String(data.saleStart)),
  //     saleEnd: new Date(String(data.saleEnd)),
  //     isActive: data.isActive,
  //     color: data.color,
  //     features: data?.features
  //       // ?.split(",")
  //       ?.map((f: string) => f.trim())
  //       ?.filter(Boolean),
  //     accessLevel: data.accessLevel,
  //   };

  //   onTicketTypesChange([...ticketTypes, newTicket]);
  //   setShowCreateDialog(false);
  //   form.reset();

  //   toast({
  //     title: "Ticket Type Created",
  //     description: `${newTicket.name} has been created successfully.`,
  //   });
  // };

  const handleCreateTicket: SubmitHandler<TicketFormValues> = (data) => {
    const newTicket: TicketType = {
      id: `ticket_${Date.now()}`,
      name: data.name,
      description: data.description,
      price: parseInt(data.price) * 100, // convert to cents
      currency: "USD",
      capacity: parseInt(data.capacity),
      sold: 0,
      available: parseInt(data.capacity),
      saleStart: new Date(data.saleStart),
      saleEnd: new Date(data.saleEnd),
      isActive: data.isActive,
      color: data.color,
      features: data.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      accessLevel: data.accessLevel,
    };

    onTicketTypesChange([...ticketTypes, newTicket]);
    setShowCreateDialog(false);
    form.reset();

    toast({
      title: "Ticket Type Created",
      description: `${newTicket.name} has been created successfully.`,
    });
  };

  const handleEditTicket = (ticket: TicketType) => {
    setEditingTicket(ticket);
    form.reset({
      name: ticket.name,
      description: ticket.description,
      price: ((ticket.price ?? 0) / 100).toString(),
      capacity: (ticket.capacity ?? 0).toString(),
      saleStart: new Date(String(ticket.saleStart)).toISOString().slice(0, 16),
      saleEnd: new Date(String(ticket.saleEnd)).toISOString().slice(0, 16),
      isActive: ticket.isActive,
      color: ticket.color,
      features: ticket.features.join(", "),
      accessLevel: ticket.accessLevel,
    });
  };

  type TicketFormValues = {
    name: string;
    description: string;
    price: string; // stored as string, later parsed to number
    capacity: string; // stored as string, later parsed to number
    saleStart: string; // ISO string (yyyy-MM-ddTHH:mm)
    saleEnd: string; // ISO string
    isActive: boolean;
    color: string;
    features: string; // comma-separated in the form
    accessLevel: string;
  };

  const ticketForm = useForm<TicketFormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      capacity: "",
      saleStart: "",
      saleEnd: "",
      isActive: false,
      color: "",
      features: "",
      accessLevel: "",
    },
  });

  // const handleUpdateTicket = (data: TicketType) => {
  //   if (!editingTicket) return;

  //   const updatedTicket: TicketType = {
  //     ...editingTicket,
  //     name: data.name,
  //     description: data.description,
  //     price: parseInt(String(data.price)) * 100,
  //     capacity: parseInt(String(data.capacity)),
  //     available: parseInt(String(data.capacity)) - (editingTicket?.sold ?? 0),
  //     saleStart: new Date(String(data.saleStart)),
  //     saleEnd: new Date(String(data.saleEnd)),
  //     isActive: data.isActive,
  //     color: data.color,
  //     features: data.features
  //       .split(",")
  //       .map((f: string) => f.trim())
  //       .filter(Boolean),
  //     accessLevel: data.accessLevel,
  //   };

  //   onTicketTypesChange(
  //     ticketTypes.map((t) => (t.id === editingTicket.id ? updatedTicket : t)),
  //   );
  //   setEditingTicket(null);
  //   form.reset();

  //   toast({
  //     title: "Ticket Type Updated",
  //     description: `${updatedTicket.name} has been updated successfully.`,
  //   });
  // };

  const handleUpdateTicket: SubmitHandler<TicketFormValues> = (data) => {
    if (!editingTicket) return;

    const updatedTicket: TicketType = {
      ...editingTicket,
      name: data.name,
      description: data.description,
      price: parseInt(data.price) * 100,
      capacity: parseInt(data.capacity),
      available: parseInt(data.capacity) - (editingTicket?.sold ?? 0),
      saleStart: new Date(data.saleStart),
      saleEnd: new Date(data.saleEnd),
      isActive: data.isActive,
      color: data.color,
      features: data.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      accessLevel: data.accessLevel,
    };

    onTicketTypesChange(
      ticketTypes.map((t) => (t.id === editingTicket.id ? updatedTicket : t)),
    );
    setEditingTicket(null);
    form.reset();
  };

  const handleDeleteTicket = (ticketId: string) => {
    const ticket = ticketTypes.find((t) => t.id === ticketId);
    if (ticket && (ticket.sold ?? 0) > 0) {
      toast({
        title: "Cannot Delete",
        description: "Cannot delete ticket type with existing sales.",
        variant: "destructive",
      });
      return;
    }

    onTicketTypesChange(ticketTypes.filter((t) => t.id !== ticketId));
    toast({
      title: "Ticket Type Deleted",
      description: "Ticket type has been deleted successfully.",
    });
  };

  const handleDuplicateTicket = (ticket: TicketType) => {
    const duplicatedTicket: TicketType = {
      ...ticket,
      id: `ticket_${Date.now()}`,
      name: `${ticket.name} (Copy)`,
      sold: 0,
      available: ticket.capacity,
    };

    onTicketTypesChange([...ticketTypes, duplicatedTicket]);
    toast({
      title: "Ticket Type Duplicated",
      description: `${duplicatedTicket.name} has been created.`,
    });
  };

  const toggleTicketActive = (ticketId: string) => {
    onTicketTypesChange(
      ticketTypes.map((t) =>
        t.id === ticketId ? { ...t, isActive: !t.isActive } : t,
      ),
    );
  };

  const generateSalesLink = (ticketId: string) => {
    const ticket = ticketTypes.find((t) => t.id === ticketId);
    if (ticket) {
      const salesUrl = `${window.location.origin}/tickets/${ticketId}`;
      navigator.clipboard.writeText(salesUrl);
      toast({
        title: "Sales Link Copied!",
        description: `Public sales link for ${ticket.name} copied to clipboard.`,
      });
    }
  };

  const colors = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
    "#84CC16",
    "#F97316",
    "#6366F1",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Ticket Types</h2>
          <p className="text-purple-100">
            Manage your event tickets and pricing
          </p>
        </div>
        <Dialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
        >
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Plus className="mr-2 h-4 w-4" />
              Create Ticket Type
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Ticket Type</DialogTitle>
              <DialogDescription>
                Configure your ticket details, pricing, and availability.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleCreateTicket)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ticket Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. General Admission"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="accessLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Access Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select access level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="vip">VIP</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="backstage">Backstage</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what's included with this ticket"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (USD)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="25.00"
                            step="0.01"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="100"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="saleStart"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sale Start</FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="saleEnd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sale End</FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features (comma-separated)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Event Access, Welcome Drink, VIP Lounge"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {colors.map((color) => (
                            <button
                              key={color}
                              type="button"
                              className={`h-8 w-8 rounded-full border-2 ${
                                field.value === color
                                  ? "border-black"
                                  : "border-gray-300"
                              }`}
                              style={{ backgroundColor: color }}
                              onClick={() => field.onChange(color)}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormLabel>Active</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    className="flex-1"
                  >
                    Create Ticket Type
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateDialog(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Ticket Types Grid */}
      <div className="grid gap-4">
        {ticketTypes.map((ticket) => (
          <Card
            key={ticket.id}
            className="bg-white/95 backdrop-blur-sm"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: ticket.color }}
                  />
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {ticket.name}
                      {!ticket.isActive && (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                      {ticket.available === 0 && (
                        <Badge variant="destructive">Sold Out</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{ticket.description}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => generateSalesLink(String(ticket?.id))}
                    title="Copy sales link"
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleTicketActive(String(ticket.id))}
                    title={ticket.isActive ? "Deactivate" : "Activate"}
                  >
                    {ticket.isActive ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDuplicateTicket(ticket)}
                    title="Duplicate ticket type"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditTicket(ticket)}
                        title="Edit ticket type"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Ticket Type</DialogTitle>
                        <DialogDescription>
                          Update ticket details and configuration.
                        </DialogDescription>
                      </DialogHeader>
                      {editingTicket && (
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(handleUpdateTicket)}
                            className="space-y-4"
                          >
                            {/* Same form fields as create, but pre-populated */}
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Ticket Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="accessLevel"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Access Level</FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      value={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="general">
                                          General
                                        </SelectItem>
                                        <SelectItem value="vip">VIP</SelectItem>
                                        <SelectItem value="premium">
                                          Premium
                                        </SelectItem>
                                        <SelectItem value="backstage">
                                          Backstage
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex gap-2 pt-4">
                              <Button
                                type="submit"
                                className="flex-1"
                              >
                                Update Ticket Type
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditingTicket(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </Form>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteTicket(String(ticket.id))}
                    disabled={(ticket?.sold ?? 0) > 0}
                    title="Delete ticket type"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="text-lg font-bold">
                    ${((ticket.price ?? 0) / 100).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sold / Capacity</p>
                  <p className="text-lg font-bold">
                    {ticket.sold} / {ticket.capacity}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Available</p>
                  <p className="text-lg font-bold text-green-600">
                    {ticket.available}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-lg font-bold text-blue-600">
                    $
                    {(((ticket.sold ?? 0) * (ticket.price ?? 0)) / 100).toFixed(
                      2,
                    )}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mb-4 flex gap-2">
                <Button
                  size="sm"
                  onClick={() => generateSalesLink(String(ticket.id))}
                  className="flex-1"
                >
                  <Share className="mr-2 h-4 w-4" />
                  Get Sales Link
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                >
                  <Gift className="mr-2 h-4 w-4" />
                  Reserve Tickets
                </Button>
              </div>

              {ticket.features.length > 0 && (
                <div>
                  <p className="mb-2 text-sm text-gray-600">Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {ticket.features.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {ticketTypes.length === 0 && (
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="py-8 text-center">
            <Ticket className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No ticket types yet
            </h3>
            <p className="mb-4 text-gray-600">
              Create your first ticket type to start selling tickets for your
              event.
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create First Ticket Type
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TicketTypeManager;
