"use client";
import React from "react";
import { Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import UseTemplateModal from "./UseTemplateModal";

export default function BulkActions({
	onImport,
	onDownload,
	templateId,
	setTemplateId,
	templateDay,
	setTemplateDay,
	templateLocation,
	setTemplateLocation,
}: {
	onImport: () => void;
	onDownload: () => void;
	templateId?: string | undefined;
	setTemplateId: (v?: string) => void;
	templateDay: string;
	setTemplateDay: (v: string) => void;
	templateLocation?: string | undefined;
	setTemplateLocation: (v?: string) => void;
}) {
	return (
		<div className="flex flex-wrap items-center justify-end gap-3">
			<Button
				onClick={onImport}
				variant="outline"
				className="flex items-center gap-2"
			>
				<Upload className="h-4 w-4" />
				Import CSV
			</Button>

			<UseTemplateModal
				templateId={templateId}
				setTemplateId={setTemplateId}
				templateDay={templateDay}
				setTemplateDay={setTemplateDay}
				templateLocation={templateLocation}
				setTemplateLocation={setTemplateLocation}
			/>

			<Button
				onClick={onDownload}
				variant="outline"
				className="flex items-center gap-2"
			>
				<Download className="h-4 w-4" />
				Download Template
			</Button>
		</div>
	);
}
