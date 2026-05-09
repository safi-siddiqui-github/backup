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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { TicketType } from "@/types/rsvp";
import { Gift, Plus, QrCode, Send } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// interface TicketType {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   currency: string;
//   capacity: number;
//   sold: number;
//   available: number;
//   color: string;
// }

export interface Reservation {
  id?: string;
  ticketTypeId: string;
  ticketTypeName: string;
  quantity: number;
  guestName: string;
  guestEmail: string;
  reason: string;
  notes: string;
  status: "active" | "sent" | "redeemed" | "cancelled";
  createdDate?: Date;
  qrCodes: string[];
}

interface TicketReservationSystemProps {
  ticketTypes: TicketType[];
  reservations: Reservation[];
  // onReservationComplete: (reservationData: Partial<Reservation>) => void;
  onReservationComplete: (reservationData: Reservation) => void;
  onReservationsChange: (reservations: Reservation[]) => void;
}

const TicketReservationSystem = ({
  ticketTypes,
  reservations,
  onReservationComplete,
  onReservationsChange,
}: TicketReservationSystemProps) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      ticketTypeId: "",
      quantity: "1",
      guestName: "",
      guestEmail: "",
      reason: "vip",
      notes: "",
    },
  });

  const reservationReasons = [
    { value: "vip", label: "VIP Guest" },
    { value: "press", label: "Press/Media" },
    { value: "staff", label: "Staff" },
    { value: "sponsor", label: "Sponsor" },
    { value: "speaker", label: "Speaker/Presenter" },
    { value: "vendor", label: "Vendor" },
    { value: "comp", label: "Complimentary" },
    { value: "other", label: "Other" },
  ];

  type ReservationFormValues = {
    ticketTypeId: string; // dropdown or select
    quantity: string; // input as string, convert -> number
    guestName: string;
    guestEmail: string;
    reason: string;
    notes: string;
    ticketTypeName?: string; // derived, not from form
    status?: "active" | "sent" | "redeemed" | "cancelled"; // default applied later
  };

  // const handleCreateReservation = (data: Partial<Reservation>) => {

  const handleCreateReservation: SubmitHandler<ReservationFormValues> = (
    data,
  ) => {
    const selectedTicketType = ticketTypes.find(
      (t) => t.id === data.ticketTypeId,
    );
    if (!selectedTicketType) return;

    const quantity = parseInt(String(data?.quantity));
    if (quantity > (selectedTicketType?.available ?? 0)) {
      toast({
        title: "Insufficient Tickets",
        description: `Only ${selectedTicketType.available} tickets available for ${selectedTicketType.name}.`,
        variant: "destructive",
      });
      return;
    }

    const qrCodes = Array.from(
      { length: quantity },
      (_, i) => `RES_${Date.now()}_${i + 1}`,
    );

    // onReservationComplete({
    //   ticketTypeId: data.ticketTypeId ?? "",
    //   ticketTypeName: selectedTicketType.name,
    //   quantity,
    //   guestName: data.guestName ?? "",
    //   guestEmail: data.guestEmail ?? "",
    //   reason: data.reason ?? "",
    //   notes: data.notes ?? "",
    //   qrCodes,
    // });

    onReservationComplete({
      ticketTypeId: data.ticketTypeId,
      ticketTypeName: selectedTicketType.name ?? "",
      quantity,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      reason: data.reason,
      notes: data.notes,
      status: "active", // set default
      qrCodes,
      id: "",
      createdDate: undefined,
    });

    setShowCreateDialog(false);
    form.reset();
  };

  const handleSendReservation = (reservation: Reservation) => {
    // Simulate sending email
    const updatedReservations = reservations.map((r) =>
      r.id === reservation.id ? { ...r, status: "sent" as const } : r,
    );
    onReservationsChange(updatedReservations);

    toast({
      title: "Invitation Sent!",
      description: `Ticket invitation sent to ${reservation.guestEmail}`,
    });
  };

  const handleCopyQRCode = (qrCode: string) => {
    navigator.clipboard.writeText(qrCode);
    toast({
      title: "QR Code Copied",
      description: "QR code copied to clipboard",
    });
  };

  const handleCancelReservation = (reservationId: string) => {
    const reservation = reservations.find((r) => r.id === reservationId);
    if (!reservation) return;

    // Update ticket availability
    const ticketType = ticketTypes.find(
      (t) => t.id === reservation.ticketTypeId,
    );
    if (ticketType) {
      // This would need to be handled by parent component
    }

    const updatedReservations = reservations.map((r) =>
      r.id === reservationId ? { ...r, status: "cancelled" as const } : r,
    );
    onReservationsChange(updatedReservations);

    toast({
      title: "Reservation Cancelled",
      description: "Tickets have been returned to available inventory",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800";
      case "sent":
        return "bg-yellow-100 text-yellow-800";
      case "redeemed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getReasonLabel = (reason: string) => {
    return reservationReasons.find((r) => r.value === reason)?.label || reason;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Ticket Reservations</h2>
          <p className="text-purple-100">
            Reserve complimentary tickets for VIPs, staff, and sponsors
          </p>
        </div>
        <Dialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
        >
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Plus className="mr-2 h-4 w-4" />
              Reserve Tickets
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Reserve Tickets</DialogTitle>
              <DialogDescription>
                Reserve complimentary tickets for guests, staff, or VIPs
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleCreateReservation)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ticketTypeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ticket Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select ticket type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ticketTypes
                              .filter((t) => (t?.available ?? 0) > 0)
                              .map((type) => (
                                <SelectItem
                                  key={type.id}
                                  value={type.id ?? ""}
                                >
                                  {type.name} ({type.available} available)
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="10"
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
                    name="guestName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guest Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. John Smith"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="guestEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guest Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
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
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reservation Reason</FormLabel>
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
                          {reservationReasons.map((reason) => (
                            <SelectItem
                              key={reason.value}
                              value={reason.value}
                            >
                              {reason.label}
                            </SelectItem>
                          ))}
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
                      <FormLabel>Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Additional notes about this reservation..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    className="flex-1"
                  >
                    Reserve Tickets
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

      {/* Reservations List */}
      <div className="space-y-4">
        {reservations.map((reservation) => (
          <Card
            key={reservation.id}
            className="bg-white/95 backdrop-blur-sm"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    {reservation.guestName}
                    <Badge className={getStatusColor(reservation.status)}>
                      {reservation.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {reservation.ticketTypeName} × {reservation.quantity} •{" "}
                    {getReasonLabel(reservation.reason)}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {reservation.status === "active" && (
                    <Button
                      size="sm"
                      onClick={() => handleSendReservation(reservation)}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Invite
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleCancelReservation(reservation?.id ?? "")
                    }
                    disabled={reservation.status === "redeemed"}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-gray-600">Guest Details</p>
                  <p className="font-medium">{reservation.guestEmail}</p>
                  <p className="text-sm text-gray-500">
                    Reserved {reservation?.createdDate?.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">QR Codes</p>
                  <div className="flex flex-wrap gap-2">
                    {reservation.qrCodes.map((qr, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyQRCode(qr)}
                      >
                        <QrCode className="mr-1 h-4 w-4" />#{index + 1}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  {reservation.notes && (
                    <>
                      <p className="text-sm text-gray-600">Notes</p>
                      <p className="text-sm">{reservation.notes}</p>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reservations.length === 0 && (
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="py-8 text-center">
            <Gift className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No reservations yet
            </h3>
            <p className="mb-4 text-gray-600">
              Start by reserving tickets for VIPs, staff, or special guests.
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create First Reservation
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TicketReservationSystem;
