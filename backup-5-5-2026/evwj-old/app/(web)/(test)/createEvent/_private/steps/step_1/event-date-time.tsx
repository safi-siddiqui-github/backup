import { EventFormData } from "../../types/types";
import { OpenSections } from "./step_1";
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
import LibLexicalEditor from "../../lib/lexical/lib-lexical-editor";
import { EnhancedDescriptionEditor } from "@/components/preview/create-event/EnhancedDescriptionEditor";
import DateTimeManagerV2 from './../../../../../../../components/preview/create-event/DateTimeManagerV2';
import LibDateTime from "../../lib/lib-event-create-date-time";
 
export default function EventDateTime({
    formData, onUpdate,
    openSections,
    setOpenSections,
}:{
    formData: EventFormData;
    onUpdate: (updates: Partial<EventFormData>) => void;
    openSections: OpenSections;
    setOpenSections: (sections: OpenSections) => void;
}) {
    return <>
    			{/* Date & Time Section */}
			<Collapsible
				open={openSections.dateTime}
				onOpenChange={(open) =>
					setOpenSections({
						basicInfo: false,
						dateTime: open,
						location: false,
                        description: false,
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
							{/* <DateTimeManagerV2 formData={formData} onUpdate={onUpdate} /> */}
                            <LibDateTime
                                formData={formData}
                                onUpdate={onUpdate}
                            />
						</CardContent>
					</CollapsibleContent>
				</Card>
			</Collapsible>
    </>;
}