"use client";
import React, { useState } from "react";
import {
	CloudSun,
	AlertTriangle,
	MapPin,
	Clock,
	FileText,
	Bell,
	Check,
	Info,
	Calendar,
	X,
	Search,
	Download,
	Tag,
	User,
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Announcement = {
	id: string;
	title: string;
	date: string;
	time?: string;
	priority?: "normal" | "high";
	tag?: string;
	body: string;
	attachments?: number;
	requiresAck?: boolean;
	unread?: boolean;
};

const sample: Announcement[] = [
	{
		id: "ann-1",
		title: "Weather Update",
		date: "Jan 13, 2024",
		time: "8:00 PM",
		tag: "weather",
		body: "The forecast shows beautiful weather for tomorrow! Expect sunny skies with temperatures around 75°F. Perfect for our outdoor photo session. Don't forget your sunglasses!",
		unread: true,
		requiresAck: false,
	},
	{
		id: "ann-2",
		title: "Venue Change for Ceremony",
		date: "Jan 15, 2024",
		time: "10:30 AM",
		priority: "high",
		tag: "urgent",
		body: "Due to unexpected weather conditions, the ceremony has been moved indoors to the Grand Ballroom. Please arrive 15 minutes earlier than originally scheduled to allow time for the new setup. The reception location remains unchanged.",
		attachments: 1,
		requiresAck: true,
	},
	{
		id: "ann-3",
		title: "Parking Information Update",
		date: "Jan 14, 2024",
		tag: "parking",
		body: "Complimentary valet parking is available at the main entrance. Please have your keys ready and mention you're attending the event. Alternative parking is available in Lot C with shuttle service running every 10 minutes.",
		attachments: 1,
	},
	{
		id: "ann-4",
		title: "Cocktail Hour Extended",
		date: "Jan 14, 2024",
		tag: "schedule change",
		body: "Great news! We've extended cocktail hour by 30 minutes. Enjoy more time to mingle and enjoy the hors d'oeuvres. Dinner will now begin at 7:00 PM instead of 6:30 PM.",
	},
	{
		id: "ann-5",
		title: "COVID-19 Safety Protocols",
		date: "Jan 12, 2024",
		priority: "high",
		tag: "safety",
		body: "For everyone's safety, we ask that all guests follow these guidelines: masks are optional but encouraged in indoor spaces, hand sanitizer stations are available throughout the venue, and we've implemented enhanced cleaning protocols.",
		requiresAck: true,
	},
	{
		id: "ann-6",
		title: "Welcome to Our Special Day!",
		date: "Jan 10, 2024",
		tag: "general",
		body: "We're so excited to celebrate with you! This announcement center will keep you updated on any important information. Please check back regularly for updates about the schedule, venue, and other details.",
	},
];

export default function AnnouncementTab() {
	const [items, setItems] = useState<Announcement[]>(sample);
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState<Announcement | null>(null);

	function handleAcknowledge(id: string) {
		setItems((prev) =>
			prev.map((p) => (p.id === id ? { ...p, requiresAck: false } : p)),
		);
		toast.success("Announcement acknowledged");
	}

	const filtered = items.filter((a) =>
		`${a.title} ${a.body} ${a.tag || ""}`
			.toLowerCase()
			.includes(query.toLowerCase()),
	);

	return (
		<div className="space-y-6 font-sans">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-xl font-bold dark:text-white">Announcements</h2>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						Stay updated with important information about the event
					</p>
				</div>
				<div className="flex items-center gap-3">
					<div className="relative">
						<span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
							<Search className="w-4 h-4" />
						</span>
						<input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search announcements..."
							aria-label="Search announcements"
							className="border border-gray-200 rounded-md pl-10 pr-3 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:bg-[#070b1c] dark:border-gray-700 dark:text-white dark:focus:ring-blue-900"
						/>
					</div>

					<div className="hidden sm:flex items-center gap-2">
						<button className="text-sm px-3 py-1 border rounded bg-white flex items-center gap-2 dark:bg-[#090a11] dark:border-gray-700 dark:text-gray-200">
							<Tag className="w-4 h-4" /> All Types
						</button>
						<button className="text-sm px-3 py-1 border rounded bg-white flex items-center gap-2 dark:bg-[#090a11] dark:border-gray-700 dark:text-gray-200">
							FilterIconPlaceholder{" "}
						</button>
					</div>
				</div>
			</div>

			<div className="flex items-center gap-3">
				<div className="flex items-center gap-2">
					<button className="text-sm px-3 py-1 border rounded bg-white flex items-center gap-2 dark:bg-[#090a11] dark:border-gray-700 dark:text-gray-200">
						<Tag className="w-4 h-4" /> Types
					</button>
					<button className="text-sm px-3 py-1 border rounded bg-white flex items-center gap-2 dark:bg-[#090a11] dark:border-gray-700 dark:text-gray-200">
						<Calendar className="w-4 h-4" /> Status
					</button>
				</div>
				<div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
					{items.filter((i) => i.unread).length} new
				</div>
			</div>

			<div className="space-y-4">
				{filtered.map((a) => (
					<div
						key={a.id}
						onClick={() => setSelected(a)}
						className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition focus-within:ring-2 focus-within:ring-blue-100 dark:bg-[#090a11] dark:border-0 dark:hover:bg-[#090a11]/80"
						role="button"
						tabIndex={0}
						onKeyDown={(e) => {
							if (e.key === "Enter") setSelected(a);
						}}
						aria-label={`Open announcement ${a.title}`}
					>
						<div className="flex items-start justify-between">
							<div className="flex items-start gap-3">
								<div className="mt-0.5 relative">
									{a.tag === "weather" && (
										<CloudSun className="w-6 h-6 text-blue-500" />
									)}
									{a.tag === "urgent" && (
										<AlertTriangle className="w-6 h-6 text-red-500" />
									)}
									{a.tag === "parking" && (
										<MapPin className="w-6 h-6 text-amber-500" />
									)}
									{a.tag === "schedule change" && (
										<Clock className="w-6 h-6 text-green-600" />
									)}
									{a.tag === "safety" && (
										<Info className="w-6 h-6 text-rose-600" />
									)}
									{!a.tag && <Bell className="w-6 h-6 text-gray-500" />}
									{a.unread && (
										<span
											className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full"
											aria-hidden
										/>
									)}
								</div>
								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white">
										{a.title}{" "}
										{a.priority === "high" && (
											<span className="ml-2 inline-block px-2 py-0.5 text-xs bg-red-50 text-red-600 rounded dark:bg-red-900/30 dark:text-red-400">
												High Priority
											</span>
										)}
									</h3>
									<div className="text-xs text-gray-500 dark:text-gray-400">
										{a.date} {a.time ? `• ${a.time}` : ""}
									</div>
									<div className="mt-1 flex items-center gap-2">
										{/* Organizer Profile Card */}
										<div className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#070b1c] px-2 py-1.5">
											<Avatar className="h-8 w-8 border-2 border-gray-200 dark:border-gray-700">
												<AvatarImage src="https://github.com/shadcn.png" alt="Organizer" />
												<AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-600 text-xs font-medium text-white">
													ORG
												</AvatarFallback>
											</Avatar>
											<div className="flex flex-col">
												<p className="text-xs font-medium text-gray-900 dark:text-gray-100">
													Organizer
												</p>
												<p className="text-[10px] text-gray-500 dark:text-gray-400">
													Event Host
												</p>
											</div>
										</div>
										{a.tag && (
											<span className="text-xs px-2 py-0.5 bg-blue-50 rounded-full text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
												{a.tag}
											</span>
										)}
									</div>
								</div>
							</div>

							<div className="text-right">
								<div className="text-xs text-gray-400">
									{a.unread ? "New" : "Read"}
								</div>
								<div className="mt-2 flex items-center gap-2 justify-end">
									{a.attachments ? (
										<div className="flex items-center gap-1 text-xs text-gray-500">
											<FileText className="w-4 h-4" /> {a.attachments}
										</div>
									) : null}
								</div>
							</div>
						</div>

						<div className="mt-3 text-sm text-gray-700 line-clamp-3 dark:text-gray-300">
							{a.body}
						</div>

						<div className="mt-4 flex items-center justify-between">
							<div className="text-xs text-gray-500 dark:text-gray-400">
								Tag:{" "}
								<span className="font-medium text-gray-700 dark:text-gray-300">
									{a.tag || "general"}
								</span>
							</div>
							<div className="flex items-center gap-2">
								{a.requiresAck ? (
									<button
										type="button"
										onClick={(e) => {
											e.stopPropagation();
											handleAcknowledge(a.id);
											if (selected?.id === a.id) setSelected(null);
										}}
										className="px-3 py-1 bg-blue-600 text-white text-sm rounded flex items-center gap-2 shadow-sm hover:bg-blue-700"
									>
										<Check className="w-4 h-4" /> Acknowledge
									</button>
								) : (
									<div className="text-sm text-green-600 font-semibold">
										Acknowledged
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{selected && (
				<AnnouncementModal
					announcement={selected}
					onClose={() => setSelected(null)}
					onAcknowledge={(id) => {
						handleAcknowledge(id);
						setSelected(null);
					}}
				/>
			)}
		</div>
	);
}

function AnnouncementModal({
	announcement,
	onClose,
	onAcknowledge,
}: {
	announcement: Announcement;
	onClose: () => void;
	onAcknowledge: (id: string) => void;
}) {
	const {
		id,
		title,
		date,
		time,
		priority,
		tag,
		body,
		attachments,
		requiresAck,
	} = announcement;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />
			<div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 z-10 overflow-y-auto max-h-[90vh] dark:bg-[#090a11]">
				<div className="flex items-start justify-between">
					<div>
						<div className="flex items-center gap-3">
							<div>
								{tag === "weather" && (
									<CloudSun className="w-7 h-7 text-blue-500" />
								)}
								{tag === "urgent" && (
									<AlertTriangle className="w-7 h-7 text-red-500" />
								)}
								{tag === "parking" && (
									<MapPin className="w-7 h-7 text-amber-500" />
								)}
								{tag === "schedule change" && (
									<Clock className="w-7 h-7 text-green-600" />
								)}
								{tag === "safety" && <Info className="w-7 h-7 text-rose-600" />}
								{!tag && <Bell className="w-7 h-7 text-gray-500" />}
							</div>
							<div>
								<h2 className="text-xl font-bold dark:text-white">{title}</h2>
								<div className="text-sm text-gray-500 dark:text-gray-400">
									{date} {time ? `• ${time}` : ""}
								</div>
								{priority === "high" && (
									<div className="mt-2 inline-block px-2 py-0.5 text-xs bg-red-50 text-red-600 rounded dark:bg-red-900/30 dark:text-red-400">
										High Priority
									</div>
								)}
							</div>
						</div>
					</div>
					<button
						type="button"
						onClick={onClose}
						title="Close announcement"
						aria-label="Close announcement"
						className="text-gray-500 hover:text-gray-700"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				<div
					className="mt-4 text-gray-700 leading-relaxed dark:text-gray-300"
					dangerouslySetInnerHTML={{ __html: body.replace(/\n/g, "<br/>") }}
				/>

				{attachments ? (
					<div className="mt-6">
						<h4 className="font-semibold mb-2 dark:text-white">Attachments</h4>
						<div className="flex items-center gap-3">
							<div className="p-3 border rounded dark:border-gray-700">
								<FileText className="w-6 h-6 text-gray-600 dark:text-gray-400" />
							</div>
							<div>
								<div className="font-medium dark:text-gray-200">
									Updated Venue Map.jpg
								</div>
								<div className="text-xs text-gray-500 dark:text-gray-400">
									239.3 KB
								</div>
							</div>
							<div className="ml-auto">
								<button
									type="button"
									onClick={() => {
										toast("Downloading attachment");
									}}
									className="px-3 py-1 bg-gray-100 rounded dark:bg-[#070b1c] dark:text-gray-300"
								>
									Download
								</button>
							</div>
						</div>
					</div>
				) : null}

				<div className="mt-6">
					<h4 className="font-semibold dark:text-white">
						Related Schedule Items
					</h4>
					<div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
						Ceremony - 3:00 PM
					</div>
				</div>

				{requiresAck && (
					<div className="mt-6">
						<div className="bg-yellow-50 border border-yellow-100 p-4 rounded dark:bg-yellow-900/20 dark:border-yellow-900/30">
							<p className="text-sm text-gray-800 mb-3 dark:text-gray-200">
								This announcement requires your acknowledgement. Please click
								the button below to confirm you've read and understood this
								message.
							</p>
							<div className="flex justify-end">
								<button
									type="button"
									onClick={() => onAcknowledge(id)}
									className="px-4 py-2 bg-blue-600 text-white rounded"
								>
									I Understand & Acknowledge
								</button>
							</div>
						</div>
					</div>
				)}

				<div className="mt-6 text-right">
					<button
						type="button"
						onClick={onClose}
						className="text-sm text-gray-500"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
