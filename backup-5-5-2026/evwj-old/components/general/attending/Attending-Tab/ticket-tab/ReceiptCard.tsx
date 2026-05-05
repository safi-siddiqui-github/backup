import React from "react";
import { Calendar, CreditCard, Receipt } from "lucide-react";
import ReceiptModalButton from "./ReceiptModalButton";

export default function ReceiptCard({
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
		}

		if (confirmAction === "decline") {
			setStatus("declined");
		}

		if (confirmAction === "cancel") {
			setCancelled(true);
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
					<div>
						<h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
							Receipt
						</h4>
						<p className="font-mono text-[10px] tracking-wide text-gray-400 dark:text-gray-300 uppercase">
							{id}
						</p>
					</div>
				</div>
				<span className="rounded bg-green-100 px-2 py-1 text-xs font-bold text-green-700 dark:bg-green-900/40 dark:text-green-200">
					Paid
				</span>
			</div>

			<div className="mb-6 space-y-2">
				<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
					<Calendar className="h-4 w-4 text-gray-400" /> {date}
				</div>
				<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
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
