import { useState, useEffect } from "react";
import type { VenuePreset, VendorProfile } from "@/types/venue";

// Mock data for venue presets
const mockVenuePresets: VenuePreset[] = [
  {
    id: "preset-1",
    vendorId: "vendor-1",
    vendorBusinessName: "Grand Reception Hall",
    name: "Elegant Wedding Setup",
    description: "Classic wedding reception with round tables for 150 guests",
    category: { id: "wedding", name: "Wedding", description: "Wedding receptions and ceremonies" },
    venueType: "table-based",
    capacity: 150,
    pricingInfo: {
      basePrice: 2500,
      pricePerGuest: 15,
      currency: "USD",
      includes: ["Tables", "Chairs", "Basic linens", "Stage setup"],
      excludes: ["Catering", "Decorations", "Entertainment"]
    },
    tags: ["wedding", "formal", "elegant", "round-tables"],
    tables: [
      { id: 1, name: "Table 1", seats: 8, shape: "round", x: 100, y: 100, guests: [], seatAssignments: {} },
      { id: 2, name: "Table 2", seats: 8, shape: "round", x: 250, y: 100, guests: [], seatAssignments: {} },
      { id: 3, name: "Table 3", seats: 8, shape: "round", x: 400, y: 100, guests: [], seatAssignments: {} },
      { id: 4, name: "Table 4", seats: 8, shape: "round", x: 100, y: 250, guests: [], seatAssignments: {} },
      { id: 5, name: "Table 5", seats: 8, shape: "round", x: 250, y: 250, guests: [], seatAssignments: {} },
      { id: 6, name: "Table 6", seats: 8, shape: "round", x: 400, y: 250, guests: [], seatAssignments: {} }
    ],
    chairs: [],
    seats: [],
    seatSections: [],
    venueObjects: [
      { id: 1, name: "Main Stage", type: "stage", x: 275, y: 50, width: 200, height: 80, color: "#8B5CF6" },
      { id: 2, name: "Dance Floor", type: "dancefloor", x: 200, y: 350, width: 150, height: 150, color: "#10B981" }
    ],
    thumbnailUrl: "/api/placeholder/400/300",
    isPublic: true,
    isActive: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    version: 1
  },
  {
    id: "preset-2",
    vendorId: "vendor-1", 
    vendorBusinessName: "Grand Reception Hall",
    name: "Corporate Conference",
    description: "Professional setup for corporate events and conferences",
    category: { id: "corporate", name: "Corporate", description: "Business events and conferences" },
    venueType: "table-based",
    capacity: 100,
    pricingInfo: {
      basePrice: 1800,
      pricePerGuest: 12,
      currency: "USD",
      includes: ["Tables", "Chairs", "A/V equipment", "Podium"],
      excludes: ["Catering", "Materials", "Speakers"]
    },
    tags: ["corporate", "business", "conference", "professional"],
    tables: [
      { id: 1, name: "Table 1", seats: 6, shape: "rectangular", x: 100, y: 150, guests: [], seatAssignments: {} },
      { id: 2, name: "Table 2", seats: 6, shape: "rectangular", x: 300, y: 150, guests: [], seatAssignments: {} },
      { id: 3, name: "Table 3", seats: 6, shape: "rectangular", x: 100, y: 250, guests: [], seatAssignments: {} },
      { id: 4, name: "Table 4", seats: 6, shape: "rectangular", x: 300, y: 250, guests: [], seatAssignments: {} }
    ],
    chairs: [],
    seats: [],
    seatSections: [],
    venueObjects: [
      { id: 1, name: "Presentation Stage", type: "podium", x: 200, y: 50, width: 150, height: 60, color: "#3B82F6" }
    ],
    thumbnailUrl: "/api/placeholder/400/300",
    isPublic: true,
    isActive: true,
    createdAt: "2024-01-18",
    updatedAt: "2024-01-22",
    version: 1
  }
];

// Mock vendors who offer venue services
const mockVenueVendors: VendorProfile[] = [
  {
    id: "vendor-1",
    name: "Grand Reception Hall",
    category: "Venue",
    subcategories: ["Wedding Venue", "Corporate Venue", "Event Space"],
    description: "Premier event venue with multiple layout options",
    location: "Downtown Metro Area",
    contact: {
      email: "bookings@grandreception.com",
      phone: "(555) 123-4567",
      website: "https://grandreception.com"
    },
    rating: 4.8,
    reviewCount: 127,
    portfolio: [],
    services: ["Venue Rental", "Setup Service", "Layout Design", "Equipment Rental"],
    priceRange: "premium",
    availability: { busy: [], available: [] },
    verified: true,
    responseTime: "Within 2 hours",
    completedEvents: 450,
    certifications: ["Event Safety Certified", "Fire Safety Compliant"],
    insurance: true,
    specialties: ["Weddings", "Corporate Events", "Galas"],
    yearEstablished: 2015,
    teamSize: 12,
    awards: ["Best Venue 2023", "Excellence in Service"],
    presets: []
  }
];

export const useVendorPresets = () => {
  const [vendorPresets, setVendorPresets] = useState<VenuePreset[]>([]);
  const [venueVendors, setVenueVendors] = useState<VendorProfile[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<VendorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setVendorPresets(mockVenuePresets);
      setVenueVendors(mockVenueVendors);
      setLoading(false);
    };

    loadData();
  }, []);

  const getPresetsByVendor = (vendorId: string) => {
    return vendorPresets.filter(preset => preset.vendorId === vendorId && preset.isActive);
  };

  const getPresetsByCategory = (categoryId: string) => {
    return vendorPresets.filter(preset => preset.category.id === categoryId && preset.isActive);
  };

  const searchPresets = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return vendorPresets.filter(preset => 
      preset.name.toLowerCase().includes(lowerQuery) ||
      preset.description?.toLowerCase().includes(lowerQuery) ||
      preset.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      preset.vendorBusinessName.toLowerCase().includes(lowerQuery)
    );
  };

  const getPresetById = (presetId: string) => {
    return vendorPresets.find(preset => preset.id === presetId);
  };

  return {
    vendorPresets,
    venueVendors,
    selectedVendor,
    setSelectedVendor,
    loading,
    getPresetsByVendor,
    getPresetsByCategory,
    searchPresets,
    getPresetById
  };
};