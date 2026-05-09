"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Box, Heart, Search } from "lucide-react";
import { useMemo } from "react";

export default function EventCreateBasicTypeSectionComponent() {
	//
	const categories = useMemo(
		() => [
			"All Events",
			"Popular",
			"Personal & Family",
			"Business & Corporate",
			"Cultural & Arts",
			"Educational & Training",
			"Entertainment & Recreation",
			"Community & Social",
		],
		[],
	);
	//
	return (
		<Card>
			{/*  */}

			{/*  */}
			<CardContent>
				{/*  */}

				{/*  */}
				<Accordion type="single" collapsible>
					{/*  */}

					{/*  */}
					<AccordionItem value="item-1">
						{/*  */}

						{/*  */}
						<AccordionTrigger className="cursor-pointer">
							{/*  */}
							<CardTitle className="flex items-center gap-2 text-lg">
								{/*  */}
								<Box />
								{/*  */}
								<span>Event Types</span>
								{/*  */}
							</CardTitle>
							{/*  */}
						</AccordionTrigger>
						{/*  */}

						{/*  */}
						<AccordionContent className="flex flex-col">
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-4">
								{/*  */}

								{/*  */}
								<div className="flex items-center overflow-hidden rounded-lg border pl-2">
									{/*  */}

									{/*  */}
									<Search />
									{/*  */}

									{/*  */}
									<input
										placeholder="Search for event types"
										className="oultine-none flex-1 p-2 focus:outline-none"
									/>
									{/*  */}

									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<div className="flex flex-wrap gap-2">
									{/*  */}

									{/*  */}
									{categories?.map((item, index) => {
										return (
											<Button
												key={index}
												variant={index === 0 ? "default" : "outline"}
												className={cn("rounded-full", {
													"bg-purple-600": index === 0,
												})}
											>
												{item}
											</Button>
										);
									})}
									{/*  */}

									{/*  */}
								</div>
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-4">
								{/*  */}

								{/*  */}
								<div className="flex flex-wrap items-center gap-4">
									{/*  */}

									{Array.from("12345678910")?.map((item, index) => {
										return (
											<div
												key={index}
												className="group flex h-40 min-w-52 flex-1 cursor-pointer flex-col justify-end transition-all hover:pb-2"
											>
												{/*  */}

												{/*  */}
												<div className="flex flex-col gap-2 rounded-xl border border-l-4 p-4 shadow transition-all group-hover:border-purple-600">
													<Heart />
													<CardTitle>Weding</CardTitle>
													<CardDescription className="max-w-44">
														Lorem ipsum dolor sit amet consectetur adipisicing
														elit. Beatae, odit.
													</CardDescription>
												</div>
												{/*  */}

												{/*  */}
											</div>
										);
									})}

									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<div className="flex flex-wrap items-center gap-2">
									{/*  */}

									{/*  */}
									<p className="flex-1">Showing 1-8 of 24 event types</p>
									{/*  */}

									{/*  */}
									<Pagination className="flex-1 justify-end">
										{/*  */}

										{/*  */}
										<PaginationContent>
											{/*  */}

											{/*  */}
											<PaginationItem>
												<PaginationPrevious href="#" />
											</PaginationItem>
											{/*  */}
											<PaginationItem>
												<PaginationLink href="#">1</PaginationLink>
											</PaginationItem>
											{/*  */}
											<PaginationItem>
												<PaginationLink href="#">2</PaginationLink>
											</PaginationItem>
											{/*  */}
											<PaginationItem>
												<PaginationLink href="#">3</PaginationLink>
											</PaginationItem>
											{/*  */}
											<PaginationItem>
												<PaginationEllipsis />
											</PaginationItem>
											{/*  */}
											<PaginationItem>
												<PaginationNext href="#" />
											</PaginationItem>
											{/*  */}

											{/*  */}
										</PaginationContent>
										{/*  */}

										{/*  */}
									</Pagination>
									{/*  */}

									{/*  */}
								</div>
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
						</AccordionContent>
						{/*  */}

						{/*  */}
					</AccordionItem>
					{/*  */}

					{/*  */}
				</Accordion>
				{/*  */}

				{/*  */}
			</CardContent>
			{/*  */}

			{/*  */}
		</Card>
	);
}
