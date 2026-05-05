"use client";

import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import IntegrationCard, { Integration } from "../../IntegrationCard";
import {
	LinkedInIcon,
	InstagramIcon,
	FacebookIcon,
	TikTokIcon,
	TwitterIcon,
} from "../../IntegrationIcons";
import SocialMediaConnectionDialog from "./SocialMediaConnectionDialog";

interface SocialMediaSectionProps {
	onConnectionChange?: (count: number) => void;
}

export default function SocialMediaSection({
	onConnectionChange,
}: SocialMediaSectionProps) {
	const [integrations, setIntegrations] = useState<Integration[]>([
		{
			id: "linkedin",
			name: "LinkedIn",
			description: "Post and advertise to professional networks",
			icon: LinkedInIcon,
			iconBg: "bg-blue-600",
			connected: false,
		},
		{
			id: "instagram",
			name: "Instagram",
			description: "Share posts, reels, and run Instagram ads",
			icon: InstagramIcon,
			iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
			connected: false,
		},
		{
			id: "facebook",
			name: "Facebook",
			description: "Post to pages and run Facebook ads",
			icon: FacebookIcon,
			iconBg: "bg-blue-600",
			connected: false,
		},
		{
			id: "tiktok",
			name: "TikTok",
			description: "Create viral content and TikTok ads",
			icon: TikTokIcon,
			iconBg: "bg-black",
			connected: false,
		},
		{
			id: "twitter",
			name: "X (Twitter)",
			description: "Tweet and engage with your audience",
			icon: TwitterIcon,
			iconBg: "bg-black",
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
						<Camera className="h-5 w-5 text-muted-foreground" />
						<h3 className="text-lg font-semibold">Social Media</h3>
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
				<SocialMediaConnectionDialog
					open={dialogOpen}
					onOpenChange={setDialogOpen}
					platformName={selectedIntegration.name}
					platformId={selectedIntegration.id}
					platformIcon={selectedIntegration.icon}
					platformIconBg={selectedIntegration.iconBg}
					onConnect={handleDialogConnect}
				/>
			)}
		</>
	);
}
