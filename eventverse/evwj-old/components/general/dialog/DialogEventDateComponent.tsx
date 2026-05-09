"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

export default function DialogEventDateComponent() {
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
		// const detail: CustomEventDetail = customEvent.detail;
		//
		//   setIsLoading(false);
	}, []);
	//
	useEffect(() => {
		//
		window.addEventListener("DialogEventDateComponent", handleEvent);
		//
		return () =>
			window.removeEventListener("DialogEventDateComponent", handleEvent);
		//
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
						<DialogTitle>Add Day</DialogTitle>
						<DialogDescription>Add days about your event</DialogDescription>
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
								<Label>Event Date</Label>
								{/*  */}

								{/*  */}
								<Popover
								// open={open}
								// onOpenChange={setOpen}
								>
									{/*  */}

									{/*  */}
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											id="date"
											className="justify-between font-normal"
										>
											{/* {date ? date.toLocaleDateString() : "Select date"} */}
											Select Date
											<ChevronDownIcon />
										</Button>
									</PopoverTrigger>
									{/*  */}

									{/*  */}
									<PopoverContent
										className="w-auto overflow-hidden p-0"
										align="start"
									>
										<Calendar
											mode="single"
											// selected={date}
											// captionLayout="dropdown"
											// onSelect={(date) => {
											//   setDate(date)
											//   setOpen(false)
											// }}
										/>
									</PopoverContent>
									{/*  */}

									{/*  */}
								</Popover>
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Timezone</Label>
								{/*  */}

								{/*  */}
								<Select>
									<SelectTrigger className="w-full">
										Select Timezone
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="utc">UTC</SelectItem>
										<SelectItem value="eastern">Eastern</SelectItem>
										<SelectItem value="western">Western</SelectItem>
									</SelectContent>
								</Select>
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Start Time</Label>
								{/*  */}

								{/*  */}
								<Input type="time" />
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>End Time</Label>
								{/*  */}

								{/*  */}
								<Input type="time" />
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
