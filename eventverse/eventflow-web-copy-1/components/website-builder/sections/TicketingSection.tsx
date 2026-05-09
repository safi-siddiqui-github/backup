"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, Minus, Plus, Ticket, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export interface TicketType {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  available: number;
  maxPerPerson: number;
}

interface TicketingSectionProps {
  title?: string;
  description?: string;
  ticketTypes?: TicketType[];
  style?: React.CSSProperties;
}

const defaultTicketTypes: TicketType[] = [
  {
    id: "1",
    name: "Early Bird",
    price: 299,
    currency: "USD",
    description: "Perfect for early supporters",
    features: [
      "Full conference access",
      "Welcome kit",
      "Networking lunch",
      "Certificate",
    ],
    available: 50,
    maxPerPerson: 5,
    isPopular: true,
  },
  {
    id: "2",
    name: "Standard",
    price: 399,
    currency: "USD",
    description: "Complete conference experience",
    features: [
      "Full conference access",
      "Welcome kit",
      "Networking lunch",
      "Certificate",
      "Workshop access",
    ],
    available: 100,
    maxPerPerson: 5,
  },
  {
    id: "3",
    name: "VIP",
    price: 599,
    currency: "USD",
    description: "Premium experience with exclusive perks",
    features: [
      "Full conference access",
      "Premium welcome kit",
      "VIP networking dinner",
      "Certificate",
      "Workshop access",
      "Meet & greet with speakers",
      "Priority seating",
    ],
    available: 20,
    maxPerPerson: 2,
  },
];

export const TicketingSection = ({
  title = "Get Your Tickets",
  description = "Choose the perfect ticket for your needs",
  ticketTypes = defaultTicketTypes,
  style,
}: TicketingSectionProps) => {
  const [selectedTickets, setSelectedTickets] = useState<
    Record<string, number>
  >({});
  const [isProcessing, setIsProcessing] = useState(false);

  const updateTicketQuantity = (ticketId: string, quantity: number) => {
    const ticket = ticketTypes.find((t) => t.id === ticketId);
    if (!ticket) return;

    const newQuantity = Math.max(
      0,
      Math.min(quantity, Math.min(ticket.available, ticket.maxPerPerson)),
    );
    setSelectedTickets((prev) => ({
      ...prev,
      [ticketId]: newQuantity,
    }));
  };

  const getTotalPrice = () => {
    return Object.entries(selectedTickets).reduce(
      (total, [ticketId, quantity]) => {
        const ticket = ticketTypes.find((t) => t.id === ticketId);
        return total + (ticket ? ticket.price * quantity : 0);
      },
      0,
    );
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce(
      (total, quantity) => total + quantity,
      0,
    );
  };

  const handlePurchase = () => {
    const totalTickets = getTotalTickets();
    if (totalTickets === 0) {
      toast.error("Please select at least one ticket");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      toast.success("Redirecting to payment...");
      // In a real app, redirect to Stripe or payment processor
      setIsProcessing(false);
    }, 2000);
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  return (
    <section
      style={style}
      className="px-4 py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">{title}</h2>
          {description && (
            <p className="text-muted-foreground text-lg">{description}</p>
          )}
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ticketTypes.map((ticket) => (
            <Card
              key={ticket.id}
              className={`relative ${ticket.isPopular ? "ring-primary ring-2" : ""}`}
            >
              {ticket.isPopular && (
                <Badge className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 transform">
                  Most Popular
                </Badge>
              )}

              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{ticket.name}</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {formatPrice(ticket.price, ticket.currency)}
                    </div>
                  </div>
                </CardTitle>
                <p className="text-muted-foreground">{ticket.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {ticket.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>{ticket.available} tickets available</span>
                </div>

                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>Max {ticket.maxPerPerson} per person</span>
                </div>

                <div className="border-t pt-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateTicketQuantity(
                            ticket.id,
                            (selectedTickets[ticket.id] || 0) - 1,
                          )
                        }
                        disabled={!selectedTickets[ticket.id]}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">
                        {selectedTickets[ticket.id] || 0}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateTicketQuantity(
                            ticket.id,
                            (selectedTickets[ticket.id] || 0) + 1,
                          )
                        }
                        disabled={
                          (selectedTickets[ticket.id] || 0) >=
                          Math.min(ticket.available, ticket.maxPerPerson)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {selectedTickets[ticket.id] > 0 && (
                    <div className="text-center text-sm font-medium">
                      Subtotal:{" "}
                      {formatPrice(
                        ticket.price * selectedTickets[ticket.id],
                        ticket.currency,
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {getTotalTickets() > 0 && (
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(selectedTickets)
                .filter(([_, quantity]) => quantity > 0)
                .map(([ticketId, quantity]) => {
                  const ticket = ticketTypes.find((t) => t.id === ticketId);
                  if (!ticket) return null;

                  return (
                    <div
                      key={ticketId}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">
                        {ticket.name} × {quantity}
                      </span>
                      <span className="font-medium">
                        {formatPrice(ticket.price * quantity, ticket.currency)}
                      </span>
                    </div>
                  );
                })}

              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>
                    {formatPrice(getTotalPrice(), ticketTypes[0].currency)}
                  </span>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handlePurchase}
                disabled={isProcessing}
              >
                {isProcessing
                  ? "Processing..."
                  : `Purchase ${getTotalTickets()} Ticket${getTotalTickets() !== 1 ? "s" : ""}`}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};
