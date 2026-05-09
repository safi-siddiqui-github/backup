"use client";

import { useState } from "react";
import { MdKeyboardArrowDown, MdCalendarToday, MdLocationOn } from "react-icons/md";

interface FilterPanelProps {
  onCategoryChange?: (category: string) => void;
  onFiltersChange?: (filters: any) => void;
}

export default function FilterPanel({ onCategoryChange, onFiltersChange }: FilterPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDate, setSelectedDate] = useState("Pick a date range");
  const [selectedLocation, setSelectedLocation] = useState("City, Country");
  const [eventType, setEventType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);

  const categories = ["All Categories", "Music", "Art & Culture", "Food", "Business", "Sports", "Education", "Charity"];
  const locations = ["City, Country", "New York, USA", "London, UK", "Tokyo, Japan", "Paris, France"];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
    updateFilters({ ...getCurrentFilters(), category });
  };

  const getCurrentFilters = () => {
    return {
      category: selectedCategory,
      date: selectedDate,
      location: selectedLocation,
      eventType: eventType,
      priceRange: priceRange
    };
  };

  const updateFilters = (filters: any) => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  };

  const handleDateClick = () => {
    // Trigger the date input
    const dateInput = document.getElementById('date-input') as HTMLInputElement;
    if (dateInput) {
      dateInput.focus();
      dateInput.showPicker?.();
      dateInput.click();
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const date = new Date(e.target.value);
      const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
      setSelectedDate(formattedDate);
      updateFilters({ ...getCurrentFilters(), date: formattedDate });
    } else {
      setSelectedDate("Pick a date range");
      updateFilters({ ...getCurrentFilters(), date: "Pick a date range" });
    }
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    updateFilters({ ...getCurrentFilters(), location });
  };

  const handleEventTypeChange = (type: string) => {
    setEventType(type);
    updateFilters({ ...getCurrentFilters(), eventType: type });
  };

  const handlePriceRangeChange = (range: number[]) => {
    setPriceRange(range);
    updateFilters({ ...getCurrentFilters(), priceRange: range });
  };

  return (
    <div className="flex justify-center lg:justify-start">
       <div 
         className="bg-white rounded-[40px] shadow-lg w-full max-w-[332px] sm:w-[332px] h-[400px] sm:h-[500px] p-3 sm:p-5"
         style={{
           borderRadius:'40px',
           opacity: 1,
         }}
       >
        <div className="flex flex-col h-full gap-2 sm:gap-4">
          {/* Category Filter */}
          <div className="flex flex-col gap-1 sm:gap-2">
            <label className="text-xs sm:text-sm font-bold text-gray-900">Category</label>
            <div className="relative">
               <select
                 value={selectedCategory}
                 onChange={(e) => handleCategoryChange(e.target.value)}
                 className="w-full px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-lg border text-xs sm:text-sm text-gray-900 appearance-none cursor-pointer"
                 style={{ borderColor: '#6F5ACD' }}
               >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <MdKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Date Filter */}
          <div className="flex flex-col gap-1 sm:gap-2">
            <label className="text-xs sm:text-sm font-bold text-gray-900">Date</label>
            <div className="relative">
               <input
                 id="date-input"
                 type="date"
                 value={selectedDate === "Pick a date range" ? "" : new Date(selectedDate).toISOString().split('T')[0]}
                 onChange={handleDateChange}
                 className="w-full px-1.5 sm:px-2 py-1 sm:py-1.5 pl-6 sm:pl-8 rounded-lg border text-xs sm:text-sm text-gray-900 cursor-pointer"
                 style={{ borderColor: '#6F5ACD' }}
                 placeholder="Pick a date range"
               />
              <MdCalendarToday 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 cursor-pointer pointer-events-none" 
                style={{ color: '#6F5ACD' }} 
              />
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="flex flex-col gap-1 sm:gap-2">
            <label className="text-xs sm:text-sm font-bold text-gray-900">Price Range ($0 - $500)</label>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => handlePriceRangeChange([0, parseInt(e.target.value)])}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{ 
                  background: `linear-gradient(to right, #6F5ACD 0%, #6F5ACD ${(priceRange[1] / 500) * 100}%, #E5E7EB ${(priceRange[1] / 500) * 100}%, #E5E7EB 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span className="text-xs">$0</span>
                <span className="text-xs">${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Event Type Filter */}
          <div className="flex flex-col gap-1 sm:gap-2">
            <label className="text-xs sm:text-sm font-bold text-gray-900">Event Type</label>
            <div className="flex flex-col gap-1 sm:gap-2">
              <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="eventType"
                  value="online"
                  checked={eventType === "online"}
                  onChange={(e) => handleEventTypeChange(e.target.value)}
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  style={{ accentColor: '#6F5ACD' }}
                />
                <span className="text-xs sm:text-sm text-gray-900">Online</span>
              </label>
              <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="eventType"
                  value="free"
                  checked={eventType === "free"}
                  onChange={(e) => handleEventTypeChange(e.target.value)}
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  style={{ accentColor: '#6F5ACD' }}
                />
                <span className="text-xs sm:text-sm text-gray-900">Free events only</span>
              </label>
            </div>
          </div>

          {/* Location Filter */}
          <div className="flex flex-col gap-1 sm:gap-2">
            <label className="text-xs sm:text-sm font-bold text-gray-900">Location</label>
             <div className="relative border border-[#6F5ACD] rounded-lg">
                 <select
                   value={selectedLocation}
                   onChange={(e) => handleLocationChange(e.target.value)}
                   className="w-full px-1.5 sm:px-2 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-900 appearance-none cursor-pointer border-none outline-none bg-transparent"
                 >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <MdKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 mt-auto">
             <button
               onClick={() => {
                 setSelectedCategory("All Categories");
                 setSelectedDate("Pick a date range");
                 setSelectedLocation("City, Country");
                 setEventType("");
                 setPriceRange([0, 500]);
               }}
               className="flex-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all hover:bg-gray-100"
               style={{ 
                 backgroundColor: '#F3F4F6',
                 color: '#374151'
               }}
             >
               Clear All
             </button>
             <button
               className="flex-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium text-white transition-all hover:opacity-90"
               style={{ backgroundColor: '#6F5ACD' }}
             >
               Apply Filters
             </button>
          </div>
        </div>
       </div>
    </div>
  );
}
