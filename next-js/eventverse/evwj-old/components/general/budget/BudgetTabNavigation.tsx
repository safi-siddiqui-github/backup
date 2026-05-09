"use client";

import { useState } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Calculator,
	Store,
	FileText,
	Users,
	MessageSquare,
	CreditCard,
} from "lucide-react";

interface BudgetTabNavigationProps {
	isBudgetCommitted?: boolean;
	value?: string;
	onValueChange?: (value: string) => void;
}

const budgetTabs = [
	{ value: "budget", label: "Budget", icon: Calculator },
	{ value: "marketplace", label: "Marketplace", icon: Store },
	{ value: "proposals", label: "Proposals (5)", icon: FileText },
	{ value: "vendor-mgmt", label: "Vendor Mgmt", icon: Users },
	{ value: "messages", label: "Messages", icon: MessageSquare },
	{ value: "billing", label: "Billing", icon: CreditCard },
];

export default function BudgetTabNavigation({
	isBudgetCommitted = false,
	value,
	onValueChange,
}: BudgetTabNavigationProps) {
	const selectedTab = value || "budget";

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
								const currentTab = budgetTabs.find((tab) => tab.value === selectedTab);
								if (!currentTab) return null;
								const IconComponent = currentTab.icon;
								return (
									<div className="flex items-center gap-2">
										<IconComponent className="h-4 w-4 text-gray-700 dark:text-slate-300" />
										<span className="text-sm font-semibold text-gray-700 dark:text-slate-300">
											{currentTab.label}
										</span>
									</div>
								);
							})()}
						</SelectValue>
					</SelectTrigger>
					<SelectContent className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
						{budgetTabs.map((tab) => {
							const IconComponent = tab.icon;
							return (
								<SelectItem key={tab.value} value={tab.value}>
									<div className="flex items-center gap-2">
										<IconComponent className="h-4 w-4 text-gray-700 dark:text-slate-300" />
										<span>{tab.label}</span>
									</div>
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>
			</div>

			{/* Desktop: Tab List */}
			<TabsList className="hidden lg:flex *:data-[slot=tabs-trigger]:hover:bg-background h-full w-full justify-start gap-2 *:data-[slot=tabs-trigger]:cursor-pointer !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				{budgetTabs.map((tab) => {
					const IconComponent = tab.icon;
					return (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
						>
							<IconComponent className="h-4 w-4" />
							<span className="hidden sm:inline">{tab.label}</span>
						</TabsTrigger>
					);
				})}
			</TabsList>
		</>
	);
}
