"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Ticket } from "lucide-react";
import { useState } from "react";
import EventDetailOrderSectionComponent from "./EventDetailOrderSectionComponent";
import EventDetailSummarySectionComponent from "./EventDetailSummarySectionComponent";
import EventDetailTicketSectionComponent from "./EventDetailTicketSectionComponent";

type PropType = {
	slug: string;
};

export default function EventDetailCheckoutSectionComponent(props: PropType) {
	//
	const slug = props.slug;
	//
	const [showItem, setShowItem] = useState<"cart" | "payment">("cart");
	//
	return (
		<Dialog>
			{/*  */}

			{/*  */}
			<DialogTrigger asChild>
				<Button className="rounded-full md:text-lg" size={"lg"}>
					<Ticket />
					Get Tickets - Starting at $35
				</Button>
			</DialogTrigger>
			{/*  */}

			{/*  */}
			<DialogContent className="flex max-h-screen max-w-5xl! flex-col">
				{/*  */}

				{/*  */}
				<DialogHeader>
					<DialogTitle>Summer Music Festival 2025</DialogTitle>
					<DialogDescription>Choose your ticket</DialogDescription>
				</DialogHeader>
				{/*  */}

				{/*  */}
				<div className="flex h-full flex-col gap-8 overflow-y-auto lg:flex-row lg:gap-4 lg:overflow-hidden">
					{/*  */}

					{/*  */}
					<div className="flex flex-col px-1 lg:flex-1 lg:overflow-y-auto">
						{showItem === "cart" ? (
							<EventDetailTicketSectionComponent slug={slug} />
						) : (
							<EventDetailOrderSectionComponent slug={slug} />
						)}
					</div>
					{/*  */}

					{/*  */}
					<div className="flex flex-col pr-1 lg:max-w-xs lg:flex-1 lg:overflow-y-auto">
						<EventDetailSummarySectionComponent slug={slug} />
					</div>
					{/*  */}

					{/*  */}
				</div>
				{/*  */}

				{/*  */}
				<Separator />
				{/*  */}

				{/*  */}
				<div className="flex items-center justify-between">
					{/*  */}

					{/*  */}
					<p className="text-xl font-medium">Total $256</p>
					{/*  */}

					{/*  */}
					<Button
						className="rounded-full"
						onClick={() =>
							setShowItem(showItem === "cart" ? "payment" : "cart")
						}
					>
						{showItem === "cart" ? "Checkout" : "Place Order"}
					</Button>
					{/*  */}

					{/*  */}
				</div>
				{/*  */}

				{/*  */}
			</DialogContent>
		</Dialog>
	);
}
