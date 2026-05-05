"use client";

import { Button } from "@/components/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { ClientPropType } from "@/type";
import { Plus, Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import TriggerCustomEventComponent from "../../trigger/TriggerCustomEventComponent";
import RsvpGuestGroupCardComponent from "./RsvpGuestGroupCardComponent";
import RsvpGuestGroupDialogComponent from "./RsvpGuestGroupDialogComponent";

type GuestGroup = {};
export default function RsvpGuestGroupComponent({ slug }: ClientPropType) {
	//
	const [pageData, setPageData] = useState<{
		guestGroups?: Partial<GuestGroup>[];
	}>({
		guestGroups: [
			{
				name: "Title...",
				memberLimit: null,
				description: "Description...",
			},
		],
	});
	//
	const handleGuestGroups = useCallback(async () => {
		//
		// const response = await GuestGroupFindManyAction();
		//
		// if (response?.success) {
		//
		// setPageData({
		//   guestGroups: response?.data?.guestGroups,
		// });
		//
		// }
		//
	}, []);
	//
	useEffect(() => {
		//
		handleGuestGroups();
		//
	}, [handleGuestGroups]);
	//
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<div className="flex flex-col gap-6">
				{/*  */}

				{/*  */}
				<div className="flex flex-wrap items-center gap-4">
					{/*  */}

					{/*  */}
					<div className="flex flex-1 flex-col">
						{/*  */}
						<InputGroup className="bg-white backdrop-blur-sm dark:bg-[#020617]">
							{/*  */}
							<InputGroupInput placeholder="Search..." />
							{/*  */}
							<InputGroupAddon>
								<Search />
							</InputGroupAddon>
							{/*  */}
							{/* <InputGroupAddon align="inline-end">12 results</InputGroupAddon> */}
							{/*  */}
						</InputGroup>
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					<div className="flex flex-wrap items-center gap-2">
						{/*  */}

						{/*  */}
						{/* <Button variant={"outline"}>
              <Download />
              Export
            </Button> */}
						{/*  */}

						{/*  */}
						<TriggerCustomEventComponent
							eventType={"RsvpGuestGroupDialogComponent"}
						>
							{/*  */}
							<Button>
								{/*  */}
								<Plus />
								{/*  */}
								<span>Add Group</span>
								{/*  */}
							</Button>
							{/*  */}
						</TriggerCustomEventComponent>
						{/*  */}

						{/*  */}
					</div>
					{/*  */}

					{/*  */}
				</div>
				{/*  */}

				{/*  */}
				<div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
					{/*  */}

					{/*  */}
					{pageData?.guestGroups?.map((item, index) => {
						return (
							<RsvpGuestGroupCardComponent
								key={index}
								actionResponseDataType={{
									guestGroup: item,
								}}
							/>
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
			</div>
			{/*  */}

			{/*  */}
			<div className="flex flex-col">
				{/*  */}

				{/*  */}
				<RsvpGuestGroupDialogComponent slug={slug} />
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}
		</div>
	);
}
