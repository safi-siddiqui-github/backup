"use client";

import { ReactNode } from "react";

type Props = {
	children?: ReactNode;
};

export default function LayoutAuthComponent({ children }: Props) {
	return (
		<div className="flex min-h-screen bg-gray-50 pt-20 md:pt-24 dark:bg-gray-950">
			{/* Left Side - Branding (Hidden on mobile, visible on desktop) */}
			<div className="relative hidden md:flex md:w-1/2">
				{/* <AuthBrandingSide /> */}
			</div>

			{/* Right Side - Form Content */}
			<div className="flex w-full items-center justify-center overflow-x-hidden bg-linear-to-br from-gray-50 via-white to-gray-100 px-4 py-12 sm:px-6 md:relative md:w-1/2 lg:px-8 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
				<div className="relative w-full max-w-md [&>div:has(div[class*='OnboardingWizard'])]:max-w-none">
					{children}
				</div>
			</div>
		</div>
	);
}
