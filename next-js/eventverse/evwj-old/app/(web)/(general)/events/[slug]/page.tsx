import EventDetailUpcomingEventsSectionComponent from "@/components/general/event-detail/EventDetailUpcomingEventsSectionComponent";
import EventDetailImagesComponent from "@/components/web/event-detail/EventDetailImagesComponent";
import EventDetailTabComponent from "@/components/web/event-detail/EventDetailTabComponent";
import EventDetailTicketComponent from "@/components/web/event-detail/EventDetailTicketComponent";
import { ServerPropType } from "@/type";

export default async function Page(props: ServerPropType) {
	const slug = (await props.params)?.slug;
	// dark:bg-[#28201F]
	return (
		<div className="whatsapp-doodle-bg flex min-h-screen flex-col bg-white dark:bg-black">
			<div className="relative flex flex-1 flex-col pt-36 pb-20">
				{/* Blurred gradient orbs backdrop (aligned with home/dashboard style) */}
				<div className="pointer-events-none absolute top-0 flex h-full w-full flex-col">
					{/* Primary center orbs */}
					<div className="sticky top-32 flex w-full justify-center gap-4">
						<div className="h-56 max-w-xl flex-1 bg-blue-300/30 blur-3xl 2xl:max-w-2xl dark:bg-blue-600/30" />
						<div className="h-56 max-w-xl flex-1 bg-purple-300/30 blur-3xl 2xl:max-w-2xl dark:bg-purple-600/30" />
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

				<div className="border-border relative z-10 flex flex-col gap-6 rounded-3xl border 2xl:mx-auto 2xl:max-w-7xl">
					<EventDetailImagesComponent />
					<div className="flex flex-col gap-4 px-4 lg:flex-row lg:items-start">
						<div className="flex flex-col lg:flex-1">
							<EventDetailTabComponent
								slug={typeof slug === "string" ? slug : undefined}
							/>
						</div>
						<div className="sticky top-20 hidden max-w-72 flex-1 flex-col lg:flex xl:max-w-96">
							<EventDetailTicketComponent />
						</div>
					</div>
				</div>

				<div className="mt-10 flex w-full flex-col items-stretch px-4 lg:px-10 2xl:mx-auto 2xl:max-w-7xl">
					<EventDetailUpcomingEventsSectionComponent
						slug={typeof slug === "string" ? slug : undefined}
					/>
				</div>

				<div className="fixed bottom-10 z-10 flex w-full flex-col items-center lg:hidden">
					<button className="2xs:text-3xl w-fit rounded-full bg-linear-to-r from-purple-600 to-cyan-600 px-8 py-2 text-center text-2xl font-medium text-white md:px-14 md:py-4">
						Get Tickets
					</button>
				</div>
			</div>
		</div>
	);
}
