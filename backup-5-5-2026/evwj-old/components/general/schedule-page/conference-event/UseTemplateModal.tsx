"use client";
import React from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Settings2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
	templateId?: string | undefined;
	setTemplateId: (v?: string) => void;
	templateDay: string;
	setTemplateDay: (v: string) => void;
	templateLocation?: string | undefined;
	setTemplateLocation: (v?: string) => void;
};

export default function UseTemplateModal({
	templateId,
	setTemplateId,
	templateDay,
	setTemplateDay,
	templateLocation,
	setTemplateLocation,
}: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<button className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
					<Settings2 className="h-4 w-4" />
					Use Template
				</button>
			</DialogTrigger>

			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Apply Session Template</DialogTitle>
					<DialogDescription>
						Select a template and where to apply it.
					</DialogDescription>
				</DialogHeader>

				<div className="mt-4 space-y-4">
					<div>
						<label className="text-sm font-medium text-gray-700 dark:text-gray-200">
							Template
						</label>
						<Select value={templateId} onValueChange={(v) => setTemplateId(v)}>
							<SelectTrigger className="mt-2 w-full">
								<SelectValue placeholder="Select template" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="template-1">Workshop Template A</SelectItem>
								<SelectItem value="template-2">
									Conference Template B
								</SelectItem>
								<SelectItem value="template-3">Networking Template</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<label className="text-sm font-medium text-gray-700 dark:text-gray-200">
							Event Date
						</label>
						<Select
							value={templateDay}
							onValueChange={(v) => setTemplateDay(String(v))}
						>
							<SelectTrigger className="mt-2 w-full">
								<SelectValue placeholder="Select day" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Day 1">Day 1</SelectItem>
								<SelectItem value="Day 2">Day 2</SelectItem>
								<SelectItem value="Day 3">Day 3</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<label className="text-sm font-medium text-gray-700 dark:text-gray-200">
							Location
						</label>
						<Select
							value={templateLocation}
							onValueChange={(v) => setTemplateLocation(v)}
						>
							<SelectTrigger className="mt-2 w-full">
								<SelectValue placeholder="Select location" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Main Hall">Main Hall</SelectItem>
								<SelectItem value="Room A">Room A</SelectItem>
								<SelectItem value="Room B">Room B</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<button className="btn btn-ghost">Cancel</button>
					</DialogClose>
					<DialogClose asChild>
						<button
							className="btn btn-primary"
							onClick={() => {
								toast.success("Template applied");
							}}
						>
							Apply Template
						</button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
