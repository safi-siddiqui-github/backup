"use client";
import { ExternalLink, Ticket } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function EventDetailTicketComponent() {
	const [showMore, setShowMore] = useState(false);
	const toggleShowMore = useCallback(() => {
		setShowMore(!showMore);
	}, [showMore]);
	return (
		<div className="flex flex-col">
			<div className="flex flex-col gap-2 rounded-md bg-black/5 p-4">
				<p className="">
					<span className="">Starting at </span>
					<span className="text-lg font-semibold">$35.95</span>
				</p>
				<button className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-linear-to-r from-purple-600 to-cyan-600 py-2 font-medium text-white hover:brightness-95">
					<Ticket />
					<span>Get Tickets</span>
				</button>
				<Link
					href={"#"}
					className="flex items-center gap-2 text-sm font-medium hover:underline"
				>
					<ExternalLink className="size-4" />
					Refund Policy
				</Link>
				<Link
					href={"#"}
					className="flex items-center gap-2 text-sm font-medium hover:underline"
				>
					<ExternalLink className="size-4" />
					Terms & Condition
				</Link>
			</div>
		</div>
	);
}
