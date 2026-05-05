"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
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
import { CalendarIcon, X, Plus, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Client, Invoice, InvoiceItem, mockClients } from "../../../mockClients";
import { formatCurrency } from "../../../utils/formatCurrency";

const invoiceItemSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(0.01, "Quantity must be greater than 0"),
  rate: z.number().min(0, "Rate must be greater than or equal to 0"),
  amount: z.number(),
});

const invoiceSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  dueDate: z.date(),
  items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
  paymentTerms: z.string().min(1, "Payment terms are required"),
  taxRate: z.number().min(0).max(100),
  notes: z.string().optional(),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

interface CreateInvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client?: Client | null;
  onSuccess: (invoice: Invoice) => void;
}

export default function CreateInvoiceModal({
  open,
  onOpenChange,
  client,
  onSuccess,
}: CreateInvoiceModalProps) {
  const [invoiceNumber, setInvoiceNumber] = useState(
    `INV-${Math.floor(100000 + Math.random() * 900000)}`
  );
  const [updateTrigger, setUpdateTrigger] = useState(0);

  // Get active clients for selection when no client is provided
  const activeClients = useMemo(() => {
    return mockClients.filter(c => c.status === "active");
  }, []);

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      clientId: client?.id || "",
      invoiceNumber: invoiceNumber,
      dueDate: undefined,
      items: [
        {
          id: `item-${Date.now()}`,
          description: "",
          quantity: 1,
          rate: 0,
          amount: 0,
        },
      ],
      paymentTerms: "Net 30",
      taxRate: 8.5,
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const watchedItems = form.watch("items");
  const watchedTaxRate = form.watch("taxRate");
  const watchedDueDate = form.watch("dueDate");
  const watchedPaymentTerms = form.watch("paymentTerms");
  
  // Helper function to calculate item amount and trigger summary update
  const calculateItemAmount = (index: number, quantity?: number, rate?: number) => {
    const qty = quantity !== undefined ? quantity : (Number(form.getValues(`items.${index}.quantity`)) || 0);
    const rte = rate !== undefined ? rate : (Number(form.getValues(`items.${index}.rate`)) || 0);
    const amount = qty * rte;
    form.setValue(`items.${index}.amount`, amount, { shouldValidate: false, shouldDirty: true });
    // Force component re-render to update summary
    setUpdateTrigger(prev => prev + 1);
  };

  // Helper function to calculate due date based on payment terms
  const calculateDueDate = (paymentTerms: string): Date => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    if (paymentTerms === "Due on Receipt") {
      return today;
    }
    
    // Extract number from "Net 15", "Net 30", etc.
    const match = paymentTerms.match(/Net\s+(\d+)/);
    if (match) {
      const days = parseInt(match[1], 10);
      const dueDate = new Date(today);
      dueDate.setDate(today.getDate() + days);
      return dueDate;
    }
    
    // Default to Net 30 if pattern doesn't match
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + 30);
    return dueDate;
  };

  // Generate new invoice number when modal opens
  useEffect(() => {
    if (open) {
      const newNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
      setInvoiceNumber(newNumber);
      const defaultPaymentTerms = "Net 30";
      const defaultDueDate = calculateDueDate(defaultPaymentTerms);
      form.setValue("invoiceNumber", newNumber);
      form.reset({
        clientId: client?.id || "",
        invoiceNumber: newNumber,
        dueDate: defaultDueDate,
        items: [
          {
            id: `item-${Date.now()}`,
            description: "",
            quantity: 1,
            rate: 0,
            amount: 0,
          },
        ],
        paymentTerms: defaultPaymentTerms,
        taxRate: 8.5,
        notes: "",
      });
    }
  }, [open, client?.id, form]);

  // Update due date when payment terms change
  useEffect(() => {
    if (watchedPaymentTerms) {
      const newDueDate = calculateDueDate(watchedPaymentTerms);
      form.setValue("dueDate", newDueDate, { shouldValidate: true, shouldDirty: true });
    }
  }, [watchedPaymentTerms, form]);

  const addItem = () => {
    const newIndex = fields.length;
    append({
      id: `item-${Date.now()}`,
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    });
    // Calculate amount for the new item after a brief delay to ensure form state is updated
    setTimeout(() => {
      calculateItemAmount(newIndex, 1, 0);
    }, 0);
  };

  const removeItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  // Calculate totals - calculate directly from watched items to ensure real-time updates
  // Use updateTrigger to force recalculation when values change
  const subtotal = useMemo(() => {
    return watchedItems.reduce((sum, item) => {
      const quantity = Number(item.quantity) || 0;
      const rate = Number(item.rate) || 0;
      const amount = quantity * rate;
      return sum + amount;
    }, 0);
  }, [watchedItems, updateTrigger]);

  const tax = useMemo(() => {
    return (subtotal * (Number(watchedTaxRate) || 0)) / 100;
  }, [subtotal, watchedTaxRate]);

  const total = useMemo(() => {
    return subtotal + tax;
  }, [subtotal, tax]);

  const formatDate = (date: Date) => {
    return format(date, "dd/MM/yyyy");
  };

  const onSubmit = (values: InvoiceFormValues) => {
    const invoiceItems: InvoiceItem[] = values.items.map((item) => ({
      id: item.id,
      description: item.description,
      quantity: item.quantity,
      rate: item.rate,
      amount: item.amount,
    }));

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: values.invoiceNumber,
      clientId: values.clientId,
      dueDate: formatDate(values.dueDate),
      amount: total,
      status: "draft",
      subtotal: subtotal,
      tax: tax,
      taxRate: values.taxRate,
      items: invoiceItems,
      paymentTerms: values.paymentTerms,
      notes: values.notes,
      createdAt: formatDate(new Date()),
    };

    onSuccess(newInvoice);
    onOpenChange(false);
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  const handleSaveDraft = () => {
    const values = form.getValues();
    onSubmit({
      ...values,
      dueDate: values.dueDate || new Date(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl! max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
          <DialogDescription>
            Generate a professional invoice for your client.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Invoice Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!!client}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {client ? (
                          <SelectItem value={client.id}>{client.name}</SelectItem>
                        ) : (
                          activeClients.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>dd/mm/yyyy</span>
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
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Invoice Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Invoice Items</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addItem}
                  className="bg-blue-600 hover:bg-blue-700 hover:text-white text-white border-0"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-3">
                {/* Header Row */}
                <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400 pb-2 border-b">
                  <div className="col-span-5">Description</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-2">Rate ($)</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-1"></div>
                </div>

                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-12 gap-2 items-start"
                  >
                    <FormField
                      control={form.control}
                      name={`items.${index}.description`}
                      render={({ field }) => (
                        <FormItem className="col-span-5">
                          <FormControl>
                            <Input
                              placeholder="Service description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              {...field}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value) || 0;
                                field.onChange(value);
                                // Immediately calculate amount when quantity changes
                                const currentRate = Number(form.getValues(`items.${index}.rate`)) || 0;
                                calculateItemAmount(index, value, currentRate);
                              }}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.rate`}
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="0"
                              {...field}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value) || 0;
                                field.onChange(value);
                                // Immediately calculate amount when rate changes
                                const currentQuantity = Number(form.getValues(`items.${index}.quantity`)) || 0;
                                calculateItemAmount(index, currentQuantity, value);
                              }}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.amount`}
                      render={({ field }) => {
                        // Calculate amount in real-time from quantity and rate for display
                        const quantity = Number(form.watch(`items.${index}.quantity`)) || 0;
                        const rate = Number(form.watch(`items.${index}.rate`)) || 0;
                        const calculatedAmount = quantity * rate;
                        // Sync the calculated amount with form value
                        if (Math.abs((field.value || 0) - calculatedAmount) > 0.01) {
                          field.onChange(calculatedAmount);
                        }
                        return (
                          <FormItem className="col-span-2">
                            <FormControl>
                              <Input
                                value={formatCurrency(calculatedAmount)}
                                readOnly
                                className="bg-gray-50 dark:bg-gray-800"
                              />
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(index)}
                      className="col-span-1"
                      disabled={fields.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Payment Terms & Notes */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="paymentTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Terms</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select payment terms" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Net 15">Net 15</SelectItem>
                          <SelectItem value="Net 30">Net 30</SelectItem>
                          <SelectItem value="Net 45">Net 45</SelectItem>
                          <SelectItem value="Net 60">Net 60</SelectItem>
                          <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Additional notes or terms..."
                          className="min-h-[100px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column - Invoice Summary */}
              <div>
                <div className="border rounded-lg p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
                  <Label className="text-base font-semibold">
                    Invoice Summary
                  </Label>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="font-medium">
                        {formatCurrency(subtotal)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm text-muted-foreground">
                          Tax Rate (%):
                        </Label>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="taxRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              {...field}
                              onChange={(e) => {
                                field.onChange(parseFloat(e.target.value) || 0);
                              }}
                              value={field.value || ""}
                              className="h-8"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Tax ({watchedTaxRate || 0}%):
                      </span>
                      <span className="font-medium">{formatCurrency(tax)}</span>
                    </div>

                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-lg">
                          {formatCurrency(total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
                Cancel
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                className="flex-1"
              >
                Save Draft
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Create & Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

