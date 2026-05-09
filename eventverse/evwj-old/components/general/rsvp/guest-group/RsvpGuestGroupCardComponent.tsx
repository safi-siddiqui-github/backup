"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { ClientPropType } from "@/type";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Edit, Menu, Search, Trash } from "lucide-react";
import { useCallback, useState } from "react";
import TriggerCustomEventComponent from "../../trigger/TriggerCustomEventComponent";

export default function RsvpGuestGroupCardComponent({
	actionResponseDataType,
}: ClientPropType) {
	//
	type GuestGroup = {
		name: string;
		description: string;
		id: number;
		memberLimit: number;
	};
	// const { guestGroup } = actionResponseDataType ? actionResponseDataType : {};

	const guestGroup: GuestGroup = {
		name: "",
		description: "",
		id: 0,
		memberLimit: 0,
	};
	const [pageData, setPageData] = useState({
		loadingDelete: false,
	});
	//
	const handleDelete = useCallback(async () => {
		//
		setPageData({ loadingDelete: true });
		//
		// const response = await GuestGroupDeleteAction({
		//   id: guestGroup?.id,
		// });
		// //
		// if (response?.success) {
		//   //
		//   toast("Guest Group Deleted");
		//   //
		// }
		//
		setPageData({ loadingDelete: false });
		//
	}, [guestGroup]);
	//

	//
	return (
		<Card className="bg-white backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg dark:bg-[#020617]">
			{/*  */}

			{/*  */}
			<CardContent className="flex flex-col gap-4">
				{/*  */}

				{/*  */}
				<div className="flex items-center justify-between gap-2">
					{/*  */}

					{/*  */}
					<div className="flex items-start gap-3">
						{/*  */}

						{/*  */}
						{pageData?.loadingDelete ? (
							<Spinner />
						) : (
							<div className="bg-foreground rounded-full p-2"></div>
						)}
						{/*  */}

						{/*  */}
						<div className="flex flex-col gap-px">
							{/*  */}
							<CardTitle>{guestGroup?.name}</CardTitle>
							{/*  */}
							<CardDescription>{guestGroup?.description}</CardDescription>
							{/*  */}
						</div>
						{/*  */}

						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					<DropdownMenu>
						{/*  */}

						{/*  */}
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size={"icon-sm"}>
								<Menu />
							</Button>
						</DropdownMenuTrigger>
						{/*  */}

						{/*  */}
						<DropdownMenuContent className="w-16" align="end">
							{/*  */}

							{/*  */}
							<DropdownMenuItem variant="destructive" onClick={handleDelete}>
								<Trash />
								Delete
							</DropdownMenuItem>
							{/*  */}

							{/*  */}
							<TriggerCustomEventComponent
								eventType={"RsvpGuestGroupDialogComponent"}
								eventDetail={{
									id: guestGroup?.id,
								}}
							>
								<DropdownMenuItem>
									<Edit />
									<span>Edit</span>
								</DropdownMenuItem>
							</TriggerCustomEventComponent>
							{/*  */}

							{/*  */}
						</DropdownMenuContent>
						{/*  */}

						{/*  */}
					</DropdownMenu>
					{/*  */}

					{/*  */}
				</div>
				{/*  */}

				{/*  */}

				{/*  */}
				<div className="flex items-center gap-5">
					{/*  */}

					{/*  */}
					<div className="flex flex-1 items-center justify-between">
						{/*  */}
						<CardDescription>Total Invited</CardDescription>
						{/*  */}
						<CardTitle>2</CardTitle>
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					<div className="flex flex-1 items-center justify-between">
						{/*  */}
						<CardDescription>Attending</CardDescription>
						{/*  */}
						<CardTitle>50</CardTitle>
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
				</div>
				{/*  */}

				{/*  */}
				<div className="flex flex-col gap-2">
					{/*  */}

					{/*  */}
					<div className="flex items-center justify-between">
						{/*  */}
						<CardDescription>Limit</CardDescription>
						{/*  */}
						<CardTitle>{guestGroup?.memberLimit ?? "No Limit"}</CardTitle>
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					<Progress value={50} />
					{/*  */}

					{/*  */}
					<div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarImage
								src="https://github.com/maxleiter.png"
								alt="@maxleiter"
							/>
							<AvatarFallback>LR</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarImage
								src="https://github.com/evilrabbit.png"
								alt="@evilrabbit"
							/>
							<AvatarFallback>ER</AvatarFallback>
						</Avatar>
					</div>
					{/*  */}

					{/*  */}
					<Accordion type="single" collapsible>
						{/*  */}
						<AccordionItem value="item-1">
							{/*  */}

							{/*  */}
							<AccordionTrigger className="flex justify-between">
								{/*  */}
								<CardDescription>2 members • 1 attending</CardDescription>
								{/*  */}
							</AccordionTrigger>
							{/*  */}

							{/*  */}
							<AccordionContent className="flex flex-col gap-4">
								{/*  */}

								{/*  */}
								<div className="flex flex-1 items-center rounded-lg border bg-white pl-2 backdrop-blur-sm dark:border-slate-600 dark:bg-[#020617]">
									{/*  */}
									<Search className="text-muted-foreground" />
									{/*  */}
									<input
										type="text"
										className="text-foreground placeholder:text-muted-foreground flex-1 bg-transparent px-2 py-2 outline-none"
										placeholder="Search guests"
									/>
									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-2">
									{/*  */}

									{/*  */}
									{Array.from({ length: 3 })?.map((subItem, subIndex) => {
										return (
											<div
												key={subIndex}
												className="flex items-center gap-2 rounded-lg border p-2 transition-colors hover:bg-blue-50 dark:border-slate-600 dark:hover:bg-slate-700/50"
											>
												{/*  */}

												{/*  */}
												<Avatar className="size-10">
													<AvatarImage
														src="https://github.com/maxleiter.png"
														alt="@maxleiter"
													/>
													<AvatarFallback>LR</AvatarFallback>
												</Avatar>
												{/*  */}

												{/*  */}
												<div className="flex flex-1 flex-col">
													{/*  */}
													<CardTitle>John Doe</CardTitle>
													{/*  */}
													<CardDescription>johndoe@gmail.com</CardDescription>
													{/*  */}
												</div>
												{/*  */}

												{/*  */}
												<Badge variant={"outline"}>pending</Badge>
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
							</AccordionContent>
							{/*  */}

							{/*  */}
						</AccordionItem>
						{/*  */}
					</Accordion>
					{/*  */}

					{/*  */}
				</div>
				{/*  */}

				{/*  */}

				{/*  */}
			</CardContent>
			{/*  */}

			{/*  */}
		</Card>
	);
}
