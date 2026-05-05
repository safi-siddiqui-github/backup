"use client";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Coordinates } from "@/lib/geo";

interface LocationFilterComponentProps {
	locations: string[];
	selectedLocation: string;
	onLocationSelect: (location: string) => void;
	userLocation?: Coordinates | null;
}

const USE_MY_LOCATION_TEXT = "Use my current location";

export default function LocationFilterComponent({
	locations,
	selectedLocation,
	onLocationSelect,
	userLocation,
}: LocationFilterComponentProps) {
	const handleSelect = (value: string) => {
		if (value === USE_MY_LOCATION_TEXT) {
			// Clear selectedLocation to use user's current location
			onLocationSelect("");
		} else {
			onLocationSelect(value);
		}
	};

	// Check if userLocation is actually available (has coordinates)
	const hasUserLocation =
		userLocation !== null &&
		userLocation !== undefined &&
		userLocation.lat !== undefined &&
		userLocation.lng !== undefined;

	const isUsingMyLocation = !selectedLocation && hasUserLocation;

	return (
		<div className="flex flex-col gap-2">
			<p className="text-lg font-medium">Location</p>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline" role="combobox" className="justify-between">
						<span>
							{isUsingMyLocation
								? USE_MY_LOCATION_TEXT
								: selectedLocation || "All locations"}
						</span>
						<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0">
					<Command>
						<CommandInput placeholder="Search location..." />
						<CommandList>
							<CommandEmpty>No location found.</CommandEmpty>
							<CommandGroup>
								{/* "Use my current location" option - only show if userLocation is available */}
								{hasUserLocation && (
									<CommandItem
										key={USE_MY_LOCATION_TEXT}
										value={USE_MY_LOCATION_TEXT}
										onSelect={() => handleSelect(USE_MY_LOCATION_TEXT)}
									>
										<CheckIcon
											className={cn(
												"mr-2 h-4 w-4",
												isUsingMyLocation ? "opacity-100" : "opacity-0",
											)}
										/>
										{USE_MY_LOCATION_TEXT}
									</CommandItem>
								)}
								{locations.map((loc) => (
									<CommandItem
										key={loc}
										value={loc}
										onSelect={() => handleSelect(loc)}
									>
										<CheckIcon
											className={cn(
												"mr-2 h-4 w-4",
												selectedLocation === loc ? "opacity-100" : "opacity-0",
											)}
										/>
										{loc}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
