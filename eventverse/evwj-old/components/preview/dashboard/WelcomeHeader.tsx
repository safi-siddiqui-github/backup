import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";

interface WelcomeHeaderProps {
	userName?: string;
}

const getGreeting = () => {
	const hour = new Date().getHours();
	if (hour < 12) return "Good morning";
	if (hour < 18) return "Good afternoon";
	return "Good evening";
};

export const WelcomeHeader = ({ userName }: WelcomeHeaderProps) => {
	// const navigate = useNavigate();

	return (
		<div className="relative mb-8 overflow-hidden rounded-2xl">
			{/* Animated gradient background */}
			<div className="absolute inset-0 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--border))_1px,transparent_0)] bg-size-[40px_40px] opacity-20" />

			{/* Glass-morphism container */}
			<div className="relative border border-white/20 bg-white/60 p-8 shadow-2xl backdrop-blur-xl dark:border-gray-800/20 dark:bg-gray-900/60">
				<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
					{/* Left: User greeting */}
					<div className="space-y-3">
						<h1 className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
							{getGreeting()}, {userName || "Guest"}!
						</h1>
						<p className="text-muted-foreground flex items-center gap-2 text-base md:text-lg">
							<span className="font-medium">
								{format(new Date(), "EEEE, MMMM d")}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
