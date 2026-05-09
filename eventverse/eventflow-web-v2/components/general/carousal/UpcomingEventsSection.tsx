"use client";

import { useState } from "react";
import { MdCalendarToday, MdLocationOn } from "react-icons/md";
import Link from "next/link";

const upcomingEvents = [
  {
    id: 1,
    image: "/keyfeature.png",
    date: "16 Jun, 2025",
    title: "Summer Music Festival 2025",
    location: "Central Park, New York",
    category: "Music",
    price: "$99.99",
  },
  {
    id: 2,
    image: "/featured1.png",
    date: "22 Jul, 2025",
    title: "Tech Conference 2025",
    location: "Convention Center, San Francisco",
    category: "Technology",
    price: "$149.99",
  },
  {
    id: 3,
    image: "/keyfeatured3.png",
    date: "05 Aug, 2025",
    title: "Art Workshop Series",
    location: "Museum of Art, Chicago",
    category: "Art",
    price: "$79.99",
  },
  {
    id: 4,
    image: "/keyfeatured4.png",
    date: "18 Sep, 2025",
    title: "Food & Wine Festival",
    location: "Downtown Plaza, Miami",
    category: "Food",
    price: "$89.99",
  },
];

const filterOptions = [
  { id: "all", label: "All Events" },
  { id: "today", label: "Today" },
  { id: "week", label: "This week" },
  { id: "online", label: "Online" },
  { id: "free", label: "Free" },
];

export default function UpcomingEventsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 xl:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Upcoming Events
          </h2>
          <Link
            href="/eventpage"
            className="text-gray-600 hover:text-gray-900 transition-colors text-sm md:text-base"
          >
            See all
          </Link>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8">
          <div 
            className="inline-flex items-center gap-1 sm:gap-2 p-1 rounded-lg border overflow-x-auto"
            style={{ border: '1px solid #6F5ACD' }}
          >
            {filterOptions.map((filter) => (
              <button
                key={filter.id} 
                onClick={() => setActiveFilter(filter.id)}
                className="px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0"
                style={{
                  backgroundColor: activeFilter === filter.id ? 'white' : 'transparent',
                  color: activeFilter === filter.id ? '#6F5ACD' : '#000000'
                }}
              >
                {filter.label} 
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:scale-105 cursor-pointer"
            >
              {/* Event Image */}
              <div
                className="w-full h-48 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${event.image})`,
                  backgroundColor: '#f0f0f0'
                }}
              />

              {/* Event Details */}
              <div className="p-4">
                {/* Date */}
                <div className="flex items-center gap-2 mb-2">
                  <MdCalendarToday className="h-4 w-4" style={{ color: '#6F5ACD' }} />
                  <span className="text-sm text-gray-600">{event.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {event.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 mb-4">
                  <MdLocationOn className="h-4 w-4" style={{ color: '#6F5ACD' }} />
                  <span className="text-sm text-gray-600">{event.location}</span>
                </div>

                {/* Category and Price */}
                <div className="flex items-center justify-between">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium "
                    style={{ color: '#6F5ACD',border:"1px solid #6F5ACD" }}
                  >
                    {event.category}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {event.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
