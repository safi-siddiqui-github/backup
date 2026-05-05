import { HiPlus, HiCheckCircle, HiClock, HiUser } from "react-icons/hi2";
import { StatsGrid } from "./StatCard";
import TicketTypeCard from "./TicketTypeCard";
import type { OverviewTabContentProps } from "./types";

export default function OverviewTabContent({
	stats,
	ticketTypes,
	recentActivity = [],
	onReserve,
	onAddTicketType,
	onViewAllActivity,
}: OverviewTabContentProps) {
	return (
		<div className="space-y-8">
			{/* Stats Grid */}
			<StatsGrid stats={stats} />

			{/* Ticket Types Performance */}
			<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
					<div>
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
							Ticket Types Performance
						</h2>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Monitor sales and availability across all ticket types
						</p>
					</div>
					<button
						onClick={onAddTicketType}
						className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
					>
						<HiPlus className="h-5 w-5" />
						Add Ticket Type
					</button>
				</div>

				{/* Ticket List */}
				<div className="space-y-4">
					{ticketTypes.map((ticket) => (
						<TicketTypeCard
							key={ticket.id}
							ticket={ticket}
							onReserve={onReserve}
						/>
					))}
				</div>
			</div>

			{/* Recent Activity Section */}
			{recentActivity.length > 0 && (
				<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
								Recent Activity
							</h2>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Latest ticket purchases and transactions
							</p>
						</div>
						{onViewAllActivity && (
							<button
								onClick={onViewAllActivity}
								className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors cursor-pointer"
							>
								View All
							</button>
						)}
					</div>

					<div className="space-y-3">
						{recentActivity.map((activity) => (
							<div
								key={activity.id}
								className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
							>
								{/* Avatar */}
								<div className="shrink-0 p-3 bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full group-hover:scale-110 transition-transform duration-300">
									<HiUser className="h-6 w-6 text-blue-600 dark:text-blue-400" />
								</div>

								{/* Name & Description */}
								<div className="flex-1 min-w-0">
									<p className="font-semibold text-gray-900 dark:text-white mb-1">
										{activity.name}
									</p>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										{activity.description}
									</p>
								</div>

								{/* Amount & Status */}
								<div className="flex items-center gap-4 ml-auto">
									<div className="text-right">
										<p className="font-bold text-lg text-gray-900 dark:text-white">
											${activity.amount.toFixed(2)}
										</p>
										<span
											className={`text-xs font-medium ${
												activity.status === "paid"
													? "text-green-600 dark:text-green-400"
													: activity.status === "pending"
														? "text-yellow-600 dark:text-yellow-400"
														: "text-red-600 dark:text-red-400"
											}`}
										>
											{activity.status}
										</span>
									</div>
									{activity.status === "paid" ? (
										<HiCheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 shrink-0" />
									) : (
										<HiClock className="h-6 w-6 text-gray-400 dark:text-gray-500 shrink-0" />
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
