"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TicketCheckout from "@/components/general/eventpage/TicketCheckout";

interface TicketItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface EventData {
  id: number;
  image: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
}

export default function TicketCheckoutPage() {
  const router = useRouter();
  const [event, setEvent] = useState<EventData | null>(null);
  const [selectedTickets, setSelectedTickets] = useState<TicketItem[]>([]);

  useEffect(() => {
    // Get data from localStorage
    const eventData = localStorage.getItem('checkoutEvent');
    const ticketsData = localStorage.getItem('checkoutTickets');

    if (eventData) {
      try {
        setEvent(JSON.parse(eventData));
      } catch (error) {
        console.error('Error parsing event data:', error);
        router.push('/');
      }
    }

    if (ticketsData) {
      try {
        setSelectedTickets(JSON.parse(ticketsData));
      } catch (error) {
        console.error('Error parsing tickets data:', error);
        router.push('/');
      }
    }
  }, [router]);

  if (!event || selectedTickets.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return <TicketCheckout event={event} selectedTickets={selectedTickets} />;
}
