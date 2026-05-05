"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Progress } from "@/components/ui/progress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Plus, Tag, Users } from "lucide-react";

export default function ScheduleConferenceTrackComponent() {
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<Card>
				{/*  */}

				{/*  */}
				<CardContent className="flex items-center justify-between gap-2">
					{/*  */}

					{/*  */}
					<div className="flex flex-col">
						{/*  */}

						{/*  */}
						<div className="flex items-center gap-2">
							{/*  */}
							<Tag />
							{/*  */}
							<CardTitle>Conference Tracks</CardTitle>
							{/*  */}
						</div>
						{/*  */}

						{/*  */}
						<CardDescription>
							Organize sessions into themed tracks
						</CardDescription>
						{/*  */}

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
								Add Tracks
							</Button>
						</DialogTrigger>
						{/*  */}

						{/*  */}
						<DialogContent className="">
							{/*  */}

							{/*  */}
							<DialogHeader>
								<DialogTitle>Add Track</DialogTitle>
								<DialogDescription>
									Add your conference tracks
								</DialogDescription>
							</DialogHeader>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-4">
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-1">
									{/*  */}
									<Label>Name</Label>
									{/*  */}
									<Input placeholder="eg: AI/ML, DevOps, Security" />
									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-1">
									{/*  */}

									{/*  */}
									<Label>Color</Label>
									{/*  */}

									{/*  */}
									<Select>
										{/*  */}

										{/*  */}
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a color" />
										</SelectTrigger>
										{/*  */}

										{/*  */}
										<SelectContent>
											{/*  */}
											<SelectItem value="1">
												<div className="h-4 w-4 rounded-full bg-blue-500"></div>
												<span>Blue</span>
											</SelectItem>
											{/*  */}
											<SelectItem value="2">
												<div className="h-4 w-4 rounded-full bg-red-500"></div>
												<span>Red</span>
											</SelectItem>
											{/*  */}
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
									<Label>Description (Optional)</Label>
									{/*  */}
									<Textarea placeholder="Breif description of the track"></Textarea>
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
				</CardContent>
				{/*  */}

				{/*  */}
				<CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{/*  */}

					{/*  */}
					{Array.from({ length: 6 })?.map((item, index) => {
						return (
							<Card
								key={index}
								className="border-l-primary bg-primary/5 border-l-4"
							>
								{/*  */}

								{/*  */}
								<CardContent className="flex flex-col gap-4">
									{/*  */}

									{/*  */}
									<CardTitle>AI & Machine Learning</CardTitle>
									{/*  */}

									{/*  */}
									<CardDescription>
										Latest developments in artificial intelligence and machine
										learning
									</CardDescription>
									{/*  */}

									{/*  */}
									<div className="flex flex-wrap items-center justify-between">
										{/*  */}

										{/*  */}
										<div className="flex flex-1 items-center gap-2">
											{/*  */}
											<Calendar />
											{/*  */}
											<CardTitle>11</CardTitle>
											{/*  */}
											<CardDescription>Session</CardDescription>
											{/*  */}
										</div>
										{/*  */}

										{/*  */}
										<div className="flex flex-1 items-center gap-2">
											{/*  */}
											<Users />
											{/*  */}
											<CardTitle>914</CardTitle>
											{/*  */}
											<CardDescription>Registered</CardDescription>
											{/*  */}
										</div>
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
									<div className="flex flex-col gap-1">
										{/*  */}

										{/*  */}
										<div className="flex items-center justify-between">
											{/*  */}
											<CardDescription>Capacity Utilization</CardDescription>
											{/*  */}
											<CardTitle>90%</CardTitle>
											{/*  */}
										</div>
										{/*  */}

										{/*  */}
										<Progress value={90} />
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
									<div className="flex flex-wrap items-center justify-between">
										{/*  */}

										{/*  */}
										<CardDescription>
											{/*  */}
											<span>Avg. capacity: </span>
											{/*  */}
											<span className="font-medium">83 </span>
											{/*  */}
											<span>per session</span>
											{/*  */}
										</CardDescription>
										{/*  */}

										{/*  */}
										<Badge>Near Full</Badge>
										{/*  */}

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
			{/*  */}

			{/*  */}
		</div>
	);
}
