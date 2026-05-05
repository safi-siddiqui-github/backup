"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Brain,
	Camera,
	Gamepad2,
	Puzzle,
	Timer,
	Trophy,
	Users,
	X,
	Zap,
} from "lucide-react";
import { useState } from "react";

// Demo data - use same GAMES array/type as LandingComponent, import or redefine here for now
const GAMES = [
	{
		id: "trivia",
		title: "Lightning Trivia",
		description:
			"Test your guests’ knowledge with fast-paced trivia rounds and leaderboards.",
		tags: ["Trivia", "Knowledge"],
		icon: <Zap className="h-8 w-8 text-yellow-400" />,
	},
	{
		id: "tap-race",
		title: "Tap Race",
		description:
			"Who taps the fastest? Race digital cars powered by your guests’ taps.",
		tags: ["Fast-Paced"],
		icon: <Gamepad2 className="h-8 w-8 text-blue-500" />,
	},
	{
		id: "photo-challenge",
		title: "Photo Challenge",
		description: "Guests snap themed photos—host or AI picks the winners!",
		tags: ["AR & Camera"],
		icon: <Camera className="h-8 w-8 text-purple-500" />,
	},
	{
		id: "crowd-puzzle",
		title: "Crowd Puzzle",
		description:
			"Host uploads an image, guests solve a digital jigsaw collaboratively.",
		tags: ["Collaborative"],
		icon: <Puzzle className="h-8 w-8 text-green-500" />,
	},
	{
		id: "digital-bingo",
		title: "Digital Bingo",
		description:
			"Classic bingo reinvented for groups. Play virtually, track winners.",
		tags: ["Group Competition"],
		icon: <Brain className="h-8 w-8 text-red-500" />,
	},
	{
		id: "prediction-master",
		title: "Prediction Master",
		description:
			"Predict event outcomes—hosts push questions, guests submit answers.",
		tags: ["Poll & Decision"],
		icon: <Trophy className="h-8 w-8 text-fuchsia-500" />,
	},
	{
		id: "choose-your-story",
		title: "Choose Your Story",
		description:
			"Collaborative roleplay: guests vote and shape the story’s path.",
		tags: ["Story & Roleplay"],
		icon: <Users className="h-8 w-8 text-pink-500" />,
	},
	{
		id: "battle-of-opinions",
		title: "Battle of Opinions",
		description:
			"Would you rather? Guests choose sides, see live group results.",
		tags: ["Poll & Decision"],
		icon: <Timer className="h-8 w-8 text-orange-500" />,
	},
	{
		id: "puzzle-rush",
		title: "Puzzle Rush",
		description:
			"Chain-solve a sequence of mini image puzzles under time pressure.",
		tags: ["Word & Puzzle"],
		icon: <Puzzle className="h-8 w-8 text-indigo-500" />,
	},
];

interface GamesCreateGameModalProps {
	open: boolean;
	onClose: () => void;
}

export default function GamesCreateGameModal({
	open,
	onClose,
}: GamesCreateGameModalProps) {
	const [selectedGame, setSelectedGame] = useState<string | null>(null);
	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<DialogContent className="max-w-xl rounded-lg !bg-white dark:!bg-[#020617] p-6 shadow-2xl backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				<DialogHeader className="mb-4 flex flex-row items-center justify-between">
					<DialogTitle className="text-2xl font-bold">
						Choose a Game Template
					</DialogTitle>
					<Button
						variant="ghost"
						size="icon"
						aria-label="Close"
						className="ml-2"
						onClick={onClose}
					>
						<X className="h-6 w-6 text-gray-400" />
					</Button>
				</DialogHeader>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{GAMES.map((game) => (
						<Card
							key={game.id}
							className={`flex cursor-pointer flex-col items-start border p-4 transition-all ${selectedGame === game.id ? "border-indigo-200 bg-indigo-50 ring-2 ring-indigo-400" : "hover:border-indigo-200 hover:ring-2 hover:ring-indigo-100"}`}
							onClick={() => setSelectedGame(game.id)}
						>
							<div className="mb-1 flex items-center gap-3">
								{game.icon}
								<span className="text-lg font-semibold text-gray-800">
									{game.title}
								</span>
							</div>
							<p className="mb-2 text-sm text-gray-600">{game.description}</p>
							<div className="mt-auto flex flex-wrap gap-2">
								{game.tags.map((tag) => (
									<Badge
										key={tag}
										className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500"
									>
										{tag}
									</Badge>
								))}
							</div>
						</Card>
					))}
				</div>
				<div className="mt-8 flex justify-end gap-2">
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button
						disabled={!selectedGame}
						className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-fuchsia-500"
					>
						Next
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
