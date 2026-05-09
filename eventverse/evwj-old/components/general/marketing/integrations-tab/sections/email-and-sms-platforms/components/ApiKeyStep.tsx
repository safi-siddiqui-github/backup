"use client";

import { Input } from "@/components/ui/input";
import InfoBanner from "../../../common/InfoBanner";

interface ApiKeyStepProps {
	apiKey: string;
	platformName: string;
	onApiKeyChange: (key: string) => void;
}

export default function ApiKeyStep({
	apiKey,
	platformName,
	onApiKeyChange,
}: ApiKeyStepProps) {
	return (
		<div className="space-y-4">
			<InfoBanner>
				You'll need your {platformName} API key. Find it in your {platformName}{" "}
				account settings.
			</InfoBanner>

			<div className="space-y-2.5">
				<label htmlFor="api-key" className="text-sm font-medium">
					API Key
				</label>
				<Input
					id="api-key"
					type="text"
					placeholder="Enter your API key"
					value={apiKey}
					onChange={(e) => onApiKeyChange(e.target.value)}
				/>
			</div>
		</div>
	);
}
