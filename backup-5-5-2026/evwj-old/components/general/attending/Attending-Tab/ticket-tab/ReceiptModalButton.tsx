import React from "react";
import { Eye } from "lucide-react";
import ReceiptModalNew from "./ReceiptModalNew";

export default function ReceiptModalButton({
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

	return (
		<>
			{/* Secondary action - neutral filled (less emphasis than main CTAs) */}
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					setOpen(true);
				}}
				className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-[#02051f] dark:text-gray-100 dark:hover:bg-[#070b1c] transition"
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
