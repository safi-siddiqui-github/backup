"use client";

import { useState, useEffect } from "react";
import { BarChart3, Target } from "lucide-react";
import IntegrationCard, { Integration } from "../../IntegrationCard";
import { GoogleAdsIcon, MetaBusinessIcon } from "../../IntegrationIcons";
import AdvertisingPlatformsConnectionDialog from "./AdvertisingPlatformsConnectionDialog";

interface AdvertisingPlatformsSectionProps {
	onConnectionChange?: (count: number) => void;
}

export default function AdvertisingPlatformsSection({
	onConnectionChange,
}: AdvertisingPlatformsSectionProps) {
	const [integrations, setIntegrations] = useState<Integration[]>([
		{
			id: "google-ads",
			name: "Google Ads",
			description: "Run search and display advertising campaigns",
			icon: GoogleAdsIcon,
			iconBg: "bg-red-600",
			connected: false,
		},
		{
			id: "meta-business",
			name: "Meta Business Suite",
			description: "Manage Facebook and Instagram ads together",
			icon: BarChart3,
			iconBg: "bg-purple-600",
			connected: false,
		},
	]);

	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedIntegration, setSelectedIntegration] =
		useState<Integration | null>(null);

	const handleConnect = (integrationId: string) => {
		const integration = integrations.find((i) => i.id === integrationId);
		if (integration && !integration.connected) {
			setSelectedIntegration(integration);
			setDialogOpen(true);
		} else if (integration && integration.connected) {
			// Disconnect
			setIntegrations(
				integrations.map((integration) =>
					integration.id === integrationId
						? { ...integration, connected: false }
						: integration,
				),
			);
		}
	};

	const handleDialogConnect = () => {
		if (selectedIntegration) {
			setIntegrations(
				integrations.map((integration) =>
					integration.id === selectedIntegration.id
						? { ...integration, connected: true }
						: integration,
				),
			);
		}
	};

	const handleDismiss = (integrationId: string) => {
		// Handle dismiss - could remove from list or mark as dismissed
		console.log("Dismiss integration:", integrationId);
	};

	const connectedCount = integrations.filter((i) => i.connected).length;

	useEffect(() => {
		onConnectionChange?.(connectedCount);
	}, [connectedCount, onConnectionChange]);

	return (
		<>
			<div className="flex flex-col gap-4">
				{/* Section Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Target className="h-5 w-5 text-muted-foreground" />
						<h3 className="text-lg font-semibold">Advertising Platforms</h3>
					</div>
					<p className="text-sm text-muted-foreground">
						{connectedCount}/{integrations.length} connected
					</p>
				</div>

				{/* Integration Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{integrations.map((integration) => (
						<IntegrationCard
							key={integration.id}
							integration={integration}
							onConnect={handleConnect}
							onDismiss={handleDismiss}
						/>
					))}
				</div>
			</div>

			{selectedIntegration && (
				<AdvertisingPlatformsConnectionDialog
					open={dialogOpen}
					onOpenChange={setDialogOpen}
					platformName={selectedIntegration.name}
					platformIcon={selectedIntegration.icon}
					platformIconBg={selectedIntegration.iconBg}
					onConnect={handleDialogConnect}
				/>
			)}
		</>
	);
}
