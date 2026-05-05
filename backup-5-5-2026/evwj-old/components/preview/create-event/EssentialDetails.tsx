import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
	Building2,
	Calendar,
	ChevronDown,
	Globe,
	Info,
	Lock,
	MapPin,
	User,
	Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import DateTimeManagerV2 from "./DateTimeManagerV2";
import { EnhancedDescriptionEditor } from "./EnhancedDescriptionEditor";
import LocationManagerV2 from "./LocationManagerV2";
import { EventFormData } from "./PreviewCreateEventV2Component";

interface EssentialDetailsProps {
	formData: EventFormData;
	onUpdate: (updates: Partial<EventFormData>) => void;
}

const EssentialDetails = ({ formData, onUpdate }: EssentialDetailsProps) => {
	const [openSections, setOpenSections] = useState({
		basicInfo: true,
		dateTime: false,
		location: false,
	});
	const [organizations, setOrganizations] = useState<any[]>([]);
	const [isLoadingOrgs, setIsLoadingOrgs] = useState(false);

	useEffect(() => {
		const loadOrganizations = async () => {
			setIsLoadingOrgs(true);
			// const response = await ActionResponseHelper(async () => {
			//   return await GetUserAdminOrganizationsAction();
			// });
			// if (response.success && response.data?.organizations) {
			//   setOrganizations(response.data.organizations);
			// }
			setIsLoadingOrgs(false);
		};
		loadOrganizations();
	}, []);

	const handleSkipLocation = () => {
		// Reset location to default empty state
		onUpdate({
			locations: [
				{
					id: "1",
					name: "",
					address: "",
					type: "physical",
					source: "manual",
					sections: [],
				},
			],
		});
		// Collapse the location section
		setOpenSections((prev) => ({ ...prev, location: false }));
	};

	return (
		<div className="space-y-4">
			{/* Basic Info Section */}
			<Collapsible
				open={openSections.basicInfo}
				onOpenChange={(open) =>
					setOpenSections({
						basicInfo: open,
						dateTime: false,
						location: false,
					})
				}
			>
				<Card className="border bg-white backdrop-blur-sm dark:bg-slate-800/95">
					<CollapsibleTrigger className="w-full">
						<CardHeader className="hover:bg-muted/50 cursor-pointer transition-colors dark:hover:bg-slate-700/50">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="bg-primary/8 rounded-lg p-2">
										<User className="text-primary h-4 w-4" />
									</div>
									<div className="text-left">
										<CardTitle className="text-base font-semibold">
											Basic Information
										</CardTitle>
										{!openSections.basicInfo && formData.eventName && (
											<p className="text-muted-foreground text-xs">
												{formData.eventName}
											</p>
										)}
									</div>
								</div>
								<ChevronDown
									className={cn(
										"h-4 w-4 transition-transform",
										openSections.basicInfo && "rotate-180",
									)}
								/>
							</div>
						</CardHeader>
					</CollapsibleTrigger>

					<CollapsibleContent>
						<CardContent className="space-y-4 pt-0">
							{/* Event Name */}
							<div className="space-y-2">
								<Label htmlFor="eventName">Event Name *</Label>
								<Input
									id="eventName"
									placeholder="Enter event name"
									value={formData.eventName}
									onChange={(e) => onUpdate({ eventName: e.target.value })}
									className="h-10"
								/>
							</div>

							{/* Description */}
							<div className="space-y-2">
								<Label htmlFor="description">Description</Label>
								<EnhancedDescriptionEditor
									blocks={formData.descriptionBlocks || []}
									onChange={(blocks) => onUpdate({ descriptionBlocks: blocks })}
									className="bg-white backdrop-blur-sm dark:bg-slate-800/95"
								/>
								<p className="text-muted-foreground text-xs">
									Optional • Add text, images, and videos to describe your
									event. Drag blocks to reorder them.
								</p>
							</div>

							{/* Event Visibility */}
							<div className="space-y-2">
								<Label>Event Visibility *</Label>
								<RadioGroup
									value={formData.visibility || "public"}
									onValueChange={(value) => {
										const newVisibility = value as
											| "public"
											| "private"
											| "org_members_only";
										onUpdate({
											visibility: newVisibility,
											// Clear organizationId if switching away from org_members_only
											organizationId:
												newVisibility !== "org_members_only"
													? null
													: formData.organizationId,
										});
									}}
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="public" id="public" />
										<Label
											htmlFor="public"
											className="flex cursor-pointer items-center gap-2 font-normal"
										>
											<Globe className="h-4 w-4 text-blue-500" />
											<span>Public</span>
											<span className="text-muted-foreground text-xs">
												(Available to everyone)
											</span>
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="private" id="private" />
										<Label
											htmlFor="private"
											className="flex cursor-pointer items-center gap-2 font-normal"
										>
											<Lock className="h-4 w-4 text-orange-500" />
											<span>Private</span>
											<span className="text-muted-foreground text-xs">
												(Invite only)
											</span>
										</Label>
									</div>
									{organizations.length > 0 && (
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="org_members_only"
												id="org_members_only"
											/>
											<Label
												htmlFor="org_members_only"
												className="flex cursor-pointer items-center gap-2 font-normal"
											>
												<Users className="h-4 w-4 text-purple-500" />
												<span>Org members only</span>
												<span className="text-muted-foreground text-xs">
													(Only visible to organization members)
												</span>
											</Label>
										</div>
									)}
								</RadioGroup>
							</div>

							{/* Organization Selection - Only show when "org members only" is selected */}
							{formData.visibility === "org_members_only" &&
								organizations.length > 0 && (
									<div className="space-y-2">
										<Label
											htmlFor="organization"
											className="flex items-center gap-2"
										>
											<Building2 className="h-4 w-4" />
											Select Organization *
										</Label>
										<Select
											value={formData.organizationId?.toString() || ""}
											onValueChange={(value) => {
												onUpdate({
													organizationId: value ? parseInt(value) : null,
												});
											}}
											disabled={isLoadingOrgs}
										>
											<SelectTrigger className="h-10">
												<SelectValue placeholder="Select organization" />
											</SelectTrigger>
											<SelectContent className="bg-white backdrop-blur-sm dark:bg-slate-800/95">
												{organizations.map((org) => (
													<SelectItem key={org.id} value={org.id.toString()}>
														{org.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<p className="text-muted-foreground text-xs">
											Select which organization this event is for
										</p>
									</div>
								)}
						</CardContent>
					</CollapsibleContent>
				</Card>
			</Collapsible>

			{/* Date & Time Section */}
			<Collapsible
				open={openSections.dateTime}
				onOpenChange={(open) =>
					setOpenSections({
						basicInfo: false,
						dateTime: open,
						location: false,
					})
				}
			>
				<Card className="border bg-white backdrop-blur-sm dark:bg-slate-800/95">
					<CollapsibleTrigger className="w-full">
						<CardHeader className="hover:bg-muted/50 cursor-pointer transition-colors dark:hover:bg-slate-700/50">
							<div className="flex items-center justify-between">
								<div className="flex flex-1 items-center gap-3">
									<div className="bg-primary/8 rounded-lg p-2">
										<Calendar className="text-primary h-4 w-4" />
									</div>
									<div className="flex-1 text-left">
										<CardTitle className="text-base font-semibold">
											Date & Time *
										</CardTitle>
										{!openSections.dateTime && (
											<p className="text-muted-foreground text-xs">
												{(() => {
													if (
														formData.eventDates.isMultiDay &&
														formData.eventDates.sessions?.length > 0
													) {
														// Multi-day preview
														const sessions = formData.eventDates.sessions;
														return sessions
															.map((session) => {
																const dateStr = format(session.date, "MMM dd");
																return `${dateStr} ${session.startTime || ""}-${session.endTime || ""}`;
															})
															.join(", ");
													} else if (formData.recurrence.isRecurring) {
														// Recurring preview
														const startDate = formData.eventDates.startDate
															? format(
																	formData.eventDates.startDate,
																	"MMM dd, yyyy",
																)
															: "TBD";
														const time = formData.eventDates.startTime || "TBD";
														const pattern =
															formData.recurrence.pattern || "custom";
														return `${startDate} at ${time} (${pattern})`;
													} else if (formData.eventDates.startDate) {
														// Single day preview
														return `${format(
															formData.eventDates.startDate,
															"MMM dd, yyyy",
														)} at ${formData.eventDates.startTime || "TBD"}`;
													}
													return "No date selected";
												})()}
											</p>
										)}
									</div>
								</div>
								<ChevronDown
									className={cn(
										"h-4 w-4 transition-transform",
										openSections.dateTime && "rotate-180",
									)}
								/>
							</div>
						</CardHeader>
					</CollapsibleTrigger>

					<CollapsibleContent>
						<CardContent className="pt-0">
							<DateTimeManagerV2 formData={formData} onUpdate={onUpdate} />
						</CardContent>
					</CollapsibleContent>
				</Card>
			</Collapsible>

			{/* Location Section */}
			<Collapsible
				open={openSections.location}
				onOpenChange={(open) =>
					setOpenSections({
						basicInfo: false,
						dateTime: false,
						location: open,
					})
				}
			>
				<Card className="border bg-white backdrop-blur-sm dark:bg-slate-800/95">
					<CollapsibleTrigger className="w-full">
						<CardHeader className="hover:bg-muted/50 cursor-pointer transition-colors dark:hover:bg-slate-700/50">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="bg-primary/8 rounded-lg p-2">
										<MapPin className="text-primary h-4 w-4" />
									</div>
									<div className="text-left">
										<CardTitle className="text-base font-semibold">
											Location
										</CardTitle>
										{!openSections.location && formData.locations[0]?.name && (
											<p className="text-muted-foreground text-xs">
												{formData.locations[0].name}
											</p>
										)}
									</div>
								</div>
								<ChevronDown
									className={cn(
										"h-4 w-4 transition-transform",
										openSections.location && "rotate-180",
									)}
								/>
							</div>
						</CardHeader>
					</CollapsibleTrigger>

					<CollapsibleContent>
						<CardContent className="space-y-4 pt-0">
							{/* Info about budgeting module */}
							<Card className="border-primary/20 border bg-white backdrop-blur-sm dark:bg-slate-800/95">
								<CardContent className="p-3">
									<div className="flex items-start justify-between gap-3">
										<div className="flex gap-3">
											<Info className="text-primary mt-0.5 h-4 w-4 shrink-0" />
											<p className="text-muted-foreground text-xs">
												You can skip this for now and add venue details later
												through the Budgeting module
											</p>
										</div>
										<Button
											variant="ghost"
											size="sm"
											onClick={handleSkipLocation}
											className="h-7 shrink-0 px-2 text-xs"
										>
											Skip
										</Button>
									</div>
								</CardContent>
							</Card>

							<LocationManagerV2 formData={formData} onUpdate={onUpdate} />
						</CardContent>
					</CollapsibleContent>
				</Card>
			</Collapsible>
		</div>
	);
};

export default EssentialDetails;
