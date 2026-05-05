"use client";
import { useState, useRef } from "react";
import { toast } from "sonner";
import QRCode from "qrcode";
import { MOCK_SURVEYS } from "../types/share-types";
import SurveySelector from "../common/SurveySelector";
import QRCodeSection from "./QRCodeSection";
import SurveyLinkInput from "./SurveyLinkInput";
import ShareActionButtons from "./ShareActionButtons";
import HowToUseSection from "../core/HowToUseSection";
import LargeQRModal from "./LargeQRModal";
import ShareSurveyPreviewModal from "./ShareSurveyPreviewModal";
import React from "react";

export default function ShareSurvey() {
	const [selectedSurveyId, setSelectedSurveyId] = useState<string>("");
	const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
	const [showLargeQR, setShowLargeQR] = useState<boolean>(false);
	const [showPreview, setShowPreview] = useState<boolean>(false);
	const qrCanvasRef = useRef<HTMLCanvasElement>(null);
	const largeQrCanvasRef = useRef<HTMLCanvasElement>(null);

	const selectedSurvey = MOCK_SURVEYS.find(
		(s) => s.id === parseInt(selectedSurveyId),
	);
	const surveyLink = selectedSurvey
		? `https://preview--celebrate-connect-app-98.lovable.app/survey/${selectedSurvey.id}`
		: "";

	React.useEffect(() => {
		if (surveyLink && qrCanvasRef.current) {
			QRCode.toCanvas(
				qrCanvasRef.current,
				surveyLink,
				{
					width: 192,
					margin: 2,
					color: {
						dark: "#000000",
						light: "#FFFFFF",
					},
				},
				(error) => {
					if (error) {
						console.error("QR Code generation error:", error);
						toast.error("Failed to generate QR code");
					} else {
						// Convert canvas to data URL for download
						setQrCodeUrl(qrCanvasRef.current!.toDataURL("image/png"));
					}
				},
			);
		}
	}, [surveyLink]);

	// Generate large QR code when modal opens
	React.useEffect(() => {
		if (showLargeQR && surveyLink && largeQrCanvasRef.current) {
			QRCode.toCanvas(
				largeQrCanvasRef.current,
				surveyLink,
				{
					width: 400,
					margin: 2,
					color: {
						dark: "#000000",
						light: "#FFFFFF",
					},
				},
				(error) => {
					if (error) {
						console.error("Large QR Code generation error:", error);
					}
				},
			);
		}
	}, [showLargeQR, surveyLink]);

	const handleCopyUrl = async () => {
		try {
			await navigator.clipboard.writeText(surveyLink);
			toast.success("Link copied!", {
				description: "Survey link has been copied to clipboard",
				duration: 3000,
			});
		} catch {
			toast.error("Failed to copy link", {
				description: "Please try again",
				duration: 3000,
			});
		}
	};

	const handleDownloadQR = () => {
		if (!qrCodeUrl) {
			toast.error("QR code not available");
			return;
		}
		const link = document.createElement("a");
		link.href = qrCodeUrl;
		link.download = `${selectedSurvey?.name.replace(/\s+/g, "-")}-QR.png`;
		link.click();
		toast.success("QR code downloaded!", {
			description: "QR code has been saved to your device",
			duration: 3000,
		});
	};

	const handlePreview = () => {
		if (surveyLink) {
			setShowPreview(true);
		}
	};

	const handleLargeQRDownload = () => {
		if (largeQrCanvasRef.current) {
			const url = largeQrCanvasRef.current.toDataURL("image/png");
			const link = document.createElement("a");
			link.href = url;
			link.download = `${selectedSurvey?.name.replace(/\s+/g, "-")}-Large-QR.png`;
			link.click();
			toast.success("Large QR code downloaded!", {
				description: "QR code has been saved to your device",
				duration: 3000,
			});
		}
	};

	return (
		<div className="space-y-6">
			{/* Select Survey Section */}
			<SurveySelector
				selectedSurveyId={selectedSurveyId}
				onSelectSurvey={setSelectedSurveyId}
				surveys={MOCK_SURVEYS}
			/>

			{/* Sharing Details Section (Conditional) */}
			{selectedSurvey && (
				<div className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] border border-gray-200 dark:border-slate-600 shadow-lg rounded-xl p-6 sm:p-8 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-slate-200 mb-2">
						Share &quot;{selectedSurvey.name}&quot;
					</h2>
					<p className="text-sm text-gray-600 dark:text-slate-400 mb-8">
						Use the QR code or direct link to share your survey with guests
					</p>

					<div className="flex flex-col lg:flex-row gap-8">
						{/* QR Code */}
						<QRCodeSection qrCanvasRef={qrCanvasRef} />

						{/* Link & Actions */}
						<div className="flex-1 space-y-6">
							{/* Direct Link */}
							<SurveyLinkInput surveyLink={surveyLink} onCopy={handleCopyUrl} />

							{/* Action Buttons */}
							<ShareActionButtons
								onShowLargeQR={() => setShowLargeQR(true)}
								onDownloadQR={handleDownloadQR}
								onPreview={handlePreview}
							/>

							{/* How to use */}
							<HowToUseSection />
						</div>
					</div>
				</div>
			)}

			{/* Large QR Modal */}
			<LargeQRModal
				isOpen={showLargeQR}
				onClose={() => setShowLargeQR(false)}
				surveyName={selectedSurvey?.name || ""}
				largeQrCanvasRef={largeQrCanvasRef}
				onDownload={handleLargeQRDownload}
			/>

			{/* Preview Modal */}
			<ShareSurveyPreviewModal
				isOpen={showPreview}
				onClose={() => setShowPreview(false)}
				surveyName={selectedSurvey?.name || ""}
				surveyLink={surveyLink}
			/>
		</div>
	);
}
