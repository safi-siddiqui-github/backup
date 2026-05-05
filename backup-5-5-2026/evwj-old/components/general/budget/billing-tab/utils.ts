import { CardFormValues, BankAccountFormValues } from "./validationSchemas";
import { PaymentMethod } from "./types";

export const formatCardNumber = (value: string) => {
	const cleaned = value.replace(/\s/g, "");
	const match = cleaned.match(/.{1,4}/g);
	return match ? match.join(" ") : cleaned;
};

export const detectCardType = (cardNumber: string): "visa" | "mastercard" | "amex" | "discover" => {
	if (cardNumber.startsWith("4")) return "visa";
	if (cardNumber.startsWith("5")) return "mastercard";
	if (cardNumber.startsWith("3")) return "amex";
	return "discover";
};

export const handleCardFormSubmit = (
	data: CardFormValues,
	editingMethod: PaymentMethod | null | undefined,
	onSubmit: (method: Omit<PaymentMethod, "id">) => void
) => {
	let lastFour: string;
	let cardType: "visa" | "mastercard" | "amex" | "discover";

	if (editingMethod && editingMethod.type === "card") {
		lastFour = editingMethod.lastFour;
		cardType = editingMethod.cardType || "visa";
	} else {
		const cardNumber = data.cardNumber.replace(/\s/g, "").replace(/\*/g, "");
		cardType = detectCardType(cardNumber);
		lastFour = cardNumber.slice(-4);
	}

	onSubmit({
		type: "card",
		cardType,
		lastFour,
		cardholderName: data.cardholderName,
		expiryMonth: data.expiryMonth,
		expiryYear: data.expiryYear,
		isDefault: data.setAsDefault,
	});
};

export const handleBankFormSubmit = (
	data: BankAccountFormValues,
	editingMethod: PaymentMethod | null | undefined,
	onSubmit: (method: Omit<PaymentMethod, "id">) => void
) => {
	let lastFour: string;
	let routingNumber: string;

	if (editingMethod && editingMethod.type === "bank") {
		lastFour = editingMethod.lastFour;
		routingNumber = editingMethod.routingNumber || "";
	} else {
		lastFour = data.accountNumber.slice(-4);
		routingNumber = data.routingNumber.replace(/\*/g, "").slice(-4);
	}

	onSubmit({
		type: "bank",
		bankName: data.bankName,
		accountType: data.accountType,
		lastFour,
		cardholderName: data.accountHolderName,
		routingNumber,
		isDefault: data.setAsDefault,
	});
};

