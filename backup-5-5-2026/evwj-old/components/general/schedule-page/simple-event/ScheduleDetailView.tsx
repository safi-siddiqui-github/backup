"use client";
import React from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Clock, Pencil, Trash2, MapPin, Bell } from "lucide-react";
import { DayCard, ScheduleItem } from "../types";
import AddScheduleForm from "./AddScheduleForm";
import EditScheduleForm from "./EditScheduleForm";

type Props = {
	day: DayCard;
	scheduleItems: ScheduleItem[];
	onAddItem?: (dayId: number, item: ScheduleItem) => void;
	onUpdateItem?: (dayId: number, itemId: string, item: ScheduleItem) => void;
	onDeleteItem?: (dayId: number, itemId: string) => void;
};

export default function ScheduleDetailView({
	day,
	scheduleItems,
	onAddItem,
	onUpdateItem,
	onDeleteItem,
}: Props) {
	// getColorClasses duplicated here for styling (kept local to avoid prop drilling)
	const getColorClasses = (color: string) => {
		switch (color) {
			case "purple":
				return {
					fill: "bg-purple-500",
					iconBg: "bg-purple-100",
					iconText: "text-purple-600",
					badgeBg: "bg-purple-100",
					badgeText: "text-purple-800",
					notificationBg: "bg-purple-50",
					notificationText: "text-purple-700",
				};
			case "orange":
				return {
					fill: "bg-orange-500",
					iconBg: "bg-orange-100",
					iconText: "text-orange-600",
					badgeBg: "bg-orange-100",
					badgeText: "text-orange-800",
					notificationBg: "bg-orange-50",
					notificationText: "text-orange-700",
				};
			case "green":
				return {
					fill: "bg-green-500",
					iconBg: "bg-green-100",
					iconText: "text-green-600",
					badgeBg: "bg-green-100",
					badgeText: "text-green-800",
					notificationBg: "bg-green-50",
					notificationText: "text-green-700",
				};
			default:
				return {
					fill: "bg-gray-500",
					iconBg: "bg-gray-100",
					iconText: "text-gray-600",
					badgeBg: "bg-gray-100",
					badgeText: "text-gray-800",
					notificationBg: "bg-gray-50",
					notificationText: "text-gray-700",
				};
		}
	};

	return (
		<div className="rounded-lg border !bg-white dark:!bg-[#020617] backdrop-blur-sm shadow-sm [background-color:white] dark:[background-color:#020617]">
			<div className="flex items-center justify-between border-b border-gray-200 p-4 sm:p-6 dark:border-gray-700">
				<div>
					<h3 className="text-lg font-bold text-gray-900 dark:text-white">
						{day.title}, {day.date}
					</h3>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						{day.items} items scheduled
					</p>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
							<Plus className="h-4 w-4" />
							Add Schedule Item
						</button>
					</DialogTrigger>

					<DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
						<DialogHeader>
							<DialogTitle>Add Schedule Item</DialogTitle>
							<DialogDescription>
								Basic information and notifications for the agenda item.
							</DialogDescription>
						</DialogHeader>

						<AddScheduleForm
							day={day}
							onAdd={(item) => onAddItem && onAddItem(day.id, item)}
						/>

						<DialogFooter />
					</DialogContent>
				</Dialog>
			</div>

			<div className="overflow-y-auto">
				{scheduleItems.map((item, index) => {
					const itemColors = getColorClasses(item.color);
					return (
						<div
							key={item.id}
							className={`p-6 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer ${index < scheduleItems.length - 1 ? "border-b border-gray-200 dark:border-gray-800" : ""}`}
						>
							<div className="relative pl-12">
								<div className="absolute top-1 left-0 flex h-full flex-col items-center">
									<div className={`h-5 w-5 rounded-full ${itemColors.fill}`} />
									<div
										className={`mt-2 w-0.5 grow bg-gray-200 dark:bg-gray-700 ${index === scheduleItems.length - 1 ? "h-0" : "h-full"}`}
									/>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className={`rounded-full p-2 ${itemColors.iconBg}`}>
											<Clock className={`h-5 w-5 ${itemColors.iconText}`} />
										</div>
										<div>
											<span
												className={`rounded px-2 py-0.5 text-xs font-medium ${itemColors.badgeBg} ${itemColors.badgeText}`}
											>
												{item.tag}
											</span>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<Dialog>
											<DialogTrigger asChild>
												<button
													className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
													onClick={(e) => e.stopPropagation()}
												>
													<Pencil className="h-4 w-4" />
												</button>
											</DialogTrigger>
											<DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
												<DialogHeader>
													<DialogTitle>Edit Schedule Item</DialogTitle>
													<DialogDescription>
														Update the information for this agenda item.
													</DialogDescription>
												</DialogHeader>
												<EditScheduleForm
													day={day}
													item={item}
													onUpdate={(updatedItem) => {
														if (onUpdateItem) {
															onUpdateItem(day.id, item.id, updatedItem);
														}
													}}
												/>
												<DialogFooter />
											</DialogContent>
										</Dialog>
										<button
											className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
											onClick={(e) => {
												e.stopPropagation();
												if (
													onDeleteItem &&
													confirm(
														"Are you sure you want to delete this schedule item?",
													)
												) {
													onDeleteItem(day.id, item.id);
												}
											}}
										>
											<Trash2 className="h-4 w-4" />
										</button>
									</div>
								</div>

								<div className="mt-3">
									<h4 className="text-lg font-bold text-gray-900 dark:text-white">
										{item.title}
									</h4>
									<p className="text-sm font-medium text-gray-500 dark:text-gray-300">
										{item.time}
									</p>
									<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
										{item.description}
									</p>
									<div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
										<MapPin className="h-4 w-4" />
										<span>{item.location}</span>
									</div>
								</div>

								{item.notification && (
									<div
										className={`mt-4 flex items-start gap-3 rounded-lg p-3 ${itemColors.notificationBg}`}
									>
										<Bell
											className={`mt-1 h-4 w-4 shrink-0 ${itemColors.notificationText}`}
										/>
										<p className={`text-sm ${itemColors.notificationText}`}>
											<span className="font-semibold">
												Notification ({item.id.slice(-1)}){" "}
											</span>
											{item.notification}
										</p>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
