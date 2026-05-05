"use client";

import React, { useState } from "react";
import { Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Step5_Payment = ({
	onNext,
	onBack,
}: {
	onNext: () => void;
	onBack: () => void;
}) => {
	const [cardNumber, setCardNumber] = useState("1234 5678 9012 3456");
	const [cardName, setCardName] = useState("John Doe");
	const [expiry, setExpiry] = useState("MM/YY");
	const [cvv, setCvv] = useState("123");
	const [street, setStreet] = useState("123 Main Street");
	const [city, setCity] = useState("New York");
	const [stateField, setStateField] = useState("NY");
	const [zip, setZip] = useState("10001");
	const [country, setCountry] = useState("USA");

	const totalAmount = "$42.12";

	const handleApplePay = () => {
		toast.success("Apple Pay selected — opening payment sheet (stub)");
		onNext();
	};

	const handleGooglePay = () => {
		toast.success("Google Pay selected — opening payment sheet (stub)");
		onNext();
	};

	const handleConfirm = () => {
		toast.success("Payment processed (stub)");
		onNext();
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div className="md:col-span-2 space-y-6">
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

				<h2 className="text-xl font-semibold">Payment Information</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Card Number
						</label>
						<Input
							value={cardNumber}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setCardNumber(e.target.value)
							}
							placeholder="1234 5678 9012 3456"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Cardholder Name
						</label>
						<Input
							value={cardName}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setCardName(e.target.value)
							}
							placeholder="John Doe"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Expiry Date
						</label>
						<Input
							value={expiry}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setExpiry(e.target.value)
							}
							placeholder="MM/YY"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							CVV
						</label>
						<Input
							value={cvv}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setCvv(e.target.value)
							}
							placeholder="123"
						/>
					</div>
				</div>

				<h3 className="text-lg font-medium">Billing Address</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

				<div className="flex justify-between items-center mt-6">
					<button
						onClick={onBack}
						className="px-5 py-2 rounded-lg border text-gray-700 dark:text-gray-200"
					>
						Back
					</button>
					<button
						onClick={handleConfirm}
						className="px-6 py-2 rounded-lg bg-linear-to-r from-indigo-600 to-purple-600 text-white"
					>
						Complete Booking
					</button>
				</div>
			</div>

			<aside className="hidden md:block">
				<div className="sticky top-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
					<div className="text-sm text-gray-500">Payment</div>
					<div className="mt-3">
						<div className="bg-linear-to-r from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 p-3 rounded-lg">
							<div className="text-xs text-gray-500">Total Amount</div>
							<div className="text-2xl font-extrabold mt-1">{totalAmount}</div>
						</div>

						<div className="mt-4 space-y-2">
							<button
								onClick={handleApplePay}
								className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg shadow-sm"
							>
								<span className="font-medium"></span>
								<span>Pay with Apple Pay</span>
							</button>

							<button
								onClick={handleGooglePay}
								className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#4285F4] text-white rounded-lg shadow-sm"
							>
								<svg
									width="18"
									height="18"
									viewBox="0 0 48 48"
									className="inline-block"
								>
									<path
										d="M44.5 20H24v8h11.9C34.1 31.4 29.9 34 24 34c-8.3 0-15-6.7-15-15s6.7-15 15-15c4.1 0 7.8 1.6 10.6 4.1l5.9-5.9C36.1 2.3 30.4 0 24 0 10.8 0 0 10.8 0 24s10.8 24 24 24c11.2 0 20.7-8 23.7-18.6L44.5 20z"
										fill="#fff"
									/>
								</svg>
								<span>Pay with Google Pay</span>
							</button>
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
};

export default Step5_Payment;
