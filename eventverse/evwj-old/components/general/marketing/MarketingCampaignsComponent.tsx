"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Users,
	Megaphone,
	Database,
	Plug,
	TrendingUp,
	Mail,
	Instagram,
	Linkedin,
	Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "./common/StatCard";
import SegmentsTabContent from "./segment-tab/SegmentsTabContent";
import IntegrationsTabContent from "./integrations-tab/IntegrationsTabContent";
import GuestDatabaseTabContent from "./guest-database-tab/GuestDatabaseTabContent";
import CampaignsTabContent from "./campaigns-tab/CampaignsTabContent";
import CreateCampaignDialog from "./campaigns-tab/CreateCampaignDialog";

export default function MarketingCampaignsComponent() {
	const [activeTab, setActiveTab] = useState("campaigns");
	const [createCampaignOpen, setCreateCampaignOpen] = useState(false);

	// Mock data for stats
	const stats = {
		totalGuests: 4,
		campaignChannels: {
			total: 10,
			breakdown: [
				{ name: "Email", count: 3, icon: Mail },
				{ name: "Instagram", count: 2, icon: Instagram },
				{ name: "LinkedIn", count: 2, icon: Linkedin },
				{ name: "Mail", count: 1, icon: Mail },
			],
		},
		guestSegments: 7,
		avgEngagement: 21.1,
	};

	// Mock guest avatars/initials - matching image colors
	const guestAvatars = [
		{ initials: "SJ", color: "bg-green-500" },
		{ initials: "MC", color: "bg-orange-500" },
		{ initials: "ER", color: "bg-pink-500" },
		{ initials: "DK", color: "bg-blue-500" },
	];

	return (
		<div className="flex flex-col gap-4 sm:gap-6">
			{/* Stats Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
				{/* Total Guests Card */}
				<StatCard
					title="Total Guests"
					value={stats.totalGuests}
					subtitle="Across all events"
					icon={Users}
					color="blue"
					avatars={guestAvatars}
				/>

				{/* Campaign Channels Card */}
				<StatCard
					title="Campaign Channels"
					value={stats.campaignChannels.total}
					subtitle="Total channel deployments"
					icon={Megaphone}
					color="green"
					breakdown={stats.campaignChannels.breakdown}
				/>

				{/* Guest Segments Card */}
				<StatCard
					title="Guest Segments"
					value={stats.guestSegments}
					subtitle="Ready to target"
					icon={Database}
					color="purple"
				/>

				{/* Avg. Engagement Card */}
				<StatCard
					title="Avg. Engagement"
					value={`${stats.avgEngagement}%`}
					icon={TrendingUp}
					color="pink"
					status={{
						text: "Strong performance",
						icon: TrendingUp,
						color: "text-green-600",
					}}
				/>
			</div>

			{/* Tabs Navigation */}
			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className="flex flex-col gap-6"
			>
				<TabsList className="*:data-[slot=tabs-trigger]:hover:bg-background h-full w-full justify-start gap-1 sm:gap-2 overflow-x-auto *:data-[slot=tabs-trigger]:cursor-pointer bg-white! dark:bg-slate-800/95! backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]">
					<TabsTrigger
						value="campaigns"
						className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
					>
						<Megaphone className="h-3 w-3 sm:h-4 sm:w-4" />
						<span>Campaigns</span>
					</TabsTrigger>
					<TabsTrigger
						value="segments"
						className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
					>
						<Database className="h-3 w-3 sm:h-4 sm:w-4" />
						<span>Segments</span>
					</TabsTrigger>
					<TabsTrigger
						value="guest-database"
						className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
					>
						<Users className="h-3 w-3 sm:h-4 sm:w-4" />
						<span className="hidden sm:inline">Guest Database</span>
						<span className="sm:hidden">Database</span>
					</TabsTrigger>
					<TabsTrigger
						value="integrations"
						className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
					>
						<Plug className="h-3 w-3 sm:h-4 sm:w-4" />
						<span className="hidden sm:inline">Integrations</span>
						<span className="sm:hidden">Integrate</span>
					</TabsTrigger>
				</TabsList>

				{/* Campaigns Tab Content */}
				<TabsContent value="campaigns">
					<CampaignsTabContent />
				</TabsContent>

				{/* Segments Tab Content */}
				<TabsContent value="segments">
					<SegmentsTabContent />
				</TabsContent>

				{/* Guest Database Tab Content */}
				<TabsContent value="guest-database">
					<GuestDatabaseTabContent />
				</TabsContent>

				{/* Integrations Tab Content */}
				<TabsContent value="integrations">
					<IntegrationsTabContent />
				</TabsContent>
			</Tabs>

			{/* Create Campaign Button - Fixed Bottom Right */}
			<Button
				className="fixed bottom-28 right-6 bg-blue-600 hover:bg-blue-700 shadow-lg rounded-full flex items-center gap-3 px-10 py-6 text-sm font-semibold z-50 hover:scale-105 transition-transform duration-200"
				onClick={() => setCreateCampaignOpen(true)}
			>
				<Sparkles className="h-5 w-5" />
				<span>Create Campaign</span>
			</Button>

			{/* Create Campaign Dialog */}
			<CreateCampaignDialog
				open={createCampaignOpen}
				onOpenChange={setCreateCampaignOpen}
			/>
		</div>
	);
}
