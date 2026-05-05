"use client";

import { UserCheck } from "lucide-react";
import { GuestProfile } from "../GuestProfileDrawer";
import { cn } from "@/lib/utils";

interface CommunicationPreferencesSectionProps {
	preferences?: GuestProfile["communicationPreferences"];
}

export default function CommunicationPreferencesSection({
	preferences,
}: CommunicationPreferencesSectionProps) {
	return (
		<section className="space-y-3">
			<div className="flex items-center gap-2 text-sm font-semibold">
				<UserCheck className="h-4 w-4 text-muted-foreground" />
				Communication Preferences
			</div>
			<div className="rounded-lg border p-4 text-sm text-muted-foreground space-y-2">
				{preferences?.length ? (
					preferences.map((pref) => (
						<p
							key={pref}
							className={cn(
								pref.toLowerCase().includes("opted out")
									? "text-red-500"
									: "text-muted-foreground",
							)}
						>
							{pref}
						</p>
					))
				) : (
					<p>No special preferences</p>
				)}
			</div>
		</section>
	);
}
