const ToggleSwitch: React.FC<{
	checked: boolean;
	onChange: (v: boolean) => void;
}> = ({ checked, onChange }) => {
	return (
		<button
			aria-pressed={checked}
			onClick={() => {
				onChange(!checked);
			}}
			className={`w-12 h-6 flex items-center rounded-full p-1 transition-all focus:outline-none ${
				checked
					? "bg-blue-600 justify-end"
					: "bg-gray-300 justify-start dark:bg-gray-600"
			}`}
			title={checked ? "On" : "Off"}
		>
			<div className="w-4 h-4 bg-white rounded-full shadow-sm" />
		</button>
	);
};

export default ToggleSwitch;
