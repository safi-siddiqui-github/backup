import { ProfileDataType } from "@/types/special-guest";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  plan: "free" | "premium" | "enterprise";
  eventsCreated: number;
  profilePhoto?: string;
  location?: string;
  bio?: string;
  phone?: string;

  // Profile type switching
  activeProfileType: "personal" | "professional";
  personalProfile?: {
    bio?: string;
    interests?: string[];
    personalLinks?: {
      instagram?: string;
      twitter?: string;
      facebook?: string;
    };
    personalPhoto?: string;
  };

  professionalProfile?: {
    bio?: string;
    company?: string;
    jobTitle?: string;
    industry?: string;
    yearsHosting?: number;
    specializations?: string[];
    certifications?: string[];
    professionalPhoto?: string;
    website?: string;
    linkedinProfile?: {
      url?: string;
      profileData?: ProfileDataType;
      lastSync?: Date;
    };
  };

  // Legacy fields (for backward compatibility)
  company?: string;
  jobTitle?: string;
  industry?: string;
  yearsHosting?: number;
  specializations?: string[];
  certifications?: string[];

  // Social integration
  website?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  socialIntegrations?: {
    linkedin?: {
      connected: boolean;
      profileData?: ProfileDataType;
      lastSync?: Date;
    };
    instagram?: {
      connected: boolean;
      profileData?: ProfileDataType;
      lastSync?: Date;
    };
  };

  // Profile metadata
  coverPhoto?: string;
  joinDate?: Date;
  profileCompleteness?: number;
  verificationStatus?: {
    email: boolean;
    phone: boolean;
    identity: boolean;
  };

  // Preferences
  timezone?: string;
  language?: string;
  notificationPreferences?: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };

  // Statistics
  totalEventsHosted?: number;
  totalAttendeesHosted?: number;
  averageRating?: number;
  responseRate?: number;
  profileViews?: number;

  // Event Organizer Profile
  isPublicOrganizer?: boolean;
  organizerProfile?: {
    businessName?: string;
    businessLicense?: string;
    insuranceInfo?: string;
    eventTypes: string[];
    serviceAreas: string[];
    priceRange?: {
      min?: number;
      max?: number;
      currency?: string;
    };
    portfolioImages?: string[];
    testimonials?: Array<{
      id: string;
      clientName: string;
      eventType: string;
      rating: number;
      comment: string;
      date: string;
    }>;
    availability?: {
      daysAvailable: string[];
      hoursOfOperation: {
        start: string;
        end: string;
      };
    };
    bookingPreferences?: {
      advanceBookingDays?: number;
      depositRequired?: boolean;
      cancellationPolicy?: string;
    };
  };
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (updates: Partial<User>) => void;
  switchProfileType: (type: "personal" | "professional") => void;
  importLinkedInProfile: () => Promise<void>;
  importInstagramProfile: () => Promise<void>;
  syncSocialProfiles: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Enhanced mock user data for showcase
const createMockUser = (): User => ({
  id: "demo-user-123",
  name: "Alexandra Chen",
  email: "alexandra.chen@eventpro.com",
  plan: "premium",
  eventsCreated: 47,
  profilePhoto:
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
  location: "San Francisco, CA",
  bio: "Award-winning event planner with over 8 years of experience creating unforgettable moments. Specializing in luxury weddings, corporate retreats, and tech conferences. Passionate about sustainable event practices and innovative design solutions that bring visions to life.",
  phone: "+1 (415) 555-0123",

  // Profile type switching
  activeProfileType: "professional",
  personalProfile: {
    bio: "Travel enthusiast and foodie who loves bringing people together for amazing experiences. When not planning events, you can find me exploring new restaurants, hiking scenic trails, or trying out the latest coffee shops in the city.",
    interests: [
      "Travel",
      "Photography",
      "Cooking",
      "Hiking",
      "Coffee Culture",
      "Wine Tasting",
    ],
    personalLinks: {
      instagram: "https://instagram.com/alexandra_adventures",
      twitter: "https://twitter.com/alex_personal",
      facebook: "https://facebook.com/alexandra.chen.personal",
    },
    personalPhoto:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
  },

  professionalProfile: {
    bio: "Award-winning event planner with over 8 years of experience creating unforgettable moments. Specializing in luxury weddings, corporate retreats, and tech conferences. Passionate about sustainable event practices and innovative design solutions that bring visions to life.",
    company: "Elite Events & Co.",
    jobTitle: "Senior Event Director",
    industry: "Event Planning & Management",
    yearsHosting: 8,
    specializations: [
      "Luxury Weddings",
      "Corporate Events",
      "Tech Conferences",
      "Product Launches",
      "Charity Galas",
      "Destination Events",
    ],
    certifications: [
      "Certified Meeting Professional (CMP)",
      "Certified Special Events Professional (CSEP)",
      "LEED Green Associate",
      "Google Analytics Certified",
      "Crisis Management Certification",
    ],
    professionalPhoto:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    website: "https://alexandrachen-events.com",
    linkedinProfile: {
      url: "https://linkedin.com/in/alexandrachen-events",
      profileData: {
        headline: "Senior Event Director at Elite Events & Co.",
        summary:
          "Award-winning event planner specializing in luxury experiences",
        experience: [
          {
            company: "Elite Events & Co.",
            position: "Senior Event Director",
            duration: "2019 - Present",
          },
        ],
      },
      lastSync: new Date(),
    },
  },

  // Professional details
  company: "Elite Events & Co.",
  jobTitle: "Senior Event Director",
  industry: "Event Planning & Management",
  yearsHosting: 8,
  specializations: [
    "Luxury Weddings",
    "Corporate Events",
    "Tech Conferences",
    "Product Launches",
    "Charity Galas",
    "Destination Events",
  ],
  certifications: [
    "Certified Meeting Professional (CMP)",
    "Certified Special Events Professional (CSEP)",
    "LEED Green Associate",
    "Google Analytics Certified",
    "Crisis Management Certification",
  ],

  // Social links & integrations
  website: "https://alexandrachen-events.com",
  socialLinks: {
    linkedin: "https://linkedin.com/in/alexandrachen-events",
    twitter: "https://twitter.com/alexevents",
    instagram: "https://instagram.com/alexandrachenevents",
    facebook: "https://facebook.com/alexandrachenevents",
  },
  socialIntegrations: {
    linkedin: {
      connected: true,
      profileData: {
        headline: "Senior Event Director at Elite Events & Co.",
        summary:
          "Award-winning event planner specializing in luxury experiences",
        profilePicture:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        experience: [
          {
            company: "Elite Events & Co.",
            position: "Senior Event Director",
            duration: "2019 - Present",
          },
        ],
      },
      lastSync: new Date(),
    },
    instagram: {
      connected: true,
      profileData: {
        username: "alexandrachenevents",
        followerCount: 12500,
        bio: "Creating magical moments ✨ Event planning & design 🎉",
        profilePicture:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        recentPosts: [
          {
            id: "1",
            imageUrl:
              "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=600&fit=crop",
            caption: "Beautiful vineyard wedding in Napa Valley ✨",
          },
        ],
      },
      lastSync: new Date(),
    },
  },

  // Profile metadata
  coverPhoto:
    "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&h=400&fit=crop",
  joinDate: new Date("2020-03-15"),
  profileCompleteness: 100,
  verificationStatus: {
    email: true,
    phone: true,
    identity: true,
  },

  // Preferences
  timezone: "America/Los_Angeles",
  language: "English",
  notificationPreferences: {
    email: true,
    sms: true,
    push: true,
  },

  // Statistics
  totalEventsHosted: 156,
  totalAttendeesHosted: 18750,
  averageRating: 4.9,
  responseRate: 98,
  profileViews: 2847,

  // Event Organizer Profile
  isPublicOrganizer: true,
  organizerProfile: {
    businessName: "Elite Events & Co.",
    businessLicense: "EV-2020-SF-001234",
    insuranceInfo: "General Liability: $2M, Professional Liability: $1M",
    eventTypes: [
      "Luxury Weddings",
      "Corporate Events",
      "Tech Conferences",
      "Product Launches",
      "Charity Galas",
    ],
    serviceAreas: [
      "San Francisco Bay Area",
      "Napa Valley",
      "Silicon Valley",
      "Monterey Peninsula",
    ],
    priceRange: {
      min: 5000,
      max: 150000,
      currency: "USD",
    },
    portfolioImages: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop",
    ],
    availability: {
      daysAvailable: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      hoursOfOperation: {
        start: "09:00",
        end: "21:00",
      },
    },
    bookingPreferences: {
      advanceBookingDays: 90,
      depositRequired: true,
      cancellationPolicy: "50% refund if cancelled 30+ days in advance",
    },
  },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user on mount, otherwise use enhanced mock data
    const storedUser = localStorage.getItem("eventflow_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Enhance stored user with mock data if fields are missing
      const enhancedUser = {
        ...createMockUser(),
        ...parsedUser,
        joinDate: parsedUser.joinDate
          ? new Date(parsedUser.joinDate)
          : new Date(),
        profileCompleteness: calculateProfileCompleteness(parsedUser),
      };
      setUser(enhancedUser);
    } else {
      // Use comprehensive mock user for showcase
      const mockUser = createMockUser();
      setUser(mockUser);
      localStorage.setItem("eventflow_user", JSON.stringify(mockUser));
    }
  }, []);

  const calculateProfileCompleteness = (userData: Partial<User>): number => {
    const fields = [
      "name",
      "email",
      "phone",
      "location",
      "bio",
      "profilePhoto",
      "company",
      "jobTitle",
      "industry",
      "website",
    ];
    const filledFields = fields.filter(
      (field) => userData[field as keyof User],
    );
    return Math.round((filledFields.length / fields.length) * 100);
  };

  const login = (userData: User) => {
    const enhancedUser = {
      ...userData,
      profileCompleteness: calculateProfileCompleteness(userData),
      joinDate: userData.joinDate || new Date(),
    };
    setUser(enhancedUser);
    localStorage.setItem("eventflow_user", JSON.stringify(enhancedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eventflow_user");
    localStorage.removeItem("eventflow_events");
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...updates,
        profileCompleteness: calculateProfileCompleteness({
          ...user,
          ...updates,
        }),
      };
      setUser(updatedUser);
      localStorage.setItem("eventflow_user", JSON.stringify(updatedUser));
    }
  };

  const switchProfileType = (type: "personal" | "professional") => {
    if (user) {
      const updatedUser = { ...user, activeProfileType: type };
      setUser(updatedUser);
      localStorage.setItem("eventflow_user", JSON.stringify(updatedUser));
    }
  };

  const importLinkedInProfile = async () => {
    // Mock LinkedIn import - in real app, this would use LinkedIn API
    if (user) {
      const mockLinkedInData = {
        headline: "Senior Event Director at Elite Events & Co.",
        summary:
          "Award-winning event planner specializing in luxury experiences",
        profilePicture:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        experience: [
          {
            company: "Elite Events & Co.",
            position: "Senior Event Director",
            duration: "2019 - Present",
          },
        ],
      };

      const updatedUser = {
        ...user,
        socialIntegrations: {
          ...user.socialIntegrations,
          linkedin: {
            connected: true,
            profileData: mockLinkedInData,
            lastSync: new Date(),
          },
        },
        professionalProfile: {
          ...user.professionalProfile,
          linkedinProfile: {
            url: "https://linkedin.com/in/imported-profile",
            profileData: mockLinkedInData,
            lastSync: new Date(),
          },
        },
      };

      setUser(updatedUser);
      localStorage.setItem("eventflow_user", JSON.stringify(updatedUser));
    }
  };

  const importInstagramProfile = async () => {
    // Mock Instagram import - in real app, this would use Instagram API
    if (user) {
      const mockInstagramData = {
        username: "imported_user",
        followerCount: 5200,
        bio: "Imported from Instagram",
        profilePicture:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        recentPosts: [],
      };

      const updatedUser = {
        ...user,
        socialIntegrations: {
          ...user.socialIntegrations,
          instagram: {
            connected: true,
            profileData: mockInstagramData,
            lastSync: new Date(),
          },
        },
      };

      setUser(updatedUser);
      localStorage.setItem("eventflow_user", JSON.stringify(updatedUser));
    }
  };

  const syncSocialProfiles = async () => {
    // Mock sync function - in real app, this would sync with actual APIs
    if (user?.socialIntegrations) {
      const updatedIntegrations = { ...user.socialIntegrations };

      if (updatedIntegrations.linkedin?.connected) {
        updatedIntegrations.linkedin.lastSync = new Date();
      }
      if (updatedIntegrations.instagram?.connected) {
        updatedIntegrations.instagram.lastSync = new Date();
      }

      const updatedUser = {
        ...user,
        socialIntegrations: updatedIntegrations,
      };

      setUser(updatedUser);
      localStorage.setItem("eventflow_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        updateUser,
        switchProfileType,
        importLinkedInProfile,
        importInstagramProfile,
        syncSocialProfiles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
