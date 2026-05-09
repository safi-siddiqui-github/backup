import { ReactNode } from "react";

type LayoutOneComponentType = {
	children?: ReactNode;
};

export default function LayoutOneComponent({
	children,
}: LayoutOneComponentType) {
	return (
		<div className="flex flex-col w-full">
			{/*  */}
			<div className="flex flex-col w-full">
				{/*  */}
				{children}
				{/*  */}
			</div>
			{/*  */}
		</div>
	);
}
