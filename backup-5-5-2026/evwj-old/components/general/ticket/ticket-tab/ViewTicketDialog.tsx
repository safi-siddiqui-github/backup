"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
	HiOutlineCurrencyDollar,
	HiOutlineUsers,
	HiOutlineTicket,
	HiOutlineChartBar,
	HiOutlineChevronDown,
} from "react-icons/hi2";
import { Users, Layout, Building2, Store } from "lucide-react";
import { getInitials, getAvatarColor } from "./helpers";
import type { ViewTicketDialogProps, TicketItem, TicketType } from "../types";

export default function ViewTicketDialog({
	open,
	onOpenChange,
	ticket,
	customersOpen,
	setCustomersOpen,
}: ViewTicketDialogProps) {
	const avgPurchase =
		ticket && ticket.sold > 0 ? ticket.revenue / ticket.sold : 0;
	const colorAccent = (color?: TicketItem["color"]) => {
		return (
			{
				blue: { dot: "bg-blue-500", subtle: "bg-blue-50 dark:bg-blue-900/20" },
				orange: {
					dot: "bg-orange-500",
					subtle: "bg-orange-50 dark:bg-orange-900/20",
				},
				green: {
					dot: "bg-green-500",
					subtle: "bg-green-50 dark:bg-green-900/20",
				},
				purple: {
					dot: "bg-purple-500",
					subtle: "bg-purple-50 dark:bg-purple-900/20",
				},
				red: { dot: "bg-red-500", subtle: "bg-red-50 dark:bg-red-900/20" },
				pink: { dot: "bg-pink-500", subtle: "bg-pink-50 dark:bg-pink-900/20" },
				indigo: {
					dot: "bg-indigo-500",
					subtle: "bg-indigo-50 dark:bg-indigo-900/20",
				},
				teal: { dot: "bg-teal-500", subtle: "bg-teal-50 dark:bg-teal-900/20" },
			} as const
		)[color ?? "blue"];
	};

	const ticketTypeInfo: Record<TicketType, { label: string; icon: any; description: string }> = {
		"access-level": { 
			label: "Access Level Ticket", 
			icon: Users,
			description: "Open seating. Guests purchase access to an area/level and can sit anywhere within that access level."
		},
		"seated": { 
			label: "Seated Ticket", 
			icon: Layout,
			description: "Guests select specific seats. Price varies by section, row, or individual seat selection."
		},
		"booth-table": { 
			label: "Booth/Table Ticket", 
			icon: Building2,
			description: "Purchase entire table/booth with multiple assignable tickets. Perfect for groups wanting exclusive seating together."
		},
		"vendor-booth": { 
			label: "Vendor Booth Ticket", 
			icon: Store,
			description: "For vendors to purchase booths/stands. Price depends on booth capacity and number of assignable staff tickets."
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[700px] md:max-w-[900px] max-h-[85vh] overflow-y-auto">
				<DialogHeader>
					<div className="flex items-start justify-between gap-4">
						<div className="flex-1">
							<DialogTitle className="text-xl font-bold">
								{ticket?.name || "Ticket Details"}
							</DialogTitle>
							<DialogDescription className="mt-2">
								Detailed performance and customer list for this ticket type.
							</DialogDescription>
						</div>
						{ticket?.ticketType && (() => {
							const typeInfo = ticketTypeInfo[ticket.ticketType];
							const Icon = typeInfo.icon;
							return (
								<Badge variant="outline" className="flex items-center gap-1.5 shrink-0">
									<Icon className="h-4 w-4" />
									{typeInfo.label}
								</Badge>
							);
						})()}
					</div>
				</DialogHeader>

				<div className="space-y-6 py-4">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								Overview
							</p>
							<div className="flex items-center gap-3">
								<span
									className={`w-3 h-3 rounded-full ${colorAccent(ticket?.color).dot}`}
								/>
								<h2 className="text-2xl font-bold text-gray-900 dark:text-slate-200">
									{ticket?.name}
								</h2>
							</div>
							<p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
								{ticket?.description}
							</p>
						</div>
						<div className="flex items-center gap-4">
							<div
								className={`text-center p-3 ${colorAccent(ticket?.color).subtle} rounded-lg shadow-sm border border-gray-200 dark:border-slate-600`}
							>
								<p className="text-xs text-gray-600 dark:text-slate-400 flex items-center justify-center gap-2">
									<HiOutlineCurrencyDollar className="h-4 w-4 text-gray-600 dark:text-slate-400" />{" "}
									Revenue
								</p>
								<p className="text-xl font-semibold text-gray-900 dark:text-slate-200">
									${ticket?.revenue ?? 0}
								</p>
							</div>
							<div className="text-center p-3 !bg-white dark:!bg-slate-700/50 rounded-lg shadow-sm border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
								<p className="text-xs text-gray-600 dark:text-slate-400 flex items-center justify-center gap-2">
									<HiOutlineUsers className="h-4 w-4 text-gray-600 dark:text-slate-400" />{" "}
									Sold
								</p>
								<p className="text-xl font-semibold text-gray-900 dark:text-slate-200">
									{ticket?.sold ?? 0}
								</p>
							</div>
							<div className="text-center p-3 !bg-white dark:!bg-slate-700/50 rounded-lg shadow-sm border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
								<p className="text-xs text-gray-600 dark:text-slate-400 flex items-center justify-center gap-2">
									<HiOutlineTicket className="h-4 w-4 text-gray-600 dark:text-slate-400" />{" "}
									Available
								</p>
								<p className="text-xl font-semibold text-gray-900 dark:text-slate-200">
									{ticket?.left ?? 0}
								</p>
							</div>
							<div className="text-center p-3 !bg-white dark:!bg-slate-700/50 rounded-lg shadow-sm border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
								<p className="text-xs text-gray-600 dark:text-slate-400 flex items-center justify-center gap-2">
									<HiOutlineChartBar className="h-4 w-4 text-gray-600 dark:text-slate-400" />{" "}
									Avg Purchase
								</p>
								<p className="text-xl font-semibold text-gray-900 dark:text-slate-200">
									${avgPurchase ? avgPurchase.toFixed(2) : "0.00"}
								</p>
							</div>
						</div>
					</div>

					{/* Sales Progress */}
					<div className="flex rounded-lg overflow-hidden">
						<div className={`${colorAccent(ticket?.color).dot} w-1.5`} />
						<div className="p-4 !bg-white dark:!bg-slate-700/50 rounded-r-lg border border-gray-200 dark:border-slate-600 flex-1 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
							<p className="text-sm text-gray-600 dark:text-slate-400">
								Sales Progress
							</p>
							<div className="mt-3">
								<div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
									<div
										className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full"
										style={{
											width: `${ticket ? (ticket.sold / ticket.capacity) * 100 : 0}%`,
										}}
									/>
								</div>
								<div className="flex justify-between items-center mt-2 text-sm text-gray-600 dark:text-slate-400">
									<div>Sold: {ticket?.sold ?? 0}</div>
									<div>Capacity: {ticket?.capacity ?? 0}</div>
								</div>
								<p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
									{ticket
										? `${((ticket.sold / ticket.capacity) * 100).toFixed(1)}% sold • ${ticket.left} remaining`
										: ""}
								</p>
							</div>
						</div>
					</div>

					{/* Ticket Info */}
					<div className="flex rounded-lg overflow-hidden">
						<div className={`${colorAccent(ticket?.color).dot} w-1.5`} />
						<div className="p-4 !bg-white dark:!bg-slate-700/50 rounded-r-lg border border-gray-200 dark:border-slate-600 flex-1 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
							<p className="text-sm text-gray-600 dark:text-slate-400 mb-3">
								Ticket Information
							</p>
							<div className="grid grid-cols-1 gap-4">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<p className="text-xs text-gray-600 dark:text-slate-400">
											Price
										</p>
										<p className="font-semibold text-gray-900 dark:text-slate-200 mt-1">
											{ticket?.price === 0 && (ticket?.ticketType === "seated" || ticket?.ticketType === "booth-table" || ticket?.ticketType === "vendor-booth") ? (
												<span className="text-sm text-gray-500 dark:text-slate-400">Varies</span>
											) : (
												`$${(ticket?.price ?? 0).toFixed(2)}`
											)}
											{ticket?.ticketType === "booth-table" && ticket?.boothPrice && (
												<span className="text-xs text-gray-500 dark:text-slate-400 ml-1 font-normal">per booth</span>
											)}
											{ticket?.ticketType === "vendor-booth" && ticket?.pricePerCapacity && (
												<span className="text-xs text-gray-500 dark:text-slate-400 ml-1 font-normal">per person</span>
											)}
										</p>
									</div>
									<div>
										<p className="text-xs text-gray-600 dark:text-slate-400">
											Access Level / Category
										</p>
										<p className="capitalize text-sm font-medium text-gray-700 dark:text-slate-300 mt-1">
											{ticket?.category}
										</p>
									</div>
								</div>
								
								<div>
									<p className="text-xs text-gray-600 dark:text-slate-400">
										Description
									</p>
									<p className="text-sm text-gray-700 dark:text-slate-300 mt-1">
										{ticket?.description}
									</p>
								</div>

								{/* Type-Specific Information */}
								{ticket?.ticketType && (
									<>
										<Separator className="my-2" />
										<div>
											<p className="text-xs font-semibold text-gray-700 dark:text-slate-300 mb-2">
												Type-Specific Details
											</p>
											<div className="space-y-3">
												{ticket.ticketType === "access-level" && (
													<div className="grid grid-cols-2 gap-4 text-sm">
														<div>
															<p className="text-xs text-gray-600 dark:text-slate-400">Price per Ticket</p>
															<p className="font-medium text-gray-900 dark:text-slate-200">${ticket.price || 0}</p>
														</div>
														<div>
															<p className="text-xs text-gray-600 dark:text-slate-400">Total Capacity</p>
															<p className="font-medium text-gray-900 dark:text-slate-200">{ticket.capacity || 0}</p>
														</div>
													</div>
												)}

												{ticket.ticketType === "seated" && ticket.seatingConfig?.sections && (
													<div className="space-y-2">
														<p className="text-xs text-gray-600 dark:text-slate-400">Seating Sections</p>
														<div className="space-y-2">
															{ticket.seatingConfig.sections.map((section, idx) => (
																<div key={idx} className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
																	<div className="flex justify-between items-start">
																		<div>
																			<p className="text-xs font-medium text-gray-900 dark:text-slate-200">{section.name}</p>
																			<p className="text-xs text-gray-600 dark:text-slate-400 mt-0.5">
																				{section.totalSeats || 0} seats
																			</p>
																		</div>
																		<p className="text-xs font-semibold text-gray-900 dark:text-slate-200">
																			${section.price || 0}
																		</p>
																	</div>
																</div>
															))}
														</div>
													</div>
												)}

												{ticket.ticketType === "booth-table" && (
													<div className="grid grid-cols-2 gap-4 text-sm">
														<div>
															<p className="text-xs text-gray-600 dark:text-slate-400">Number of Booths</p>
															<p className="font-medium text-gray-900 dark:text-slate-200">{ticket.numberOfBooths || 1}</p>
														</div>
														<div>
															<p className="text-xs text-gray-600 dark:text-slate-400">Seats per Booth</p>
															<p className="font-medium text-gray-900 dark:text-slate-200">{ticket.boothCapacity || 0}</p>
														</div>
														<div>
															<p className="text-xs text-gray-600 dark:text-slate-400">Assignable Tickets</p>
															<p className="font-medium text-gray-900 dark:text-slate-200">{ticket.assignableTickets || 0}</p>
														</div>
														<div>
															<p className="text-xs text-gray-600 dark:text-slate-400">Price per Booth</p>
															<p className="font-medium text-gray-900 dark:text-slate-200">${ticket.boothPrice || 0}</p>
														</div>
													</div>
												)}

												{ticket.ticketType === "vendor-booth" && (
													<div className="grid grid-cols-2 gap-4 text-sm">
														<div>
															<p className="text-xs text-gray-600 dark:text-slate-400">Number of Booths</p>
															<p className="font-medium text-gray-900 dark:text-slate-200">{ticket.numberOfVendorBooths || 1}</p>
														</div>
														<div>
															<p className="text-xs text-gray-600 dark:text-slate-400">People per Booth</p>
															<p className="font-medium text-gray-900 dark:text-slate-200">{ticket.vendorBoothCapacity || 0}</p>
														</div>
														<div>
															<p className="text-xs text-gray-600 dark:text-slate-400">Assignable Staff Tickets</p>
															<p className="font-medium text-gray-900 dark:text-slate-200">{ticket.vendorAssignableTickets || 0}</p>
														</div>
														<div>
															<p className="text-xs text-gray-600 dark:text-slate-400">Price per Person</p>
															<p className="font-medium text-gray-900 dark:text-slate-200">${ticket.pricePerCapacity || 0}</p>
														</div>
														<div className="col-span-2 pt-2 border-t border-gray-200 dark:border-gray-700">
															<p className="text-xs text-gray-600 dark:text-slate-400">Total Price per Booth</p>
															<p className="font-semibold text-gray-900 dark:text-slate-200">
																${((ticket.vendorBoothCapacity || 0) * (ticket.pricePerCapacity || 0)).toFixed(2)}
															</p>
														</div>
													</div>
												)}
											</div>
										</div>
									</>
								)}

								<Separator className="my-2" />
								
								<div>
									<p className="text-xs text-gray-600 dark:text-slate-400">
										Features
									</p>
									<p className="text-sm text-gray-700 dark:text-slate-300 mt-1">
										Event Access
										<br />
										Welcome Drink
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Analytics & Customers */}
					<div className="grid grid-cols-1 gap-4">
						<div className="p-4 !bg-white dark:!bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
							<p className="text-sm text-gray-600 dark:text-slate-400">
								Analytics Summary
							</p>
							<div className="mt-3 grid grid-cols-2 gap-4">
								<div>
									<p className="text-xs text-gray-600 dark:text-slate-400">
										Total Orders
									</p>
									<p className="font-semibold text-gray-900 dark:text-slate-200">
										{ticket ? ticket.recentBuyers.length : 0}
									</p>
								</div>
								<div>
									<p className="text-xs text-gray-600 dark:text-slate-400">
										Total Revenue
									</p>
									<p className="font-semibold text-gray-900 dark:text-slate-200">
										${ticket?.revenue ?? 0}.00
									</p>
								</div>
								<div>
									<p className="text-xs text-gray-600 dark:text-slate-400">
										Checked In
									</p>
									<p className="font-semibold text-gray-900 dark:text-slate-200">
										1 / {ticket ? ticket.recentBuyers.length : 0}
									</p>
								</div>
								<div>
									<p className="text-xs text-gray-600 dark:text-slate-400">
										Check-in Rate
									</p>
									<p className="font-semibold text-gray-900 dark:text-slate-200">
										50%
									</p>
								</div>
							</div>
						</div>

						<div className="flex flex-col rounded-lg overflow-hidden">
							<div
								className={`flex items-center justify-between p-4 ${colorAccent(ticket?.color).subtle} border border-gray-200 dark:border-slate-600 rounded-t-lg`}
							>
								<div className="flex items-center gap-3">
									<span
										className={`w-2.5 h-2.5 rounded-full ${colorAccent(ticket?.color).dot}`}
									/>
									<p className="text-sm text-gray-600 dark:text-slate-400">
										Customers ({ticket ? ticket.recentBuyers.length : 0})
									</p>
								</div>
								<button
									onClick={() => setCustomersOpen((v) => !v)}
									className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
									aria-expanded={customersOpen}
								>
									{customersOpen ? "Hide" : "View"}
									<HiOutlineChevronDown
										className={`h-4 w-4 transition-transform ${customersOpen ? "rotate-180" : ""}`}
									/>
								</button>
							</div>

							{customersOpen ? (
								<div className="p-4 !bg-white dark:!bg-slate-700/50 border-t border-gray-200 dark:border-slate-600 rounded-b-lg [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
									<div className="mt-3 divide-y divide-gray-200 dark:divide-slate-600">
										{ticket?.recentBuyers.map((buyer, idx) => (
											<div key={idx} className="py-3 flex items-start gap-3">
												<div
													className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white ${getAvatarColor(buyer.name)}`}
												>
													{getInitials(buyer.name)}
												</div>
												<div className="flex-1 min-w-0">
													<p className="text-sm font-medium text-gray-900 dark:text-slate-200">
														{buyer.name}
													</p>
													<p className="text-xs text-gray-600 dark:text-slate-400">
														{buyer.purchaseDate}
													</p>
													<div className="mt-1 text-xs text-gray-600 dark:text-slate-400">
														1x ticket • $25.00 • paid
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							) : (
								<div className="p-4 !bg-white dark:!bg-slate-700/50 border-t border-gray-200 dark:border-slate-600 rounded-b-lg [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<div className="flex -space-x-2">
												{ticket?.recentBuyers.slice(0, 4).map((buyer, i) => (
													<div
														key={i}
														className={`shrink-0 w-8 h-8 rounded-full ${getAvatarColor(buyer.name)} flex items-center justify-center text-xs font-semibold text-white border-2 border-white dark:border-slate-800`}
														title={buyer.name}
													>
														{getInitials(buyer.name)}
													</div>
												))}
											</div>
											<p className="text-sm text-gray-600 dark:text-slate-400">
												{ticket ? ticket.recentBuyers.length : 0} total
											</p>
										</div>
										<div className="text-sm text-gray-600 dark:text-slate-400">
											Click &quot;View&quot; to expand
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Close
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
