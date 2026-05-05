// TypeScript types & demo data for games module - API-ready central data source
import {
	Brain,
	Camera,
	Gamepad2,
	Puzzle,
	Timer,
	Trophy,
	Zap,
} from "lucide-react";
import { ReactNode } from "react";

// Game type definition
export type GameType = {
	id: string;
	title: string;
	description: string;
	difficulty: "Easy" | "Medium" | "Hard";
	tags: string[];
	category: string; // Category ID for filtering
	icon: ReactNode;
	image?: string;
};

// Main game type demo data
export const GAME_TYPES: GameType[] = [
	{
		id: "trivia",
		title: "Lightning Trivia",
		description:
			"Test your guests' knowledge with fast-paced trivia rounds and leaderboards.",
		difficulty: "Medium",
		tags: ["Trivia", "Knowledge"],
		category: "trivia",
		icon: <Zap className="h-8 w-8 text-yellow-400" />,
		image:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "tap-race",
		title: "Tap Race",
		description:
			"Who taps the fastest? Race digital cars powered by your guests' taps.",
		difficulty: "Easy",
		tags: ["Fast-Paced"],
		category: "fast",
		icon: <Gamepad2 className="h-8 w-8 text-blue-500" />,
		image:
			"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "Scavenger hunt",
		title: "Scavenger hunt",
		description: "Guests snap themed photos—host or AI picks the winners!",
		difficulty: "Medium",
		tags: ["AR & Camera"],
		category: "ar-camera",
		icon: <Camera className="h-8 w-8 text-purple-500" />,
		image:
			"https://images.unsplash.com/photo-1465101178521-c1a9136a03d8?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "crowd-puzzle",
		title: "Crowd Puzzle",
		description:
			"Host uploads an image, guests solve a digital jigsaw collaboratively.",
		difficulty: "Hard",
		tags: ["Collaborative"],
		category: "collaborative",
		icon: <Puzzle className="h-8 w-8 text-green-500" />,
		image:
			"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "digital-bingo",
		title: "Digital Bingo",
		description:
			"Classic bingo for groups, play virtually and call winners live.",
		difficulty: "Easy",
		tags: ["Group Competition"],
		category: "collaborative",
		icon: <Brain className="h-8 w-8 text-red-500" />,
		image:
			"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "prediction-master",
		title: "Prediction Master",
		description:
			"Predict event outcomes—host pushes questions, guests submit predictions in real-time.",
		difficulty: "Easy",
		tags: ["Poll & Decision"],
		category: "poll",
		icon: <Trophy className="h-8 w-8 text-fuchsia-500" />,
		image:
			"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "battle-of-opinions",
		title: "Battle of Opinions",
		description:
			"Would you rather? Guests choose sides, see live group polling.",
		difficulty: "Easy",
		tags: ["Poll & Decision"],
		category: "poll",
		icon: <Timer className="h-8 w-8 text-orange-500" />,
		image:
			"https://images.unsplash.com/photo-1514517220033-e1b6b12b1a5d?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "puzzle-rush",
		title: "Puzzle Rush",
		description:
			"Chain-solve a sequence of mini image puzzles under time pressure.",
		difficulty: "Hard",
		tags: ["Word & Puzzle"],
		category: "collaborative",
		icon: <Puzzle className="h-8 w-8 text-indigo-500" />,
		image:
			"https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=400&q=80",
	},
];

// Example featured games (with images)
export const FEATURED_GAMES = [
	{
		id: "trivia",
		title: "Lightning Trivia",
		image:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
		difficulty: "Medium",
		description:
			"Rapid-fire questions and time pressure. Faster correct answers = more points!",
	},
	{
		id: "tap-race",
		title: "Tap Race",
		image:
			"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
		difficulty: "Easy",
		description: "Who can tap the fastest? Pure speed competition!",
	},
	{
		id: "photo-challenge",
		title: "Photo Challenge",
		image:
			"https://images.unsplash.com/photo-1465101178521-c1a9136a03d8?auto=format&fit=crop&w=400&q=80",
		difficulty: "Medium",
		description: "Complete creative photo challenges and let friends vote!",
	},
];

// Example trivia packs for the Trivia game type
export type TriviaPack = {
	id: string;
	title: string;
	description: string;
	numQuestions: number;
	difficulty: "Easy" | "Medium" | "Hard";
	image: string;
};

export type TapRaceAnimation = {
	id: string;
	title: string;
	description: string;
	animationType: "car" | "ball" | "rocket" | "runner";
	difficulty: "Easy" | "Medium" | "Hard";
	image: string;
};

export const TRIVIA_PACKS: TriviaPack[] = [
	{
		id: "fun-facts",
		title: "Fun Facts",
		description: "Surprising general knowledge that stumps everyone!",
		numQuestions: 12,
		difficulty: "Easy",
		image:
			"https://images.unsplash.com/photo-1465101178521-c1a9136a03d8?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "world-capitals",
		title: "World Capitals",
		description:
			"Test friends on mountains, cities, and capitals around the globe.",
		numQuestions: 15,
		difficulty: "Medium",
		image:
			"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "marvel-universe",
		title: "Marvel Universe",
		description: "Calling all Marvel fans—true-believer questions await!",
		numQuestions: 10,
		difficulty: "Medium",
		image:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
	},
	// Additional demo packs
	{
		id: "music-legends",
		title: "Music Legends",
		description: "From rock classics to pop hits—prove your music mastery!",
		numQuestions: 18,
		difficulty: "Easy",
		image:
			"https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "movie-quotes",
		title: "Iconic Movie Quotes",
		description: "Finish the line and name the film in this cinematic quiz.",
		numQuestions: 20,
		difficulty: "Medium",
		image:
			"https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "sports-fever",
		title: "Sports Fever",
		description:
			"Rules, records, and legends across football, basketball and more.",
		numQuestions: 16,
		difficulty: "Hard",
		image:
			"https://images.unsplash.com/photo-1521417531039-94i6b9e3?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "tech-trivia",
		title: "Tech & Gadgets",
		description: "From early computers to smart devices—how geeky are you?",
		numQuestions: 14,
		difficulty: "Medium",
		image:
			"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "foodie-frenzy",
		title: "Foodie Frenzy",
		description:
			"Culinary curiosities and spicy facts from kitchens worldwide.",
		numQuestions: 12,
		difficulty: "Easy",
		image:
			"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
	},
];

export const TAP_RACE_ANIMATIONS: TapRaceAnimation[] = [
	{
		id: "racing-cars",
		title: "Racing Cars",
		description:
			"Feel the speed with high-octane racing car animations. Perfect for competitive events!",
		animationType: "car",
		difficulty: "Easy",
		image:
			"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "rolling-balls",
		title: "Rolling Balls",
		description:
			"Smooth rolling motion that picks up speed with every tap. Classic and engaging!",
		animationType: "ball",
		difficulty: "Easy",
		image:
			"https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "space-rockets",
		title: "Space Rockets",
		description:
			"Launch into space with rockets that soar higher with each tap. Epic and thrilling!",
		animationType: "rocket",
		difficulty: "Medium",
		image:
			"https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "sprint-runners",
		title: "Sprint Runners",
		description:
			"Racing runners sprint faster with every tap. Perfect for sports-themed events!",
		animationType: "runner",
		difficulty: "Medium",
		image:
			"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "formula-racing",
		title: "Formula Racing",
		description:
			"Elite racing experience with precision animations. For the ultimate competitive edge!",
		animationType: "car",
		difficulty: "Hard",
		image:
			"https://images.unsplash.com/photo-1519074069444-1ba4fff66e16?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "basketball-hoop",
		title: "Basketball Hoop",
		description:
			"Score points with every tap as the ball heads toward the basket. Sports fan favorite!",
		animationType: "ball",
		difficulty: "Medium",
		image:
			"https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "rocket-race",
		title: "Rocket Race",
		description:
			"Multiple rockets competing in a space race. Fast-paced and visually stunning!",
		animationType: "rocket",
		difficulty: "Hard",
		image:
			"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "marathon-runners",
		title: "Marathon Runners",
		description:
			"Endurance race with steady progression. Build momentum with consistent tapping!",
		animationType: "runner",
		difficulty: "Easy",
		image:
			"https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=400&q=80",
	},
];

export type ScavengerHuntItem = {
	id: string;
	title: string;
	description: string;
	category: string;
	difficulty: "Easy" | "Medium" | "Hard";
	estimatedTime: number; // seconds
	image?: string;
};

export const SCAVENGER_HUNT_TEMPLATES = [
	{
		id: "outdoor-adventure",
		title: "Outdoor Adventure",
		description: "Explore nature and capture outdoor moments",
		category: "Outdoor",
		difficulty: "Medium" as const,
		estimatedTime: 300,
	},
	{
		id: "urban-explorer",
		title: "Urban Explorer",
		description: "Find interesting city landmarks and street art",
		category: "Urban",
		difficulty: "Easy" as const,
		estimatedTime: 600,
	},
	{
		id: "foodie-quest",
		title: "Foodie Quest",
		description: "Capture delicious dishes and culinary experiences",
		category: "Food",
		difficulty: "Easy" as const,
		estimatedTime: 900,
	},
	{
		id: "team-bonding",
		title: "Team Bonding",
		description: "Collaborative challenges for groups",
		category: "Team",
		difficulty: "Medium" as const,
		estimatedTime: 1200,
	},
];

export type PuzzleTemplate = {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	difficulty: "Easy" | "Medium" | "Hard";
	pieces: number;
	category: string;
};

export const PUZZLE_TEMPLATES: PuzzleTemplate[] = [
	{
		id: "nature-landscape",
		title: "Nature Landscape",
		description:
			"Beautiful mountain and lake scenery perfect for collaborative solving",
		imageUrl:
			"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
		difficulty: "Easy",
		pieces: 20,
		category: "Nature",
	},
	{
		id: "city-skyline",
		title: "City Skyline",
		description: "Modern urban architecture at sunset",
		imageUrl:
			"https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80",
		difficulty: "Medium",
		pieces: 30,
		category: "Urban",
	},
	{
		id: "abstract-art",
		title: "Abstract Art",
		description: "Colorful abstract patterns for creative minds",
		imageUrl:
			"https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80",
		difficulty: "Medium",
		pieces: 25,
		category: "Art",
	},
	{
		id: "ocean-waves",
		title: "Ocean Waves",
		description: "Serene ocean view with crashing waves",
		imageUrl:
			"https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=800&q=80",
		difficulty: "Easy",
		pieces: 20,
		category: "Nature",
	},
	{
		id: "forest-path",
		title: "Forest Path",
		description: "Mysterious forest trail through the woods",
		imageUrl:
			"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
		difficulty: "Hard",
		pieces: 40,
		category: "Nature",
	},
	{
		id: "architectural-detail",
		title: "Architectural Detail",
		description: "Intricate building details for puzzle enthusiasts",
		imageUrl:
			"https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
		difficulty: "Hard",
		pieces: 35,
		category: "Architecture",
	},
	{
		id: "sunset-beach",
		title: "Sunset Beach",
		description: "Tropical beach at golden hour",
		imageUrl:
			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
		difficulty: "Medium",
		pieces: 25,
		category: "Travel",
	},
	{
		id: "vintage-photo",
		title: "Vintage Photo",
		description: "Classic retro style photograph",
		imageUrl:
			"https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80",
		difficulty: "Medium",
		pieces: 30,
		category: "Vintage",
	},
];

export type BingoCard = {
	id: string;
	numbers: number[][]; // 5x5 grid, center is FREE
	pattern: string; // "line", "full-house", "four-corners", etc.
};

export type BingoTemplate = {
	id: string;
	title: string;
	description: string;
	cardSize: "5x5" | "4x4" | "3x3";
	numberRange: { min: number; max: number }; // B1-15, I16-30, N31-45, G46-60, O61-75
	pattern: string;
	difficulty: "Easy" | "Medium" | "Hard";
	category: string;
};

export const BINGO_TEMPLATES: BingoTemplate[] = [
	{
		id: "classic-75",
		title: "Classic 75-Ball Bingo",
		description:
			"Traditional 5x5 bingo card with numbers 1-75. Perfect for classic gameplay!",
		cardSize: "5x5",
		numberRange: { min: 1, max: 75 },
		pattern: "line",
		difficulty: "Easy",
		category: "Classic",
	},
	{
		id: "quick-30",
		title: "Quick 30-Ball Bingo",
		description: "Fast-paced 3x3 bingo for quick rounds and rapid winners",
		cardSize: "3x3",
		numberRange: { min: 1, max: 30 },
		pattern: "full-house",
		difficulty: "Easy",
		category: "Fast",
	},
	{
		id: "custom-words",
		title: "Custom Words Bingo",
		description: "Create bingo cards with words or phrases instead of numbers",
		cardSize: "5x5",
		numberRange: { min: 1, max: 75 },
		pattern: "line",
		difficulty: "Medium",
		category: "Custom",
	},
	{
		id: "four-corners",
		title: "Four Corners Challenge",
		description: "Win by covering all four corners of your bingo card",
		cardSize: "5x5",
		numberRange: { min: 1, max: 75 },
		pattern: "four-corners",
		difficulty: "Medium",
		category: "Pattern",
	},
	{
		id: "blackout",
		title: "Blackout Bingo",
		description: "Cover every square on your card for the ultimate win",
		cardSize: "5x5",
		numberRange: { min: 1, max: 75 },
		pattern: "full-house",
		difficulty: "Hard",
		category: "Challenge",
	},
	{
		id: "t-shape",
		title: "T-Shape Pattern",
		description: "Win by forming a T-shape across your bingo card",
		cardSize: "5x5",
		numberRange: { min: 1, max: 75 },
		pattern: "t-shape",
		difficulty: "Hard",
		category: "Pattern",
	},
];

// Prediction Master template packs
export type PredictionPack = {
	id: string;
	title: string;
	description: string;
	numQuestions: number;
	difficulty: "Easy" | "Medium" | "Hard";
	image: string;
};

export const PREDICTION_PACKS: PredictionPack[] = [
	{
		id: "event-predictions",
		title: "Event Predictions",
		description: "Predict what happens next throughout the event program.",
		numQuestions: 12,
		difficulty: "Easy",
		image:
			"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "outcome-guessing",
		title: "Outcome Guessing",
		description:
			"Guess the results of activities, games, and mini-competitions.",
		numQuestions: 10,
		difficulty: "Medium",
		image:
			"https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "timeline-predictions",
		title: "Timeline Predictions",
		description: "Predict when key moments will happen during the event.",
		numQuestions: 14,
		difficulty: "Easy",
		image:
			"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "winner-predictions",
		title: "Winner Predictions",
		description: "Forecast winners of contests, raffles, and performances.",
		numQuestions: 9,
		difficulty: "Medium",
		image:
			"https://images.unsplash.com/photo-1474403078171-7f199e9d7cd1?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "audience-predictions",
		title: "Audience Predictions",
		description: "Predict how the crowd will react to surprises and reveals.",
		numQuestions: 15,
		difficulty: "Hard",
		image:
			"https://images.unsplash.com/photo-1515165562835-c3b8b8c2d163?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "show-predictions",
		title: "Show Predictions",
		description: "Guess the next performance, segment, or special guest.",
		numQuestions: 11,
		difficulty: "Medium",
		image:
			"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "surprise-twists",
		title: "Surprise Twists",
		description: "Call the twists before they happen—only for the bold!",
		numQuestions: 8,
		difficulty: "Hard",
		image:
			"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
	},
];

// Battle of Opinions (Would You Rather) template packs
export type BattleOfOpinionsPack = {
	id: string;
	title: string;
	description: string;
	numQuestions: number;
	difficulty: "Easy" | "Medium" | "Hard";
	image: string;
};

export const BATTLE_OF_OPINIONS_PACKS: BattleOfOpinionsPack[] = [
	{
		id: "icebreakers",
		title: "Icebreakers",
		description:
			"Light and fun would-you-rather questions to warm up the room.",
		numQuestions: 12,
		difficulty: "Easy",
		image:
			"https://images.unsplash.com/photo-1514517220033-e1b6b12b1a5d?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "deep-thoughts",
		title: "Deep Questions",
		description:
			"Thought-provoking dilemmas that spark meaningful conversations.",
		numQuestions: 10,
		difficulty: "Medium",
		image:
			"https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "funny-dilemmas",
		title: "Funny Dilemmas",
		description: "Silly and outrageous choices for lots of laughs.",
		numQuestions: 14,
		difficulty: "Easy",
		image:
			"https://images.unsplash.com/photo-1520232217232-4c349cf6b5b9?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "food-lifestyle",
		title: "Food & Lifestyle",
		description: "Tasty trade-offs and everyday lifestyle choices.",
		numQuestions: 12,
		difficulty: "Easy",
		image:
			"https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "work-career",
		title: "Work & Career",
		description: "Office-friendly dilemmas perfect for team bonding.",
		numQuestions: 10,
		difficulty: "Medium",
		image:
			"https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "travel-adventure",
		title: "Travel & Adventure",
		description: "Globe-trotting choices for the adventurous spirit.",
		numQuestions: 12,
		difficulty: "Medium",
		image:
			"https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "tech-digital",
		title: "Tech & Digital Life",
		description: "Modern tech dilemmas about apps, gadgets, and privacy.",
		numQuestions: 11,
		difficulty: "Medium",
		image:
			"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "party-social",
		title: "Party & Social",
		description: "High-energy choices made for lively group debates.",
		numQuestions: 15,
		difficulty: "Hard",
		image:
			"https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
	},
];

// Game categories (see landing/category browse)
export const CATEGORIES = [
	{
		id: "trivia",
		label: "Trivia & Knowledge",
		games: 1,
		image: FEATURED_GAMES[0].image,
	},
	{ id: "fast", label: "Fast-Paced", games: 1, image: FEATURED_GAMES[1].image },
	{
		id: "ar-camera",
		label: "AR & Camera",
		games: 1,
		image: FEATURED_GAMES[2].image,
	},
	{
		id: "collaborative",
		label: "Collaborative",
		games: 3,
		image: FEATURED_GAMES[0].image,
	},
	{
		id: "poll",
		label: "Poll & Decision",
		games: 2,
		image: FEATURED_GAMES[1].image,
	},
	{
		id: "story",
		label: "Story & Roleplay",
		games: 0,
		image: FEATURED_GAMES[2].image,
	},
];
