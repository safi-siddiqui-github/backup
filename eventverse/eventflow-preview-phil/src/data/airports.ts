export interface Airport {
  code: string;
  name: string;
  address: string;
  city: string;
  distanceFromLocation: number; // in miles
}

// Airport database by major cities
const airportDatabase: Record<string, Airport[]> = {
  "New York": [
    { code: "JFK", name: "John F. Kennedy International Airport", address: "Queens, NY 11430", city: "New York", distanceFromLocation: 0 },
    { code: "LGA", name: "LaGuardia Airport", address: "Queens, NY 11371", city: "New York", distanceFromLocation: 8 },
    { code: "EWR", name: "Newark Liberty International Airport", address: "Newark, NJ 07114", city: "Newark", distanceFromLocation: 16 },
  ],
  "San Francisco": [
    { code: "SFO", name: "San Francisco International Airport", address: "San Francisco, CA 94128", city: "San Francisco", distanceFromLocation: 0 },
    { code: "OAK", name: "Oakland International Airport", address: "Oakland, CA 94621", city: "Oakland", distanceFromLocation: 12 },
    { code: "SJC", name: "San Jose International Airport", address: "San Jose, CA 95110", city: "San Jose", distanceFromLocation: 45 },
  ],
  "Los Angeles": [
    { code: "LAX", name: "Los Angeles International Airport", address: "Los Angeles, CA 90045", city: "Los Angeles", distanceFromLocation: 0 },
    { code: "BUR", name: "Hollywood Burbank Airport", address: "Burbank, CA 91505", city: "Burbank", distanceFromLocation: 18 },
    { code: "SNA", name: "John Wayne Airport", address: "Santa Ana, CA 92707", city: "Santa Ana", distanceFromLocation: 40 },
    { code: "LGB", name: "Long Beach Airport", address: "Long Beach, CA 90806", city: "Long Beach", distanceFromLocation: 22 },
  ],
  "Chicago": [
    { code: "ORD", name: "O'Hare International Airport", address: "Chicago, IL 60666", city: "Chicago", distanceFromLocation: 0 },
    { code: "MDW", name: "Midway International Airport", address: "Chicago, IL 60638", city: "Chicago", distanceFromLocation: 12 },
  ],
  "Miami": [
    { code: "MIA", name: "Miami International Airport", address: "Miami, FL 33126", city: "Miami", distanceFromLocation: 0 },
    { code: "FLL", name: "Fort Lauderdale-Hollywood International Airport", address: "Fort Lauderdale, FL 33315", city: "Fort Lauderdale", distanceFromLocation: 28 },
  ],
  "Seattle": [
    { code: "SEA", name: "Seattle-Tacoma International Airport", address: "SeaTac, WA 98158", city: "Seattle", distanceFromLocation: 0 },
  ],
  "Boston": [
    { code: "BOS", name: "Logan International Airport", address: "Boston, MA 02128", city: "Boston", distanceFromLocation: 0 },
  ],
  "Atlanta": [
    { code: "ATL", name: "Hartsfield-Jackson Atlanta International Airport", address: "Atlanta, GA 30320", city: "Atlanta", distanceFromLocation: 0 },
  ],
  "Dallas": [
    { code: "DFW", name: "Dallas/Fort Worth International Airport", address: "Dallas, TX 75261", city: "Dallas", distanceFromLocation: 0 },
    { code: "DAL", name: "Dallas Love Field", address: "Dallas, TX 75235", city: "Dallas", distanceFromLocation: 8 },
  ],
  "Denver": [
    { code: "DEN", name: "Denver International Airport", address: "Denver, CO 80249", city: "Denver", distanceFromLocation: 0 },
  ],
  "Las Vegas": [
    { code: "LAS", name: "Harry Reid International Airport", address: "Las Vegas, NV 89119", city: "Las Vegas", distanceFromLocation: 0 },
  ],
  "Phoenix": [
    { code: "PHX", name: "Phoenix Sky Harbor International Airport", address: "Phoenix, AZ 85034", city: "Phoenix", distanceFromLocation: 0 },
  ],
};

export const getAirportsNearLocation = (location: string, radiusMiles: number = 70): Airport[] => {
  // Extract city name from location string (e.g., "San Francisco, CA" -> "San Francisco")
  const cityName = location.split(',')[0].trim();
  
  // Find matching airports in the database
  const airports = airportDatabase[cityName] || [];
  
  // Filter by radius
  return airports.filter(airport => airport.distanceFromLocation <= radiusMiles);
};

export const getAirportByCode = (code: string): Airport | undefined => {
  for (const airports of Object.values(airportDatabase)) {
    const airport = airports.find(a => a.code === code);
    if (airport) return airport;
  }
  return undefined;
};
