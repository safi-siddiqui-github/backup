"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Users } from "lucide-react";
import InfoBanner from "../../../common/InfoBanner";
import { DEMO_SOCIAL_ACCOUNTS, type SocialAccount } from "../types";

interface AccountSelectionStepProps {
	platformId: string;
	selectedAccount: string;
	onAccountChange: (accountId: string) => void;
}

export default function AccountSelectionStep({
	platformId,
	selectedAccount,
	onAccountChange,
}: AccountSelectionStepProps) {
	const accounts = DEMO_SOCIAL_ACCOUNTS[platformId] || [];

	const getAccountTypeLabel = (type: SocialAccount["type"]) => {
		switch (type) {
			case "profile":
				return "Profile";
			case "page":
				return "Page";
			case "business":
				return "Business";
			default:
				return "";
		}
	};

	return (
		<div className="space-y-4">
			<InfoBanner icon={Users}>
				Select the account or page you want to use for posting and campaigns.
			</InfoBanner>

			<div className="space-y-2.5">
				<label htmlFor="social-account" className="text-sm font-medium">
					Account / Page
				</label>
				<Select value={selectedAccount} onValueChange={onAccountChange}>
					<SelectTrigger id="social-account" className="w-full">
						<SelectValue placeholder="Select account or page" />
					</SelectTrigger>
					<SelectContent>
						{accounts.map((account) => (
							<SelectItem key={account.id} value={account.id}>
								{account.name}
								{account.username && ` (${account.username})`}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{selectedAccount &&
				(() => {
					const selected = accounts.find((acc) => acc.id === selectedAccount);
					return selected ? (
						<div className="mt-4 p-4 border rounded-md space-y-2 bg-muted/50">
							<h4 className="text-sm font-medium mb-3">Account Details:</h4>
							<div className="flex justify-between items-center">
								<span className="text-sm text-muted-foreground">Type:</span>
								<span className="text-sm font-medium">
									{getAccountTypeLabel(selected.type)}
								</span>
							</div>
							{selected.username && (
								<div className="flex justify-between items-center">
									<span className="text-sm text-muted-foreground">
										Username:
									</span>
									<span className="text-sm font-medium">
										{selected.username}
									</span>
								</div>
							)}
							{selected.followers !== undefined && (
								<div className="flex justify-between items-center">
									<span className="text-sm text-muted-foreground">
										Followers:
									</span>
									<span className="text-sm font-medium">
										{selected.followers.toLocaleString()}
									</span>
								</div>
							)}
						</div>
					) : null;
				})()}
		</div>
	);
}
