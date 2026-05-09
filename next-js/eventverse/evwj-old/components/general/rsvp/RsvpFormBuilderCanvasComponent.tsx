"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash } from "lucide-react";

export default function RsvpFormBuilderCanvasComponent() {
	//
	// const rsvpSlug = props.rsvpSlug;
	//
	return (
		<Card className="rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
			{/*  */}

			{/*  */}
			<CardContent className="flex items-center justify-between">
				{/*  */}
				<CardTitle>Form Builder Canvas</CardTitle>
				{/*  */}
				<Badge variant={"outline"}>3 Fields</Badge>
				{/*  */}
			</CardContent>
			{/*  */}

			{/*  */}
			<CardContent className="flex flex-col gap-6">
				{/*  */}

				{Array.from({ length: 5 })?.map((item, index) => {
					return (
						<Card
							key={index}
							className="rounded-md p-0 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]"
						>
							{/*  */}

							{/*  */}
							<CardContent className="flex flex-col gap-2 p-4">
								{/*  */}

								{/*  */}
								<div className="flex flex-wrap justify-between gap-2">
									{/*  */}

									{/*  */}
									<div className="flex items-center gap-1">
										{/*  */}

										{/*  */}
										<CardTitle className="tracking-tight">
											Email Address
										</CardTitle>
										{/*  */}

										{/*  */}
										<Badge variant={"secondary"}>Required</Badge>
										{/*  */}

										{/*  */}
										<Badge variant={"outline"}>Standard</Badge>
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
									<div className="flex items-center gap-2">
										{/*  */}

										{/*  */}
										<Button size={"icon-sm"} variant={"outline"}>
											<Edit />
										</Button>
										{/*  */}

										{/*  */}
										<Button size={"icon-sm"} variant={"outline"}>
											<Trash className="text-red-500" />
										</Button>
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-2">
									{/*  */}
									<Label className="text-sm font-medium tracking-tight">
										Email Address *
									</Label>
									{/*  */}
									<Input placeholder="Enter Email Address" />
									{/*  */}
								</div>
								{/*  */}

								{/*  */}
							</CardContent>
							{/*  */}

							{/*  */}
						</Card>
					);
				})}

				{/*  */}

				{/*  */}
			</CardContent>
			{/*  */}

			{/*  */}
		</Card>
	);
}
