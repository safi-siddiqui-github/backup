"use client";

import { CheckCircle } from "lucide-react";
import InfoBanner from "../../../common/InfoBanner";
import Checklist from "../../../common/Checklist";
import { COMPLIANCE_ITEMS } from "../types";

export default function ComplianceReviewStep() {
	return (
		<div className="space-y-4">
			<InfoBanner icon={CheckCircle}>
				Review compliance settings for GDPR and CAN-SPAM.
			</InfoBanner>

			<Checklist items={COMPLIANCE_ITEMS} />
		</div>
	);
}
