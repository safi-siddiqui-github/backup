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

import ReceiptCard from "./ReceiptCard";
import TransferCard from "./TransferCard";

import ActiveTicketCard from "./ActiveTicketCard";

interface ActiveTicket {
	id: string;
	qrCodeString: string;
}

interface OutgoingTransfer {
	ticketName: string;
	ticketId: string;
}

export default function TicketsTab() {
	const [activeTab, setActiveTab] = useState<"tickets" | "receipts">("tickets");
	const [activeTickets, setActiveTickets] = useState<ActiveTicket[]>([
		{ id: "TKT-SHOW-002", qrCodeString: "QR-SHOWCASE2025-001-2" },
		{ id: "TKT-SHOW-003", qrCodeString: "QR-SHOWCASE2025-001-3" },
	]);
	const [outgoingTransfers, setOutgoingTransfers] = useState<OutgoingTransfer[]>([
		{ ticketName: "Premium All-Access Pass", ticketId: "TKT-SHOW-001" },
	]);

	const handleCancelTransfer = (ticketId: string) => {
		const transfer = outgoingTransfers.find((t) => t.ticketId === ticketId);
		if (transfer) {
			// Move ticket back to active tickets
			setActiveTickets((prev) => [
				...prev,
				{
					id: transfer.ticketId,
					qrCodeString: `QR-SHOWCASE2025-001-${transfer.ticketId.split("-").pop()}`,
				},
			]);
			// Remove from outgoing transfers
			setOutgoingTransfers((prev) =>
				prev.filter((t) => t.ticketId !== ticketId),
			);
		}
	};

	return (
		<div className="mx-auto space-y-6 font-sans   text-gray-900 dark:text-gray-100">
			<div className="relative overflow-hidden rounded-md shadow-lg">
				<div className="flex items-center justify-between bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-white sm:p-8">
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
							? "bg-gray-100 text-gray-900 dark:bg-[#070b1c] dark:text-gray-100 shadow-sm ring-1 ring-white/10"
							: "text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300"
					}`}
				>
					<Ticket className="h-4 w-4" /> My Tickets (4)
				</button>
				<button
					onClick={() => setActiveTab("receipts")}
					className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold transition-all ${
						activeTab === "receipts"
							? "bg-gray-100 text-gray-900 dark:bg-[#070b1c] dark:text-gray-100 shadow-sm ring-1 ring-white/10"
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

						{outgoingTransfers.length > 0 && (
							<div>
								<h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-gray-100">
									<span className="text-orange-500">↗</span> Pending Outgoing
									Transfers
								</h3>
								<div className="max-w-md space-y-4">
									{outgoingTransfers.map((transfer) => (
										<TransferCard
											key={transfer.ticketId}
											type="outgoing"
											ticketName={transfer.ticketName}
											ticketId={transfer.ticketId}
											onCancel={() => handleCancelTransfer(transfer.ticketId)}
										/>
									))}
								</div>
							</div>
						)}

						<div>
							<h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
								Active Tickets
							</h3>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								{activeTickets.map((ticket) => (
									<ActiveTicketCard
										key={ticket.id}
										id={ticket.id}
										qrCodeString={ticket.qrCodeString}
									/>
								))}
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
