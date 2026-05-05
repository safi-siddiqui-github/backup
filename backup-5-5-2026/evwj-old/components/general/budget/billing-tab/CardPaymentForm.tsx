"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cardSchema, CardFormValues } from "./validationSchemas";
import { PaymentMethod } from "./types";

interface CardPaymentFormProps {
	editingMethod?: PaymentMethod | null;
	onSubmit: (data: CardFormValues) => void;
	onCancel: () => void;
}

export default function CardPaymentForm({
	editingMethod,
	onSubmit,
	onCancel,
}: CardPaymentFormProps) {
	const form = useForm<CardFormValues>({
		resolver: zodResolver(cardSchema),
		defaultValues: {
			cardNumber: editingMethod && editingMethod.type === "card"
				? `**** **** **** ${editingMethod.lastFour}`
				: "",
			cardholderName: editingMethod && editingMethod.type === "card"
				? editingMethod.cardholderName
				: "",
			expiryMonth: editingMethod && editingMethod.type === "card"
				? editingMethod.expiryMonth || ""
				: "",
			expiryYear: editingMethod && editingMethod.type === "card"
				? editingMethod.expiryYear || ""
				: "",
			cvv: "",
			streetAddress: "",
			city: "",
			state: "",
			zipCode: "",
			country: "USA",
			setAsDefault: editingMethod?.isDefault || false,
		},
	});

	// Reset form when editingMethod changes
	useEffect(() => {
		if (editingMethod && editingMethod.type === "card") {
			form.reset({
				cardNumber: `**** **** **** ${editingMethod.lastFour}`,
				cardholderName: editingMethod.cardholderName,
				expiryMonth: editingMethod.expiryMonth || "",
				expiryYear: editingMethod.expiryYear || "",
				cvv: "",
				streetAddress: "",
				city: "",
				state: "",
				zipCode: "",
				country: "USA",
				setAsDefault: editingMethod.isDefault,
			});
		} else if (!editingMethod) {
			form.reset({
				cardNumber: "",
				cardholderName: "",
				expiryMonth: "",
				expiryYear: "",
				cvv: "",
				streetAddress: "",
				city: "",
				state: "",
				zipCode: "",
				country: "USA",
				setAsDefault: false,
			});
		}
	}, [editingMethod, form]);

	const formatCardNumber = (value: string) => {
		const cleaned = value.replace(/\s/g, "");
		const match = cleaned.match(/.{1,4}/g);
		return match ? match.join(" ") : cleaned;
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="cardNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Card Number</FormLabel>
							<FormControl>
								<Input
									placeholder="1234 5678 9012 3456"
									{...field}
									disabled={!!editingMethod}
									onChange={(e) => {
										if (!editingMethod) {
											const formatted = formatCardNumber(e.target.value);
											field.onChange(formatted);
										}
									}}
									maxLength={19}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="cardholderName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cardholder Name</FormLabel>
							<FormControl>
								<Input placeholder="John Smith" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-3 gap-4">
					<FormField
						control={form.control}
						name="expiryMonth"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Month</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="MM" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
											<SelectItem key={month} value={month.toString().padStart(2, "0")}>
												{month.toString().padStart(2, "0")}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="expiryYear"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Year</FormLabel>
								<FormControl>
									<Input placeholder="YYYY" {...field} maxLength={4} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="cvv"
						render={({ field }) => (
							<FormItem>
								<FormLabel>CVV</FormLabel>
								<FormControl>
									<Input placeholder="123" {...field} maxLength={4} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="space-y-2">
					<Label className="text-sm font-medium">Billing Address (Optional)</Label>
					<FormField
						control={form.control}
						name="streetAddress"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="Street Address" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="City" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="state"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="State" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="zipCode"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="ZIP Code" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="country"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Country" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<FormField
					control={form.control}
					name="setAsDefault"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel className="text-sm font-normal">
									Set as default payment method
								</FormLabel>
							</div>
						</FormItem>
					)}
				/>

				<div className="flex justify-end gap-2 pt-4">
					<Button type="button" variant="outline" onClick={onCancel}>
						Cancel
					</Button>
					<Button type="submit">
						{editingMethod ? "Update Card" : "Save Card"}
					</Button>
				</div>
			</form>
		</Form>
	);
}

