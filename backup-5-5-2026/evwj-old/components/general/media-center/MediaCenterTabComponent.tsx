"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigationStore } from "@/lib/lib-navigation-store";
import { Camera, Folder, Radio, Sparkles, Upload } from "lucide-react";
import {
	MediaCenterAlbumsTab,
	MediaCenterGalleryTab,
	MediaCenterLiveFeedTab,
	MediaCenterPhotoBoothTab,
	MediaCenterUploadTab,
} from "./tabs";

export default function MediaCenterTabComponent() {
	const { mediaCenterTab, setMediaCenterTab } = useNavigationStore();

	const tabConfig = [
		{ value: "albums", label: "Albums", icon: Folder },
		{ value: "gallery", label: "Gallery", icon: Camera },
		{ value: "upload", label: "Upload", icon: Upload },
		{ value: "live-feed", label: "Live Feed", icon: Radio },
		{ value: "photo-booth", label: "Photo Booth", icon: Sparkles },
	];

	return (
		<div className="">
			{/* Main Content */}
			<div className="px-4 md:px-6">
				{/* Header Section */}
				<div className="mb-6">
					<div className="space-y-2">
						<h1 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-slate-200">
							Media Center
						</h1>
						<p className="text-sm text-gray-500 dark:text-slate-400">
							Organize, share, and manage your event photos and videos
						</p>
					</div>
				</div>

				{/* Main Card */}
				<Card className="rounded-md !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
					<CardContent className="p-0">
						<Tabs
							value={mediaCenterTab ?? "albums"}
							className="w-full"
							onValueChange={setMediaCenterTab}
						>
							{/* Tabs List */}
							<div className="border-b border-gray-200 dark:border-slate-600">
								<TabsList className="h-auto w-full justify-start gap-2 p-3 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
									{tabConfig.map((tab) => {
										const Icon = tab.icon;
										const isActive = mediaCenterTab === tab.value;

										return (
											<TabsTrigger
												key={tab.value}
												value={tab.value}
												className={`relative flex items-center gap-3 rounded-xl px-6 py-4 transition-all duration-300 ${
													isActive
														? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg"
														: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-slate-200"
												} `}
											>
												<Icon
													className={`h-4 w-4 ${isActive ? "text-white" : ""}`}
												/>
												<span className="text-sm font-semibold">
													{tab.label}
												</span>
											</TabsTrigger>
										);
									})}
								</TabsList>
							</div>

							{/* Tab Content */}
							<div className="p-6">
								<TabsContent value="albums" className="mt-0">
									<MediaCenterAlbumsTab />
								</TabsContent>

								<TabsContent value="gallery" className="mt-0">
									<MediaCenterGalleryTab />
								</TabsContent>

								<TabsContent value="upload" className="mt-0">
									<MediaCenterUploadTab />
								</TabsContent>

								<TabsContent value="live-feed" className="mt-0">
									<MediaCenterLiveFeedTab />
								</TabsContent>

								<TabsContent value="photo-booth" className="mt-0">
									<MediaCenterPhotoBoothTab />
								</TabsContent>
							</div>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
