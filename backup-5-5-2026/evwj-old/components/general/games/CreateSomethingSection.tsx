"use client";

import { Gamepad2, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function CreateSomethingSection({
	createHref = "#",
	templatesHref = "#",
}: {
	createHref?: string;
	templatesHref?: string;
}) {
	const items = [
		{
			title: "Multiple Game Templates",
			subtitle: "Lightning Trivia, Tap Race, Photo Challenges & more",
			Icon: Gamepad2,
			bg: "bg-blue-50",
			color: "text-blue-600",
		},
		{
			title: "Custom number of Players",
			subtitle: "From intimate groups to thousands",
			Icon: Users,
			bg: "bg-violet-50",
			color: "text-violet-600",
		},
		{
			title: "Real-time Fun",
			subtitle: "Instant scoring & live leaderboards",
			Icon: Zap,
			bg: "bg-amber-50",
			color: "text-amber-600",
		},
	];

	return (
		<section className="mx-auto mt-30 w-full max-w-5xl px-2 md:px-0">
			<div className="text-center">
				<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
					<Gamepad2 className="h-8 w-8" />
				</div>
				<h3 className="text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl">
					Ready to Create Something Amazing?
				</h3>
				<p className="mt-2 text-gray-500 dark:text-slate-300">
					Choose from multiple interactive game types. Perfect for events,
					parties, and gatherings!
				</p>
			</div>

			<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
				{items.map(({ title, subtitle, Icon, bg, color }) => (
					<div
						key={title}
						className="rounded-2xl border !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)] p-6 text-center shadow-sm"
					>
						<div
							className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${bg} dark:opacity-80 ${color} dark:brightness-110`}
						>
							<Icon className="h-6 w-6" />
						</div>
						<div className="font-semibold text-gray-800 dark:text-white">
							{title}
						</div>
						<div className="mt-1 text-sm text-gray-500 dark:text-slate-300">
							{subtitle}
						</div>
					</div>
				))}
			</div>

			<div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
				<Link
					href={createHref}
					className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-3 font-semibold text-white shadow hover:bg-blue-700"
				>
					✨ Create Your First Game
				</Link>
				<Link
					href={templatesHref}
					className="inline-flex items-center gap-2 rounded-md border !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)] px-5 py-3 font-semibold text-gray-800 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700/50"
				>
					Browse Templates →
				</Link>
			</div>
		</section>
	);
}
