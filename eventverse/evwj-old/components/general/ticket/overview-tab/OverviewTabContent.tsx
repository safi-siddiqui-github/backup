"use client";

import React, { useState } from "react";
import { HiPlus, HiCheckCircle, HiClock, HiUser } from "react-icons/hi2";
import { StatsGrid } from "../StatCard";
import TicketTypeCard from "../TicketTypeCard";
import UsersModal from "./UsersModal";
import type { OverviewTabContentProps } from "../types";

export default function OverviewTabContent({
	stats,
	ticketTypes,
	recentActivity = [],
	onReserve,
	onAddTicketType,
	onViewAllActivity,
}: OverviewTabContentProps) {
	const [showUsers, setShowUsers] = useState(false);
	return (
		<div className="space-y-8">
			{/* Stats Grid */}
			<StatsGrid stats={stats} />

			{/* Ticket Types Performance */}
			<div className="from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617] rounded-xl border">
				{/* Gradient Overlay */}
				<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50 pointer-events-none"></div>
				
				{/* Content */}
				<div className="relative z-10 p-4 sm:p-6">
					{/* Header */}
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
						<div>
							<h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-slate-200">
								Ticket Types Performance
							</h2>
							<p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 mt-1">
								Monitor sales and availability
							</p>
						</div>
						<button
							onClick={onAddTicketType}
							className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
						>
							<HiPlus className="h-4 w-4" />
							Add Ticket Type
						</button>
					</div>

					{/* Ticket List */}
					<div className="space-y-3">
						{ticketTypes.map((ticket) => (
							<TicketTypeCard
								key={ticket.id}
								ticket={ticket}
								onReserve={onReserve}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Recent Activity Section */}
			{recentActivity.length > 0 && (
				<div className="from-primary/5 via-background to-secondary/5 border-border/30 relative overflow-hidden bg-linear-to-br shadow-xl backdrop-blur-xl dark:bg-[#020617] dark:from-[#020617] dark:via-[#020617] dark:to-[#020617] rounded-xl border">
					{/* Gradient Overlay */}
					<div className="from-primary/10 to-secondary/10 absolute inset-0 bg-linear-to-br via-transparent opacity-50 pointer-events-none"></div>
					
					{/* Content */}
					<div className="relative z-10 p-4 sm:p-6">
						{/* Header */}
						<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
							<div>
								<h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-slate-200">
									Recent Activity
								</h2>
								<p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 mt-1">
									Latest ticket purchases and transactions
								</p>
							</div>
							{onViewAllActivity && (
								<button
									onClick={() => {
										setShowUsers(true);
										onViewAllActivity();
									}}
									className="text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline transition-colors cursor-pointer"
								>
									View All
								</button>
							)}
						</div>

						{/* Activity List */}
						<div className="space-y-2 sm:space-y-3">
							{recentActivity.map((activity) => (
								<div
									key={activity.id}
									className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-slate-600 bg-white/50 dark:bg-slate-800/30"
								>
									{/* Avatar */}
									<div className="shrink-0 p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full group-hover:scale-105 transition-transform duration-200">
										<HiUser className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
									</div>

									{/* Name & Description */}
									<div className="flex-1 min-w-0">
										<p className="font-semibold text-sm text-gray-900 dark:text-slate-200 mb-0.5">
											{activity.name}
										</p>
										<p className="text-xs text-gray-600 dark:text-slate-400 line-clamp-1">
											{activity.description}
										</p>
									</div>

									{/* Amount & Status */}
									<div className="flex items-center gap-3 shrink-0">
										<div className="text-right">
											<p className="font-bold text-sm sm:text-base text-gray-900 dark:text-slate-200">
												${activity.amount.toFixed(2)}
											</p>
											<span
												className={`text-[10px] sm:text-xs font-medium ${
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
											<HiCheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 dark:text-green-400 shrink-0" />
										) : (
											<HiClock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-slate-500 shrink-0" />
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
			{showUsers && (
				<UsersModal
					users={recentActivity}
					onClose={() => setShowUsers(false)}
				/>
			)}
		</div>
	);
}
