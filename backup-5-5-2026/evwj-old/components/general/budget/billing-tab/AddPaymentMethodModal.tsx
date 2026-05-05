"use client";

import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Building2, X } from "lucide-react";
import { PaymentMethod } from "./types";
import CardPaymentForm from "./CardPaymentForm";
import BankAccountPaymentForm from "./BankAccountPaymentForm";
import { CardFormValues, BankAccountFormValues } from "./validationSchemas";
import { handleCardFormSubmit, handleBankFormSubmit } from "./utils";

interface AddPaymentMethodModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (method: Omit<PaymentMethod, "id">) => void;
	editingMethod?: PaymentMethod | null;
}

export default function AddPaymentMethodModal({
	open,
	onOpenChange,
	onSubmit,
	editingMethod,
}: AddPaymentMethodModalProps) {
	const [paymentType, setPaymentType] = useState<"card" | "bank">("card");

	// Set payment type when editing method changes or modal opens
	useEffect(() => {
		if (open) {
			if (editingMethod) {
				setPaymentType(editingMethod.type);
			} else {
				setPaymentType("card");
			}
		}
	}, [editingMethod, open]);

	const handleCardSubmit = (data: CardFormValues) => {
		handleCardFormSubmit(data, editingMethod, onSubmit);
	};

	const handleBankSubmit = (data: BankAccountFormValues) => {
		handleBankFormSubmit(data, editingMethod, onSubmit);
	};

	const handleClose = () => {
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[600px] !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.98)] dark:[background-color:#020617]">
				<DialogHeader>
					<div className="flex items-center justify-between">
						<DialogTitle>{editingMethod ? "Edit Payment Method" : "Add Payment Method"}</DialogTitle>
						<Button
							variant="ghost"
							size="sm"
							onClick={handleClose}
							className="h-6 w-6 p-0"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				</DialogHeader>

				{/* Payment Type Tabs */}
				<div className="flex gap-2 mb-6">
					<Button
						type="button"
						variant={paymentType === "card" ? "default" : "outline"}
						onClick={() => setPaymentType("card")}
						className="flex items-center gap-2 flex-1"
					>
						<CreditCard className="h-4 w-4" />
						Credit/Debit Card
					</Button>
					<Button
						type="button"
						variant={paymentType === "bank" ? "default" : "outline"}
						onClick={() => setPaymentType("bank")}
						className="flex items-center gap-2 flex-1"
					>
						<Building2 className="h-4 w-4" />
						Bank Account (ACH)
					</Button>
				</div>

				{paymentType === "card" ? (
					<CardPaymentForm
						editingMethod={editingMethod}
						onSubmit={handleCardSubmit}
						onCancel={handleClose}
					/>
				) : (
					<BankAccountPaymentForm
						editingMethod={editingMethod}
						onSubmit={handleBankSubmit}
						onCancel={handleClose}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
}
