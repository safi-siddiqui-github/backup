"use client";

import ReceiptModalNew from "./ReceiptModalNew";

type Props = {
	open: boolean;
	onClose?: () => void;
	receipt?: any;
};

export default function ReceiptModal({ open, onClose, receipt }: Props) {
	const safeOnClose = onClose ?? (() => {});
	const safeReceipt = receipt ?? null;

	return (
		<ReceiptModalNew open={open} onClose={safeOnClose} receipt={safeReceipt} />
	);
}
