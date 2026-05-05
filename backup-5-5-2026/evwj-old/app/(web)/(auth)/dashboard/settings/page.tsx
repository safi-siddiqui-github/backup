"use client";

import SettingsComponent from "@/components/general/settings/SettingsComponent";
import LayoutOneComponent from "@/components/general/layout/LayoutOneComponent";

export default function SettingsPage() {
	return (
		<div className="whatsapp-doodle-bg relative flex min-h-screen w-full flex-col bg-white dark:bg-black">
			<div className="relative flex flex-1 flex-col">
				{/* Blurred gradient orbs backdrop (aligned with home/explore/dashboard) */}
				<div className="pointer-events-none absolute top-0 flex h-full w-full flex-col">
					{/* Primary center orbs */}
					<div className="sticky top-32 flex w-full justify-center gap-4">
						<div className="h-56 max-w-xl flex-1 bg-blue-300/30 blur-3xl dark:bg-blue-600/30 2xl:max-w-2xl" />
						<div className="h-56 max-w-xl flex-1 bg-purple-300/30 blur-3xl dark:bg-purple-600/30 2xl:max-w-2xl" />
					</div>

					{/* Mid-page side orbs */}
					<div className="mt-[35vh] flex w-full justify-between px-6 md:px-12">
						<div className="h-40 w-40 rounded-full bg-blue-300/25 blur-3xl dark:bg-blue-600/25" />
						<div className="h-40 w-40 rounded-full bg-purple-300/25 blur-3xl dark:bg-purple-600/25" />
					</div>

					{/* Lower ambient orbs */}
					<div className="mt-auto mb-24 flex w-full justify-center gap-8">
						<div className="h-44 w-44 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-600/25" />
						<div className="h-44 w-44 rounded-full bg-purple-300/20 blur-3xl dark:bg-purple-600/25" />
					</div>
				</div>

				{/* Content wrapper with z-index */}
				<div className="relative z-10">
					<LayoutOneComponent>
						<div className="mx-auto w-full max-w-7xl px-4 py-28 md:py-32">
							<SettingsComponent />
						</div>
					</LayoutOneComponent>
				</div>
			</div>
		</div>
	);
}
