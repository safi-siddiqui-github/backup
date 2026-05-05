"use client";

import { CheckCircle } from "lucide-react";
import InfoBanner from "../../../common/InfoBanner";
import Checklist from "../../../common/Checklist";
import { SOCIAL_PERMISSIONS } from "../types";

interface PermissionsReviewStepProps {
	platformName: string;
}

export default function PermissionsReviewStep({
	platformName,
}: PermissionsReviewStepProps) {
	return (
		<div className="space-y-4">
			<InfoBanner icon={CheckCircle}>
				Review the permissions required for social media management.
			</InfoBanner>

			<Checklist items={SOCIAL_PERMISSIONS} />

			<InfoBanner>
				You can revoke these permissions at any time from your {platformName}{" "}
				account settings.
			</InfoBanner>
		</div>
	);
}
