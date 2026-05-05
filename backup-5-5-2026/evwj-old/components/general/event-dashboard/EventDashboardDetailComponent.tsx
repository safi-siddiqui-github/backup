"use client";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { ClientPropType } from "@/type";
import { useCallback, useEffect, useState } from "react";

export default function EventDashboardDetailComponent({
	slug,
}: ClientPropType) {
	//
	const [pageData, setPageData] = useState<{
		eventModel?: {
			name: string;
			eventCategory: {
				name: string;
			};
			description?: string;
		};
	}>();
	//
	const handleEventModel = useCallback(async () => {
		//
		setPageData({
			eventModel: {
				name: "Title...",
				eventCategory: {
					name: "Category...",
				},
			},
		});
		//
		// const response = await FindFirstEventAction({
		//   eventModel: {
		//     slug: slug ?? undefined,
		//     include: {
		//       eventCategory: true,
		//     },
		//   },
		// });
		//
		// if (response?.success) {
		//   //
		//   setPageData({
		//     eventModel: response?.data?.eventModel,
		//   });
		//   //
		// }
		//
	}, [slug]);
	//
	useEffect(() => {
		//
		handleEventModel();
		//
	}, [handleEventModel]);
	//
	return (
		<div className="flex flex-col gap-6">
			{/*  */}

			{/*  */}
			<Card className="border-slate-700/50 bg-linear-to-br from-slate-900/80 via-slate-800/70 to-black/90 shadow-xl backdrop-blur-xl">
				{/*  */}

				{/*  */}
				<CardContent className="flex flex-col gap-2">
					{/*  */}

					{/*  */}
					<CardTitle className="text-2xl text-white">
						{pageData?.eventModel?.name}
					</CardTitle>
					{/*  */}

					{/*  */}
					<Badge className="border-purple-500/30 bg-purple-600/20 text-purple-300">
						{pageData?.eventModel?.eventCategory?.name}
					</Badge>
					{/*  */}

					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
				<CardContent>
					{/*  */}

					{/*  */}
					<CardTitle className="text-white">Description</CardTitle>
					{/*  */}

					{/*  */}
					<CardDescription className="text-slate-300">
						{pageData?.eventModel?.description ?? "No Description"}
					</CardDescription>
					{/*  */}

					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
				<CardContent>
					{/*  */}

					{/*  */}
					<CardTitle className="text-white">Date</CardTitle>
					{/*  */}

					{/*  */}
					<CardDescription className="text-slate-300">
						November 8, 2025 at 6:00 PM
					</CardDescription>
					{/*  */}

					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
				<CardContent className="flex flex-col gap-1">
					{/*  */}

					{/*  */}
					<CardTitle className="text-white">Locations</CardTitle>
					{/*  */}

					{/*  */}
					<Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-xl">
						{/*  */}

						{/*  */}
						{Array.from({ length: 3 }).map((item, index) => {
							return (
								<CardContent key={index} className="flex flex-col gap-1">
									{/*  */}

									{/*  */}
									<CardTitle className="text-white">Main Gallery</CardTitle>
									{/*  */}

									{/*  */}
									<CardDescription className="text-slate-300">
										789 Culture Avenue, New York, NY 10021
									</CardDescription>
									{/*  */}

									{/*  */}
								</CardContent>
							);
						})}
						{/*  */}

						{/*  */}
					</Card>
					{/*  */}

					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
				<CardContent className="flex items-center justify-between">
					{/*  */}
					<p className="text-slate-300">Status:</p>
					{/*  */}
					<Badge className="border-yellow-500/30 bg-yellow-600/20 text-yellow-300">
						Planning
					</Badge>
					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
			</Card>
			{/*  */}

			{/*  */}
			<Card className="border-slate-700/50 bg-linear-to-br from-slate-900/80 via-slate-800/70 to-black/90 shadow-xl backdrop-blur-xl">
				{/*  */}

				{/*  */}
				<CardContent className="flex flex-col gap-2">
					{/*  */}

					{/*  */}
					<CardTitle className="text-white">Quick Overview</CardTitle>
					{/*  */}

					{/*  */}
					<div className="flex items-center justify-between">
						{/*  */}
						<p className="text-slate-300">RSVPs</p>
						{/*  */}
						<CardTitle className="text-2xl font-bold text-white">3</CardTitle>
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					<div className="flex items-center justify-between">
						{/*  */}
						<p className="text-slate-300">Schedule Items</p>
						{/*  */}
						<CardTitle className="text-2xl font-bold text-white">2</CardTitle>
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					<div className="flex items-center justify-between">
						{/*  */}
						<p className="text-slate-300">Budget Spent</p>
						{/*  */}
						<CardTitle className="text-2xl font-bold text-white">$0</CardTitle>
						{/*  */}
					</div>
					{/*  */}

					{/*  */}
				</CardContent>
				{/*  */}

				{/*  */}
			</Card>
			{/*  */}

			{/*  */}
		</div>
	);
}
