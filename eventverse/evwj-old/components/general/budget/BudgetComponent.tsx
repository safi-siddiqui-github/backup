"use client";

import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import BudgetSummaryStats from "@/components/general/budget/BudgetSummaryStats";
import BudgetTabNavigation from "@/components/general/budget/BudgetTabNavigation";
import BudgetTabContent from "@/components/general/budget/budget-tab/BudgetTabContent";
import ProposalsTabContent from "@/components/general/budget/proposals-tab/ProposalsTabContent";
import MarketplaceTabContent from "@/components/general/budget/marketplace-tab/MarketplaceTabContent";
import VendorMgmtTabContent from "@/components/general/budget/vendor-mgmt-tab/VendorMgmtTabContent";
import BillingTabContent from "@/components/general/budget/billing-tab/BillingTabContent";
import MessagesTabContent from "@/components/general/budget/messages-tab/MessagesTabContent";
import { BudgetItem } from "@/components/general/budget/budget-tab/BudgetPlanningView";

export type BudgetTabValue =
	| "budget"
	| "marketplace"
	| "proposals"
	| "vendor-mgmt"
	| "messages"
	| "billing";

export default function BudgetComponent() {
	const [activeTab, setActiveTab] = useState<BudgetTabValue>("budget");
	const [committedBudget, setCommittedBudget] = useState<number | null>(null);
	const [isBudgetCommitted, setIsBudgetCommitted] = useState(false);
	const [isPlanningMode, setIsPlanningMode] = useState(false);
	const [totalBudget, setTotalBudget] = useState<string>("0");
	const [budgetStats, setBudgetStats] = useState({
		expenseItems: 0,
		planned: 0,
		actualCost: 0,
	});
	// Mock budget items - in real app, this would come from state management or API
	const [budgetItems] = useState<BudgetItem[]>([
		{
			id: "1",
			category: "Venue",
			title: "Venue for Wedding",
			description: "Reception and ceremony venues",
			estimatedCost: 7000,
			priority: "high",
		},
		{
			id: "2",
			category: "Catering",
			title: "Catering",
			description: "Food and beverages for 100 guests",
			estimatedCost: 5000,
			priority: "high",
		},
	]);

	// Handle budget commit
	const handleCommitBudget = () => {
		setIsBudgetCommitted(true);
		// Keep planning mode active after commit
		setIsPlanningMode(true);
		// You can update committedBudget and stats from actual budget planning data
		// For now, keeping existing state
	};

	const handleUncommitBudget = () => {
		setIsBudgetCommitted(false);
		toast.info("Budget unlocked. You can make changes before recommitting.");
	};

	// Handle tab change
	const handleTabChange = (value: string) => {
		const tabValue = value as BudgetTabValue;
		setActiveTab(tabValue);
	};

	// Mock data - will be replaced with actual data from props/API
	const summaryStats = {
		expenseItems: budgetStats.expenseItems,
		planned: budgetStats.planned,
		actualCost: budgetStats.actualCost,
		vendorsSelected: 1,
		pendingProposals: 2,
		budgetUsed: committedBudget
			? Math.round((budgetStats.planned / committedBudget) * 100)
			: 0,
	};

	return (
		<div className="flex flex-col gap-6">
			{/* Summary Stats Bar */}
			<BudgetSummaryStats stats={summaryStats} />

			{/* Navigation Tabs */}
			<Tabs
				defaultValue="budget"
				value={activeTab}
				onValueChange={handleTabChange}
				className="justify-start gap-6"
			>
				<BudgetTabNavigation 
					isBudgetCommitted={isBudgetCommitted} 
					value={activeTab}
					onValueChange={handleTabChange}
				/>

				{/* Budget Tab Content */}
				<TabsContent value="budget">
					<BudgetTabContent
						onCommit={handleCommitBudget}
						isPlanningMode={isPlanningMode}
						onPlanningModeChange={setIsPlanningMode}
						totalBudget={totalBudget}
						onTotalBudgetChange={setTotalBudget}
						isBudgetCommitted={isBudgetCommitted}
						onUncommit={handleUncommitBudget}
					/>
				</TabsContent>

				{/* Marketplace Tab Content */}
				<TabsContent value="marketplace">
					<MarketplaceTabContent budgetItems={budgetItems} />
				</TabsContent>

				{/* Proposals Tab Content */}
				<TabsContent value="proposals">
					<ProposalsTabContent />
				</TabsContent>

				{/* Vendor Management Tab Content */}
				<TabsContent value="vendor-mgmt" className="mt-8">
					<VendorMgmtTabContent />
				</TabsContent>

				{/* Messages Tab Content */}
				<TabsContent value="messages" className="mt-8">
					<MessagesTabContent />
				</TabsContent>

				{/* Billing Tab Content */}
				<TabsContent value="billing" className="mt-8">
					<BillingTabContent />
				</TabsContent>
			</Tabs>
		</div>
	);
}
