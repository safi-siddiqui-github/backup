"use client";

import React, { useEffect, useState } from "react";
import {
	HiOutlineCurrencyDollar,
	HiOutlineUsers,
	HiOutlineEye,
	HiOutlineEyeSlash,
	HiOutlinePencil,
	HiOutlineDocumentDuplicate,
	HiOutlineTrash,
} from "react-icons/hi2";
import { Users, Layout, Building2, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TicketItem, TicketType } from "../types";
import { getInitials, getAvatarColor } from "./helpers";

export default function TicketListItem({
	ticket,
	onToggleStatus,
	onDelete,
	onEdit,
	onCopy,
	expandedBuyers, // optional controlled
	onToggleBuyersExpand, // optional controlled handler
	onView,
}: {
	ticket: TicketItem;
	onToggleStatus: (id: string) => void;
	onDelete: (id: string) => void;
	onEdit: (id: string) => void;
	onCopy: (id: string) => void;
	expandedBuyers?: boolean;
	onToggleBuyersExpand?: (id: string) => void;
	onView?: (id: string) => void;
}) {
	const [localExpanded, setLocalExpanded] = useState<boolean>(!!expandedBuyers);

	useEffect(() => {
		if (typeof expandedBuyers === "boolean") setLocalExpanded(expandedBuyers);
	}, [expandedBuyers]);
	const {
		ticketType,
		category,
		name,
		description,
		price,
		revenue,
		sold,
		left,
		capacity,
		status,
		color,
		isSoldOut,
		recentBuyers,
		seatingConfig,
		numberOfBooths,
		boothCapacity,
		assignableTickets,
		boothPrice,
		numberOfVendorBooths,
		vendorBoothCapacity,
		vendorAssignableTickets,
		pricePerCapacity,
	} = ticket;

	const ticketTypeInfo: Record<TicketType, { label: string; icon: any }> = {
		"access-level": { label: "Access Level", icon: Users },
		"seated": { label: "Seated", icon: Layout },
		"booth-table": { label: "Booth/Table", icon: Building2 },
		"vendor-booth": { label: "Vendor Booth", icon: Store },
	};

	const percentage = (sold / capacity) * 100;

	const colorClasses = (
		color:
			| "blue"
			| "orange"
			| "green"
			| "purple"
			| "red"
			| "pink"
			| "indigo"
			| "teal",
	) => {
		return (
			{
				blue: { bar: "bg-blue-500" },
				orange: { bar: "bg-orange-500" },
				green: { bar: "bg-green-500" },
				purple: { bar: "bg-purple-500" },
				red: { bar: "bg-red-500" },
				pink: { bar: "bg-pink-500" },
				indigo: { bar: "bg-indigo-500" },
				teal: { bar: "bg-teal-500" },
			} as const
		)[color];
	};
	const barColor = colorClasses(color).bar;

	return (
		<div
			onClick={() => onView && onView(ticket.id)}
			className="!bg-white dark:!bg-[#020617] backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-slate-600 overflow-hidden cursor-pointer [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]"
		>
			<div className="flex">
				<div className={`w-1.5 ${barColor}`}></div>
				<div className="flex-1">
					<div className="p-6">
						<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
							<div className="flex-1 min-w-0">
								<div className="flex flex-wrap items-center gap-2 mb-1">
									<h3 className="text-xl font-bold text-gray-900 dark:text-slate-200 truncate">
										{name}
									</h3>
									<span className="text-xs font-semibold !bg-white dark:!bg-slate-700/50 text-gray-600 dark:text-slate-300 px-3 py-1 rounded-full capitalize border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
										{category}
									</span>
									{ticketType && (() => {
										const info = ticketTypeInfo[ticketType];
										if (!info) return null;
										const Icon = info.icon;
										return (
											<Badge variant="outline" className="flex items-center gap-1.5 text-xs border-gray-300 dark:border-gray-600">
												<Icon className="h-3 w-3" />
												{info.label}
											</Badge>
										);
									})()}
									{status === "Inactive" && (
										<span className="text-xs font-semibold !bg-white dark:!bg-slate-700/50 text-gray-600 dark:text-slate-300 px-3 py-1 rounded-full border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
											Inactive
										</span>
									)}
									{isSoldOut && (
										<span className="text-xs font-semibold !bg-white dark:!bg-slate-700/50 text-red-600 dark:text-red-400 px-3 py-1 rounded-full border border-red-200 dark:border-red-800 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
											Sold Out
										</span>
									)}
								</div>
								<p className="text-sm text-gray-600 dark:text-slate-400 mb-1">
									{description}
								</p>
								{ticketType && (
									<div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-slate-500">
										{ticketType === "access-level" && (
											<span>Price: ${price || 0} per ticket</span>
										)}
										{ticketType === "seated" && seatingConfig?.sections && (
											<span>
												{seatingConfig.sections.length} section(s) • {" "}
												{seatingConfig.sections.reduce((sum, s) => sum + (s.totalSeats || 0), 0)} total seats
											</span>
										)}
										{ticketType === "booth-table" && (
											<span>
												{numberOfBooths || 1} booth(s) • {boothCapacity || 0} seats/booth • ${boothPrice || 0}/booth
											</span>
										)}
										{ticketType === "vendor-booth" && (
											<span>
												{numberOfVendorBooths || 1} booth(s) • {vendorBoothCapacity || 0} people/booth • ${(vendorBoothCapacity || 0) * (pricePerCapacity || 0)}/booth
											</span>
										)}
									</div>
								)}
							</div>

							<div className="flex flex-col sm:flex-row sm:items-center gap-6 shrink-0">
								<div className="flex items-center gap-4">
									<div>
										<span className="text-xs text-gray-600 dark:text-slate-400">
											Price
										</span>
										<p className="flex items-center gap-1 text-lg font-semibold text-gray-900 dark:text-slate-200">
											<HiOutlineCurrencyDollar className="h-4 w-4 text-green-500 dark:text-green-400" />
											{price === 0 && (ticketType === "seated" || ticketType === "booth-table" || ticketType === "vendor-booth") ? (
												<span className="text-sm text-gray-500 dark:text-slate-400">Varies</span>
											) : (
												`$${price}`
											)}
										</p>
										{ticketType === "booth-table" && boothPrice && (
											<p className="text-[10px] text-gray-500 dark:text-slate-500">per booth</p>
										)}
										{ticketType === "vendor-booth" && pricePerCapacity && (
											<p className="text-[10px] text-gray-500 dark:text-slate-500">per person</p>
										)}
									</div>
									<div className="border-l border-gray-200 dark:border-slate-600 pl-4">
										<span className="text-xs text-gray-600 dark:text-slate-400">
											Revenue
										</span>
										<p className="text-lg font-semibold text-gray-900 dark:text-slate-200">
											${revenue}
										</p>
									</div>
									<div className="border-l border-gray-200 dark:border-slate-600 pl-4 w-32">
										<div className="flex justify-between items-center text-xs text-gray-600 dark:text-slate-400 mb-1">
											<span className="flex items-center gap-1">
												<HiOutlineUsers className="h-3 w-3" />
												{sold} sold
											</span>
											<span>{left} left</span>
										</div>
										<div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5">
											<div
												className="bg-gradient-to-r from-indigo-600 to-purple-600 h-1.5 rounded-full"
												style={{ width: `${percentage}%` }}
											/>
										</div>
										<p className="text-xs text-gray-600 dark:text-slate-400 mt-1">
											{percentage.toFixed(1)}% of {capacity}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-2 text-gray-600 dark:text-slate-400">
									<button
										onClick={() => onToggleStatus(ticket.id)}
										className={`flex items-center gap-1.5 text-sm font-medium transition-all hover:scale-105 cursor-pointer ${status === "Active" ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-slate-400"}`}
										title={`Toggle status (${status})`}
									>
										{status === "Active" ? (
											<HiOutlineEye className="h-5 w-5" />
										) : (
											<HiOutlineEyeSlash className="h-5 w-5" />
										)}
									</button>
									<button
										onClick={(e) => {
											e.stopPropagation();
											onEdit(ticket.id);
										}}
										className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700/50 cursor-pointer"
									>
										<HiOutlinePencil className="h-5 w-5" />
									</button>
									<button
										onClick={(e) => {
											e.stopPropagation();
											onCopy(ticket.id);
										}}
										className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700/50 cursor-pointer"
									>
										<HiOutlineDocumentDuplicate className="h-5 w-5" />
									</button>
									<button
										onClick={(e) => {
											e.stopPropagation();
											onDelete(ticket.id);
										}}
										className="p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 cursor-pointer"
									>
										<HiOutlineTrash className="h-5 w-5" />
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="border-t border-gray-200 dark:border-slate-600 px-6 py-4">
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<p className="text-xs font-medium text-gray-600 dark:text-slate-400">
										Recent Buyers
									</p>
									<div className="flex -space-x-2">
										{recentBuyers.slice(0, 3).map((buyer, index) => (
											<div
												key={index}
												className={`shrink-0 w-8 h-8 rounded-full ${getAvatarColor(buyer.name)} flex items-center justify-center text-xs font-semibold text-white border-2 border-white dark:border-slate-800`}
												title={buyer.name}
											>
												{getInitials(buyer.name)}
											</div>
										))}
									</div>
								</div>
								<button
									onClick={(e) => {
										e.stopPropagation();
										if (onToggleBuyersExpand) {
											onToggleBuyersExpand(ticket.id);
										} else {
											setLocalExpanded((v) => !v);
										}
									}}
									className="flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
								>
									{localExpanded ? "Hide" : "View All"} ({recentBuyers.length})
								</button>
							</div>
							{localExpanded && (
								<div className="space-y-2 pt-2 border-t border-gray-200 dark:border-slate-600">
									{recentBuyers.map((buyer, index) => (
										<div
											key={index}
											className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
										>
											<div
												className={`shrink-0 w-10 h-10 rounded-full ${getAvatarColor(buyer.name)} flex items-center justify-center text-sm font-semibold text-white`}
											>
												{getInitials(buyer.name)}
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-gray-900 dark:text-slate-200 truncate">
													{buyer.name}
												</p>
												<p className="text-xs text-gray-600 dark:text-slate-400">
													{buyer.purchaseDate}
												</p>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
