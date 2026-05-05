"use client";

import React from "react";
import ScheduleCard from "./ScheduleCard";
import type { TimeSlot } from "./types";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Icons
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
	timeslot: TimeSlot;
	density: "low" | "high";
	onEdit?: (s: unknown) => void;
	onDelete?: (s: unknown) => void;
	onClick?: (s: unknown) => void;
};

export default function TimeSlotGroup({
	timeslot,
	density,
	onEdit,
	onDelete,
	onClick,
}: Props) {
	if (density === "high") {
		return (
			<div className="pt-4">
				<div className="relative group">
					{/* Header */}
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-900/50 rounded-full">
							<span className="font-bold text-red-700 dark:text-red-300">
								{timeslot.label}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-sm text-gray-600 dark:text-gray-300">
								{timeslot.concurrentSessions} sessions
							</span>
						</div>
					</div>

					{/* Custom Navigation Buttons (only visible on hover) */}
					<button
						className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full 
            bg-gray-200/80 dark:bg-gray-700/70 hover:bg-gray-300 dark:hover:bg-gray-600 transition opacity-0 group-hover:opacity-100
            md:w-10 md:h-10"
					>
						<ChevronLeft className="w-4 h-4 text-gray-700 dark:text-gray-200 md:w-5 md:h-5" />
					</button>

					<button
						className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full 
            bg-gray-200/80 dark:bg-gray-700/70 hover:bg-gray-300 dark:hover:bg-gray-600 transition opacity-0 group-hover:opacity-100
            md:w-10 md:h-10"
					>
						<ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-200 md:w-5 md:h-5" />
					</button>

					{/* Swiper Slider */}
					<Swiper
						modules={[Navigation, Keyboard, A11y]}
						navigation={{
							nextEl: ".swiper-button-next-custom",
							prevEl: ".swiper-button-prev-custom",
						}}
						keyboard={{ enabled: true }}
						spaceBetween={16}
						slidesPerView={"auto"}
						a11y={{ enabled: true }}
						className="py-3"
					>
						{timeslot.sessions.map((s) => (
							<SwiperSlide
								key={s.id}
								style={{ width: "18rem" }}
								className="h-auto"
							>
								<div className="mx-2">
									<ScheduleCard
										session={s}
										density="high"
										onEdit={() => onEdit?.(s)}
										onDelete={() => onDelete?.(s)}
										onClick={() => onClick?.(s)}
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		);
	}

	// Low density
	if (timeslot.sessions.length === 1) {
		return (
			<div>
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-900/50 rounded-full">
						<span className="font-bold text-red-700 dark:text-red-300">
							{timeslot.label}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-sm text-gray-600 dark:text-gray-300">
							{timeslot.concurrentSessions} sessions
						</span>
					</div>
				</div>
				<ScheduleCard
					session={timeslot.sessions[0]}
					density="low"
					onEdit={() => onEdit?.(timeslot.sessions[0])}
					onDelete={() => onDelete?.(timeslot.sessions[0])}
					onClick={() => onClick?.(timeslot.sessions[0])}
				/>
			</div>
		);
	}

	return (
		<div
			className={`grid grid-cols-1 ${
				timeslot.sessions.length === 2 ? "md:grid-cols-2" : "lg:grid-cols-2"
			} gap-6`}
		>
			{timeslot.sessions.map((s) => (
				<ScheduleCard
					key={s.id}
					session={s}
					density="low"
					onEdit={() => onEdit?.(s)}
					onDelete={() => onDelete?.(s)}
					onClick={() => onClick?.(s)}
				/>
			))}
		</div>
	);
}
