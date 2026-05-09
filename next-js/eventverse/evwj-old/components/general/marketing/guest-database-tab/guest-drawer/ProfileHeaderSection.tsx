"use client";

import Avatar from "../../common/Avatar";
import { Badge } from "@/components/ui/badge";
import { GuestProfile } from "../GuestProfileDrawer";

interface ProfileHeaderSectionProps {
	guest: GuestProfile;
}

export default function ProfileHeaderSection({
	guest,
}: ProfileHeaderSectionProps) {
	return (
		<section className="flex flex-col gap-4 border-b pb-4">
			<div className="flex items-start gap-4">
				<Avatar
					initials={guest.initials}
					color={guest.color}
					size="lg"
					className="text-base"
				/>
				<div className="flex-1">
					<h2 className="text-xl font-semibold">{guest.name}</h2>
					<div className="flex flex-wrap gap-2 mt-3">
						{guest.segments.map((segment) => (
							<Badge key={segment} variant="secondary">
								{segment}
							</Badge>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
