"use client";

import React, { useEffect, useState } from "react";
import {
	Building2,
	Star,
	ArrowLeft,
	Trophy,
	TrendingUp,
	Gamepad2,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for cleaner tailwind classes
function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// --- Custom Hook for Counting Animation ---
const useCountingNumber = (end: number, duration: number = 2000) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		let startTime: number | null = null;
		let animationFrameId: number;

		const step = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / duration, 1);

			// Ease out quart function for smooth landing
			const easeOutQuart = 1 - Math.pow(1 - progress, 4);

			setCount(Math.floor(easeOutQuart * end));

			if (progress < 1) {
				animationFrameId = requestAnimationFrame(step);
			}
		};

		animationFrameId = requestAnimationFrame(step);

		return () => cancelAnimationFrame(animationFrameId);
	}, [end, duration]);

	return count;
};

const StatItem = ({
	icon: Icon,
	value,
	label,
	prefix = "",
	delay = 0,
}: {
	icon: React.ElementType;
	value: number;
	label: string;
	prefix?: string;
	delay?: number;
}) => {
	const count = useCountingNumber(value, 2000);

	return (
		<div className="flex flex-col items-center justify-center px-6 first:pl-0 last:pr-0 border-r border-white/20 last:border-r-0 dark:border-white/10">
			<div className="flex items-center gap-2 mb-1">
				<Icon className="w-5 h-5 text-white/80" strokeWidth={2} />
				<span className="text-2xl font-bold text-white">
					{prefix}
					{count}
				</span>
			</div>
			<span className="text-xs font-medium text-blue-100/80 uppercase tracking-wide">
				{label}
			</span>
		</div>
	);
};

export default function EventHeader() {
	return (
		<div className="w-full min-h-[220px] bg-[#070b1c] p-6 flex items-center justify-center font-sans dark:bg-transparent">
			<div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
				<div className="flex flex-col md:flex-row gap-6 w-full lg:w-auto pt-4">
					{/* Building Icon Circle */}
					<div className=" shrink-0">
						<div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/10">
							<Building2 className="w-10 h-10 text-white" />
						</div>
					</div>

					{/* Text Content */}
					<div className="flex flex-col gap-2">
						{/* Title */}
						<h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 flex-wrap">
							<Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
							TEST EVENT - Guest Module Showcase
						</h1>

						{/* Greeting & Date */}
						<div className="text-blue-50 space-y-1">
							<p className="text-lg font-medium flex items-center gap-2">
								Welcome back, Guest!{" "}
								<span className="animate-pulse text-xl">👋</span>
							</p>
							<p className="text-sm text-blue-200/90">
								December 1, 2025 • 9:00 AM
							</p>
						</div>

						{/* Tags & Buttons Row */}
						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-2">
							{/* Tags */}
							<div className="flex gap-2 mb-2 sm:mb-0">
								<span className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-bold shadow-sm">
									Test Track 1
								</span>
								<span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-sm">
									Test Track 2
								</span>
							</div>

							<div className="hidden sm:block h-6 w-px bg-white/20 mx-1"></div>

							{/* Buttons */}
							<div className="flex gap-3 w-full sm:w-auto">
								<button className="group flex items-center gap-2 px-4 py-1.5 rounded-lg border border-white/30 hover:bg-white/10 transition-all text-sm font-medium text-white">
									<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
									Back to Events
								</button>
								<button className="px-6 py-1.5 rounded-lg border border-white/30 hover:bg-white/10 transition-all text-sm font-medium text-white">
									Exit
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* RIGHT SIDE: Stats Panel */}
				<div className="w-full lg:w-auto">
					<div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex justify-between min-w-[340px] shadow-xl dark:bg-[#090a11] dark:border-0">
						{/* Points */}
						<StatItem icon={Trophy} value={850} label="Points" />

						{/* Rank */}
						<StatItem icon={TrendingUp} value={8} label="Rank" prefix="#" />

						{/* Live Games */}
						<StatItem icon={Gamepad2} value={6} label="Live Games" />
					</div>
				</div>
			</div>
		</div>
	);
}
