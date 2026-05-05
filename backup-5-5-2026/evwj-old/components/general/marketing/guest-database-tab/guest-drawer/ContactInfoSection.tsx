"use client";

import { Mail, Phone, MapPin, UserCheck } from "lucide-react";
import { GuestProfile } from "../GuestProfileDrawer";

interface ContactInfoSectionProps {
	guest: GuestProfile;
}

export default function ContactInfoSection({ guest }: ContactInfoSectionProps) {
	return (
		<section className="space-y-4 border-b pb-4">
			<div className="flex items-center gap-2 text-sm font-semibold">
				<UserCheck className="h-4 w-4 text-muted-foreground" />
				Contact Information
			</div>
			<div className="grid gap-3 text-sm">
				<div className="flex items-center gap-3 text-muted-foreground">
					<Mail className="h-4 w-4" />
					<a href={`mailto:${guest.email}`} className="text-blue-600">
						{guest.email}
					</a>
				</div>
				<div className="flex items-center gap-3 text-muted-foreground">
					<Phone className="h-4 w-4" />
					<a href={`tel:${guest.phone}`} className="text-blue-600">
						{guest.phone}
					</a>
				</div>
				<div className="flex items-center gap-3">
					<MapPin className="h-4 w-4" />
					<span>{guest.location}</span>
				</div>
			</div>
		</section>
	);
}
