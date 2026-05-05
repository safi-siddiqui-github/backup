"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DEMO_AD_ACCOUNTS, type AdAccount } from "../types";
import InfoBanner from "../../../common/InfoBanner";

interface AdAccountSelectionStepProps {
	selectedAdAccount: string;
	onAdAccountChange: (accountId: string) => void;
}

export default function AdAccountSelectionStep({
	selectedAdAccount,
	onAdAccountChange,
}: AdAccountSelectionStepProps) {
	const selectedAccount = DEMO_AD_ACCOUNTS.find(
		(account) => account.id === selectedAdAccount,
	);

	return (
		<div className="space-y-4">
			<InfoBanner>
				Select the ad account you want to use for campaigns.
			</InfoBanner>

			<div className="space-y-2.5">
				<label htmlFor="ad-account" className="text-sm font-medium">
					Ad Account
				</label>
				<Select value={selectedAdAccount} onValueChange={onAdAccountChange}>
					<SelectTrigger id="ad-account" className="w-full">
						<SelectValue placeholder="Select ad account" />
					</SelectTrigger>
					<SelectContent>
						{DEMO_AD_ACCOUNTS.map((account) => (
							<SelectItem key={account.id} value={account.id}>
								{account.name} (ID: {account.accountId})
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{selectedAccount && (
				<div className="mt-4 p-4 border rounded-md space-y-2 bg-muted/50">
					<h4 className="text-sm font-medium mb-3">Account Details:</h4>
					<div className="flex justify-between items-center">
						<span className="text-sm text-muted-foreground">
							Current Balance:
						</span>
						<span className="text-sm font-medium">
							${selectedAccount.balance}
						</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm text-muted-foreground">
							Active Campaigns:
						</span>
						<span className="text-sm font-medium">
							{selectedAccount.activeCampaigns}
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
