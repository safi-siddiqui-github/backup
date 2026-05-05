"use client";

import { Input } from "@/components/ui/input";
import InfoBanner from "../../../common/InfoBanner";

interface FromEmailStepProps {
	fromEmail: string;
	platformName: string;
	onFromEmailChange: (email: string) => void;
	error?: string;
}

export default function FromEmailStep({
	fromEmail,
	platformName,
	onFromEmailChange,
	error,
}: FromEmailStepProps) {
	return (
		<div className="space-y-4">
			<InfoBanner>Configure your sender email address.</InfoBanner>

			<div className="space-y-2.5">
				<label htmlFor="from-email" className="text-sm font-medium">
					From Email Address
				</label>
				<Input
					id="from-email"
					type="email"
					placeholder="campaigns@yourcompany.com"
					value={fromEmail}
					onChange={(e) => onFromEmailChange(e.target.value)}
					className={error ? "border-red-500" : ""}
				/>
				{error && <p className="text-sm text-red-500">{error}</p>}
				<p className="text-sm text-muted-foreground">
					This email must be verified in your {platformName} account.
				</p>
			</div>
		</div>
	);
}
