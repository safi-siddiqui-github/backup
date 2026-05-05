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
import {
	CalendarDays,
	Plus,
	MessageSquare,
	Hammer,
	Coffee,
} from "lucide-react";

import { DayCard, ScheduleItem } from "../types";
import AddScheduleForm from "./AddScheduleForm";

type Props = {
	day: DayCard;
	onAddItem?: (dayId: number, item: ScheduleItem) => void;
};

export default function EmptyScheduleView({ day, onAddItem }: Props) {
	return (
		<div className="rounded-lg border !bg-white dark:!bg-[#020617] backdrop-blur-sm shadow-sm [background-color:white] dark:[background-color:#020617]">
			<div className="flex items-center justify-between border-b border-gray-200 p-4 sm:p-6 dark:border-gray-700">
				<div>
					<h3 className="text-lg font-bold text-gray-900 dark:text-white">
						{day.title}, {day.date}
					</h3>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						0 items scheduled
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

			<div className="flex flex-col items-center justify-center p-12 text-center sm:p-20">
				<div className="relative">
					<div className="rounded-full bg-blue-100 p-6 dark:bg-blue-900">
						<CalendarDays className="h-10 w-10 text-blue-600 dark:text-blue-300" />
					</div>
					<span className="absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-blue-600 dark:border-gray-900">
						<Plus className="h-4 w-4 text-white" />
					</span>
				</div>

				<h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
					No schedule items yet
				</h3>
				<p className="mt-1 max-w-sm text-sm text-gray-500 dark:text-gray-400">
					Add your first agenda item to get started with planning your event
					timeline
				</p>
				<Dialog>
					<DialogTrigger asChild>
						<button className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
							<Plus className="h-4 w-4" />
							Add First Item
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
							onAdd={(item) => onAddItem?.(day.id, item)}
						/>

						<DialogFooter />
					</DialogContent>
				</Dialog>

				<div className="mt-8 text-center">
					<p className="text-sm text-gray-400 dark:text-gray-500">
						Try adding:
					</p>
					<div className="mt-3 flex flex-wrap justify-center gap-3">
						<button className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
							<MessageSquare className="h-4 w-4 text-blue-500" /> Session
						</button>
						<button className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
							<Hammer className="h-4 w-4 text-green-500" /> Workshop
						</button>
						<button className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
							<Coffee className="h-4 w-4 text-orange-500" /> Break
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
