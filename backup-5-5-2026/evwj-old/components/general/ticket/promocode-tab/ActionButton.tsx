type Props = {
	variant: "primary" | "secondary" | "destructive";
	onClick?: () => void;
	children: React.ReactNode;
	disabled?: boolean;
};

export default function ActionButton({
	variant,
	onClick,
	children,
	disabled,
}: Props) {
	const base =
		"inline-flex items-center gap-2 text-sm font-medium rounded-md px-3 py-1.5";
	let classes = base;
	if (variant === "primary")
		classes +=
			" bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300";
	else if (variant === "destructive")
		classes += " bg-red-600 text-white hover:bg-red-700";
	else
		classes +=
			" !bg-white dark:!bg-slate-700/50 text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-slate-600 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-600 [background-color:white] dark:[background-color:rgb(51_65_85/0.5)]";
	if (disabled) classes += " opacity-50 cursor-not-allowed";
	return (
		<button className={classes} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
}
