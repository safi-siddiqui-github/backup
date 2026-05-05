"use client";

import SocialMediaPostForm, {
	SocialMediaPostData,
} from "./SocialMediaPostForm";

interface FacebookPostFormProps {
	content: SocialMediaPostData;
	onUpdate: (content: SocialMediaPostData) => void;
}

export default function FacebookPostForm({
	content,
	onUpdate,
}: FacebookPostFormProps) {
	return (
		<SocialMediaPostForm
			content={content}
			onUpdate={onUpdate}
			platformName="Facebook"
		/>
	);
}
