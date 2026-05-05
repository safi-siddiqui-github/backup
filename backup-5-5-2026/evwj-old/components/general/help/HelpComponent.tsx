"use client";

import {
	Bell,
	BookOpen,
	Calendar,
	Camera,
	ChartArea,
	ChevronDown,
	ClipboardCheck,
	DollarSign,
	Globe,
	Mail,
	MapPin,
	Megaphone,
	MessageCircle,
	Phone,
	Plane,
	Search,
	Ticket,
	Users,
	Video,
} from "lucide-react";
import { useMemo } from "react";

export default function HelpComponent() {
	//
	const quickStartGuides = useMemo(
		() => [
			{
				icon: Calendar,
				title: "Creating Your First Event",
				description:
					"Step-by-step guide to setting up your event from scratch in under 5 minutes.",
			},
			{
				icon: Users,
				title: "Inviting Guests & Managing RSVPs",
				description:
					"Learn how to send invitations, track responses, and manage your guest list.",
			},
			{
				icon: MapPin,
				title: "Setting Up Seating Charts",
				description:
					"Create beautiful seating arrangements with our drag-and-drop builder.",
			},
			{
				icon: DollarSign,
				title: "Managing Vendors & Budget",
				description:
					"Track expenses, manage vendor contracts, and stay within budget.",
			},
		],
		[],
	);

	const modulesData = useMemo(
		() => [
			{
				icon: ChartArea,
				title: "Analytics",
				description: "Track engagement and event metrics",
			},
			{
				icon: Bell,
				title: "Announcements",
				description: "Send updates to your guests",
			},
			{
				icon: DollarSign,
				title: "Budget",
				description: "Manage event finances",
			},
			{ icon: Camera, title: "Media", description: "Share photos and videos" },
			{
				icon: ClipboardCheck,
				title: "RSVP",
				description: "Track guest responses",
			},
			{
				icon: Calendar,
				title: "Schedule",
				description: "Create event timelines",
			},
			{ icon: MapPin, title: "Seating", description: "Arrange seating charts" },
			{
				icon: Globe,
				title: "Website Builder",
				description: "Create custom event pages",
			},
			{ icon: Ticket, title: "Ticketing", description: "Sell event tickets" },
			{ icon: Plane, title: "Travel", description: "Coordinate guest travel" },
			{
				icon: Megaphone,
				title: "Marketing",
				description: "Promote your events",
			},
		],
		[],
	);

	const troubleshooting = useMemo(
		() => [
			{
				question: "Guests aren't receiving invitation emails",
				answer:
					"Check that email addresses are correct and ask guests to check spam folders. Ensure your email settings are configured properly in Settings > Notifications. If issues persist, try resending invitations or use SMS as an alternative.",
			},
			{
				question: "I can't upload images to my event",
				answer:
					"Ensure images are under 10MB and in supported formats (JPG, PNG, GIF). Check your browser's file upload permissions. Try clearing cache or using a different browser. Premium users have higher upload limits.",
			},
			{
				question: "My seating chart isn't saving",
				answer:
					"Make sure you click 'Save Changes' after making modifications. Check your internet connection. If using the mobile app, try the web version. Contact support if the issue continues.",
			},
			{
				question: "How do I recover a deleted event?",
				answer:
					"Events are kept in trash for 30 days. Go to Settings > Trash to restore. After 30 days, deletion is permanent. We recommend exporting important data regularly as a backup.",
			},
		],
		[],
	);

	//
	return (
		<div className="bg-background text-foreground min-h-screen">
			{/* ======= HERO ======= */}
			<section className="relative overflow-hidden">
				{/* Decorative gradients */}
				<div className="pointer-events-none absolute inset-0">
					<div className="bg-primary/20 absolute -top-24 left-1/2 h-64 w-160 -translate-x-1/2 rounded-full blur-3xl" />
					<div className="bg-accent/20 absolute bottom-0 left-1/3 h-64 w-lg -translate-x-1/2 rounded-full blur-3xl" />
				</div>

				<div className="relative mx-auto max-w-6xl px-4 pt-16 pb-12 md:pt-24 md:pb-16">
					<div className="mx-auto max-w-3xl text-center">
						<h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
							Help Center
						</h1>
						<p className="text-muted-foreground mt-3 md:text-lg">
							Get answers, learn features, and master EventVerse.
						</p>

						{/* Search (static) */}
						<form
							action="/help/search"
							method="GET"
							className="mx-auto mt-6 max-w-2xl"
						>
							<div className="group relative">
								<div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 opacity-70">
									<Search className="text-foreground/60 h-5 w-5" />
								</div>
								<input
									name="q"
									type="text"
									placeholder="Search help articles (e.g., tickets, refunds, check-in)…"
									className="border-border bg-card/80 focus:border-primary/60 h-12 w-full rounded-xl border pr-24 pl-10 text-base shadow-sm backdrop-blur-sm transition outline-none"
								/>
								<button
									type="submit"
									className="bg-primary text-primary-foreground absolute top-1/2 right-1 -translate-y-1/2 rounded-lg px-3 py-2 text-sm font-medium shadow-sm transition hover:brightness-105"
								>
									Search
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>

			{/* ======= MAIN ======= */}
			<main className="mx-auto max-w-6xl px-4 pb-20">
				{/* Quick Start Guides */}
				<section className="mb-20">
					<header className="mb-8 text-center">
						<h2 className="text-2xl font-semibold md:text-3xl">
							Quick Start Guides
						</h2>
						<p className="text-muted-foreground mt-2">
							Get up and running in minutes with these essential guides
						</p>
					</header>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						{quickStartGuides.map((g, i) => (
							<div
								key={i}
								className="group border-border/70 bg-card/70 hover:border-primary/40 h-full rounded-2xl border p-6 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md"
							>
								<div className="from-primary/15 to-accent/15 ring-border/60 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ring-1">
									<g.icon className="text-primary h-6 w-6" />
								</div>
								<h3 className="text-lg font-semibold">{g.title}</h3>
								<p className="text-muted-foreground mt-2 text-sm">
									{g.description}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* Feature Documentation */}
				<section className="mb-20">
					<header className="mb-8 text-center">
						<h2 className="text-2xl font-semibold md:text-3xl">
							Feature Documentation
						</h2>
						<p className="text-muted-foreground mt-2">
							Detailed guides for every EventVerse module
						</p>
					</header>

					<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
						{modulesData.map((m, i) => (
							<a
								key={i}
								href={`/modules/${m.title.toLowerCase()}`}
								className="group border-border/70 bg-card/70 hover:border-primary/40 block h-full rounded-2xl border p-6 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md"
							>
								<div className="from-primary/15 to-accent/15 ring-border/60 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ring-1">
									<m.icon className="text-primary h-6 w-6" />
								</div>
								<h3 className="text-lg font-semibold">{m.title}</h3>
								<p className="text-muted-foreground mt-1 text-sm">
									{m.description}
								</p>
								<span className="text-primary/90 mt-3 inline-block text-sm group-hover:underline">
									View guide →
								</span>
							</a>
						))}
					</div>
				</section>

				{/* Video Tutorials */}
				<section className="mb-20">
					<header className="mb-8 text-center">
						<h2 className="text-2xl font-semibold md:text-3xl">
							Video Tutorials
						</h2>
						<p className="text-muted-foreground mt-2">
							Watch and learn with step-by-step video guides
						</p>
					</header>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{[1, 2, 3, 4, 5, 6].map((n) => (
							<div
								key={n}
								className="border-border/70 bg-card/70 overflow-hidden rounded-2xl border shadow-sm backdrop-blur-sm transition hover:shadow-md"
							>
								<div className="from-primary/15 to-accent/15 flex aspect-video items-center justify-center bg-linear-to-br">
									<Video className="text-primary h-14 w-14" />
								</div>
								<div className="p-5">
									<h3 className="font-semibold">
										Getting Started Tutorial {n}
									</h3>
									<p className="text-muted-foreground text-sm">5 minutes</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Troubleshooting */}
				<section className="mb-20">
					<header className="mb-8 text-center">
						<h2 className="text-2xl font-semibold md:text-3xl">
							Troubleshooting
						</h2>
						<p className="text-muted-foreground mt-2">
							Solutions to common issues
						</p>
					</header>

					<div className="border-border/70 bg-card/70 mx-auto max-w-3xl overflow-hidden rounded-2xl border shadow-sm backdrop-blur-sm">
						{troubleshooting.map((t, i) => (
							<details
								key={i}
								className="group border-border/60 border-b last:border-none"
							>
								<summary className="hover:bg-muted/30 flex cursor-pointer list-none items-start gap-3 p-5 text-left text-lg font-medium transition">
									<span className="mt-1 shrink-0">
										<ChevronDown className="text-muted-foreground h-4 w-4 transition group-open:rotate-90" />
									</span>
									<span>{t.question}</span>
								</summary>
								<div className="text-muted-foreground px-5 pt-0 pb-5 text-base leading-relaxed">
									{t.answer}
								</div>
							</details>
						))}
					</div>
				</section>

				{/* Contact Support */}
				<section>
					<div className="border-border/70 from-primary/10 via-card to-accent/10 rounded-2xl border bg-linear-to-br p-8 shadow-sm">
						<div className="mb-8 text-center">
							<div className="bg-primary/15 ring-border/60 mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl ring-1">
								<BookOpen className="text-primary h-7 w-7" />
							</div>
							<h2 className="text-2xl font-bold">Need More Help?</h2>
							<p className="text-muted-foreground">
								Our support team is available 24/7 to assist you
							</p>
						</div>

						<div className="grid gap-6 md:grid-cols-3">
							{/* Email */}
							<div className="text-center">
								<div className="bg-primary/15 ring-border/60 mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1">
									<Mail className="text-primary h-6 w-6" />
								</div>
								<h3 className="mb-1 font-semibold">Email Support</h3>
								<p className="text-muted-foreground mb-3 text-sm">
									Response within 2 hours
								</p>
								<a
									href="mailto:support@example.com"
									className="border-border/70 hover:bg-muted/40 inline-block rounded-lg border px-3 py-2 text-sm transition"
								>
									Send Email
								</a>
							</div>

							{/* Chat */}
							<div className="text-center">
								<div className="bg-primary/15 ring-border/60 mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1">
									<MessageCircle className="text-primary h-6 w-6" />
								</div>
								<h3 className="mb-1 font-semibold">Live Chat</h3>
								<p className="text-muted-foreground mb-3 text-sm">
									Instant assistance
								</p>
								<a
									href="/help/contact-support"
									className="border-border/70 hover:bg-muted/40 inline-block rounded-lg border px-3 py-2 text-sm transition"
								>
									Start Chat
								</a>
							</div>

							{/* Phone */}
							<div className="text-center">
								<div className="bg-primary/15 ring-border/60 mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1">
									<Phone className="text-primary h-6 w-6" />
								</div>
								<h3 className="mb-1 font-semibold">Phone Support</h3>
								<p className="text-muted-foreground mb-3 text-sm">
									Mon-Fri, 9am-6pm EST
								</p>
								<a
									href="tel:+10000000000"
									className="border-border/70 hover:bg-muted/40 inline-block rounded-lg border px-3 py-2 text-sm transition"
								>
									Call Now
								</a>
							</div>
						</div>
					</div>
				</section>
			</main>

			{/* Footer space */}
			<div className="py-8" />
		</div>
	);
}
