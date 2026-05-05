"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";

interface Template {
	id: string;
	title: string;
	description: string;
	difficulty?: "Easy" | "Medium" | "Hard";
	numQuestions?: number;
	pieces?: number;
	image?: string;
	[key: string]: any;
}

interface ImportTemplateDialogProps {
	open: boolean;
	onClose: () => void;
	onImport: (template: Template) => void;
	templates: Template[];
	gameType: string;
}

function difficultyColor(level?: "Easy" | "Medium" | "Hard") {
	if (!level) return "";
	switch (level) {
		case "Easy":
			return "bg-green-200 text-green-800 dark:bg-green-900/30 dark:text-green-400";
		case "Medium":
			return "bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-400";
		case "Hard":
			return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
	}
}

export default function ImportTemplateDialog({
	open,
	onClose,
	onImport,
	templates,
	gameType,
}: ImportTemplateDialogProps) {
	const [search, setSearch] = useState("");

	const filteredTemplates = useMemo(() => {
		if (!search.trim()) return templates;
		return templates.filter(
			(t) =>
				t.title.toLowerCase().includes(search.trim().toLowerCase()) ||
				t.description.toLowerCase().includes(search.trim().toLowerCase()),
		);
	}, [search, templates]);

	const handleImport = (template: Template) => {
		onImport(template);
		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
			<DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold">
						Import from Template
					</DialogTitle>
					<DialogDescription>
						Choose a template to import questions, rounds, or configurations
						into your game.
					</DialogDescription>
				</DialogHeader>

				{/* Search */}
				<div className="relative mb-4">
					<Search className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
					<Input
						placeholder="Search templates..."
						className="w-full border border-gray-200 py-2 pl-10 text-base shadow focus:ring-2 focus:ring-indigo-300"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				{/* Templates Grid */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{filteredTemplates.length === 0 ? (
						<div className="col-span-full py-8 text-center text-gray-500">
							No templates found.
						</div>
					) : (
						filteredTemplates.map((template) => (
							<Card
								key={template.id}
								className="flex flex-col border-2 border-transparent p-4 transition hover:border-indigo-200 hover:shadow-lg"
							>
								{template.image && (
									<img
										src={template.image}
										alt={template.title}
										className="mb-3 h-32 w-full rounded-lg object-cover"
									/>
								)}
								<div className="mb-2 flex items-start justify-between">
									<h3 className="text-lg font-bold">{template.title}</h3>
									{template.difficulty && (
										<Badge className={difficultyColor(template.difficulty)}>
											{template.difficulty}
										</Badge>
									)}
								</div>
								<p className="mb-3 flex-1 text-sm text-gray-600 dark:text-slate-400">
									{template.description}
								</p>
								<div className="mb-3 flex flex-wrap gap-2">
									{template.numQuestions && (
										<Badge variant="outline" className="text-xs">
											{template.numQuestions} questions
										</Badge>
									)}
									{template.pieces && (
										<Badge variant="outline" className="text-xs">
											{template.pieces} pieces
										</Badge>
									)}
								</div>
								<Button
									onClick={() => handleImport(template)}
									className="w-full"
									size="sm"
								>
									Import
								</Button>
							</Card>
						))
					)}
				</div>

				<div className="mt-4 flex justify-end">
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
