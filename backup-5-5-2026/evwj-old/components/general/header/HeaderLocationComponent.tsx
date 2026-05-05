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
import { MapPin } from "lucide-react";

interface HeaderLocationComponentProps {
	isDashboardLightMode?: boolean;
	shouldShowDarkBackground?: boolean;
}

export default function HeaderLocationComponent({
	isDashboardLightMode = false,
	shouldShowDarkBackground = false,
}: HeaderLocationComponentProps) {
	//
	const cityName = "San Francisco";
	const truncatedCityName =
		cityName.length >= 14 ? `${cityName.slice(0, 11)}...` : cityName;

	// Determine text color based on navbar state
	// - If dark background: white text
	// - If dashboard light mode: gray-900 text (light mode), white text (dark mode)
	// - Default: white text (transparent background)
	const textColorClass = shouldShowDarkBackground
		? "text-white"
		: isDashboardLightMode
			? "text-gray-900 dark:text-white"
			: "text-white";

	//
	return (
		<div className="flex flex-col">
			{/*  */}

			{/*  */}
			<Popover>
				{/*  */}

				{/*  */}
				<PopoverTrigger asChild>
					<Button
						className={`h-8 bg-transparent px-2 ${textColorClass} hover:bg-black/5 min-[2560px]:h-10 min-[2560px]:px-4 lg:h-8 lg:px-2 xl:h-9 xl:px-3 dark:hover:bg-white/10`}
					>
						<MapPin className="h-3.5 w-3.5 min-[2560px]:h-5 min-[2560px]:w-5 lg:h-3.5 xl:h-4 xl:w-4" />
						<span className="hidden items-center gap-1 text-[10px] min-[2560px]:text-base lg:inline-flex lg:text-[11px] xl:text-sm">
							<span>{truncatedCityName},</span>
							<span className="uppercase">CA</span>
							<span
								aria-label="United States flag"
								role="img"
								className="leading-none"
							>
								🇺🇸
							</span>
						</span>
					</Button>
				</PopoverTrigger>
				{/*  */}

				{/*  */}
				<PopoverContent className="px-2">
					{/*  */}

					{/*  */}
					<Button variant={"outline"} className="w-full">
						<MapPin />
						Use Current Location
					</Button>
					{/*  */}

					{/*  */}
					<Command>
						{/*  */}

						{/*  */}
						<CommandInput placeholder="Search Location" />
						{/*  */}

						{/*  */}
						<CommandList>
							{/*  */}

							{/*  */}
							<CommandEmpty>No framework found.</CommandEmpty>
							{/*  */}

							{/*  */}
							<CommandGroup>
								{/*  */}

								{/*  */}
								{Array.from({ length: 3 })?.map((item, index) => {
									return (
										<CommandItem key={index}>
											Central Park, New York {index + 1}
										</CommandItem>
									);
								})}
								{/*  */}

								{/*  */}
							</CommandGroup>
							{/*  */}

							{/*  */}
						</CommandList>
						{/*  */}

						{/*  */}
					</Command>
					{/*  */}

					{/*  */}
				</PopoverContent>
				{/*  */}

				{/*  */}
			</Popover>
			{/*  */}

			{/*  */}
		</div>
	);
}
