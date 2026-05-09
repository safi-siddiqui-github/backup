"use client";

import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import Stepper from "./Stepper";
import DetailsStep from "./DetailsStep";
import PaymentStep from "./PaymentStep";
import ConfirmationStep from "./ConfirmationStep";
import type { RideOption } from "./types";

export default function RideBookingModal({
	ride,
	onClose,
}: {
	ride: RideOption;
	onClose: () => void;
}) {
	const [step, setStep] = useState(1);

	React.useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
		}
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [onClose]);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");

	const [cardNumber, setCardNumber] = useState("1234 5678 9012 3456");
	const [cardName, setCardName] = useState("John Doe");
	const [expiry, setExpiry] = useState("MM/YY");
	const [cvv, setCvv] = useState("123");

	const [street, setStreet] = useState("123 Main Street");
	const [city, setCity] = useState("New York");
	const [stateField, setStateField] = useState("NY");
	const [zip, setZip] = useState("10001");
	const [country, setCountry] = useState("USA");

	const totalAmount = useMemo(
		() => `$${(ride?.price || 0).toFixed(2)}`,
		[ride],
	);

	const next = () => setStep((s) => Math.min(3, s + 1));
	const back = () => setStep((s) => Math.max(1, s - 1));

	const bookingRef = React.useMemo(
		() => `RIDE-${Date.now().toString(36).toUpperCase().slice(-8)}`,
		[],
	);

	const handleApplePay = () => {
		toast.success("Apple Pay selected (stub)");
		next();
	};
	const handleGooglePay = () => {
		toast.success("Google Pay selected (stub)");
		next();
	};

	const handleConfirmPayment = () => {
		toast.success("Payment processed (stub)");
		next();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div
				className="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm"
				aria-hidden="true"
				onClick={onClose}
			/>

			<div className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl !bg-white dark:!bg-[#020617] border border-gray-100 dark:border-gray-800 backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
				<header className="flex items-center justify-between gap-4 p-4 border-b border-gray-100 dark:border-gray-800">
					<div>
						<h1 className="text-xl font-extrabold text-gray-900 dark:text-white">
							Reserve Ride
						</h1>
						<p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
							{ride.service} • {ride.pickupLocation}
						</p>
					</div>
					<div>
						<button
							onClick={onClose}
							aria-label="Close"
							className="h-9 w-9 rounded-lg bg-gray-100 dark:bg-[#020617] flex items-center justify-center text-gray-600 hover:bg-gray-200 dark:hover:bg-[#020617] transition"
						>
							✕
						</button>
					</div>
				</header>

				<div className="p-4 md:p-6 flex-1 overflow-y-auto">
					<div className="w-full mx-auto">
						<div className="mb-4">
							<Stepper currentStep={step} />
						</div>

						<div className="bg-white dark:bg-[#020617] rounded-xl shadow-md p-6 max-h-[70vh] overflow-y-auto border border-gray-100 dark:border-gray-800">
							{step === 1 && (
								<DetailsStep
									ride={ride}
									firstName={firstName}
									setFirstName={setFirstName}
									lastName={lastName}
									setLastName={setLastName}
									phone={phone}
									setPhone={setPhone}
									onNext={next}
								/>
							)}

							{step === 2 && (
								<PaymentStep
									totalAmount={totalAmount}
									cardNumber={cardNumber}
									setCardNumber={setCardNumber}
									cardName={cardName}
									setCardName={setCardName}
									expiry={expiry}
									setExpiry={setExpiry}
									cvv={cvv}
									setCvv={setCvv}
									street={street}
									setStreet={setStreet}
									city={city}
									setCity={setCity}
									stateField={stateField}
									setStateField={setStateField}
									zip={zip}
									setZip={setZip}
									country={country}
									setCountry={setCountry}
									onBack={back}
									onConfirm={handleConfirmPayment}
									onApplePay={handleApplePay}
									onGooglePay={handleGooglePay}
								/>
							)}

							{step === 3 && (
								<ConfirmationStep
									bookingRef={bookingRef}
									ride={ride}
									totalAmount={totalAmount}
									onClose={onClose}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
