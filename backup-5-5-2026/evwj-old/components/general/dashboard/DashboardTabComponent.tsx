"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigationStore } from "@/lib/lib-navigation-store";
import { TabsContent } from "@radix-ui/react-tabs";
import DashboardHostingComponent from "./DashboardHostingComponent";
import { Trophy, TrendingUp, Target, Gift, Calendar } from "lucide-react";

// Empty state component for dashboard tabs
const EmptyState = ({
	icon: Icon,
	title,
	description,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
}) => (
	<div className="flex flex-col items-center justify-center py-16 px-4 w-full h-full min-h-[calc(100vh-400px)]">
		<div className="p-4 rounded-full bg-gradient-to-br from-slate-700/50 to-slate-800/40 backdrop-blur-sm border border-slate-600/50 mb-4">
			<Icon className="w-8 h-8 text-slate-300" />
		</div>
		<h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
		<p className="text-sm text-slate-400 text-center max-w-md">{description}</p>
	</div>
);

export default function DashboardTabComponent() {
	//
	const { dashboardTab, setDashboardTab } = useNavigationStore();
	//
	return (
		<Card className="flex flex-col overflow-x-auto backdrop-blur-xl bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-black/90 border-slate-700/50 shadow-xl min-h-[calc(100vh-400px)]">
			{/*  */}

			{/*  */}
			<CardContent className="p-6 pb-0 flex flex-col flex-1">
				{/*  */}

				{/*  */}
				<Tabs
					value={dashboardTab ?? ""}
					className="justify-start gap-6 flex flex-col flex-1 h-full"
					onValueChange={setDashboardTab}
				>
					{/*  */}

					{/*  */}
					<TabsList className="w-full justify-start mb-0 bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm">
						{/*  */}

						{/*  */}
						<TabsTrigger
							value="achievements"
							className="text-slate-300/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-700 data-[state=active]:to-slate-800 data-[state=active]:text-white hover:text-slate-200 transition-all"
						>
							Achievements
						</TabsTrigger>
						{/*  */}

						{/*  */}
						<TabsTrigger
							value="insights"
							className="text-slate-300/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-700 data-[state=active]:to-slate-800 data-[state=active]:text-white hover:text-slate-200 transition-all"
						>
							Insights
						</TabsTrigger>
						{/*  */}

						{/*  */}
						<TabsTrigger
							value="milestones"
							className="text-slate-300/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-700 data-[state=active]:to-slate-800 data-[state=active]:text-white hover:text-slate-200 transition-all"
						>
							Milestones
						</TabsTrigger>
						{/*  */}

						{/*  */}
						<TabsTrigger
							value="rewards"
							className="text-slate-300/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-700 data-[state=active]:to-slate-800 data-[state=active]:text-white hover:text-slate-200 transition-all"
						>
							Rewards
						</TabsTrigger>
						{/*  */}

						{/*  */}
						<TabsTrigger
							value="hosting"
							className="text-slate-300/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-700 data-[state=active]:to-slate-800 data-[state=active]:text-white hover:text-slate-200 transition-all"
						>
							Hosting
						</TabsTrigger>
						{/*  */}

						{/*  */}
						<TabsTrigger
							value="attending"
							className="text-slate-300/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-700 data-[state=active]:to-slate-800 data-[state=active]:text-white hover:text-slate-200 transition-all"
						>
							Attending
						</TabsTrigger>
						{/*  */}

						{/*  */}
					</TabsList>
					{/*  */}

					{/*  */}
					<TabsContent value="achievements" className="flex-1 w-full m-0">
						<EmptyState
							icon={Trophy}
							title="No Achievements Yet"
							description="Complete events and reach milestones to unlock achievements. Your progress will be tracked here!"
						/>
					</TabsContent>
					{/*  */}

					{/*  */}
					<TabsContent value="insights" className="flex-1 w-full m-0">
						<EmptyState
							icon={TrendingUp}
							title="No Insights Available"
							description="As you create and manage events, detailed analytics and insights will appear here to help you understand your event performance."
						/>
					</TabsContent>
					{/*  */}

					{/*  */}
					<TabsContent value="milestones" className="flex-1 w-full m-0">
						<EmptyState
							icon={Target}
							title="No Milestones Reached"
							description="Keep hosting and attending events to reach important milestones. Track your journey as you progress!"
						/>
					</TabsContent>
					{/*  */}

					{/*  */}
					<TabsContent value="rewards" className="flex-1 w-full m-0">
						<EmptyState
							icon={Gift}
							title="No Rewards Yet"
							description="Earn rewards by completing events and reaching milestones. Your rewards will be displayed here when available."
						/>
					</TabsContent>
					{/*  */}

					{/*  */}
					<TabsContent value="hosting" className="w-full m-0">
						{/*  */}
						<DashboardHostingComponent />
						{/*  */}
					</TabsContent>
					{/*  */}

					{/*  */}
					<TabsContent value="attending" className="flex-1 w-full m-0">
						<EmptyState
							icon={Calendar}
							title="No Events to Attend"
							description="Start exploring events and RSVP to attend. Your upcoming events will appear here once you've joined some!"
						/>
					</TabsContent>

					{/*  */}
				</Tabs>
				{/*  */}

				{/*  */}
			</CardContent>
			{/*  */}

			{/*  */}
		</Card>
	);
}
