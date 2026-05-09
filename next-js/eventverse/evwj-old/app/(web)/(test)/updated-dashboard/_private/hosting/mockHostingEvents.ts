import { StaticImageData } from "next/image";

const testPhoto =
	"https://images.unsplash.com/photo-1761838816945-021a4ebd67bc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687";

export type MockHostingEvent = {
	id: string;
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	location: string;
	attendees: number;
	status: "draft" | "published";
	isPublic: boolean;
	isDemo: boolean;
	selectedModules: string[];
	eventType: string;
	poster?: string | StaticImageData;
	userId?: string;
	time?: string;
	locations?: Array<{
		id?: string;
		name: string;
		address: string;
		type?: "physical" | "virtual" | "hybrid";
		source?: "marketplace" | "manual";
		vendorName?: string;
		capacity?: number;
		sections?: Array<{
			id: string;
			name: string;
			description?: string;
			capacity?: number;
		}>;
	}>;
	photos?: string[];
	specialGuests?: Array<{
		name: string;
		title?: string;
		bio?: string;
		photo?: string;
		credentials?: string[];
	}>;
	faqs?: Array<{
		question: string;
		answer: string;
	}>;
	sessions?: Array<{
		name: string;
		startTime?: string;
		endTime?: string;
	}>;
	mealOptions?: string;
	dressCode?: string;
	transportation?: string;
	accommodation?: string;
	giftRegistry?: string;
	ticketTypes?: Array<{
		name: string;
		price: number;
		description?: string;
		available?: number;
	}>;
	guestGroups?: string[];
	weather?: {
		temperature: number;
		condition: string;
		icon: string;
	};
	conferenceData?: {
		tracks: Array<{
			id: string;
			name: string;
			color: string;
			description: string;
		}>;
		sessions: Array<{
			id: string;
			title: string;
			description: string;
			type:
				| "keynote"
				| "session"
				| "workshop"
				| "panel"
				| "networking"
				| "break";
			trackId?: string;
			speakerNames: string[];
			date: Date;
			startTime: string;
			endTime: string;
			location: string;
			capacity: number;
			registeredCount: number;
			waitlistCount: number;
			prerequisites?: string[];
			level: "beginner" | "intermediate" | "advanced" | "all";
			tags: string[];
		}>;
	};
}

export const mockHostingEvents: MockHostingEvent[] = [
	{
		id: "demo-1",
		name: "Global Tech Conference 2025",
		description:
			"Premier technology conference featuring AI innovation, business strategy, and emerging tech trends across multiple tracks and specialized sessions.",
		startDate: new Date("2025-03-15"),
		endDate: new Date("2025-03-17"),
		location: "Convention Center, San Francisco",
		attendees: 1200,
		status: "published",
		isPublic: true,
		isDemo: true,
		selectedModules: [
			"schedule",
			"announcements",
			"ticketing",
			"seating",
			"analytics",
			"survey",
			"media",
		],
		eventType: "Conference",
		// poster: techConferencePoster,
		poster: testPhoto,
		userId: "demo-user-123",
		time: "8:00 AM",
		locations: [
			{
				id: "1",
				name: "Main Convention Hall",
				address: "123 Tech Drive, San Francisco, CA 94103",
				type: "physical",
				source: "marketplace",
				vendorName: "Premium Venues Co.",
				capacity: 800,
				sections: [
					{
						id: "1",
						name: "Main Auditorium",
						description: "Primary presentation space",
						capacity: 1200,
					},
					{
						id: "2",
						name: "Exhibition Area",
						description: "Vendor booths and demos",
						capacity: 300,
					},
				],
			},
			{
				id: "2",
				name: "Workshop Rooms A-F",
				address: "123 Tech Drive, San Francisco, CA 94103",
				type: "physical",
				source: "marketplace",
				vendorName: "Premium Venues Co.",
			},
			{
				id: "3",
				name: "Networking Lounge",
				address: "123 Tech Drive, San Francisco, CA 94103",
				type: "physical",
				source: "manual",
			},
			{
				id: "4",
				name: "Exhibition Hall",
				address: "123 Tech Drive, San Francisco, CA 94103",
				type: "physical",
				source: "marketplace",
				vendorName: "Event Spaces Inc.",
			},
		],
		photos: [
			"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
			"https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
			"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
			"https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
			"https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800",
			"https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800",
			"https://images.unsplash.com/photo-1559223607-a43c990c6912?w=800",
			"https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
		],
		specialGuests: [
			{
				name: "Dr. Sarah Chen",
				title: "Chief AI Officer, TechCorp",
				bio: "Leading AI researcher with 15+ years experience in machine learning and neural networks. Pioneer in ethical AI development and deployment.",
				credentials: ["PhD Stanford", "TEDx Speaker", "AI Ethics Board"],
			},
			{
				name: "Marcus Rodriguez",
				title: "CEO, Future Systems",
				bio: "Serial entrepreneur and technology visionary. Built three successful AI startups and invested in 50+ tech companies.",
				credentials: ["Forbes 30 Under 30", "Y Combinator Alumni", "MIT Sloan"],
			},
			{
				name: "Dr. Alex Kim",
				title: "ML Research Lead, DeepMind",
				bio: "Expert in reinforcement learning and robotics. Published 40+ papers in top-tier AI conferences and journals.",
				credentials: ["ACM Fellow", "NeurIPS Best Paper", "Berkeley PhD"],
			},
			{
				name: "Jennifer Wu",
				title: "VP Product, AI Innovations",
				bio: "Product leader specializing in bringing AI solutions from research to production. Built products used by millions.",
				credentials: [
					"Google Alumni",
					"Product Leadership Award",
					"Stanford MBA",
				],
			},
		],
		faqs: [
			{
				question: "What is the dress code for the conference?",
				answer:
					"Business casual is recommended for all sessions. Comfortable attire is suggested as you'll be moving between different venues and sessions throughout the day.",
			},
			{
				question: "Are meals included with registration?",
				answer:
					"Yes! Your registration includes breakfast, lunch, and refreshments throughout the conference. We accommodate all dietary restrictions - just let us know during registration.",
			},
			{
				question: "Is there Wi-Fi available at the venue?",
				answer:
					"High-speed Wi-Fi is available throughout all conference venues. Network credentials will be provided upon check-in.",
			},
			{
				question: "Can I attend workshops without prior registration?",
				answer:
					"Most workshops require pre-registration due to limited capacity. Some workshops have prerequisites. Check the session details and register early to secure your spot.",
			},
			{
				question: "What is your cancellation policy?",
				answer:
					"Full refunds are available until 30 days before the event. After that, we offer credit towards future conferences. Contact our support team for special circumstances.",
			},
			{
				question: "Is parking available at the venue?",
				answer:
					"Yes, the Convention Center has a parking garage with validated parking for attendees. Public transportation is also recommended - the venue is accessible via BART and several bus lines.",
			},
			{
				question: "Will sessions be recorded?",
				answer:
					"Most keynotes and sessions will be recorded and made available to all registered attendees within 48 hours after the conference ends.",
			},
		],
		sessions: [
			{
				name: "Registration & Breakfast",
				startTime: "8:00 AM",
				endTime: "9:00 AM",
			},
			{ name: "Opening Keynote", startTime: "9:00 AM", endTime: "10:00 AM" },
			{ name: "Morning Sessions", startTime: "10:30 AM", endTime: "12:30 PM" },
			{ name: "Lunch & Networking", startTime: "12:30 PM", endTime: "2:00 PM" },
			{ name: "Afternoon Workshops", startTime: "2:00 PM", endTime: "5:00 PM" },
			{ name: "Evening Reception", startTime: "6:00 PM", endTime: "8:00 PM" },
		],
		mealOptions:
			"Breakfast, lunch, and refreshments included daily. Vegan and gluten-free options available.",
		dressCode: "Business casual recommended",
		transportation:
			"Parking available. Close to BART and bus lines. Shuttle service from major hotels.",
		accommodation:
			"Partner hotel rates available at Hilton SF Union Square and Marriott Marquis.",
		ticketTypes: [
			{
				name: "Early Bird",
				price: 599,
				description: "Save $200 on full conference access",
				available: 0,
			},
			{
				name: "General Admission",
				price: 799,
				description: "Full access to all sessions and workshops",
				available: 150,
			},
			{
				name: "VIP Pass",
				price: 1299,
				description:
					"Includes exclusive networking events and front-row seating",
				available: 25,
			},
		],
		guestGroups: ["Speakers", "Sponsors", "VIP", "Press", "General Admission"],
		weather: {
			temperature: 18,
			condition: "partly cloudy",
			icon: "cloud-sun",
		},
		conferenceData: {
			tracks: [
				{
					id: "ai-tech",
					name: "AI & Technology",
					color: "#3B82F6",
					description:
						"Latest in artificial intelligence and emerging technologies",
				},
				{
					id: "business",
					name: "Business Strategy",
					color: "#10B981",
					description: "Strategic insights for modern business leaders",
				},
				{
					id: "innovation",
					name: "Innovation Labs",
					color: "#F59E0B",
					description: "Hands-on workshops and experimental technologies",
				},
				{
					id: "networking",
					name: "Networking",
					color: "#8B5CF6",
					description: "Professional connections and industry meet-ups",
				},
			],
			sessions: [
				{
					id: "keynote-1",
					title: "The Future of AI in Business",
					description:
						"Opening keynote exploring AI transformation across industries",
					type: "keynote",
					trackId: "ai-tech",
					speakerNames: ["Dr. Sarah Chen", "Marcus Rodriguez"],
					date: new Date("2025-03-15"),
					startTime: "9:00 AM",
					endTime: "10:00 AM",
					location: "Main Hall",
					capacity: 1200,
					registeredCount: 987,
					waitlistCount: 45,
					level: "all",
					tags: ["AI", "Future", "Business"],
				},
				{
					id: "workshop-1",
					title: "Hands-on Machine Learning Workshop",
					description:
						"Interactive ML workshop with practical coding exercises",
					type: "workshop",
					trackId: "innovation",
					speakerNames: ["Dr. Alex Kim"],
					date: new Date("2025-03-15"),
					startTime: "2:00 PM",
					endTime: "4:00 PM",
					location: "Workshop Room A",
					capacity: 50,
					registeredCount: 47,
					waitlistCount: 15,
					prerequisites: ["Basic Python knowledge"],
					level: "intermediate",
					tags: ["ML", "Hands-on", "Python"],
				},
			],
		},
	},
	{
		id: "demo-2",
		name: "Luxury Wedding Experience",
		description:
			"Complete wedding celebration with premium features including seating arrangements, budget management, and media sharing.",
		startDate: new Date("2025-06-20"),
		endDate: new Date("2025-06-22"),
		location: "Grand Estate Resort, Napa Valley",
		attendees: 180,
		status: "published",
		isPublic: true,
		isDemo: true,
		selectedModules: [
			"rsvp",
			"seating",
			"budget",
			"media",
			"schedule",
			"announcements",
			"games",
			"survey",
		],
		eventType: "Wedding",
		// poster: weddingPoster,
		poster: testPhoto,
		userId: "demo-user-123",
		time: "4:00 PM",
		locations: [
			{
				id: "1",
				name: "Grand Estate Resort",
				address: "123 Vineyard Lane, Napa Valley, CA 94558",
				type: "physical",
				source: "marketplace",
				vendorName: "Luxury Venues Collection",
				sections: [
					{
						id: "1",
						name: "Grand Ballroom",
						description: "Main reception hall with chandelier",
						capacity: 150,
					},
					{
						id: "2",
						name: "Garden Terrace",
						description: "Outdoor ceremony space",
						capacity: 200,
					},
				],
			},
			{
				id: "2",
				name: "Chapel of Eternal Love",
				address: "456 Sacred Grove, Napa Valley, CA 94558",
				type: "physical",
				source: "marketplace",
				vendorName: "Sacred Ceremonies",
			},
			{
				id: "3",
				name: "Reception Garden",
				address: "789 Vineyard Terrace, Napa Valley, CA 94558",
				type: "physical",
				source: "manual",
			},
		],
		photos: [
			"https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
			"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
			"https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
			"https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
			"https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800",
			"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800",
			"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
			"https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800",
			"https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=800",
		],
		specialGuests: [
			{
				name: "Emily & James",
				title: "The Happy Couple",
				bio: "After meeting in college and 8 wonderful years together, we're finally tying the knot! Thank you for being part of our special day.",
				credentials: [
					"Childhood Sweethearts",
					"Adventure Lovers",
					"Dog Parents",
				],
			},
			{
				name: "Sarah Mitchell",
				title: "Maid of Honor",
				bio: "Emily's best friend since kindergarten. Professional event planner and the one who introduced the happy couple!",
				credentials: ["Best Friend", "Wedding Coordinator", "Speech Giver"],
			},
			{
				name: "Michael Chen",
				title: "Best Man",
				bio: "James's college roommate and partner in crime. Software engineer who still can't believe James is settling down.",
				credentials: [
					"College Roommate",
					"Groomsman Leader",
					"Bachelor Party Organizer",
				],
			},
			{
				name: "Rebecca & Tom Anderson",
				title: "Parents of the Bride",
				bio: "Proud parents who couldn't be happier to welcome James into the family. Married for 35 wonderful years.",
				credentials: ["Loving Parents", "Marriage Role Models", "Master Hosts"],
			},
		],
		faqs: [
			{
				question: "What is the dress code?",
				answer:
					"Formal attire. Ladies are encouraged to wear cocktail dresses or evening gowns. Gentlemen should wear suits or tuxedos. The ceremony and reception will be outdoors, so please consider comfortable footwear for grass and garden paths.",
			},
			{
				question: "Are children welcome?",
				answer:
					"We love your little ones, but this will be an adults-only celebration. We hope this gives parents a chance to enjoy a night off!",
			},
			{
				question: "When should I RSVP by?",
				answer:
					"Please RSVP by May 20th, 2025. This helps us finalize catering and seating arrangements. You can RSVP online or by returning the enclosed card.",
			},
			{
				question: "Where should I stay?",
				answer:
					"We have room blocks at the Grand Estate Resort and nearby Napa Valley Inn. Both offer shuttle service to the venue. Booking links are available on our website.",
			},
			{
				question: "Is there a gift registry?",
				answer:
					"Your presence is the greatest gift! However, if you wish to give something, we're registered at Crate & Barrel and have a honeymoon fund. Links are available on our website.",
			},
			{
				question: "Will transportation be provided?",
				answer:
					"Complimentary shuttle service will run between the ceremony and reception venues, as well as to and from partner hotels. We strongly encourage using this service.",
			},
			{
				question: "What time should I arrive?",
				answer:
					"Please arrive by 3:45 PM for the 4:00 PM ceremony. This allows time for parking and seating. The ceremony will begin promptly.",
			},
			{
				question: "Are there vegetarian/vegan meal options?",
				answer:
					"Absolutely! Please indicate your dietary restrictions when you RSVP. Our catering team can accommodate all dietary needs including vegetarian, vegan, gluten-free, and allergies.",
			},
		],
		sessions: [
			{
				name: "Guest Arrival & Seating",
				startTime: "3:45 PM",
				endTime: "4:00 PM",
			},
			{ name: "Ceremony", startTime: "4:00 PM", endTime: "4:30 PM" },
			{ name: "Cocktail Hour", startTime: "5:00 PM", endTime: "6:00 PM" },
			{ name: "Reception & Dinner", startTime: "6:00 PM", endTime: "9:00 PM" },
			{
				name: "Dancing & Celebration",
				startTime: "9:00 PM",
				endTime: "11:00 PM",
			},
		],
		mealOptions:
			"Three-course dinner with vegetarian, vegan, and gluten-free options. Open bar throughout reception.",
		dressCode: "Formal attire - suits and evening gowns",
		transportation:
			"Complimentary shuttle service from partner hotels. Valet parking available.",
		accommodation:
			"Room blocks at Grand Estate Resort and Napa Valley Inn with special rates.",
		giftRegistry: "Crate & Barrel Registry and Honeymoon Fund",
		guestGroups: [
			"Wedding Party",
			"Family",
			"Close Friends",
			"College Friends",
			"Work Colleagues",
		],
		weather: {
			temperature: 24,
			condition: "sunny",
			icon: "sun",
		},
	},
	{
		id: "demo-3",
		name: "Corporate Innovation Summit",
		description:
			"Multi-day business innovation summit featuring keynote speakers, workshops, and startup showcases.",
		startDate: new Date("2025-05-12"),
		endDate: new Date("2025-05-14"),
		location: "Innovation Center, Silicon Valley",
		attendees: 450,
		status: "published",
		isPublic: true,
		isDemo: true,
		selectedModules: [
			"schedule",
			"announcements",
			"ticketing",
			"analytics",
			"survey",
			"media",
		],
		eventType: "Corporate",
		// poster: corporatePoster,
		poster: testPhoto,
		userId: "demo-user-123",
		time: "9:00 AM",
		locations: [
			{
				name: "Innovation Center Main Hall",
				address: "456 Tech Drive, Silicon Valley, CA 94088",
			},
			{
				name: "Executive Briefing Room",
				address: "456 Tech Drive, Silicon Valley, CA 94088",
			},
			{
				name: "Startup Showcase Area",
				address: "456 Tech Drive, Silicon Valley, CA 94088",
			},
		],
		photos: [
			"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
			"https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
			"https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
			"https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800",
			"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
			"https://images.unsplash.com/photo-1513759565286-20e9c5fad06b?w=800",
		],
		specialGuests: [
			{
				name: "Linda Martinez",
				title: "Chief Innovation Officer, TechGlobal",
				bio: "Visionary leader driving digital transformation across Fortune 500 companies. 20+ years leading innovation initiatives.",
				credentials: ["Harvard MBA", "Innovation Award Winner", "Board Member"],
			},
			{
				name: "David Park",
				title: "Venture Capitalist, Summit Ventures",
				bio: "Early-stage investor with successful exits in 15+ startups. Focuses on enterprise software and AI solutions.",
				credentials: ["Top 50 VC", "$2B AUM", "Y Combinator Partner"],
			},
			{
				name: "Dr. Rachel Thompson",
				title: "Director of R&D, Future Labs",
				bio: "Leading researcher in enterprise AI and automation. Published author and keynote speaker on digital transformation.",
				credentials: ["MIT PhD", "50+ Patents", "Industry Thought Leader"],
			},
		],
		faqs: [
			{
				question: "Who should attend this summit?",
				answer:
					"This summit is designed for C-level executives, innovation leaders, product managers, and entrepreneurs interested in corporate innovation and emerging technologies.",
			},
			{
				question: "What's included in the ticket price?",
				answer:
					"Full access to all keynotes, workshops, and networking sessions. Continental breakfast, lunch, and refreshments are included daily. Workshop materials and digital resources are also provided.",
			},
			{
				question: "Will I receive a certificate of attendance?",
				answer:
					"Yes, all attendees will receive a digital certificate of completion. Some workshops also offer professional development credits.",
			},
			{
				question: "Is there an opportunity to showcase my startup?",
				answer:
					"Yes! We have a dedicated Startup Showcase Area. Apply through our website for a chance to present your innovation to investors and potential partners.",
			},
			{
				question: "What is your refund policy?",
				answer:
					"Full refunds available until 14 days before the event. After that, tickets can be transferred to another person or credited toward future events.",
			},
		],
		sessions: [
			{
				name: "Registration & Breakfast",
				startTime: "8:30 AM",
				endTime: "9:00 AM",
			},
			{ name: "Opening Keynote", startTime: "9:00 AM", endTime: "10:00 AM" },
			{
				name: "Innovation Workshops",
				startTime: "10:30 AM",
				endTime: "12:30 PM",
			},
			{
				name: "Lunch & Startup Showcase",
				startTime: "12:30 PM",
				endTime: "2:00 PM",
			},
			{ name: "Afternoon Sessions", startTime: "2:00 PM", endTime: "5:00 PM" },
			{
				name: "Networking Reception",
				startTime: "5:30 PM",
				endTime: "7:30 PM",
			},
		],
		mealOptions:
			"Continental breakfast, full lunch, and afternoon refreshments. Dietary restrictions accommodated.",
		dressCode: "Business professional",
		transportation:
			"Parking available. Shuttle from San Jose Airport. Near Caltrain station.",
		accommodation:
			"Partner rates at nearby hotels: Hilton Silicon Valley and Marriott.",
		ticketTypes: [
			{
				name: "Executive Pass",
				price: 1499,
				description:
					"VIP access to all sessions plus exclusive networking dinners",
				available: 20,
			},
			{
				name: "Standard Pass",
				price: 899,
				description: "Full access to summit sessions and workshops",
				available: 80,
			},
		],
		guestGroups: [
			"C-Suite",
			"Innovation Leaders",
			"Startups",
			"Investors",
			"Press",
		],
		weather: {
			temperature: 22,
			condition: "partly cloudy",
			icon: "cloud-sun",
		},
	},
	{
		id: "demo-4",
		name: "Music Festival Extravaganza",
		description:
			"Large outdoor music festival featuring multiple stages, food vendors, and interactive experiences.",
		startDate: new Date("2025-08-01"),
		endDate: new Date("2025-08-03"),
		location: "Riverside Park, Portland",
		attendees: 8000,
		status: "published",
		isPublic: true,
		isDemo: true,
		selectedModules: [
			"ticketing",
			"schedule",
			"media",
			"announcements",
			"analytics",
			"games",
		],
		eventType: "Festival",
		// poster: musicFestivalPoster,
		poster: testPhoto,
		userId: "demo-user-123",
		time: "12:00 PM",
		locations: [
			{ name: "Main Stage", address: "456 Riverside Park, Portland, OR 97205" },
			{
				name: "Electronic Dance Stage",
				address: "456 Riverside Park, Portland, OR 97205",
			},
			{ name: "Food Court", address: "456 Riverside Park, Portland, OR 97205" },
			{ name: "VIP Lounge", address: "456 Riverside Park, Portland, OR 97205" },
		],
		weather: {
			temperature: 28,
			condition: "sunny",
			icon: "sun",
		},
	},
	{
		id: "demo-5",
		name: "Charity Fundraising Gala",
		description:
			"Annual fundraising gala with dinner, auction, and entertainment for a great cause.",
		startDate: new Date("2025-10-12"),
		endDate: new Date("2025-10-12"),
		location: "Grand Ballroom, Chicago",
		attendees: 350,
		status: "published",
		isPublic: true,
		isDemo: true,
		selectedModules: [
			"rsvp",
			"seating",
			"budget",
			"announcements",
			"analytics",
			"games",
			"survey",
			"media",
		],
		eventType: "Charity",
		userId: "demo-user-123",
		time: "7:00 PM",
		locations: [
			{
				name: "Grand Ballroom",
				address: "123 Luxury Street, Chicago, IL 60611",
			},
			{
				name: "Silent Auction Hall",
				address: "123 Luxury Street, Chicago, IL 60611",
			},
			{
				name: "VIP Reception Area",
				address: "123 Luxury Street, Chicago, IL 60611",
			},
		],
		weather: {
			temperature: 15,
			condition: "clear",
			icon: "sun",
		},
	},
	{
		id: "demo-6",
		name: "Startup Pitch Competition",
		description:
			"Entrepreneurship event featuring startup pitches, investor panels, and networking opportunities.",
		startDate: new Date("2025-09-18"),
		endDate: new Date("2025-09-18"),
		location: "Tech Hub Convention Center, Austin",
		attendees: 300,
		status: "published",
		isPublic: true,
		isDemo: true,
		selectedModules: [
			"schedule",
			"ticketing",
			"announcements",
			"analytics",
			"survey",
		],
		eventType: "Business",
		userId: "demo-user-123",
		time: "1:00 PM",
		locations: [
			{
				name: "Main Presentation Hall",
				address: "123 Innovation Drive, Austin, TX 78701",
			},
			{
				name: "Investor Lounge",
				address: "123 Innovation Drive, Austin, TX 78701",
			},
			{
				name: "Networking Area",
				address: "123 Innovation Drive, Austin, TX 78701",
			},
		],
		weather: {
			temperature: 26,
			condition: "sunny",
			icon: "sun",
		},
	},
	{
		id: "demo-7",
		name: "Food & Wine Experience",
		description:
			"Culinary festival featuring chef demonstrations, tastings, and food competitions.",
		startDate: new Date("2025-04-25"),
		endDate: new Date("2025-04-27"),
		location: "Culinary Center, San Diego",
		attendees: 600,
		status: "published",
		isPublic: true,
		isDemo: true,
		selectedModules: ["rsvp", "schedule", "media", "budget", "survey", "games"],
		eventType: "Festival",
		userId: "demo-user-123",
		time: "11:00 AM",
		locations: [
			{
				name: "Main Kitchen Stadium",
				address: "789 Culinary Lane, San Diego, CA 92101",
			},
			{
				name: "Wine Tasting Pavilion",
				address: "789 Culinary Lane, San Diego, CA 92101",
			},
			{
				name: "Chef Demo Area",
				address: "789 Culinary Lane, San Diego, CA 92101",
			},
		],
		weather: {
			temperature: 24,
			condition: "sunny",
			icon: "sun",
		},
	},
	{
		id: "demo-8",
		name: "Art Gallery Opening Night",
		description:
			"Exclusive contemporary art exhibition opening with artist talks and wine reception.",
		startDate: new Date("2025-11-08"),
		endDate: new Date("2025-11-08"),
		location: "Metropolitan Art Gallery, New York",
		attendees: 180,
		status: "published",
		isPublic: true,
		isDemo: true,
		selectedModules: ["rsvp", "announcements", "media", "analytics", "survey"],
		eventType: "Cultural",
		userId: "demo-user-123",
		time: "6:00 PM",
		locations: [
			{
				name: "Main Gallery",
				address: "789 Culture Avenue, New York, NY 10021",
			},
			{ name: "VIP Lounge", address: "789 Culture Avenue, New York, NY 10021" },
			{
				name: "Sculpture Garden",
				address: "789 Culture Avenue, New York, NY 10021",
			},
		],
		weather: {
			temperature: 12,
			condition: "clear",
			icon: "sun",
		},
	},
	{
		id: "demo-9",
		name: "Fitness & Wellness Retreat",
		description:
			"Health-focused weekend retreat with yoga, fitness classes, and wellness workshops.",
		startDate: new Date("2025-07-11"),
		endDate: new Date("2025-07-13"),
		location: "Mountain Sanctuary, Colorado",
		attendees: 75,
		status: "published",
		isPublic: true,
		isDemo: true,
		selectedModules: ["rsvp", "schedule", "announcements", "media", "survey"],
		eventType: "Wellness",
		userId: "demo-user-123",
		time: "8:00 AM",
		locations: [
			{
				name: "Mountain Lodge",
				address: "456 Peaceful Valley, Colorado, CO 80424",
			},
			{
				name: "Yoga Pavilion",
				address: "456 Peaceful Valley, Colorado, CO 80424",
			},
			{
				name: "Meditation Garden",
				address: "456 Peaceful Valley, Colorado, CO 80424",
			},
		],
		weather: {
			temperature: 18,
			condition: "clear",
			icon: "sun",
		},
	},
	{
		id: "demo-10",
		name: "Gaming Tournament Championship",
		description:
			"Esports competition featuring multiple game categories, streaming, and prizes.",
		startDate: new Date("2025-12-05"),
		endDate: new Date("2025-12-07"),
		location: "Gaming Arena, Boston",
		attendees: 500,
		status: "published",
		isPublic: true,
		isDemo: true,
		selectedModules: [
			"ticketing",
			"schedule",
			"games",
			"announcements",
			"analytics",
			"media",
		],
		eventType: "Gaming",
		userId: "demo-user-123",
		time: "10:00 AM",
		locations: [
			{
				name: "Main Gaming Arena",
				address: "123 Gamer Street, Boston, MA 02101",
			},
			{
				name: "Tournament Stage",
				address: "123 Gamer Street, Boston, MA 02101",
			},
			{
				name: "Streaming Booth",
				address: "123 Gamer Street, Boston, MA 02101",
			},
		],
		weather: {
			temperature: 2,
			condition: "snowy",
			icon: "cloud-snow",
		},
	},
	// ADVANCED CONFERENCE EVENTS WITH SOPHISTICATED SCHEDULING
	{
		id: "conf-1",
		name: "International AI Research Symposium 2025",
		description:
			"Multi-location academic conference spanning university campus with 8 specialized tracks, 150+ sessions, prerequisite dependencies, and certification pathways.",
		startDate: new Date("2025-04-20"),
		endDate: new Date("2025-04-23"),
		location: "Stanford University Campus, Palo Alto",
		attendees: 2500,
		status: "published",
		isPublic: true,
		isDemo: true,
		selectedModules: [
			"schedule",
			"announcements",
			"ticketing",
			"seating",
			"analytics",
			"survey",
			"media",
			"rsvp",
		],
		eventType: "Conference",
		userId: "demo-user-123",
		time: "8:00 AM",
		locations: [
			{
				name: "Memorial Auditorium",
				address: "450 Jane Stanford Way, Stanford, CA 94305",
			},
			{
				name: "Computer Science Building",
				address: "353 Jane Stanford Way, Stanford, CA 94305",
			},
			{
				name: "Medical School Auditorium",
				address: "291 Campus Drive, Stanford, CA 94305",
			},
			{
				name: "Engineering Quad",
				address: "450 Jane Stanford Way, Stanford, CA 94305",
			},
			{
				name: "Business School Conference Center",
				address: "655 Knight Way, Stanford, CA 94305",
			},
			{
				name: "Innovation Lab",
				address: "318 Campus Drive, Stanford, CA 94305",
			},
		],
		weather: {
			temperature: 20,
			condition: "partly cloudy",
			icon: "cloud-sun",
		},
		conferenceData: {
			tracks: [
				{
					id: "ai-theory",
					name: "AI Theory & Foundations",
					color: "#3B82F6",
					description: "Theoretical advances in artificial intelligence",
				},
				{
					id: "ml-practice",
					name: "Machine Learning in Practice",
					color: "#10B981",
					description: "Real-world ML applications and case studies",
				},
				{
					id: "nlp-speech",
					name: "NLP & Speech Processing",
					color: "#F59E0B",
					description: "Language models and speech technologies",
				},
				{
					id: "computer-vision",
					name: "Computer Vision & Robotics",
					color: "#8B5CF6",
					description: "Visual AI and robotic systems",
				},
				{
					id: "ethics-ai",
					name: "AI Ethics & Society",
					color: "#EF4444",
					description: "Responsible AI development and deployment",
				},
				{
					id: "quantum-ai",
					name: "Quantum Computing & AI",
					color: "#06B6D4",
					description: "Intersection of quantum computing and AI",
				},
				{
					id: "startup-track",
					name: "AI Entrepreneurship",
					color: "#F97316",
					description: "Building AI startups and commercialization",
				},
				{
					id: "healthcare-ai",
					name: "AI in Healthcare",
					color: "#84CC16",
					description: "Medical AI applications and research",
				},
			],
			sessions: [
				{
					id: "keynote-opening",
					title: "The Future of AGI: Challenges and Opportunities",
					description:
						"Opening keynote exploring the path toward artificial general intelligence",
					type: "keynote",
					trackId: "ai-theory",
					speakerNames: ["Dr. Fei-Fei Li", "Prof. Stuart Russell"],
					date: new Date("2025-04-20"),
					startTime: "9:00 AM",
					endTime: "10:30 AM",
					location: "Memorial Auditorium - Main Hall",
					capacity: 2500,
					registeredCount: 2400,
					waitlistCount: 250,
					level: "all",
					tags: ["AGI", "Future", "Ethics"],
				},
				{
					id: "workshop-advanced-rl",
					title: "Advanced Reinforcement Learning Workshop",
					description:
						"Hands-on workshop covering latest RL algorithms with coding exercises",
					type: "workshop",
					trackId: "ml-practice",
					speakerNames: ["Dr. Chelsea Finn", "Dr. Sergey Levine"],
					date: new Date("2025-04-20"),
					startTime: "2:00 PM",
					endTime: "5:00 PM",
					location: "Computer Science Building - Room 101",
					capacity: 80,
					registeredCount: 78,
					waitlistCount: 45,
					prerequisites: [
						"Basic ML knowledge",
						"Python programming",
						"Linear algebra",
					],
					level: "advanced",
					tags: ["RL", "Hands-on", "Advanced"],
				},
				{
					id: "panel-ai-ethics",
					title: "AI Ethics in Practice: Industry Perspectives",
					description:
						"Panel discussion on implementing ethical AI practices in industry",
					type: "panel",
					trackId: "ethics-ai",
					speakerNames: [
						"Timnit Gebru",
						"Cynthia Breazeal",
						"Joanna Bryson",
						"Kate Crawford",
					],
					date: new Date("2025-04-21"),
					startTime: "11:00 AM",
					endTime: "12:30 PM",
					location: "Engineering Quad - Outdoor Pavilion",
					capacity: 500,
					registeredCount: 485,
					waitlistCount: 120,
					level: "all",
					tags: ["Ethics", "Industry", "Panel"],
				},
				{
					id: "session-quantum-ml",
					title: "Quantum Machine Learning Algorithms",
					description:
						"Technical session on quantum algorithms for machine learning",
					type: "session",
					trackId: "quantum-ai",
					speakerNames: ["Dr. John Preskill", "Dr. Maria Schuld"],
					date: new Date("2025-04-22"),
					startTime: "3:30 PM",
					endTime: "4:30 PM",
					location: "Innovation Lab - Quantum Computing Center",
					capacity: 120,
					registeredCount: 95,
					waitlistCount: 25,
					prerequisites: ["Quantum computing basics", "Linear algebra"],
					level: "advanced",
					tags: ["Quantum", "Algorithms", "Theory"],
				},
				{
					id: "networking-startup",
					title: "AI Entrepreneur Mixer",
					description: "Networking session for AI entrepreneurs and investors",
					type: "networking",
					trackId: "startup-track",
					speakerNames: [],
					date: new Date("2025-04-22"),
					startTime: "7:00 PM",
					endTime: "9:00 PM",
					location: "Business School Conference Center - Reception Hall",
					capacity: 300,
					registeredCount: 275,
					waitlistCount: 50,
					level: "all",
					tags: ["Networking", "Startup", "Investment"],
				},
			],
		},
	},
	{
		id: "conf-2",
		name: "Global Healthcare Innovation Summit",
		description:
			"Multi-city hybrid conference with hospital venues, medical specialization tracks, CME credits, and certification workflows across 5 different medical centers.",
		startDate: new Date("2025-06-15"),
		endDate: new Date("2025-06-18"),
		location: "Mayo Clinic Campus, Rochester",
		attendees: 1800,
		status: "published",
		isPublic: true,
		isDemo: true,
		userId: "demo-user-123",
		selectedModules: [
			"schedule",
			"announcements",
			"ticketing",
			"analytics",
			"survey",
			"media",
		],
		eventType: "Conference",
		time: "7:30 AM",
		locations: [
			{
				name: "Mayo Clinic Main Hospital",
				address: "200 First St SW, Rochester, MN 55905",
			},
			{
				name: "Mayo Clinic Research Building",
				address: "200 First St SW, Rochester, MN 55905",
			},
			{
				name: "Hilton Rochester Conference Center",
				address: "101 1st Ave SW, Rochester, MN 55902",
			},
			{
				name: "Mayo Clinic Simulation Center",
				address: "200 First St SW, Rochester, MN 55905",
			},
			{
				name: "Virtual Auditorium Hub",
				address: "Remote participation via secure platform",
			},
		],
		weather: {
			temperature: 22,
			condition: "sunny",
			icon: "sun",
		},
		conferenceData: {
			tracks: [
				{
					id: "cardiology",
					name: "Cardiology & Heart Surgery",
					color: "#DC2626",
					description:
						"Latest in cardiovascular medicine and surgical techniques",
				},
				{
					id: "oncology",
					name: "Oncology & Cancer Research",
					color: "#7C3AED",
					description:
						"Cancer treatment innovations and research breakthroughs",
				},
				{
					id: "neurology",
					name: "Neurology & Brain Sciences",
					color: "#059669",
					description: "Neurological disorders and brain research advances",
				},
				{
					id: "digital-health",
					name: "Digital Health & AI",
					color: "#2563EB",
					description: "Technology integration in healthcare delivery",
				},
				{
					id: "pediatrics",
					name: "Pediatric Medicine",
					color: "#EA580C",
					description: "Child healthcare and developmental medicine",
				},
				{
					id: "surgery-innovation",
					name: "Surgical Innovation",
					color: "#0891B2",
					description: "Minimally invasive and robotic surgery techniques",
				},
			],
			sessions: [
				{
					id: "cme-cardiology-1",
					title: "Advanced Cardiac Catheterization Techniques",
					description:
						"CME Session: Latest interventional cardiology procedures (3.5 CME Credits)",
					type: "session",
					trackId: "cardiology",
					speakerNames: ["Dr. Charanjit Rihal", "Dr. Amir Lerman"],
					date: new Date("2025-06-15"),
					startTime: "9:00 AM",
					endTime: "12:30 PM",
					location: "Mayo Clinic Main Hospital - Catheterization Lab Demo",
					capacity: 60,
					registeredCount: 58,
					waitlistCount: 25,
					prerequisites: [
						"Board certification in Cardiology",
						"Active medical license",
					],
					level: "advanced",
					tags: ["CME", "Cardiology", "Interventional", "3.5 Credits"],
				},
				{
					id: "ai-diagnosis-workshop",
					title: "AI-Powered Diagnostic Tools Workshop",
					description:
						"Hands-on training with AI diagnostic software and imaging analysis",
					type: "workshop",
					trackId: "digital-health",
					speakerNames: ["Dr. Bradley Erickson", "Dr. Panagiotis Korfiatis"],
					date: new Date("2025-06-16"),
					startTime: "2:00 PM",
					endTime: "5:00 PM",
					location: "Mayo Clinic Research Building - AI Lab",
					capacity: 40,
					registeredCount: 38,
					waitlistCount: 15,
					prerequisites: ["Basic radiology knowledge", "Computer literacy"],
					level: "intermediate",
					tags: ["AI", "Diagnostics", "Hands-on", "Imaging"],
				},
				{
					id: "hybrid-surgery-demo",
					title: "Live Robotic Surgery Demonstration",
					description:
						"Live surgical demonstration with remote participation options",
					type: "session",
					trackId: "surgery-innovation",
					speakerNames: ["Dr. Michael Kendrick", "Dr. David Farley"],
					date: new Date("2025-06-17"),
					startTime: "10:00 AM",
					endTime: "11:30 AM",
					location:
						"Mayo Clinic Main Hospital - OR Suite 12 (Live Stream to Conference Center)",
					capacity: 200,
					registeredCount: 195,
					waitlistCount: 80,
					level: "all",
					tags: ["Surgery", "Robotics", "Live Demo", "Remote Access"],
				},
			],
		},
	},
	{
		id: "conf-3",
		name: "International Business Strategy Conference",
		description:
			"Multi-continental hybrid business conference with time zone coordination, language-specific sessions, and industry vertical tracks across major business hubs.",
		startDate: new Date("2025-09-08"),
		endDate: new Date("2025-09-11"),
		location: "World Trade Center, New York",
		attendees: 3200,
		status: "published",
		isPublic: true,
		isDemo: true,
		userId: "demo-user-123",
		selectedModules: [
			"schedule",
			"announcements",
			"ticketing",
			"seating",
			"analytics",
			"survey",
			"media",
		],
		eventType: "Conference",
		time: "8:00 AM",
		locations: [
			{
				name: "World Trade Center - Main Conference Hall",
				address: "285 Fulton St, New York, NY 10007",
			},
			{
				name: "Wall Street Financial Center",
				address: "28 Liberty St, New York, NY 10005",
			},
			{
				name: "London Business Hub (Remote)",
				address: "Virtual participation from London, UK",
			},
			{
				name: "Singapore Finance Center (Remote)",
				address: "Virtual participation from Singapore",
			},
			{
				name: "Tokyo Executive Center (Remote)",
				address: "Virtual participation from Tokyo, Japan",
			},
			{
				name: "Frankfurt Business District (Remote)",
				address: "Virtual participation from Frankfurt, Germany",
			},
		],
		weather: {
			temperature: 24,
			condition: "clear",
			icon: "sun",
		},
		conferenceData: {
			tracks: [
				{
					id: "global-strategy",
					name: "Global Business Strategy",
					color: "#1E40AF",
					description: "International market expansion and global operations",
				},
				{
					id: "fintech-innovation",
					name: "FinTech & Financial Innovation",
					color: "#059669",
					description: "Digital transformation in financial services",
				},
				{
					id: "supply-chain",
					name: "Supply Chain Optimization",
					color: "#DC2626",
					description: "Global supply chain management and logistics",
				},
				{
					id: "esg-sustainability",
					name: "ESG & Sustainability",
					color: "#16A34A",
					description: "Environmental, social, and governance strategies",
				},
				{
					id: "digital-transformation",
					name: "Digital Transformation",
					color: "#7C3AED",
					description: "Technology adoption and digital business models",
				},
				{
					id: "emerging-markets",
					name: "Emerging Markets",
					color: "#EA580C",
					description: "Growth opportunities in developing economies",
				},
			],
			sessions: [
				{
					id: "global-keynote",
					title: "The Future of Global Commerce",
					description:
						"Multi-location keynote with CEOs from major corporations across time zones",
					type: "keynote",
					trackId: "global-strategy",
					speakerNames: [
						"Satya Nadella (Seattle)",
						"Hiroshi Mikitani (Tokyo)",
						"Leena Nair (London)",
					],
					date: new Date("2025-09-08"),
					startTime: "9:00 AM",
					endTime: "10:30 AM",
					location: "World Trade Center - Main Hall (Global Broadcast)",
					capacity: 3200,
					registeredCount: 3150,
					waitlistCount: 400,
					level: "all",
					tags: ["Global", "Leadership", "Multi-timezone", "Broadcast"],
				},
				{
					id: "fintech-panel-multilang",
					title: "FinTech Regulation Panel (English/Mandarin/German)",
					description:
						"Multi-language panel on global FinTech regulations with real-time translation",
					type: "panel",
					trackId: "fintech-innovation",
					speakerNames: [
						"Christine Lagarde",
						"Dr. Li Wei",
						"Andreas Dombret",
						"Gary Gensler",
					],
					date: new Date("2025-09-09"),
					startTime: "2:00 PM",
					endTime: "3:30 PM",
					location: "Wall Street Financial Center + Remote Hubs",
					capacity: 800,
					registeredCount: 750,
					waitlistCount: 200,
					level: "intermediate",
					tags: ["FinTech", "Regulation", "Multi-language", "Global Policy"],
				},
				{
					id: "supply-chain-workshop",
					title: "Crisis-Resilient Supply Chain Design",
					description:
						"Interactive workshop on building resilient global supply chains",
					type: "workshop",
					trackId: "supply-chain",
					speakerNames: ["Dr. Yossi Sheffi", "Prof. Martin Christopher"],
					date: new Date("2025-09-10"),
					startTime: "10:00 AM",
					endTime: "1:00 PM",
					location: "World Trade Center - Workshop Room A",
					capacity: 120,
					registeredCount: 115,
					waitlistCount: 60,
					prerequisites: [
						"Supply chain management experience",
						"Business operations knowledge",
					],
					level: "advanced",
					tags: ["Supply Chain", "Risk Management", "Interactive", "Strategy"],
				},
			],
		},
	},
	{
		id: "conf-4",
		name: "EdTech Innovation & Learning Sciences Conference",
		description:
			"Education technology conference with multiple university campus locations, teacher certification tracks, hands-on learning labs, and K-12 to higher education sessions.",
		startDate: new Date("2025-07-28"),
		endDate: new Date("2025-07-31"),
		location: "MIT Campus, Cambridge",
		attendees: 1600,
		status: "published",
		isPublic: true,
		isDemo: true,
		userId: "demo-user-123",
		selectedModules: [
			"schedule",
			"announcements",
			"ticketing",
			"analytics",
			"survey",
			"media",
			"games",
		],
		eventType: "Conference",
		time: "8:30 AM",
		locations: [
			{
				name: "MIT Stata Center",
				address: "32 Vassar St, Cambridge, MA 02139",
			},
			{ name: "MIT Media Lab", address: "75 Amherst St, Cambridge, MA 02139" },
			{
				name: "Harvard Graduate School of Education",
				address: "13 Appian Way, Cambridge, MA 02138",
			},
			{
				name: "Boston Public Library - Innovation Lab",
				address: "700 Boylston St, Boston, MA 02116",
			},
			{
				name: "Kendall Square Innovation District",
				address: "1 Broadway, Cambridge, MA 02142",
			},
		],
		weather: {
			temperature: 26,
			condition: "partly cloudy",
			icon: "cloud-sun",
		},
		conferenceData: {
			tracks: [
				{
					id: "k12-innovation",
					name: "K-12 Educational Innovation",
					color: "#F59E0B",
					description:
						"Elementary and secondary education technology solutions",
				},
				{
					id: "higher-ed-tech",
					name: "Higher Education Technology",
					color: "#3B82F6",
					description: "University and college educational technology",
				},
				{
					id: "learning-sciences",
					name: "Learning Sciences Research",
					color: "#10B981",
					description: "Cognitive science and educational psychology research",
				},
				{
					id: "ai-education",
					name: "AI in Education",
					color: "#8B5CF6",
					description: "Artificial intelligence applications in learning",
				},
				{
					id: "accessibility-inclusion",
					name: "Accessibility & Inclusion",
					color: "#EF4444",
					description: "Inclusive design and accessible learning technologies",
				},
				{
					id: "teacher-development",
					name: "Professional Development",
					color: "#06B6D4",
					description: "Teacher training and educator skill development",
				},
			],
			sessions: [
				{
					id: "ai-tutoring-systems",
					title: "Building Intelligent Tutoring Systems",
					description:
						"Technical session on developing AI-powered personalized learning systems",
					type: "session",
					trackId: "ai-education",
					speakerNames: [
						"Dr. Rose Luckin",
						"Prof. Ryan Baker",
						"Dr. Mingyu Feng",
					],
					date: new Date("2025-07-28"),
					startTime: "11:00 AM",
					endTime: "12:30 PM",
					location: "MIT Media Lab - Learning Lab",
					capacity: 150,
					registeredCount: 140,
					waitlistCount: 35,
					prerequisites: [
						"Basic programming knowledge",
						"Understanding of learning theory",
					],
					level: "intermediate",
					tags: ["AI", "Tutoring", "Personalization", "Technical"],
				},
				{
					id: "inclusive-design-workshop",
					title: "Universal Design for Learning Workshop",
					description:
						"Hands-on workshop creating inclusive educational experiences",
					type: "workshop",
					trackId: "accessibility-inclusion",
					speakerNames: ["Dr. Kavita Rao", "Prof. David Rose"],
					date: new Date("2025-07-29"),
					startTime: "9:00 AM",
					endTime: "12:00 PM",
					location: "Harvard Graduate School of Education - Design Studio",
					capacity: 80,
					registeredCount: 75,
					waitlistCount: 25,
					level: "all",
					tags: ["UDL", "Accessibility", "Inclusive Design", "Hands-on"],
				},
				{
					id: "teacher-certification-track",
					title: "EdTech Integration Certification Program",
					description:
						"Multi-session certification program for K-12 educators (12 CEU Credits)",
					type: "workshop",
					trackId: "teacher-development",
					speakerNames: ["Dr. Tanya Beardsley", "Prof. Matthew Koehler"],
					date: new Date("2025-07-30"),
					startTime: "1:00 PM",
					endTime: "5:00 PM",
					location: "Boston Public Library - Innovation Lab",
					capacity: 60,
					registeredCount: 58,
					waitlistCount: 40,
					prerequisites: [
						"Current teaching license",
						"Basic technology skills",
					],
					level: "intermediate",
					tags: ["Certification", "CEU Credits", "K-12", "Integration"],
				},
			],
		},
	},
	// DRAFT EVENTS - New section for unpublished events (keeping original draft events)
	{
		id: "draft-1",
		name: "Team Building Retreat",
		description:
			"Annual company retreat with team building activities, workshops, and networking sessions.",
		startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 6+ weeks
		endDate: new Date(Date.now() + 47 * 24 * 60 * 60 * 1000),
		location: "Mountain Lodge Resort, Colorado",
		attendees: 85,
		status: "draft",
		isPublic: false,
		isDemo: true,
		selectedModules: ["schedule", "announcements", "rsvp", "games"],
		eventType: "Corporate",
		// poster: teamBuildingRetreatHero,
		poster: testPhoto,
		time: "9:00 AM",
		locations: [
			{
				name: "Mountain Lodge Resort",
				address: "789 Mountain View, Colorado, CO 80424",
			},
			{
				name: "Conference Center",
				address: "789 Mountain View, Colorado, CO 80424",
			},
		],
		weather: {
			temperature: 8,
			condition: "clear",
			icon: "sun",
		},
	},
];
