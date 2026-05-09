import { useState, useEffect } from "react";
import { Coordinates, getUserGeolocation } from "@/lib/geo";

export function useUserLocation() {
	const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
	const [locationPermissionDenied, setLocationPermissionDenied] =
		useState(false);

	// Don't automatically request location on mount - wait for user interaction
	// This prevents NotAllowedError from appearing in console
	useEffect(() => {
		// Only attempt to get location if user has previously granted permission
		// or if explicitly requested via retryLocation
		// For now, we'll skip automatic location request to avoid permission errors
	}, []);

	const retryLocation = () => {
		setLocationPermissionDenied(false);
		getUserGeolocation()
			.then((coords) => {
				if (coords) {
					setUserLocation(coords);
				} else {
					setLocationPermissionDenied(true);
				}
			})
			.catch(() => {
				setLocationPermissionDenied(true);
			});
	};

	return {
		userLocation,
		locationPermissionDenied,
		retryLocation,
	};
}
