"use client";

import { CITY_DATA, DEFAULT_CITY } from "@/lib/city-data";
import { Routes } from "@/lib/lib-routes";
import { cn } from "@/lib/utils";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface EventsHeroSectionComponentProps {
	location?: string;
}

export default function EventsHeroSectionComponent({
	location,
}: EventsHeroSectionComponentProps) {
	const [mounted, setMounted] = useState(false);
	const [open, setOpen] = useState(false);
	const router = useRouter();

	// Get city data based on location parameter
	const city =
		location && CITY_DATA[location] ? CITY_DATA[location] : DEFAULT_CITY;

	// Get all available cities
	const availableCities = Object.values(CITY_DATA);

	// Handle location change
	const handleLocationChange = (cityName: string) => {
		setOpen(false);
		router.push(`${Routes.web.general.events}/${encodeURIComponent(cityName)}`);
	};

	// Initialize
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="relative z-10 w-full pt-20">
			{/* Cityscape Image Container */}
			<div className="relative h-[200px] w-full overflow-hidden rounded-xl md:h-[225px] lg:h-[175px]">
				{/* Background Image */}
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{
						backgroundImage: `url(${city.imageUrl})`,
					}}
				/>

				{/* Gradient Overlay for text readability */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/18 via-black/8 to-transparent" />

				{/* Text Overlay - Bottom Left with Interactive City Name */}
				<div className="absolute bottom-0 left-0 p-6 md:p-8 lg:p-10">
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<button
								type="button"
								className="group flex items-center gap-2 text-left hover:opacity-80 transition-opacity"
							>
								<h1 className="text-xl font-bold text-white md:text-2xl lg:text-3xl">
									{city.name}
								</h1>
								<ChevronDown className="h-4 w-4 text-white/80 group-hover:text-white transition-colors md:h-5 md:w-5 lg:h-6 lg:w-6" />
							</button>
						</PopoverTrigger>
						<PopoverContent className="px-2" align="start" side="top" sideOffset={8}>
							{/* Use Current Location Button */}
							<Button variant={"outline"} className="w-full mb-2">
								<MapPin />
								Use Current Location
							</Button>

							{/* Searchable City List */}
							<Command>
								<CommandInput placeholder="Search Location" />
								<CommandList>
									<CommandEmpty>No location found.</CommandEmpty>
									<CommandGroup>
										{availableCities.map((cityOption) => (
											<CommandItem
												key={cityOption.name}
												value={cityOption.name}
												onSelect={() => handleLocationChange(cityOption.name)}
											>
												{cityOption.name}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</div>
	);
}
