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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";
import { useCallback, useEffect, useRef } from "react";

export default function DialogEventVenueComponent() {
	//
	const triggerRef = useRef<HTMLButtonElement>(null);
	//
	const handleEvent = useCallback(async (e: Event) => {
		//
		triggerRef.current?.click();
		//
		const customEvent = e as CustomEvent;
		if (customEvent) {
		}
		// const detial: CustomEventDetail = customEvent.detail;
		//
	}, []);
	//
	useEffect(() => {
		window.addEventListener("DialogEventVenueComponent", handleEvent);
		return () =>
			window.removeEventListener("DialogEventVenueComponent", handleEvent);
	}, [handleEvent]);
	//
	const handleClose = () => {
		triggerRef.current?.click();
	};
	//
	return (
		<Dialog>
			<form>
				<DialogTrigger ref={triggerRef} className="hidden"></DialogTrigger>
				<DialogContent className="flex max-h-screen flex-col">
					{/*  */}

					{/*  */}
					<DialogHeader>
						<DialogTitle>Add Venue</DialogTitle>
						<DialogDescription>Add venues for your event</DialogDescription>
					</DialogHeader>
					{/*  */}

					{/*  */}
					<div className="flex-1 overflow-y-auto">
						{/*  */}

						{/*  */}
						<div className="flex flex-col gap-6 px-1">
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Name</Label>
								{/*  */}

								{/*  */}
								<Input placeholder="eg: The Grand Ballroom" />
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Type</Label>
								{/*  */}

								{/*  */}
								<Select>
									{/*  */}

									{/*  */}
									<SelectTrigger className="w-full">Select type</SelectTrigger>
									{/*  */}

									{/*  */}
									<SelectContent>
										{/*  */}
										<SelectItem value="1">Physical Location</SelectItem>
										<SelectItem value="2">Virtual Event</SelectItem>
										<SelectItem value="3">
											Hybrid (Physical + Virtual)
										</SelectItem>
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
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Address Line 1</Label>
								{/*  */}

								{/*  */}
								<Input placeholder="Address Line 1" />
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Address Line 2</Label>
								{/*  */}

								{/*  */}
								<Input placeholder="Address Line 2" />
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Country</Label>
								{/*  */}

								{/*  */}
								<Select>
									{/*  */}

									{/*  */}
									<SelectTrigger className="w-full">
										Select country
									</SelectTrigger>
									{/*  */}

									{/*  */}
									<SelectContent>
										{/*  */}
										<SelectItem value="1">USA</SelectItem>
										<SelectItem value="2">UK</SelectItem>
										<SelectItem value="3">Europe</SelectItem>
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
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>State</Label>
								{/*  */}

								{/*  */}
								<Select>
									{/*  */}

									{/*  */}
									<SelectTrigger className="w-full">Select state</SelectTrigger>
									{/*  */}

									{/*  */}
									<SelectContent>
										{/*  */}
										<SelectItem value="1">Washington</SelectItem>
										<SelectItem value="2">California</SelectItem>
										<SelectItem value="3">San Francisco</SelectItem>
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
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>City</Label>
								{/*  */}

								{/*  */}
								<Select>
									{/*  */}

									{/*  */}
									<SelectTrigger className="w-full">Select city</SelectTrigger>
									{/*  */}

									{/*  */}
									<SelectContent>
										{/*  */}
										<SelectItem value="1">Karachi</SelectItem>
										<SelectItem value="2">Toronto</SelectItem>
										<SelectItem value="3">Tokyo</SelectItem>
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
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Postal Code</Label>
								{/*  */}

								{/*  */}
								<Input
									type="number"
									placeholder="eg: 10001 - New York City, USA."
								/>
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Virtual Meeting Link</Label>
								{/*  */}

								{/*  */}
								<Input placeholder="eg: http://meeting-link.com" />
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Extended Capacity (Optional)</Label>
								{/*  */}

								{/*  */}
								<Input placeholder="eg: 150" />
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Special Features (Optional)</Label>
								{/*  */}

								{/*  */}
								<Input placeholder="eg: Parking, Wifi, Kitchen" />
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<Button onClick={handleClose}>Submit</Button>
							{/*  */}

							{/*  */}
						</div>
						{/*  */}

						{/*  */}
					</div>
					{/*  */}

					{/*  */}
				</DialogContent>
			</form>
		</Dialog>
	);
}
