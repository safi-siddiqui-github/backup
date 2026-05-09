"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Calendar, Clock, Edit, Search, Trash } from "lucide-react";

export default function ScheduleSimpleTimelineComponent() {
	//
	return (
		<div className="flex flex-col">
			{/*  */}

			{/*  */}
			<Card className="rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				{/*  */}

				{/*  */}
				<CardContent className="flex flex-col gap-4">
					{/*  */}

					{/*  */}
					<div className="flex items-center gap-2">
						{/*  */}
						<Calendar />
						{/*  */}
						<CardTitle>Event Timeline</CardTitle>
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					<div className="flex items-center gap-2 rounded-xl border px-2 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
						{/*  */}
						<Search className="text-muted-foreground" />
						{/*  */}
						<input
							type="text"
							className="flex-1 bg-transparent px-2 py-2 outline-none text-foreground placeholder:text-muted-foreground"
						/>
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
				<CardContent className="flex flex-col gap-4">
					{/*  */}

					{/*  */}
					<div className="flex flex-col overflow-x-auto rounded-lg border p-2 pb-4 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
						{/*  */}

						{/*  */}
						<div className="flex min-w-max flex-col">
							{/*  */}

							{/*  */}
							<div className="grid min-w-max grid-cols-5 gap-2 p-4">
								{/*  */}
								<CardTitle>Date</CardTitle>
								{/*  */}
								<CardTitle>Schedules</CardTitle>
								{/*  */}
								<CardTitle>Time</CardTitle>
								{/*  */}
								<CardTitle>Progress</CardTitle>
								{/*  */}
								<CardTitle>Actions</CardTitle>
								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							{Array.from({ length: 5 })?.map((item, index) => {
								return (
									<div className="flex flex-col" key={index}>
										{/*  */}

										{/*  */}
										<Separator />
										{/*  */}

										{/*  */}
										<div
											className={cn(
												"grid min-w-max grid-cols-5 items-center gap-2 p-4",
												{
													"bg-primary/5": index === 0,
													"hover:bg-primary/5": index !== 0,
												},
											)}
										>
											{/*  */}

											{/*  */}
											<div className="flex flex-col">
												{/*  */}
												<CardTitle>Monday</CardTitle>
												{/*  */}
												<CardDescription>October 21, 2025</CardDescription>
												{/*  */}
											</div>
											{/*  */}

											{/*  */}
											<div className="flex items-center gap-2">
												{/*  */}
												<Calendar />
												{/*  */}
												<CardDescription>14 schedules</CardDescription>
												{/*  */}
											</div>
											{/*  */}

											{/*  */}
											<div className="flex items-center gap-2">
												{/*  */}
												<Clock />
												{/*  */}
												<CardDescription>20 hrs 30 mins</CardDescription>
												{/*  */}
											</div>
											{/*  */}

											{/*  */}
											<div className="flex flex-col">
												{/*  */}
												<CardDescription>35%</CardDescription>
												{/*  */}
												<Progress value={35} />
												{/*  */}
											</div>
											{/*  */}

											{/*  */}
											<ButtonGroup>
												{/*  */}
												<Button>
													<Edit />
												</Button>
												{/*  */}
												<Button variant={"destructive"}>
													<Trash />
												</Button>
												{/*  */}
											</ButtonGroup>
											{/*  */}

											{/*  */}
										</div>
										{/*  */}

										{/*  */}
									</div>
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
					<Pagination className="">
						<PaginationContent className="">
							<PaginationItem>
								<PaginationPrevious href="#" />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#">1</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationNext href="#" />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
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
