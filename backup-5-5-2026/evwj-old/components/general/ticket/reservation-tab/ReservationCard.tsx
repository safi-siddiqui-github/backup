import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Reservation, ReservationStatus } from "../types";

function StatusBadge({ status }: { status: ReservationStatus }) {
	const base =
		"inline-block text-xs font-medium px-2.5 py-0.5 rounded-full capitalize border";
	if (status === "sent")
		return (
			<span
				className={`${base} !bg-white dark:!bg-slate-700/50 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]`}
			>
				{status}
			</span>
		);
	if (status === "active")
		return (
			<span
				className={`${base} !bg-white dark:!bg-slate-700/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]`}
			>
				{status}
			</span>
		);
	return (
		<span
			className={`${base} !bg-white dark:!bg-slate-700/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]`}
		>
			{status}
		</span>
	);
}

function IconGift() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="inline-block"
		>
			<path
				d="M17.5 7.5H2.5C2.22386 7.5 2 7.72386 2 8V10C2 10.2761 2.22386 10.5 2.5 10.5H17.5C17.7761 10.5 18 10.2761 18 10V8C18 7.72386 17.7761 7.5 17.5 7.5Z"
				stroke="#4B5563"
				strokeWidth="1.5"
			/>
			<path
				d="M10 17.5V7.5M7.5 10C7.5 11.3807 8.61929 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10Z"
				stroke="#4B5563"
				strokeWidth="1.5"
			/>
			<path
				d="M16 17.5V10.5H12.5M4 17.5V10.5H7.5M10 7.5V4C10 3.17157 9.32843 2.5 8.5 2.5C7.67157 2.5 7 3.17157 7 4C7 4.82843 7.67157 5.5 8.5 5.5H10ZM10 7.5V4C10 3.17157 10.6716 2.5 11.5 2.5C12.3284 2.5 13 3.17157 13 4C13 4.82843 12.3284 5.5 11.5 5.5H10Z"
				stroke="#4B5563"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<rect
				x="2.5"
				y="10.5"
				width="15"
				height="7"
				rx="1"
				stroke="#4B5563"
				strokeWidth="1.5"
			/>
		</svg>
	);
}

function IconQR() {
	return (
		<svg
			className="h-3 w-3 text-gray-600 dark:text-gray-300"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="3"
				y="3"
				width="6"
				height="6"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<rect
				x="15"
				y="3"
				width="6"
				height="6"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<rect
				x="3"
				y="15"
				width="6"
				height="6"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path d="M15 15h2v2h-2z" fill="currentColor" />
		</svg>
	);
}

type Props = {
	reservation: Reservation;
	onSend: (id: string) => void;
	onCancel: (id: string) => void;
};

export default function ReservationCard({
	reservation,
	onSend,
	onCancel,
}: Props) {
	const [qrModalOpen, setQrModalOpen] = useState(false);
	const [modalPayload, setModalPayload] = useState("");
	const [modalIndex, setModalIndex] = useState<number | null>(null);

	function openQrModal(payload: string, index: number) {
		setModalPayload(payload);
		setModalIndex(index);
		setQrModalOpen(true);
	}

	function closeQrModal() {
		setQrModalOpen(false);
		setModalPayload("");
		setModalIndex(null);
	}

	async function copyPayload() {
		try {
			await navigator.clipboard.writeText(modalPayload);
			toast.success(`QR ${modalIndex} copied`);
			closeQrModal();
		} catch {
			toast.error("Failed to copy QR");
		}
	}

	return (
		<article className="!bg-white dark:!bg-[#020617] backdrop-blur-sm border border-gray-200 dark:border-slate-600 rounded-xl p-6 shadow-lg [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617] transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl">
			<header className="flex justify-between items-start gap-4">
				<div>
					<h3 className="text-lg font-semibold flex items-center gap-3 text-gray-900 dark:text-slate-200">
						<span className="inline-flex p-1 !bg-white dark:!bg-slate-700/50 rounded-md [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
							<IconGift />
						</span>
						{reservation.guestName}
						<span className="ml-2">
							<StatusBadge status={reservation.status} />
						</span>
						{reservation.status === "active" && (
							<span className="ml-3 !bg-white dark:!bg-slate-700/50 p-1 rounded-full text-gray-900 dark:text-slate-200 inline-block text-xs font-medium border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
								Sent
							</span>
						)}
					</h3>
					<p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
						{reservation.ticketType} · {reservation.ticketCount} ·{" "}
						{reservation.guestCategory}
					</p>
				</div>
				<div className="flex items-center gap-2">
					{reservation.status === "sent" && (
						<Button
							onClick={() => {
								onSend(reservation.id);
								toast.success("Invite sent");
							}}
							className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-md text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
						>
							Send Invite
						</Button>
					)}
					{reservation.status === "active" && (
						<Button
							onClick={() => {
								// reuse onSend for resend; parent updates state as needed
								onSend(reservation.id);
								toast.success("Invite resent");
							}}
							className="px-3 py-1.5 !bg-white dark:!bg-slate-700/50 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer rounded-md text-sm font-medium text-gray-700 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
						>
							Resend Invite
						</Button>
					)}
					<button
						onClick={() => onCancel(reservation.id)}
						className={`px-3 py-1.5 rounded-md text-sm font-medium ${reservation.status === "cancelled" ? "bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-400 cursor-not-allowed" : "!bg-white dark:!bg-slate-700/50 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer text-gray-700 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"}`}
						disabled={reservation.status === "cancelled"}
					>
						{reservation.status === "cancelled" ? "Cancelled" : "Cancel"}
					</button>
				</div>
			</header>

			<div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div>
					<div className="text-xs text-gray-600 dark:text-slate-400 uppercase font-medium">
						Guest Details
					</div>
					<div className="mt-1 font-medium text-gray-900 dark:text-slate-200">
						{reservation.email}
					</div>
					<div className="text-sm text-gray-600 dark:text-slate-400 mt-1">
						Reserved {reservation.reservedDate}
					</div>
				</div>

				<div>
					<div className="text-xs text-gray-600 dark:text-slate-400 uppercase font-medium">
						QR Codes
					</div>
					<div className="mt-2 flex flex-wrap gap-2">
						{Array.from({ length: reservation.qrCodes }).map((_, i) => (
							<span
								key={i}
								role="button"
								tabIndex={0}
								onClick={() => openQrModal(`${reservation.id}#${i + 1}`, i + 1)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										openQrModal(`${reservation.id}#${i + 1}`, i + 1);
									}
								}}
								className="inline-flex items-center gap-2 px-2.5 py-1 !bg-white dark:!bg-slate-700/50 rounded text-sm font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
							>
								<IconQR />#{i + 1}
							</span>
						))}
					</div>
				</div>

				<div>
					<div className="text-xs text-gray-600 dark:text-slate-400 uppercase font-medium">
						Notes
					</div>
					<div className="mt-1 text-sm text-gray-900 dark:text-slate-200">
						{reservation.notes || "—"}
					</div>
				</div>
			</div>

			{/* QR Modal */}
			{qrModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div
						className="fixed inset-0 bg-black/60 backdrop-blur-sm"
						onClick={closeQrModal}
					/>
					<div className="relative z-10 w-full max-w-md mx-4">
						<div className="!bg-white dark:!bg-[#020617] backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-200 dark:border-slate-600 [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
							<div className="flex items-start justify-between">
								<h4 className="text-lg font-semibold text-gray-900 dark:text-slate-200">
									QR Code #{modalIndex}
								</h4>
								<button
									onClick={closeQrModal}
									className="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
								>
									✕
								</button>
							</div>
							<div className="mt-4 flex flex-col items-center gap-4">
								<Image
									src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(modalPayload)}`}
									alt={`QR ${modalIndex}`}
									width={200}
									height={200}
									className="mx-auto"
									unoptimized
								/>
								<div className="!bg-white dark:!bg-slate-700/50 rounded-md p-2 text-sm font-mono break-all w-full text-center border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
									{modalPayload}
								</div>
								<div className="mt-2 flex gap-2 justify-end w-full">
									<Button
										onClick={copyPayload}
										className="px-3 py-1.5 !bg-white dark:!bg-slate-700/50 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
									>
										Copy
									</Button>
									<a
										href={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(modalPayload)}`}
										download={`qr-${modalIndex}.png`}
										className="inline-block"
									>
										<Button className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
											Download
										</Button>
									</a>
									<Button
										onClick={closeQrModal}
										className="px-3 py-1.5 !bg-white dark:!bg-slate-700/50 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
									>
										Close
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</article>
	);
}
