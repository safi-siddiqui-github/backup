"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { BellRing, Clock, Edit, MapPin, Plus, Trash } from "lucide-react";

export default function ScheduleSimpleTimelineDayComponent() {
	//
	return (
		<div className="flex flex-col">
			{/*  */}

			{/*  */}
			<Card>
				{/*  */}

				{/*  */}
				<CardContent className="flex flex-wrap items-center justify-between gap-4">
					{/*  */}

					{/*  */}
					<div className="flex flex-col gap-2">
						{/*  */}
						<CardTitle className="text-xl">Thursday, October 21 2025</CardTitle>
						{/*  */}
						<CardDescription>10 Items Scheduled</CardDescription>
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					<Dialog>
						{/*  */}

						{/*  */}
						<DialogTrigger asChild>
							<Button variant="outline">
								<Plus />
								Add Schedule Item
							</Button>
						</DialogTrigger>
						{/*  */}

						{/*  */}
						<DialogContent className="max-h-full items-start overflow-y-auto">
							{/*  */}

							{/*  */}
							<DialogHeader>
								<DialogTitle>Schedule Item</DialogTitle>
								<DialogDescription>Add your schedule item</DialogDescription>
							</DialogHeader>
							{/*  */}

							{/*  */}
							<div className="grid grid-cols-1 gap-4">
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-1">
									{/*  */}
									<Label>Name</Label>
									{/*  */}
									<Input placeholder="Opening keynote, Coffee break" />
									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-1">
									{/*  */}

									{/*  */}
									<Label>Agenda Type</Label>
									{/*  */}

									{/*  */}
									<Select>
										{/*  */}

										{/*  */}
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a type" />
										</SelectTrigger>
										{/*  */}

										{/*  */}
										<SelectContent>
											{/*  */}
											<SelectItem value="1">Registration</SelectItem>
											{/*  */}
											<SelectItem value="2">Welcome</SelectItem>
											{/*  */}
										</SelectContent>
										{/*  */}

										{/*  */}
									</Select>
									{/*  */}

									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-1">
									{/*  */}
									<Label>Start Time</Label>
									{/*  */}
									<Input type="time" />
									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-1">
									{/*  */}
									<Label>End Time</Label>
									{/*  */}
									<Input type="time" />
									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-1">
									{/*  */}

									{/*  */}
									<Label>Location</Label>
									{/*  */}

									{/*  */}
									<Select>
										{/*  */}

										{/*  */}
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a location" />
										</SelectTrigger>
										{/*  */}

										{/*  */}
										<SelectContent>
											{/*  */}
											<SelectItem value="1">Main Hall</SelectItem>
											{/*  */}
											<SelectItem value="2">Conference Room</SelectItem>
											{/*  */}
										</SelectContent>
										{/*  */}

										{/*  */}
									</Select>
									{/*  */}

									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-1">
									{/*  */}
									<Label>Description</Label>
									{/*  */}
									<Textarea placeholder="Breif description of the registry"></Textarea>
									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-1">
									{/*  */}

									{/*  */}
									<Label>Notification Time</Label>
									{/*  */}

									{/*  */}
									<Select>
										{/*  */}

										{/*  */}
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a location" />
										</SelectTrigger>
										{/*  */}

										{/*  */}
										<SelectContent>
											{/*  */}
											<SelectItem value="1">5 Minutes before</SelectItem>
											{/*  */}
											<SelectItem value="2">10 Minutes before</SelectItem>
											{/*  */}
										</SelectContent>
										{/*  */}

										{/*  */}
									</Select>
									{/*  */}

									{/*  */}
								</div>
								{/*  */}
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-1">
									{/*  */}
									<Label>Message</Label>
									{/*  */}
									<Textarea placeholder="Please arrive 10 minutes before"></Textarea>
									{/*  */}
								</div>
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>
								<Button type="submit">Save changes</Button>
							</DialogFooter>
							{/*  */}

							{/*  */}
						</DialogContent>
						{/*  */}

						{/*  */}
					</Dialog>
					{/*  */}
					{/*  */}

					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
				<CardContent className="flex flex-col gap-4">
					{/*  */}

					{/*  */}
					<Separator />
					{/*  */}

					{/*  */}
					<div className="flex flex-col gap-4">
						{/*  */}

						{/*  */}
						{Array.from({ length: 5 })?.map((item, index) => {
							return (
								<div
									className="hover:border-primary flex flex-col gap-4 border-l-4 p-4"
									key={index}
								>
									{/*  */}

									{/*  */}
									<div className="flex flex-wrap items-center justify-between gap-4">
										{/*  */}

										{/*  */}
										<div className="flex flex-col gap-2">
											{/*  */}
											<Badge variant={"outline"}>Registration</Badge>
											{/*  */}
											<CardTitle>Registration & Welcome</CardTitle>
											{/*  */}
											<CardDescription>
												Guest registration and welcome reception
											</CardDescription>
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
									<div className="flex items-center gap-2">
										{/*  */}
										<Clock />
										{/*  */}
										<CardDescription>09:00 AM - 09:30 AM</CardDescription>
										{/*  */}
									</div>
									{/*  */}

									{/*  */}
									<div className="flex items-center gap-2">
										{/*  */}
										<MapPin />
										{/*  */}
										<CardDescription>Main Hall</CardDescription>
										{/*  */}
									</div>
									{/*  */}

									{/*  */}
									<div className="flex flex-wrap gap-2 rounded-xl border p-4">
										{/*  */}

										{/*  */}
										<BellRing className="size-4" />
										{/*  */}

										{/*  */}
										<div className="flex flex-col">
											{/*  */}
											<CardTitle>Notification</CardTitle>
											{/*  */}
											<CardDescription>
												Welcome! Please proceed to registration.
											</CardDescription>
											{/*  */}
										</div>
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

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
