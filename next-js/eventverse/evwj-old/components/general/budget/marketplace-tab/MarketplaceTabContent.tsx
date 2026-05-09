"use client";

import MarketplaceListView from "./MarketplaceListView";
import { BudgetItem } from "../budget-tab/BudgetPlanningView";

interface MarketplaceTabContentProps {
	budgetItems?: BudgetItem[];
}

export default function MarketplaceTabContent({
	budgetItems = [],
}: MarketplaceTabContentProps) {
	return (
		<div className="rounded-lg border !bg-white dark:!bg-[#020617] backdrop-blur-sm p-6 [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
			<div className="mb-6">
				<h2 className="text-2xl font-bold mb-2">Vendor Marketplace</h2>
				<p className="text-muted-foreground">
					Discover and connect with top-rated vendors for your event. Browse
					verified professionals, compare services, and find the perfect match
					for your needs.
				</p>
			</div>
			<MarketplaceListView budgetItems={budgetItems} />
		</div>
	);
}
