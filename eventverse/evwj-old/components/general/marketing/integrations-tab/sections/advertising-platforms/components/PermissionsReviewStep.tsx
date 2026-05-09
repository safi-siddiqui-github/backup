"use client";

import { CheckCircle, Info } from "lucide-react";
import { PERMISSIONS } from "../types";
import InfoBanner from "../../../common/InfoBanner";
import Checklist from "../../../common/Checklist";

export default function PermissionsReviewStep() {
	return (
		<div className="space-y-4">
			<InfoBanner icon={CheckCircle}>
				Review the permissions required for campaign management.
			</InfoBanner>

			<Checklist items={PERMISSIONS} />

			<InfoBanner icon={Info}>
				Your credentials are encrypted and stored securely. We never share your
				data.
			</InfoBanner>
		</div>
	);
}
