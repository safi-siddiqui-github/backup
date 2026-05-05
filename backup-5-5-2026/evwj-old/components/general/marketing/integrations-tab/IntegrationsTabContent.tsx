"use client";

import { useState, useCallback } from "react";
import AdvertisingPlatformsSection from "./sections/advertising-platforms/AdvertisingPlatformsSection";
import EmailSMSSection from "./sections/email-and-sms-platforms/EmailSMSSection";
import PhysicalMailSection from "./sections/physical-platforms/PhysicalMailSection";
import SocialMediaSection from "./sections/social-media-platforms/SocialMediaSection";

const TOTAL_INTEGRATIONS = 12; // 5 + 2 + 3 + 2

export default function IntegrationsTabContent() {
	const [connectionCounts, setConnectionCounts] = useState({
		socialMedia: 0,
		advertising: 0,
		emailSms: 0,
		physicalMail: 0,
	});

	const totalConnected =
		connectionCounts.socialMedia +
		connectionCounts.advertising +
		connectionCounts.emailSms +
		connectionCounts.physicalMail;

	const handleSocialMediaChange = useCallback((count: number) => {
		setConnectionCounts((prev) => ({ ...prev, socialMedia: count }));
	}, []);

	const handleAdvertisingChange = useCallback((count: number) => {
		setConnectionCounts((prev) => ({ ...prev, advertising: count }));
	}, []);

	const handleEmailSmsChange = useCallback((count: number) => {
		setConnectionCounts((prev) => ({ ...prev, emailSms: count }));
	}, []);

	const handlePhysicalMailChange = useCallback((count: number) => {
		setConnectionCounts((prev) => ({ ...prev, physicalMail: count }));
	}, []);

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h2 className="text-2xl font-semibold mb-2">
						Marketing Integrations
					</h2>
					<p className="text-sm text-muted-foreground">
						Connect platforms to enable multi-channel campaigns
					</p>
				</div>
				<div className="text-right">
					<p className="text-sm font-medium">
						{totalConnected}/{TOTAL_INTEGRATIONS} Connected
					</p>
				</div>
			</div>

			{/* Integration Sections */}
			<div className="flex flex-col gap-8">
				<SocialMediaSection onConnectionChange={handleSocialMediaChange} />
				<AdvertisingPlatformsSection
					onConnectionChange={handleAdvertisingChange}
				/>
				<EmailSMSSection onConnectionChange={handleEmailSmsChange} />
				<PhysicalMailSection onConnectionChange={handlePhysicalMailChange} />
			</div>
		</div>
	);
}
