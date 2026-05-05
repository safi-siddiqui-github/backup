"use client";

import SocialMediaAdForm from "./SocialMediaAdForm";
import { SocialMediaAdData } from "./SocialMediaAdForm";

interface InstagramAdFormProps {
	content: SocialMediaAdData;
	onUpdate: (content: SocialMediaAdData) => void;
}

export default function InstagramAdForm({
	content,
	onUpdate,
}: InstagramAdFormProps) {
	return (
		<SocialMediaAdForm
			content={content}
			onUpdate={onUpdate}
			platformName="Instagram"
		/>
	);
}
