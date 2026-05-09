"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import InfoBanner from "../../../common/InfoBanner";

interface OAuthConnectionStepProps {
	platformName: string;
	platformIcon: React.ComponentType<{ className?: string }>;
	platformIconBg: string;
	onConnect: () => void;
}

export default function OAuthConnectionStep({
	platformName,
	platformIcon: PlatformIcon,
	platformIconBg,
	onConnect,
}: OAuthConnectionStepProps) {
	return (
		<div className="space-y-4">
			<InfoBanner>
				Connect your {platformName} account to enable posting and campaign
				management.
			</InfoBanner>

			<Button
				type="button"
				onClick={onConnect}
				className={cn(
					platformIconBg,
					"w-full justify-center gap-3 h-auto py-3 text-white hover:opacity-90 hover:bg-opacity-90",
				)}
			>
				<div className="w-8 h-8 rounded flex items-center justify-center bg-white/20 ">
					<PlatformIcon className="h-4 w-4 text-white" />
				</div>
				<span>Sign in with {platformName}</span>
			</Button>

			<p className="text-xs text-muted-foreground text-center">
				You'll be redirected to {platformName} to authorize the connection.
			</p>
		</div>
	);
}
