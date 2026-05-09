"use client";

import { Button } from "@/components/ui/button";
import { Star, Edit, Trash2, Building2 } from "lucide-react";
import { PaymentMethod } from "./types";

interface PaymentMethodCardProps {
	method: PaymentMethod;
	onEdit: (method: PaymentMethod) => void;
	onDelete: (method: PaymentMethod) => void;
	onSetDefault: (id: string) => void;
}

export default function PaymentMethodCard({
	method,
	onEdit,
	onDelete,
	onSetDefault,
}: PaymentMethodCardProps) {
	const getCardIcon = () => {
		if (method.type === "bank") {
			return (
				<div className="h-10 w-10 rounded bg-green-600 flex items-center justify-center">
					<Building2 className="h-6 w-6 text-white" />
				</div>
			);
		}

		const cardColors: Record<string, string> = {
			visa: "bg-blue-600",
			mastercard: "bg-orange-600",
			amex: "bg-blue-500",
			discover: "bg-orange-500",
		};

		return (
			<div className={`h-10 w-10 rounded ${cardColors[method.cardType || "visa"]} flex items-center justify-center`}>
				<span className="text-white font-bold text-xs">
					{method.cardType === "visa" ? "VISA" : method.cardType === "mastercard" ? "MC" : method.cardType?.toUpperCase() || "CARD"}
				</span>
			</div>
		);
	};

	const getCardLabel = () => {
		if (method.type === "bank") {
			return `${method.bankName} (${method.accountType?.charAt(0).toUpperCase()}${method.accountType?.slice(1)})`;
		}
		const cardType = method.cardType;
		if (!cardType) return "Card";
		return cardType.charAt(0).toUpperCase() + cardType.slice(1);
	};

	const getCardDetails = () => {
		if (method.type === "bank") {
			return method.routingNumber ? `Routing: •••${method.routingNumber}` : "";
		}
		return `Expires ${method.expiryMonth}/${method.expiryYear}`;
	};

	return (
		<div
			className={`p-4 rounded-lg border-2 transition-colors ${
				method.isDefault
					? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
					: "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
			}`}
		>
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-4 flex-1">
					{getCardIcon()}
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<p className="font-semibold text-gray-900 dark:text-gray-100">
								{getCardLabel()} •••• {method.lastFour}
							</p>
							{method.isDefault && (
								<div className="flex items-center gap-1">
									<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
									<span className="text-xs font-medium text-gray-600 dark:text-gray-400">Default</span>
								</div>
							)}
						</div>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							{method.cardholderName}
						</p>
						{method.type === "bank" && method.routingNumber && (
							<p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
								Routing: •••{method.routingNumber}
							</p>
						)}
						{method.type === "card" && (
							<p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
								{getCardDetails()}
							</p>
						)}
					</div>
				</div>
				<div className="flex items-center gap-2">
					{!method.isDefault && (
						<Button
							variant="outline"
							size="sm"
							onClick={() => onSetDefault(method.id)}
							className="flex items-center gap-1"
						>
							<Star className="h-4 w-4" />
							Set Default
						</Button>
					)}
					<Button
						variant="ghost"
						size="sm"
						onClick={() => onEdit(method)}
						className="h-8 w-8 p-0"
					>
						<Edit className="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => onDelete(method)}
						className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}

