export interface CityData {
	name: string;
	oneLiner: string;
	imageUrl: string; // Unsplash URL or path to city image
}

export const CITY_DATA: Record<string, CityData> = {
	"New York": {
		name: "New York",
		oneLiner: "The city that never sleeps",
		imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1920&q=80",
	},
	"San Francisco": {
		name: "San Francisco",
		oneLiner: "Golden Gate to innovation",
		imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&q=80",
	},
};

// Default city (can be changed based on user location or preferences)
export const DEFAULT_CITY: CityData = CITY_DATA["New York"];

