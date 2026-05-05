import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Check, Edit, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface InlineEditableFieldProps {
	value: string;
	onSave: (newValue: string) => void;
	type?: "text" | "textarea";
	className?: string;
	placeholder?: string;
	displayClassName?: string;
	editClassName?: string;
	showEditIcon?: boolean;
	multiline?: boolean;
}

export const InlineEditableField = ({
	value,
	onSave,
	type = "text",
	className = "",
	placeholder = "Click to edit",
	displayClassName = "",
	editClassName = "",
	showEditIcon = true,
	multiline = false,
}: InlineEditableFieldProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(value);
	const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
			// Select all text for easy editing
			if (inputRef.current instanceof HTMLInputElement) {
				inputRef.current.select();
			} else {
				inputRef.current.setSelectionRange(0, editValue.length);
			}
		}
	}, [isEditing]);

	useEffect(() => {
		setEditValue(value);
	}, [value]);

	const handleSave = () => {
		if (editValue.trim() !== value) {
			onSave(editValue.trim());
		}
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditValue(value);
		setIsEditing(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			handleCancel();
		} else if (e.key === "Enter" && !e.shiftKey && type === "text") {
			e.preventDefault();
			handleSave();
		} else if (e.key === "Enter" && e.metaKey && type === "textarea") {
			e.preventDefault();
			handleSave();
		}
	};

	if (isEditing) {
		return (
			<div className={cn("flex items-start gap-2", className)}>
				{type === "textarea" || multiline ? (
					<Textarea
						ref={inputRef as React.RefObject<HTMLTextAreaElement>}
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
						onKeyDown={handleKeyDown}
						className={cn("flex-1", editClassName)}
						placeholder={placeholder}
						rows={multiline ? 4 : 2}
					/>
				) : (
					<Input
						ref={inputRef as React.RefObject<HTMLInputElement>}
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
						onKeyDown={handleKeyDown}
						className={cn("flex-1", editClassName)}
						placeholder={placeholder}
					/>
				)}
				<div className="mt-1 flex gap-1">
					<Button
						size="sm"
						variant="default"
						onClick={handleSave}
						className="h-8 w-8 p-0"
					>
						<Check className="h-4 w-4" />
					</Button>
					<Button
						size="sm"
						variant="outline"
						onClick={handleCancel}
						className="h-8 w-8 p-0"
					>
						<X className="h-4 w-4" />
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div
			onClick={() => setIsEditing(true)}
			className={cn(
				"group relative cursor-pointer rounded-md transition-all",
				"hover:bg-accent/5 hover:ring-primary/20 hover:ring-1",
				!value && "text-muted-foreground italic",
				className,
			)}
		>
			<div className={cn("pr-8", displayClassName)}>{value || placeholder}</div>
			{showEditIcon && (
				<Edit className="text-muted-foreground absolute top-1/2 right-2 h-3.5 w-3.5 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100" />
			)}
		</div>
	);
};
