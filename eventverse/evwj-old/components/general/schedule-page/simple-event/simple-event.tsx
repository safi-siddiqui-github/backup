import { CalendarDays, Clock, List } from "lucide-react";
import { useMemo, useState } from "react";
import { DayCard, ScheduleItem } from "../types";
import { toast } from "sonner";
import ScheduleDetailView from "./ScheduleDetailView";
import EmptyScheduleView from "./EmptyScheduleView";
import { mockScheduleData } from "./data";

export default function SimpleEvent() {
	const [selectedDay, setSelectedDay] = useState<number>(1);

	const days: DayCard[] = useMemo(
		() => [
			{
				id: 1,
				title: "Monday",
				date: "Nov 03, 2025",
				items: 2,
				duration: "1h 30m",
				color: "purple",
			},
			{
				id: 2,
				title: "Tuesday",
				date: "Nov 04, 2025",
				items: 0,
				duration: "0h 0m",
				color: "orange",
			},
			{
				id: 3,
				title: "Wednesday",
				date: "Nov 05, 2025",
				items: 0,
				duration: "0h 0m",
				color: "green",
			},
		],
		[],
	);

	const selectedDayData = useMemo(() => {
		return days.find((d) => d.id === selectedDay);
	}, [selectedDay, days]);

	const [scheduleData, setScheduleData] = useState<{
		[key: number]: ScheduleItem[];
	}>(mockScheduleData);

	const selectedDayItems = useMemo(() => {
		return scheduleData[selectedDay] || [];
	}, [selectedDay, scheduleData]);

	const handleAddItem = (dayId: number, item: ScheduleItem) => {
		setScheduleData((prev) => {
			const copy = { ...prev };
			copy[dayId] = copy[dayId] ? [...copy[dayId], item] : [item];
			return copy;
		});
		toast.success("Schedule item added");
	};

	const handleUpdateItem = (
		dayId: number,
		itemId: string,
		updatedItem: ScheduleItem,
	) => {
		setScheduleData((prev) => {
			const copy = { ...prev };
			if (copy[dayId]) {
				copy[dayId] = copy[dayId].map((item) =>
					item.id === itemId ? updatedItem : item,
				);
			}
			return copy;
		});
		toast.success("Schedule item updated");
	};

	const handleDeleteItem = (dayId: number, itemId: string) => {
		setScheduleData((prev) => {
			const copy = { ...prev };
			if (copy[dayId]) {
				copy[dayId] = copy[dayId].filter((item) => item.id !== itemId);
			}
			return copy;
		});
		toast.success("Schedule item deleted");
	};

	// Helper function to get color classes
	const getColorClasses = (color: string) => {
		switch (color) {
			case "purple":
				return {
					text: "text-purple-700 dark:text-purple-300",
					bg: "bg-purple-50/50 dark:bg-purple-900/20",
					border: "border-purple-200 dark:border-purple-800",
					fill: "bg-purple-500",
					badgeText: "text-purple-800 dark:text-purple-100",
					badgeBg: "bg-purple-100 dark:bg-purple-800",
					iconBg: "bg-purple-100 dark:bg-purple-900",
					iconText: "text-purple-600 dark:text-purple-300",
					selectedBadge:
						"bg-purple-600 text-white shadow-xl ring-4 ring-purple-300/30 dark:ring-purple-900/30",
					notificationBg: "bg-purple-50 dark:bg-purple-900/30",
					notificationText: "text-purple-700 dark:text-purple-200",
				};
			case "orange":
				return {
					text: "text-orange-700 dark:text-orange-300",
					bg: "bg-orange-50/50 dark:bg-orange-900/20",
					border: "border-orange-200 dark:border-orange-800",
					fill: "bg-orange-500",
					selectedBadge:
						"bg-orange-500 text-white shadow-xl ring-4 ring-orange-300/30 dark:ring-orange-900/30",
					badgeText: "text-orange-800 dark:text-orange-100",
					badgeBg: "bg-orange-100 dark:bg-orange-800",
					iconBg: "bg-orange-100 dark:bg-orange-900",
					iconText: "text-orange-600 dark:text-orange-300",
					notificationBg: "bg-orange-50 dark:bg-orange-900/30",
					notificationText: "text-orange-700 dark:text-orange-200",
				};
			case "green":
				return {
					text: "text-green-700 dark:text-green-300",
					bg: "bg-green-50/50 dark:bg-green-900/20",
					border: "border-green-200 dark:border-green-800",
					fill: "bg-green-500",
					selectedBadge:
						"bg-green-600 text-white shadow-xl ring-4 ring-green-300/30 dark:ring-green-900/30",
					badgeText: "text-green-800 dark:text-green-100",
					badgeBg: "bg-green-100 dark:bg-green-800",
					iconBg: "bg-green-100 dark:bg-green-900",
					iconText: "text-green-600 dark:text-green-300",
					notificationBg: "bg-green-50 dark:bg-green-900/30",
					notificationText: "text-green-700 dark:text-green-200",
				};
			default:
				return {
					text: "text-gray-700 dark:text-gray-300",
					bg: "bg-white dark:bg-gray-800",
					border: "border-gray-200 dark:border-gray-700",
					fill: "bg-gray-500",
					selectedBadge:
						"bg-indigo-500 text-white shadow-xl ring-4 ring-indigo-300/30 dark:ring-indigo-900/30",
					badgeText: "text-gray-800 dark:text-gray-100",
					badgeBg: "bg-gray-100 dark:bg-gray-800",
					iconBg: "bg-gray-100 dark:bg-gray-900",
					iconText: "text-gray-600 dark:text-gray-300",
					notificationBg: "bg-gray-50 dark:bg-gray-900/30",
					notificationText: "text-gray-700 dark:text-gray-200",
				};
		}
	};

	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			{/* Main Content: Event Timeline */}
			<div className="flex flex-col gap-6">
				{/*  */}

				{/*  */}
				<h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
					<CalendarDays className="h-5 w-5" />
					Event Timeline
				</h2>
				{/*  */}

				{/*  */}
				{/* Cards Grid */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{days.map((d) => {
						const isSelected = selectedDay === d.id;
						const colors = getColorClasses(d.color);
						const base =
							"p-4 rounded-lg border cursor-pointer focus:outline-none transform transition ease-out duration-150";
						const hover =
							"hover:shadow-lg hover:scale-[1.01] hover:-translate-y-0.5";
						const selectedStyle = isSelected
							? `ring-2 ring-blue-500 dark:ring-blue-700 ${colors.border}`
							: colors.border;

						return (
							<div
								key={d.id}
								role="button"
								tabIndex={0}
								onClick={() => setSelectedDay(d.id)}
								onKeyDown={(e) => {
									if (e.key === "Enter") setSelectedDay(d.id);
								}}
								className={`${base} ${colors.bg} ${hover} ${selectedStyle} !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]`}
							>
								<div className="flex items-start justify-between">
									{(() => {
										const baseBadge =
											"inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold transform-gpu";

										if (!isSelected) {
											if (d.color === "green") {
												return (
													<span
														className={`${baseBadge} bg-green-500 text-white`}
													>
														{d.id}
													</span>
												);
											}
											return (
												<span className={`${baseBadge} ${colors.text}`}>
													{d.id}
												</span>
											);
										}
										// Selected badge uses the color-specific selectedBadge class
										return (
											<span className={`${baseBadge} ${colors.selectedBadge}`}>
												{d.id}
											</span>
										);
									})()}
									<span className="text-sm font-medium text-gray-400 dark:text-gray-500">
										{d.items}
									</span>
								</div>

								<div className="mt-2">
									<h3 className="font-bold text-gray-900 dark:text-white">
										{d.title}
									</h3>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										{d.date}
									</p>
								</div>

								<div className="my-3.5 h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700">
									<div
										className={`h-1 rounded-full ${colors.fill}`}
										style={{ width: d.items > 0 ? "25%" : "0%" }}
									/>
								</div>

								<div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
									<span className="flex items-center gap-1.5">
										<List className="h-3.5 w-3.5" /> {d.items} items
									</span>
									<span className="flex items-center gap-1.5">
										<Clock className="h-3.5 w-3.5" /> {d.duration}
									</span>
								</div>
							</div>
						);
					})}
					{/*  */}

					{/*  */}
				</div>
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}
			{/* --- Conditional Schedule Content --- */}
			<div className="flex flex-col gap-6">
				{selectedDayData && (
					<>
						{selectedDayItems.length > 0 ? (
							<ScheduleDetailView
								day={selectedDayData}
								scheduleItems={selectedDayItems}
								onAddItem={handleAddItem}
								onUpdateItem={handleUpdateItem}
								onDeleteItem={handleDeleteItem}
							/>
						) : (
							<EmptyScheduleView
								day={selectedDayData}
								onAddItem={handleAddItem}
							/>
						)}
					</>
				)}
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}
		</div>
	);
}
