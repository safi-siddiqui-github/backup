"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Integration {
	id: string;
	name: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	iconBg: string;
	connected: boolean;
}

interface IntegrationCardProps {
	integration: Integration;
	onConnect: (integrationId: string) => void;
	onDismiss: (integrationId: string) => void;
}

export default function IntegrationCard({
	integration,
	onConnect,
	onDismiss,
}: IntegrationCardProps) {
	const IntegrationIcon = integration.icon;

	return (
		<Card className="relative transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg cursor-pointer">
			<CardContent className="p-5">
				{/* Dismiss Button */}
				<Button
					variant="ghost"
					size="icon"
					className="absolute top-2 right-2 h-6 w-6"
					onClick={() => onDismiss(integration.id)}
				>
					<X className="h-4 w-4" />
				</Button>

				{/* Icon */}
				<div className="mb-4">
					<div
						className={cn(
							"w-12 h-12 rounded-lg flex items-center justify-center",
							integration.iconBg,
						)}
					>
						<IntegrationIcon className="h-6 w-6 text-white" />
					</div>
				</div>

				{/* Name and Description */}
				<div className="mb-4">
					<h4 className="font-semibold text-base mb-1">{integration.name}</h4>
					<p className="text-sm text-muted-foreground">
						{integration.description}
					</p>
				</div>

				{/* Connect Button */}
				<Button
					onClick={() => onConnect(integration.id)}
					className={cn(
						"w-full",
						integration.connected
							? "bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
							: "bg-blue-600 hover:bg-blue-700 text-white",
					)}
				>
					{integration.connected ? "Connected" : `Connect ${integration.name}`}
				</Button>
			</CardContent>
		</Card>
	);
}
