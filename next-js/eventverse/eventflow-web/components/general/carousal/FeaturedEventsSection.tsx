"use client";

import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";

const featuredEvents = [
  {
    id: 1,
    image: "/main.png",
    date: "16 Jun, 2025",
    title: "Summer Music Festival 2025",
    location: "Central Park, New York",
    category: "Music",
    price: "$99.99",
  },
  {
    id: 2,
    image: "/transevnt1.jpg",
    date: "22 Jul, 2025",
    title: "Tech Conference 2025",
    location: "Convention Center, San Francisco",
    category: "Technology",
    price: "$149.99",
  },
  {
    id: 3,
    image: "/featured1.png",
    date: "05 Aug, 2025",
    title: "Art Workshop Series",
    location: "Museum of Art, Chicago",
    category: "Art",
    price: "$79.99",
  },
  {
    id: 4,
    image: "/featured2.jpg",
    date: "18 Sep, 2025",
    title: "Food & Wine Festival",
    location: "Downtown Plaza, Miami",
    category: "Food",
    price: "$89.99",
  },
];

export default function FeaturedEventsSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 xl:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Featured Events
          </h2>
          <Link
            href="/events"
            className="text-gray-600 hover:text-gray-900 transition-colors text-sm md:text-base"
          >
            See all
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
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
                  <Calendar className="h-4 w-4" style={{ color: '#6F5ACD' }} />
                  <span className="text-sm text-gray-600">{event.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {event.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4" style={{ color: '#6F5ACD' }} />
                  <span className="text-sm text-gray-600">{event.location}</span>
                </div>

                {/* Category and Price */}
                <div className="flex items-center justify-between">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: 'white',
                      color: '#6F5ACD',
                      border:"1px solid #6F5ACD"
                    }}
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
