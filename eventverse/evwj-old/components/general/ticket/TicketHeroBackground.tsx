export default function TicketHeroBackground() {
	return (
		<div className="fixed inset-0 overflow-hidden pointer-events-none">
			<div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
			<div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
		</div>
	);
}
