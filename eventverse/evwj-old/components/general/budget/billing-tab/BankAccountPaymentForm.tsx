"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
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
import { bankAccountSchema, BankAccountFormValues } from "./validationSchemas";
import { PaymentMethod } from "./types";

interface BankAccountPaymentFormProps {
	editingMethod?: PaymentMethod | null;
	onSubmit: (data: BankAccountFormValues) => void;
	onCancel: () => void;
}

export default function BankAccountPaymentForm({
	editingMethod,
	onSubmit,
	onCancel,
}: BankAccountPaymentFormProps) {
	const form = useForm<BankAccountFormValues>({
		resolver: zodResolver(bankAccountSchema),
		defaultValues: {
			bankName: editingMethod && editingMethod.type === "bank"
				? editingMethod.bankName || ""
				: "",
			accountHolderName: editingMethod && editingMethod.type === "bank"
				? editingMethod.cardholderName
				: "",
			accountType: editingMethod && editingMethod.type === "bank"
				? editingMethod.accountType || "checking"
				: "checking",
			routingNumber: editingMethod && editingMethod.type === "bank" && editingMethod.routingNumber
				? `****${editingMethod.routingNumber}`
				: "",
			accountNumber: "",
			confirmAccountNumber: "",
			setAsDefault: editingMethod?.isDefault || false,
		},
	});

	// Reset form when editingMethod changes
	useEffect(() => {
		if (editingMethod && editingMethod.type === "bank") {
			form.reset({
				bankName: editingMethod.bankName || "",
				accountHolderName: editingMethod.cardholderName,
				accountType: editingMethod.accountType || "checking",
				routingNumber: editingMethod.routingNumber ? `****${editingMethod.routingNumber}` : "",
				accountNumber: "",
				confirmAccountNumber: "",
				setAsDefault: editingMethod.isDefault,
			});
		} else if (!editingMethod) {
			form.reset({
				bankName: "",
				accountHolderName: "",
				accountType: "checking",
				routingNumber: "",
				accountNumber: "",
				confirmAccountNumber: "",
				setAsDefault: false,
			});
		}
	}, [editingMethod, form]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="bankName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bank Name</FormLabel>
							<FormControl>
								<Input placeholder="Chase Bank" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="accountHolderName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Account Holder Name</FormLabel>
							<FormControl>
								<Input placeholder="John Smith or Business Name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="accountType"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Account Type</FormLabel>
							<Select onValueChange={field.onChange} value={field.value} disabled={!!editingMethod}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="checking">Checking</SelectItem>
									<SelectItem value="savings">Savings</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="routingNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Routing Number</FormLabel>
							<FormControl>
								<Input
									placeholder="021000021"
									{...field}
									disabled={!!editingMethod}
									maxLength={9}
									onChange={(e) => {
										if (!editingMethod) {
											field.onChange(e.target.value);
										}
									}}
								/>
							</FormControl>
							<p className="text-xs text-muted-foreground">
								9-digit routing number from your check or bank statement
							</p>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="accountNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Account Number</FormLabel>
							<FormControl>
								<Input
									placeholder={editingMethod ? "Enter new account number to update" : "Enter account number"}
									{...field}
									type="password"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="confirmAccountNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Account Number</FormLabel>
							<FormControl>
								<Input
									placeholder={editingMethod ? "Re-enter new account number" : "Re-enter account number"}
									{...field}
									type="password"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

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

				<div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
					<h4 className="font-semibold text-sm mb-1">ACH Direct Debit</h4>
					<p className="text-xs text-muted-foreground">
						Payments via ACH typically take 3-5 business days to process. Lower processing fees compared to credit cards.
					</p>
				</div>

				<div className="flex justify-end gap-2 pt-4">
					<Button type="button" variant="outline" onClick={onCancel}>
						Cancel
					</Button>
					<Button type="submit">
						{editingMethod ? "Update Bank Account" : "Save Bank Account"}
					</Button>
				</div>
			</form>
		</Form>
	);
}

