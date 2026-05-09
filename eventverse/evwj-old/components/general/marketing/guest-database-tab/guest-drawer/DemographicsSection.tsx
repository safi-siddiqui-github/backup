"use client";

import { Users } from "lucide-react";
import { GuestProfile } from "../GuestProfileDrawer";

interface DemographicsSectionProps {
	guest: GuestProfile;
}

export default function DemographicsSection({
	guest,
}: DemographicsSectionProps) {
	return (
		<section className="space-y-4">
			<div className="flex items-center gap-2 text-sm font-semibold">
				<Users className="h-4 w-4 text-muted-foreground" />
				Demographics
			</div>
			<div className="grid grid-cols-2 gap-4 text-sm">
				<div>
					<p className="text-muted-foreground mb-1">Age Range</p>
					<p className="font-semibold">{guest.ageRange}</p>
				</div>
				<div>
					<p className="text-muted-foreground mb-1">Gender</p>
					<p className="font-semibold">{guest.gender}</p>
				</div>
				<div>
					<p className="text-muted-foreground mb-1">Occupation</p>
					<p className="font-semibold">{guest.occupation}</p>
				</div>
			</div>
		</section>
	);
}
