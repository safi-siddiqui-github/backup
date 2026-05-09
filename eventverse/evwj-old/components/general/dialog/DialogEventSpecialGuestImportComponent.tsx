"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Search } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

export default function DialogEventSpecialGuestImportComponent() {
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
		window.addEventListener(
			"DialogEventSpecialGuestImportComponent",
			handleEvent,
		);
		return () =>
			window.removeEventListener(
				"DialogEventSpecialGuestImportComponent",
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
				<DialogContent className="flex max-h-screen flex-col !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
					{/*  */}

					{/*  */}
					<DialogHeader>
						<DialogTitle>Import Guest Profile</DialogTitle>
						<DialogDescription>Import profile in your event</DialogDescription>
					</DialogHeader>
					{/*  */}

					{/*  */}
					<Tabs
						defaultValue="account"
						className="flex h-full flex-col gap-4 overflow-hidden"
					>
						{/*  */}

						{/*  */}
						<TabsList className="w-full !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
							<TabsTrigger value="profile">Profile</TabsTrigger>
							<TabsTrigger value="search">Search</TabsTrigger>
						</TabsList>
						{/*  */}

						{/*  */}
						<div className="flex-1 overflow-y-auto py-1">
							{/*  */}

							{/*  */}
							<TabsContent value="profile" className="flex flex-col gap-4 px-1">
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-2">
									{/*  */}

									{/*  */}
									<Label>Social Media Profile URL</Label>
									{/*  */}

									{/*  */}
									<div className="flex flex-wrap items-center gap-2">
										{/*  */}

										{/*  */}
										<Input
											placeholder="eg: https://profile.com"
											className="flex-1"
										/>
										{/*  */}

										{/*  */}
										<Button size={"icon"} onClick={handleClose}>
											<ExternalLink />
										</Button>
										{/*  */}

										{/*  */}
									</div>
									{/*  */}

									{/*  */}
								</div>
								{/*  */}

								{/*  */}
							</TabsContent>
							{/*  */}

							{/*  */}
							<TabsContent value="search" className="flex flex-col gap-4 px-1">
								{/*  */}

								{/*  */}
								<div className="flex flex-col gap-2">
									{/*  */}

									{/*  */}
									<Label>Search By Name</Label>
									{/*  */}

									{/*  */}
									<Input
										placeholder="eg: John Doe"
										// className="flex-1"
									/>
									{/*  */}

									{/*  */}
								</div>
								{/*  */}

								{/*  */}
								<Card className="bg-neutral-50">
									{/*  */}

									{/*  */}
									<CardContent className="flex flex-col items-center gap-1 text-center text-neutral-600">
										{/*  */}

										{/*  */}
										<Search className="size-10" />
										{/*  */}

										{/*  */}
										<CardTitle>Search Coming Soon</CardTitle>
										{/*  */}

										{/*  */}
										<CardDescription>
											We&apos;re working on name-based search functionality. For
											now, please use the &apos;Profile URL&apos; tab.
										</CardDescription>
										{/*  */}

										{/*  */}
									</CardContent>
									{/*  */}

									{/*  */}
								</Card>
								{/*  */}

								{/*  */}
							</TabsContent>
							{/*  */}

							{/*  */}
						</div>
						{/*  */}

						{/*  */}
					</Tabs>
					{/*  */}

					{/*  */}
					<div className="flex flex-col gap-1">
						{/*  */}

						{/*  */}
						<Label>Example URLs:</Label>
						{/*  */}

						{/*  */}
						<CardDescription>
							LinkedIn: https://linkedin.com/in/username
						</CardDescription>
						{/*  */}

						{/*  */}
						<CardDescription>
							Twitter: https://twitter.com/username
						</CardDescription>
						{/*  */}

						{/*  */}
						<CardDescription>Twitter-X: https://x.com/username</CardDescription>
						{/*  */}

						{/*  */}
					</div>
					{/*  */}

					{/*  */}
				</DialogContent>
				{/*  */}

				{/*  */}

				{/*  */}
			</form>
			{/*  */}

			{/*  */}
		</Dialog>
	);
}
