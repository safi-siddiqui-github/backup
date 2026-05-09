export type Country = {
	code: string;
	name: string;
};

export type State = {
	code: string;
	name: string;
	countryCode: string;
};

export type City = {
	name: string;
	stateCode: string;
	countryCode: string;
};

export const MOCK_COUNTRIES: Country[] = [
	{ code: "US", name: "United States" },
	{ code: "CA", name: "Canada" },
	{ code: "MX", name: "Mexico" },
	{ code: "GB", name: "United Kingdom" },
];

export const MOCK_STATES: State[] = [
	// United States
	{ code: "AL", name: "Alabama", countryCode: "US" },
	{ code: "AK", name: "Alaska", countryCode: "US" },
	{ code: "AZ", name: "Arizona", countryCode: "US" },
	{ code: "AR", name: "Arkansas", countryCode: "US" },
	{ code: "CA", name: "California", countryCode: "US" },
	{ code: "CO", name: "Colorado", countryCode: "US" },
	{ code: "CT", name: "Connecticut", countryCode: "US" },
	{ code: "DE", name: "Delaware", countryCode: "US" },
	{ code: "FL", name: "Florida", countryCode: "US" },
	{ code: "GA", name: "Georgia", countryCode: "US" },
	{ code: "HI", name: "Hawaii", countryCode: "US" },
	{ code: "ID", name: "Idaho", countryCode: "US" },
	{ code: "IL", name: "Illinois", countryCode: "US" },
	{ code: "IN", name: "Indiana", countryCode: "US" },
	{ code: "IA", name: "Iowa", countryCode: "US" },
	{ code: "KS", name: "Kansas", countryCode: "US" },
	{ code: "KY", name: "Kentucky", countryCode: "US" },
	{ code: "LA", name: "Louisiana", countryCode: "US" },
	{ code: "ME", name: "Maine", countryCode: "US" },
	{ code: "MD", name: "Maryland", countryCode: "US" },
	{ code: "MA", name: "Massachusetts", countryCode: "US" },
	{ code: "MI", name: "Michigan", countryCode: "US" },
	{ code: "MN", name: "Minnesota", countryCode: "US" },
	{ code: "MS", name: "Mississippi", countryCode: "US" },
	{ code: "MO", name: "Missouri", countryCode: "US" },
	{ code: "MT", name: "Montana", countryCode: "US" },
	{ code: "NE", name: "Nebraska", countryCode: "US" },
	{ code: "NV", name: "Nevada", countryCode: "US" },
	{ code: "NH", name: "New Hampshire", countryCode: "US" },
	{ code: "NJ", name: "New Jersey", countryCode: "US" },
	{ code: "NM", name: "New Mexico", countryCode: "US" },
	{ code: "NY", name: "New York", countryCode: "US" },
	{ code: "NC", name: "North Carolina", countryCode: "US" },
	{ code: "ND", name: "North Dakota", countryCode: "US" },
	{ code: "OH", name: "Ohio", countryCode: "US" },
	{ code: "OK", name: "Oklahoma", countryCode: "US" },
	{ code: "OR", name: "Oregon", countryCode: "US" },
	{ code: "PA", name: "Pennsylvania", countryCode: "US" },
	{ code: "RI", name: "Rhode Island", countryCode: "US" },
	{ code: "SC", name: "South Carolina", countryCode: "US" },
	{ code: "SD", name: "South Dakota", countryCode: "US" },
	{ code: "TN", name: "Tennessee", countryCode: "US" },
	{ code: "TX", name: "Texas", countryCode: "US" },
	{ code: "UT", name: "Utah", countryCode: "US" },
	{ code: "VT", name: "Vermont", countryCode: "US" },
	{ code: "VA", name: "Virginia", countryCode: "US" },
	{ code: "WA", name: "Washington", countryCode: "US" },
	{ code: "WV", name: "West Virginia", countryCode: "US" },
	{ code: "WI", name: "Wisconsin", countryCode: "US" },
	{ code: "WY", name: "Wyoming", countryCode: "US" },
	// Canada
	{ code: "AB", name: "Alberta", countryCode: "CA" },
	{ code: "BC", name: "British Columbia", countryCode: "CA" },
	{ code: "MB", name: "Manitoba", countryCode: "CA" },
	{ code: "NB", name: "New Brunswick", countryCode: "CA" },
	{ code: "NL", name: "Newfoundland and Labrador", countryCode: "CA" },
	{ code: "NS", name: "Nova Scotia", countryCode: "CA" },
	{ code: "ON", name: "Ontario", countryCode: "CA" },
	{ code: "PE", name: "Prince Edward Island", countryCode: "CA" },
	{ code: "QC", name: "Quebec", countryCode: "CA" },
	{ code: "SK", name: "Saskatchewan", countryCode: "CA" },
];

export const MOCK_CITIES: City[] = [
	// California
	{ name: "Los Angeles", stateCode: "CA", countryCode: "US" },
	{ name: "San Francisco", stateCode: "CA", countryCode: "US" },
	{ name: "San Diego", stateCode: "CA", countryCode: "US" },
	{ name: "Sacramento", stateCode: "CA", countryCode: "US" },
	{ name: "San Jose", stateCode: "CA", countryCode: "US" },
	// New York
	{ name: "New York", stateCode: "NY", countryCode: "US" },
	{ name: "Buffalo", stateCode: "NY", countryCode: "US" },
	{ name: "Rochester", stateCode: "NY", countryCode: "US" },
	{ name: "Albany", stateCode: "NY", countryCode: "US" },
	// Texas
	{ name: "Houston", stateCode: "TX", countryCode: "US" },
	{ name: "Dallas", stateCode: "TX", countryCode: "US" },
	{ name: "Austin", stateCode: "TX", countryCode: "US" },
	{ name: "San Antonio", stateCode: "TX", countryCode: "US" },
	// Florida
	{ name: "Miami", stateCode: "FL", countryCode: "US" },
	{ name: "Orlando", stateCode: "FL", countryCode: "US" },
	{ name: "Tampa", stateCode: "FL", countryCode: "US" },
	{ name: "Jacksonville", stateCode: "FL", countryCode: "US" },
	// Illinois
	{ name: "Chicago", stateCode: "IL", countryCode: "US" },
	{ name: "Springfield", stateCode: "IL", countryCode: "US" },
	// Pennsylvania
	{ name: "Philadelphia", stateCode: "PA", countryCode: "US" },
	{ name: "Pittsburgh", stateCode: "PA", countryCode: "US" },
	// Arizona
	{ name: "Phoenix", stateCode: "AZ", countryCode: "US" },
	{ name: "Tucson", stateCode: "AZ", countryCode: "US" },
	// Washington
	{ name: "Seattle", stateCode: "WA", countryCode: "US" },
	{ name: "Spokane", stateCode: "WA", countryCode: "US" },
	// Massachusetts
	{ name: "Boston", stateCode: "MA", countryCode: "US" },
	// Georgia
	{ name: "Atlanta", stateCode: "GA", countryCode: "US" },
	// North Carolina
	{ name: "Charlotte", stateCode: "NC", countryCode: "US" },
	{ name: "Raleigh", stateCode: "NC", countryCode: "US" },
	// Canada - Ontario
	{ name: "Toronto", stateCode: "ON", countryCode: "CA" },
	{ name: "Ottawa", stateCode: "ON", countryCode: "CA" },
	{ name: "Hamilton", stateCode: "ON", countryCode: "CA" },
	// Canada - British Columbia
	{ name: "Vancouver", stateCode: "BC", countryCode: "CA" },
	{ name: "Victoria", stateCode: "BC", countryCode: "CA" },
	// Canada - Quebec
	{ name: "Montreal", stateCode: "QC", countryCode: "CA" },
	{ name: "Quebec City", stateCode: "QC", countryCode: "CA" },
];

/**
 * Get states by country code
 */
export function getStatesByCountry(countryCode: string): State[] {
	return MOCK_STATES.filter((state) => state.countryCode === countryCode);
}

/**
 * Get cities by state code
 */
export function getCitiesByState(stateCode: string): City[] {
	return MOCK_CITIES.filter((city) => city.stateCode === stateCode);
}

/**
 * Get cities by state and country
 */
export function getCitiesByStateAndCountry(
	stateCode: string,
	countryCode: string,
): City[] {
	return MOCK_CITIES.filter(
		(city) =>
			city.stateCode === stateCode && city.countryCode === countryCode,
	);
}

/**
 * Search cities by name (case-insensitive)
 */
export function searchCities(
	query: string,
	stateCode?: string,
	countryCode?: string,
): City[] {
	if (!query.trim()) return [];
	const lowerQuery = query.toLowerCase();
	return MOCK_CITIES.filter((city) => {
		const matchesQuery = city.name.toLowerCase().includes(lowerQuery);
		const matchesState = !stateCode || city.stateCode === stateCode;
		const matchesCountry = !countryCode || city.countryCode === countryCode;
		return matchesQuery && matchesState && matchesCountry;
	});
}

