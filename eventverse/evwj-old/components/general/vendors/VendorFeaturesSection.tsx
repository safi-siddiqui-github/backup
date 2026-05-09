"use client";

import {
	BarChart3,
	Bell,
	Building2,
	FileText,
	MessageSquare,
	Receipt,
	Store,
	Users,
} from "lucide-react";
import { useMemo } from "react";

type Feature = {
	icon: typeof BarChart3;
	title: string;
	description: string;
	color: string;
};

export default function VendorFeaturesSection() {
	const features: Feature[] = useMemo(
		() => [
			{
				icon: BarChart3,
				title: "AI Dashboard",
				description:
					"Get real-time analytics and insights to track your performance, revenue, and client engagement.",
				color: "from-blue-500 to-cyan-500",
			},
			{
				icon: Bell,
				title: "Smart Leads",
				description:
					"Automated lead generation matches you with event organizers looking for your services.",
				color: "from-purple-500 to-pink-500",
			},
			{
				icon: Users,
				title: "Client Hub",
				description:
					"Manage all your client relationships, projects, and communications in one centralized place.",
				color: "from-emerald-500 to-teal-500",
			},
			{
				icon: MessageSquare,
				title: "Communications",
				description:
					"Built-in messaging system to communicate directly with event organizers and clients.",
				color: "from-orange-500 to-amber-500",
			},
			{
				icon: Receipt,
				title: "Billing",
				description:
					"Streamlined payment management with invoicing, tracking, and automated reminders.",
				color: "from-green-500 to-emerald-500",
			},
			{
				icon: FileText,
				title: "Documents",
				description:
					"Secure document storage and sharing for contracts, proposals, and project files.",
				color: "from-indigo-500 to-purple-500",
			},
			{
				icon: Store,
				title: "Event Booths",
				description:
					"Showcase your services at events with customizable booth listings and availability.",
				color: "from-rose-500 to-pink-500",
			},
			{
				icon: Building2,
				title: "Vendor Presets",
				description:
					"Quick setup templates to get started fast with pre-configured service packages.",
				color: "from-violet-500 to-purple-500",
			},
		],
		[],
	);

	return (
		<section className="border-t border-gray-200 bg-white py-16 md:py-24 dark:border-gray-800 dark:bg-gray-950">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-12 text-center md:mb-16">
					<h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
						Everything You Need to Grow Your Business
					</h2>
					<p className="mx-auto max-w-2xl text-base text-gray-600 md:text-lg dark:text-gray-400">
						Powerful tools designed specifically for vendors to connect, manage,
						and scale their event services.
					</p>
				</div>

				{/* Features Grid */}
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{features.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<div
								key={index}
								className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
							>
								{/* Gradient accent on hover */}
								<div
									className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
								/>

								{/* Icon */}
								<div className="relative mb-4">
									<div
										className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color} opacity-90 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100`}
									>
										<Icon className="h-6 w-6 text-white" />
									</div>
								</div>

								{/* Content */}
								<div className="relative">
									<h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-gray-700 dark:text-white dark:group-hover:text-gray-200">
										{feature.title}
									</h3>
									<p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
										{feature.description}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
