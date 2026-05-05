import React, { type ReactNode } from "react";

export default function DetailItem({
	label,
	value,
	children,
}: {
	label: string;
	value?: string;
	children?: ReactNode;
}) {
	return (
		<div>
			<p className="text-sm font-medium text-muted-foreground">{label}</p>
			<div className="mt-1 text-base font-semibold text-foreground">
				{value}
				{children}
			</div>
		</div>
	);
}
