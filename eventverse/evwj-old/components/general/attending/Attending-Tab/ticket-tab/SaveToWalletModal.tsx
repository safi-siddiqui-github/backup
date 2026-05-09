"use client";

import React, { useMemo } from "react";
import { Wallet, Smartphone, Apple, Smartphone as AndroidIcon } from "lucide-react";
import { toast } from "sonner";

export default function SaveToWalletModal({
	open,
	onClose,
	ticketName,
	ticketId,
}: {
	open: boolean;
	onClose: () => void;
	ticketName: string;
	ticketId: string;
}) {
	// Detect device type
	const deviceType = useMemo(() => {
		if (typeof window === "undefined") return "unknown";
		
		const userAgent = window.navigator.userAgent.toLowerCase();
		const platform = window.navigator.platform.toLowerCase();
		
		// Check for iOS
		if (/iphone|ipad|ipod/.test(userAgent) || (platform === "macintel" && navigator.maxTouchPoints > 1)) {
			return "ios";
		}
		
		// Check for Android
		if (/android/.test(userAgent)) {
			return "android";
		}
		
		return "unknown";
	}, []);

	const handleAddToWallet = (walletType: "apple" | "google") => {
		// TODO: Implement backend integration for wallet pass generation
		console.log("Add to wallet", {
			walletType,
			ticketId,
			ticketName,
		});
		
		if (walletType === "apple") {
			toast.success("Adding to Apple Wallet...", {
				description: "Backend integration coming soon",
			});
		} else {
			toast.success("Adding to Google Wallet...", {
				description: "Backend integration coming soon",
			});
		}
		
		// Close modal after a brief delay
		setTimeout(() => {
			onClose();
		}, 1500);
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />

			<div
				className="relative z-10 w-full max-w-md rounded-lg bg-white dark:bg-linear-to-b dark:from-[#070b1c] dark:to-[#090a11] p-6 shadow-xl"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="mb-4 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
						<Wallet className="h-5 w-5" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
							Save to Wallet
						</h3>
						<p className="text-xs text-gray-500 dark:text-gray-400">
							Add your ticket to your digital wallet
						</p>
					</div>
				</div>

				<div className="mb-4 rounded-lg bg-gray-50 dark:bg-[#090a11] p-3">
					<div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
						Ticket
					</div>
					<div className="text-sm font-medium text-gray-900 dark:text-gray-100">
						{ticketName}
					</div>
					<div className="font-mono text-xs text-gray-400 dark:text-gray-300">
						{ticketId}
					</div>
				</div>

				<div className="mb-4 space-y-2">
					{deviceType === "ios" && (
						<button
							type="button"
							onClick={() => handleAddToWallet("apple")}
							className="w-full flex items-center justify-between gap-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f1224] p-4 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all group"
						>
							<div className="flex items-center gap-3">
								<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black text-white">
									<Apple className="h-6 w-6" />
								</div>
								<div className="text-left">
									<div className="font-semibold text-gray-900 dark:text-gray-100">
										Apple Wallet
									</div>
									<div className="text-xs text-gray-500 dark:text-gray-400">
										Recommended for your device
									</div>
								</div>
							</div>
							<Smartphone className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
						</button>
					)}

					{deviceType === "android" && (
						<button
							type="button"
							onClick={() => handleAddToWallet("google")}
							className="w-full flex items-center justify-between gap-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f1224] p-4 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all group"
						>
							<div className="flex items-center gap-3">
								<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
									<AndroidIcon className="h-6 w-6" />
								</div>
								<div className="text-left">
									<div className="font-semibold text-gray-900 dark:text-gray-100">
										Google Wallet
									</div>
									<div className="text-xs text-gray-500 dark:text-gray-400">
										Recommended for your device
									</div>
								</div>
							</div>
							<Smartphone className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
						</button>
					)}

					{deviceType === "unknown" && (
						<>
							<button
								type="button"
								onClick={() => handleAddToWallet("apple")}
								className="w-full flex items-center justify-between gap-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f1224] p-4 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all group"
							>
								<div className="flex items-center gap-3">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black text-white">
										<Apple className="h-6 w-6" />
									</div>
									<div className="text-left">
										<div className="font-semibold text-gray-900 dark:text-gray-100">
											Apple Wallet
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-400">
											For iPhone, iPad, and Mac
										</div>
									</div>
								</div>
								<Smartphone className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
							</button>

							<button
								type="button"
								onClick={() => handleAddToWallet("google")}
								className="w-full flex items-center justify-between gap-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f1224] p-4 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all group"
							>
								<div className="flex items-center gap-3">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
										<AndroidIcon className="h-6 w-6" />
									</div>
									<div className="text-left">
										<div className="font-semibold text-gray-900 dark:text-gray-100">
											Google Wallet
										</div>
										<div className="text-xs text-gray-500 dark:text-gray-400">
											For Android devices
										</div>
									</div>
								</div>
								<Smartphone className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
							</button>
						</>
					)}
				</div>

				<div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3">
					<p className="text-xs text-blue-800 dark:text-blue-200">
						<strong>Note:</strong> Backend integration for wallet pass generation is coming soon. This feature will allow you to add your ticket directly to your digital wallet.
					</p>
				</div>

				<button
					type="button"
					onClick={onClose}
					className="mt-4 w-full flex items-center justify-center gap-3 text-gray-700 bg-white py-2 px-4 rounded-xl shadow-sm hover:bg-gray-50 dark:bg-[#0f1224] dark:text-gray-100 dark:hover:bg-[#070b1c] transition"
				>
					Close
				</button>
			</div>
		</div>
	);
}

