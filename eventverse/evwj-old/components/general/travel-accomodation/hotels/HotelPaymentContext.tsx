"use client";

import React, { createContext, useContext, useState } from "react";

export type PaymentMethod = "card" | "apple" | "google";

export type PaymentInfo = {
	cardNumber: string;
	cardName: string;
	expiry: string;
	cvv: string;
	street: string;
	city: string;
	stateField: string;
	zip: string;
	country: string;
	method: PaymentMethod;
};

type HotelPaymentContextType = {
	payment: PaymentInfo;
	setPayment: (p: Partial<PaymentInfo>) => void;
	setMethod: (m: PaymentMethod) => void;
	reset: () => void;
};

const defaultPayment: PaymentInfo = {
	cardNumber: "",
	cardName: "",
	expiry: "",
	cvv: "",
	street: "",
	city: "",
	stateField: "",
	zip: "",
	country: "",
	method: "card",
};

const Ctx = createContext<HotelPaymentContextType | null>(null);

export const HotelPaymentProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [payment, setPaymentState] = useState<PaymentInfo>(defaultPayment);

	const setPayment = (p: Partial<PaymentInfo>) =>
		setPaymentState((s) => ({ ...s, ...p }));
	const setMethod = (m: PaymentMethod) =>
		setPaymentState((s) => ({ ...s, method: m }));
	const reset = () => setPaymentState(defaultPayment);

	return (
		<Ctx.Provider value={{ payment, setPayment, setMethod, reset }}>
			{children}
		</Ctx.Provider>
	);
};

export const useHotelPayment = () => {
	const ctx = useContext(Ctx);
	if (!ctx)
		throw new Error("useHotelPayment must be used within HotelPaymentProvider");
	return ctx;
};

export default HotelPaymentProvider;
