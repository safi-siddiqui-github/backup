"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { BellRing, Edit, Plus, Trash } from "lucide-react";

export default function RsvpSettingReminderComponent() {
	//
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<div className="flex flex-wrap items-center justify-between gap-4">
				{/*  */}

				{/*  */}
				<div className="flex items-center gap-2">
					{/*  */}
					<BellRing className="size-8" />
					{/*  */}
					<CardTitle className="text-2xl">Notification Reminder</CardTitle>
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
							Add Reminder
						</Button>
					</DialogTrigger>
					{/*  */}

					{/*  */}
					<DialogContent className="sm:max-w-[425px]">
						{/*  */}

						{/*  */}
						<DialogHeader>
							<DialogTitle>Reminder</DialogTitle>
							<DialogDescription>Add reminder notification</DialogDescription>
						</DialogHeader>
						{/*  */}

						{/*  */}
						<div className="grid grid-cols-1 gap-4">
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-1">
								{/*  */}
								<Label>Message</Label>
								{/*  */}
								<Textarea placeholder="Add personal message to your invitations"></Textarea>
								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-1">
								{/*  */}

								{/*  */}
								<Label>Schedule</Label>
								{/*  */}

								{/*  */}
								<Select>
									{/*  */}

									{/*  */}
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a schedule" />
									</SelectTrigger>
									{/*  */}

									{/*  */}
									<SelectContent>
										{/*  */}
										<SelectItem value="1">3 Month</SelectItem>
										{/*  */}
										<SelectItem value="2">3 Weeks</SelectItem>
										{/*  */}
										<SelectItem value="3">6 days</SelectItem>
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
							<Label className="flex items-center justify-between">
								{/*  */}
								<span>SMS Notification</span>
								{/*  */}
								<Checkbox />
								{/*  */}
							</Label>
							{/*  */}

							{/*  */}
							<Label className="flex items-center justify-between">
								{/*  */}
								<span>Email Notification</span>
								{/*  */}
								<Checkbox />
								{/*  */}
							</Label>
							{/*  */}

							{/*  */}
							<Label className="flex items-center justify-between">
								{/*  */}
								<span>In-App Notification</span>
								{/*  */}
								<Checkbox />
								{/*  */}
							</Label>
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
			</div>
			{/*  */}

			{/*  */}
			<div className="flex flex-col overflow-x-auto rounded-lg border p-2 pb-4 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				{/*  */}

				{/*  */}
				<div className="flex min-w-max flex-col">
					{/*  */}

					{/*  */}
					<div className="grid min-w-max grid-cols-4 gap-2 p-4">
						{/*  */}
						<CardTitle>Message</CardTitle>
						{/*  */}
						<CardTitle>Schedule</CardTitle>
						{/*  */}
						<CardTitle>Notification</CardTitle>
						{/*  */}
						<CardTitle>Actions</CardTitle>
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					{Array.from({ length: 5 })?.map((item, index) => {
						return (
							<div className="gap flex flex-col" key={index}>
								{/*  */}

								{/*  */}
								<Separator />
								{/*  */}

								{/*  */}
								<div className="grid min-w-max grid-cols-4 items-center gap-2 p-4">
									{/*  */}

									{/*  */}
									<CardDescription>
										Only four days left for the event
									</CardDescription>
									{/*  */}

									{/*  */}
									<CardDescription>4 Days</CardDescription>
									{/*  */}

									{/*  */}
									<div className="flex flex-col gap-1">
										{/*  */}
										<CardDescription>
											Email: <span className="font-medium">yes</span>
										</CardDescription>
										{/*  */}
										<CardDescription>
											SMS: <span className="font-medium">yes</span>
										</CardDescription>
										{/*  */}
										<CardDescription>
											In-App: <span className="font-medium">No</span>
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
		</div>
	);
}
