"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export default function DialogEventSpecialGuestComponent() {
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
		window.addEventListener("DialogEventSpecialGuestComponent", handleEvent);
		return () =>
			window.removeEventListener(
				"DialogEventSpecialGuestComponent",
				handleEvent,
			);
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
						<DialogTitle>Add Special Guest</DialogTitle>
						<DialogDescription>
							Add information about your vips
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
								<Label>Profile Photo</Label>
								{/*  */}

								{/*  */}
								<div className="flex items-center gap-2">
									{/*  */}

									{/*  */}
									<Avatar className="size-20">
										<AvatarImage src={""} />
										<AvatarFallback>Photo</AvatarFallback>
									</Avatar>
									{/*  */}

									{/*  */}
									<Input type="file" />
									{/*  */}

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
								<Label>Full Name</Label>
								{/*  */}

								{/*  */}
								<Input placeholder="Guest Full Name" />
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Title / Role</Label>
								{/*  */}

								{/*  */}
								<Input placeholder="eg: CEO, Keynote Speaker, Artist" />
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Bio</Label>
								{/*  */}

								{/*  */}
								<Textarea
									placeholder="Brief biography or description of guest"
									className="h-32"
								></Textarea>
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Website</Label>
								{/*  */}

								{/*  */}
								<Input placeholder="https://website.com" />
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Linkedin</Label>
								{/*  */}

								{/*  */}
								<Input placeholder="https://linkedin.com" />
								{/*  */}

								{/*  */}
							</div>
							{/*  */}

							{/*  */}
							<div className="flex flex-col gap-2">
								{/*  */}

								{/*  */}
								<Label>Twitter / X</Label>
								{/*  */}

								{/*  */}
								<Input placeholder="https://twitter.com" />
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
