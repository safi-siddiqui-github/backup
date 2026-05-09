import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Calendar,
	CalendarCheck,
	CalendarDays,
	CalendarX,
	ChevronLeft,
	ChevronRight,
	Search,
} from "lucide-react";
import { useState } from "react";
 
import { MockAttendingEvent } from "./mockAttendingEvents";
import AttendingEventCard from "./AttendingEventCard";

type AttendingEventsNavigationProps = {
  events: MockAttendingEvent[];
  onEventSelect?: (event: MockAttendingEvent) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  eventsPerPage: number;
};

const AttendingEventsNavigation = ({
	events,
	onEventSelect,
	searchTerm,
	onSearchChange,
	currentPage,
	onPageChange,
	eventsPerPage,
}: AttendingEventsNavigationProps) => {
	const [activeTimeTab, setActiveTimeTab] = useState("upcoming");

	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

	// Categorize events by time
	const categorizeEventsByTime = () => {
		const isSameDay = (date: Date) => {
			const d = new Date(date);
			return (
				d.getFullYear() === today.getFullYear() &&
				d.getMonth() === today.getMonth() &&
				d.getDate() === today.getDate()
			);
		};

		const upcoming = events.filter((event) => {
			const start = new Date(event.startDate);
			return start > now && !isSameDay(start);
		});

		const todayEvents = events.filter((event) =>
			isSameDay(new Date(event.startDate)),
		);

			const past = events.filter((event) => {
				const end = new Date(event.endDate || event.startDate);
				return end < now && !isSameDay(end);
			});
		
			const invited = events.filter((event) => {
				const rsvpStatus = event.moduleUsage?.rsvp?.status;
				const legacyStatus = event.status;
				return rsvpStatus === "pending" || legacyStatus === "pending";
			});
		
			return { upcoming, todayEvents, past, invited };
			};
		
			const { upcoming, todayEvents, past, invited } = categorizeEventsByTime();
		
			// Filter events based on search
			const filterEvents = (eventList: MockAttendingEvent[]) => {
				return eventList.filter((event) => {
					const matchesSearch =
						event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
						event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
						event.locations[0].name
							.toLowerCase()
							.includes(searchTerm.toLowerCase()) ||
						event.eventType.toLowerCase().includes(searchTerm.toLowerCase());
		
					return matchesSearch;
				});
			};
		
			const getCurrentEvents = () => {
				switch (activeTimeTab) {
					case "upcoming":
						return filterEvents(upcoming);
					case "today":
						return filterEvents(todayEvents);
					case "past":
						return filterEvents(past);
					case "invited":
						return filterEvents(invited);
					default:
						return [];
				}
			};
		
			const currentEvents = getCurrentEvents();
		
			// Pagination logic
			const totalPages = Math.ceil(currentEvents.length / eventsPerPage);
			const startIndex = (currentPage - 1) * eventsPerPage;
			const endIndex = startIndex + eventsPerPage;
			const paginatedEvents = currentEvents.slice(startIndex, endIndex);
		
			// Reset to page 1 when search changes
			const handleSearchChange = (term: string) => {
				onSearchChange(term);
				onPageChange(1);
			};
		
			// Reset to page 1 when tab changes
			const handleTabChange = (tab: string) => {
				setActiveTimeTab(tab);
				onPageChange(1);
			};
		
			const PaginationControls = () => {
				return (
					<div className="mt-6 flex items-center justify-between">
						<div className="text-sm text-gray-600">
							Showing {startIndex + 1}-{Math.min(endIndex, currentEvents.length)} of {currentEvents.length} events
						</div>
						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => onPageChange(currentPage - 1)}
								disabled={currentPage === 1}
							>
								<ChevronLeft className="mr-1 h-4 w-4" />
								Previous
							</Button>
		
							<div className="flex items-center gap-1">
								{[...Array(totalPages)].map((_, i) => (
									<Button
										key={i + 1}
										variant={currentPage === i + 1 ? "default" : "outline"}
										size="sm"
										onClick={() => onPageChange(i + 1)}
										className="h-8 w-8 p-0"
									>
										{i + 1}
									</Button>
								))}
							</div>
		
							<Button
								variant="outline"
								size="sm"
								onClick={() => onPageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
							>
								Next
								<ChevronRight className="ml-1 h-4 w-4" />
							</Button>
						</div>
					</div>
				);
			};
		
			return (
				<div className="space-y-6">
					{/* Enhanced Navigation Header */}
					<div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
						<div className="flex items-center gap-4">
							<h3 className="text-foreground text-2xl font-bold">
								Events I'm Attending
							</h3>
							<Badge
								variant="outline"
								className="border-border bg-primary/10 text-primary text-sm"
							>
								{events.length} total
							</Badge>
						</div>
		
						{/* Search */}
						<div className="relative w-full sm:w-80">
							<Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
							<Input
								placeholder="Search events..."
								value={searchTerm}
								onChange={(e) => handleSearchChange(e.target.value)}
								className="bg-card border-border text-foreground placeholder:text-muted-foreground h-11 rounded-xl pl-10"
							/>
						</div>
					</div>
		
					{/* Enhanced Time-based Tab Navigation */}
					<Tabs
						value={activeTimeTab}
						onValueChange={handleTabChange}
						className="w-full"
					>
						<TabsList className="bg-card border-border grid h-14 w-full grid-cols-4 rounded-xl border p-1 shadow-md backdrop-blur-sm">
							<TabsTrigger
								value="upcoming"
								className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2 rounded-lg text-sm font-medium transition-all"
							>
								<CalendarDays className="h-4 w-4" />
								<span>Upcoming</span>
								<Badge className="bg-primary/20 text-primary ml-1 text-xs data-[state=active]:bg-white/20 data-[state=active]:text-white">
									{upcoming.length}
								</Badge>
							</TabsTrigger>
		
							<TabsTrigger
								value="today"
								className="data-[state=active]:bg-success data-[state=active]:text-success-foreground flex items-center gap-2 rounded-lg text-sm font-medium transition-all"
							>
								<CalendarCheck className="h-4 w-4" />
								<span>Today</span>
								<Badge className="bg-success/20 text-success ml-1 text-xs data-[state=active]:bg-white/20 data-[state=active]:text-white">
									{todayEvents.length}
								</Badge>
							</TabsTrigger>
		
							<TabsTrigger
								value="past"
								className="data-[state=active]:bg-muted data-[state=active]:text-foreground flex items-center gap-2 rounded-lg text-sm font-medium transition-all"
							>
								<CalendarX className="h-4 w-4" />
								<span>Past</span>
								<Badge className="bg-muted text-muted-foreground ml-1 text-xs">
									{past.length}
								</Badge>
							</TabsTrigger>
		
							<TabsTrigger
								value="invited"
								className="data-[state=active]:bg-muted data-[state=active]:text-foreground flex items-center gap-2 rounded-lg text-sm font-medium transition-all"
							>
								<Calendar className="h-4 w-4" />
								<span>Invited</span>
								<Badge className="bg-muted text-muted-foreground ml-1 text-xs">
									{invited.length}
								</Badge>
							</TabsTrigger>
						</TabsList>
		
						{/* Tab Content */}
						{[
							"upcoming",
							"today",
							"past",
							"invited",
						].map((tab) => (
							<TabsContent key={tab} value={tab} className="mt-8 space-y-6">
								{paginatedEvents.length === 0 ? (
									<div className="bg-card border-border rounded-2xl border py-16 text-center">
										<Calendar className="text-muted-foreground mx-auto mb-4 h-20 w-20 opacity-50" />
										<p className="text-muted-foreground text-lg">
											{currentEvents.length === 0
												? `No ${tab} events found`
												: "No events found matching your search"}
										</p>
									</div>
								) : (
									<>
										<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
											{paginatedEvents.map((event) => (
												<AttendingEventCard
													key={event.id}
													event={event}
													onEventSelect={onEventSelect || (() => {})}
												/>
											))}
										</div>
										<PaginationControls />
									</>
								)}
							</TabsContent>
						))}
					</Tabs>
				</div>
			);
		};
		
		export default AttendingEventsNavigation;
