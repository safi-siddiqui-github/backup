"use client";

import { cn } from "@/lib/utils";

interface CircularProgressProps {
	value: number; // 0-100
	size?: number;
	strokeWidth?: number;
	showValue?: boolean;
	color?: string;
	className?: string;
}

export function CircularProgress({
	value,
	size = 80,
	strokeWidth = 6,
	showValue = false,
	color = "hsl(var(--primary))",
	className,
}: CircularProgressProps) {
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (value / 100) * circumference;

	return (
		<div
			className={cn(
				"relative inline-flex items-center justify-center",
				className,
			)}
		>
			<svg width={size} height={size} className="transform -rotate-90">
				{/* Background circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke="currentColor"
					strokeWidth={strokeWidth}
					fill="none"
					className="text-muted/20"
				/>
				{/* Progress circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke={color}
					strokeWidth={strokeWidth}
					fill="none"
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="round"
					className="transition-all duration-300 ease-out"
				/>
			</svg>
			{showValue && (
				<div className="absolute inset-0 flex items-center justify-center">
					<span className="text-xs font-semibold">{Math.round(value)}%</span>
				</div>
			)}
		</div>
	);
}
