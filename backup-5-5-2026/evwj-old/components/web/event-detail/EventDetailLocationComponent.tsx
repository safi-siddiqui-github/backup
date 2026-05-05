"use client";

import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/mock-events";
import { haversineKm, formatDistanceKm, getUserGeolocation, Coordinates } from "@/lib/geo";
import { MockEventData } from "@/type";
import { MapPin, Navigation, Car, UtensilsCrossed, Train, Layers } from "lucide-react";
import { useMemo, useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
	ssr: false,
});
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
	ssr: false,
});
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
	ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
	ssr: false,
});
const Circle = dynamic(() => import("react-leaflet").then((mod) => mod.Circle), {
	ssr: false,
});
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), {
	ssr: false,
});

type Props = {
	slug?: string;
};

interface POI {
	id: string;
	name: string;
	type: "restaurant" | "parking" | "transit";
	lat: number;
	lng: number;
	distance?: number;
}

// Custom marker icons
const createCustomIcon = (color: string, icon: string) => {
	return L.divIcon({
		className: "custom-marker",
		html: `
			<div style="
				background: ${color};
				width: 32px;
				height: 32px;
				border-radius: 50% 50% 50% 0;
				transform: rotate(-45deg);
				border: 3px solid white;
				box-shadow: 0 2px 8px rgba(0,0,0,0.3);
				display: flex;
				align-items: center;
				justify-content: center;
			">
				<div style="
					transform: rotate(45deg);
					color: white;
					font-size: 16px;
				">${icon}</div>
			</div>
		`,
		iconSize: [32, 32],
		iconAnchor: [16, 32],
	});
};

const venueIcon = createCustomIcon("#8b5cf6", "📍");
const userIcon = createCustomIcon("#3b82f6", "👤");
const restaurantIcon = createCustomIcon("#ef4444", "🍽️");
const parkingIcon = createCustomIcon("#f59e0b", "P");
const transitIcon = createCustomIcon("#10b981", "🚇");

// Fetch nearby POIs using Overpass API
async function fetchNearbyPOIs(
	lat: number,
	lng: number,
	radius: number = 500,
): Promise<POI[]> {
	const pois: POI[] = [];
	const bbox = `${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}`;

	try {
		// Fetch restaurants
		const restaurantQuery = `
			[out:json][timeout:10];
			(
				node["amenity"~"restaurant|cafe|fast_food"](around:${radius},${lat},${lng});
				way["amenity"~"restaurant|cafe|fast_food"](around:${radius},${lat},${lng});
			);
			out center meta;
		`;

		// Fetch parking
		const parkingQuery = `
			[out:json][timeout:10];
			(
				node["amenity"="parking"](around:${radius},${lat},${lng});
				way["amenity"="parking"](around:${radius},${lat},${lng});
			);
			out center meta;
		`;

		// Fetch transit stops
		const transitQuery = `
			[out:json][timeout:10];
			(
				node["public_transport"="stop_position"](around:${radius},${lat},${lng});
				node["highway"="bus_stop"](around:${radius},${lat},${lng});
			);
			out meta;
		`;

		const queries = [
			{ query: restaurantQuery, type: "restaurant" as const, icon: "🍽️" },
			{ query: parkingQuery, type: "parking" as const, icon: "P" },
			{ query: transitQuery, type: "transit" as const, icon: "🚇" },
		];

		// Track if we've been rate limited to avoid making more requests
		let rateLimited = false;

		for (const { query, type, icon } of queries) {
			// Skip remaining requests if we've been rate limited
			if (rateLimited) {
				break;
			}

			try {
				// Add delay between requests to avoid rate limiting
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const response = await fetch("https://overpass-api.de/api/interpreter", {
					method: "POST",
					headers: { "Content-Type": "text/plain" },
					body: query,
				});

				// Check for rate limiting
				if (response.status === 429) {
					rateLimited = true;
					console.warn("Overpass API rate limit reached. Skipping remaining POI requests.");
					break;
				}

				// Check if response is OK and is JSON
				if (!response.ok) {
					console.warn(`Overpass API returned ${response.status} for ${type}`);
					continue;
				}

				// Check content-type before parsing
				const contentType = response.headers.get("content-type");
				if (!contentType || !contentType.includes("application/json")) {
					// Likely an XML error response
					const text = await response.text();
					if (text.includes("<?xml")) {
						console.warn(`Overpass API returned XML error for ${type}. Rate limit may be active.`);
						rateLimited = true;
						break;
					}
					continue;
				}

				const data = await response.json();
				if (data.elements) {
					data.elements.slice(0, 5).forEach((element: any) => {
						const coords = element.center || { lat: element.lat, lon: element.lon };
						if (coords.lat && coords.lon) {
							pois.push({
								id: `${type}-${element.id}`,
								name: element.tags?.name || `${type} ${element.id}`,
								type,
								lat: coords.lat,
								lng: coords.lon,
							});
						}
					});
				}
			} catch (err) {
				// Silently handle errors - POIs are optional
				if (err instanceof Error && err.message.includes("429")) {
					rateLimited = true;
					break;
				}
			}
		}
	} catch (error) {
		console.error("Error fetching POIs:", error);
	}

	return pois;
}

// Calculate route using OSRM (Open Source Routing Machine)
async function calculateRoute(
	start: Coordinates,
	end: Coordinates,
): Promise<Array<[number, number]> | null> {
	try {
		const response = await fetch(
			`https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`,
		);
		const data = await response.json();
		if (data.code === "Ok" && data.routes?.[0]?.geometry?.coordinates) {
			return data.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => [
				lat,
				lng,
			]);
		}
	} catch (error) {
		console.error("Route calculation error:", error);
	}
	return null;
}

// Check if user is in the United States
async function isUserInUS(coords: Coordinates): Promise<boolean> {
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

		const response = await fetch(
			`https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json`,
			{
				headers: {
					"User-Agent": "EventDome/1.0",
				},
				signal: controller.signal,
			},
		);

		clearTimeout(timeoutId);

		if (!response.ok) {
			return false;
		}

		const data = await response.json();
		return data?.address?.country_code === "us";
	} catch (error) {
		// Silently fail - default to metric (kilometers) if we can't determine location
		if (error instanceof Error && error.name !== "AbortError") {
			console.warn("Reverse geocoding error:", error.message);
		}
		return false;
	}
}

// Format distance in miles
function formatDistanceMiles(km: number): string {
	const miles = km * 0.621371;
	if (miles < 0.1) {
		return `${Math.round(miles * 5280)} ft`;
	}
	if (miles < 1) {
		return `${(miles * 5280).toFixed(0)} ft`;
	}
	return `${miles.toFixed(1)} mi`;
}

export default function EventDetailLocationComponent({ slug }: Props) {
	const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
	const [pois, setPois] = useState<POI[]>([]);
	const [route, setRoute] = useState<Array<[number, number]> | null>(null);
	const [showPOIs, setShowPOIs] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [isUS, setIsUS] = useState(false);
	const [mapStyle, setMapStyle] = useState<"default" | "dark" | "satellite">("default");

	const event = useMemo<MockEventData | undefined>(() => {
		if (!slug) return undefined;
		return getAllEvents().find((e) => e.slug === slug);
	}, [slug]);

	// Get user location and check if in US
	useEffect(() => {
		setIsMounted(true);
		getUserGeolocation()
			.then(async (location) => {
				setUserLocation(location);
				if (location) {
					try {
						const inUS = await isUserInUS(location);
						setIsUS(inUS);
					} catch (error) {
						// Silently fail - default to kilometers if we can't determine country
						setIsUS(false);
					}
				}
			})
			.catch(() => {
				// Silently fail if geolocation fails
			});
	}, []);

	// Fetch POIs when event location is available
	useEffect(() => {
		if (event?.latitude && event?.longitude && showPOIs) {
			fetchNearbyPOIs(event.latitude, event.longitude, 500).then((fetchedPOIs) => {
				// Calculate distances
				const poisWithDistance = fetchedPOIs.map((poi) => ({
					...poi,
					distance: haversineKm(
						{ lat: event.latitude!, lng: event.longitude! },
						{ lat: poi.lat, lng: poi.lng },
					),
				}));
				setPois(poisWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0)));
			});
		}
	}, [event?.latitude, event?.longitude, showPOIs]);

	// Calculate route if user location is available
	useEffect(() => {
		if (
			userLocation &&
			event?.latitude &&
			event?.longitude &&
			route === null
		) {
			calculateRoute(userLocation, {
				lat: event.latitude,
				lng: event.longitude,
			}).then(setRoute);
		}
	}, [userLocation, event?.latitude, event?.longitude, route]);

	const getDirectionsUrl = useCallback(() => {
		if (event?.latitude && event?.longitude) {
			return `https://www.google.com/maps/dir/?api=1&destination=${event.latitude},${event.longitude}`;
		}
		return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event?.locationMap || "Venue")}`;
	}, [event]);

	const distance = useMemo(() => {
		if (userLocation && event?.latitude && event?.longitude) {
			return haversineKm(userLocation, {
				lat: event.latitude,
				lng: event.longitude,
			});
		}
		return null;
	}, [userLocation, event?.latitude, event?.longitude]);

	const getTileLayerUrl = () => {
		switch (mapStyle) {
			case "dark":
				return "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
			case "satellite":
				return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
			default:
				return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
		}
	};

	if (!event) {
		return (
			<div className="flex flex-col gap-4">
				<CardTitle className="text-2xl lg:text-3xl">Location</CardTitle>
				<p className="text-muted-foreground">Location information not available.</p>
			</div>
		);
	}

	const venueName = event.locationMap || "Venue";
	const latitude = event.latitude;
	const longitude = event.longitude;

	if (!latitude || !longitude) {
		return (
			<div className="flex flex-col gap-4">
				<CardTitle className="text-2xl lg:text-3xl">Location</CardTitle>
				<p className="text-muted-foreground">Location coordinates not available.</p>
			</div>
		);
	}

	if (!isMounted) {
		return (
			<div className="flex flex-col gap-4">
				<CardTitle className="text-2xl lg:text-3xl">Location</CardTitle>
				<div className="flex h-96 items-center justify-center bg-muted rounded-lg">
					<p className="text-muted-foreground">Loading map...</p>
				</div>
			</div>
		);
	}

	const center: [number, number] = [latitude, longitude];
	const zoom = userLocation ? 13 : 15;

	return (
		<div className="flex flex-col gap-4">
			<CardTitle className="text-2xl lg:text-3xl">Location</CardTitle>

			<div className="flex flex-col gap-2">
				<p className="flex items-center gap-2">
					<MapPin className="size-5 text-primary" />
					<span className="font-medium text-lg">{venueName}</span>
				</p>
				{userLocation && distance !== null && (
					<p className="text-muted-foreground flex items-center gap-2 pl-7">
						<Navigation className="size-4" />
						<span>
							{isUS ? formatDistanceMiles(distance) : formatDistanceKm(distance)} away
						</span>
					</p>
				)}
			</div>

			{/* Map Container */}
			<div className="relative w-full overflow-hidden rounded-lg border h-96">
				<style>{`
					.leaflet-container {
						height: 100%;
						width: 100%;
						z-index: 0;
					}
					.custom-marker {
						background: transparent !important;
						border: none !important;
					}
				`}</style>

				<MapContainer
					center={center}
					zoom={zoom}
					style={{ height: "100%", width: "100%" }}
					scrollWheelZoom={true}
					className="z-0"
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
						url={getTileLayerUrl()}
					/>

					{/* Venue Marker */}
					<Marker position={center} icon={venueIcon}>
						<Popup>
							<div className="flex flex-col gap-2">
								<p className="font-semibold">{venueName}</p>
								<p className="text-sm text-muted-foreground">
									{latitude.toFixed(6)}, {longitude.toFixed(6)}
								</p>
								<a
									href={getDirectionsUrl()}
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary hover:underline text-sm"
								>
									Get Directions →
								</a>
							</div>
						</Popup>
					</Marker>

					{/* User Location Marker */}
					{userLocation && (
						<>
							<Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
									<Popup>
										<div className="flex flex-col gap-2">
											<p className="font-semibold">Your Location</p>
											{distance !== null && (
												<p className="text-sm text-muted-foreground">
													{isUS ? formatDistanceMiles(distance) : formatDistanceKm(distance)} to venue
												</p>
											)}
										</div>
									</Popup>
							</Marker>
							<Circle
								center={[userLocation.lat, userLocation.lng]}
								radius={100}
								pathOptions={{ color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.1 }}
							/>
						</>
					)}

					{/* Route Line */}
					{route && (
						<Polyline
							positions={route}
							pathOptions={{ color: "#8b5cf6", weight: 4, opacity: 0.7 }}
						/>
					)}

					{/* POI Markers */}
					{showPOIs &&
						pois.map((poi) => {
							let icon = restaurantIcon;
							if (poi.type === "parking") icon = parkingIcon;
							if (poi.type === "transit") icon = transitIcon;

							return (
								<Marker key={poi.id} position={[poi.lat, poi.lng]} icon={icon}>
									<Popup>
										<div className="flex flex-col gap-1">
											<p className="font-semibold text-sm">{poi.name}</p>
											<p className="text-xs text-muted-foreground capitalize">{poi.type}</p>
											{poi.distance && (
												<p className="text-xs text-muted-foreground">
													{isUS ? formatDistanceMiles(poi.distance) : formatDistanceKm(poi.distance)} away
												</p>
											)}
										</div>
									</Popup>
								</Marker>
							);
						})}
				</MapContainer>

				{/* Map Controls Overlay */}
				<div className="absolute bottom-4 right-4 flex flex-col gap-2 z-[1000]">
					<Button
						variant="secondary"
						size="sm"
						onClick={() => setMapStyle(mapStyle === "default" ? "dark" : mapStyle === "dark" ? "satellite" : "default")}
						className="!bg-white dark:!bg-[#020617] backdrop-blur-sm shadow-lg hover:bg-gray-50 dark:hover:bg-slate-800 text-foreground border border-gray-200 dark:border-slate-600"
					>
						<Layers className="size-4 mr-2" />
						<span className="hidden sm:inline">
							{mapStyle === "default" ? "Default" : mapStyle === "dark" ? "Dark" : "Satellite"}
						</span>
					</Button>
					<Button
						variant="secondary"
						size="sm"
						onClick={() => setShowPOIs(!showPOIs)}
						className="!bg-white dark:!bg-[#020617] backdrop-blur-sm shadow-lg hover:bg-gray-50 dark:hover:bg-slate-800 text-foreground border border-gray-200 dark:border-slate-600"
					>
						{showPOIs ? (
							<>
								<MapPin className="size-4 mr-2" />
								<span className="hidden sm:inline">Hide POIs</span>
							</>
						) : (
							<>
								<MapPin className="size-4 mr-2" />
								<span className="hidden sm:inline">Show POIs</span>
							</>
						)}
					</Button>
					<a
						href={getDirectionsUrl()}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm px-3 py-2 shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:bg-gray-50 dark:hover:bg-slate-800 text-sm font-semibold text-foreground border border-gray-200 dark:border-slate-600"
					>
						<Navigation className="size-4 text-primary" />
						<span>Directions</span>
					</a>
				</div>

				{/* POI Legend */}
				{showPOIs && pois.length > 0 && (
					<div className="absolute top-4 left-4 !bg-white dark:!bg-[#020617] backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000] border border-gray-200 dark:border-slate-600">
						<p className="text-xs font-semibold mb-2 text-foreground">Nearby</p>
						<div className="flex flex-col gap-1 text-xs">
							<div className="flex items-center gap-2">
								<UtensilsCrossed className="size-3 text-red-500 dark:text-red-400" />
								<span className="text-foreground">Restaurants ({pois.filter((p) => p.type === "restaurant").length})</span>
							</div>
							<div className="flex items-center gap-2">
								<Car className="size-3 text-amber-500 dark:text-amber-400" />
								<span className="text-foreground">Parking ({pois.filter((p) => p.type === "parking").length})</span>
							</div>
							<div className="flex items-center gap-2">
								<Train className="size-3 text-green-500 dark:text-green-400" />
								<span className="text-foreground">Transit ({pois.filter((p) => p.type === "transit").length})</span>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
