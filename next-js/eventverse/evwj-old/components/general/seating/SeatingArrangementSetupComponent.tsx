"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
import { Building, Calendar, ChevronDown, MapPin, Plus } from "lucide-react";
import { BsStack } from "react-icons/bs";

export default function SeatingArrangementSetupComponent() {
	return (
		<div className="flex flex-col overflow-hidden">
			{/*  */}

			{/*  */}
			<Card>
				{/*  */}

				{/*  */}
				<CardContent className="flex flex-wrap items-center justify-between gap-4">
					{/*  */}

					{/*  */}
					<div className="flex items-center gap-2">
						{/*  */}
						<BsStack className="size-5" />
						{/*  */}
						<CardTitle>Seating Selection</CardTitle>
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					<div className="flex flex-wrap items-center gap-2">
						{/*  */}

						{/*  */}
						<Popover>
							{/*  */}

							{/*  */}
							<PopoverTrigger asChild>
								{/*  */}
								<Button variant={"outline"} className="w-60">
									<MapPin />
									Select Location
									<ChevronDown />
								</Button>
								{/*  */}
							</PopoverTrigger>
							{/*  */}

							{/*  */}
							<PopoverContent align="start" side="bottom" className="w-60 p-1">
								{/*  */}

								{/*  */}
								<Command>
									{/*  */}

									{/*  */}
									<CommandInput placeholder="Search..." />
									{/*  */}

									{/*  */}
									<CommandList>
										{/*  */}

										{/*  */}
										<CommandEmpty>No Result Found</CommandEmpty>
										{/*  */}

										{/*  */}
										<CommandGroup>
											{/*  */}

											{/*  */}
											{Array.from({ length: 4 })?.map((item, index) => {
												return (
													<CommandItem key={index}>
														<MapPin />
														Main Reception Hall {index}
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
									<Button variant={"outline"} className="w-full">
										<Plus />
										Add Location
									</Button>
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
						<p className="text-xl">/</p>
						{/*  */}

						{/*  */}
						<Popover>
							{/*  */}

							{/*  */}
							<PopoverTrigger asChild>
								{/*  */}
								<Button variant={"outline"} className="w-60">
									<Building />
									Select Location
									<ChevronDown />
								</Button>
								{/*  */}
							</PopoverTrigger>
							{/*  */}

							{/*  */}
							<PopoverContent align="start" side="bottom" className="w-60 p-1">
								{/*  */}

								{/*  */}
								<Command>
									{/*  */}

									{/*  */}
									<CommandInput placeholder="Search..." />
									{/*  */}

									{/*  */}
									<CommandList>
										{/*  */}

										{/*  */}
										<CommandEmpty>No Result Found</CommandEmpty>
										{/*  */}

										{/*  */}
										<CommandGroup>
											{/*  */}

											{/*  */}
											{Array.from({ length: 4 })?.map((item, index) => {
												return (
													<CommandItem key={index}>
														<Building />
														Main Floor {index}
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
									<Button variant={"outline"} className="w-full">
										<Plus />
										Add Section
									</Button>
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
						<p className="text-xl">/</p>
						{/*  */}

						{/*  */}
						<Popover>
							{/*  */}

							{/*  */}
							<PopoverTrigger asChild>
								{/*  */}
								<Button variant={"outline"} className="w-60">
									<Calendar />
									Select Arrangment
									<ChevronDown />
								</Button>
								{/*  */}
							</PopoverTrigger>
							{/*  */}

							{/*  */}
							<PopoverContent align="start" side="bottom" className="w-60 p-1">
								{/*  */}

								{/*  */}
								<Command>
									{/*  */}

									{/*  */}
									<CommandInput placeholder="Search..." />
									{/*  */}

									{/*  */}
									<CommandList>
										{/*  */}

										{/*  */}
										<CommandEmpty>No Result Found</CommandEmpty>
										{/*  */}

										{/*  */}
										<CommandGroup>
											{/*  */}

											{/*  */}
											{Array.from({ length: 4 })?.map((item, index) => {
												return (
													<CommandItem key={index}>
														<Calendar />
														Dinner Setup {index}
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
									<Button variant={"outline"} className="w-full">
										<Plus />
										Add Arrangement
									</Button>
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
					{/*  */}

					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
			</Card>
			{/*  */}

			{/*  */}
		</div>
	);
}
