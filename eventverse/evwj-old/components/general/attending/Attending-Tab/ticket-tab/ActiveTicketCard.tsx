import React, { useState } from "react";
import {
	ArrowRightLeft,
	CheckCircle2,
	Wallet,
	Ticket,
	QrCode,
	Calendar,
	MapPin,
	CheckCircle,
} from "lucide-react";

import TransferModal from "./TransferModal";
import SaveToWalletModal from "./SaveToWalletModal";
import TicketQRModal from "./TicketQRModal";
import { toast } from "sonner";

export default function ActiveTicketCard({
	id,
	qrCodeString,
}: {
	id: string;
	qrCodeString: string;
}) {
	const [transferOpen, setTransferOpen] = useState(false);
	const [walletOpen, setWalletOpen] = useState(false);
	const [qrModalOpen, setQrModalOpen] = useState(false);
	const [isCheckedIn, setIsCheckedIn] = useState(false);

	const handleCheckIn = () => {
		setQrModalOpen(true);
	};

	const handleQRModalClose = () => {
		setQrModalOpen(false);
		// Mark as checked in when modal is closed (assuming they checked in)
		// In a real app, this would be based on actual check-in confirmation
		if (!isCheckedIn) {
			setIsCheckedIn(true);
			toast.success("Ticket checked in successfully!");
		}
	};

	return (
		<div
			className={`flex h-full flex-col rounded-md bg-white p-5 shadow-sm dark:bg-linear-to-b dark:from-[#070b1c] dark:to-[#090a11] transition-shadow relative ${
				isCheckedIn ? "opacity-75" : ""
			}`}
		>
			{/* Used overlay indicator */}
			{isCheckedIn && (
				<div className="absolute inset-0 rounded-md bg-gray-900/40 dark:bg-gray-900/60 z-10 flex items-center justify-center">
					<div className="flex flex-col items-center gap-2 bg-white dark:bg-gray-800 rounded-lg px-6 py-4 shadow-xl border-2 border-green-500">
						<CheckCircle className="h-12 w-12 text-green-500" />
						<span className="text-lg font-bold text-gray-900 dark:text-gray-100">
							Ticket Used
						</span>
						<span className="text-xs text-gray-600 dark:text-gray-400">
							This ticket has been checked in
						</span>
					</div>
				</div>
			)}

			<div className="mb-4 flex items-start justify-between">
				<div className="flex gap-3">
					<div
						className={`flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-sm ${
							isCheckedIn
								? "bg-gray-500 dark:bg-gray-600"
								: "bg-blue-600"
						}`}
					>
						<Ticket className="h-5 w-5" />
					</div>
					<div>
						<h4 className="text-sm font-bold text-gray-900 sm:text-base dark:text-gray-100">
							Premium All-Access Pass
						</h4>
						<p className="mt-0.5 font-mono text-xs text-gray-400 dark:text-gray-300">
							{id}
						</p>
					</div>
				</div>
				<span
					className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-bold ${
						isCheckedIn
							? "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
							: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200"
					}`}
				>
					<CheckCircle2 className="h-3 w-3" />{" "}
					{isCheckedIn ? "Used" : "Valid"}
				</span>
			</div>

			<div
				className={`mb-4 flex flex-col items-center justify-center rounded-md bg-gray-50 dark:bg-linear-to-b dark:from-[#070b1c] dark:to-[#090a11] p-6 ${
					isCheckedIn ? "opacity-50" : ""
				}`}
			>
				<QrCode
					className={`mb-2 h-24 w-24 ${
						isCheckedIn ? "text-gray-400" : "text-blue-600"
					}`}
					strokeWidth={1.5}
				/>
				<p className="mt-2 font-mono text-[10px] text-gray-400 dark:text-gray-300">
					QR Code: {qrCodeString}
				</p>
			</div>

			<div className="mb-5 space-y-2">
				<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
					<Calendar className="h-4 w-4 text-gray-400" />
					<span>Monday, December 1, 2025 at 9:00 AM</span>
				</div>
				<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
					<MapPin className="h-4 w-4 text-gray-400" />
					<span>Test Convention Center</span>
				</div>
			</div>

			<div className="mt-auto">
				<div className="mb-4 flex items-center justify-between pt-3 text-sm">
					<span className="text-gray-500 dark:text-gray-300">Purchased</span>
					<div className="text-right">
						<span className="block font-bold text-gray-900 dark:text-gray-100">
							Dec 15, 2024
						</span>
						<span className="text-xs font-bold text-green-600">$499.00</span>
					</div>
				</div>

				<div className="mb-3 flex gap-2">
					{/* Transfer Ticket button */}
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							setTransferOpen(true);
						}}
						className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-[#0f1224] dark:text-gray-100 dark:hover:bg-[#070b1c] transition"
					>
						<ArrowRightLeft className="h-4 w-4" /> Transfer Ticket
					</button>

					{/* Save to Wallet button */}
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							setWalletOpen(true);
						}}
						className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-[#0f1224] dark:text-gray-300 dark:hover:bg-[#070b1c] transition"
					>
						<Wallet className="h-4 w-4" /> Save to Wallet
					</button>
				</div>

				{/* Primary action - Check In button */}
				<button
					type="button"
					onClick={handleCheckIn}
					disabled={isCheckedIn}
					className={`w-full flex items-center justify-center gap-3 font-semibold py-2 px-4 rounded-xl shadow-md transition ${
						isCheckedIn
							? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
							: "text-white bg-linear-to-r from-[#7b3ff0] via-[#1fa0c3] to-[#5b63d8] hover:opacity-95 focus:ring-4 focus:ring-[#218ac0]"
					}`}
				>
					<CheckCircle className="h-4 w-4" /> Check In
				</button>

				{transferOpen && (
					<TransferModal
						open={transferOpen}
						onClose={() => setTransferOpen(false)}
						ticketName="Premium All-Access Pass"
						ticketId={id}
					/>
				)}

				{walletOpen && (
					<SaveToWalletModal
						open={walletOpen}
						onClose={() => setWalletOpen(false)}
						ticketName="Premium All-Access Pass"
						ticketId={id}
					/>
				)}

				{qrModalOpen && (
					<TicketQRModal
						open={qrModalOpen}
						onClose={handleQRModalClose}
						ticketId={id}
						baseQrCodeString={qrCodeString}
						ticketName="Premium All-Access Pass"
					/>
				)}
			</div>
		</div>
	);
}
