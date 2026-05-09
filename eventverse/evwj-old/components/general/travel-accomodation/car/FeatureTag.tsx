"use client";

import React from "react";

export default function FeatureTag({ text }: { text: string }) {
	return (
		<span className="text-sm text-gray-700 dark:text-gray-300">{text}</span>
	);
}
