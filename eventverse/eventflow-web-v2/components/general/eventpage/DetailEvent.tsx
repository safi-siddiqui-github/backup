"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdLocationOn, MdCalendarToday, MdAccessTime, MdPeople, MdStar, MdArrowBack, MdShare, MdFavorite, MdFavoriteBorder, MdEmail, MdPhone, MdSchedule } from "react-icons/md";
import Link from "next/link";
import HeaderLanding from "@/components/general/header/HeaderLanding";
import FooterSection from "@/components/footer/FooterSection";
import TicketSelectionModal from "./TicketSelectionModal";

interface EventDetail {
  id: number;
  image: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: string;
  attendees: number;
  rating: number;
  description: string;
  fullDescription: string;
  organizer: string;
  tags: string[];
  isFavorite: boolean;
}

interface DetailEventProps {
  event: EventDetail;
  onBack?: () => void;
}

export default function DetailEvent({ event, onBack }: DetailEventProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(event.isFavorite);
  const [activeTab, setActiveTab] = useState("About");
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleGetTickets = () => {
    setIsTicketModalOpen(true);
  };

  const handleCloseTicketModal = () => {
    setIsTicketModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <HeaderLanding />

      {/* Main Content - Image Container */}
      <div className="flex justify-center items-center py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full">
          {/* Image Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-auto object-cover"
              style={{
                maxHeight: '70vh',
                objectFit: 'cover'
              }}
            />
            
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content Container with Equal Spacing */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
              {/* Top Section - Event Details */}
              <div className="flex justify-end">
                <div className="text-right text-white">
                  <div className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold mb-1 sm:mb-2">
                    {event.date.split(',')[0].split(' ')[1]}
                  </div>
                  <div className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-serif mb-1">
                    {event.date.split(',')[0].split(' ')[0]}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base xl:text-lg font-serif opacity-90">
                    Door opens: {event.time}
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 lg:gap-8">
                {/* Brand Logo */}
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full">
                    <span className="text-white font-semibold text-xs sm:text-sm lg:text-base">EventVerse</span>
                  </div>
                </div>

                {/* Location and Title on right side */}
                <div className="flex-shrink-0 flex flex-col items-end gap-1 sm:gap-2">
                  {/* Location */}
                  <div className="flex items-center gap-1 sm:gap-2 text-white">
                    <MdLocationOn className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                    <span className="text-xs sm:text-sm lg:text-base font-medium">
                      {event.location}
                    </span>
                  </div>

                  {/* Main Event Title */}
                  <div className="text-right">
                    <h1 className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-serif font-bold text-white">
                      {event.title}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Section with Tabs */}
      <div className="bg-white py-6 sm:py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-14">
            {/* Left Section - Tabs and Content */}
            <div className="lg:col-span-2">
              {/* Tabs and Action Icons */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 mt-4 sm:mt-6">
                 {/* Tabs */}
                 <div className="flex items-center border border-[#6F5ACD] rounded-[40px] px-3 py-2 gap-2">
                   {["About", "Location", "Organizer"].map((tab, index) => (
                     <div key={tab} className="flex items-center">
                       <button
                         onClick={() => setActiveTab(tab)}
                         className={`px-3 py-1 text-xs font-medium transition-all rounded-[40px] ${
                           activeTab === tab
                             ? "bg-white text-[#6F5ACD]"
                             : "text-gray-600 hover:text-[#6F5ACD]"
                         }`}
                       >
                         {tab}
                       </button>
                       {index < 2 && (
                         <div className="w-px h-3 bg-[#6F5ACD] mx-2"></div>
                       )}
                     </div>
                   ))}
                 </div>

                {/* Action Icons */}
                {/* <div className="flex items-center gap-2 ">
                  <button
                    onClick={toggleFavorite}
                    className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
                  >
                    {isFavorite ? (
                      <MdFavorite className="h-4 w-4 text-red-500" />
                    ) : (
                      <MdFavoriteBorder className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                  <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all">
                    <MdShare className="h-4 w-4 text-gray-600" />
                  </button>
                </div> */}
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {/* Event Title and Category */}
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-3">
                    {event.title}
                  </h1>
                  <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium border border-purple-200">
                    {event.category}
                  </span>
                </div>

                {/* Tab-specific Content */}
                {activeTab === "About" && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {event.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-3">What you'll get</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          Access to all event activities
                        </li>
                        <li className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          Networking opportunities with like-minded people
                        </li>
                        <li className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          Certificate of participation
                        </li>
                        <li className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          Reserved seating
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-3">Who should attend</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          Enthusiasts and professionals in the field
                        </li>
                        <li className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          People looking to expand their network
                        </li>
                        <li className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          Anyone interested in learning more about {event.category}
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-3">Event Schedule</h3>
                      <div className="space-y-4">
                        <div className="flex ">
                          <div className="flex-shrink-0 w-20 text-sm font-medium text-gray-900"></div>
                          <div>
                          <div className="flex-shrink-0 w-20 text-sm font-medium text-gray-900">11:50 AM</div>
                          
                            <div className="font-medium text-gray-900">Registration & Welcome</div>
                            <div className="text-sm text-gray-600">Check in and collect your event materials</div>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="flex-shrink-0 w-20 text-sm font-medium text-gray-900"></div>
                          <div>
                          <div className="flex-shrink-0 w-20 text-sm font-medium text-gray-900">12:50 AM</div>
                         
                            <div className="font-medium text-gray-900">Main event Begins</div>
                            <div className="text-sm text-gray-600">First performance starts</div>
                          </div>
                        </div>
                        <div className="flex ">
                          <div className="flex-shrink-0 w-20 text-sm font-medium text-gray-900"></div>
                          <div>
                          <div className="flex-shrink-0 w-20 text-sm font-medium text-gray-900">14:50 AM</div>
                          
                            <div className="font-medium text-gray-900">Event Concludes</div>
                            <div className="text-sm text-gray-600">Closing remarks and networking</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Location" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-gray-900">
                      <MdLocationOn className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">{event.location}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Full address and directions will be provided after registration
                    </div>
                    <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <MdLocationOn className="h-8 w-8 mx-auto mb-2" />
                        <div>Map loading...</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Organizer" && (
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-xl">
                          {event.organizer.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{event.organizer}</h3>
                        <p className="text-sm text-gray-600">Event Organizer</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600 leading-relaxed">
                        {event.organizer} specializes in creating memorable {event.category.toLowerCase()} events. With years of experience in the industry, they bring quality and professionalism to every event they organize.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-2">Contact the organizer</h4>
                      <p className="text-gray-600 mb-4">Have questions about this event? Contact the organizer directly.</p>
                      <button className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all text-sm">
                        <MdEmail className="h-3 w-3" />
                        Message Organizer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Event Info */}
            <div className="lg:col-span-1 mt-10">
                 {/* Action Icons */}
                 <div className="flex items-center gap-2 mb-8">
                  <button
                    onClick={toggleFavorite}
                    className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
                  >
                    {isFavorite ? (
                      <MdFavorite className="h-4 w-4 text-red-500" />
                    ) : (
                      <MdFavoriteBorder className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                  <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all">
                    <MdShare className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              <div className="sticky top-8 space-y-6">
                {/* Date and Time */}
                <div className="flex items-center gap-3 text-gray-900">
                  <MdCalendarToday className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">{event.date}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 text-gray-900">
                  <MdLocationOn className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">{event.location}</span>
                </div>

                {/* Ticket Button */}
                <button 
                  onClick={handleGetTickets}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all text-sm font-medium"
                >
                  <MdSchedule className="h-4 w-4" />
                  Get Tickets
                </button>

                {/* Refund Policy */}
                <div className="text-sm text-gray-600">
                  <strong>Refund Policy:</strong> Refunds available up to 7 days before the event.
                </div>

                {/* Terms & Conditions */}
                <Link href="#" className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium">
                  Terms & Conditions
                  <MdArrowBack className="h-4 w-4 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterSection />

      {/* Ticket Selection Modal */}
      <TicketSelectionModal
        isOpen={isTicketModalOpen}
        onClose={handleCloseTicketModal}
        eventTitle={event.title}
        event={event}
      />
    </div>
  );
}
