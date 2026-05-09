"use client";

export const getInitials = (name: string): string => {
	const parts = name.trim().split(" ");
	if (parts.length >= 2) {
		return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
	}
	return parts[0].substring(0, 2).toUpperCase();
};

export const getAvatarColor = (name: string): string => {
	const colors = [
		"bg-blue-500",
		"bg-purple-500",
		"bg-green-500",
		"bg-orange-500",
		"bg-pink-500",
		"bg-indigo-500",
		"bg-teal-500",
		"bg-red-500",
	];
	const index =
		name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
		colors.length;
	return colors[index];
};
