"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { CardDescription, CardTitle } from "@/components/ui/card";
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
import {
	CircleCheckBig,
	Download,
	Edit,
	Mail,
	Search,
	Trash,
} from "lucide-react";

export default function RsvpGuestComponent() {
	//
	// const rsvpSlug = props.rsvpSlug;
	//
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<div className="flex flex-wrap items-center gap-4">
				{/*  */}

				{/*  */}
				<div className="flex flex-1 items-center rounded-lg border pl-2 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
					{/*  */}
					<Search className="text-muted-foreground" />
					{/*  */}
					<input
						type="text"
						className="flex-1 px-2 py-2 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
						placeholder="Search guests"
					/>
					{/*  */}
				</div>
				{/*  */}

				{/*  */}
				<div className="flex gap-2">
					{/*  */}

					{/*  */}
					<Select>
						<SelectTrigger className="">
							<SelectValue placeholder="Select a Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="apple">All Status</SelectItem>
							<SelectItem value="banana">Attending</SelectItem>
							<SelectItem value="blueberry">Declined</SelectItem>
							<SelectItem value="grapes">Maybe</SelectItem>
							<SelectItem value="pineapple">Pending</SelectItem>
						</SelectContent>
					</Select>
					{/*  */}

					{/*  */}
					<Select>
						<SelectTrigger className="">
							<SelectValue placeholder="Select a group" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="apple">All Groups</SelectItem>
							<SelectItem value="banana">Family</SelectItem>
							<SelectItem value="blueberry">Fiends</SelectItem>
							<SelectItem value="grapes">Collegues</SelectItem>
							<SelectItem value="pineapple">VIP</SelectItem>
						</SelectContent>
					</Select>
					{/*  */}

					{/*  */}
					<Button>
						<Download />
						Export
					</Button>
					{/*  */}

					{/*  */}
				</div>
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
					<div className="grid min-w-max grid-cols-7 gap-2 p-4">
						{/*  */}
						<CardTitle>Guest</CardTitle>
						{/*  */}
						<CardTitle>Contact</CardTitle>
						{/*  */}
						<CardTitle>Group</CardTitle>
						{/*  */}
						<CardTitle>Status</CardTitle>
						{/*  */}
						<CardTitle>Plus Ones</CardTitle>
						{/*  */}
						<CardTitle>Invited</CardTitle>
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
								<div className="grid min-w-max grid-cols-7 items-center gap-2 p-4">
									{/*  */}

									{/*  */}
									<div className="flex items-center gap-2">
										{/*  */}

										{/*  */}
										<Avatar>
											<AvatarImage src="https://github.com/shadcn.png" />
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
										{/*  */}

										{/*  */}
										<div className="flex flex-col">
											{/*  */}
											<CardTitle>John Doe</CardTitle>
											{/*  */}
											<CardDescription>Dietary: Vegetarian</CardDescription>
											{/*  */}
										</div>
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
									<div className="flex flex-col">
										{/*  */}
										<CardDescription>sarah@example.com</CardDescription>
										{/*  */}
										<CardDescription>+1234567890</CardDescription>
										{/*  */}
									</div>
									{/*  */}

									{/*  */}
									<Badge>Group</Badge>
									{/*  */}

									{/*  */}
									<div className="flex items-center gap-2">
										{/*  */}
										<CircleCheckBig />
										{/*  */}
										<Badge variant={"secondary"}>Group</Badge>
										{/*  */}
									</div>
									{/*  */}

									{/*  */}
									<div className="flex flex-col">
										{/*  */}
										<CardDescription>+2</CardDescription>
										{/*  */}
										<CardDescription>John Doe</CardDescription>
										{/*  */}
									</div>
									{/*  */}

									{/*  */}
									<div className="flex flex-col">
										{/*  */}
										<CardDescription>1/15/2024</CardDescription>
										{/*  */}
										<CardDescription>Responded: 1/18/2024</CardDescription>
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
										<Button variant={"outline"}>
											<Mail />
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
