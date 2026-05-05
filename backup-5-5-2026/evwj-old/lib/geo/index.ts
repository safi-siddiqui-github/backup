export interface Coordinates {
	lat: number;
	lng: number;
}

/**
 * Convert degrees to radians
 */
function toRad(degrees: number): number {
	return (degrees * Math.PI) / 180;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param a - First coordinate
 * @param b - Second coordinate
 * @returns Distance in kilometers
 */
export function haversineKm(a: Coordinates, b: Coordinates): number {
	const R = 6371; // Earth's radius in kilometers
	const dLat = toRad(b.lat - a.lat);
	const dLon = toRad(b.lng - a.lng);
	const lat1 = toRad(a.lat);
	const lat2 = toRad(b.lat);

	const h =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
	return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * Format distance in kilometers to a readable string
 * @param km - Distance in kilometers
 * @returns Formatted distance string
 */
export function formatDistanceKm(km: number): string {
	if (km < 1) {
		return `${Math.round(km * 1000)} m`;
	}
	return `${km.toFixed(1)} km`;
}

/**
 * Get user's current geolocation
 * @returns Promise with user coordinates or null if denied/unavailable
 */
export function getUserGeolocation(): Promise<Coordinates | null> {
	return new Promise((resolve) => {
		if (!navigator.geolocation) {
			resolve(null);
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			},
			(error) => {
				// Silently handle all geolocation errors - don't log to console
				// This prevents NotAllowedError from appearing in console
				// PERMISSION_DENIED = 1, POSITION_UNAVAILABLE = 2, TIMEOUT = 3
				resolve(null);
			},
			{
				timeout: 10000,
				maximumAge: 300000, // Cache for 5 minutes
			},
		);
	});
}

/**
 * Simple geocoding cache using localStorage
 */
const GEOCODE_CACHE_KEY = "geocode_cache";

interface GeocodeCache {
	[location: string]: Coordinates;
}

function getGeocodeCache(): GeocodeCache {
	try {
		const cached = localStorage.getItem(GEOCODE_CACHE_KEY);
		return cached ? JSON.parse(cached) : {};
	} catch {
		return {};
	}
}

function setGeocodeCache(cache: GeocodeCache): void {
	try {
		localStorage.setItem(GEOCODE_CACHE_KEY, JSON.stringify(cache));
	} catch {
		// Silently fail if localStorage is unavailable
	}
}

/**
 * Geocode a location string to coordinates using Nominatim (OpenStreetMap)
 * Caches results in localStorage
 * @param locationMap - Location string to geocode
 * @returns Promise with coordinates or null if geocoding fails
 */
export async function geocodeLocation(
	locationMap: string,
): Promise<Coordinates | null> {
	if (!locationMap) return null;

	// Check cache first
	const cache = getGeocodeCache();
	if (cache[locationMap]) {
		return cache[locationMap];
	}

	try {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
				locationMap,
			)}&format=json&limit=1`,
			{
				headers: {
					"User-Agent": "EventDome/1.0",
				},
			},
		);

		const data = await response.json();

		if (data && data.length > 0) {
			const coords: Coordinates = {
				lat: parseFloat(data[0].lat),
				lng: parseFloat(data[0].lon),
			};

			// Cache the result
			cache[locationMap] = coords;
			setGeocodeCache(cache);

			return coords;
		}

		return null;
	} catch (error) {
		console.error("Geocoding error:", error);
		return null;
	}
}
