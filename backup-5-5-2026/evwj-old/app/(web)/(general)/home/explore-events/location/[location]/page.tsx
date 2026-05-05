import EventsDiscoverSectionComponent from "@/components/general/events/EventsDiscoverSectionComponent";
import EventsHeroSectionComponent from "@/components/general/events/EventsHeroSectionComponent";
import HomeCarouselComponent from "@/components/general/home/HomeCarouselComponent";
import { DEFAULT_CITY } from "@/lib/city-data";
import { MOCK_EVENTS } from "@/lib/mock-events";
import { Separator } from "@/components/ui/separator";
import { ServerPropType } from "@/type";

export default async function Page(props: ServerPropType) {
	const params = (await props.params) as { location?: string };
	const location = params?.location
		? decodeURIComponent(params.location)
		: DEFAULT_CITY.name;

	return (
		<div className="whatsapp-doodle-bg flex min-h-screen flex-col bg-white dark:bg-black">
			{/* Content wrapper with orbs backdrop */}
			<div className="relative flex flex-1 flex-col">
				{/* Blurred gradient orbs backdrop (aligned with home/dashboard/event detail) */}
				<div className="pointer-events-none absolute top-0 flex h-full w-full flex-col">
					{/* Primary center orbs */}
					<div className="sticky top-32 flex w-full justify-center gap-4">
						<div className="h-56 max-w-xl flex-1 bg-blue-300/30 blur-3xl dark:bg-blue-600/30 2xl:max-w-2xl" />
						<div className="h-56 max-w-xl flex-1 bg-purple-300/30 blur-3xl dark:bg-purple-600/30 2xl:max-w-2xl" />
					</div>

					{/* Mid-page side orbs */}
					<div className="mt-[35vh] flex w-full justify-between px-6 md:px-12">
						<div className="h-40 w-40 rounded-full bg-blue-300/25 blur-3xl dark:bg-blue-600/25" />
						<div className="h-40 w-40 rounded-full bg-purple-300/25 blur-3xl dark:bg-purple-600/25" />
					</div>

					{/* Lower ambient orbs */}
					<div className="mt-auto mb-24 flex w-full justify-center gap-8">
						<div className="h-44 w-44 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-600/25" />
						<div className="h-44 w-44 rounded-full bg-purple-300/20 blur-3xl dark:bg-purple-600/25" />
					</div>
				</div>

				<div className="relative z-10">
					<EventsHeroSectionComponent location={location} />
					<div className="relative z-10 px-0 pt-1 pb-2">
						<div className="px-2 md:px-4 lg:px-6 xl:px-8 2xl:px-10">
							<HomeCarouselComponent events={MOCK_EVENTS.slice(0, 10)} sectionType="recommended" location={location} />
						</div>
					</div>
					<Separator />
					<div className="flex flex-col p-4 xl:p-8">
						<EventsDiscoverSectionComponent location={location} />
					</div>
					{/* <LayoutOneComponent></LayoutOneComponent> */}
				</div>
			</div>
		</div>
	);
}

