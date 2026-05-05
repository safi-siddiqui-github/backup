import { useState, useEffect, useRef } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Module = {
	id: string;
	name: string;
	description: string;
	icon: LucideIcon;
	features: string[];
	price: number;
	recommended?: boolean;
	popular?: boolean;
	premium?: boolean;
}

type ModuleCardProps ={
	module: Module;
	isSelected: boolean;
	isRecommended: boolean;
	onToggle: () => void;
}

const ModuleCard = ({
	module,
	isSelected,
	isRecommended,
	onToggle,
}: ModuleCardProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const [showExpanded, setShowExpanded] = useState(false);
	const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

	const handleMouseEnter = () => {
		setIsHovered(true);
		hoverTimerRef.current = setTimeout(() => {
			setShowExpanded(true);
		}, 2000);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		if (hoverTimerRef.current) {
			clearTimeout(hoverTimerRef.current);
			hoverTimerRef.current = null;
		}
		setShowExpanded(false);
	};

	useEffect(() => {
		return () => {
			if (hoverTimerRef.current) {
				clearTimeout(hoverTimerRef.current);
			}
		};
	}, []);

	// Mock showcase images (would be from module data in production)
	const showcaseImages = [
		`https://placehold.co/300x160/6366f1/ffffff?text=${encodeURIComponent(module.name + " 1")}`,
		`https://placehold.co/300x160/8b5cf6/ffffff?text=${encodeURIComponent(module.name + " 2")}`,
	];

	return (
		<div
			className="relative"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onFocus={handleMouseEnter}
			onBlur={handleMouseLeave}
		>
			<Card
				className={cn(
					"cursor-pointer transition-all duration-300 relative h-full !bg-white dark:!bg-slate-800/95 backdrop-blur-sm [background-color:white] dark:[background-color:rgb(30_41_59/0.95)]",
					showExpanded
						? "absolute z-50 shadow-2xl border-primary scale-105 min-h-[400px]"
						: "hover:shadow-md min-h-[140px]",
					isSelected
						? "border-primary bg-primary/5 dark:bg-primary/10"
						: "border hover:border-primary/40",
				)}
				onClick={onToggle}
				style={showExpanded ? { width: "350px" } : undefined}
			>
				{/* Badges - Only show "For You" recommendation */}
				<div className="absolute top-2 right-2 flex gap-1 z-10">
					{isRecommended && (
						<Badge variant="secondary" className="text-xs">
							Recommended
						</Badge>
					)}
				</div>

				<CardHeader className={cn("pb-3", showExpanded ? "p-4" : "p-4")}>
					<div className="flex items-center gap-3">
						<div
							className={cn(
								"p-2.5 rounded-lg bg-primary/8 transition-transform",
								showExpanded && "scale-110",
							)}
						>
							{module.icon && <module.icon className="w-5 h-5 text-primary" />}
						</div>
						<div className="flex-1 min-w-0">
							<CardTitle
								className={cn(
									showExpanded ? "text-base" : "text-sm leading-tight",
								)}
							>
								{module.name}
							</CardTitle>
							{!showExpanded && (
								<CardDescription className="text-xs mt-1 line-clamp-2">
									{module.description}
								</CardDescription>
							)}
							{showExpanded && (
								<CardDescription className="text-sm mt-1">
									{module.description}
								</CardDescription>
							)}
						</div>
						<div
							className={cn(
								"w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
								isSelected
									? "border-primary bg-primary"
									: "border-muted-foreground/30",
							)}
						>
							{isSelected && (
								<CheckCircle className="w-3 h-3 text-primary-foreground" />
							)}
						</div>
					</div>
				</CardHeader>

				<CardContent
					className={cn(
						"pt-0",
						showExpanded ? "p-4 space-y-3" : "p-4 space-y-2",
					)}
				>
					<div className="flex items-center justify-between">
						<span
							className={cn(
								"font-semibold",
								showExpanded ? "text-base" : "text-base",
							)}
						>
							{module.price === 0 ? "Free" : `$${module.price} per month`}
						</span>
						{!showExpanded && (
							<Button
								variant={isSelected ? "default" : "outline"}
								size="sm"
								className="h-8 px-3 text-xs"
								onClick={(e) => {
									e.stopPropagation();
									onToggle();
								}}
							>
								{isSelected ? "Selected" : "Select"}
							</Button>
						)}
					</div>

					{/* Expanded Content */}
					{showExpanded && (
						<div className="space-y-3 animate-fade-in">
							<div className="space-y-2">
								<h4 className="font-semibold text-sm">Features:</h4>
								<ul className="space-y-1">
									{module.features.map((feature, index) => (
										<li
											key={index}
											className="text-sm text-muted-foreground flex items-start gap-2"
										>
											<Circle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
											<span>{feature}</span>
										</li>
									))}
								</ul>
							</div>

							{/* Feature Showcase */}
							<div className="space-y-2">
								<h4 className="font-semibold text-sm">Preview:</h4>
								<div className="grid grid-cols-2 gap-2">
									{showcaseImages.map((img, idx) => (
										<div
											key={idx}
											className="rounded-md border overflow-hidden bg-muted/30"
										>
											<img
												src={img}
												alt={`${module.name} showcase ${idx + 1}`}
												className="w-full h-24 object-cover"
											/>
										</div>
									))}
								</div>
							</div>

							<Button
								variant={isSelected ? "default" : "outline"}
								className="w-full"
								onClick={(e) => {
									e.stopPropagation();
									onToggle();
								}}
							>
								{isSelected ? "Selected" : "Select module"}
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default ModuleCard;
