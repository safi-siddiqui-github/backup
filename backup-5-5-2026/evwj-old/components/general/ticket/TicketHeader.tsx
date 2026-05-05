import { HiArrowLeft, HiSparkles } from "react-icons/hi2";
import type { TicketHeaderProps } from "./types";

export default function TicketHeader({ stats, onBack }: TicketHeaderProps) {
	return (
		<header className="mb-8">
			<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
				<div className="flex items-start gap-4">
					{onBack && (
						<button
							className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-all duration-300 hover:shadow-lg group cursor-pointer !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							onClick={onBack}
							aria-label="Go back"
							title="Go back"
						>
							<HiArrowLeft className="h-6 w-6 text-gray-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
						</button>
					)}
					<div>
						<div className="flex items-center gap-3 mb-2">
							<h1 className="text-3xl font-bold text-gray-900 dark:text-slate-200">
								Ticketing Management
							</h1>
							<span className="flex items-center gap-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
								<HiSparkles className="h-3 w-3" />
								Live
							</span>
						</div>
						<p className="text-sm text-gray-600 dark:text-slate-400">
							Manage tickets, reservations & sales in real-time
						</p>
					</div>
				</div>

				{/* Quick Stats Badges */}
				<div className="flex flex-wrap items-center gap-2">
					<span className="!bg-white dark:!bg-slate-700/50 text-green-700 dark:text-green-300 text-sm font-semibold px-4 py-2 rounded-full shadow-sm border border-green-200 dark:border-green-800 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
						{stats.totalSales} Sold
					</span>
					<span className="!bg-white dark:!bg-slate-700/50 text-blue-700 dark:text-blue-300 text-sm font-semibold px-4 py-2 rounded-full shadow-sm border border-blue-200 dark:border-blue-800 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
						{stats.reserved} Reserved
					</span>
					<span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
						${stats.revenue.toFixed(2)} Revenue
					</span>
				</div>
			</div>
		</header>
	);
}
