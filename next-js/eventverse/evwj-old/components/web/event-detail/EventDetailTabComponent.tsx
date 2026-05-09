import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Home, Info, MapPin, User, Users } from "lucide-react";
import EventDetailFaqsComponent from "./EventDetailFaqsComponent";
import EventDetailLocationComponent from "./EventDetailLocationComponent";
import EventDetailOrganizerComponent from "./EventDetailOrganizerComponent";
import EventDetailOverviewComponent from "./EventDetailOverviewComponent";
import EventDetailScheduleComponent from "./EventDetailScheduleComponent";
import EventDetailSpecialGuestComponent from "./EventDetailSpecialGuestComponent";

type Props = {
	slug?: string;
};

export default function EventDetailTabComponent({ slug }: Props) {
	return (
		<div className="flex flex-col">
			<Tabs defaultValue="overview" className="min-h-[620px]">
				<TabsList
					// className="w-full overflow-hidden rounded-md bg-none p-0 *:cursor-pointer *:rounded-none *:bg-white *:data-[state=active]:bg-blue-500 *:data-[state=active]:text-white dark:bg-transparent dark:*:bg-white/5 dark:*:data-[state=active]:bg-blue-500 *:*:[p]:hidden *:*:[p]:md:block"
					className="space-x-1 overflow-hidden p-0 *:cursor-pointer *:rounded-full *:bg-white *:text-xs *:data-[state=active]:bg-linear-to-r *:data-[state=active]:from-purple-600 *:data-[state=active]:to-cyan-600 *:data-[state=active]:text-white dark:bg-transparent dark:*:bg-white/5 *:data-[state=inactive]:[&>p]:hidden *:data-[state=inactive]:[&>p]:md:block"
				>
					<TabsTrigger value="overview" className="flex">
						<Home />
						<p className="">About</p>
					</TabsTrigger>
					<TabsTrigger value="location" className="flex">
						<MapPin />
						<p className="">Location</p>
					</TabsTrigger>
					<TabsTrigger value="schedule">
						<Calendar />
						<p className="">Schedule</p>
					</TabsTrigger>
					<TabsTrigger value="special">
						<Users />
						<p className="">Special Guest</p>
					</TabsTrigger>
					<TabsTrigger value="faqs">
						<Info />
						<p className="">FAQs</p>
					</TabsTrigger>
					<TabsTrigger value="organizer">
						<User />
						<p className="">Organizer</p>
					</TabsTrigger>
				</TabsList>
				<TabsContent value="overview">
					<EventDetailOverviewComponent />
				</TabsContent>
				<TabsContent value="location">
					<EventDetailLocationComponent slug={slug} />
				</TabsContent>
				<TabsContent value="schedule">
					<EventDetailScheduleComponent />
				</TabsContent>
				<TabsContent value="special">
					<EventDetailSpecialGuestComponent />
				</TabsContent>
				<TabsContent value="faqs">
					<EventDetailFaqsComponent />
				</TabsContent>
				<TabsContent value="organizer">
					<EventDetailOrganizerComponent />
				</TabsContent>
			</Tabs>
		</div>
	);
}
