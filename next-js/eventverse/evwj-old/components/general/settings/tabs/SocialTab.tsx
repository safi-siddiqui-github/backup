"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Heart,
	Star,
	Music,
	Briefcase,
	Palette,
	Trophy,
	Cake,
	Sparkles,
	X,
	Plus,
	UserMinus,
} from "lucide-react";
import { toast } from "sonner";

export default function SocialTab() {
	const [newInterest, setNewInterest] = useState("");

	// Mock data for event interests
	const [eventInterests, setEventInterests] = useState([
		{
			id: "1",
			name: "Music Concerts",
			icon: "Music",
			color: "from-purple-500 to-pink-500",
		},
		{
			id: "2",
			name: "Tech Conferences",
			icon: "Briefcase",
			color: "from-blue-500 to-cyan-500",
		},
		{
			id: "3",
			name: "Art Exhibitions",
			icon: "Palette",
			color: "from-orange-500 to-yellow-500",
		},
		{
			id: "4",
			name: "Sports Events",
			icon: "Trophy",
			color: "from-green-500 to-emerald-500",
		},
		{
			id: "5",
			name: "Food Festivals",
			icon: "Cake",
			color: "from-red-500 to-pink-500",
		},
	]);

	// Mock data for followed organizers
	const [followedOrganizers, setFollowedOrganizers] = useState([
		{
			id: "1",
			name: "Live Nation Events",
			type: "Music Promoter",
			avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=LiveNation",
			followersCount: "125K",
			upcomingEvents: 23,
		},
		{
			id: "2",
			name: "TechCrunch",
			type: "Conference Organizer",
			avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=TechCrunch",
			followersCount: "89K",
			upcomingEvents: 8,
		},
		{
			id: "3",
			name: "Art Basel",
			type: "Art Gallery",
			avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=ArtBasel",
			followersCount: "56K",
			upcomingEvents: 12,
		},
		{
			id: "4",
			name: "Food & Wine Magazine",
			type: "Culinary Events",
			avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=FoodWine",
			followersCount: "42K",
			upcomingEvents: 15,
		},
		{
			id: "5",
			name: "Marathon Runners Club",
			type: "Sports Organization",
			avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=Marathon",
			followersCount: "34K",
			upcomingEvents: 6,
		},
	]);

	const addInterest = () => {
		if (newInterest.trim()) {
			const colors = [
				"from-purple-500 to-pink-500",
				"from-blue-500 to-cyan-500",
				"from-orange-500 to-yellow-500",
				"from-green-500 to-emerald-500",
				"from-red-500 to-pink-500",
				"from-indigo-500 to-purple-500",
			];
			// Generate unique ID based on timestamp and random number
			const newId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
			const randomColor = colors[Math.floor(Math.random() * colors.length)];

			setEventInterests([
				...eventInterests,
				{
					id: newId,
					name: newInterest,
					icon: "Sparkles",
					color: randomColor,
				},
			]);
			setNewInterest("");
			toast.success(`${newInterest} has been added to your interests.`);
		}
	};

	const removeInterest = (id: string) => {
		const interest = eventInterests.find((i) => i.id === id);
		setEventInterests(eventInterests.filter((i) => i.id !== id));
		toast.success(`${interest?.name} has been removed from your interests.`);
	};

	const unfollowOrganizer = (id: string) => {
		const organizer = followedOrganizers.find((o) => o.id === id);
		setFollowedOrganizers(followedOrganizers.filter((o) => o.id !== id));
		toast.success(`You've unfollowed ${organizer?.name}.`);
	};

	return (
		<div className="space-y-6">
			{/* Event Type Interests */}
			<Card className="bg-white/80 backdrop-blur-sm dark:bg-[#020617]">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Heart className="w-5 h-5 text-pink-500" />
						Event Type Interests
					</CardTitle>
					<CardDescription>
						Select your favorite event types to get personalized recommendations
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex flex-wrap gap-3">
						{eventInterests.map((interest) => {
							const IconComponent =
								interest.icon === "Music"
									? Music
									: interest.icon === "Briefcase"
										? Briefcase
										: interest.icon === "Palette"
											? Palette
											: interest.icon === "Trophy"
												? Trophy
												: interest.icon === "Cake"
													? Cake
													: Sparkles;

							return (
								<Badge
									key={interest.id}
									className={`bg-gradient-to-r ${interest.color} text-white border-0 px-4 py-2 text-sm flex items-center gap-2 hover:opacity-90 transition-opacity`}
								>
									<IconComponent className="w-4 h-4" />
									{interest.name}
									<button
										onClick={() => removeInterest(interest.id)}
										className="ml-2 hover:bg-white/20 rounded-full p-0.5"
									>
										<X className="w-3 h-3" />
									</button>
								</Badge>
							);
						})}
					</div>

					<div className="flex gap-2 pt-4">
						<Input
							placeholder="Add new interest (e.g., Comedy Shows, Workshops)"
							value={newInterest}
							onChange={(e) => setNewInterest(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && addInterest()}
							className="flex-1"
						/>
						<Button
							onClick={addInterest}
							className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
						>
							<Plus className="w-4 h-4 mr-2" />
							Add Interest
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Followed Organizers */}
			<Card className="bg-white/80 backdrop-blur-sm dark:bg-[#020617]">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Star className="w-5 h-5 text-yellow-500" />
						Followed Event Organizers
					</CardTitle>
					<CardDescription>
						Stay updated with events from your favorite organizers
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{followedOrganizers.map((organizer) => (
							<div
								key={organizer.id}
								className="flex items-center justify-between rounded-lg border border-border bg-white/80 p-4 backdrop-blur-sm transition-colors hover:bg-accent/50 dark:bg-[#020617]"
							>
								<div className="flex items-center gap-4">
									<Avatar className="w-12 h-12">
										<AvatarImage src={organizer.avatar} />
										<AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
											{organizer.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div>
										<h4 className="font-semibold text-foreground">
											{organizer.name}
										</h4>
										<p className="text-sm text-muted-foreground">
											{organizer.type}
										</p>
										<div className="flex items-center gap-3 mt-1">
											<span className="text-xs text-muted-foreground">
												{organizer.followersCount} followers
											</span>
											<span className="text-xs text-muted-foreground">•</span>
											<span className="text-xs text-muted-foreground">
												{organizer.upcomingEvents} upcoming events
											</span>
										</div>
									</div>
								</div>
								<Button
									variant="outline"
									size="sm"
									onClick={() => unfollowOrganizer(organizer.id)}
									className="hover:bg-destructive hover:text-destructive-foreground"
								>
									<UserMinus className="w-4 h-4 mr-2" />
									Unfollow
								</Button>
							</div>
						))}

						{followedOrganizers.length === 0 && (
							<div className="text-center py-8 text-muted-foreground">
								<p>You're not following any organizers yet.</p>
								<p className="text-sm mt-2">
									Browse events to discover organizers to follow!
								</p>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Social Media Integrations */}
			<Card className="bg-white/80 backdrop-blur-sm dark:bg-[#020617]">
				<CardHeader>
					<CardTitle>Social Media Integrations</CardTitle>
					<CardDescription>
						Connect your social accounts to enable marketing campaigns
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button
						onClick={() => {
							toast.info("Social media integration feature coming soon");
						}}
						className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
					>
						Manage Social Accounts
					</Button>
					<p className="text-sm text-muted-foreground mt-2">
						Connected accounts: LinkedIn, Instagram, Facebook, TikTok
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
