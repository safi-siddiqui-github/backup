"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, RefreshCw, Clock } from "lucide-react";
import QRCode from "qrcode";

interface TicketQRModalProps {
	open: boolean;
	onClose: () => void;
	ticketId: string;
	baseQrCodeString: string;
	ticketName: string;
}

// Generate a time-based token (changes every 30 seconds like authenticator apps)
function generateTimeBasedToken(baseString: string): string {
	const now = Date.now();
	// Change every 30 seconds (30000ms)
	const timeWindow = Math.floor(now / 30000);
	// Create a hash-like token from the base string and time window
	const token = `${baseString}-${timeWindow}`;
	return token;
}

export default function TicketQRModal({
	open,
	onClose,
	ticketId,
	baseQrCodeString,
	ticketName,
}: TicketQRModalProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [timeRemaining, setTimeRemaining] = useState(30);
	const [currentToken, setCurrentToken] = useState<string>("");

	// Calculate time remaining until next rotation
	useEffect(() => {
		if (!open) return;

		const updateTimeRemaining = () => {
			const now = Date.now();
			const timeWindow = Math.floor(now / 30000);
			const nextWindow = (timeWindow + 1) * 30000;
			const remaining = Math.ceil((nextWindow - now) / 1000);
			setTimeRemaining(remaining);
		};

		updateTimeRemaining();
		const interval = setInterval(updateTimeRemaining, 1000);

		return () => clearInterval(interval);
	}, [open]);

	// Generate and update QR code
	useEffect(() => {
		if (!open || !canvasRef.current) return;

		const generateQR = () => {
			const token = generateTimeBasedToken(baseQrCodeString);
			setCurrentToken(token);

			// Generate QR code with the time-based token
			QRCode.toCanvas(
				canvasRef.current!,
				token,
				{
					width: 400,
					margin: 2,
					color: {
						dark: "#000000",
						light: "#FFFFFF",
					},
					errorCorrectionLevel: "H", // High error correction for better scanning
				},
				(error) => {
					if (error) {
						console.error("QR Code generation error:", error);
					}
				},
			);
		};

		generateQR();

		// Regenerate QR code every 30 seconds
		const interval = setInterval(generateQR, 30000);

		return () => clearInterval(interval);
	}, [open, baseQrCodeString]);

	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
			onClick={onClose}
		>
			<div
				className="relative w-full max-w-md rounded-xl bg-white dark:bg-linear-to-b dark:from-[#070b1c] dark:to-[#090a11] p-6 shadow-2xl border border-gray-200 dark:border-gray-700 animate-in zoom-in-95 duration-200"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer z-10"
					aria-label="Close modal"
				>
					<X className="h-6 w-6" />
				</button>

				{/* Header */}
				<div className="mb-4 pr-8">
					<h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
						{ticketName}
					</h3>
					<p className="font-mono text-xs text-gray-500 dark:text-gray-400">
						{ticketId}
					</p>
				</div>

				{/* Timer and refresh indicator */}
				<div className="mb-4 flex items-center justify-center gap-2 rounded-lg bg-blue-50 dark:bg-blue-950/20 px-4 py-2">
					<Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
					<span className="text-sm font-medium text-blue-700 dark:text-blue-300">
						Code refreshes in {timeRemaining}s
					</span>
					{timeRemaining <= 5 && (
						<RefreshCw className="h-4 w-4 text-blue-600 dark:text-blue-400 animate-spin" />
					)}
				</div>

				{/* QR Code */}
				<div className="mb-4 flex flex-col items-center justify-center rounded-lg bg-white dark:bg-[#090a11] p-6 border-2 border-gray-200 dark:border-gray-700">
					<canvas ref={canvasRef} className="rounded-lg" />
				</div>

				{/* Info */}
				<div className="rounded-lg bg-gray-50 dark:bg-[#090a11] p-4">
					<p className="text-xs text-gray-600 dark:text-gray-400 text-center mb-2">
						<strong className="text-gray-900 dark:text-gray-100">
							Security Feature:
						</strong>{" "}
						This QR code automatically refreshes every 30 seconds for enhanced
						security, similar to authenticator apps.
					</p>
					<p className="text-xs font-mono text-gray-500 dark:text-gray-500 text-center break-all">
						{currentToken}
					</p>
				</div>

				{/* Instructions */}
				<div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3">
					<p className="text-xs text-blue-800 dark:text-blue-200 text-center">
						Hold your phone camera over this code to scan. The code will
						automatically update every 30 seconds.
					</p>
				</div>
			</div>
		</div>
	);
}

