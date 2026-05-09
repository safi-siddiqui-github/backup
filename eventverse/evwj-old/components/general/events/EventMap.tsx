"use client";

import { haversineKm } from "@/lib/geo";
import { MockEventData } from "@/type";
import L, { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, {
	memo,
	useEffect,
	useMemo,
	useRef,
	useState,
	useCallback,
	ReactNode,
} from "react";
import {
	Circle,
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
} from "react-leaflet";
import EventMapPopupCard from "./EventMapPopupCard";

/** -------------------- Types -------------------- */
interface EventMapProps {
	events: MockEventData[];
	center?: [number, number];
	zoom?: number;
	highlightedEventSlug?: string;
	onEventClick?: (event: MockEventData) => void;
	userLocation?: { lat: number; lng: number } | null;
	radiusKm?: number;
	anyDistance?: boolean;
}

/** -------------------- Utilities -------------------- */
const coordsKey = (coords: Array<[number, number]>) =>
	coords.length === 0 ? "" : JSON.stringify(coords);

function throttle<T extends (...args: unknown[]) => void>(fn: T, ms: number) {
	let last = 0;
	let timer: number | null = null;
	let lastArgs: Parameters<T> | null = null;
	return (...args: Parameters<T>) => {
		const now = Date.now();
		lastArgs = args;
		if (now - last >= ms) {
			last = now;
			fn(...args);
		} else if (timer == null) {
			timer = window.setTimeout(
				() => {
					timer = null;
					last = Date.now();
					if (lastArgs) fn(...(lastArgs as Parameters<T>));
				},
				ms - (now - last),
			);
		}
	};
}

/** -------------------- Icon Cache -------------------- */
const iconCache = new Map<string, L.DivIcon>();

function getPriceBucket(price: number) {
	return Math.max(0, Math.floor(price / 10) * 10);
}

function getPriceIcon(
	price: number,
	isHighlighted: boolean = false,
): L.DivIcon {
	const bucket = getPriceBucket(price);
	const key = `${bucket}-${isHighlighted ? "1" : "0"}`;
	const cached = iconCache.get(key);
	if (cached) return cached;

	const icon = L.divIcon({
		className: "custom-price-marker",
		html: `
      <div style="
        background: ${isHighlighted ? "#895bf5" : "#ffffff"};
        color: ${isHighlighted ? "#ffffff" : "#000000"};
        padding: 4px 8px;
        border-radius: 16px;
        font-weight: 600;
        font-size: 12px;
        border: 2px solid ${isHighlighted ? "#2563eb" : "#e5e7eb"};
        box-shadow: ${
					isHighlighted
						? "0 0 0 4px rgb(137, 91, 245, 0.28), 0 10px 20px rgba(0,0,0,0.25)"
						: "0 2px 4px rgba(0,0,0,0.1)"
				};
        transform: ${isHighlighted ? "scale(1.08)" : "scale(1)"};
        transition: box-shadow 120ms ease, transform 120ms ease, background 120ms ease, color 120ms ease, border-color 120ms ease;
        white-space: nowrap;
      ">
        $${bucket}
      </div>
    `,
		iconSize: [60, 30],
		iconAnchor: [30, 30],
	});

	iconCache.set(key, icon);
	return icon;
}

/** -------------------- DOM helpers (typed) -------------------- */
function getMapContainer(map: LeafletMap | null): HTMLElement | null {
	if (!map) return null;
	try {
		return map.getContainer();
	} catch {
		return null;
	}
}

function containerInDOM(el: HTMLElement | null): boolean {
	return !!(el && document.body.contains(el));
}

function containerHasBox(el: HTMLElement | null): boolean {
	if (!el) return false;
	const r = el.getBoundingClientRect();
	return r.width > 0 && r.height > 0;
}

/** -------------------- Gate until Leaflet signals ready -------------------- */
function MapReadyGate({ children }: { children: ReactNode }) {
	const map = useMap();
	const [ready, setReady] = useState(false);

	useEffect(() => {
		let cancelled = false;
		map.whenReady(() => {
			if (!cancelled) setReady(true);
		});
		return () => {
			cancelled = true;
		};
	}, [map]);

	return ready ? <>{children}</> : null;
}

/** -------------------- Invalidate Size (only when visible) -------------------- */
function InvalidateOnResize() {
	const map = useMap();
	const alive = useRef(true);
	useEffect(
		() => () => {
			alive.current = false;
		},
		[],
	);

	const invalidateSafely = useCallback(() => {
		const el = getMapContainer(map);
		if (!alive.current || !el || !containerInDOM(el) || !containerHasBox(el))
			return;

		const pass = () => {
			const again = getMapContainer(map);
			if (
				!alive.current ||
				!again ||
				!containerInDOM(again) ||
				!containerHasBox(again)
			)
				return;
			try {
				map.invalidateSize(false);
			} catch {
				/* ignore */
			}
		};

		pass();
		requestAnimationFrame(pass);
		window.setTimeout(pass, 120);
	}, [map]);

	useEffect(() => {
		const el = getMapContainer(map);
		if (!el) return;

		const ro = new ResizeObserver(() => invalidateSafely());
		ro.observe(el);

		const onWinResize = () => invalidateSafely();
		window.addEventListener("resize", onWinResize);

		const t0 = window.setTimeout(invalidateSafely, 0);
		const t1 = window.setTimeout(invalidateSafely, 300);

		return () => {
			window.clearTimeout(t0);
			window.clearTimeout(t1);
			ro.disconnect();
			window.removeEventListener("resize", onWinResize);
		};
	}, [map, invalidateSafely]);

	return null;
}

/** -------------------- FitBounds (throttled, guarded) -------------------- */
function FitBounds({ events }: { events: MockEventData[] }) {
	const map = useMap();

	const validCoords = useMemo(
		() =>
			events
				.filter((e) => e.latitude && e.longitude)
				.map((e) => [e.latitude!, e.longitude!] as [number, number]),
		[events],
	);

	const key = useMemo(() => coordsKey(validCoords), [validCoords]);

	const doFit = useMemo(
		() =>
			throttle((...args: unknown[]) => {
				// Coerce arguments to expected coords shape
				const coords = (Array.isArray(args[0]) ? args[0] : []) as Array<
					[number, number]
				>;
				const el = getMapContainer(map);
				if (
					!el ||
					!containerInDOM(el) ||
					!containerHasBox(el) ||
					coords.length === 0
				)
					return;

				const run = () => {
					const elNow = getMapContainer(map);
					if (!elNow || !containerInDOM(elNow) || !containerHasBox(elNow))
						return;
					if (coords.length === 1) {
						map.setView(coords[0], Math.max(map.getZoom() || 4, 12), {
							animate: false,
						});
					} else {
						const bounds = L.latLngBounds(coords);
						map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
					}
				};

				try {
					run();
				} catch {
					requestAnimationFrame(() => {
						try {
							run();
						} catch {
							/* ignore */
						}
					});
				}
			}, 220),
		[map],
	);

	useEffect(() => {
		doFit(validCoords);
	}, [key, doFit, validCoords]);

	return null;
}

/** -------------------- Marker (memoized) -------------------- */
const PriceMarker = memo(function PriceMarker({
	event,
	highlighted,
	onClick,
	userLocation,
}: {
	event: MockEventData;
	highlighted: boolean;
	onClick?: (e: MockEventData) => void;
	userLocation?: { lat: number; lng: number } | null;
}) {
	const icon = useMemo(
		() => getPriceIcon(event.price, highlighted),
		[event.price, highlighted],
	);

	const popupRef = useRef<L.Popup>(null);

	const distanceKm =
		event.latitude && event.longitude && userLocation
			? haversineKm(userLocation, {
					lat: event.latitude,
					lng: event.longitude,
				})
			: undefined;

	const zIndexOffset = highlighted ? 1000 : 0;

	const handleClick = useCallback(() => onClick?.(event), [event, onClick]);

	return (
		<Marker
			position={[event.latitude!, event.longitude!] as [number, number]}
			icon={icon}
			zIndexOffset={zIndexOffset}
			eventHandlers={{ click: handleClick }}
		>
			<Popup
				ref={popupRef}
				maxWidth={260}
				minWidth={240}
				className="custom-popup"
			>
				<EventMapPopupCard
					onClose={() => popupRef.current?.close()}
					event={event}
					distanceKm={distanceKm}
				/>
			</Popup>
		</Marker>
	);
});

/** -------------------- Mount Gate: wait for stable container size -------------------- */
function UseContainerSizeGate({ children }: { children: ReactNode }) {
	const hostRef = useRef<HTMLDivElement>(null);
	const [hasSize, setHasSize] = useState(false);

	useEffect(() => {
		const el = hostRef.current;
		if (!el) return;

		let stable = false;
		let rafId = 0;

		const check = () => {
			const r = el.getBoundingClientRect();
			const ok = r.width > 0 && r.height > 0;
			if (ok) {
				if (!stable) {
					stable = true;
					rafId = requestAnimationFrame(check);
					return;
				}
				setHasSize(true);
				return;
			}
			rafId = requestAnimationFrame(check);
		};

		rafId = requestAnimationFrame(check);
		return () => {
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, []);

	return (
		<div ref={hostRef} className="h-full w-full">
			{hasSize ? (
				children
			) : (
				<div className="bg-muted flex h-full w-full items-center justify-center rounded-lg">
					<p className="text-muted-foreground">Preparing map…</p>
				</div>
			)}
		</div>
	);
}

/** -------------------- Main Map -------------------- */
const EventMap = memo(function EventMap({
	events,
	center = [20, 0],
	zoom = 4,
	highlightedEventSlug,
	onEventClick,
	userLocation,
	radiusKm = 50,
	anyDistance = true,
}: EventMapProps) {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => setIsMounted(true), []);

	const eventsWithCoords = useMemo(
		() => events.filter((e) => e.latitude && e.longitude),
		[events],
	);

	if (!isMounted) {
		return (
			<div className="bg-muted flex h-full w-full items-center justify-center rounded-lg">
				<p className="text-muted-foreground">Loading map...</p>
			</div>
		);
	}

	return (
		<>
			<style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          background: transparent;
          box-shadow: none;
          padding: 0;
          border-radius: 0;
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
          padding: 0;
          background: transparent;
        }
        .custom-popup .leaflet-popup-tip {
          background: transparent;
          border: none;
          box-shadow: none;
        }
        .custom-popup .leaflet-popup-close-button {
          display: none;
        }
        .leaflet-container {
          height: 100%;
          width: 100%;
          display: block;
          background: transparent;
        }
      `}</style>

			<UseContainerSizeGate>
				<MapContainer
					center={center}
					zoom={zoom}
					style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
					scrollWheelZoom={false}
					className="z-0"
					preferCanvas={false}
					zoomAnimation={false} // avoid transition end path
					fadeAnimation={false} // extra guard
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					<MapReadyGate>
						<InvalidateOnResize />

						{userLocation && !anyDistance && radiusKm > 0 && (
							<Circle
								center={[userLocation.lat, userLocation.lng]}
								radius={radiusKm * 1000}
								pathOptions={{
									color: "#895bf5",
									fillColor: "#895bf5",
									fillOpacity: 0.1,
									weight: 2,
								}}
							/>
						)}

						<FitBounds events={eventsWithCoords} />

						{eventsWithCoords.map((event) => {
							const highlighted = highlightedEventSlug === event.slug;
							return (
								<PriceMarker
									key={event.slug}
									event={event}
									highlighted={!!highlighted}
									onClick={onEventClick}
									userLocation={userLocation ?? undefined}
								/>
							);
						})}
					</MapReadyGate>
				</MapContainer>
			</UseContainerSizeGate>
		</>
	);
});

export default EventMap;
