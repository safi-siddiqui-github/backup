"use client";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import ProfileHeaderSection from "./guest-drawer/ProfileHeaderSection";
import ContactInfoSection from "./guest-drawer/ContactInfoSection";
import GuestStatsSection from "./guest-drawer/GuestStatsSection";
import DemographicsSection from "./guest-drawer/DemographicsSection";
import EventHistorySection from "./guest-drawer/EventHistorySection";
import CommunicationPreferencesSection from "./guest-drawer/CommunicationPreferencesSection";

export interface GuestProfile {
	id: string;
	name: string;
	initials: string;
	color: string;
	segments: string[];
	email: string;
	phone: string;
	location: string;
	ageRange: string;
	gender: string;
	occupation: string;
	eventsAttended: number;
	totalSpent: number;
	plusOnes: number;
	eventHistory: {
		name: string;
		date: string;
		type: string;
		ticketType: string;
		amount: number;
	}[];
	communicationPreferences?: string[];
}

interface GuestProfileDrawerProps {
	guest: GuestProfile | null;
	onClose: () => void;
}

export default function GuestProfileDrawer({
	guest,
	onClose,
}: GuestProfileDrawerProps) {
	return (
		<Sheet open={!!guest} onOpenChange={(open) => !open && onClose()}>
			<SheetContent className="w-full sm:w-[600px] md:w-[600px] max-w-none! flex flex-col p-0">
				{guest ? (
					<div className="flex flex-col h-full overflow-hidden">
						<div className="">
							<SheetHeader className="space-y-2 text-left">
								<SheetTitle className="text-lg font-semibold">
									Guest Profile
								</SheetTitle>
							</SheetHeader>
						</div>

						<div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
							<ProfileHeaderSection guest={guest} />
							<ContactInfoSection guest={guest} />
							<GuestStatsSection guest={guest} />
							<DemographicsSection guest={guest} />
							<EventHistorySection events={guest.eventHistory} />
							<CommunicationPreferencesSection
								preferences={guest.communicationPreferences}
							/>
						</div>

						<Separator />

						<div className="px-6 py-4 flex flex-col sm:flex-row gap-3">
							<Button variant="outline" className="flex-1">
								Add to Segment
							</Button>
							<Button className="flex-1 bg-blue-600 hover:bg-blue-600/90 text-white">
								Send Message
							</Button>
						</div>
					</div>
				) : null}
			</SheetContent>
		</Sheet>
	);
}
