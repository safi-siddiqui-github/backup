import { Info, LucideIcon } from "lucide-react";

interface InfoBannerProps {
	icon?: LucideIcon;
	children: React.ReactNode;
}

export default function InfoBanner({
	icon: Icon = Info,
	children,
}: InfoBannerProps) {
	return (
		<div className="flex items-start gap-2 p-3 bg-white border border-gray-200 rounded-md">
			<Icon className="h-4 w-4 text-muted-foreground mt-0.5" />
			<p className="text-sm text-muted-foreground">{children}</p>
		</div>
	);
}
