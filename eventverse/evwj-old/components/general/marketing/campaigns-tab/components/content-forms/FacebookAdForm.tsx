"use client";

import SocialMediaAdForm from "./SocialMediaAdForm";
import { SocialMediaAdData } from "./SocialMediaAdForm";

interface FacebookAdFormProps {
	content: SocialMediaAdData;
	onUpdate: (content: SocialMediaAdData) => void;
}

export default function FacebookAdForm({
	content,
	onUpdate,
}: FacebookAdFormProps) {
	return (
		<SocialMediaAdForm
			content={content}
			onUpdate={onUpdate}
			platformName="Facebook"
		/>
	);
}
