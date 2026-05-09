"use client";

import { MdLocationOn, MdCalendarToday, MdConfirmationNumber } from "react-icons/md";

interface EventData {
  id: number;
  image: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
}

interface TicketItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface EventDetailsCardProps {
  event: EventData;
  selectedTickets: TicketItem[];
}

export default function EventDetailsCard({ event, selectedTickets }: EventDetailsCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Event Image */}
        <div className="lg:w-1/2 relative mt-4 sm:mt-8 ml-4 sm:ml-8">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 sm:h-64 lg:h-80 object-cover transition-transform duration-300 hover:scale-105"
          />
          {/* Image Overlays */}
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white text-right">
            <div className="text-lg sm:text-2xl font-bold">June 11</div>
            <div className="text-sm sm:text-lg">Friday</div>
            <div className="text-xs sm:text-sm opacity-90">Door opening: 11:50</div>
          </div>
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
            <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
              <MdLocationOn className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">Central Park, New York</span>
            </div>
            <div className="text-sm sm:text-lg font-bold">{event.title}</div>
          </div>
        </div>

        {/* Event Info */}
        <div className="lg:w-1/2 p-4 sm:p-6 lg:p-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            {event.title}
          </h1>
          <span className="inline-block px-2 sm:px-3 py-1 bg-purple-600 text-white rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            {event.category}
          </span>
          
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
              <MdCalendarToday className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              <span className="text-sm sm:text-base font-medium">Friday 11 June, 11:50</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
              <MdLocationOn className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              <span className="text-sm sm:text-base font-medium">{event.location}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Purple Separator Line with proper margins */}
      <hr className="mx-4 sm:mx-6 mt-4 sm:mt-6 border-1 border-solid border-[#9747FF]"></hr>
      
      {/* Tickets Section - Part of Main Section */}
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
          Tickets ({selectedTickets.reduce((total, ticket) => total + ticket.quantity, 0)})
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Left side - 2 rows */}
          <div className="space-y-3 sm:space-y-4">
            {selectedTickets.slice(0, 2).map((ticket) => (
              <div key={ticket.id} className="bg-gray-50 rounded-xl p-3 sm:p-4 text-left">
                <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1 sm:mb-2">
                  ${ticket.price}
                </div>
                <div className="flex items-center gap-1 sm:gap-2 text-gray-700">
                  <MdConfirmationNumber className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">x{ticket.quantity} Ticket - {ticket.name}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right side - 1 ticket */}
          <div className="flex items-start">
            {selectedTickets.slice(2, 3).map((ticket) => (
              <div key={ticket.id} className="bg-gray-50 rounded-xl p-3 sm:p-4 text-left w-full">
                <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1 sm:mb-2">
                  ${ticket.price}
                </div>
                <div className="flex items-center gap-1 sm:gap-2 text-gray-700">
                  <MdConfirmationNumber className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">x{ticket.quantity} Ticket - {ticket.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
