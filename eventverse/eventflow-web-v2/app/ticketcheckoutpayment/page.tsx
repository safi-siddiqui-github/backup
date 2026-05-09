"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdCreditCard, MdPhone, MdEmail, MdPerson, MdClose, MdCheckCircle } from "react-icons/md";
import HeaderLanding from "@/components/general/header/HeaderLanding";
import EventDetailsCard from "@/components/general/eventpage/EventDetailsCard";
import FooterSection from "@/components/footer/FooterSection";

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

export default function TicketCheckoutPaymentPage() {
  const router = useRouter();
  const [event, setEvent] = useState<EventData | null>(null);
  const [selectedTickets, setSelectedTickets] = useState<TicketItem[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneCode: '+1',
    phoneNumber: '',
    paymentMethod: 'visa',
    acceptTerms: false
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

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

  const ticketsPrice = selectedTickets.reduce((total, ticket) => total + (ticket.price * ticket.quantity), 0);
  const serviceFee = 2;
  const transactionFee = 2;
  const total = ticketsPrice + serviceFee + transactionFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = () => {
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
  };

  const handleProcessPayment = () => {
    // Handle actual payment processing here
    console.log('Processing payment with card data...', cardData);
    // Close payment modal and show success modal
    setShowPaymentModal(false);
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    // Redirect to home page
    router.push('/');
  };

  if (!event || selectedTickets.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <HeaderLanding />

      {/* Main Content */}
      <div className="flex justify-center items-center py-4 sm:py-8 px-2 sm:px-4">
        <div className="max-w-4xl w-full space-y-4 sm:space-y-6">
          {/* Event Details Card Component */}
          <EventDetailsCard event={event} selectedTickets={selectedTickets} />
          
          {/* Payment Form Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Section - Additional Information */}
              <div className="lg:w-1/2 p-4 lg:p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Additional Information</h2>
                
                <div className="space-y-3">
                  {/* Full Name Input */}
                  <div>
                    <div className="relative">
                      <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter Name, Last name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <div className="relative">
                      <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  {/* Phone Number Input */}
                  <div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <MdPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                          name="phoneCode"
                          value={formData.phoneCode}
                          onChange={handleInputChange}
                          className="pl-9 pr-6 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 appearance-none bg-white"
                        >
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                          <option value="+91">+91</option>
                        </select>
                        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Vertical Separator Line */}
              <div className="hidden lg:block w-px bg-gray-200"></div>

              {/* Right Section - Order Summary and Payment */}
              <div className="lg:w-1/2 p-4 lg:p-6">
                {/* Order Summary */}
                <div className="mb-4">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>Tickets Price</span>
                      <span>${ticketsPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>Service Fee</span>
                      <span>${serviceFee}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>Transaction Fee</span>
                      <span>${transactionFee}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between text-base font-bold text-gray-900">
                        <span>Total</span>
                        <span>${total}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Payment Method</h3>
                  <div className="space-y-2">
                    {/* Visa/Mastercard Option */}
                    <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="visa"
                        checked={formData.paymentMethod === 'visa'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                      />
                      <div className="ml-3 flex items-center gap-2">
                        <MdCreditCard className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-900 font-medium">Visa | Mastercard</span>
                      </div>
                    </label>

                    {/* Google Pay Option */}
                    <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="gpay"
                        checked={formData.paymentMethod === 'gpay'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                      />
                      <div className="ml-3 flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-green-500 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">G</span>
                        </div>
                        <span className="text-sm text-gray-900 font-medium">G Pay</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  className="w-full p-2 flex items-center justify-center gap-2  bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-semibold text-base mb-3"
                >
                  <MdCreditCard className="h-4 w-4" />
                  <span>Pay</span>
                </button>

                {/* Refund Policy */}
                <p className="text-xs text-gray-600 mb-3">
                  Refund Policy: Refunds available up to 7 days before the event.
                </p>

                {/* Terms & Conditions */}
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-0.5"
                  />
                  <span className="text-xs text-gray-600">
                    I accept <span className="text-purple-600 underline cursor-pointer">Terms & Conditions</span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterSection />

      {/* Full Screen Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-gray-50">
          {/* Header */}
          <HeaderLanding />
          
          {/* Main Content */}
          <div className="flex justify-center items-center min-h-[calc(100vh-80px)] py-4 px-4">
            <div className="w-full max-w-md">
              {/* Payment Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-purple-200 overflow-hidden">
                {/* Total Section */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-purple-600">${total}</span>
                </div>

                {/* Card Info Section */}
                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Card Info</h3>
                  
                  <div className="space-y-3">
                    {/* Card Number */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="0000 1111 2222 3333"
                        value={cardData.cardNumber}
                        onChange={handleCardInputChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    {/* Expiry Date and CVC */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="mm/yy"
                          value={cardData.expiryDate}
                          onChange={handleCardInputChange}
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          CVC/CVV
                        </label>
                        <input
                          type="text"
                          name="cvc"
                          placeholder="123"
                          value={cardData.cvc}
                          onChange={handleCardInputChange}
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pay Button */}
                  <button
                    onClick={handleProcessPayment}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-semibold text-base mt-4"
                  >
                    <MdCreditCard className="h-4 w-4" />
                    <span>Pay</span>
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={handleCloseModal}
                    className="w-full mt-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Success Modal - Full Screen */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-gray-50">
          {/* Header */}
          <HeaderLanding />
          
          {/* Main Content */}
          <div className="flex justify-center items-center min-h-[calc(100vh-80px)] py-8 px-4">
            <div className="w-full max-w-md">
              {/* Success Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <MdCheckCircle className="h-10 w-10 text-white" />
                  </div>
                </div>

                {/* Success Message */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful</h2>
                <p className="text-gray-600 mb-2">Your payment has been successfully processed.</p>
                <p className="text-gray-600 mb-8">
                  Now redirecting to{" "}
                  <span 
                    className="text-purple-600 underline cursor-pointer hover:text-purple-700"
                    onClick={handleCloseSuccessModal}
                  >
                    Home Page
                  </span>
                  .
                </p>

               
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
