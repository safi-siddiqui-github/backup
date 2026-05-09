import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Search, Filter, Clock, ChevronRight, Music, Briefcase, GraduationCap, Gamepad2, Coffee, Palette, Zap, Globe, Heart, Utensils, Book, Baby, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import PublicEventCard from "@/components/PublicEventCard";
import EventSearchFilters from "@/components/EventSearchFilters";
import ProfileDropdown from "@/components/ProfileDropdown";
import { useAuth } from "@/hooks/useAuth";
import { mockEvents, cities, categories, priceRanges, MockEvent } from "@/data/mockEvents";

const PublicEvents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("New York, NY");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [timeOfDayFilter, setTimeOfDayFilter] = useState("all");
  const [formatFilter, setFormatFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);
  const { user } = useAuth();

  // Enhanced categories with icons
  const enhancedCategories = [
    { id: "all", name: "All", icon: Globe },
    { id: "music", name: "Music", icon: Music },
    { id: "business", name: "Business", icon: Briefcase },
    { id: "sports", name: "Sports", icon: Gamepad2 },
    { id: "food", name: "Food", icon: Coffee },
    { id: "arts", name: "Arts", icon: Palette },
    { id: "technology", name: "Tech", icon: Zap },
    { id: "health", name: "Wellness", icon: Heart },
    { id: "education", name: "Learning", icon: GraduationCap },
    { id: "family", name: "Family", icon: Baby },
    { id: "lifestyle", name: "Lifestyle", icon: Sparkles }
  ];

  const quickDateFilters = [
    { id: "all", name: "Any date" },
    { id: "today", name: "Today" },
    { id: "tomorrow", name: "Tomorrow" },
    { id: "weekend", name: "This weekend" },
    { id: "week", name: "This week" },
    { id: "month", name: "This month" }
  ];

  const quickPriceFilters = [
    { id: "all", name: "Any price" },
    { id: "free", name: "Free" },
    { id: "under-50", name: "Under $50" },
    { id: "under-100", name: "Under $100" }
  ];

  // Popular search suggestions
  const popularSearches = [
    "Live music", "Networking events", "Free events", "Weekend activities", 
    "Virtual workshops", "Food festivals", "Art exhibitions", "Tech meetups",
    "Fitness classes", "Comedy shows", "Wine tasting", "Family fun"
  ];

  // Filter to only show public events
  const publicEvents = mockEvents.filter(event => event.isPublic !== false);

  // Advanced filtering logic
  const filteredEvents = useMemo(() => {
    return publicEvents.filter(event => {
      // Search query filter
      const matchesSearch = searchQuery === "" || 
        event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        event.hostName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === "all" || 
        event.category.toLowerCase().includes(selectedCategory.toLowerCase());
      
      // Location filter
      const matchesLocation = selectedLocation === "All Locations" || 
        event.locations[0].city.includes(selectedLocation.split(",")[0]) ||
        selectedLocation === "Virtual" && event.format === "virtual";
      
      // Price filter
      const matchesPrice = priceFilter === "all" || 
        (priceFilter === "free" && event.ticketPrice === 0) ||
        (priceFilter === "under-50" && event.ticketPrice < 50) ||
        (priceFilter === "under-100" && event.ticketPrice < 100);
      
      // Format filter
      const matchesFormat = formatFilter === "all" || event.format === formatFilter;
      
      // Date filter (simplified for demo)
      const matchesDate = dateFilter === "all" || true; // Would implement actual date logic
      
      return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesFormat && matchesDate;
    });
  }, [searchQuery, selectedCategory, selectedLocation, priceFilter, formatFilter, dateFilter, publicEvents]);

  const featuredEvents = filteredEvents.filter(event => event.featured);
  const upcomingEvents = filteredEvents.filter(event => !event.featured);

  // Get events by category for sections
  const getEventsByCategory = (categoryId: string, limit: number = 6) => {
    return publicEvents
      .filter(event => categoryId === "all" || event.category.toLowerCase().includes(categoryId.toLowerCase()))
      .slice(0, limit);
  };

  const handleSaveEvent = (eventId: string) => {
    if (savedEvents.includes(eventId)) {
      setSavedEvents(savedEvents.filter(id => id !== eventId));
    } else {
      setSavedEvents([...savedEvents, eventId]);
    }
  };

  const trendingEvents = publicEvents.filter(event => event.attendeeCount > 500).slice(0, 6);
  const freeEvents = publicEvents.filter(event => event.ticketPrice === 0).slice(0, 6);
  const thisWeekendEvents = publicEvents.slice(8, 14);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Enhanced Header with Profile Dropdown */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-white">
              EventFlow
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="outlineLight" size="sm">
                  Create Event
                </Button>
              </Link>
              {user && (
                <Link to="/dashboard">
                  <Button size="sm">
                    My Events
                  </Button>
                </Link>
              )}
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Enhanced Search */}
      <div className="py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-blue-800/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Discover amazing events
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Find experiences that inspire, connect, and entertain
            </p>

            {/* Enhanced Search Bar */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-2 max-w-4xl mx-auto border border-white/20">
              <div className="flex flex-col lg:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-3 text-white/60" />
                  <Input
                    placeholder="Search events, categories, or keywords"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-0 focus-visible:ring-0 text-lg h-12 bg-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="lg:w-48">
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="border-0 focus:ring-0 h-12 bg-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="lg:w-32">
                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger className="border-0 focus:ring-0 h-12 bg-white/20 text-white">
                      <SelectValue placeholder="Price" />
                    </SelectTrigger>
                    <SelectContent>
                      {quickPriceFilters.map(filter => (
                        <SelectItem key={filter.id} value={filter.id}>{filter.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="h-12 px-8">
                  Search
                </Button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-6">
              <p className="text-sm text-purple-200 mb-3">Popular: </p>
              <div className="flex flex-wrap justify-center gap-2">
                {popularSearches.slice(0, 8).map(search => (
                  <Button
                    key={search}
                    variant="outlineLight"
                    size="sm"
                    onClick={() => setSearchQuery(search)}
                    className="text-xs"
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {quickDateFilters.map(filter => (
                <Button
                  key={filter.id}
                  variant={dateFilter === filter.id ? "default" : "outlineLight"}
                  size="sm"
                  onClick={() => setDateFilter(filter.id)}
                >
                  {filter.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Browse by Category */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">Browse by category</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {enhancedCategories.map(category => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className={`flex-shrink-0 cursor-pointer transition-all duration-200 ${
                  selectedCategory === category.id ? 'transform scale-105' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className={`w-24 h-24 rounded-xl flex flex-col items-center justify-center transition-colors ${
                  selectedCategory === category.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'
                }`}>
                  <IconComponent className="w-8 h-8 mb-1" />
                  <span className="text-xs font-medium text-center">{category.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Featured events</h2>
            <Button variant="ghostLight">
              See all <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {featuredEvents.map(event => (
              <div key={event.id} className="flex-shrink-0 w-80">
                <PublicEventCard
                  event={event}
                  isSaved={savedEvents.includes(event.id)}
                  onSave={() => handleSaveEvent(event.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trending This Week */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Trending this week</h2>
          <Button variant="ghostLight">
            See all <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {trendingEvents.map(event => (
            <div key={event.id} className="flex-shrink-0 w-80">
              <PublicEventCard
                event={event}
                isSaved={savedEvents.includes(event.id)}
                onSave={() => handleSaveEvent(event.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Free Events */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Free events near you</h2>
          <Button variant="ghostLight">
            See all <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {freeEvents.map(event => (
            <div key={event.id} className="flex-shrink-0 w-80">
              <PublicEventCard
                event={event}
                isSaved={savedEvents.includes(event.id)}
                onSave={() => handleSaveEvent(event.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* This Weekend */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">This weekend in {selectedLocation}</h2>
          <Button variant="ghostLight">
            See all <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {thisWeekendEvents.map(event => (
            <div key={event.id} className="flex-shrink-0 w-80">
              <PublicEventCard
                event={event}
                isSaved={savedEvents.includes(event.id)}
                onSave={() => handleSaveEvent(event.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* More Events Grid */}
      {filteredEvents.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {selectedCategory === "all" ? "More events" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} events`}
              <span className="text-base font-normal text-purple-200 ml-2">({filteredEvents.length} events)</span>
            </h2>
            <div className="flex gap-2">
              <Select value={formatFilter} onValueChange={setFormatFilter}>
                <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All formats</SelectItem>
                  <SelectItem value="in-person">In-person</SelectItem>
                  <SelectItem value="virtual">Virtual</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outlineLight"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.slice(0, 18).map(event => (
              <PublicEventCard
                key={event.id}
                event={event}
                isSaved={savedEvents.includes(event.id)}
                onSave={() => handleSaveEvent(event.id)}
              />
            ))}
          </div>
          
          {filteredEvents.length > 18 && (
            <div className="text-center mt-8">
              <Button>
                Load more events
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Advanced Filters */}
      {showFilters && (
        <EventSearchFilters 
          onClose={() => setShowFilters(false)}
          onFiltersChange={(filters) => {
            console.log("Advanced filters:", filters);
          }}
        />
      )}

      {/* No Results */}
      {filteredEvents.length === 0 && (
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Calendar className="w-16 h-16 text-purple-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
            <p className="text-purple-200 mb-6">
              Try adjusting your search criteria or browse different categories
            </p>
            <div className="flex justify-center gap-3">
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setDateFilter("all");
                  setPriceFilter("all");
                  setFormatFilter("all");
                }}
              >
                Clear all filters
              </Button>
              <Button variant="outlineLight" onClick={() => setSelectedLocation("Virtual")}>
                Try virtual events
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicEvents;
