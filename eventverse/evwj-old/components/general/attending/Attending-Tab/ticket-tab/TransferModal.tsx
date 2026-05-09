import React from "react";
import { toast } from "sonner";

export default function TransferModal({
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
		console.log("Transfer ticket", {
			ticketId,
			ticketName,
			email,
			name,
			message,
		});
		toast.success("Transfer request sent — recipient will receive an email");
		onClose();
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />

			<form
				onSubmit={handleConfirm}
				className="relative z-10 w-full max-w-md rounded-lg bg-white dark:bg-linear-to-b dark:from-[#070b1c] dark:to-[#090a11] p-6 shadow-xl"
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
						className="text-xs font-semibold text-gray-700 dark:text-gray-100"
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
						className="text-xs font-semibold text-gray-700 dark:text-gray-100"
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
					<label className="text-xs font-semibold text-gray-700 dark:text-gray-100">
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

				<div className="flex gap-2 w-full">
					{/* Both buttons use flex-1 to match width/height */}
					<button
						type="button"
						onClick={() => {
							toast("Transfer cancelled");
							onClose();
						}}
						className="flex-1 flex items-center justify-center gap-3 text-gray-700 bg-white py-2 px-4 rounded-xl shadow-sm hover:bg-gray-50 dark:bg-[#0f1224] dark:text-gray-100 dark:hover:bg-[#070b1c] transition"
					>
						Cancel
					</button>{" "}
					<button
						type="submit"
						className="flex-1 flex items-center justify-center gap-3 text-white font-semibold py-2 px-4 rounded-xl shadow-md bg-linear-to-r from-[#7b3ff0] via-[#1fa0c3] to-[#5b63d8] hover:opacity-95 focus:ring-4 focus:ring-[#218ac0] transition"
					>
						Confirm Transfer
					</button>
				</div>
			</form>
		</div>
	);
}
