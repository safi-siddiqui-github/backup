"use client";

import SocialMediaPostForm, {
	SocialMediaPostData,
} from "./SocialMediaPostForm";

interface InstagramPostFormProps {
	content: SocialMediaPostData;
	onUpdate: (content: SocialMediaPostData) => void;
}

export default function InstagramPostForm({
	content,
	onUpdate,
}: InstagramPostFormProps) {
	return (
		<SocialMediaPostForm
			content={content}
			onUpdate={onUpdate}
			platformName="Instagram"
		/>
	);
}
