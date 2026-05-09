"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { ClientPropType } from "@/type";
import { Box, Building, Download, MapPin, Package, Plus } from "lucide-react";
import SeatingDashboardCarouselComponent from "./SeatingDashboardCarouselComponent";

export default function SeatingDashboardComponent(prop: ClientPropType) {
	//
	const { slug, seatingSlug } = prop;
	//
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<div className="flex flex-wrap items-center justify-between gap-4">
				{/*  */}

				{/*  */}
				<div className="flex items-center gap-1">
					{/*  */}
					<Box />
					{/*  */}
					<CardTitle>Dashboard</CardTitle>
					{/*  */}
				</div>
				{/*  */}

				{/*  */}
				<div className="flex flex-wrap items-center gap-2">
					{/*  */}
					<Button>
						<Plus />
						Add Arrangment
					</Button>
					{/*  */}
					<Button variant={"outline"}>
						<Package />
						Browse Vendor Presets
					</Button>
					{/*  */}
					<Button variant={"outline"}>
						<Download />
						Import Layout
					</Button>
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
				{Array.from({ length: 2 })?.map((item, index) => {
					return (
						<Card
							key={index}
							className="rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]"
						>
							{/*  */}

							{/*  */}
							<CardContent className="flex flex-wrap items-center justify-between gap-2">
								{/*  */}

								{/*  */}
								<div className="flex items-center gap-2">
									{/*  */}
									<MapPin />
									{/*  */}
									<CardTitle>Main Reception Hall</CardTitle>
									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<CardDescription>1 section • 1 arrangement</CardDescription>
								{/*  */}

								{/*  */}
							</CardContent>
							{/*  */}

							{/*  */}
							{Array.from({ length: 2 }).map((subItem, subIndex) => {
								return (
									<CardContent key={subIndex}>
										{/*  */}

										{/*  */}
										<Card className="rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
											{/*  */}

											{/*  */}
											<CardContent className="flex flex-wrap items-center justify-between gap-2">
												{/*  */}

												{/*  */}
												<div className="flex items-center gap-2">
													{/*  */}
													<Building />
													{/*  */}
													<CardTitle>Main Floor</CardTitle>
													{/*  */}
												</div>
												{/*  */}

												{/*  */}
												<CardDescription>Sections: 5</CardDescription>
												{/*  */}

												{/*  */}
											</CardContent>
											{/*  */}

											{/*  */}
											<CardContent className="flex flex-col">
												{/*  */}

												{/*  */}
												<SeatingDashboardCarouselComponent
													slug={slug}
													seatingSlug={seatingSlug}
												/>
												{/*  */}

												{/*  */}
											</CardContent>
											{/*  */}

											{/*  */}
										</Card>
										{/*  */}

										{/*  */}
									</CardContent>
								);
							})}
							{/*  */}

							{/*  */}
						</Card>
					);
				})}
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}
		</div>
	);
}
