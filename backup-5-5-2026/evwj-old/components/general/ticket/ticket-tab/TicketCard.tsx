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
	HiOutlineChevronDown,
} from "react-icons/hi2";
import { Users, Layout, Building2, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TicketItem, TicketType } from "../types";
import { getInitials, getAvatarColor } from "./helpers";

export default function TicketCard({
	ticket,
	onToggleStatus,
	onDelete,
	onEdit,
	onCopy,
	expandedBuyers,
	onToggleBuyersExpand,
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

	const getTicketTypeDisplay = () => {
		if (!ticketType) return null;
		const info = ticketTypeInfo[ticketType];
		if (!info) return null;
		
		if (ticketType === "access-level") {
			return { label: info.label, detail: `$${price || 0} per ticket` };
		} else if (ticketType === "seated") {
			const sectionsCount = seatingConfig?.sections?.length || 0;
			const totalSeats = seatingConfig?.sections?.reduce((sum, s) => sum + (s.totalSeats || 0), 0) || 0;
			return { label: info.label, detail: `${sectionsCount} section(s) • ${totalSeats} seats` };
		} else if (ticketType === "booth-table") {
			const booths = numberOfBooths || 1;
			const seatsPerBooth = boothCapacity || 0;
			return { label: info.label, detail: `${booths} booth(s) • ${seatsPerBooth} seats/booth • $${boothPrice || 0}/booth` };
		} else if (ticketType === "vendor-booth") {
			const booths = numberOfVendorBooths || 1;
			const peoplePerBooth = vendorBoothCapacity || 0;
			const totalPrice = peoplePerBooth * (pricePerCapacity || 0);
			return { label: info.label, detail: `${booths} booth(s) • ${peoplePerBooth} people/booth • $${totalPrice}/booth` };
		}
		return { label: info.label, detail: "" };
	};

	const percentage = (sold / capacity) * 100;

	const colorClasses = (
		{
			blue: { dot: "bg-blue-500" },
			orange: { dot: "bg-orange-500" },
			green: { dot: "bg-green-500" },
			purple: { dot: "bg-purple-500" },
			red: { dot: "bg-red-500" },
			pink: { dot: "bg-pink-500" },
			indigo: { dot: "bg-indigo-500" },
			teal: { dot: "bg-teal-500" },
		} as const
	)[color];

	return (
		<div
			onClick={() => onView && onView(ticket.id)}
			className="!bg-white dark:!bg-[#020617] backdrop-blur-sm rounded-lg shadow-md border border-gray-200 dark:border-slate-600 overflow-hidden flex flex-col cursor-pointer [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-lg"
		>
			<div className="p-3">
				<div className="flex justify-between items-start mb-1.5">
					<div className="flex flex-col gap-1.5 flex-1 min-w-0">
						<div className="flex items-center gap-1.5 flex-wrap">
							<span className={`w-2 h-2 ${colorClasses.dot} rounded-full shrink-0`} />
							<span className="text-[10px] font-medium text-gray-600 dark:text-slate-400">
								{category}
							</span>
							{ticketType && (() => {
								const typeDisplay = getTicketTypeDisplay();
								if (!typeDisplay || !ticketType) return null;
								const info = ticketTypeInfo[ticketType];
								if (!info) return null;
								const Icon = info.icon;
								return (
									<Badge variant="outline" className="text-[9px] px-1.5 py-0 h-auto border-gray-300 dark:border-gray-600">
										<Icon className="h-2.5 w-2.5 mr-1" />
										{typeDisplay.label}
									</Badge>
								);
							})()}
						</div>
						{ticketType && (() => {
							const typeDisplay = getTicketTypeDisplay();
							if (!typeDisplay?.detail) return null;
							return (
								<p className="text-[9px] text-gray-500 dark:text-slate-500 ml-3.5">
									{typeDisplay.detail}
								</p>
							);
						})()}
					</div>
					<div className="flex items-center gap-1 shrink-0">
						{status === "Inactive" && (
							<span className="text-[10px] font-semibold !bg-white dark:!bg-slate-700/50 text-gray-600 dark:text-slate-300 px-1.5 py-0.5 rounded-full border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
								Inactive
							</span>
						)}
						{isSoldOut && (
							<span className="text-[10px] font-semibold !bg-white dark:!bg-slate-700/50 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded-full border border-red-200 dark:border-red-800 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
								Sold Out
							</span>
						)}
					</div>
				</div>
				<h3 className="text-base font-bold text-gray-900 dark:text-slate-200 leading-tight">
					{name}
				</h3>
				<p className="text-[11px] text-gray-600 dark:text-slate-400 mt-0.5 line-clamp-2">
					{description}
				</p>
			</div>

			<div className="flex justify-between items-center px-3 mt-1">
				<div className="flex items-center gap-1">
					<HiOutlineCurrencyDollar className="h-3.5 w-3.5 text-green-500 dark:text-green-400" />
					<span className="text-xl font-bold text-gray-900 dark:text-slate-200">
						{price === 0 && (ticketType === "seated" || ticketType === "booth-table" || ticketType === "vendor-booth") ? (
							<span className="text-sm text-gray-500 dark:text-slate-400">Varies</span>
						) : (
							`$${price}`
						)}
					</span>
					{ticketType === "booth-table" && boothPrice && (
						<span className="text-[10px] text-gray-500 dark:text-slate-500 ml-1">
							per booth
						</span>
					)}
					{ticketType === "vendor-booth" && pricePerCapacity && (
						<span className="text-[10px] text-gray-500 dark:text-slate-500 ml-1">
							per person
						</span>
					)}
				</div>
				<div className="text-right">
					<span className="text-[10px] text-gray-600 dark:text-slate-400">
						Revenue
					</span>
					<p className="text-sm font-semibold text-gray-900 dark:text-slate-200">
						${revenue}
					</p>
				</div>
			</div>

			<div className="flex items-center justify-between px-3 mt-1.5 text-[11px] text-gray-600 dark:text-slate-400">
				<div className="flex items-center gap-1">
					<HiOutlineUsers className="h-3 w-3" />
					{sold} sold
				</div>
				<span>{left} left</span>
			</div>

			<div className="px-3 mt-1">
				<div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-0.5">
					<div
						className="bg-gradient-to-r from-indigo-600 to-purple-600 h-0.5 rounded-full"
						style={{ width: `${percentage}%` }}
					/>
				</div>
				<p className="text-[10px] text-gray-600 dark:text-slate-400 mt-0.5">
					{percentage.toFixed(1)}% of {capacity} capacity
				</p>
			</div>

			<div className="grow" />

			<div className="border-t border-gray-200 dark:border-slate-600 mt-1.5 p-3">
				<div className="flex justify-between items-center">
					<button
						onClick={(e) => {
							e.stopPropagation();
							onToggleStatus(ticket.id);
						}}
						className={`flex items-center gap-1 text-[10px] font-medium transition-all hover:scale-105 cursor-pointer p-0.5 rounded border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-slate-700/50 ${status === "Active" ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-slate-400"} [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]`}
						title={`Toggle status (${status})`}
					>
						{status === "Active" ? (
							<HiOutlineEye className="h-3 w-3" />
						) : (
							<HiOutlineEyeSlash className="h-3 w-3" />
						)}
						<span>{status}</span>
					</button>
					<div className="flex items-center gap-0.5 text-gray-600 dark:text-slate-400">
						<button
							onClick={(e) => {
								e.stopPropagation();
								onEdit(ticket.id);
							}}
							className="p-0.5 rounded hover:bg-gray-100 dark:hover:bg-slate-700/50 cursor-pointer"
						>
							<HiOutlinePencil className="h-3.5 w-3.5" />
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								onCopy(ticket.id);
							}}
							className="p-0.5 rounded hover:bg-gray-100 dark:hover:bg-slate-700/50 cursor-pointer"
						>
							<HiOutlineDocumentDuplicate className="h-3.5 w-3.5" />
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								onDelete(ticket.id);
							}}
							className="p-0.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30 cursor-pointer"
						>
							<HiOutlineTrash className="h-3.5 w-3.5" />
						</button>
					</div>
				</div>
			</div>

			<div className="border-t border-gray-200 dark:border-slate-600 px-3 py-2">
				<p className="text-[10px] font-medium text-gray-600 dark:text-slate-400 mb-1">
					Recent Buyers
				</p>
				<div className="space-y-1.5">
					<div className="flex items-center justify-between">
						<div className="flex -space-x-1">
							{recentBuyers.slice(0, 3).map((buyer, index) => (
								<div
									key={index}
									className={`shrink-0 w-6 h-6 rounded-full ${getAvatarColor(buyer.name)} flex items-center justify-center text-[9px] font-semibold text-white border-2 border-white dark:border-slate-800`}
									title={buyer.name}
								>
									{getInitials(buyer.name)}
								</div>
							))}
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
							className="flex items-center gap-0.5 text-[10px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
						>
							{localExpanded ? "Hide" : "View All"} ({recentBuyers.length}){" "}
							<HiOutlineChevronDown
								className={`h-3 w-3 transition-transform ${localExpanded ? "rotate-180" : ""}`}
							/>
						</button>
					</div>
					{localExpanded && (
						<div className="space-y-1 pt-1 border-t border-gray-200 dark:border-slate-600">
							{recentBuyers.map((buyer, index) => (
								<div
									key={index}
									className="flex items-center gap-1.5 p-1 rounded hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
								>
									<div
										className={`shrink-0 w-6 h-6 rounded-full ${getAvatarColor(buyer.name)} flex items-center justify-center text-[10px] font-semibold text-white`}
									>
										{getInitials(buyer.name)}
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-[11px] font-medium text-gray-900 dark:text-slate-200 truncate">
											{buyer.name}
										</p>
										<p className="text-[9px] text-gray-600 dark:text-slate-400">
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
	);
}
