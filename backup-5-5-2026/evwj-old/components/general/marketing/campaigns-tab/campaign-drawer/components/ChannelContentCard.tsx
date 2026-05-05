"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmailContentData } from "../../components/content-forms/EmailContentForm";
import { PhysicalMailContentData } from "../../components/content-forms/PhysicalMailContentForm";
import { SocialMediaPostData } from "../../components/content-forms/SocialMediaPostForm";
import { SocialMediaAdData } from "../../components/content-forms/SocialMediaAdForm";
import { isContentComplete } from "../utils";

interface ChannelContentCardProps {
	channelId: string;
	channelName: string;
	icon: LucideIcon | React.ComponentType<{ className?: string }>;
	content: any;
}

export default function ChannelContentCard({
	channelId,
	channelName,
	icon: Icon,
	content,
}: ChannelContentCardProps) {
	const isComplete = isContentComplete(channelId, content);

	return (
		<div className="border border-gray-200 dark:border-slate-600 rounded-lg p-4 space-y-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Icon className="h-4 w-4 text-muted-foreground" />
					<span className="text-sm font-semibold">{channelName}</span>
				</div>
				<span
					className={cn(
						"px-2.5 py-1 rounded-full text-xs font-semibold",
						isComplete
							? "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
							: "bg-gray-50 dark:bg-gray-950/30 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800",
					)}
				>
					{isComplete ? "Completed" : "Pending"}
				</span>
			</div>

			{/* Content Details */}
			{content && (
				<div className="space-y-2 pt-2 border-t border-gray-200 dark:border-slate-600">
					{/* SMS */}
					{channelId === "sms" && "message" in content && (
						<div>
							<p className="text-xs font-semibold text-muted-foreground mb-1">
								Message
							</p>
							<p className="text-sm line-clamp-2">{content.message}</p>
						</div>
					)}

					{/* Email */}
					{channelId === "email" && "subjectLine" in content && (
						<div className="space-y-2">
							<div>
								<p className="text-xs font-semibold text-muted-foreground mb-1">
									Subject
								</p>
								<p className="text-sm">{content.subjectLine || "No subject"}</p>
							</div>
							<div>
								<p className="text-xs font-semibold text-muted-foreground mb-1">
									Content
								</p>
								<p className="text-sm line-clamp-2">
									{content.bodyContent || "No content"}
								</p>
							</div>
							{content.callToActionText && (
								<div>
									<p className="text-xs font-semibold text-muted-foreground mb-1">
										Call to Action
									</p>
									<span className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold">
										{content.callToActionText}
									</span>
								</div>
							)}
						</div>
					)}

					{/* Physical Mail */}
					{channelId === "mail" && "subjectLine" in content && (
						<div className="space-y-2">
							<div>
								<p className="text-xs font-semibold text-muted-foreground mb-1">
									Subject
								</p>
								<p className="text-sm">{content.subjectLine || "No subject"}</p>
							</div>
							<div>
								<p className="text-xs font-semibold text-muted-foreground mb-1">
									Content
								</p>
								<p className="text-sm line-clamp-2">
									{content.bodyContent || "No content"}
								</p>
							</div>
							{content.callToActionText && (
								<div>
									<p className="text-xs font-semibold text-muted-foreground mb-1">
										Call to Action
									</p>
									<span className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold">
										{content.callToActionText}
									</span>
								</div>
							)}
						</div>
					)}

					{/* Social Media Posts */}
					{channelId.includes("-post") && "postContent" in content && (
						<div>
							<p className="text-xs font-semibold text-muted-foreground mb-1">
								Content
							</p>
							<p className="text-sm line-clamp-3">
								{content.postContent || "No content"}
							</p>
							{content.hashtags && (
								<p className="text-sm text-blue-600 mt-2">{content.hashtags}</p>
							)}
							{content.mentions && (
								<p className="text-sm text-blue-600 mt-1">{content.mentions}</p>
							)}
						</div>
					)}

					{/* Social Media Ads */}
					{channelId.includes("-ad") && "headline" in content && (
						<div className="space-y-2">
							<div>
								<p className="text-xs font-semibold text-muted-foreground mb-1">
									Headline
								</p>
								<p className="text-sm font-semibold">
									{content.headline || "No headline"}
								</p>
							</div>
							<div>
								<p className="text-xs font-semibold text-muted-foreground mb-1">
									Description
								</p>
								<p className="text-sm line-clamp-2">
									{content.description || "No description"}
								</p>
							</div>
							{content.callToAction && (
								<div>
									<p className="text-xs font-semibold text-muted-foreground mb-1">
										Call to Action
									</p>
									<span className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold">
										{content.callToAction}
									</span>
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
