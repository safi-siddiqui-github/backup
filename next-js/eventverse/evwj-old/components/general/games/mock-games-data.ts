// Mock data for user's created games
export type MyGame = {
	id: string;
	gameType: string;
	title: string;
	description?: string;
	createdAt: Date;
	updatedAt: Date;
	status: "draft" | "published";
	rounds?: any; // Game-specific rounds/config data
};

export const mockMyGames: MyGame[] = [
	{
		id: "game-1",
		gameType: "trivia",
		title: "Tech Conference Trivia",
		description: "Questions about technology, AI, and innovation",
		createdAt: new Date("2025-01-15"),
		updatedAt: new Date("2025-01-20"),
		status: "published",
		rounds: {
			count: 5,
		},
	},
	{
		id: "game-2",
		gameType: "crowd-puzzle",
		title: "Team Building Puzzle",
		description: "Collaborative puzzle for team building event",
		createdAt: new Date("2025-01-10"),
		updatedAt: new Date("2025-01-12"),
		status: "draft",
		rounds: {
			count: 3,
		},
	},
	{
		id: "game-3",
		gameType: "prediction-master",
		title: "Event Predictions",
		description: "Predict outcomes for the main event",
		createdAt: new Date("2025-01-08"),
		updatedAt: new Date("2025-01-18"),
		status: "published",
		rounds: {
			count: 8,
		},
	},
	{
		id: "game-4",
		gameType: "digital-bingo",
		title: "Networking Bingo",
		description: "Bingo game for networking event",
		createdAt: new Date("2025-01-05"),
		updatedAt: new Date("2025-01-05"),
		status: "draft",
		rounds: {
			count: 1,
		},
	},
	{
		id: "game-5",
		gameType: "tap-race",
		title: "Speed Challenge",
		description: "Fast-paced tapping competition",
		createdAt: new Date("2025-01-03"),
		updatedAt: new Date("2025-01-15"),
		status: "published",
		rounds: {
			count: 4,
		},
	},
	{
		id: "game-6",
		gameType: "battle-of-opinions",
		title: "Would You Rather?",
		description: "Fun opinion-based questions",
		createdAt: new Date("2025-01-01"),
		updatedAt: new Date("2025-01-10"),
		status: "published",
		rounds: {
			count: 10,
		},
	},
	{
		id: "game-7",
		gameType: "puzzle-rush",
		title: "Puzzle Challenge Rush",
		description: "Time-based puzzle solving competition",
		createdAt: new Date("2024-12-28"),
		updatedAt: new Date("2025-01-08"),
		status: "draft",
		rounds: {
			count: 6,
		},
	},
	{
		id: "game-8",
		gameType: "scavenger-hunt",
		title: "Photo Scavenger Hunt",
		description: "Find and photograph specific items",
		createdAt: new Date("2024-12-25"),
		updatedAt: new Date("2025-01-05"),
		status: "published",
		rounds: {
			count: 7,
		},
	},
];
