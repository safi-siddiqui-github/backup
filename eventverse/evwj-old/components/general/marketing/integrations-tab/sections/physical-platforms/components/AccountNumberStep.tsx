"use client";

import { Input } from "@/components/ui/input";
import InfoBanner from "../../../common/InfoBanner";

interface AccountNumberStepProps {
	accountNumber: string;
	platformName: string;
	onAccountNumberChange: (number: string) => void;
}

export default function AccountNumberStep({
	accountNumber,
	platformName,
	onAccountNumberChange,
}: AccountNumberStepProps) {
	return (
		<div className="space-y-4">
			<InfoBanner>
				Enter your {platformName} account number to connect your shipping
				account.
			</InfoBanner>

			<div className="space-y-2.5">
				<label htmlFor="account-number" className="text-sm font-medium">
					{platformName} Account Number
				</label>
				<Input
					id="account-number"
					type="text"
					placeholder="Enter account number"
					value={accountNumber}
					onChange={(e) => onAccountNumberChange(e.target.value)}
				/>
			</div>
		</div>
	);
}
