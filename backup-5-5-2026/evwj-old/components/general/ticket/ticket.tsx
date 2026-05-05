"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import TicketHeader from "./TicketHeader";
import TicketHeroBackground from "./TicketHeroBackground";
import TicketTabNavigation from "./TicketTabNavigation";
import { CheckInTabContent } from "./checkout-tab/checkout";
import OverviewTabContent from "./overview-tab/OverviewTabContent";
import { PromoCodesTabContent } from "./promocode-tab/promocode";
import { ReferralsTabContent } from "./referrals-tab/refferrals";
import ReservationsTabContent from "./reservation-tab/TicketReservation";
import SettingsTabs from "./settings-tab/settings";
import { TicketsTabContent } from "./ticket-tab/TicketsManagementContent";
import type {
	RecentActivity,
	TabValue,
	TicketStats,
	TicketTypeData,
} from "./types";

export default function TicketingComponent() {
	const [activeTab, setActiveTab] = useState<TabValue>("overview");

	const stats: TicketStats = {
		totalSales: 107,
		reserved: 12,
		revenue: 320,
		checkInRate: 60,
	};

	const ticketTypes: TicketTypeData[] = [
		{
			id: "1",
			color: "blue",
			name: "General Admission",
			price: 25.0,
			sold: 45,
			total: 100,
			available: 55,
		},
		{
			id: "2",
			color: "orange",
			name: "VIP Premium",
			price: 75.0,
			sold: 12,
			total: 25,
			available: 13,
		},
		{
			id: "3",
			color: "green",
			name: "Early Bird",
			price: 19.99,
			sold: 50,
			total: 50,
			available: 0,
		},
	];

	const recentActivity: RecentActivity[] = [
		{
			id: "act1",
			name: "John Smith",
			description: "General Admission x 2",
			amount: 50.0,
			status: "paid",
		},
		{
			id: "act2",
			name: "Sarah Johnson",
			description: "VIP Premium x 1",
			amount: 75.0,
			status: "paid",
		},
		{
			id: "act3",
			name: "Mike Davis",
			description: "General Admission x 1",
			amount: 25.0,
			status: "paid",
		},
		{
			id: "act4",
			name: "Emily Chen",
			description: "VIP Premium x 2",
			amount: 150.0,
			status: "paid",
		},
		{
			id: "act5",
			name: "Alex Rodriguez",
			description: "Early Bird x 1",
			amount: 19.99,
			status: "paid",
		},
	];

	const handleReserve = (ticketId?: string) => {
		// Switch to Reservations tab and smooth-scroll to it
		setActiveTab("reservations");
		// small delay to allow tab content to render/update
		setTimeout(() => {
			const el = document.getElementById("tab-reservations");
			if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
		}, 80);
		console.log("Reserving ticket:", ticketId);
	};

	const handleAddTicketType = () => {
		// Navigate to reservations — new ticket types flow continues there
		setActiveTab("reservations");
		setTimeout(() => {
			const el = document.getElementById("tab-reservations");
			if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
		}, 80);
		console.log("Add new ticket type");
	};

	const handleViewAllActivity = () => {
		console.log("View all activity");
	};

	return (
		<div
		// className=" bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30 px-4 pt-28 pb-4 md:px-8 md:pt-32 md:pb-8 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10"
		>
			{/* Animated Background Elements */}
			<TicketHeroBackground />

			<div className="relative z-10 w-full">
				{/* Header */}
				<TicketHeader stats={stats} />

				{/* Navigation Tabs */}
				<Tabs
					defaultValue="overview"
					value={activeTab}
					onValueChange={(v) => setActiveTab(v as TabValue)}
					className="mb-8"
				>
					<TicketTabNavigation 
						value={activeTab}
						onValueChange={(v) => setActiveTab(v as TabValue)}
					/>

					{/* Overview Tab Content */}
					<TabsContent value="overview" className="mt-8">
						<OverviewTabContent
							stats={stats}
							ticketTypes={ticketTypes}
							recentActivity={recentActivity}
							onReserve={handleReserve}
							onAddTicketType={handleAddTicketType}
							onViewAllActivity={handleViewAllActivity}
						/>
					</TabsContent>

					{/* Other Tab Contents */}
					<TabsContent value="tickets" className="mt-8">
						<TicketsTabContent />
					</TabsContent>

					<TabsContent
						value="reservations"
						id="tab-reservations"
						className="mt-8"
					>
						<ReservationsTabContent />
					</TabsContent>

					<TabsContent value="promo-codes" className="mt-8">
						<PromoCodesTabContent />
					</TabsContent>

					<TabsContent value="referrals" className="mt-8">
						<ReferralsTabContent />
					</TabsContent>

					<TabsContent value="check-in" className="mt-8">
						<CheckInTabContent />
					</TabsContent>

					<TabsContent value="settings" className="mt-8">
						<SettingsTabs />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
