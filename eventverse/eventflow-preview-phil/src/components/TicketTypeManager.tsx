import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, Copy, Eye, EyeOff, Ticket, DollarSign, Users, TrendingUp, LayoutGrid, List } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import TicketTypeDetail from "./TicketTypeDetail";
import BuyersList from "./ticketing/BuyersList";

interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  capacity: number;
  sold: number;
  available: number;
  saleStart: Date;
  saleEnd: Date;
  isActive: boolean;
  color: string;
  features: string[];
  accessLevel: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  avatar?: string;
  ticketType: string;
  ticketTypeId: string;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  purchaseDate: Date;
  checkInStatus: 'not_checked_in' | 'checked_in';
  qrCode: string;
}

interface TicketTypeManagerProps {
  ticketTypes: TicketType[];
  onTicketTypesChange: (ticketTypes: TicketType[]) => void;
  orders: Order[];
}

const TicketTypeManager = ({ ticketTypes, onTicketTypesChange, orders }: TicketTypeManagerProps) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null);
  const [selectedTicketDetail, setSelectedTicketDetail] = useState<TicketType | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      capacity: '',
      saleStart: '',
      saleEnd: '',
      isActive: true,
      color: '#3B82F6',
      features: '',
      accessLevel: 'general'
    }
  });

  const handleCreateTicket = (data: any) => {
    const newTicket: TicketType = {
      id: `ticket_${Date.now()}`,
      name: data.name,
      description: data.description,
      price: parseInt(data.price) * 100, // Convert to cents
      currency: 'USD',
      capacity: parseInt(data.capacity),
      sold: 0,
      available: parseInt(data.capacity),
      saleStart: new Date(data.saleStart),
      saleEnd: new Date(data.saleEnd),
      isActive: data.isActive,
      color: data.color,
      features: data.features.split(',').map((f: string) => f.trim()).filter(Boolean),
      accessLevel: data.accessLevel
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
      price: (ticket.price / 100).toString(),
      capacity: ticket.capacity.toString(),
      saleStart: ticket.saleStart.toISOString().slice(0, 16),
      saleEnd: ticket.saleEnd.toISOString().slice(0, 16),
      isActive: ticket.isActive,
      color: ticket.color,
      features: ticket.features.join(', '),
      accessLevel: ticket.accessLevel
    });
  };

  const handleUpdateTicket = (data: any) => {
    if (!editingTicket) return;

    const updatedTicket: TicketType = {
      ...editingTicket,
      name: data.name,
      description: data.description,
      price: parseInt(data.price) * 100,
      capacity: parseInt(data.capacity),
      available: parseInt(data.capacity) - editingTicket.sold,
      saleStart: new Date(data.saleStart),
      saleEnd: new Date(data.saleEnd),
      isActive: data.isActive,
      color: data.color,
      features: data.features.split(',').map((f: string) => f.trim()).filter(Boolean),
      accessLevel: data.accessLevel
    };

    onTicketTypesChange(ticketTypes.map(t => t.id === editingTicket.id ? updatedTicket : t));
    setEditingTicket(null);
    form.reset();
    
    toast({
      title: "Ticket Type Updated",
      description: `${updatedTicket.name} has been updated successfully.`,
    });
  };

  const handleDeleteTicket = (ticketId: string) => {
    const ticket = ticketTypes.find(t => t.id === ticketId);
    if (ticket && ticket.sold > 0) {
      toast({
        title: "Cannot Delete",
        description: "Cannot delete ticket type with existing sales.",
        variant: "destructive"
      });
      return;
    }

    onTicketTypesChange(ticketTypes.filter(t => t.id !== ticketId));
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
      available: ticket.capacity
    };

    onTicketTypesChange([...ticketTypes, duplicatedTicket]);
    toast({
      title: "Ticket Type Duplicated",
      description: `${duplicatedTicket.name} has been created.`,
    });
  };

  const toggleTicketActive = (ticketId: string) => {
    onTicketTypesChange(ticketTypes.map(t => 
      t.id === ticketId ? { ...t, isActive: !t.isActive } : t
    ));
  };

  const getTicketRevenue = (ticketId: string) => {
    return orders
      .filter(order => order.ticketTypeId === ticketId && order.status === 'paid')
      .reduce((sum, order) => sum + order.totalAmount, 0);
  };

  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Ticket Types</h2>
          <p className="text-purple-100">Manage your event tickets and pricing</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              onClick={() => setViewMode('grid')}
              className="h-8 px-3"
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              onClick={() => setViewMode('list')}
              className="h-8 px-3"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Create Ticket Type
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Ticket Type</DialogTitle>
              <DialogDescription>
                Configure your ticket details, pricing, and availability.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreateTicket)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ticket Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. General Admission" {...field} />
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        <div className="flex gap-2 flex-wrap">
                          {colors.map(color => (
                            <button
                              key={color}
                              type="button"
                              className={`w-8 h-8 rounded-full border-2 ${
                                field.value === color ? 'border-black' : 'border-gray-300'
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
                  <Button type="submit" className="flex-1">
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
      </div>

      {/* Ticket Types Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {ticketTypes.map((ticket) => {
          const soldPercentage = (ticket.sold / ticket.capacity) * 100;
          const revenue = getTicketRevenue(ticket.id);
          
          return (
            <Card 
              key={ticket.id} 
              className="bg-white/95 backdrop-blur-sm hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:bg-white"
              onClick={() => setSelectedTicketDetail(ticket)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: ticket.color }}
                    />
                    <span className="text-sm font-medium capitalize text-muted-foreground">
                      {ticket.accessLevel}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {!ticket.isActive && (
                      <Badge variant="secondary" className="text-xs">Inactive</Badge>
                    )}
                    {ticket.available === 0 && (
                      <Badge variant="destructive" className="text-xs">Sold Out</Badge>
                    )}
                  </div>
                </div>
                <div>
                  <CardTitle className="text-lg leading-tight">{ticket.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{ticket.description}</CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Price and Revenue */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-xl font-bold">${(ticket.price / 100).toFixed(0)}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Revenue</p>
                    <p className="text-sm font-medium">${(revenue / 100).toFixed(0)}</p>
                  </div>
                </div>

                {/* Sales Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {ticket.sold} sold
                    </span>
                    <span className="text-muted-foreground">{ticket.available} left</span>
                  </div>
                  <Progress value={soldPercentage} className="h-2" />
                  <div className="text-xs text-muted-foreground text-center">
                    {soldPercentage.toFixed(1)}% of {ticket.capacity} capacity
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTicketActive(ticket.id);
                    }}
                    className="flex-1 h-8"
                  >
                    {ticket.isActive ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                    {ticket.isActive ? "Active" : "Inactive"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditTicket(ticket);
                    }}
                    className="px-2 h-8"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDuplicateTicket(ticket);
                    }}
                    className="px-2 h-8"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTicket(ticket.id);
                    }}
                    disabled={ticket.sold > 0}
                    className="px-2 h-8"
                  >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>

              {/* Recent Buyers Section */}
              {orders.filter(o => o.ticketTypeId === ticket.id).length > 0 && (
                <>
                  <Separator className="my-3" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Recent Buyers</p>
                    <BuyersList
                      orders={orders.filter(o => o.ticketTypeId === ticket.id)}
                      maxDisplay={5}
                      allOrders={orders}
                    />
                  </div>
                </>
              )}
            </CardContent>
            </Card>
          );
        })}
        </div>
      ) : (
        <div className="space-y-3">
          {ticketTypes.map((ticket) => {
            const soldPercentage = (ticket.sold / ticket.capacity) * 100;
            const revenue = getTicketRevenue(ticket.id);
            
            return (
              <Card 
                key={ticket.id} 
                className="bg-white/95 backdrop-blur-sm hover:shadow-lg transition-all duration-200 cursor-pointer hover:bg-white"
                onClick={() => setSelectedTicketDetail(ticket)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    {/* Color Indicator & Basic Info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div 
                        className="w-4 h-16 rounded-full flex-shrink-0"
                        style={{ backgroundColor: ticket.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold truncate">{ticket.name}</h3>
                          <Badge variant="outline" className="text-xs capitalize flex-shrink-0">
                            {ticket.accessLevel}
                          </Badge>
                          {!ticket.isActive && (
                            <Badge variant="secondary" className="text-xs flex-shrink-0">Inactive</Badge>
                          )}
                          {ticket.available === 0 && (
                            <Badge variant="destructive" className="text-xs flex-shrink-0">Sold Out</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{ticket.description}</p>
                      </div>
                    </div>

                    {/* Price & Revenue */}
                    <div className="flex items-center gap-6 flex-shrink-0">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Price</p>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="text-xl font-bold">${(ticket.price / 100).toFixed(0)}</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                        <p className="text-lg font-medium">${(revenue / 100).toFixed(0)}</p>
                      </div>
                    </div>

                    {/* Sales Progress */}
                    <div className="w-48 flex-shrink-0">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {ticket.sold} sold
                        </span>
                        <span className="text-muted-foreground">{ticket.available} left</span>
                      </div>
                      <Progress value={soldPercentage} className="h-2" />
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        {soldPercentage.toFixed(1)}% of {ticket.capacity}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTicketActive(ticket.id);
                        }}
                        className="h-9 px-3"
                      >
                        {ticket.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditTicket(ticket);
                        }}
                        className="h-9 px-3"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateTicket(ticket);
                        }}
                        className="h-9 px-3"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTicket(ticket.id);
                        }}
                        disabled={ticket.sold > 0}
                        className="h-9 px-3"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Recent Buyers Section */}
                  {orders.filter(o => o.ticketTypeId === ticket.id).length > 0 && (
                    <>
                      <Separator className="my-4" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Recent Buyers</p>
                        <BuyersList
                          orders={orders.filter(o => o.ticketTypeId === ticket.id)}
                          maxDisplay={5}
                          allOrders={orders}
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Ticket Type Detail Modal */}
      <TicketTypeDetail
        ticketType={selectedTicketDetail}
        isOpen={!!selectedTicketDetail}
        onClose={() => setSelectedTicketDetail(null)}
        orders={orders}
      />

      {/* Edit Ticket Modal */}
      <Dialog open={!!editingTicket} onOpenChange={(open) => !open && setEditingTicket(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Ticket Type</DialogTitle>
            <DialogDescription>
              Update ticket details and configuration.
            </DialogDescription>
          </DialogHeader>
          {editingTicket && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdateTicket)} className="space-y-4">
                {/* ... keep existing form fields ... */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ticket Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. General Admission" {...field} />
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
                        <Select onValueChange={field.onChange} value={field.value}>
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

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
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

      {ticketTypes.length === 0 && (
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="py-8 text-center">
            <Ticket className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No ticket types yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first ticket type to start selling tickets for your event.
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Ticket Type
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TicketTypeManager;
