"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import InfoBanner from "../../../common/InfoBanner";

interface ConnectionMethodStepProps {
	platformName: string;
	platformIcon: React.ComponentType<{ className?: string }>;
	platformIconBg: string;
	connectionMethod: "oauth" | "api";
	apiKey: string;
	onConnectionMethodChange: (method: "oauth" | "api") => void;
	onApiKeyChange: (key: string) => void;
}

export default function ConnectionMethodStep({
	platformName,
	platformIcon: PlatformIcon,
	platformIconBg,
	connectionMethod,
	apiKey,
	onConnectionMethodChange,
	onApiKeyChange,
}: ConnectionMethodStepProps) {
	return (
		<div className="space-y-4">
			<InfoBanner>
				Connect your {platformName} account using OAuth or API key.
			</InfoBanner>

			<Button
				type="button"
				onClick={() => {
					onConnectionMethodChange("oauth");
					onApiKeyChange("");
				}}
				className={cn(
					"w-full justify-center gap-3 h-auto py-2 text-black border border-gray-200",
					connectionMethod === "oauth"
						? " bg-white hover:bg-muted/50 "
						: "bg-background border hover:bg-accent",
				)}
			>
				<div
					className={cn(
						"w-8 h-8 rounded flex items-center justify-center",
						platformIconBg,
					)}
				>
					<PlatformIcon className="h-4 w-4 text-white" />
				</div>
				<span>Sign in with {platformName}</span>
			</Button>

			<div className="relative flex items-center gap-4 my-4">
				<Separator className="flex-1" />
				<span className="text-xs text-muted-foreground uppercase">
					OR USE API KEY
				</span>
				<Separator className="flex-1" />
			</div>

			<div className="space-y-2.5">
				<label htmlFor="api-key" className="text-sm font-medium">
					API Key
				</label>
				<Input
					id="api-key"
					type="text"
					placeholder="Enter your API key"
					value={apiKey}
					onChange={(e) => {
						const value = e.target.value;
						onApiKeyChange(value);
						if (value.trim() !== "") {
							onConnectionMethodChange("api");
						} else if (connectionMethod === "api") {
							onConnectionMethodChange("oauth");
						}
					}}
				/>
			</div>
		</div>
	);
}
