"use client";

import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { ClientPropType } from "@/type";
import { Calendar, MapPin } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function EventDashboardModuleDetailComponent({
	slug,
}: ClientPropType) {
	//
	const [pageData, setPageData] = useState<{
		eventModel?: {
			name: string;
			eventCategory: {
				name: string;
			};
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
		<div className="flex flex-col px-4">
			{/*  */}

			{/*  */}
			<div className="flex flex-col gap-6 rounded-md bg-linear-to-br from-blue-700 to-sky-700 p-4 text-white md:p-6">
				{/*  */}

				{/*  */}
				<div className="flex flex-col gap-4">
					{/*  */}

					{/*  */}
					<CardTitle className="text-2xl md:text-4xl lg:text-5xl">
						{pageData?.eventModel?.name}
					</CardTitle>
					{/*  */}

					{/*  */}
					<Badge className="bg-white text-blue-500">
						{pageData?.eventModel?.eventCategory?.name}
					</Badge>
					{/*  */}

					{/*  */}
					<p className="3xl:w-6/7 4xl:w-7/8 line-clamp-3 text-sm tracking-tighter 2xl:w-5/6">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. A maiores
						perspiciatis temporibus veritatis quidem modi beatae, dicta
						laudantium dignissimos voluptate. Exercitationem excepturi,
						temporibus mollitia enim laboriosam molestiae nesciunt quas corporis
						dicta aliquid facilis sit cumque provident aperiam voluptas aliquam,
						hic magnam quae porro quaerat consequatur. Cum officiis perferendis
						reprehenderit earum? Lorem ipsum dolor sit amet consectetur,
						adipisicing elit. A maiores perspiciatis temporibus veritatis quidem
						modi beatae, dicta laudantium dignissimos voluptate. Exercitationem
						excepturi, temporibus mollitia enim laboriosam molestiae nesciunt
						quas corporis dicta aliquid facilis sit cumque provident aperiam
						voluptas aliquam, hic magnam quae porro quaerat consequatur. Cum
						officiis perferendis reprehenderit earum?
					</p>
					{/*  */}

					{/*  */}
				</div>
				{/*  */}

				{/*  */}
				<div className="flex flex-wrap items-center gap-4">
					{/*  */}

					{/*  */}
					<div className="flex items-center gap-2">
						{/*  */}

						{/*  */}
						<Calendar />
						{/*  */}

						{/*  */}
						<p className="text-sm">October 31- November 8, 2025</p>
						{/*  */}

						{/*  */}
					</div>
					{/*  */}

					{/*  */}
					<div className="flex items-center gap-2">
						{/*  */}

						{/*  */}
						<MapPin />
						{/*  */}

						{/*  */}
						<p className="text-sm">Main Reception Hall</p>
						{/*  */}

						{/*  */}
					</div>
					{/*  */}

					{/*  */}
				</div>
				{/*  */}

				{/*  */}
			</div>
			{/*  */}

			{/*  */}
		</div>
	);
}
