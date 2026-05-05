"use client";
export type Track = {
	title: string;
	description: string;
	sessions: number;
	registered: number;
	utilization: number;
	avgCapacity: number;
	status: string;
	colors: Record<string, string>;
	photo?: string | null;
	icon?: string;
	tags?: string[];
	organizer?: string;
	location?: string;
};

export const mockTracks: Track[] = [
	{
		title: "AI & Machine Learning",
		description:
			"Latest developments in artificial intelligence and machine learning.",
		sessions: 11,
		registered: 901,
		utilization: 83,
		avgCapacity: 82,
		status: "Filling Up",
		colors: {
			border: "border-blue-200",
			bg: "bg-blue-50",
			darkBg: "dark:bg-blue-900/30",
			text: "text-blue-700",
			darkText: "dark:text-blue-300",
			progress: "bg-blue-500",
			statusBg: "bg-yellow-100",
			darkStatusBg: "dark:bg-yellow-900",
			statusText: "text-yellow-800",
			darkStatusText: "dark:text-yellow-200",
		},
		photo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
		icon: "🤖",
		tags: ["AI", "Machine Learning", "Deep Learning"],
		organizer: "Dr. Sarah Chen, sarah.chen@example.com",
		location: "Main Hall",
	},
	{
		title: "Cloud & DevOps",
		description: "Cloud infrastructure and development operations.",
		sessions: 10,
		registered: 640,
		utilization: 99,
		avgCapacity: 64,
		status: "Near Full",
		colors: {
			border: "border-green-200",
			bg: "bg-green-50",
			darkBg: "dark:bg-green-900/30",
			text: "text-green-700",
			darkText: "dark:text-green-300",
			progress: "bg-green-500",
			statusBg: "bg-red-100",
			darkStatusBg: "dark:bg-red-900",
			statusText: "text-red-800",
			darkStatusText: "dark:text-red-200",
		},
		photo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
		icon: "🚀",
		tags: ["Cloud", "DevOps", "Infrastructure"],
		organizer: "Michael Rodriguez, m.rodriguez@example.com",
		location: "Room 201",
	},
	{
		title: "Security & Privacy",
		description: "Cybersecurity and data privacy best practices.",
		sessions: 8,
		registered: 458,
		utilization: 94,
		avgCapacity: 57,
		status: "Near Full",
		colors: {
			border: "border-red-200",
			bg: "bg-red-50",
			darkBg: "dark:bg-red-900/30",
			text: "text-red-700",
			darkText: "dark:text-red-300",
			progress: "bg-red-500",
			statusBg: "bg-red-100",
			darkStatusBg: "dark:bg-red-900",
			statusText: "text-red-800",
			darkStatusText: "dark:text-red-200",
		},
		photo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
		icon: "🔒",
		tags: ["Security", "Privacy", "Cybersecurity"],
		organizer: "Alex Thompson, alex.thompson@example.com",
		location: "Room 102",
	},
];

export const mockSessions = [
	{
		title: "Opening Keynote: The Future of AI",
		status: "Almost Full",
		statusColor: "text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900/50",
		description:
			"Exploring the transformative potential of artificial intelligence in the next decade.",
		time: "09:00 - 10:00",
		date: "Nov 7, 2025",
		location: "Main Hall",
		speakers: "Dr. Sarah Chen, Prof. Michael Rodriguez",
		registered: 450,
		capacity: 500,
		utilization: 90,
		tags: ["keynote", "all", "+25 waitlist"],
	},
	{
		title: "Deep Dive into NLP",
		status: "Filling Up",
		statusColor:
			"text-yellow-600 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/50",
		description: "A technical session on the latest advancements in NLP.",
		time: "10:30 - 11:30",
		date: "Nov 7, 2025",
		location: "Room 102",
		speakers: "Dr. Kenji Tanaka",
		registered: 80,
		capacity: 100,
		utilization: 80,
		tags: ["technical", "ai", "nlp"],
	},
];

export const mockAttendees = [
	{
		name: "Michael Brown",
		company: "CodeCraft",
		role: "Product Manager",
		sessions: 11,
		status: "Pending",
		initials: "MB",
		color: "bg-blue-500",
	},
	{
		name: "Matthew Johnson",
		company: "TechCorp",
		role: "Lead Developer",
		sessions: 11,
		status: "Pending",
		initials: "MJ",
		color: "bg-green-500",
	},
	{
		name: "Charlotte Perez",
		company: "Innovate Inc.",
		role: "UX Designer",
		sessions: 11,
		status: "Pending",
		initials: "CP",
		color: "bg-purple-500",
	},
	{
		name: "David Lee",
		company: "DataScribe",
		role: "Data Scientist",
		sessions: 8,
		status: "Confirmed",
		initials: "DL",
		color: "bg-red-500",
	},
];

export const MockTracks: Track[] = [
	{
		title: "AI & Machine Learning",
		description:
			"Latest developments in artificial intelligence and machine learning.",
		sessions: 11,
		registered: 901,
		utilization: 83,
		avgCapacity: 82,
		status: "Filling Up",
		colors: {
			border: "border-blue-200",
			bg: "bg-blue-50",
			darkBg: "dark:bg-blue-900/30",
			text: "text-blue-700",
			darkText: "dark:text-blue-300",
			progress: "bg-blue-500",
			statusBg: "bg-yellow-100",
			darkStatusBg: "dark:bg-yellow-900",
			statusText: "text-yellow-800",
			darkStatusText: "dark:text-yellow-200",
		},
		photo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
		icon: "🤖",
		tags: ["AI", "Machine Learning", "Deep Learning"],
		organizer: "Dr. Sarah Chen, sarah.chen@example.com",
		location: "Main Hall",
	},
	{
		title: "Cloud & DevOps",
		description: "Cloud infrastructure and development operations.",
		sessions: 10,
		registered: 640,
		utilization: 99,
		avgCapacity: 64,
		status: "Near Full",
		colors: {
			border: "border-green-200",
			bg: "bg-green-50",
			darkBg: "dark:bg-green-900/30",
			text: "text-green-700",
			darkText: "dark:text-green-300",
			progress: "bg-green-500",
			statusBg: "bg-red-100",
			darkStatusBg: "dark:bg-red-900",
			statusText: "text-red-800",
			darkStatusText: "dark:text-red-200",
		},
		photo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
		icon: "🚀",
		tags: ["Cloud", "DevOps", "Infrastructure"],
		organizer: "Michael Rodriguez, m.rodriguez@example.com",
		location: "Room 201",
	},
	{
		title: "Security & Privacy",
		description: "Cybersecurity and data privacy best practices.",
		sessions: 8,
		registered: 458,
		utilization: 94,
		avgCapacity: 57,
		status: "Near Full",
		colors: {
			border: "border-red-200",
			bg: "bg-red-50",
			darkBg: "dark:bg-red-900/30",
			text: "text-red-700",
			darkText: "dark:text-red-300",
			progress: "bg-red-500",
			statusBg: "bg-red-100",
			darkStatusBg: "dark:bg-red-900",
			statusText: "text-red-800",
			darkStatusText: "dark:text-red-200",
		},
		photo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
		icon: "🔒",
		tags: ["Security", "Privacy", "Cybersecurity"],
		organizer: "Alex Thompson, alex.thompson@example.com",
		location: "Room 102",
	},
];
