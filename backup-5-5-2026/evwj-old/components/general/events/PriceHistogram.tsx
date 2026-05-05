"use client";

import { ChartContainer } from "@/components/ui/chart";
import { MockEventData } from "@/type";
import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { Bar, BarChart, Cell } from "recharts";

interface PriceHistogramProps {
	readonly events: MockEventData[];
	readonly minPrice: number;
	readonly maxPrice: number;
	readonly className?: string;
	readonly selectedMin?: number;
	readonly selectedMax?: number;
}

interface HistogramBucket {
	readonly range: number;
	readonly start: number;
	readonly end: number;
	readonly center: number;
	count: number;
	readonly inRange: boolean;
}

export default function PriceHistogram({
	events,
	minPrice,
	maxPrice,
	className = "",
	selectedMin,
	selectedMax,
}: PriceHistogramProps) {
	const [isVisible, setIsVisible] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// ResizeObserver to fix the chart warning
	const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
		const entry = entries[0];
		if (!entry) return;

		const { width, height } = entry.contentRect;
		setIsVisible(width > 0 && height > 0);
	}, []);

	// Check if container is visible and has dimensions
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const observer = new ResizeObserver(handleResize);
		observer.observe(container);

		return () => {
			observer.disconnect();
		};
	}, [handleResize]);

	const histogramData = useMemo((): HistogramBucket[] => {
		const bucketCount = 20;
		const bucketSize = (maxPrice - minPrice) / bucketCount;

		if (bucketSize <= 0) {
			return [];
		}

		const buckets: HistogramBucket[] = Array.from(
			{ length: bucketCount },
			(_, i) => {
				const start = minPrice + i * bucketSize;
				const end = start + bucketSize;
				const center = (start + end) / 2;
				const inRange =
					selectedMin !== undefined && selectedMax !== undefined
						? center >= selectedMin && center <= selectedMax
						: true;
				return {
					range: start,
					start,
					end,
					center,
					count: 0,
					inRange,
				};
			},
		);

		events.forEach((event) => {
			const bucketIndex = Math.min(
				Math.floor((event.price - minPrice) / bucketSize),
				bucketCount - 1,
			);
			if (bucketIndex >= 0 && bucketIndex < bucketCount) {
				buckets[bucketIndex].count += 1;
			}
		});

		return buckets;
	}, [events, minPrice, maxPrice, selectedMin, selectedMax]);

	const chartConfig = useMemo(
		() => ({
			count: {
				label: "Events",
				color: "hsl(var(--primary))",
			},
		}),
		[],
	);

	return (
		<div className={className}>
			<div
				ref={containerRef}
				className="h-16 w-full min-w-[200px] min-h-[64px]"
			>
				{isVisible && histogramData.length > 0 ? (
					<ChartContainer config={chartConfig} className="h-full w-full">
						<BarChart
							data={histogramData}
							margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
						>
							<Bar dataKey="count" fill="#7C3AED" radius={[0, 0, 0, 0]}>
								{histogramData.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={entry.inRange ? "#7C3AED" : "#E5E7EB"}
									/>
								))}
							</Bar>
						</BarChart>
					</ChartContainer>
				) : (
					<div className="h-full w-full bg-muted animate-pulse rounded flex items-center justify-center">
						<span className="text-muted-foreground text-sm">
							{histogramData.length === 0
								? "No data available"
								: "Loading chart..."}
						</span>
					</div>
				)}
			</div>
		</div>
	);
}
