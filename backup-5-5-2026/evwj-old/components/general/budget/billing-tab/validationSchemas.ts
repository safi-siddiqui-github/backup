import * as z from "zod";

export const cardSchema = z.object({
	cardNumber: z
		.string()
		.min(1, "Card number is required")
		.regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, "Invalid card number format"),
	cardholderName: z.string().min(1, "Cardholder name is required"),
	expiryMonth: z.string().min(1, "Month is required"),
	expiryYear: z.string().min(1, "Year is required"),
	cvv: z.string().min(3, "CVV is required").max(4, "CVV must be 3 or 4 digits"),
	streetAddress: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zipCode: z.string().optional(),
	country: z.string().optional(),
	setAsDefault: z.boolean(),
});

export const bankAccountSchema = z.object({
	bankName: z.string().min(1, "Bank name is required"),
	accountHolderName: z.string().min(1, "Account holder name is required"),
	accountType: z.enum(["checking", "savings"], {
		required_error: "Account type is required",
	}),
	routingNumber: z
		.string()
		.min(9, "Routing number must be 9 digits")
		.max(9, "Routing number must be 9 digits")
		.regex(/^\d+$/, "Routing number must contain only digits"),
	accountNumber: z.string().min(1, "Account number is required"),
	confirmAccountNumber: z.string().min(1, "Please confirm account number"),
	setAsDefault: z.boolean(),
}).refine((data) => data.accountNumber === data.confirmAccountNumber, {
	message: "Account numbers do not match",
	path: ["confirmAccountNumber"],
});

export type CardFormValues = z.infer<typeof cardSchema>;
export type BankAccountFormValues = z.infer<typeof bankAccountSchema>;

