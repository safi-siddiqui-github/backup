"use client";

import React, { createContext, useContext, useState } from "react";

export type SavedKind =
	| "hotel"
	| "flight"
	| "car"
	| "activity"
	| "dining"
	| "ride";

export type SavedItem = {
	id: string;
	kind: SavedKind;
	title: string;
	payload?: unknown;
	createdAt: number;
};

type SavedContextValue = {
	items: SavedItem[];
	add: (item: Omit<SavedItem, "createdAt">) => void;
	remove: (id: string, kind: SavedKind) => void;
	clear: () => void;
	byKind: (kind: SavedKind) => SavedItem[];
};

const SavedContext = createContext<SavedContextValue | null>(null);

export const SavedProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [items, setItems] = useState<SavedItem[]>([]);

	const add = (item: Omit<SavedItem, "createdAt">) => {
		setItems((prev) => {
			// avoid duplicates by id+kind
			if (prev.some((p) => p.id === item.id && p.kind === item.kind))
				return prev;
			return [{ ...item, createdAt: Date.now() }, ...prev];
		});
	};

	const remove = (id: string, kind: SavedKind) => {
		setItems((prev) => prev.filter((p) => !(p.id === id && p.kind === kind)));
	};

	const clear = () => setItems([]);

	const byKind = (kind: SavedKind) => items.filter((i) => i.kind === kind);

	return (
		<SavedContext.Provider value={{ items, add, remove, clear, byKind }}>
			{children}
		</SavedContext.Provider>
	);
};

export function useSaved() {
	const ctx = useContext(SavedContext);
	if (!ctx) throw new Error("useSaved must be used within SavedProvider");
	return ctx;
}

export default SavedContext;
