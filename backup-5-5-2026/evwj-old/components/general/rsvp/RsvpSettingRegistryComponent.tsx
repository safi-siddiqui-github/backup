"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { CardDescription, CardTitle } from "@/components/ui/card";
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
import { Edit, Gift, Plus, Trash } from "lucide-react";

export default function RsvpSettingRegistryComponent() {
	//
	// const rsvpSlug = props.rsvpSlug;
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
					<Gift className="size-8" />
					{/*  */}
					<CardTitle className="text-2xl">Gift Registry</CardTitle>
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
							Add Gift Registry
						</Button>
					</DialogTrigger>
					{/*  */}

					{/*  */}
					<DialogContent className="sm:max-w-[425px]">
						{/*  */}

						{/*  */}
						<DialogHeader>
							<DialogTitle>Gift Registry</DialogTitle>
							<DialogDescription>Add your gift registries</DialogDescription>
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
								<Input placeholder="Wedding Registry" />
								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-1">
								{/*  */}

								{/*  */}
								<Label>Platform</Label>
								{/*  */}

								{/*  */}
								<Select>
									{/*  */}

									{/*  */}
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a fruit" />
									</SelectTrigger>
									{/*  */}

									{/*  */}
									<SelectContent>
										{/*  */}
										<SelectItem value="1">Amazon</SelectItem>
										{/*  */}
										<SelectItem value="2">Walmart</SelectItem>
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
								<Label>Registry URL</Label>
								{/*  */}
								<Input placeholder="https://..." />
								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-1">
								{/*  */}
								<Label>Description (Optional)</Label>
								{/*  */}
								<Textarea placeholder="Breif description of the registry"></Textarea>
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
			</div>
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
						<CardTitle>Name</CardTitle>
						{/*  */}
						<CardTitle>Platform</CardTitle>
						{/*  */}
						<CardTitle>URL</CardTitle>
						{/*  */}
						<CardTitle>Description</CardTitle>
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
								<div className="grid min-w-max grid-cols-5 items-center gap-2 p-4">
									{/*  */}

									{/*  */}
									<CardDescription>Wedding Cake</CardDescription>
									{/*  */}

									{/*  */}
									<CardDescription>Amazon</CardDescription>
									{/*  */}

									{/*  */}
									<CardDescription>https://gifts.com</CardDescription>
									{/*  */}

									{/*  */}
									<CardDescription>beautiful Gifts</CardDescription>
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
