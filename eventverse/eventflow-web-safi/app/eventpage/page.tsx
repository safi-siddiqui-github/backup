"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdSearch, MdFilterList, MdCalendarToday, MdLocationOn, MdPeople, MdStar, MdKeyboardArrowDown, MdChevronLeft, MdChevronRight } from "react-icons/md";
import Link from "next/link";
import SubHeader from "@/components/general/header/SubHeader";
import FilterPanel from "@/components/general/eventpage/FilterPanel";
import FooterSection from "@/components/footer/FooterSection";

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
    description: "Join us for an unforgettable summer music experience with top artists and amazing performances.",
    fullDescription: "Experience the ultimate summer music festival featuring world-renowned artists, incredible stage productions, and an atmosphere that will leave you breathless. This year's lineup includes Grammy-winning performers, emerging talents, and special surprise guests. With multiple stages, food vendors, and interactive experiences, this is more than just a concert - it's a complete musical journey.",
    organizer: "Music Events Inc.",
    tags: ["Live Music", "Outdoor", "Festival", "Summer", "Concert"],
    isFavorite: false
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
    description: "Explore the latest in technology with industry leaders and innovative solutions.",
    fullDescription: "Join industry leaders, innovators, and tech enthusiasts for a comprehensive exploration of cutting-edge technologies. This conference features keynote presentations, hands-on workshops, networking sessions, and product demonstrations from leading tech companies.",
    organizer: "Tech Innovators LLC",
    tags: ["Technology", "Conference", "Networking", "Innovation", "Workshop"],
    isFavorite: false
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
    description: "Learn from professional artists and create your own masterpieces in this hands-on workshop.",
    fullDescription: "Immerse yourself in the world of art with our comprehensive workshop series. Learn various techniques from professional artists, experiment with different mediums, and create your own masterpieces in a supportive and inspiring environment.",
    organizer: "Art Academy",
    tags: ["Art", "Workshop", "Creative", "Learning", "Hands-on"],
    isFavorite: false
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
    description: "Indulge in exquisite cuisine and fine wines from renowned chefs and wineries.",
    fullDescription: "Experience a culinary journey like no other with our Food & Wine Festival. Sample dishes from award-winning chefs, taste premium wines from top wineries, and enjoy live cooking demonstrations and wine tastings.",
    organizer: "Culinary Events Group",
    tags: ["Food", "Wine", "Culinary", "Tasting", "Festival"],
    isFavorite: false
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
    description: "Connect with industry professionals and expand your business network.",
    fullDescription: "Join us for an exclusive networking event designed to connect business professionals, entrepreneurs, and industry leaders. Enjoy cocktails, appetizers, and meaningful conversations that could lead to your next big opportunity.",
    organizer: "Business Network Pro",
    tags: ["Networking", "Business", "Professional", "Career", "Connections"],
    isFavorite: false
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
  },
  {
    id: 7,
    image: "/featured1.png",
    title: "Winter Music Concert",
    date: "15 Dec, 2025",
    time: "7:00 PM",
    location: "Madison Square Garden, New York",
    category: "Music",
    price: "$129.99",
    attendees: 18000,
    rating: 4.9,
    description: "Experience the magic of winter with our spectacular music concert featuring top artists."
  },
  {
    id: 8,
    image: "/featured2.jpg",
    title: "AI & Machine Learning Summit",
    date: "20 Jan, 2026",
    time: "9:00 AM",
    location: "Tech Hub, Silicon Valley",
    category: "Technology",
    price: "$199.99",
    attendees: 800,
    rating: 4.7,
    description: "Explore the future of AI and machine learning with industry experts and innovators."
  },
  {
    id: 9,
    image: "/keyfeatured3.png",
    title: "Photography Masterclass",
    date: "05 Feb, 2026",
    time: "10:00 AM",
    location: "Creative Studio, Los Angeles",
    category: "Art",
    price: "$89.99",
    attendees: 30,
    rating: 4.8,
    description: "Learn advanced photography techniques from professional photographers in this intensive workshop."
  }
];

const categories = [
  "Music", "Art&Culture", "Food", "Business", "Sports", "Education", "Charity"
];

export default function EventPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Events");
  const [filterPanelCategory, setFilterPanelCategory] = useState("All Categories");
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterEvents(term, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterEvents(searchTerm, category);
  };

  const handleFilterPanelCategoryChange = (category: string) => {
    setFilterPanelCategory(category);
    if (category !== "All Categories") {
      setSelectedCategory(category);
      filterEvents(searchTerm, category);
    } else {
      setSelectedCategory("All Events");
      filterEvents(searchTerm, "All Events");
    }
  };

  const handleFiltersChange = (filters: any) => {
    setActiveFilters(filters);
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
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEventClick = (event: any) => {
    router.push(`/eventpage/${event.id}`);
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
            >
              <MdSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for events, venues or categories"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-8 sm:pl-12 pr-20 sm:pr-24 py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm border-none outline-none bg-transparent focus:ring-0 placeholder-gray-500"
              />
              <button
                className="absolute right-2 sm:right-3 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 text-white font-medium rounded-[40px] transition-all hover:scale-105 text-[10px] sm:text-xs md:text-sm"
                style={{ backgroundColor: '#6F5ACD' }}
              >
                Search
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <div 
              className="bg-white rounded-[40px] flex items-center justify-center gap-0.5 sm:gap-1 md:gap-2 lg:gap-3 w-full sm:w-[80%] md:w-[85%] lg:w-[650px] h-auto sm:h-10 md:h-12 lg:h-[48px] px-0.5 sm:px-1 md:px-2 lg:px-3 py-0.5 sm:py-1 md:py-1 lg:py-1"
              style={{
                border: '1px solid #6F5ACD'
              }}
            >
              {categories.map((category, index) => (
                <div key={category} className="flex items-center">
                  <button
                    onClick={() => handleCategoryFilter(category)}
                    className={`px-0.5 sm:px-1 md:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium transition-all whitespace-nowrap ${
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
                      className="mx-0.5 sm:mx-0.5 md:mx-1 text-[10px] sm:text-xs font-bold"
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
        <div className="flex flex-col gap-3">
          {/* First Row - Title and Sort/Filter Buttons */}
          <div className="flex flex-row items-center justify-between gap-2 sm:gap-4">
            {/* All Events Title */}
            <div className="flex-1 min-w-0">
              <h2 
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 truncate"
                style={{ fontFamily: 'serif' }}
              >
                All Events
              </h2>
            </div>
            
            {/* Sort and Filters Buttons */}
            <div className="flex flex-row items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
              {/* Sort Button */}
              <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-full border text-xs sm:text-sm font-medium transition-all hover:bg-gray-50 whitespace-nowrap" 
                style={{ 
                  borderColor: '#6F5ACD', 
                  color: '#6F5ACD',
                  backgroundColor: 'transparent'
                }}>
                <span className="hidden sm:inline">Date (Earliest first)</span>
                <span className="sm:hidden">Date</span>
                <MdKeyboardArrowDown className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
              
              {/* Filters Button */}
              <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white transition-all hover:opacity-90 whitespace-nowrap"
                style={{ backgroundColor: '#6F5ACD' }}>
                <MdFilterList className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
          
          {/* Second Row - Active Filters Display */}
          {Object.keys(activeFilters).length > 0 && (
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <span className="text-xs text-gray-500">Filters:</span>
              {activeFilters.category && activeFilters.category !== "All Categories" && (
                <span 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white border"
                  style={{ 
                    color: '#6F5ACD',
                    borderColor: '#6F5ACD'
                  }}
                >
                  {activeFilters.category}
                </span>
              )}
              {activeFilters.date && activeFilters.date !== "Pick a date range" && (
                <span 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white border"
                  style={{ 
                    color: '#6F5ACD',
                    borderColor: '#6F5ACD'
                  }}
                >
                  {activeFilters.date}
                </span>
              )}
              {activeFilters.location && activeFilters.location !== "City, Country" && (
                <span 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white border"
                  style={{ 
                    color: '#6F5ACD',
                    borderColor: '#6F5ACD'
                  }}
                >
                  {activeFilters.location}
                </span>
              )}
              {activeFilters.eventType && (
                <span 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white border"
                  style={{ 
                    color: '#6F5ACD',
                    borderColor: '#6F5ACD'
                  }}
                >
                  {activeFilters.eventType}
                </span>
              )}
              {activeFilters.priceRange && activeFilters.priceRange[1] < 500 && (
                <span 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white border"
                  style={{ 
                    color: '#6F5ACD',
                    borderColor: '#6F5ACD'
                  }}
                >
                  Up to ${activeFilters.priceRange[1]}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Main Content with Two Column Layout */}
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Left Column - Filter Panel */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <FilterPanel onCategoryChange={handleFilterPanelCategoryChange} onFiltersChange={handleFiltersChange} />
          </div>
          
          {/* Right Column - Events Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {currentEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventClick(event)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer hover:scale-105"
            >
              {/* Event Image */}
              <div
                className="w-full h-48 sm:h-56 bg-cover bg-center bg-no-repeat rounded-t-2xl"
                style={{
                  backgroundImage: `url(${event.image})`,
                  backgroundColor: '#f0f0f0'
                }}
              />

              {/* Event Details */}
              <div className="p-5">
                {/* Date and Time */}
                <div className="flex items-center gap-2 mb-3">
                  <MdCalendarToday className="h-4 w-4" style={{ color: '#6F5ACD' }} />
                  <span className="text-sm text-gray-600 font-medium">{event.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
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
                    className="px-3 py-1.5 rounded-full bg-white text-sm font-semibold"
                    style={{
                      color: '#6F5ACD',
                      border: '1px solid #6F5ACD'
                    }}
                  >
                    {event.category}
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {event.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
            </div>

            {/* Pagination - Inside the right section, centered */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  <MdChevronLeft className="h-5 w-5" />
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                      currentPage === page
                        ? 'text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
                    }`}
                    style={{
                      backgroundColor: currentPage === page ? '#6F5ACD' : 'white'
                    }}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  <MdChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <FooterSection />
    </div>
  );
}
