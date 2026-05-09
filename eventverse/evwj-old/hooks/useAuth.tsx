import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

export type UserTypeV2 = User;

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
			profileData?: any;
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
			profileData?: any;
			lastSync?: Date;
			connectedAt?: Date;
		};
		instagram?: {
			connected: boolean;
			profileData?: any;
			lastSync?: Date;
			connectedAt?: Date;
		};
		facebook?: {
			connected: boolean;
			profileData?: {
				pageName?: string;
				pageId?: string;
				followerCount?: number;
				profilePicture?: string;
			};
			lastSync?: Date;
			connectedAt?: Date;
		};
		tiktok?: {
			connected: boolean;
			profileData?: {
				username?: string;
				followerCount?: number;
				verified?: boolean;
				videoCount?: number;
				profilePicture?: string;
			};
			lastSync?: Date;
			connectedAt?: Date;
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
			min: number;
			max: number;
			currency: string;
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
			advanceBookingDays: number;
			depositRequired: boolean;
			cancellationPolicy: string;
		};
	};

	// Organization context
	currentOrganizationId?: string | null;
	organizationMemberships: Array<{
		organizationId: string;
		organizationName: string;
		role: "owner" | "admin" | "member" | "viewer" | "check_in";
		logoUrl?: string;
		verifiedBadge: boolean;
		integrationSource?: "microsoft_teams" | "slack" | "manual";
		joinedDate?: Date;
	}>;
	activeProfileContext: "personal" | "organization";
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
	importFacebookProfile: () => Promise<void>;
	importTikTokProfile: () => Promise<void>;
	disconnectSocialProfile: (
		platform: "linkedin" | "instagram" | "facebook" | "tiktok",
	) => void;
	syncSocialProfiles: () => Promise<void>;
	currentOrganizationId: string | null;
	switchToOrganization: (orgId: string) => void;
	switchToPersonal: () => void;
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
	activeProfileContext: "personal",
	currentOrganizationId: null,
	organizationMemberships: [
		{
			organizationId: "org-2",
			organizationName: "Elite Events & Co.",
			role: "owner",
			logoUrl:
				"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=100&h=100&fit=crop",
			verifiedBadge: true,
			integrationSource: "manual",
			joinedDate: new Date("2022-03-15"),
		},
		{
			organizationId: "org-1",
			organizationName: "TechCorp Inc.",
			role: "member",
			logoUrl:
				"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
			verifiedBadge: true,
			integrationSource: "microsoft_teams",
			joinedDate: new Date("2023-08-22"),
		},
		{
			organizationId: "org-4",
			organizationName: "Global Consulting Partners",
			role: "viewer",
			logoUrl:
				"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop",
			verifiedBadge: true,
			integrationSource: "slack",
			joinedDate: new Date("2024-01-10"),
		},
	],
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
			connectedAt: new Date("2024-01-15"),
			profileData: {
				name: "Alexandra Chen - Event Director",
				followers: 3847,
				bio: "Senior Event Director at Elite Events & Co. | Award-winning event planner",
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
			connectedAt: new Date("2024-02-10"),
			profileData: {
				username: "@alexandrachenevents",
				followers: 12500,
				verified: true,
				bio: "Creating magical moments ✨ Event planning & design 🎉",
				followerCount: 12500,
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
		facebook: {
			connected: true,
			connectedAt: new Date("2024-01-20"),
			profileData: {
				pageName: "Alexandra Chen Events",
				followerCount: 8921,
				pageId: "fb_page_12345",
				profilePicture:
					"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
			},
			lastSync: new Date(),
		},
		tiktok: {
			connected: true,
			connectedAt: new Date("2024-03-05"),
			profileData: {
				username: "@alexchenevents",
				followerCount: 24560,
				verified: false,
				videoCount: 127,
				profilePicture:
					"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
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
	isPublicOrganizer: false,
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
		const storedUser = localStorage.getItem("eventverse_user");
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
			localStorage.setItem("eventverse_user", JSON.stringify(mockUser));
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
		localStorage.setItem("eventverse_user", JSON.stringify(enhancedUser));
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("eventverse_user");
		localStorage.removeItem("eventverse_events");
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
			localStorage.setItem("eventverse_user", JSON.stringify(updatedUser));
		}
	};

	const switchProfileType = (type: "personal" | "professional") => {
		if (user) {
			const updatedUser = { ...user, activeProfileType: type };
			setUser(updatedUser);
			localStorage.setItem("eventverse_user", JSON.stringify(updatedUser));
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
			localStorage.setItem("eventverse_user", JSON.stringify(updatedUser));
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
			localStorage.setItem("eventverse_user", JSON.stringify(updatedUser));
		}
	};

	const importFacebookProfile = async () => {
		if (user) {
			const mockFacebookData = {
				pageName: "EventVerse Official",
				pageId: "fb-page-123",
				followerCount: 8500,
				profilePicture:
					"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
			};

			const updatedUser = {
				...user,
				socialIntegrations: {
					...user.socialIntegrations,
					facebook: {
						connected: true,
						profileData: mockFacebookData,
						lastSync: new Date(),
						connectedAt: new Date(),
					},
				},
			};

			setUser(updatedUser);
			localStorage.setItem("eventverse_user", JSON.stringify(updatedUser));
		}
	};

	const importTikTokProfile = async () => {
		if (user) {
			const mockTikTokData = {
				username: "@eventverse_official",
				followerCount: 12300,
				verified: true,
				videoCount: 45,
				profilePicture:
					"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
			};

			const updatedUser = {
				...user,
				socialIntegrations: {
					...user.socialIntegrations,
					tiktok: {
						connected: true,
						profileData: mockTikTokData,
						lastSync: new Date(),
						connectedAt: new Date(),
					},
				},
			};

			setUser(updatedUser);
			localStorage.setItem("eventverse_user", JSON.stringify(updatedUser));
		}
	};

	const disconnectSocialProfile = (
		platform: "linkedin" | "instagram" | "facebook" | "tiktok",
	) => {
		if (user) {
			const updatedUser = {
				...user,
				socialIntegrations: {
					...user.socialIntegrations,
					[platform]: undefined,
				},
			};

			setUser(updatedUser);
			localStorage.setItem("eventverse_user", JSON.stringify(updatedUser));
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
			if (updatedIntegrations.facebook?.connected) {
				updatedIntegrations.facebook.lastSync = new Date();
			}
			if (updatedIntegrations.tiktok?.connected) {
				updatedIntegrations.tiktok.lastSync = new Date();
			}

			const updatedUser = {
				...user,
				socialIntegrations: updatedIntegrations,
			};

			setUser(updatedUser);
			localStorage.setItem("eventverse_user", JSON.stringify(updatedUser));
		}
	};

	const switchToOrganization = (orgId: string) => {
		if (user) {
			const updatedUser = {
				...user,
				currentOrganizationId: orgId,
				activeProfileContext: "organization" as const,
			};
			setUser(updatedUser);
			localStorage.setItem("eventverse_user", JSON.stringify(updatedUser));
			localStorage.setItem("eventverse_current_org_id", orgId);
		}
	};

	const switchToPersonal = () => {
		if (user) {
			const updatedUser = {
				...user,
				currentOrganizationId: null,
				activeProfileContext: "personal" as const,
				activeProfileType: "personal" as const,
			};
			setUser(updatedUser);
			localStorage.setItem("eventverse_user", JSON.stringify(updatedUser));
			localStorage.removeItem("eventverse_current_org_id");
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
				importFacebookProfile,
				importTikTokProfile,
				disconnectSocialProfile,
				syncSocialProfiles,
				currentOrganizationId: user?.currentOrganizationId ?? null,
				switchToOrganization,
				switchToPersonal,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		// throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
