"use client";

import React from "react";
import { Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useHotelPayment } from "../HotelPaymentContext";

export default function Step4_Payment({
	onNext,
	onBack,
}: {
	onNext: () => void;
	onBack: () => void;
}) {
	const { payment, setPayment, setMethod } = useHotelPayment();

	const totalAmount = "$263.25";

	const handleApplePay = () => {
		setMethod("apple");
		onNext();
	};

	const handleGooglePay = () => {
		setMethod("google");
		onNext();
	};

	const handleConfirm = () => {
		setMethod("card");
		onNext();
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-3 !bg-white dark:!bg-slate-700/50 border border-green-200 dark:border-green-800 p-3 rounded [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
				<Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
				<div>
					<div className="text-sm font-semibold text-foreground">
						Your payment information is secure and encrypted
					</div>
					<div className="text-xs text-muted-foreground">
						We use strong encryption to protect your data.
					</div>
				</div>
			</div>

			<h2 className="text-xl font-semibold text-foreground">
				Payment Information
			</h2>

			<div className="flex flex-col md:flex-row gap-6">
				<div className="flex-1">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-foreground mb-1">
								Card Number
							</label>
							<Input
								value={payment.cardNumber}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setPayment({ cardNumber: e.target.value })
								}
								placeholder="1234 5678 9012 3456"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
								Cardholder Name
							</label>
							<Input
								value={payment.cardName}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setPayment({ cardName: e.target.value })
								}
								placeholder="John Doe"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Expiry Date
							</label>
							<Input
								value={payment.expiry}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setPayment({ expiry: e.target.value })
								}
								placeholder="MM/YY"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-foreground mb-1">
								CVV
							</label>
							<Input
								value={payment.cvv}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setPayment({ cvv: e.target.value })
								}
								placeholder="123"
							/>
						</div>
					</div>

					<h3 className="text-lg font-medium mt-4 text-foreground">
						Billing Address
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
						<div>
							<label className="block text-sm font-medium text-foreground mb-1">
								Street Address
							</label>
							<Input
								value={payment.street}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setPayment({ street: e.target.value })
								}
								placeholder="123 Main Street"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
								City
							</label>
							<Input
								value={payment.city}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setPayment({ city: e.target.value })
								}
								placeholder="New York"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
								State
							</label>
							<Input
								value={payment.stateField}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setPayment({ stateField: e.target.value })
								}
								placeholder="NY"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
								ZIP Code
							</label>
							<Input
								value={payment.zip}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setPayment({ zip: e.target.value })
								}
								placeholder="10001"
							/>
						</div>
						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
								Country
							</label>
							<Input
								value={payment.country}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setPayment({ country: e.target.value })
								}
								placeholder="USA"
							/>
						</div>
					</div>
				</div>

				<aside className="w-full md:w-80 !bg-white dark:!bg-slate-700/50 p-4 rounded-lg border border-gray-200 dark:border-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
					<div className="text-sm text-muted-foreground">Total Amount</div>
					<div className="text-2xl font-bold mb-4 text-foreground">
						{totalAmount}
					</div>

					<div className="space-y-2">
						<button
							onClick={handleApplePay}
							className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
						>
							<span className="font-medium"></span>
							<span>Pay with Apple Pay</span>
						</button>

						<button
							onClick={handleGooglePay}
							className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#4285F4] text-white rounded-lg"
						>
							<svg
								width="18"
								height="18"
								viewBox="0 0 48 48"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="inline-block"
							>
								<path
									d="M44.5 20H24v8h11.9C34.1 31.4 29.9 34 24 34c-8.3 0-15-6.7-15-15s6.7-15 15-15c4.1 0 7.8 1.6 10.6 4.1l5.9-5.9C36.1 2.3 30.4 0 24 0 10.8 0 0 10.8 0 24s10.8 24 24 24c11.2 0 20.7-8 23.7-18.6L44.5 20z"
									fill="#fff"
								/>
							</svg>
							<span>Pay with Google Pay</span>
						</button>

						<div className="mt-4">
							<div className="text-xs text-muted-foreground">
								Or pay with card
							</div>
						</div>
					</div>
				</aside>
			</div>

			<div className="border-t border-gray-200 dark:border-slate-600 pt-4 flex items-center justify-between">
				<div>
					<div className="text-sm text-muted-foreground">Total Amount</div>
					<div className="text-2xl font-bold text-foreground">
						{totalAmount}
					</div>
				</div>
				<div className="flex items-center gap-3">
					<button
						onClick={onBack}
						className="px-6 py-2 border border-gray-200 dark:border-slate-600 rounded-lg !bg-white dark:!bg-slate-800/95 backdrop-blur-sm text-foreground hover:bg-gray-50 dark:hover:bg-slate-700/50 [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"
					>
						Back
					</button>
					<button
						onClick={handleConfirm}
						className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg"
					>
						Complete Booking
					</button>
				</div>
			</div>
		</div>
	);
}
