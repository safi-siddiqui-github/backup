"use client";

import SocialMediaPostForm, {
	SocialMediaPostData,
} from "./SocialMediaPostForm";

interface LinkedInPostFormProps {
	content: SocialMediaPostData;
	onUpdate: (content: SocialMediaPostData) => void;
}

export default function LinkedInPostForm({
	content,
	onUpdate,
}: LinkedInPostFormProps) {
	return (
		<SocialMediaPostForm
			content={content}
			onUpdate={onUpdate}
			platformName="LinkedIn"
		/>
	);
}
