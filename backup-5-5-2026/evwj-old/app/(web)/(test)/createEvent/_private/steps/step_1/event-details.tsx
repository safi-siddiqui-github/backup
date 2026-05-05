import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
    Building2,
    Calendar,
    ChevronDown,
    Globe,
    Info,
    Lock,
    MapPin,
    User,
    Users,
} from "lucide-react";
import { EventFormData } from "../../types/types";
import { OpenSections } from "./step_1";
import LibLexicalEditor from "../../lib/lexical/lib-lexical-editor";
import { EnhancedDescriptionEditor } from "@/components/preview/create-event/EnhancedDescriptionEditor";
import CustomEditor from "./editor";
 

import { useForm, UseFormReturn } from "react-hook-form";

export default function EssentialDetails({
	formData, onUpdate,
	openSections,
	setOpenSections,
}: {
	formData: EventFormData;
	onUpdate: (updates: Partial<EventFormData>) => void;
	openSections: OpenSections;
	setOpenSections: (sections: OpenSections) => void;
}) {
	// Initialize the form using react-hook-form
	const form = useForm<EventFormData>({ defaultValues: formData });

	return <>
	<Collapsible
				open={openSections.description}
				onOpenChange={(open) =>
					setOpenSections({
						basicInfo: false,
						description: open,
						dateTime: false,
						location: false,
					})
				}
			>
				<Card className="border bg-white backdrop-blur-sm dark:bg-slate-800/95">
					<CollapsibleTrigger className="w-full">
						<CardHeader className="hover:bg-muted/50 cursor-pointer transition-colors dark:hover:bg-slate-700/50">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="bg-primary/8 rounded-lg p-2">
										<User className="text-primary h-4 w-4" />
									</div>
									<div className="text-left">
										<CardTitle className="text-base font-semibold">
											Description
										</CardTitle>
										{!openSections.basicInfo && formData.eventName && (
											<p className="text-muted-foreground text-xs">
												{formData.eventName}
											</p>
										)}
									</div>
								</div>
								<ChevronDown
									className={cn(
										"h-4 w-4 transition-transform",
										openSections.basicInfo && "rotate-180",
									)}
								/>
							</div>
						</CardHeader>
					</CollapsibleTrigger>

					<CollapsibleContent>
						<CardContent className="space-y-4 pt-0">

							{/* Description */}
							<div className="space-y-4 flex flex-col gap-4">
								<Label htmlFor="description">Description</Label>
								  {/* <EnhancedDescriptionEditor
									blocks={formData.descriptionBlocks || []}
									onChange={(blocks) => onUpdate({ descriptionBlocks: blocks })}
									className="bg-white backdrop-blur-sm dark:bg-slate-800/95"
								/>   */}

                                {/* <LibLexicalEditor /> */}
								<CustomEditor form={form} name="description" />
								 
							</div>

						</CardContent>
					</CollapsibleContent>
				</Card>
			</Collapsible>
			 </>
}