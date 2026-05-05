"use client";

export function downloadReceiptContent(opts: {
	bookingRef: string;
	rideTitle: string;
	pickup: string;
	pickupTime: string;
	dropoff: string;
	amount: string;
	name?: string;
	phone?: string;
}) {
	const {
		bookingRef,
		rideTitle,
		pickup,
		pickupTime,
		dropoff,
		amount,
		name = "",
		phone = "",
	} = opts;
	return `Booking Reference: ${bookingRef}\nRide: ${rideTitle}\nPickup: ${pickup} @ ${pickupTime}\nDropoff: ${dropoff}\nAmount: ${amount}\nName: ${name} \nPhone: ${phone}\n`;
}

export function downloadReceiptFile(content: string, filename = "receipt.txt") {
	const blob = new Blob([content], { type: "text/plain" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}

export function createICS(bookingRef: string, title: string) {
	const dtStart = new Date();
	const dtEnd = new Date(dtStart.getTime() + 60 * 60 * 1000);
	return `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:${bookingRef}\nDTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z\nDTSTART:${dtStart.toISOString().replace(/[-:]/g, "").split(".")[0]}Z\nDTEND:${dtEnd.toISOString().replace(/[-:]/g, "").split(".")[0]}Z\nSUMMARY:${title}\nEND:VEVENT\nEND:VCALENDAR`;
}

export function downloadICSFile(content: string, filename = "event.ics") {
	const blob = new Blob([content], { type: "text/calendar" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}
