"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TicketingConfig, TicketType } from "@/types/rsvp";
import { Calendar, DollarSign, Plus, Ticket, Trash2 } from "lucide-react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: TicketingConfig) => void;
  initialConfig?: Partial<TicketingConfig>;
}

const TicketingConfigModal = ({
  isOpen,
  onClose,
  onSave,
  initialConfig,
}: Props) => {
  const [config, setConfig] = useState<TicketingConfig>({
    ticketTypes: initialConfig?.ticketTypes || [
      {
        id: "1",
        name: "General Admission",
        price: 25,
        description: "Standard event ticket",
        quantity: 100,
        saleStartDate: "",
        saleEndDate: "",
      },
    ],
    currency: initialConfig?.currency || "USD",
    processingFee: initialConfig?.processingFee || true,
  });

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const addTicketType = () => {
    const newTicket: TicketType = {
      id: Date.now().toString(),
      name: "",
      price: 0,
      description: "",
      quantity: 50,
      saleStartDate: "",
      saleEndDate: "",
    };
    setConfig((prev) => ({
      ...prev,
      ticketTypes: [...prev.ticketTypes, newTicket],
    }));
  };

  const removeTicketType = (id: string) => {
    if (config.ticketTypes.length === 1) return; // Keep at least one ticket type
    setConfig((prev) => ({
      ...prev,
      ticketTypes: prev.ticketTypes.filter((ticket) => ticket.id !== id),
    }));
  };

  const updateTicketType = (
    id: string,
    field: keyof TicketType,
    value: string | number,
  ) => {
    setConfig((prev) => ({
      ...prev,
      ticketTypes: prev.ticketTypes.map((ticket) =>
        ticket.id === id ? { ...ticket, [field]: value } : ticket,
      ),
    }));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ticket className="text-primary h-5 w-5" />
            Ticketing Configuration
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Ticket Types</h4>
            <Button
              onClick={addTicketType}
              size="sm"
              variant="outline"
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Ticket Type
            </Button>
          </div>

          <div className="space-y-3">
            {config.ticketTypes.map((ticket, index) => (
              <Card key={ticket.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-sm">
                    <span>Ticket Type {index + 1}</span>
                    {config.ticketTypes.length > 1 && (
                      <Button
                        onClick={() => removeTicketType(ticket.id)}
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`name-${ticket.id}`}>Ticket Name *</Label>
                      <Input
                        id={`name-${ticket.id}`}
                        placeholder="e.g., Early Bird, VIP"
                        value={ticket.name}
                        onChange={(e) =>
                          updateTicketType(ticket.id, "name", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor={`price-${ticket.id}`}
                        className="flex items-center gap-1"
                      >
                        <DollarSign className="h-3 w-3" />
                        Price *
                      </Label>
                      <Input
                        id={`price-${ticket.id}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={ticket.price}
                        onChange={(e) =>
                          updateTicketType(
                            ticket.id,
                            "price",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`description-${ticket.id}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`description-${ticket.id}`}
                      placeholder="Brief description of this ticket type..."
                      value={ticket.description}
                      onChange={(e) =>
                        updateTicketType(
                          ticket.id,
                          "description",
                          e.target.value,
                        )
                      }
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor={`quantity-${ticket.id}`}>Quantity</Label>
                      <Input
                        id={`quantity-${ticket.id}`}
                        type="number"
                        min="1"
                        value={ticket.quantity}
                        onChange={(e) =>
                          updateTicketType(
                            ticket.id,
                            "quantity",
                            parseInt(e.target.value) || 1,
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor={`startDate-${ticket.id}`}
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" />
                        Sale Start
                      </Label>
                      <Input
                        id={`startDate-${ticket.id}`}
                        type="date"
                        value={ticket.saleStartDate}
                        onChange={(e) =>
                          updateTicketType(
                            ticket.id,
                            "saleStartDate",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor={`endDate-${ticket.id}`}
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" />
                        Sale End
                      </Label>
                      <Input
                        id={`endDate-${ticket.id}`}
                        type="date"
                        value={ticket.saleEndDate}
                        onChange={(e) =>
                          updateTicketType(
                            ticket.id,
                            "saleEndDate",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Ticketing Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TicketingConfigModal;
