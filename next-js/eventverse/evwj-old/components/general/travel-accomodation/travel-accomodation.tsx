"use client";
import {
	Building2,
	CalendarCheck,
	Car,
	MapPin,
	Navigation,
	Pencil,
	Plane,
	Bookmark,
	Loader2,
	Check,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getUserGeolocation } from "@/lib/geo";
import CarTab from "./car/car";
import Flight from "./flight/flight";
import Hotel from "./hotels/hotels";
// import ActivityTab from "./activity/activity";
// import RidesTab from "./rides/rides";
import BookingsTab from "./bookings/bookings";
import SavedTab from "./saved/SavedTab";
import { SavedProvider } from "./saved/SavedContext";

const categories = [
	{
		name: "Hotels",
		icon: Building2,
		count: 1,
	},
	{
		name: "Flights",
		icon: Plane,
		count: 1,
	},
	{
		name: "Cars",
		icon: Car,
		count: 1,
	},
	// {
	//   name: "Activities",
	//   icon: ActivitySquare,
	//   count: 3,
	// },
	// {
	//   name: "Rides",
	//   icon: Send,
	//   count: 2,
	// },
	{
		name: "My Bookings",
		icon: CalendarCheck,
		count: 10,
	},
	{
		name: "Saved",
		icon: Bookmark,
		count: 0,
	},
];

export default function TravelAndAccomodation({
	guestView,
}: {
	guestView?: boolean;
}) {
	const [userLocation, setUserLocation] = useState<string>("New York, NY");
	const [isLocationPopoverOpen, setIsLocationPopoverOpen] = useState(false);
	const [locationInput, setLocationInput] = useState("");
	const [isGettingLocation, setIsGettingLocation] = useState(false);

	const handleUseCurrentLocation = async () => {
		setIsGettingLocation(true);
		try {
			const coords = await getUserGeolocation();
			if (coords) {
				// Reverse geocode to get location name
				try {
					const response = await fetch(
						`https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json`,
						{
							headers: {
								"User-Agent": "EventDome/1.0",
							},
						},
					);
					const data = await response.json();
					if (data && data.address) {
						const address = data.address;
						const locationName = [
							address.city || address.town || address.village,
							address.state || address.region,
						]
							.filter(Boolean)
							.join(", ");
						setUserLocation(locationName || `${coords.lat}, ${coords.lng}`);
					} else {
						setUserLocation(`${coords.lat}, ${coords.lng}`);
					}
				} catch (error) {
					console.error("Reverse geocoding error:", error);
					setUserLocation(`${coords.lat}, ${coords.lng}`);
				}
				setIsLocationPopoverOpen(false);
			} else {
				alert(
					"Unable to get your current location. Please check your browser settings.",
				);
			}
		} catch (error) {
			console.error("Error getting location:", error);
			alert("Unable to get your current location. Please try again.");
		} finally {
			setIsGettingLocation(false);
		}
	};

	const handleSaveLocation = () => {
		if (locationInput.trim()) {
			setUserLocation(locationInput.trim());
			setLocationInput("");
			setIsLocationPopoverOpen(false);
		}
	};

	return (
		<SavedProvider>
			<div className="flex flex-col gap-6 pr-3 md:pr-6 lg:pr-10 xl:pr-16">
				<CardTitle className="text-xl md:text-2xl lg:text-4xl">
					Travel & Accommodation
				</CardTitle>

				<Card className="rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
					<CardContent className="flex flex-col gap-4 p-6">
						<div className="flex items-center space-x-3">
							<Plane className="h-8 w-8 -rotate-45 text-indigo-600 dark:text-indigo-400" />
							<div>
								<CardTitle className="text-xl">Plan Your Trip</CardTitle>
								<CardDescription>
									Plan your trip to San Francisco, CA • All recommendations near
									event venue
								</CardDescription>
							</div>
						</div>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-4 border-t border-gray-200 dark:border-slate-600">
							<div className="flex space-x-3">
								<MapPin className="mt-1 h-5 w-5 text-gray-600 dark:text-slate-400" />
								<div>
									<h3 className="font-semibold text-gray-700 dark:text-slate-300">
										Event Location
									</h3>
									<p className="font-medium text-gray-900 dark:text-slate-200">
										Golden Gate Park, San Francisco, CA 94118
									</p>
								</div>
							</div>
							<div className="flex space-x-3">
								<Navigation className="mt-1 h-5 w-5 text-gray-600 dark:text-slate-400" />
								<div className="flex-1">
									<h3 className="font-semibold text-gray-700 dark:text-slate-300">
										Your Location
									</h3>
									<Popover
										open={isLocationPopoverOpen}
										onOpenChange={setIsLocationPopoverOpen}
									>
										<PopoverTrigger asChild>
											<div className="flex items-center space-x-2 cursor-pointer group">
												<p className="font-medium text-gray-900 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
													{userLocation}
												</p>
												<Pencil className="h-4 w-4 text-gray-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
											</div>
										</PopoverTrigger>
										<PopoverContent className="w-80 p-4 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
											<div className="flex flex-col gap-4">
												<div>
													<h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-slate-200">
														Set Your Location
													</h4>
													<p className="text-xs text-gray-600 dark:text-slate-400 mb-3">
														Choose your starting location for travel
														recommendations
													</p>
												</div>
												<Button
													onClick={handleUseCurrentLocation}
													disabled={isGettingLocation}
													variant="outline"
													className="w-full justify-start !bg-white dark:!bg-slate-700/50 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
												>
													{isGettingLocation ? (
														<>
															<Loader2 className="h-4 w-4 mr-2 animate-spin" />
															Getting location...
														</>
													) : (
														<>
															<MapPin className="h-4 w-4 mr-2" />
															Use my current location
														</>
													)}
												</Button>
												<div className="relative">
													<div className="absolute inset-0 flex items-center">
														<span className="w-full border-t border-gray-200 dark:border-slate-600"></span>
													</div>
													<div className="relative flex justify-center text-xs uppercase">
														<span className="bg-white dark:bg-[#020617] px-2 text-gray-500 dark:text-slate-400">
															Or
														</span>
													</div>
												</div>
												<div className="flex flex-col gap-2">
													<Input
														placeholder="Enter location (e.g., New York, NY)"
														value={locationInput}
														onChange={(e) => setLocationInput(e.target.value)}
														onKeyDown={(e) => {
															if (e.key === "Enter") {
																handleSaveLocation();
															}
														}}
														className="dark:bg-[#020617] dark:border-slate-600 dark:text-slate-200"
													/>
													<Button
														onClick={handleSaveLocation}
														disabled={!locationInput.trim()}
														className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
													>
														<Check className="h-4 w-4 mr-2" />
														Save Location
													</Button>
												</div>
											</div>
										</PopoverContent>
									</Popover>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Tabs defaultValue="hotels" className="justify-start gap-6">
					<TabsList className="*:data-[slot=tabs-trigger]:hover:bg-background h-full w-full justify-start gap-2 overflow-x-auto *:data-[slot=tabs-trigger]:cursor-pointer !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
						{categories.map((item) => (
							<TabsTrigger
								key={item.name}
								value={item.name.toLowerCase().replace(/\s+/g, "-")}
								className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
							>
								<div className="flex items-center gap-2">
									<item.icon className="h-4 w-4" />
									<span>{item.name}</span>
									{item.name !== "Saved" && (
										<span className="text-xs opacity-70">({item.count})</span>
									)}
								</div>
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent value="hotels">
						<Hotel guestView={guestView} />
					</TabsContent>

					<TabsContent value="flights">
						<Flight />
					</TabsContent>

					<TabsContent value="cars">
						<CarTab />
					</TabsContent>

					<TabsContent value="my-bookings">
						<BookingsTab />
					</TabsContent>

					<TabsContent value="saved">
						<SavedTab />
					</TabsContent>
				</Tabs>
			</div>
		</SavedProvider>
	);
}
