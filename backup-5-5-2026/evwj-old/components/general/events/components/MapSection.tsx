"use client";

import { Button } from "@/components/ui/button";
import { Coordinates } from "@/lib/geo";
import { Map } from "lucide-react";
import dynamic from "next/dynamic";
import {
	Suspense,
	useEffect,
	useDeferredValue,
	useMemo,
	useRef,
	useState,
} from "react";
import { EventWithDistance } from "../utils/eventFiltering";

// Dynamically import map to avoid SSR issues with loading fallback
const EventMap = dynamic(() => import("../EventMap"), {
	ssr: false,
	loading: () => (
		<div className="bg-muted flex h-full w-full items-center justify-center rounded-lg">
			<p className="text-muted-foreground">Loading map...</p>
		</div>
	),
});

interface MapSectionProps {
	showMap: boolean;
	onToggleMap: () => void;
	events: EventWithDistance[];
	userLocation: Coordinates | null;
	// highlighted slug to glow on map
	highlightedEventSlug?: string;
	radiusKm?: number;
	anyDistance?: boolean;
}

export default function MapSection({
	showMap,
	onToggleMap,
	events,
	userLocation,
	highlightedEventSlug,
	radiusKm,
	anyDistance,
}: MapSectionProps) {
	// Defer high-frequency hover updates to reduce rerender pressure on the map
	const deferredHighlightedSlug = useDeferredValue(highlightedEventSlug);

	// Stable, memoized events array (prevents deep equality churn in EventMap)
	const stableEvents = useMemo(() => events, [events]);

	const containerRef = useRef<HTMLDivElement>(null);
	const [sizeKey, setSizeKey] = useState("");

	// Track container size and produce a stable key to force Map remount at breakpoints
	useEffect(() => {
		if (!showMap || !containerRef.current) return;

		const el = containerRef.current;

		const ro = new ResizeObserver((entries) => {
			const entry = entries[0];
			if (!entry) return;
			const { width, height } = entry.contentRect;
			// Create a key based on approximate breakpoint ranges
			// This helps force remount when jumping between major breakpoints
			let breakpoint = "base";
			if (width >= 2560)
				breakpoint = "4xl"; // 2560px
			else if (width >= 1920)
				breakpoint = "3xl"; // 1920px
			else if (width >= 1536)
				breakpoint = "2xl"; // 1536px
			else if (width >= 1280)
				breakpoint = "xl"; // 1280px
			else if (width >= 1024) breakpoint = "lg"; // 1024px

			// Only update key when breakpoint changes (not on every pixel change)
			// Round height to nearest 50px to reduce unnecessary remounts
			const roundedHeight = Math.round(height / 50) * 50;
			const key = `${breakpoint}-${roundedHeight}`;
			setSizeKey((prev) => (prev !== key ? key : prev));
		});

		ro.observe(el);
		return () => ro.disconnect();
	}, [showMap]);

	return (
		<div className="flex flex-col gap-4">
			{/* Map Toggle Button (Mobile Only) */}
			<div className="flex justify-center lg:hidden">
				<Button
					variant="outline"
					onClick={onToggleMap}
					className="flex items-center gap-2"
				>
					<Map className="h-4 w-4" />
					{showMap ? "Hide Map" : "Show Map"}
				</Button>
			</div>

			{/* Map */}
			{showMap && (
				<div
					ref={containerRef}
					/* Cap height at 2xl so 1920+ keeps the same height as 1918 */
					className="h-72 w-full overflow-hidden rounded-lg xl:h-[500px] 2xl:h-[700px]"
				>
					<Suspense
						fallback={
							<div className="bg-muted flex h-full w-full items-center justify-center rounded-lg">
								<p className="text-muted-foreground">Loading map...</p>
							</div>
						}
					>
						<EventMap
							key={sizeKey || "initial"} // Force remount on major size changes
							// keep center stable; internal component decides when to setView/fitBounds
							events={stableEvents}
							center={
								userLocation ? [userLocation.lat, userLocation.lng] : undefined
							}
							userLocation={userLocation}
							highlightedEventSlug={deferredHighlightedSlug}
							radiusKm={radiusKm}
							anyDistance={anyDistance}
						/>
					</Suspense>
				</div>
			)}
		</div>
	);
}
