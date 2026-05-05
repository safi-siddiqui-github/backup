import { HiSparkles } from "react-icons/hi2";
import type { TicketTypeProps } from "./types";

const colorClasses = {
	blue: {
		dot: "bg-blue-500 dark:bg-blue-400",
		badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
		button:
			"bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 text-white",
	},
	orange: {
		dot: "bg-orange-500 dark:bg-orange-400",
		badge:
			"bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
		button:
			"bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:from-orange-600 dark:to-orange-700 text-white",
	},
	purple: {
		dot: "bg-purple-500 dark:bg-purple-400",
		badge:
			"bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
		button:
			"bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 dark:from-purple-600 dark:to-purple-700 text-white",
	},
	green: {
		dot: "bg-green-500 dark:bg-green-400",
		badge:
			"bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
		button:
			"bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 text-white",
	},
	red: {
		dot: "bg-red-500 dark:bg-red-400",
		badge: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
		button:
			"bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 dark:from-red-600 dark:to-red-700 text-white",
	},
	pink: {
		dot: "bg-pink-500 dark:bg-pink-400",
		badge: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
		button:
			"bg-linear-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 dark:from-pink-600 dark:to-pink-700 text-white",
	},
	indigo: {
		dot: "bg-indigo-500 dark:bg-indigo-400",
		badge:
			"bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
		button:
			"bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 dark:from-indigo-600 dark:to-indigo-700 text-white",
	},
	teal: {
		dot: "bg-teal-500 dark:bg-teal-400",
		badge: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300",
		button:
			"bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 dark:from-teal-600 dark:to-teal-700 text-white",
	},
};

export default function TicketTypeCard({ ticket, onReserve }: TicketTypeProps) {
	const colors = colorClasses[ticket.color];
	const soldPercentage = Math.round((ticket.sold / ticket.total) * 100);
	const isLowStock = ticket.available < 10;

	return (
		<div className="group relative overflow-hidden border border-gray-200 dark:border-slate-600 rounded-lg p-3 sm:p-4 bg-white dark:bg-slate-800/50 hover:shadow-md transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-600">
			<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 sm:gap-4">
				{/* Left: Ticket Info */}
				<div className="flex items-start gap-3 flex-1 min-w-0">
					<div className="relative shrink-0 mt-0.5">
						<span
							className={`h-3 w-3 ${colors.dot} rounded-full shrink-0 inline-block animate-pulse`}
						></span>
						<span
							className={`absolute inset-0 h-3 w-3 ${colors.dot} rounded-full animate-ping opacity-75`}
						></span>
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1 flex-wrap">
							<p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-slate-200">
								{ticket.name}
							</p>
							{isLowStock && (
								<span className="flex items-center gap-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded-full border border-red-200 dark:border-red-800">
									<HiSparkles className="h-2.5 w-2.5" />
									Low Stock
								</span>
							)}
						</div>
						<div className="flex items-center gap-2">
							<p className="text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400">
								${ticket.price.toFixed(2)}
							</p>
							<span className="text-xs text-gray-600 dark:text-slate-400">
								per ticket
							</span>
						</div>
					</div>
				</div>

				{/* Right: Stats and Actions */}
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
					<div className="flex-1 w-full sm:w-auto min-w-[180px]">
						<div className="flex items-center justify-between mb-1.5">
							<span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-slate-400">
								<span className="font-semibold text-gray-900 dark:text-slate-200">
									{ticket.sold}
								</span>{" "}
								/ {ticket.total}
							</span>
							<span className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400">
								{soldPercentage}%
							</span>
						</div>
						<div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
							<div
								className={`h-full rounded-full transition-all duration-500 ${
									soldPercentage > 80
										? "bg-gradient-to-r from-orange-500 to-red-500"
										: "bg-gradient-to-r from-indigo-600 to-purple-600"
								}`}
								style={{ width: `${soldPercentage}%` }}
							/>
						</div>
					</div>

					<span
						className={`${colors.badge} text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm border border-gray-200 dark:border-slate-600`}
					>
						{ticket.available} available
					</span>

					<button
						onClick={() => onReserve(ticket.id)}
						disabled={ticket.available === 0}
						className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg cursor-pointer"
					>
						{ticket.available === 0 ? "Sold Out" : "Reserve"}
					</button>
				</div>
			</div>
		</div>
	);
}
