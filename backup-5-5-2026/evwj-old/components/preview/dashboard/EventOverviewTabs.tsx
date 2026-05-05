import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useToast } from "@/hooks/use-toast";
import {
	Calendar,
	Car,
	FileText,
	Gift,
	HelpCircle,
	Home,
	Image,
	MapPin,
	Settings,
	ShieldCheck,
	Ticket,
	Users,
	Utensils,
} from "lucide-react";
import { EnhancedModuleGrid } from "./EnhancedModuleGrid";
import { EventFAQAccordion } from "./EventFAQAccordion";
import { EventPhotosGallery } from "./EventPhotosGallery";
import { InlineEditableField } from "./InlineEditableField";
import { SpecialGuestsGrid } from "./SpecialGuestsGrid";

interface EventOverviewTabsProps {
	event: any;
	selectedModules?: string[];
	onModuleClick?: (moduleId: string) => void;
	onActivateModule?: (module: any) => void;
}

export const EventOverviewTabs = ({
	event,
	selectedModules,
	onModuleClick,
	onActivateModule,
}: EventOverviewTabsProps) => {
	// const { toast } = useToast();
	const hasSpecialGuests =
		event.specialGuests && event.specialGuests.length > 0;
	const hasPhotos = event.photos && event.photos.length > 0;
	const hasFAQs = event.faqs && event.faqs.length > 0;

	const handleDescriptionSave = (newDescription: string) => {
		event.description = newDescription;
		// toast({
		//   title: "Description updated",
		//   description: "Your changes have been saved.",
		// });
	};

	const handleLocationNameSave = (index: number, newName: string) => {
		if (event.locations && event.locations[index]) {
			event.locations[index].name = newName;
			// toast({
			//   title: "Location updated",
			//   description: "Location name has been saved.",
			// });
		}
	};

	const handleLocationAddressSave = (index: number, newAddress: string) => {
		if (event.locations && event.locations[index]) {
			event.locations[index].address = newAddress;
			// toast({
			//   title: "Address updated",
			//   description: "Location address has been saved.",
			// });
		}
	};

	const handleSessionNameSave = (index: number, newName: string) => {
		if (event.sessions && event.sessions[index]) {
			event.sessions[index].name = newName;
			// toast({
			//   title: "Session updated",
			//   description: "Session name has been saved.",
			// });
		}
	};

	const handleSessionTimeSave = (
		index: number,
		field: "startTime" | "endTime",
		newTime: string,
	) => {
		if (event.sessions && event.sessions[index]) {
			event.sessions[index][field] = newTime;
			// toast({
			//   title: "Time updated",
			//   description: "Session time has been saved.",
			// });
		}
	};

	const handleMealOptionsSave = (newValue: string) => {
		event.mealOptions = newValue;
		// toast({
		//   title: "Meal options updated",
		//   description: "Your changes have been saved.",
		// });
	};

	const handleDressCodeSave = (newValue: string) => {
		event.dressCode = newValue;
		// toast({
		//   title: "Dress code updated",
		//   description: "Your changes have been saved.",
		// });
	};

	const handleTransportationSave = (newValue: string) => {
		event.transportation = newValue;
		// toast({
		//   title: "Transportation updated",
		//   description: "Your changes have been saved.",
		// });
	};

	const handleAccommodationSave = (newValue: string) => {
		event.accommodation = newValue;
		// toast({
		//   title: "Accommodation updated",
		//   description: "Your changes have been saved.",
		// });
	};

	return (
		<Tabs defaultValue="about" className="w-full">
			{/* Single-Level Tabs */}
			<TabsList className="inline-flex h-auto w-auto gap-1 p-1">
				<TabsTrigger
					value="about"
					className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-4 py-2 text-sm transition-all"
				>
					<FileText className="mr-1.5 h-3.5 w-3.5" />
					About
				</TabsTrigger>
				<TabsTrigger
					value="location"
					className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-4 py-2 text-sm transition-all"
				>
					<MapPin className="mr-1.5 h-3.5 w-3.5" />
					Location & Details
				</TabsTrigger>
				<TabsTrigger
					value="features"
					className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-4 py-2 text-sm transition-all"
				>
					<Settings className="mr-1.5 h-3.5 w-3.5" />
					Features
				</TabsTrigger>
			</TabsList>

			{/* About Tab */}
			<TabsContent value="about" className="mt-3 space-y-3">
				<Card className="border-border/30 shadow-sm">
					<CardHeader className="p-4 pb-3">
						<CardTitle className="text-base font-semibold">
							About This Event
						</CardTitle>
					</CardHeader>
					<CardContent className="p-4 pt-0">
						{event.description ? (
							<InlineEditableField
								value={event.description}
								onSave={handleDescriptionSave}
								type="textarea"
								multiline
								className="-m-2 p-2"
								displayClassName="text-sm text-muted-foreground leading-relaxed"
								placeholder="Add a description for your event..."
							/>
						) : (
							<InlineEditableField
								value=""
								onSave={handleDescriptionSave}
								type="textarea"
								multiline
								className="-m-2 p-2"
								displayClassName="text-sm"
								placeholder="Click to add a description for your event..."
							/>
						)}
					</CardContent>
				</Card>
			</TabsContent>

			{/* Location Tab */}
			<TabsContent value="location" className="mt-3 space-y-3">
				{/* When & Where */}
				<Card className="border-border/30 shadow-sm">
					<CardHeader className="p-4 pb-3">
						<CardTitle className="flex items-center gap-2 text-base font-semibold">
							<Calendar className="text-primary h-4 w-4" />
							When & Where
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3 p-4 pt-0">
						{/* Locations */}
						{event.locations && event.locations.length > 0 && (
							<div>
								<h4 className="text-muted-foreground mb-2 text-sm font-medium">
									Locations
								</h4>
								<div className="space-y-2">
									{event.locations.map((location: any, index: number) => (
										<div
											key={index}
											className="bg-muted/50 border-border rounded-lg border p-2.5"
										>
											<div className="mb-1 flex items-start justify-between">
												<InlineEditableField
													value={location.name}
													onSave={(newName) =>
														handleLocationNameSave(index, newName)
													}
													type="text"
													className="text-foreground flex-1 text-sm font-medium"
													displayClassName="font-medium text-sm text-foreground"
												/>
												<Badge variant="outline" className="ml-2 text-xs">
													{location.source === "marketplace"
														? "🏪 Marketplace"
														: "✏️ Custom"}
												</Badge>
											</div>
											{location.address && (
												<InlineEditableField
													value={location.address}
													onSave={(newAddress) =>
														handleLocationAddressSave(index, newAddress)
													}
													type="text"
													className="text-muted-foreground text-xs"
													displayClassName="text-xs text-muted-foreground"
												/>
											)}
											{location.sections && location.sections.length > 0 && (
												<Badge variant="secondary" className="mt-1.5 text-xs">
													{location.sections.length} sections
												</Badge>
											)}
										</div>
									))}
								</div>
							</div>
						)}

						{/* Sessions */}
						{event.sessions && event.sessions.length > 0 && (
							<div className="border-t pt-3">
								<h4 className="text-muted-foreground mb-2 text-sm font-medium">
									Sessions
								</h4>
								<div className="space-y-1.5">
									{event.sessions.map((session: any, index: number) => (
										<div
											key={index}
											className="flex flex-wrap items-center gap-2.5 text-sm"
										>
											<div className="bg-primary h-1.5 w-1.5 rounded-full" />
											<InlineEditableField
												value={session.name}
												onSave={(newName) =>
													handleSessionNameSave(index, newName)
												}
												type="text"
												className="font-medium"
												displayClassName="font-medium"
											/>
											{session.startTime && session.endTime && (
												<span className="text-muted-foreground flex gap-1 text-xs">
													<InlineEditableField
														value={session.startTime}
														onSave={(newTime) =>
															handleSessionTimeSave(index, "startTime", newTime)
														}
														type="text"
														className="text-xs"
														displayClassName="text-xs text-muted-foreground"
													/>
													<span>-</span>
													<InlineEditableField
														value={session.endTime}
														onSave={(newTime) =>
															handleSessionTimeSave(index, "endTime", newTime)
														}
														type="text"
														className="text-xs"
														displayClassName="text-xs text-muted-foreground"
													/>
												</span>
											)}
										</div>
									))}
								</div>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Guests & Tickets */}
				{(event.ticketTypes || event.guestGroups) && (
					<Card className="border-border/30 shadow-sm">
						<CardHeader className="p-4 pb-3">
							<CardTitle className="flex items-center gap-2 text-base font-semibold">
								<Ticket className="text-primary h-4 w-4" />
								Guests & Tickets
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 p-4 pt-0">
							{/* Ticket Types */}
							{event.ticketTypes && event.ticketTypes.length > 0 && (
								<div>
									<h4 className="text-muted-foreground mb-2 text-sm font-medium">
										Ticket Types
									</h4>
									<div className="space-y-1.5">
										{event.ticketTypes.map((ticket: any, index: number) => (
											<div
												key={index}
												className="bg-muted/50 flex items-center justify-between rounded-lg p-2.5"
											>
												<div>
													<p className="text-sm font-medium">{ticket.name}</p>
													{ticket.description && (
														<p className="text-muted-foreground text-xs">
															{ticket.description}
														</p>
													)}
												</div>
												<div className="text-right">
													<p className="text-base font-bold">${ticket.price}</p>
													{ticket.available && (
														<p className="text-muted-foreground text-xs">
															{ticket.available} available
														</p>
													)}
												</div>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Guest Groups */}
							{event.guestGroups && event.guestGroups.length > 0 && (
								<div className="border-t pt-3">
									<h4 className="text-muted-foreground mb-2 text-sm font-medium">
										Guest Groups
									</h4>
									<div className="flex flex-wrap gap-1.5">
										{event.guestGroups.map((group: string, index: number) => (
											<Badge
												key={index}
												variant="secondary"
												className="text-xs"
											>
												{group}
											</Badge>
										))}
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				)}

				{/* Event Features */}
				{(event.mealOptions ||
					event.dressCode ||
					event.transportation ||
					event.accommodation) && (
					<Card className="border-border/30 shadow-sm">
						<CardHeader className="p-4 pb-3">
							<CardTitle className="flex items-center gap-2 text-base font-semibold">
								<Gift className="text-primary h-4 w-4" />
								Event Features
							</CardTitle>
						</CardHeader>
						<CardContent className="grid grid-cols-1 gap-3 p-4 pt-0 md:grid-cols-3">
							{event.mealOptions && (
								<div className="flex items-start gap-2.5">
									<Utensils className="text-muted-foreground mt-0.5 h-4 w-4" />
									<div className="flex-1">
										<p className="mb-1 text-xs font-medium">Meals</p>
										<InlineEditableField
											value={event.mealOptions}
											onSave={handleMealOptionsSave}
											type="text"
											className="text-xs"
											displayClassName="text-xs text-muted-foreground"
										/>
									</div>
								</div>
							)}

							{event.dressCode && (
								<div className="flex items-start gap-2.5">
									<ShieldCheck className="text-muted-foreground mt-0.5 h-4 w-4" />
									<div className="flex-1">
										<p className="mb-1 text-xs font-medium">Dress Code</p>
										<InlineEditableField
											value={event.dressCode}
											onSave={handleDressCodeSave}
											type="text"
											className="text-xs"
											displayClassName="text-xs text-muted-foreground"
										/>
									</div>
								</div>
							)}

							{event.transportation && (
								<div className="flex items-start gap-2.5">
									<Car className="text-muted-foreground mt-0.5 h-4 w-4" />
									<div className="flex-1">
										<p className="mb-1 text-xs font-medium">Transportation</p>
										<InlineEditableField
											value={event.transportation}
											onSave={handleTransportationSave}
											type="text"
											className="text-xs"
											displayClassName="text-xs text-muted-foreground"
										/>
									</div>
								</div>
							)}

							{event.accommodation && (
								<div className="flex items-start gap-2.5">
									<Home className="text-muted-foreground mt-0.5 h-4 w-4" />
									<div className="flex-1">
										<p className="mb-1 text-xs font-medium">Accommodation</p>
										<InlineEditableField
											value={event.accommodation}
											onSave={handleAccommodationSave}
											type="text"
											className="text-xs"
											displayClassName="text-xs text-muted-foreground"
										/>
									</div>
								</div>
							)}

							{event.giftRegistry && (
								<div className="flex items-start gap-2.5">
									<Gift className="text-muted-foreground mt-0.5 h-4 w-4" />
									<div>
										<p className="text-xs font-medium">Gift Registry</p>
										<a
											href={event.giftRegistry}
											className="text-primary text-xs hover:underline"
										>
											View Registry
										</a>
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				)}

				{/* Event Gallery */}
				{hasPhotos && (
					<Card className="border-border/30 shadow-sm">
						<CardHeader className="p-4 pb-3">
							<CardTitle className="flex items-center gap-2 text-base font-semibold">
								<Image className="text-primary h-4 w-4" />
								Photo Gallery
							</CardTitle>
						</CardHeader>
						<CardContent className="p-4 pt-0">
							<EventPhotosGallery photos={event.photos} />
						</CardContent>
					</Card>
				)}

				{/* Special Guests */}
				{hasSpecialGuests && (
					<Card className="border-border/30 shadow-sm">
						<CardHeader className="p-4 pb-3">
							<CardTitle className="flex items-center gap-2 text-base font-semibold">
								<Users className="text-primary h-4 w-4" />
								Special Guests
							</CardTitle>
						</CardHeader>
						<CardContent className="p-4 pt-0">
							<SpecialGuestsGrid guests={event.specialGuests} />
						</CardContent>
					</Card>
				)}

				{/* FAQs */}
				{hasFAQs && (
					<Card className="border-border/30 shadow-sm">
						<CardHeader className="p-4 pb-3">
							<CardTitle className="flex items-center gap-2 text-base font-semibold">
								<HelpCircle className="text-primary h-4 w-4" />
								Frequently Asked Questions
							</CardTitle>
						</CardHeader>
						<CardContent className="p-4 pt-0">
							<EventFAQAccordion faqs={event.faqs} />
						</CardContent>
					</Card>
				)}
			</TabsContent>

			{/* Features Tab */}
			<TabsContent value="features" className="mt-3">
				<div className="space-y-3">
					<p className="text-muted-foreground text-sm">
						Manage all aspects of your event with these powerful features
					</p>

					{selectedModules && onModuleClick && onActivateModule && (
						<EnhancedModuleGrid
							selectedModules={selectedModules}
							onModuleClick={onModuleClick}
							onActivateModule={onActivateModule}
						/>
					)}
				</div>
			</TabsContent>
		</Tabs>
	);
};
