"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import AddPaymentMethodModal from "./AddPaymentMethodModal";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import PaymentMethodCard from "./PaymentMethodCard";
import { PaymentMethod } from "./types";

const mockPaymentMethods: PaymentMethod[] = [
	{
		id: "1",
		type: "card",
		cardType: "visa",
		lastFour: "4242",
		cardholderName: "John Smith",
		expiryMonth: "12",
		expiryYear: "2026",
		isDefault: true,
	},
	{
		id: "2",
		type: "card",
		cardType: "mastercard",
		lastFour: "5555",
		cardholderName: "John Smith",
		expiryMonth: "08",
		expiryYear: "2025",
		isDefault: false,
	},
	{
		id: "3",
		type: "bank",
		bankName: "Chase Bank",
		accountType: "checking",
		lastFour: "9876",
		cardholderName: "Smith Family Trust",
		routingNumber: "0021",
		isDefault: false,
	},
];

export default function BillingInfoTab() {
	const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [methodToDelete, setMethodToDelete] = useState<PaymentMethod | null>(null);

	const handleAddPaymentMethod = (method: Omit<PaymentMethod, "id">) => {
		if (editingMethod) {
			// Update existing method
			setPaymentMethods(
				paymentMethods.map((m) =>
					m.id === editingMethod.id ? { ...editingMethod, ...method } : m
				)
			);
			setEditingMethod(null);
		} else {
			// Add new method
			const newMethod: PaymentMethod = {
				...method,
				id: Date.now().toString(),
			};
			setPaymentMethods([...paymentMethods, newMethod]);
		}
		setIsModalOpen(false);
	};

	const handleEdit = (method: PaymentMethod) => {
		setEditingMethod(method);
		setIsModalOpen(true);
	};

	const handleSetDefault = (id: string) => {
		setPaymentMethods(
			paymentMethods.map((method) => ({
				...method,
				isDefault: method.id === id,
			}))
		);
	};

	const handleDeleteClick = (method: PaymentMethod) => {
		setMethodToDelete(method);
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = () => {
		if (methodToDelete) {
			setPaymentMethods(paymentMethods.filter((method) => method.id !== methodToDelete.id));
			setMethodToDelete(null);
		}
		setDeleteDialogOpen(false);
	};

	const getCardLabel = (method: PaymentMethod) => {
		if (method.type === "bank") {
			const accountType = method.accountType ? method.accountType.charAt(0).toUpperCase() + method.accountType.slice(1) : "";
			return `${method.bankName || "Bank"}${accountType ? ` (${accountType})` : ""}`;
		}
		const cardType = method.cardType ? method.cardType.charAt(0).toUpperCase() + method.cardType.slice(1) : "Card";
		return cardType;
	};

	return (
		<div className="space-y-6">
			<Card className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:rgb(255_255_255/0.95)] dark:[background-color:#020617]">
				<CardContent className="p-6">
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center gap-2">
							<CreditCard className="h-5 w-5 text-blue-600" />
							<h3 className="text-xl font-semibold">Saved Payment Methods</h3>
						</div>
						<Button onClick={() => {
							setEditingMethod(null);
							setIsModalOpen(true);
						}}>
							+ Add New
						</Button>
					</div>

					<div className="space-y-4">
						{paymentMethods.map((method) => (
							<PaymentMethodCard
								key={method.id}
								method={method}
								onEdit={handleEdit}
								onDelete={handleDeleteClick}
								onSetDefault={handleSetDefault}
							/>
						))}
					</div>
				</CardContent>
			</Card>

			<AddPaymentMethodModal
				open={isModalOpen}
				onOpenChange={(open) => {
					setIsModalOpen(open);
					if (!open) {
						setEditingMethod(null);
					}
				}}
				onSubmit={handleAddPaymentMethod}
				editingMethod={editingMethod}
			/>

			<ConfirmationDialog
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
				onConfirm={handleDeleteConfirm}
				title="Delete Payment Method?"
				description={
					methodToDelete
						? `Are you sure you want to delete ${getCardLabel(methodToDelete)} •••• ${methodToDelete.lastFour}? This action cannot be undone.`
						: "Are you sure you want to delete this payment method? This action cannot be undone."
				}
				confirmText="Delete"
				variant="destructive"
			/>
		</div>
	);
}
