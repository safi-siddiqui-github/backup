"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdLocationOn, MdCalendarToday, MdConfirmationNumber, MdArrowForward } from "react-icons/md";
import HeaderLanding from "@/components/general/header/HeaderLanding";
import FooterSection from "@/components/footer/FooterSection";
import EventDetailsCard from "./EventDetailsCard";

interface TicketItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface TicketCheckoutProps {
  event: {
    id: number;
    image: string;
    title: string;
    date: string;
    time: string;
    location: string;
    category: string;
  };
  selectedTickets: TicketItem[];
}

export default function TicketCheckout({ event, selectedTickets }: TicketCheckoutProps) {
  const router = useRouter();
  const [promoCode, setPromoCode] = useState("");
  
  const ticketsPrice = selectedTickets.reduce((total, ticket) => total + (ticket.price * ticket.quantity), 0);
  const serviceFee = 2;
  const transactionFee = 2;
  const total = ticketsPrice + serviceFee + transactionFee;

  const handleContinueToPayment = () => {
    // Store data in localStorage for the payment page
    localStorage.setItem('checkoutEvent', JSON.stringify(event));
    localStorage.setItem('checkoutTickets', JSON.stringify(selectedTickets));
    
    // Navigate to payment page
    router.push('/ticketcheckoutpayment');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <HeaderLanding />

      {/* Main Content */}
      <div className="flex justify-center items-center py-4 sm:py-8 px-2 sm:px-4">
        <div className="max-w-4xl w-full space-y-4 sm:space-y-6">
          {/* Event Details Card Component */}
          <EventDetailsCard event={event} selectedTickets={selectedTickets} />
         

          {/* Promo Code & Order Summary Card */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Vertical Line between sections */}
              <div className="hidden lg:block absolute left-1/2 top-4 sm:top-6 bottom-4 sm:bottom-6 w-px bg-purple-300 transform -translate-x-1/2"></div>
              {/* Promo Code Section */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                  Do you have a promo code?
                </h3>
                <input
                  type="text"
                  placeholder="Enter Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              {/* Order Summary Section */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Order Summary</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                    <span>Tickets Price</span>
                    <span>${ticketsPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                    <span>Service Fee</span>
                    <span>${serviceFee}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                    <span>Transaction Fee</span>
                    <span>${transactionFee}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-2 sm:pt-3">
                    <div className="flex justify-between text-base sm:text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleContinueToPayment}
                  className="w-48 sm:w-56 mt-4 sm:mt-6 p-1 sm:p-3 flex flex-col items-center justify-center bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all font-semibold text-base sm:text-lg border-2 border-purple-600 hover:border-purple-700"
                >
                  <span>Continue</span>
                </button>

                <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4">
                  Refund Policy: Refunds available up to 7 days before the event.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
