"use client";

import {
	HiOutlineChartPie,
	HiOutlineTicket,
	HiOutlineBookmark,
	HiOutlineTag,
	HiOutlineLink,
	HiOutlineCheckBadge,
	HiOutlineCog,
} from "react-icons/hi2";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { TicketTabNavigationProps, TabConfig } from "./types";

const tabConfigs: TabConfig[] = [
	{
		value: "overview",
		label: "Overview",
		icon: <HiOutlineChartPie className="h-4 w-4" />,
	},
	{
		value: "tickets",
		label: "Tickets",
		icon: <HiOutlineTicket className="h-4 w-4" />,
	},
	{
		value: "reservations",
		label: "Reservations",
		icon: <HiOutlineBookmark className="h-4 w-4" />,
	},
	{
		value: "promo-codes",
		label: "Promo Codes",
		icon: <HiOutlineTag className="h-4 w-4" />,
	},
	{
		value: "referrals",
		label: "Referrals",
		icon: <HiOutlineLink className="h-4 w-4" />,
	},
	{
		value: "check-in",
		label: "Check-in",
		icon: <HiOutlineCheckBadge className="h-4 w-4" />,
	},
	{
		value: "settings",
		label: "Settings",
		icon: <HiOutlineCog className="h-4 w-4" />,
	},
];

export default function TicketTabNavigation({
	className,
	value,
	onValueChange,
}: TicketTabNavigationProps) {
	const selectedTab = value || "overview";

	const handleSelectChange = (newValue: string) => {
		onValueChange?.(newValue);
	};

	return (
		<>
			{/* Mobile/Tablet: Dropdown Select */}
			<div className="lg:hidden mb-4">
				<Select value={selectedTab} onValueChange={handleSelectChange}>
					<SelectTrigger className="w-fit min-w-[200px] !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] border border-gray-200 dark:border-gray-700 h-11">
						<SelectValue>
							{(() => {
								const currentTab = tabConfigs.find((tab) => tab.value === selectedTab);
								if (!currentTab) return null;
								return (
									<div className="flex items-center gap-2">
										{currentTab.icon}
										<span className="text-sm font-semibold text-gray-700 dark:text-slate-300">
											{currentTab.label}
										</span>
									</div>
								);
							})()}
						</SelectValue>
					</SelectTrigger>
					<SelectContent className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
						{tabConfigs.map((tab) => (
							<SelectItem key={tab.value} value={tab.value}>
								<div className="flex items-center gap-2">
									{tab.icon}
									<span>{tab.label}</span>
								</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{/* Desktop: Tab List */}
			<TabsList
				className={`bg-muted text-muted-foreground inline-flex items-center rounded-lg p-[3px] *:data-[slot=tabs-trigger]:hover:bg-background h-full w-full justify-start gap-2 overflow-x-auto *:data-[slot=tabs-trigger]:cursor-pointer !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] hidden lg:flex ${
					className || ""
				}`}
			>
				{tabConfigs.map((tab) => (
					<TabsTrigger
						key={tab.value}
						value={tab.value}
						className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-transparent"
					>
						{tab.icon}
						<span>{tab.label}</span>
					</TabsTrigger>
				))}
			</TabsList>
		</>
	);
}

export { tabConfigs };
export type { TabConfig };
