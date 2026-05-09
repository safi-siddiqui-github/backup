"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image } from "lucide-react";

interface SMSContentFormProps {
	content: {
		message: string;
	};
	onUpdate: (content: { message: string }) => void;
}

export default function SMSContentForm({
	content,
	onUpdate,
}: SMSContentFormProps) {
	const MAX_LENGTH = 160;
	const messageLength = content.message.length;
	const segmentCount = Math.ceil(messageLength / MAX_LENGTH) || 1;

	return (
		<div className="flex flex-col gap-6 pt-4">
			{/* Message Input Card */}
			<div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 space-y-4">
				<div>
					<Label
						htmlFor="sms-message"
						className="text-sm font-semibold mb-2 block"
					>
						Message
					</Label>
					<Textarea
						id="sms-message"
						placeholder="Your message here..."
						value={content.message}
						onChange={(e) => onUpdate({ message: e.target.value })}
						rows={4}
						className="resize-none"
					/>
					<div className="flex items-center justify-between mt-2">
						<p className="text-xs text-muted-foreground">
							{messageLength}/{MAX_LENGTH} characters
						</p>
						<p className="text-xs text-muted-foreground">
							{segmentCount} SMS {segmentCount > 1 ? "segments" : "segment"}
						</p>
					</div>
				</div>

				{messageLength > MAX_LENGTH && (
					<div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
						<p className="text-xs text-amber-900 dark:text-amber-100">
							Message exceeds 160 characters and will be sent as {segmentCount}{" "}
							SMS segments. Additional charges may apply.
						</p>
					</div>
				)}
			</div>

			{/* Preview Card */}
			<div className="bg-[#F3F4F6] dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 space-y-4">
				<div className="flex items-center gap-2">
					<Image className="h-4 w-4 text-muted-foreground" />
					<Label className="text-sm font-semibold">Preview</Label>
				</div>
				<div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 min-h-[120px]">
					<Textarea
						readOnly
						value={content.message || ""}
						placeholder="Your message preview will appear here"
						className="resize-none border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none min-h-[120px]"
						rows={4}
					/>
				</div>
			</div>
		</div>
	);
}
