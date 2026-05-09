"use client";

import React from "react";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectItem,
} from "@/components/ui/select";

type Props = {
	label?: React.ReactNode;
	defaultValue?: string;
	className?: string;
	children?: React.ReactNode;
};

export default function StyledSelect({
	label,
	defaultValue,
	className,
	children,
}: Props) {
	const items = React.Children.map(children, (child) => {
		if (!React.isValidElement(child)) return null;
		const el = child as React.ReactElement<{
			value?: string;
			children?: React.ReactNode;
		}>;
		if (typeof el.type === "string" && (el.type as string) === "option") {
			const val = el.props.value ?? String(el.props.children ?? "");
			return <SelectItem value={String(val)}>{el.props.children}</SelectItem>;
		}
		return el;
	});

	return (
		<Select defaultValue={defaultValue}>
			<SelectTrigger className={className}>
				<SelectValue placeholder={label ?? "Select"} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{label && <SelectLabel>{label}</SelectLabel>}
					{items}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
