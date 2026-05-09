"use client";

import SocialMediaAdForm from "./SocialMediaAdForm";
import { SocialMediaAdData } from "./SocialMediaAdForm";

interface LinkedInAdFormProps {
	content: SocialMediaAdData;
	onUpdate: (content: SocialMediaAdData) => void;
}

export default function LinkedInAdForm({
	content,
	onUpdate,
}: LinkedInAdFormProps) {
	return (
		<SocialMediaAdForm
			content={content}
			onUpdate={onUpdate}
			platformName="LinkedIn"
		/>
	);
}
