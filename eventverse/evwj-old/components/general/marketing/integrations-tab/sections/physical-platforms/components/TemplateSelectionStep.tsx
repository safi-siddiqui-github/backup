"use client";

import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import InfoBanner from "../../../common/InfoBanner";
import { MAIL_TEMPLATES } from "../types";

interface TemplateSelectionStepProps {
	selectedTemplate: string;
	onTemplateChange: (templateId: string) => void;
}

export default function TemplateSelectionStep({
	selectedTemplate,
	onTemplateChange,
}: TemplateSelectionStepProps) {
	return (
		<div className="space-y-4">
			<InfoBanner>
				Choose a default template for your physical mailings.
			</InfoBanner>

			<div className="grid grid-cols-3 gap-4">
				{MAIL_TEMPLATES.map((template) => {
					const isSelected = selectedTemplate === template.id;
					return (
						<button
							key={template.id}
							type="button"
							onClick={() => onTemplateChange(template.id)}
							className={cn(
								"p-4 border-2 rounded-lg transition-all hover:border-blue-500",
								isSelected
									? "border-blue-600 bg-blue-50"
									: "border-gray-200 bg-white",
							)}
						>
							<div className="flex flex-col items-center gap-3">
								<div
									className={cn(
										"w-12 h-12 rounded-lg flex items-center justify-center",
										isSelected ? "bg-blue-600" : "bg-gray-100",
									)}
								>
									<Mail
										className={cn(
											"h-6 w-6",
											isSelected ? "text-white" : "text-gray-600",
										)}
									/>
								</div>
								<span
									className={cn(
										"text-sm font-medium",
										isSelected ? "text-blue-600" : "text-gray-700",
									)}
								>
									{template.name}
								</span>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
