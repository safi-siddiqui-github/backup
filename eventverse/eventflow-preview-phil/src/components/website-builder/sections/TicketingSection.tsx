import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Ticket, Users, Clock, Check, Minus, Plus } from "lucide-react";

interface TicketType {
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
    id: '1',
    name: 'Early Bird',
    price: 299,
    currency: 'USD',
    description: 'Perfect for early supporters',
    features: ['Full conference access', 'Welcome kit', 'Networking lunch', 'Certificate'],
    available: 50,
    maxPerPerson: 5,
    isPopular: true
  },
  {
    id: '2',
    name: 'Standard',
    price: 399,
    currency: 'USD',
    description: 'Complete conference experience',
    features: ['Full conference access', 'Welcome kit', 'Networking lunch', 'Certificate', 'Workshop access'],
    available: 100,
    maxPerPerson: 5
  },
  {
    id: '3',
    name: 'VIP',
    price: 599,
    currency: 'USD',
    description: 'Premium experience with exclusive perks',
    features: ['Full conference access', 'Premium welcome kit', 'VIP networking dinner', 'Certificate', 'Workshop access', 'Meet & greet with speakers', 'Priority seating'],
    available: 20,
    maxPerPerson: 2
  }
];

export const TicketingSection = ({ 
  title = "Get Your Tickets", 
  description = "Choose the perfect ticket for your needs",
  ticketTypes = defaultTicketTypes,
  style 
}: TicketingSectionProps) => {
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const updateTicketQuantity = (ticketId: string, quantity: number) => {
    const ticket = ticketTypes.find(t => t.id === ticketId);
    if (!ticket) return;

    const newQuantity = Math.max(0, Math.min(quantity, Math.min(ticket.available, ticket.maxPerPerson)));
    setSelectedTickets(prev => ({
      ...prev,
      [ticketId]: newQuantity
    }));
  };

  const getTotalPrice = () => {
    return Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
      const ticket = ticketTypes.find(t => t.id === ticketId);
      return total + (ticket ? ticket.price * quantity : 0);
    }, 0);
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((total, quantity) => total + quantity, 0);
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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  return (
    <section style={style} className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-muted-foreground">{description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {ticketTypes.map((ticket) => (
            <Card key={ticket.id} className={`relative ${ticket.isPopular ? 'ring-2 ring-primary' : ''}`}>
              {ticket.isPopular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
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
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{ticket.available} tickets available</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Max {ticket.maxPerPerson} per person</span>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateTicketQuantity(ticket.id, (selectedTickets[ticket.id] || 0) - 1)}
                        disabled={!selectedTickets[ticket.id]}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center">{selectedTickets[ticket.id] || 0}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateTicketQuantity(ticket.id, (selectedTickets[ticket.id] || 0) + 1)}
                        disabled={(selectedTickets[ticket.id] || 0) >= Math.min(ticket.available, ticket.maxPerPerson)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {selectedTickets[ticket.id] > 0 && (
                    <div className="text-center text-sm font-medium">
                      Subtotal: {formatPrice(ticket.price * selectedTickets[ticket.id], ticket.currency)}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {getTotalTickets() > 0 && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ticket className="w-5 h-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(selectedTickets)
                .filter(([_, quantity]) => quantity > 0)
                .map(([ticketId, quantity]) => {
                  const ticket = ticketTypes.find(t => t.id === ticketId);
                  if (!ticket) return null;
                  
                  return (
                    <div key={ticketId} className="flex justify-between items-center">
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
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total:</span>
                  <span>{formatPrice(getTotalPrice(), ticketTypes[0].currency)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handlePurchase}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : `Purchase ${getTotalTickets()} Ticket${getTotalTickets() !== 1 ? 's' : ''}`}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};