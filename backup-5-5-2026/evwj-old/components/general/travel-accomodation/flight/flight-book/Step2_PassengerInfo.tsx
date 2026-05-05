import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { User, X, Plus } from "lucide-react";

type Passenger = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	dob: string;
	country: string;
};

export const Step2_PassengerInfo = ({
	onNext,
	onBack,
}: {
	onNext: () => void;
	onBack: () => void;
}) => {
	const initialPassengerState: Passenger = {
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		dob: "",
		country: "",
	};

	const [primaryPassenger, setPrimaryPassenger] = useState<Passenger>(
		initialPassengerState,
	);
	const [additionalPassengers, setAdditionalPassengers] = useState<Passenger[]>(
		[],
	);

	const handlePrimaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPrimaryPassenger((prev) => ({ ...prev, [name]: value }));
	};

	const handleAdditionalChange = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const { name, value } = e.target;
		const updatedPassengers = [...additionalPassengers];
		updatedPassengers[index] = { ...updatedPassengers[index], [name]: value };
		setAdditionalPassengers(updatedPassengers);
	};

	const addPassenger = () =>
		setAdditionalPassengers([
			...additionalPassengers,
			{ ...initialPassengerState },
		]);
	const removePassenger = (index: number) =>
		setAdditionalPassengers(additionalPassengers.filter((_, i) => i !== index));

	return (
		<div className="max-w-4xl mx-auto p-4 md:p-8">
			<div className="space-y-6">
				<h2 className="text-3xl font-bold text-foreground">
					Passenger Information
				</h2>
				<p className="text-muted-foreground">
					Provide passenger&apos;s details.
				</p>

				<div className="!bg-white dark:!bg-slate-700/50 p-6 border border-gray-200 dark:border-slate-600 rounded-lg shadow-sm [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]">
					<div className="flex items-center space-x-3 mb-6">
						<User className="h-5 w-5 text-muted-foreground" />
						<h3 className="text-lg font-semibold text-foreground">
							Primary Passenger
						</h3>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
						<div>
							<label
								htmlFor="firstName"
								className="block text-sm font-medium text-foreground mb-1"
							>
								First name
							</label>
							<Input
								id="firstName"
								name="firstName"
								placeholder="First name"
								value={primaryPassenger.firstName}
								onChange={handlePrimaryChange}
							/>
						</div>
						<div>
							<label
								htmlFor="lastName"
								className="block text-sm font-medium text-foreground mb-1"
							>
								Last name
							</label>
							<Input
								id="lastName"
								name="lastName"
								placeholder="Last name"
								value={primaryPassenger.lastName}
								onChange={handlePrimaryChange}
							/>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
							>
								Email
							</label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="example@email.com"
								value={primaryPassenger.email}
								onChange={handlePrimaryChange}
							/>
						</div>
						<div>
							<label
								htmlFor="phone"
								className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
							>
								Phone
							</label>
							<Input
								id="phone"
								name="phone"
								type="tel"
								placeholder="(123) 456-7890"
								value={primaryPassenger.phone}
								onChange={handlePrimaryChange}
							/>
						</div>
						<div>
							<label
								htmlFor="dob"
								className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
							>
								Date of Birth
							</label>
							<Input
								id="dob"
								name="dob"
								placeholder="mm/dd/yyyy"
								value={primaryPassenger.dob}
								onChange={handlePrimaryChange}
							/>
						</div>
						<div>
							<label
								htmlFor="country"
								className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
							>
								Country of Residence
							</label>
							<Input
								id="country"
								name="country"
								placeholder="United States"
								value={primaryPassenger.country}
								onChange={handlePrimaryChange}
							/>
						</div>
					</div>
				</div>

				{additionalPassengers.map((passenger, index) => (
					<div
						key={index}
						className="!bg-white dark:!bg-slate-700/50 p-6 border border-gray-200 dark:border-slate-600 rounded-lg shadow-sm [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
					>
						<div className="flex justify-between items-center mb-6">
							<h3 className="text-lg font-semibold text-foreground">
								Additional Passenger {index + 1}
							</h3>
							<div onClick={() => removePassenger(index)}>
								<X className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground" />
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
							<div>
								<label
									htmlFor={`add-firstName-${index}`}
									className="block text-sm font-medium text-foreground mb-1"
								>
									First name
								</label>
								<Input
									id={`add-firstName-${index}`}
									name="firstName"
									placeholder="First name"
									value={passenger.firstName}
									onChange={(e) => handleAdditionalChange(index, e)}
								/>
							</div>
							<div>
								<label
									htmlFor={`add-lastName-${index}`}
									className="block text-sm font-medium text-foreground mb-1"
								>
									Last name
								</label>
								<Input
									id={`add-lastName-${index}`}
									name="lastName"
									placeholder="Last name"
									value={passenger.lastName}
									onChange={(e) => handleAdditionalChange(index, e)}
								/>
							</div>
							<div>
								<label
									htmlFor={`add-dob-${index}`}
									className="block text-sm font-medium text-foreground mb-1"
								>
									Date of Birth
								</label>
								<Input
									id={`add-dob-${index}`}
									name="dob"
									placeholder="mm/dd/yyyy"
									value={passenger.dob}
									onChange={(e) => handleAdditionalChange(index, e)}
								/>
							</div>
							{/* Passport/ID fields removed per requirements */}
						</div>
					</div>
				))}

				<button
					onClick={addPassenger}
					className="flex items-center space-x-2 px-4 py-2 border border-dashed border-gray-300 dark:border-slate-600 text-foreground rounded-md hover:border-gray-400 dark:hover:border-slate-500 !bg-white dark:!bg-slate-700/50 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
				>
					<Plus className="h-4 w-4" />
					<span>Add Additional Passenger</span>
				</button>

				<div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-slate-600">
					<button
						onClick={onBack}
						className="px-6 py-2 !bg-white dark:!bg-slate-800/95 backdrop-blur-sm border border-gray-200 dark:border-slate-600 text-foreground rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700/50 [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]"
					>
						Back
					</button>
					<button
						onClick={onNext}
						className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg shadow-sm"
					>
						Continue to Payment
					</button>
				</div>
			</div>
		</div>
	);
};

export default Step2_PassengerInfo;
