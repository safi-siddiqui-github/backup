import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ReserveForm } from "../types";

type Props = {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	onSubmit: (form: ReserveForm) => void;
};

export default function ReserveModal({ open, onOpenChange, onSubmit }: Props) {
	const [form, setForm] = useState<ReserveForm>({
		ticketType: "General Admission",
		quantity: 1,
		guestName: "",
		guestEmail: "",
		reason: "VIP Guest",
		notes: "",
	});

	const handleSubmit = () => {
		onSubmit(form);
		setForm({
			ticketType: "General Admission",
			quantity: 1,
			guestName: "",
			guestEmail: "",
			reason: "VIP Guest",
			notes: "",
		});
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-2xl md:max-w-3xl">
				<DialogHeader>
					<DialogTitle>Reserve Tickets</DialogTitle>
					<DialogDescription>
						Reserve complimentary tickets for guests, staff, or VIPs
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 py-4">
					<div>
						<Label>Ticket Type</Label>
						<Input
							value={form.ticketType}
							onChange={(e) =>
								setForm((f) => ({ ...f, ticketType: e.target.value }))
							}
							placeholder="Select ticket type"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label>Quantity</Label>
							<Input
								type="number"
								min={1}
								value={form.quantity}
								onChange={(e) =>
									setForm((f) => ({ ...f, quantity: Number(e.target.value) }))
								}
							/>
						</div>
						<div>
							<Label>Reservation Reason</Label>
							<div className="relative">
								<select
									className="w-full rounded-md border border-gray-200 dark:border-slate-600 px-3 py-2 !bg-white dark:!bg-slate-700/50 text-gray-900 dark:text-slate-200 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]"
									value={form.reason}
									onChange={(e) =>
										setForm((f) => ({ ...f, reason: e.target.value }))
									}
								>
									<option>VIP Guest</option>
									<option>Press/Media</option>
									<option>Staff</option>
									<option>Sponsor</option>
									<option>Speaker/Presenter</option>
									<option>Vendor</option>
									<option>Complimentary</option>
									<option>Other</option>
								</select>
							</div>
						</div>
					</div>

					<div>
						<Label>Guest Name</Label>
						<Input
							placeholder="e.g. John Smith"
							value={form.guestName}
							onChange={(e) =>
								setForm((f) => ({ ...f, guestName: e.target.value }))
							}
						/>
					</div>
					<div>
						<Label>Guest Email</Label>
						<Input
							placeholder="john@example.com"
							value={form.guestEmail}
							onChange={(e) =>
								setForm((f) => ({ ...f, guestEmail: e.target.value }))
							}
						/>
					</div>
					<div>
						<Label>Notes (Optional)</Label>
						<Textarea
							placeholder="Additional notes about this reservation..."
							value={form.notes}
							onChange={(e) =>
								setForm((f) => ({ ...f, notes: e.target.value }))
							}
						/>
					</div>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
					>
						Reserve Tickets
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
