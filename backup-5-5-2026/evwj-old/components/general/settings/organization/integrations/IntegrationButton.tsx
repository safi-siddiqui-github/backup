"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	MessageSquare,
	Hash,
	Users,
	Video,
	Linkedin,
	Facebook,
	Instagram,
	Music,
} from "lucide-react";

type IntegrationPlatform =
	| "MS_TEAMS"
	| "SLACK"
	| "DISCORD"
	| "WEBEX"
	| "LINKEDIN"
	| "FACEBOOK"
	| "INSTAGRAM"
	| "TIKTOK";

type IntegrationButtonProps = {
	platform: IntegrationPlatform;
};

const platformConfig: Record<
	IntegrationPlatform,
	{
		name: string;
		icon: React.ComponentType<{ className?: string }>;
		color: string;
	}
> = {
	MS_TEAMS: {
		name: "Microsoft Teams",
		icon: MessageSquare,
		color: "from-blue-500 to-blue-600",
	},
	SLACK: {
		name: "Slack",
		icon: Hash,
		color: "from-purple-500 to-pink-500",
	},
	DISCORD: {
		name: "Discord",
		icon: MessageSquare,
		color: "from-indigo-500 to-purple-500",
	},
	WEBEX: {
		name: "Webex",
		icon: Video,
		color: "from-blue-600 to-cyan-500",
	},
	LINKEDIN: {
		name: "LinkedIn",
		icon: Linkedin,
		color: "from-blue-600 to-blue-700",
	},
	FACEBOOK: {
		name: "Facebook",
		icon: Facebook,
		color: "from-blue-500 to-blue-600",
	},
	INSTAGRAM: {
		name: "Instagram",
		icon: Instagram,
		color: "from-pink-500 to-purple-500",
	},
	TIKTOK: {
		name: "TikTok",
		icon: Music,
		color: "from-black to-gray-800",
	},
};

export default function IntegrationButton({
	platform,
}: IntegrationButtonProps) {
	const config = platformConfig[platform];
	const Icon = config.icon;

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="outline"
						className="w-full h-auto p-4 flex flex-col items-center gap-2 relative"
						disabled
					>
						<div
							className={`w-12 h-12 rounded-lg bg-gradient-to-r ${config.color} flex items-center justify-center`}
						>
							<Icon className="w-6 h-6 text-white" />
						</div>
						<span className="font-medium text-sm">{config.name}</span>
						<Badge variant="outline" className="text-xs">
							Coming Soon
						</Badge>
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Integration with {config.name} will be available soon</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
