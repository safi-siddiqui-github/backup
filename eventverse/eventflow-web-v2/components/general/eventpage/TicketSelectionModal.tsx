"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdClose, MdAdd, MdRemove, MdCalendarToday, MdVideocam, MdStar, MdSchool } from "react-icons/md";

interface TicketCategory {
  id: string;
  name: string;
  price: number;
  available: number;
  features: string[];
  tag?: {
    text: string;
    color: string;
    bgColor: string;
  };
  additionalText?: string;
  specialNote?: string;
  icon: React.ReactNode;
}

interface TicketSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  event: {
    id: number;
    image: string;
    title: string;
    date: string;
    time: string;
    location: string;
    category: string;
  };
}

const ticketCategories: TicketCategory[] = [
  {
    id: "early-bird",
    name: "Early Bird",
    price: 88,
    available: 37,
    features: ["All conference sessions", "Digital materials", "Welcome reception"],
    tag: {
      text: "Promo",
      color: "text-white",
      bgColor: "bg-pink-500"
    },
    additionalText: "Limited time offer - Save 25%",
    icon: <MdVideocam className="h-5 w-5 text-gray-600" />
  },
  {
    id: "general",
    name: "General Admission",
    price: 120,
    available: 171,
    features: ["All conference sessions", "Digital materials", "Welcome reception"],
    icon: <MdVideocam className="h-5 w-5 text-gray-600" />
  },
  {
    id: "vip",
    name: "VIP Express",
    price: 299,
    available: 13,
    features: [
      "Premium access with exclusive perks",
      "All conference sessions",
      "VIP lounge access",
      "Meet & greet with speakers",
      "Premium swag bag",
      "Private networking dinner"
    ],
    tag: {
      text: "Premium",
      color: "text-white",
      bgColor: "bg-purple-600"
    },
    icon: <MdStar className="h-5 w-5 text-gray-600" />
  },
  {
    id: "student",
    name: "Student Discount",
    price: 45,
    available: 60,
    features: ["All conference sessions", "Digital materials"],
    additionalText: "Valid student ID required",
    specialNote: "Student verification required check in",
    icon: <MdSchool className="h-5 w-5 text-gray-600" />
  }
];

export default function TicketSelectionModal({ isOpen, onClose, eventTitle, event }: TicketSelectionModalProps) {
  const router = useRouter();
  const [selectedTickets, setSelectedTickets] = useState<{ [key: string]: number }>({
    "early-bird": 1,
    "general": 1,
    "vip": 0,
    "student": 1
  });

  const updateQuantity = (categoryId: string, change: number) => {
    setSelectedTickets(prev => {
      const current = prev[categoryId] || 0;
      const newQuantity = Math.max(0, Math.min(current + change, ticketCategories.find(cat => cat.id === categoryId)?.available || 0));
      return {
        ...prev,
        [categoryId]: newQuantity
      };
    });
  };

  const getSelectedTicketsSummary = () => {
    return Object.entries(selectedTickets)
      .filter(([_, quantity]) => quantity > 0)
      .map(([categoryId, quantity]) => {
        const category = ticketCategories.find(cat => cat.id === categoryId);
        return { category, quantity };
      });
  };

  const calculateTotal = () => {
    return Object.entries(selectedTickets).reduce((total, [categoryId, quantity]) => {
      const category = ticketCategories.find(cat => cat.id === categoryId);
      return total + (category ? category.price * quantity : 0);
    }, 0);
  };

  const handleContinue = () => {
    // Prepare the selected tickets data
    const selectedTicketsForCheckout = getSelectedTicketsForCheckout();
    
    // Store data in localStorage
    localStorage.setItem('checkoutEvent', JSON.stringify(event));
    localStorage.setItem('checkoutTickets', JSON.stringify(selectedTicketsForCheckout));
    
    // Navigate to clean URL
    router.push('/ticketcheckout');
  };

  const getSelectedTicketsForCheckout = () => {
    return Object.entries(selectedTickets)
      .filter(([_, quantity]) => quantity > 0)
      .map(([categoryId, quantity]) => {
        const category = ticketCategories.find(cat => cat.id === categoryId);
        return {
          id: categoryId,
          name: category?.name || '',
          price: category?.price || 0,
          quantity
        };
      });
  };

  if (!isOpen) return null;

  const selectedSummary = getSelectedTicketsSummary();
  const total = calculateTotal();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop - only dims main content, not header/footer */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Choose your ticket category</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MdClose className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Ticket Categories */}
          {ticketCategories.map((category) => (
            <div key={category.id} className="border border-gray-200 rounded-xl p-5 hover:border-purple-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    {category.icon}
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  </div>
                  {category.tag && (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${category.tag.bgColor} ${category.tag.color}`}>
                      {category.tag.text}
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">{category.available} available</span>
              </div>

              {/* Features */}
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {category.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                {category.additionalText && (
                  <p className="text-sm text-red-500 mt-2 font-medium">{category.additionalText}</p>
                )}
                {category.specialNote && (
                  <p className="text-sm text-red-600 mt-2 font-medium">{category.specialNote}</p>
                )}
              </div>

              {/* Quantity Selector and Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(category.id, -1)}
                    disabled={selectedTickets[category.id] <= 0}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MdRemove className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-gray-900">{selectedTickets[category.id] || 0}</span>
                  <button
                    onClick={() => updateQuantity(category.id, 1)}
                    disabled={selectedTickets[category.id] >= category.available}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MdAdd className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-xl font-bold text-purple-600">${category.price}</span>
              </div>
            </div>
          ))}

          {/* Selected Items Summary */}
          {selectedSummary.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">Selected Items</h4>
              <div className="space-y-3">
                {selectedSummary.map(({ category, quantity }) => (
                  <div key={category?.id} className="flex justify-between text-base">
                    <span className="text-gray-700">x{quantity} Ticket - {category?.name}</span>
                    <span className="font-semibold text-gray-900">${(category?.price || 0) * quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total and Continue Button */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              Total - ${total}
            </div>
            <button
              onClick={handleContinue}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all font-semibold text-base"
            >
              <MdCalendarToday className="h-5 w-5" />
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
