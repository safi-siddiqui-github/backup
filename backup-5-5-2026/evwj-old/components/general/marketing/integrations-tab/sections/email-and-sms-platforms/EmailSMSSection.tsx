"use client";

import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import IntegrationCard, { Integration } from "../../IntegrationCard";
import { MessageIcon, ChatIcon } from "../../IntegrationIcons";
import EmailSMSConnectionDialog from "./EmailSMSConnectionDialog";

interface EmailSMSSectionProps {
	onConnectionChange?: (count: number) => void;
}

export default function EmailSMSSection({
	onConnectionChange,
}: EmailSMSSectionProps) {
	const [integrations, setIntegrations] = useState<Integration[]>([
		{
			id: "mailchimp",
			name: "Mailchimp",
			description: "Send email campaigns and newsletters",
			icon: MessageIcon,
			iconBg: "bg-yellow-500",
			connected: false,
		},
		{
			id: "sendgrid",
			name: "SendGrid",
			description: "Transactional and marketing emails",
			icon: MessageIcon,
			iconBg: "bg-blue-600",
			connected: false,
		},
		{
			id: "twilio-sms",
			name: "Twilio SMS",
			description: "Send SMS and text message campaigns",
			icon: ChatIcon,
			iconBg: "bg-red-600",
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
						<Mail className="h-5 w-5 text-muted-foreground" />
						<h3 className="text-lg font-semibold">Email & SMS</h3>
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
				<EmailSMSConnectionDialog
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
