import React from "react";
import {
	Ticket,
	QrCode,
	Calendar,
	MapPin,
	Mail,
	XCircle,
	Check,
} from "lucide-react";
import { toast } from "sonner";

export default function TransferCard({
	type,
	ticketName,
	ticketId,
	onCancel,
}: {
	type: "incoming" | "outgoing";
	ticketName: string;
	ticketId: string;
	onCancel?: () => void;
}) {
	const isIncoming = type === "incoming";
	const [status, setStatus] = React.useState<
		"pending" | "accepted" | "declined"
	>("pending");
	const [confirmOpen, setConfirmOpen] = React.useState(false);
	const [confirmAction, setConfirmAction] = React.useState<
		"accept" | "decline" | "cancel" | null
	>(null);
	const [cancelled, setCancelled] = React.useState(false);

	function openConfirm(
		action: "accept" | "decline" | "cancel",
		e?: React.MouseEvent,
	) {
		e?.stopPropagation();
		setConfirmAction(action);
		setConfirmOpen(true);
	}

	function closeConfirm() {
		setConfirmOpen(false);
		setConfirmAction(null);
	}

	function performConfirm() {
		if (!confirmAction) return closeConfirm();

		if (confirmAction === "accept") {
			setStatus("accepted");
			toast.success("Transfer accepted");
		}

		if (confirmAction === "decline") {
			setStatus("declined");
			toast.error("Transfer declined");
		}

		if (confirmAction === "cancel") {
			setCancelled(true);
			toast("Transfer cancelled");
			onCancel?.();
		}

		closeConfirm();
	}

	if (cancelled) return null;

	return (
		<div
			className={`relative overflow-hidden rounded-md bg-white p-5 shadow-sm dark:bg-linear-to-b dark:from-[#070b1c] dark:to-[#090a11]`}
		>
			<div className="absolute top-4 right-4">
				{isIncoming ? (
					<div className="text-xs font-bold px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
						Incoming Transfer
					</div>
				) : (
					<button
						onClick={(e) => openConfirm("cancel", e)}
						className="text-xs font-bold px-2 py-1 rounded-full bg-transparent text-gray-400 hover:bg-gray-100 cursor-pointer dark:text-gray-100 dark:bg-[#010830] dark:border dark:hover:bg-[#070a1a]"
						aria-label="Cancel transfer"
					>
						Cancel
					</button>
				)}
			</div>

			<div className="mb-4 flex gap-3">
				<div
					className={`flex h-10 w-10 items-center justify-center rounded-sm text-white shadow-sm ${isIncoming ? "bg-blue-600" : "bg-orange-500"}`}
				>
					<Ticket className="h-5 w-5" />
				</div>
				<div className="pr-16">
					<h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
						{ticketName}
					</h4>
					<p className="mt-0.5 font-mono text-xs text-gray-400 dark:text-gray-300">
						{ticketId}
					</p>
				</div>
			</div>

			{isIncoming ? (
				<>
					<div className="mb-4 flex flex-col items-center justify-center rounded-md bg-gray-50 dark:bg-linear-to-b dark:from-[#070b1c] dark:to-[#090a11] p-4">
						<QrCode
							className="mb-1 h-16 w-16 text-blue-600"
							strokeWidth={1.5}
						/>
						<p className="mt-1 font-mono text-[10px] text-gray-400 dark:text-gray-300">
							QR Code: QR-SHOWCASE...-TRANS
						</p>
					</div>

					<div className="mb-4 space-y-1 text-xs text-gray-500 dark:text-gray-300">
						<div className="flex items-center gap-2">
							<Calendar className="h-3 w-3 text-gray-400" /> Monday, Dec 1, 2025
							• 9:00 AM
						</div>
						<div className="flex items-center gap-2">
							<MapPin className="h-3 w-3 text-gray-400" /> Test Convention
							Center
						</div>
					</div>

					<div className="mb-4 pt-3">
						<div className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-100">
							<Mail className="h-3 w-3" /> From: Sarah Johnson
						</div>
						<p className="ml-5 text-xs text-gray-500 dark:text-gray-300">
							sarah.johnson@example.com
						</p>
						<div className="mt-2 rounded bg-gray-50 dark:bg-linear-to-b dark:from-[#070b1c] dark:to-[#090a11] p-2 text-xs text-gray-600 dark:text-gray-300 italic">
							"Hey! I can't make it to the event anymore. Would love for you to
							have this ticket!"
						</div>
					</div>

					<div className="flex items-center gap-3">
						{status === "pending" && (
							<>
								{/* Decline - secondary/muted red */}
								<button
									type="button"
									onClick={(e) => openConfirm("decline", e)}
									className="flex-1 flex items-center justify-center gap-3 py-2 px-4 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 dark:bg-[#0f1224] dark:text-red-400 dark:hover:bg-[#070b1c] transition"
								>
									<XCircle className="h-4 w-4" /> Decline
								</button>

								{/* Accept - primary gradient CTA (uses adjusted gradient) */}
								<button
									type="button"
									onClick={(e) => openConfirm("accept", e)}
									className="flex-1 flex items-center justify-center gap-3 py-2 px-4 rounded-xl shadow-md text-white font-semibold bg-linear-to-r from-[#7b3ff0] via-[#1fa0c3] to-[#5b63d8] hover:opacity-95 focus:ring-4 focus:ring-[#218ac0] transition"
								>
									<Check className="h-4 w-4" /> Accept
								</button>
							</>
						)}

						{status === "accepted" && (
							<div className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 font-semibold text-emerald-700">
								<Check className="h-4 w-4" /> Accepted
							</div>
						)}

						{status === "declined" && (
							<div className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2 font-semibold text-red-700">
								<XCircle className="h-4 w-4" /> Declined
							</div>
						)}
					</div>
				</>
			) : (
				<>
					<div className="mb-2 rounded-md bg-orange-50 dark:bg-linear-to-b dark:from-[#070b1c] dark:to-[#090a11] p-4">
						<p className="mb-1 text-xs font-bold text-gray-700 dark:text-gray-100">
							Sent to:
						</p>
						<p className="text-sm font-medium text-gray-900 dark:text-gray-100">
							Alex Chen
						</p>
						<p className="mb-2 text-xs text-gray-500 dark:text-gray-300">
							alex.chen@example.com
						</p>
						<p className="text-xs text-gray-500 italic dark:text-gray-300">
							"Looking forward to seeing you at the event!"
						</p>
					</div>
					<div className="mt-3 flex justify-center">
						<span className="flex items-center gap-1 rounded-full bg-orange-100 dark:bg-orange-900/30 px-3 py-1 text-xs font-bold text-orange-600 dark:text-orange-300">
							<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500"></span>{" "}
							Awaiting acceptance
						</span>
					</div>
				</>
			)}

			{confirmOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="absolute inset-0 bg-black/40"
						onClick={closeConfirm}
					/>

					<div
						className="relative z-10 w-full max-w-md rounded-lg bg-white dark:bg-linear-to-b dark:from-[#070b1c] dark:to-[#090a11] p-6 shadow-xl"
						onClick={(e) => e.stopPropagation()}
						role="dialog"
						aria-modal="true"
					>
						<h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
							{confirmAction === "accept"
								? "Accept Transfer"
								: confirmAction === "decline"
									? "Decline Transfer"
									: "Cancel Transfer"}
						</h3>
						<p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
							{confirmAction === "accept"
								? "Are you sure you want to accept this transfer? This will add the ticket to your account."
								: confirmAction === "decline"
									? "Are you sure you want to decline this transfer? The sender will be notified."
									: "Are you sure you want to cancel this transfer? This will remove the transfer."}
						</p>
						{confirmAction === "cancel" && (
							<p className="mt-2 text-xs font-mono text-gray-500 dark:text-gray-400">
								{ticketName} — {ticketId}
							</p>
						)}

						<div className="mt-4 flex gap-3">
							<button
								type="button"
								onClick={closeConfirm}
								className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-[#090a11] dark:text-gray-100 dark:hover:bg-[#070b1c] transition"
							>
								Cancel
							</button>

							<button
								type="button"
								onClick={() => performConfirm()}
								className="flex-1 flex items-center justify-center gap-3 py-2 px-4 rounded-xl shadow-md text-white font-semibold bg-linear-to-r from-[#7b3ff0] via-[#1fa0c3] to-[#5b63d8] hover:opacity-95 focus:ring-4 focus:ring-[#218ac0] transition"
							>
								{confirmAction === "accept"
									? "Accept"
									: confirmAction === "decline"
										? "Decline"
										: "Confirm Cancel"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
