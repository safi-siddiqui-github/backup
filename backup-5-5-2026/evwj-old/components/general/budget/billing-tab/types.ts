export interface PaymentMethod {
	id: string;
	type: "card" | "bank";
	cardType?: "visa" | "mastercard" | "amex" | "discover";
	bankName?: string;
	accountType?: "checking" | "savings";
	lastFour: string;
	cardholderName: string;
	expiryMonth?: string;
	expiryYear?: string;
	routingNumber?: string;
	isDefault: boolean;
}

