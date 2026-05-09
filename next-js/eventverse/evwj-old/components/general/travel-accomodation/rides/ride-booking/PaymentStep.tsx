"use client";

import React from "react";
import { Shield } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = {
	totalAmount: string;
	cardNumber: string;
	setCardNumber: (v: string) => void;
	cardName: string;
	setCardName: (v: string) => void;
	expiry: string;
	setExpiry: (v: string) => void;
	cvv: string;
	setCvv: (v: string) => void;
	street: string;
	setStreet: (v: string) => void;
	city: string;
	setCity: (v: string) => void;
	stateField: string;
	setStateField: (v: string) => void;
	zip: string;
	setZip: (v: string) => void;
	country: string;
	setCountry: (v: string) => void;
	onBack: () => void;
	onConfirm: () => void;
	onApplePay: () => void;
	onGooglePay: () => void;
};

export default function PaymentStep({
	totalAmount,
	cardNumber,
	setCardNumber,
	cardName,
	setCardName,
	expiry,
	setExpiry,
	cvv,
	setCvv,
	street,
	setStreet,
	city,
	setCity,
	stateField,
	setStateField,
	zip,
	setZip,
	country,
	setCountry,
	onBack,
	onConfirm,
	onApplePay,
	onGooglePay,
}: Props) {
	return (
		<div className="grid grid-cols-1 gap-4">
			<h2 className="text-2xl font-bold">Payment</h2>

			<div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 p-3 rounded">
				<Shield className="h-5 w-5 text-green-600" />
				<div>
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
						Your payment information is secure and encrypted
					</div>
					<div className="text-xs text-gray-600 dark:text-gray-400">
						We use strong encryption to protect your data.
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
						Card Number
					</label>
					<Input
						value={cardNumber}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setCardNumber(e.target.value)
						}
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
						Cardholder Name
					</label>
					<Input
						value={cardName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setCardName(e.target.value)
						}
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
						Expiry Date
					</label>
					<Input
						value={expiry}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setExpiry(e.target.value)
						}
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
						CVV
					</label>
					<Input
						value={cvv}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setCvv(e.target.value)
						}
					/>
				</div>
			</div>

			<h3 className="text-lg font-medium">Billing Address</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
				<Input
					value={street}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setStreet(e.target.value)
					}
					placeholder="Street Address"
				/>
				<Input
					value={city}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setCity(e.target.value)
					}
					placeholder="City"
				/>
				<Input
					value={stateField}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setStateField(e.target.value)
					}
					placeholder="State"
				/>
				<Input
					value={zip}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setZip(e.target.value)
					}
					placeholder="ZIP Code"
				/>
				<div className="md:col-span-2">
					<Input
						value={country}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setCountry(e.target.value)
						}
						placeholder="Country"
					/>
				</div>
			</div>

			<div className="mt-3 p-3 rounded bg-gray-50 dark:bg-gray-800">
				<div className="text-sm text-gray-600">Total Amount</div>
				<div className="text-2xl font-extrabold">{totalAmount}</div>
			</div>

			<div className="flex items-center justify-between gap-3 mt-4">
				<div className="flex gap-2">
					<button
						onClick={onApplePay}
						className="px-4 py-2 bg-black text-white rounded-lg"
					>
						 Pay
					</button>
					<button
						onClick={onGooglePay}
						className="px-4 py-2 bg-[#4285F4] text-white rounded-lg"
					>
						Google Pay
					</button>
				</div>
				<div className="flex gap-2">
					<button onClick={onBack} className="px-4 py-2 rounded-lg border">
						Back
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 rounded-lg bg-linear-to-r from-indigo-600 to-purple-600 text-white"
					>
						Complete Booking
					</button>
				</div>
			</div>
		</div>
	);
}
