"use client";

import { useState } from "react";
import { MdSearch, MdFilterList, MdCalendarToday, MdLocationOn, MdPeople, MdStar, MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import SubHeader from "@/components/general/header/SubHeader";
import FilterPanel from "@/components/general/eventpage/FilterPanel";

const events = [
  {
    id: 1,
    image: "/featured1.png",
    title: "Summer Music Festival 2025",
    date: "16 Jun, 2025",
    time: "6:00 PM",
    location: "Central Park, New York",
    category: "Music",
    price: "$99.99",
    attendees: 2500,
    rating: 4.8,
    description: "Join us for an unforgettable summer music experience with top artists and amazing performances."
  },
  {
    id: 2,
    image: "/featured2.jpg",
    title: "Tech Conference 2025",
    date: "22 Jul, 2025",
    time: "9:00 AM",
    location: "Convention Center, San Francisco",
    category: "Technology",
    price: "$149.99",
    attendees: 1200,
    rating: 4.9,
    description: "Explore the latest in technology with industry leaders and innovative solutions."
  },
  {
    id: 3,
    image: "/keyfeatured3.png",
    title: "Art Workshop Series",
    date: "05 Aug, 2025",
    time: "2:00 PM",
    location: "Museum of Art, Chicago",
    category: "Art",
    price: "$79.99",
    attendees: 45,
    rating: 4.7,
    description: "Learn from professional artists and create your own masterpieces in this hands-on workshop."
  },
  {
    id: 4,
    image: "/keyfeatured4.png",
    title: "Food & Wine Festival",
    date: "18 Sep, 2025",
    time: "12:00 PM",
    location: "Downtown Plaza, Miami",
    category: "Food",
    price: "$89.99",
    attendees: 800,
    rating: 4.6,
    description: "Indulge in exquisite cuisine and fine wines from renowned chefs and wineries."
  },
  {
    id: 5,
    image: "/transevnt1.jpg",
    title: "Business Networking Event",
    date: "25 Oct, 2025",
    time: "6:30 PM",
    location: "Business Center, Los Angeles",
    category: "Business",
    price: "$65.99",
    attendees: 300,
    rating: 4.5,
    description: "Connect with industry professionals and expand your business network."
  },
  {
    id: 6,
    image: "/featured3.png",
    title: "Sports Championship",
    date: "12 Nov, 2025",
    time: "3:00 PM",
    location: "Stadium, Boston",
    category: "Sports",
    price: "$45.99",
    attendees: 5000,
    rating: 4.8,
    description: "Witness the ultimate sports championship with top athletes competing for glory."
  }
];

const categories = [
  "Music", "Art&Culture", "Food", "Business", "Sports", "Education", "Charity"
];

export default function EventPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Events");
  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterEvents(term, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterEvents(searchTerm, category);
  };

  const filterEvents = (search: string, category: string) => {
    let filtered = events;
    
    if (category !== "All Events") {
      filtered = filtered.filter(event => event.category === category);
    }
    
    if (search) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredEvents(filtered);
  };

  return (
    <div>
      {/* SubHeader */}
      <SubHeader />
      
      {/* Main Content */}
      <div 
        className=""
        style={{
          background: "linear-gradient(180deg, rgba(111, 90, 205, 0.3) 0%, #FFFFFF 94.71%)"
        }}
      >
      
      <div 
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 w-full sm:w-[90%] md:w-[95%] lg:w-[1440px] h-auto sm:h-[400px] md:h-[500px] lg:h-[390px]"
        style={{
          borderBottomRightRadius: '40px',
          borderBottomLeftRadius: '40px',
          opacity: 1
        }}
      >
        {/* Page Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4"
            style={{ fontFamily: 'serif' }}
          >
            Find Your Next{" "}
            <span style={{ color: '#6F5ACD', fontFamily: 'sans-serif' }}>
              Experience
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover amazing events happening near you or create your own to share with the world
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 sm:mb-12">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8 justify-center">
            <div 
              className="relative bg-white rounded-[40px] flex items-center w-full sm:w-[80%] md:w-[85%] lg:w-[700px] h-12 sm:h-14 lg:h-[60px] px-3 py-2 sm:px-4 sm:py-3 lg:px-3 lg:py-2"
              style={{
                gap: '200px'
              }}
            >
              <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for events, venues or categories"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-2 sm:py-3 text-xs sm:text-sm border-none outline-none bg-transparent focus:ring-0 placeholder-black"
              />
              <button
                className="px-4 sm:px-6 py-2 sm:py-3 text-white font-medium rounded-[40px] transition-all hover:scale-105 text-xs sm:text-sm"
                style={{ backgroundColor: '#6F5ACD' }}
              >
                Search
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <div 
              className="bg-white rounded-[40px] flex items-center justify-center gap-1 sm:gap-2 lg:gap-3 w-full sm:w-[80%] md:w-[85%] lg:w-[650px] h-auto sm:h-10 md:h-12 lg:h-[48px] px-1 py-1 sm:px-2 sm:py-1 lg:px-3 lg:py-1"
              style={{
                border: '1px solid #6F5ACD'
              }}
            >
              {categories.map((category, index) => (
                <div key={category} className="flex items-center">
                  <button
                    onClick={() => handleCategoryFilter(category)}
                    className={`px-1 sm:px-2 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                      selectedCategory === category
                        ? "text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    style={{
                      backgroundColor: selectedCategory === category ? '#6F5ACD' : 'transparent',
                      border: selectedCategory === category ? 'none' : 'none'
                    }}
                  >
                    {category}
                  </button>
                  {index < categories.length - 1 && (
                    <span 
                      className="mx-0.5 sm:mx-1 text-xs font-bold"
                      style={{ color: '#6F5ACD' }}
                    >
                      |
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MdSearch className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-sm text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      </div>

      {/* Events Header Section */}
      <div className="bg-gray-100 py-8 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* All Events Title */}
            <div className="flex-1">
              <h2 
                className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900"
                style={{ fontFamily: 'serif' }}
              >
                All Events
              </h2>
            </div>
            
            {/* Sort and Filters Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              {/* Sort Button */}
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all hover:bg-gray-50" 
                style={{ 
                  borderColor: '#6F5ACD', 
                  color: '#6F5ACD',
                  backgroundColor: 'transparent'
                }}>
                <span>Date (Earliest first)</span>
                <MdKeyboardArrowDown className="h-4 w-4" />
              </button>
              
              {/* Filters Button */}
              <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#6F5ACD' }}>
                <MdFilterList className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel />

      {/* Events Grid */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                {/* Event Image */}
                <div
                  className="w-full h-48 sm:h-56 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${event.image})`,
                    backgroundColor: '#f0f0f0'
                  }}
                />

                {/* Event Details */}
                <div className="p-4 sm:p-6">
                  {/* Date and Time */}
                  <div className="flex items-center gap-2 mb-3">
                    <MdCalendarToday className="h-4 w-4" style={{ color: '#6F5ACD' }} />
                    <span className="text-xs text-gray-600">{event.date} • {event.time}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-4">
                    <MdLocationOn className="h-4 w-4" style={{ color: '#6F5ACD' }} />
                    <span className="text-xs text-gray-600">{event.location}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <MdPeople className="h-4 w-4 text-gray-400" />
                        <span className="text-xs text-gray-600">{event.attendees}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MdStar className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{event.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Category and Price */}
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        color: '#6F5ACD',
                        border: "1px solid #6F5ACD",
                        backgroundColor: 'rgba(111, 90, 205, 0.1)'
                      }}
                    >
                      {event.category}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {event.price}
                    </span>
                  </div>

                  {/* Action Button */}
                  <button
                    className="w-full mt-3 py-2 px-3 text-white font-medium rounded-lg transition-all hover:scale-105 text-xs"
                    style={{ backgroundColor: '#6F5ACD' }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
