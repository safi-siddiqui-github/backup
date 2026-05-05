"use client";

import { CardDescription, CardTitle } from "@/components/ui/card";
import { getAllModuleConfigs } from "@/lib/config/moduleRegistry";
import { ActionResponseDataType, ClientPropType } from "@/type";
import { useCallback, useEffect, useState } from "react";
import EventDashboardModuleCardComponent from "./EventDashboardModuleCardComponent";

export default function EventDashboardModuleComponent({
	slug,
}: ClientPropType) {
	//
	const [pageData, setPageData] = useState<{
		eventModel?: {
			name: string;
		};
	}>();
	//
	const handleEventModel = useCallback(async () => {
		//
		setPageData({
			eventModel: {
				name: "Title...",
			},
		});
		//
		// const response = await FindFirstEventAction({
		//   eventModel: {
		//     slug: slug ?? undefined,
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
			<div className="flex flex-col gap-1">
				{/*  */}

				{/*  */}
				<CardTitle className="text-white">Event Modules</CardTitle>
				{/*  */}

				{/*  */}
				<CardDescription className="text-slate-300">
					Manage all aspects of your event
				</CardDescription>
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
				{/*  */}
				{getAllModuleConfigs().map((config) => {
					const moduleKey = config.getModuleKey();
					const moduleData =
						pageData?.eventModel?.[
							moduleKey as keyof typeof pageData.eventModel
						];

					return (
						<EventDashboardModuleCardComponent
							key={config.moduleType}
							slug={slug}
							moduleType={config.moduleType}
							actionResponseDataType={
								{
									eventModel: pageData?.eventModel,
									[moduleKey]: moduleData,
								} as ActionResponseDataType
							}
						/>
					);
				})}
				{/*  */}
			</div>
			{/*  */}

			{/*  */}
		</div>
	);
}
