import { DEFAULT_CITY } from "@/lib/city-data";
import { redirect } from "next/navigation";

export default function Page() {
	// Redirect to the new location-based route with default location
	redirect(`/home/explore-events/location/${encodeURIComponent(DEFAULT_CITY.name)}`);
}
