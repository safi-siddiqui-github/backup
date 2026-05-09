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
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useEffect, useRef } from "react";

export default function DialogEventVenueSectionComponent() {
	//
	const triggerRef = useRef<HTMLButtonElement>(null);
	//
	// const handleEvent = useCallback(async () => {
	const handleEvent = useCallback(async (e: Event) => {
		//
		triggerRef.current?.click();
		//
		const customEvent = e as CustomEvent;
		if (customEvent) {
		}
		// const detail: CustomEventDetail = customEvent.detail;
		//
	}, []);
	//
	useEffect(() => {
		//
		window.addEventListener("DialogEventVenueSectionComponent", handleEvent);
		//
		return () =>
			window.removeEventListener(
				"DialogEventVenueSectionComponent",
				handleEvent,
			);
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
						<DialogTitle>Add Venue Section</DialogTitle>
						<DialogDescription>
							Add venue sections for your event
						</DialogDescription>
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
								<Input placeholder="eg: Main Hall" />
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Capacity (Optional)</Label>
								{/*  */}

								{/*  */}
								<Input type="number" placeholder="eg: 5" />
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Description (Optional)</Label>
								{/*  */}

								{/*  */}
								<Textarea
									className="h-36"
									placeholder="Breif description of thsi section"
								></Textarea>
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
