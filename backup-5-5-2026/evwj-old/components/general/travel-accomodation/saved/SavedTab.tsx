"use client";

import React from "react";
import Image from "next/image";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Card, CardContent } from "@/components/ui/card";
import { useSaved, SavedKind } from "./SavedContext";
import { X } from "lucide-react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

type SavedItemPayload = {
	imageUrl?: string;
	checkIn?: string;
	checkOut?: string;
	price?: string;
	pricePerDay?: string;
	address?: string;
	duration?: string;
	[key: string]: unknown;
};

const kinds: { key: SavedKind | "all"; label: string }[] = [
	{ key: "all", label: "All" },
	{ key: "hotel", label: "Hotels" },
	{ key: "flight", label: "Flights" },
	{ key: "car", label: "Cars" },
	{ key: "activity", label: "Activities" },
	{ key: "dining", label: "Dining" },
	{ key: "ride", label: "Rides" },
];

function SmallBadge({ children }: { children: React.ReactNode }) {
	return (
		<span className="inline-flex items-center gap-1 rounded-full !bg-white dark:!bg-[#020617] backdrop-blur-sm border border-gray-200 dark:border-slate-600 px-2 py-0.5 text-xs font-semibold text-foreground [background-color:white] dark:[background-color:#020617]">
			{children}
		</span>
	);
}

export default function SavedTab() {
	const { items, remove, byKind, clear } = useSaved();

	return (
		<div className="flex flex-col gap-6">
			<Card className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				<CardContent className="p-5 sm:p-6">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h3 className="text-2xl font-semibold text-foreground">
								Saved Items
							</h3>
							<p className="mt-1 text-sm text-muted-foreground">
								Quick access to items you saved while planning your trip. Tap an
								item to view more details or remove it.
							</p>
						</div>

						<div className="flex items-center gap-3">
							<div className="hidden sm:inline-flex items-center gap-3 rounded-full !bg-white dark:!bg-[#020617] backdrop-blur-sm border border-gray-200 dark:border-slate-600 px-3 py-2 [background-color:white] dark:[background-color:#020617]">
								<SmallBadge>{items.length} total</SmallBadge>
								<SmallBadge>{byKind("hotel").length} hotels</SmallBadge>
								<SmallBadge>{byKind("flight").length} flights</SmallBadge>
							</div>
							<div className="flex items-center gap-2">
								<button
									onClick={() => clear()}
									className="rounded-md border border-red-200 dark:border-red-800 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]"
								>
									Clear all
								</button>
							</div>
						</div>
					</div>

					<div className="mt-4">
						<Tabs>
							<TabList className="mb-4 flex gap-2 overflow-auto !bg-white dark:!bg-[#020617] backdrop-blur-sm border border-gray-200 dark:border-slate-600 rounded-lg p-1 [background-color:white] dark:[background-color:#020617]">
								{kinds.map((k) => (
									<Tab
										key={String(k.key)}
										selectedClassName="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
										className="px-3 py-2 rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm cursor-pointer text-sm font-semibold text-foreground data-[selected]:bg-gradient-to-r data-[selected]:from-indigo-600 data-[selected]:to-purple-600 data-[selected]:text-white [background-color:white] dark:[background-color:#020617]"
									>
										{k.label}{" "}
										{k.key === "all"
											? `(${items.length})`
											: `(${byKind(k.key as SavedKind).length})`}
									</Tab>
								))}
							</TabList>

							{kinds.map((k) => (
								<TabPanel key={String(k.key)}>
									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
										{(k.key === "all" ? items : byKind(k.key as SavedKind))
											.length === 0 && (
											<div className="col-span-full rounded-lg border border-dashed border-gray-200 dark:border-slate-600 !bg-white dark:!bg-[#020617] backdrop-blur-sm p-6 text-center text-sm text-muted-foreground [background-color:white] dark:[background-color:#020617]">
												No saved {k.label.toLowerCase()}.
											</div>
										)}

										{(k.key === "all" ? items : byKind(k.key as SavedKind)).map(
											(it) => (
												<Card
													key={`${it.kind}_${it.id}`}
													className="flex flex-col overflow-hidden !bg-white dark:!bg-[#020617] backdrop-blur-sm shadow-sm transition hover:shadow-lg [background-color:white] dark:[background-color:#020617]"
												>
													<div className="flex gap-4 p-4">
														<div className="relative h-20 w-32 shrink-0 rounded-md overflow-hidden !bg-white dark:!bg-[#020617] backdrop-blur-sm border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:#020617]">
															{(it.payload as SavedItemPayload)?.imageUrl ? (
																// use next/image if available
																<Image
																	src={
																		(it.payload as SavedItemPayload).imageUrl!
																	}
																	alt={it.title}
																	fill
																	className="object-cover"
																	unoptimized
																/>
															) : (
																<div className="flex h-full w-full items-center justify-center text-gray-400">
																	No image
																</div>
															)}
														</div>

														<div className="flex flex-1 flex-col">
															<div className="flex items-start justify-between gap-2">
																<div>
																	<div className="text-sm font-semibold text-foreground">
																		{it.title}
																	</div>
																	<div className="mt-1 text-xs text-muted-foreground">
																		{it.kind}
																	</div>
																</div>
																<button
																	onClick={() => remove(it.id, it.kind)}
																	className="inline-flex items-center gap-2 rounded-md border border-red-200 dark:border-red-800 px-2 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]"
																>
																	<X className="h-3 w-3" /> Remove
																</button>
															</div>

															<div className="mt-3 flex flex-wrap items-center gap-2">
																{/* show some meta extracted from payload when possible */}
																{(it.payload as SavedItemPayload)?.checkIn &&
																	(it.payload as SavedItemPayload)
																		?.checkOut && (
																		<SmallBadge>
																			{(it.payload as SavedItemPayload).checkIn}{" "}
																			—{" "}
																			{
																				(it.payload as SavedItemPayload)
																					.checkOut
																			}
																		</SmallBadge>
																	)}
																{(it.payload as SavedItemPayload)?.price && (
																	<SmallBadge>
																		{(it.payload as SavedItemPayload).price}
																	</SmallBadge>
																)}
																{(it.payload as SavedItemPayload)
																	?.pricePerDay && (
																	<SmallBadge>
																		{
																			(it.payload as SavedItemPayload)
																				.pricePerDay
																		}
																	</SmallBadge>
																)}
																{(it.payload as SavedItemPayload)?.address && (
																	<SmallBadge>
																		{(it.payload as SavedItemPayload).address}
																	</SmallBadge>
																)}
																{(it.payload as SavedItemPayload)?.duration && (
																	<SmallBadge>
																		{(it.payload as SavedItemPayload).duration}
																	</SmallBadge>
																)}
															</div>
														</div>
													</div>
												</Card>
											),
										)}
									</div>
								</TabPanel>
							))}
						</Tabs>
					</div>
				</CardContent>
			</Card>

			<Pagination className="mt-4">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href="#" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
