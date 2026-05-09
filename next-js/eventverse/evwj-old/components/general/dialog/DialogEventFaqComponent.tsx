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
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useEffect, useRef } from "react";

export default function DialogEventFaqComponent() {
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
	}, []);
	//
	useEffect(() => {
		window.addEventListener("DialogEventFaqComponent", handleEvent);
		return () =>
			window.removeEventListener("DialogEventFaqComponent", handleEvent);
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
						<DialogTitle>Add FAQ</DialogTitle>
						<DialogDescription>Add faqs about your event</DialogDescription>
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
								<Label>Question Type</Label>
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

										{/*  */}
										{Array.from("1234").map((item, index) => {
											return (
												<SelectItem key={index} value={item}>
													General
												</SelectItem>
											);
										})}
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
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Question</Label>
								{/*  */}

								{/*  */}
								<Input placeholder="eg: What is the type of event?" />
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Answer</Label>
								{/*  */}

								{/*  */}
								<Textarea
									placeholder="eg: The answer to this question"
									className="h-32"
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
