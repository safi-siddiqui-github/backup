"use client";

import { Card } from "@/components/ui/card";

interface BudgetSummaryStatsProps {
	stats: {
		expenseItems: number;
		planned: number;
		actualCost: number;
		vendorsSelected: number;
		pendingProposals: number;
		budgetUsed: number;
	};
}

export default function BudgetSummaryStats({ stats }: BudgetSummaryStatsProps) {
	return (
		<Card className="rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] mb-6 p-6">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
				{/* Expense Items */}
				<div className="flex flex-col items-center text-center">
					<span className="text-3xl font-bold text-primary">
						{stats.expenseItems}
					</span>
					<span className="text-sm text-muted-foreground mt-1">
						Expense Items
					</span>
				</div>

				{/* Planned */}
				<div className="flex flex-col items-center text-center">
					<span className="text-3xl font-bold text-blue-600">
						${stats.planned}
					</span>
					<span className="text-sm text-muted-foreground mt-1">Planned</span>
				</div>

				{/* Actual Cost */}
				<div className="flex flex-col items-center text-center">
					<span className="text-3xl font-bold text-orange-600">
						${stats.actualCost}
					</span>
					<span className="text-sm text-muted-foreground mt-1">
						Actual Cost
					</span>
				</div>

				{/* Vendors Selected */}
				<div className="flex flex-col items-center text-center">
					<span className="text-3xl font-bold text-green-600">
						{stats.vendorsSelected}
					</span>
					<span className="text-sm text-muted-foreground mt-1">
						Vendors Selected
					</span>
				</div>

				{/* Pending Proposals */}
				<div className="flex flex-col items-center text-center">
					<span className="text-3xl font-bold text-purple-600">
						{stats.pendingProposals}
					</span>
					<span className="text-sm text-muted-foreground mt-1">
						Pending Proposals
					</span>
				</div>

				{/* Budget Used */}
				<div className="flex flex-col items-center text-center">
					<span className="text-3xl font-bold text-red-600">
						{stats.budgetUsed}%
					</span>
					<span className="text-sm text-muted-foreground mt-1">
						Budget Used
					</span>
				</div>
			</div>
		</Card>
	);
}
