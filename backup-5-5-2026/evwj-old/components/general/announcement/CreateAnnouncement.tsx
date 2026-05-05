"use client";

import { ChevronLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { Priority, CreateAnnouncementProps } from "./announcement-types";
import { ANNOUNCEMENT_TYPES, AUDIENCE_OPTIONS } from "./create/constants";
import HeaderActions from "./create/HeaderActions";
import TypeSelector from "./create/TypeSelector";
import DetailsForm from "./create/DetailsForm";
import FileUploadSection from "./create/FileUploadSection";
import AudienceSelector from "./create/AudienceSelector";
import DeliveryMethodSelector, {
	type DeliveryMethod,
} from "./create/DeliveryMethodSelector";
import LivePreviewCard from "./create/LivePreviewCard";
import PreviewModal from "./create/PreviewModal";

export default function CreateAnnouncement({
	setShowCreate,
	duplicateData,
}: CreateAnnouncementProps) {
	const [selectedType, setSelectedType] = useState<string>(
		"General Announcement",
	);
	const [title, setTitle] = useState<string>(
		duplicateData?.title || "Important Event Update",
	);
	const [message, setMessage] = useState<string>(
		duplicateData?.description ||
			"We have an important update regarding your upcoming event. Please read the details below and contact us if you have any questions.",
	);
	const [priority, setPriority] = useState<Priority>(
		duplicateData?.priority || "medium",
	);
	const [selectedAudienceId, setSelectedAudienceId] =
		useState<string>("All Attendees");
	const [selectedSubOptions, setSelectedSubOptions] = useState<
		Record<string, string[]>
	>({});
	const [customEmails, setCustomEmails] = useState<string>("");
	const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
	const [errors, setErrors] = useState<{ title?: string; message?: string }>(
		{},
	);
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
	const [selectedDeliveryMethods, setSelectedDeliveryMethods] = useState<
		DeliveryMethod[]
	>(["In-App"]);

	const recipientCount = useMemo(() => {
		if (selectedAudienceId === "All Attendees") {
			const allAttendeesOption = AUDIENCE_OPTIONS.find(
				(opt) => opt.id === "All Attendees",
			);
			return allAttendeesOption?.totalCount ?? 0;
		}
		if (selectedAudienceId === "Custom Email List") {
			const emails = customEmails
				.split(/[\n,]/)
				.map((e) => e.trim())
				.filter(Boolean);
			return emails.length;
		}
		const currentOption = AUDIENCE_OPTIONS.find(
			(opt) => opt.id === selectedAudienceId,
		);
		if (!currentOption || !currentOption.subOptions) return 0;

		const selected = selectedSubOptions[selectedAudienceId] || [];
		return currentOption.subOptions
			.filter((sub) => selected.includes(sub.id))
			.reduce((total, sub) => total + sub.count, 0);
	}, [selectedAudienceId, selectedSubOptions, customEmails]);

	const livePreviewAudience = useMemo(() => {
		if (selectedAudienceId === "All Attendees") return "All Attendees";
		if (selectedAudienceId === "Custom Email List") {
			const count = recipientCount;
			return count > 0
				? `${count} Custom Recipient${count > 1 ? "s" : ""}`
				: "0 Recipients";
		}
		const selectedCount = (selectedSubOptions[selectedAudienceId] || []).length;
		if (selectedAudienceId === "Specific RSVP Groups") {
			return selectedCount > 0
				? `${selectedCount} Group${selectedCount > 1 ? "s" : ""}`
				: "0 Groups";
		}
		if (selectedAudienceId === "Specific Ticket Tiers") {
			return selectedCount > 0
				? `${selectedCount} Tier${selectedCount > 1 ? "s" : ""}`
				: "0 Tiers";
		}
		return "N/A";
	}, [selectedAudienceId, selectedSubOptions, recipientCount]);

	const handleTypeChange = (name: string) => {
		const type =
			ANNOUNCEMENT_TYPES.find((t) => t.name === name) || ANNOUNCEMENT_TYPES[0];
		setSelectedType(type.name);
		setTitle(type.defaultTitle);
		setMessage(type.defaultMessage);
		setPriority(type.priority);
	};

	const handleSubOptionChange = (subOptionId: string) => {
		const currentSelection = selectedSubOptions[selectedAudienceId] || [];
		const newSelection = currentSelection.includes(subOptionId)
			? currentSelection.filter((id) => id !== subOptionId)
			: [...currentSelection, subOptionId];
		setSelectedSubOptions((prev) => ({
			...prev,
			[selectedAudienceId]: newSelection,
		}));
	};

	const handleSend = () => {
		const newErrors: { title?: string; message?: string } = {};

		if (!title.trim()) {
			newErrors.title = "Title is required.";
		}
		if (!message.trim()) {
			newErrors.message = "Message content is required.";
		}

		setErrors(newErrors);

		if (Object.keys(newErrors).length > 0) {
			toast.error("Please fill all required fields.");
			return;
		}

		toast.success("Announcement sent successfully!");
	};

	const handleSaveDraft = () => {
		toast.success("Draft saved!");
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const newFiles = Array.from(files);
			setUploadedFiles((prev) => [...prev, ...newFiles]);
			toast.success(`${newFiles.length} file(s) uploaded successfully!`);
		}
	};

	const handleRemoveFile = (index: number) => {
		setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
		toast.success("File removed!");
	};

	return (
		<div className="bg-background min-h-screen pt-28 md:pt-32 px-4 md:px-6">
			<div className="mx-auto max-w-6xl">
				<div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
						<button
							onClick={setShowCreate ? () => setShowCreate(false) : undefined}
							className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-slate-700/50 self-start sm:self-auto"
						>
							<ChevronLeft
								size={20}
								className="text-gray-600 dark:text-slate-400"
							/>
						</button>
						<div>
							<h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-slate-200">
								Create Announcement
							</h1>
							<p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
								Send important updates to your event attendees
							</p>
						</div>
					</div>
					<HeaderActions
						onPreview={() => setIsPreviewModalOpen(true)}
						onSave={handleSaveDraft}
						onSend={handleSend}
						onCancel={setShowCreate ? () => setShowCreate(false) : undefined}
					/>
				</div>

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					<div className="space-y-8 rounded-lg border border-gray-200 dark:border-slate-600 !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] p-6 lg:col-span-2">
						<div>
							<h2 className="text-lg font-semibold text-gray-900 dark:text-slate-200">
								Announcement Details
							</h2>
							<p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
								Configure your announcement settings and content
							</p>
						</div>

						<div>
							<label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200">
								Announcement Type
							</label>
							<TypeSelector value={selectedType} onChange={handleTypeChange} />
						</div>

						<DetailsForm
							title={title}
							message={message}
							priority={priority}
							errors={errors}
							onChange={(patch) => {
								if (patch.title !== undefined) {
									setTitle(patch.title);
									if (errors.title)
										setErrors((prev) => ({ ...prev, title: undefined }));
								}
								if (patch.message !== undefined) {
									setMessage(patch.message);
									if (errors.message)
										setErrors((prev) => ({ ...prev, message: undefined }));
								}
								if (patch.priority !== undefined) setPriority(patch.priority);
							}}
						/>

						<FileUploadSection
							files={uploadedFiles}
							onUpload={handleFileUpload}
							onRemove={handleRemoveFile}
						/>

						<DeliveryMethodSelector
							selectedMethods={selectedDeliveryMethods}
							onChange={setSelectedDeliveryMethods}
						/>

						<AudienceSelector
							selectedAudienceId={selectedAudienceId}
							selectedSubOptions={selectedSubOptions}
							customEmails={customEmails}
							onAudienceChange={setSelectedAudienceId}
							onSubOptionToggle={handleSubOptionChange}
							onCustomEmailsChange={setCustomEmails}
							recipientCount={recipientCount}
						/>
					</div>

					<div className="lg:col-span-1">
						<LivePreviewCard
							selectedType={selectedType}
							title={title}
							message={message}
							priority={priority}
							audienceText={livePreviewAudience}
						/>
					</div>
				</div>
			</div>

			<PreviewModal
				open={isPreviewModalOpen}
				onClose={() => setIsPreviewModalOpen(false)}
				selectedType={selectedType}
				title={title}
				message={message}
				priority={priority}
				audienceText={livePreviewAudience}
			/>
		</div>
	);
}
