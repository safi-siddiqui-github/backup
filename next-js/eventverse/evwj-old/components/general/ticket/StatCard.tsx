import {
	HiUser,
	HiGift,
	HiCurrencyDollar,
	HiCheckCircle,
} from "react-icons/hi2";
import type { StatCardProps, StatsGridProps } from "./types";

export default function StatCard({
	title,
	value,
	icon,
	gradient = false,
}: StatCardProps) {
	return (
		<div
			className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg ${
				gradient
					? "bg-gradient-to-r from-indigo-600 to-purple-600 border-transparent text-white"
					: "!bg-white dark:!bg-[#020617] backdrop-blur-sm border-gray-200 dark:border-slate-600 [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]"
			}`}
		>
			<div className="relative z-10 p-6 flex justify-between items-start">
				<div>
					<p
						className={`text-sm font-medium mb-1 ${
							gradient ? "text-white/90" : "text-gray-600 dark:text-slate-400"
						}`}
					>
						{title}
					</p>
					<p
						className={`text-3xl font-bold ${
							gradient ? "text-white" : "text-gray-900 dark:text-slate-200"
						}`}
					>
						{value}
					</p>
				</div>
				<div
					className={`p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 ${
						gradient
							? "bg-white/20 backdrop-blur-sm"
							: "!bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
					}`}
				>
					{icon}
				</div>
			</div>
		</div>
	);
}

export function StatsGrid({ stats }: StatsGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<StatCard
				title="Total Sales"
				value={stats.totalSales}
				icon={<HiUser className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
			/>
			<StatCard
				title="Reserved"
				value={stats.reserved}
				icon={<HiGift className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
			/>
			<StatCard
				title="Revenue"
				value={`$${stats.revenue}`}
				icon={
					<HiCurrencyDollar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
				}
			/>
			<StatCard
				title="Check-in Rate"
				value={`${stats.checkInRate}%`}
				icon={<HiCheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
			/>
		</div>
	);
}
