export type Session = {
	id: string;
	title: string;
	description: string;
	tags: { text: string; color: string }[];
	time: string;
	date: string;
	location: string;
	speakers: string[];
	capacity?: string;
	isAdded: boolean;
	type?: "keynote" | "workshop" | "session";
	level?: "all" | "intermediate" | "advanced";
	track?: "all" | "ai-ml" | "cloud-devops" | "frontend";
};

export type MyScheduleSession = {
	id: string;
	title: string;
	speaker: string;
	location: string;
	timeSlot: string;
	day: "Tuesday" | "Wednesday" | "Thursday";
	type: "keynote" | "session";
	gradientFrom: string;
	gradientTo: string;
};

export const myScheduleSessions: MyScheduleSession[] = [
	{
		id: "keynote-ai",
		title: "The Future of AI: Beyond...",
		speaker: "Dr. Sarah Chen",
		location: "Main Auditorium",
		timeSlot: "09:00",
		day: "Tuesday",
		type: "keynote",
		gradientFrom: "from-purple-500",
		gradientTo: "to-indigo-600",
	},
];

export const browseSessionsData: Session[] = [
	{
		id: "ai-beyond",
		title: "The Future of AI: Beyond 2024",
		description:
			"Exploring breakthrough developments in artificial intelligence and their impact on technology and society.",
		tags: [{ text: "Keynote", color: "bg-indigo-900  text-white" }],
		time: "09:00 - 10:00",
		date: "Sep 10",
		location: "Main Auditorium",
		speakers: ["Dr. Sarah Chen", "Prof. Michael Rodriguez"],
		capacity: "2485/2500 (+150 waitlist)",
		isAdded: false,
		type: "keynote",
		level: "all",
		track: "all",
	},
	{
		id: "ml-pipelines",
		title: "Building Production-Ready ML Pipelines",
		description:
			"Hands-on workshop for creating scalable machine learning pipelines using modern MLOps practices.",
		tags: [{ text: "AI & Machine Learning", color: "bg-blue-900 text-white" }],
		time: "10:30 - 12:00",
		date: "Sep 10",
		location: "Workshop Room A",
		speakers: ["Alex Johnson", "Maria Garcia"],
		capacity: "78/80 (+25 waitlist)",
		isAdded: false,
		type: "workshop",
		level: "intermediate",
		track: "ai-ml",
	},
	{
		id: "kubernetes-security",
		title: "Kubernetes Security Best Practices",
		description:
			"Deep dive into securing containerized applications and Kubernetes clusters in production environments.",
		tags: [{ text: "Cloud & DevOps", color: "bg-green-900 text-white" }],
		time: "10:30 - 11:30",
		date: "Sep 10",
		location: "Conference Room B",
		speakers: ["David Kim", "Lisa Wong"],
		capacity: "142/150 (+8 waitlist)",
		isAdded: false,
		type: "session",
		level: "advanced",
		track: "cloud-devops",
	},
	{
		id: "react-19",
		title: "React 19: What's New and Breaking",
		description:
			"Comprehensive overview of React 19 features, breaking changes, and migration strategies.",
		tags: [{ text: "Frontend development", color: "bg-orange-900 text-white" }],
		time: "11:45 - 12:45",
		date: "Sep 10",
		location: "Tech Theater",
		speakers: ["Emma Thompson", "Carlos Rodriguez"],
		capacity: "195/200 (+45 waitlist)",
		isAdded: false,
		type: "session",
		level: "intermediate",
		track: "frontend",
	},
	{
		id: "coffee-networking",
		title: "Coffee & Code - Morning Networking",
		description:
			"Informal networking session with refreshments and open discussions.",
		tags: [{ text: "AI & Machine Learning", color: "bg-blue-900 text-white" }],
		time: "09:00 - 09:45",
		date: "Sep 10",
		location: "Networking Zone",
		speakers: [],
		isAdded: false,
		type: "session",
		level: "all",
		track: "all",
	},
	// September 11 (Wednesday) sessions
	{
		id: "cloud-keynote",
		title: "The Future of Cloud Computing",
		description:
			"Keynote presentation exploring the next generation of cloud infrastructure and distributed systems.",
		tags: [{ text: "Keynote", color: "bg-indigo-900  text-white" }],
		time: "09:00 - 10:00",
		date: "Sep 11",
		location: "Main Auditorium",
		speakers: ["Dr. James Wilson", "Dr. Patricia Lee"],
		capacity: "2500/2500 (+200 waitlist)",
		isAdded: false,
		type: "keynote",
		level: "all",
		track: "all",
	},
	{
		id: "terraform-advanced",
		title: "Advanced Terraform Patterns",
		description:
			"Learn advanced infrastructure-as-code patterns and best practices for managing complex cloud environments.",
		tags: [{ text: "Cloud & DevOps", color: "bg-green-900 text-white" }],
		time: "10:30 - 12:00",
		date: "Sep 11",
		location: "Workshop Room B",
		speakers: ["Robert Chen", "Amanda Foster"],
		capacity: "75/75 (+15 waitlist)",
		isAdded: false,
		type: "workshop",
		level: "advanced",
		track: "cloud-devops",
	},
	{
		id: "nextjs-15",
		title: "Next.js 15: Server Components Deep Dive",
		description:
			"Comprehensive exploration of React Server Components and how Next.js 15 revolutionizes web development.",
		tags: [{ text: "Frontend development", color: "bg-orange-900 text-white" }],
		time: "10:30 - 11:30",
		date: "Sep 11",
		location: "Tech Theater",
		speakers: ["Jessica Martinez", "Kevin Park"],
		capacity: "180/200 (+30 waitlist)",
		isAdded: false,
		type: "session",
		level: "intermediate",
		track: "frontend",
	},
	{
		id: "llm-finetuning",
		title: "Fine-tuning Large Language Models",
		description:
			"Hands-on workshop on fine-tuning LLMs for specific use cases and optimizing performance.",
		tags: [{ text: "AI & Machine Learning", color: "bg-blue-900 text-white" }],
		time: "13:00 - 14:30",
		date: "Sep 11",
		location: "Workshop Room A",
		speakers: ["Dr. Michael Zhang", "Dr. Lisa Anderson"],
		capacity: "60/60 (+12 waitlist)",
		isAdded: false,
		type: "workshop",
		level: "advanced",
		track: "ai-ml",
	},
	{
		id: "docker-best-practices",
		title: "Docker Best Practices for Production",
		description:
			"Learn how to optimize Docker containers, manage multi-stage builds, and implement security best practices.",
		tags: [{ text: "Cloud & DevOps", color: "bg-green-900 text-white" }],
		time: "14:00 - 15:00",
		date: "Sep 11",
		location: "Conference Room C",
		speakers: ["Thomas Brown", "Rachel Kim"],
		capacity: "120/150 (+5 waitlist)",
		isAdded: false,
		type: "session",
		level: "intermediate",
		track: "cloud-devops",
	},
	// September 12 (Thursday) sessions
	{
		id: "data-keynote",
		title: "Data Science at Scale: The Modern Stack",
		description:
			"Keynote on building and scaling data science platforms for the modern enterprise.",
		tags: [{ text: "Keynote", color: "bg-indigo-900  text-white" }],
		time: "09:00 - 10:00",
		date: "Sep 12",
		location: "Main Auditorium",
		speakers: ["Dr. Emily Watson", "Dr. Mark Taylor"],
		capacity: "2480/2500 (+120 waitlist)",
		isAdded: false,
		type: "keynote",
		level: "all",
		track: "all",
	},
	{
		id: "typescript-advanced",
		title: "Advanced TypeScript Patterns",
		description:
			"Explore advanced TypeScript features including conditional types, template literals, and complex generics.",
		tags: [{ text: "Frontend development", color: "bg-orange-900 text-white" }],
		time: "10:30 - 12:00",
		date: "Sep 12",
		location: "Tech Theater",
		speakers: ["Daniel Lee", "Sophia Chen"],
		capacity: "200/200 (+50 waitlist)",
		isAdded: false,
		type: "workshop",
		level: "advanced",
		track: "frontend",
	},
	{
		id: "gcp-deep-dive",
		title: "Google Cloud Platform Deep Dive",
		description:
			"Comprehensive overview of GCP services, architectures, and best practices for enterprise deployments.",
		tags: [{ text: "Cloud & DevOps", color: "bg-green-900 text-white" }],
		time: "10:30 - 11:30",
		date: "Sep 12",
		location: "Conference Room B",
		speakers: ["Alex Rivera", "Maria Santos"],
		capacity: "145/150 (+8 waitlist)",
		isAdded: false,
		type: "session",
		level: "intermediate",
		track: "cloud-devops",
	},
	{
		id: "computer-vision",
		title: "Computer Vision with PyTorch",
		description:
			"Workshop on building computer vision models using PyTorch, from CNNs to transformers.",
		tags: [{ text: "AI & Machine Learning", color: "bg-blue-900 text-white" }],
		time: "13:00 - 14:30",
		date: "Sep 12",
		location: "Workshop Room A",
		speakers: ["Dr. Jennifer Liu", "Dr. Andrew Kim"],
		capacity: "80/80 (+20 waitlist)",
		isAdded: false,
		type: "workshop",
		level: "advanced",
		track: "ai-ml",
	},
	{
		id: "svelte-kit",
		title: "Building Full-Stack Apps with SvelteKit",
		description:
			"Learn how to build modern full-stack applications using SvelteKit and its powerful features.",
		tags: [{ text: "Frontend development", color: "bg-orange-900 text-white" }],
		time: "14:00 - 15:00",
		date: "Sep 12",
		location: "Conference Room A",
		speakers: ["Ryan Cooper", "Michelle Wang"],
		capacity: "90/100 (+10 waitlist)",
		isAdded: false,
		type: "session",
		level: "intermediate",
		track: "frontend",
	},
];

export const timeSlots = [
	"09:00",
	"09:30",
	"10:00",
	"10:30",
	"11:00",
	"11:30",
	"12:00",
	"12:30",
	"13:00",
	"13:30",
	"14:00",
	"14:30",
	"15:00",
];

export const days = [
	{ label: "Tuesday", date: "Sep 10" },
	{ label: "Wednesday", date: "Sep 11" },
	{ label: "Thursday", date: "Sep 12" },
];

export default {};
