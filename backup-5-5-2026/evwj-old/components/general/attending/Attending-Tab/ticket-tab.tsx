"use client";

import {
	ArrowRightLeft,
	Calendar,
	Check,
	CheckCircle2,
	CreditCard,
	Download,
	Eye,
	Mail,
	MapPin,
	QrCode,
	Receipt,
	Ticket,
	XCircle,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import ReceiptModalNew from "./ticket-tab/ReceiptModalNew";

export default function TicketsTab() {
	const [activeTab, setActiveTab] = useState<"tickets" | "receipts">("tickets");

	return (
		<div className="mx-auto space-y-6 font-sans  ] text-gray-900 dark:text-gray-100">
			<div className="relative overflow-hidden rounded-md shadow-lg">
				<div className="flex items-center justify-between bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-white sm:p-8">
					<div>
						<h2 className="mb-1 text-2xl font-bold">Your Tickets</h2>
						<p className="text-blue-100 opacity-90">2 tickets available</p>
					</div>
					<div className="hidden h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm sm:flex">
						<Ticket className="h-6 w-6 text-white" />
					</div>
				</div>
			</div>

			<div className="flex rounded-md bg-white dark:bg-[#090a11] p-1">
				<button
					onClick={() => setActiveTab("tickets")}
					className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold transition-all ${
						activeTab === "tickets"
							? "bg-white text-gray-900 shadow-sm dark:bg-[#090a11] dark:text-gray-100"
							: "text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300"
					}`}
				>
					<Ticket className="h-4 w-4" /> My Tickets (4)
				</button>
				<button
					onClick={() => setActiveTab("receipts")}
					className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold transition-all ${
						activeTab === "receipts"
							? "bg-white text-gray-900 shadow-sm dark:bg-[#090a11] dark:text-gray-100"
							: "text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300"
					}`}
				>
					<Receipt className="h-4 w-4" /> Receipts (2)
				</button>
			</div>

			<div className="animate-in fade-in zoom-in-95 space-y-8 duration-300">
				{activeTab === "tickets" ? (
					<>
						<div>
							<h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-gray-100">
								<span className="text-blue-500">↙</span> Incoming Transfers
							</h3>
							<div className="max-w-md">
								<TransferCard
									type="incoming"
									ticketName="Premium All-Access Pass"
									ticketId="TKT-SHOW-TRANS-001"
								/>
							</div>
						</div>

						<div>
							<h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-gray-100">
								<span className="text-orange-500">↗</span> Pending Outgoing
								Transfers
							</h3>
							<div className="max-w-md">
								<TransferCard
									type="outgoing"
									ticketName="Premium All-Access Pass"
									ticketId="TKT-SHOW-001"
								/>
							</div>
						</div>

						<div>
							<h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
								Active Tickets
							</h3>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<ActiveTicketCard
									id="TKT-SHOW-002"
									qrCodeString="QR-SHOWCASE2025-001-2"
								/>
								<ActiveTicketCard
									id="TKT-SHOW-003"
									qrCodeString="QR-SHOWCASE2025-001-3"
								/>
							</div>
						</div>
					</>
				) : (
					<div>
						<h3 className="mb-4 text-lg font-bold text-gray-900">
							Your Receipts
						</h3>
						<p className="-mt-3 mb-6 text-sm text-gray-500">
							View and download your purchase receipts
						</p>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<ReceiptCard
								id="RCP-TEST-SHOWCASE-EVENT-001"
								date="Nov 18, 2025"
								cardLast4="4242"
								item="1x General Admission"
								price="$0.00"
								total="$2.50"
							/>
							<ReceiptCard
								id="RCP-TEST-SHOWCASE-EVENT-002"
								date="Nov 13, 2025"
								cardLast4="8765"
								cardType="Mastercard"
								item="1x VIP Parking Pass"
								price="$50.00"
								total="$58.00"
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

function ActiveTicketCard({
	id,
	qrCodeString,
}: {
	id: string;
	qrCodeString: string;
}) {
	const [transferOpen, setTransferOpen] = useState(false);

	return (
		<div className="flex h-full flex-col rounded-md bg-white p-5 shadow-sm dark:bg-gradient-to-b dark:from-[#070b1c] dark:to-[#090a11]">
			<div className="mb-4 flex items-start justify-between">
				<div className="flex gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
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
				<span className="flex items-center gap-1 rounded bg-green-100 px-2 py-1 text-xs font-bold text-green-700 dark:bg-green-900/40 dark:text-green-200">
					<CheckCircle2 className="h-3 w-3" /> Valid
				</span>
			</div>

			<div className="mb-4 flex flex-col items-center justify-center rounded-md bg-gray-50 dark:bg-gradient-to-b dark:from-[#070b1c] dark:to-[#090a11] p-6">
				<QrCode className="mb-2 h-24 w-24 text-blue-600" strokeWidth={1.5} />
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
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							toast(`Opening details for ${id}`);
						}}
						className="flex flex-1 items-center justify-center gap-2 rounded-sm py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:text-gray-300"
					>
						View Details
					</button>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							toast.success("Download started");
						}}
						className="flex flex-1 items-center justify-center gap-2 rounded-sm py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:text-gray-300"
					>
						<Download className="h-4 w-4" /> Download
					</button>
				</div>
				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						setTransferOpen(true);
					}}
					className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-sm font-medium text-white shadow transition hover:opacity-90"
				>
					<ArrowRightLeft className="h-4 w-4" /> Transfer Ticket
				</button>

				{transferOpen && (
					<TransferModal
						open={transferOpen}
						onClose={() => setTransferOpen(false)}
						ticketName="Premium All-Access Pass"
						ticketId={id}
					/>
				)}
			</div>
		</div>
	);
}

function TransferModal({
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
	const [email, setEmail] = React.useState("recipient@example.com");
	const [name, setName] = React.useState("John Doe");
	const [message, setMessage] = React.useState("");

	if (!open) return null;

	function handleConfirm(e?: React.FormEvent) {
		e?.preventDefault();
		// TODO: wire API call to transfer ticket
		console.log("Transfer ticket", {
			ticketId,
			ticketName,
			email,
			name,
			message,
		});
		// Show success toast and close modal
		toast.success("Transfer request sent — recipient will receive an email");
		onClose();
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />

			<form
				onSubmit={handleConfirm}
				className="relative z-10 w-full max-w-md rounded-lg bg-white dark:bg-gradient-to-b dark:from-[#070b1c] dark:to-[#090a11] p-6 shadow-xl"
				onClick={(e) => e.stopPropagation()}
			>
				<h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">
					Transfer Ticket
				</h3>
				<p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
					Transfer your ticket to another person. They will receive an email
					with instructions.
				</p>

				<div className="mb-3">
					<label className="text-xs font-semibold text-gray-700 dark:text-gray-100">
						Ticket
					</label>
					<div className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">
						{ticketName}
					</div>
					<div className="font-mono text-xs text-gray-400 dark:text-gray-300">
						{ticketId}
					</div>
				</div>

				<div className="mb-3">
					<label
						htmlFor="transfer-recipient-email"
						className="text-xs font-semibold text-gray-700"
					>
						Recipient Email *
					</label>
					<input
						id="transfer-recipient-email"
						name="transfer-recipient-email"
						type="email"
						required
						title="Recipient Email"
						placeholder="recipient@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="mt-1 w-full rounded px-3 py-2 text-sm bg-white dark:bg-[#090a11] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
					/>
				</div>

				<div className="mb-3">
					<label
						htmlFor="transfer-recipient-name"
						className="text-xs font-semibold text-gray-700"
					>
						Recipient Name *
					</label>
					<input
						id="transfer-recipient-name"
						name="transfer-recipient-name"
						type="text"
						required
						title="Recipient Name"
						placeholder="Full name of recipient"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="mt-1 w-full rounded px-3 py-2 text-sm bg-white dark:bg-[#090a11] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
					/>
				</div>

				<div className="mb-4">
					<label className="text-xs font-semibold text-gray-700">
						Message (Optional)
					</label>
					<textarea
						rows={3}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className="mt-1 w-full rounded px-3 py-2 text-sm bg-white dark:bg-[#090a11] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
						placeholder="Add a personal message to the recipient..."
					/>
				</div>

				<div className="flex justify-end gap-2">
					<button
						type="button"
						onClick={() => {
							toast("Transfer cancelled");
							onClose();
						}}
						className="rounded bg-white dark:bg-[#090a11] px-4 py-2 text-sm text-gray-700 dark:text-gray-100"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="rounded bg-blue-600 px-4 py-2 text-sm text-white"
					>
						Confirm Transfer
					</button>
				</div>
			</form>
		</div>
	);
}

function TransferCard({
	type,
	ticketName,
	ticketId,
}: {
	type: "incoming" | "outgoing";
	ticketName: string;
	ticketId: string;
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
						className="text-xs font-bold px-2 py-1 rounded-full bg-transparent text-gray-400 hover:bg-gray-100 cursor-pointer"
						aria-label="Cancel transfer"
					>
						Cancel
					</button>
				)}
			</div>

			<div className="mb-4 flex gap-3">
				<div
					className={`flex h-10 w-10 items-center justify-center rounded-sm text-white shadow-sm ${
						isIncoming ? "bg-blue-600" : "bg-orange-500"
					}`}
				>
					{isIncoming ? (
						<Ticket className="h-5 w-5" />
					) : (
						<Ticket className="h-5 w-5" />
					)}
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

					<div className="mb-4 space-y-1 text-xs text-gray-500">
						<div className="flex items-center gap-2">
							<Calendar className="h-3 w-3" /> Monday, Dec 1, 2025 • 9:00 AM
						</div>
						<div className="flex items-center gap-2">
							<MapPin className="h-3 w-3" /> Test Convention Center
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
								<button
									type="button"
									onClick={(e) => openConfirm("decline", e)}
									className="flex-1 py-2 bg-red-50 text-red-600 dark:text-red-400 rounded-sm text-sm font-medium hover:bg-red-100 transition flex items-center justify-center gap-1"
								>
									<XCircle className="h-4 w-4" /> Decline
								</button>
								<button
									type="button"
									onClick={(e) => openConfirm("accept", e)}
									className="flex-1 py-2 bg-emerald-600 text-white rounded-sm text-sm font-medium hover:bg-emerald-700 transition flex items-center justify-center gap-1 shadow-sm"
								>
									<Check className="h-4 w-4" /> Accept
								</button>
							</>
						)}

						{status === "accepted" && (
							<div className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-emerald-50 px-3 py-2 font-semibold text-emerald-700">
								<Check className="h-4 w-4" /> Accepted
							</div>
						)}

						{status === "declined" && (
							<div className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-red-50 px-3 py-2 font-semibold text-red-700">
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
							<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500"></span>
							Awaiting acceptance
						</span>
					</div>
				</>
			)}
		</div>
	);
}

function ReceiptCard({
	id,
	date,
	cardLast4,
	item,
	price,
	total,
	cardType = "Visa",
}: {
	id: string;
	date: string;
	cardLast4: string;
	item: string;
	price: string;
	total: string;
	cardType?: string;
}) {
	const [confirmOpen, setConfirmOpen] = React.useState(false);
	const [confirmAction, setConfirmAction] = React.useState<
		"accept" | "decline" | "cancel" | null
	>(null);
	const [cancelled, setCancelled] = React.useState(false);
	const [status, setStatus] = React.useState<
		"pending" | "accepted" | "declined"
	>("pending");

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
		}

		closeConfirm();
	}

	if (cancelled) return null;
	return (
		<div className="rounded-xl bg-white p-6 shadow-sm dark:bg-linear-to-b dark:from-[#070b1c] dark:to-[#090a11]">
			<div className="mb-4 flex items-start justify-between">
				<div className="flex gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-white shadow-sm">
						<Receipt className="h-5 w-5" />
					</div>
					{confirmOpen && (
						<div className="fixed inset-0 z-50 flex items-center justify-center">
							<div
								className="absolute inset-0 bg-black/40"
								onClick={closeConfirm}
							/>
							<div
								className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-4"
								onClick={(e) => e.stopPropagation()}
							>
								<h3 className="text-lg font-semibold">
									{confirmAction === "accept" && "Accept Transfer"}
									{confirmAction === "decline" && "Decline Transfer"}
									{confirmAction === "cancel" && "Cancel Transfer"}
								</h3>
								<p className="text-sm text-gray-600 mt-2">
									{confirmAction === "accept" && (
										<>Are you sure you want to accept this transfer?</>
									)}
									{confirmAction === "decline" && (
										<>Are you sure you want to decline this transfer?</>
									)}
									{confirmAction === "cancel" && (
										<>Are you sure you want to cancel this outgoing transfer?</>
									)}
								</p>

								<div className="mt-4 flex justify-end gap-3">
									<button
										onClick={closeConfirm}
										className="px-3 py-1.5 rounded-md border bg-white text-sm"
									>
										Cancel
									</button>

									<button
										onClick={() => performConfirm()}
										className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm"
									>
										Yes, confirm
									</button>
								</div>
							</div>
						</div>
					)}
					<div>
						<h4 className="text-sm font-bold text-gray-900">Receipt</h4>
						<p className="font-mono text-[10px] tracking-wide text-gray-400 uppercase">
							{id}
						</p>
					</div>
				</div>
				<span className="rounded bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
					Paid
				</span>
			</div>

			<div className="mb-6 space-y-2">
				<div className="flex items-center gap-2 text-sm text-gray-600">
					<Calendar className="h-4 w-4 text-gray-400" /> {date}
				</div>
				<div className="flex items-center gap-2 text-sm text-gray-600">
					<CreditCard className="h-4 w-4 text-gray-400" /> {cardType} ••••{" "}
					{cardLast4}
				</div>
			</div>

			<div className="mb-4 rounded-lg bg-gray-50 dark:bg-linear-to-b dark:from-[#070b1c] dark:to-[#090a11] p-4">
				<div className="mb-2 flex justify-between text-sm">
					<span className="font-medium text-gray-700 dark:text-gray-100">
						{item}
					</span>
					<span className="font-bold text-gray-900 dark:text-gray-100">
						{price}
					</span>
				</div>
				<div className="my-2 h-px bg-gray-200 dark:bg-[#070b1c]"></div>
				<div className="flex justify-between text-sm">
					<span className="font-bold text-gray-900 dark:text-gray-100">
						Total
					</span>
					<span className="font-bold text-green-600">{total}</span>
				</div>
			</div>

			<ReceiptModalButton
				id={id}
				date={date}
				cardLast4={cardLast4}
				item={item}
				price={price}
				total={total}
				cardType={cardType}
			/>
		</div>
	);
}

function ReceiptModalButton({
	id,
	date,
	cardLast4,
	item,
	price,
	total,
	cardType = "Visa",
}: {
	id: string;
	date: string;
	cardLast4: string;
	item: string;
	price: string;
	total: string;
	cardType?: string;
}) {
	const [open, setOpen] = React.useState(false);

	function handlePrint() {
		// open new window with receipt content and trigger print
		const html = `
      <html>
      <head>
        <title>Receipt ${id}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <style>body{font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding:20px; color:#111}</style>
      </head>
      <body>
        <h2>Purchase Receipt</h2>
        <p><strong>Receipt #</strong>${id}</p>
        <h3>Official Receipt</h3>
        <p><strong>Purchase Date:</strong> ${date}</p>
        <p><strong>Transaction ID:</strong> TXN-EXAMPLE-0001</p>
        <h4>Items Purchased</h4>
        <p>${item}</p>
        <p>${price} × 1</p>
        <hr />
        <p><strong>Subtotal</strong> ${price}</p>
        <p><strong>Service Fee</strong> $0.00</p>
        <p><strong>Processing Fee</strong> $2.50</p>
        <p><strong>Tax</strong> $0.00</p>
        <h3><strong>Total Paid</strong> ${total}</h3>
        <p><strong>Payment Method</strong> credit card - ${cardType} ending in ${cardLast4}</p>
        <h4>Billing Address</h4>
        <p>Guest<br/>123 Main Street<br/>San Francisco, CA 94105<br/>United States</p>
        <p>Thank you for your purchase! Please keep this receipt for your records.</p>
        <p>For questions, contact support@example.com</p>
      </body>
      </html>
    `;

		const w = window.open("", "_blank", "noopener,noreferrer");
		if (w) {
			w.document.write(html);
			w.document.close();
			w.focus();
			setTimeout(() => {
				w.print();
			}, 250);
		}
	}

	return (
		<>
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					setOpen(true);
				}}
				className="flex w-full items-center justify-center gap-2 rounded-md bg-white dark:bg-[#090a11] py-2 text-sm font-medium text-gray-600 dark:text-gray-100 transition hover:bg-gray-50 dark:hover:bg-[#070b1c]"
			>
				<Eye className="h-4 w-4" /> View Full Receipt
			</button>

			{open && (
				<ReceiptModalNew
					onClose={() => setOpen(false)}
					open={open}
					receipt={{ id, date, cardLast4, item, price, total, cardType }}
				/>
			)}
		</>
	);
}

function closeConfirm() {
	throw new Error("Function not implemented.");
}
