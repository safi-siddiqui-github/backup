"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { cn } from "@/lib/utils";
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
	FileText,
	GripVertical,
	Image as ImageIcon,
	Upload,
	Video,
	X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export type DescriptionBlock = {
	id: string;
	type: "text" | "image" | "video";
	content: string; // HTML for text, URL for image/video
	order: number;
	alt?: string; // For images
	caption?: string; // For images/videos
};

interface EnhancedDescriptionEditorProps {
	blocks?: DescriptionBlock[];
	onChange?: (blocks: DescriptionBlock[]) => void;
	className?: string;
}

function SortableBlock({
	block,
	onUpdate,
	onDelete,
	onUploadImage,
	onUploadVideo,
	onAddBlockAfter,
	canDelete,
}: {
	block: DescriptionBlock;
	onUpdate: (block: DescriptionBlock) => void;
	onDelete: (id: string) => void;
	onUploadImage: (file: File) => Promise<string>;
	onUploadVideo: (file: File) => Promise<string>;
	onAddBlockAfter?: (type: "text" | "image" | "video", afterId: string) => void;
	canDelete?: boolean;
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: block.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	const [isUploading, setIsUploading] = useState(false);

	const handleImageUpload = async (file: File) => {
		setIsUploading(true);
		try {
			const url = await onUploadImage(file);
			onUpdate({ ...block, content: url });
			setIsUploading(false);
			toast.success("Image uploaded successfully");
		} catch (error) {
			setIsUploading(false);
			toast.error("Failed to upload image");
		}
	};

	const handleVideoUpload = async (file: File) => {
		setIsUploading(true);
		try {
			const url = await onUploadVideo(file);
			onUpdate({ ...block, content: url });
			setIsUploading(false);
			toast.success("Video uploaded successfully");
		} catch (error) {
			setIsUploading(false);
			toast.error("Failed to upload video");
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (block.type === "image") {
			if (!file.type.startsWith("image/")) {
				toast.error("Please select an image file");
				return;
			}
			handleImageUpload(file);
		} else if (block.type === "video") {
			if (!file.type.startsWith("video/")) {
				toast.error("Please select a video file");
				return;
			}
			handleVideoUpload(file);
		}
	};

	return (
		<div ref={setNodeRef} style={style} className="group relative">
			<Card className="bg-background border">
				<CardContent className="p-4">
					<div className="flex items-start gap-3">
						{/* Drag Handle */}
						<button
							{...listeners}
							// commented out due to hydration error
							// + aria-describedby="DndDescribedBy-0"
							// - aria-describedby="DndDescribedBy-1"
							// {...attributes}
							className={cn(
								"text-muted-foreground hover:text-foreground mt-1 cursor-grab transition-colors active:cursor-grabbing",
								isDragging && "cursor-grabbing",
							)}
						>
							<GripVertical className="h-5 w-5" />
						</button>

						{/* Block Content */}
						<div className="flex-1">
							{block.type === "text" && (
								<div className="space-y-2">
									<RichTextEditor
										content={block.content || ""}
										onChange={(content) => onUpdate({ ...block, content })}
										placeholder="Enter your text here..."
										className="min-h-[150px]"
										onAddImage={
											onAddBlockAfter
												? () => onAddBlockAfter("image", block.id)
												: undefined
										}
										onAddVideo={
											onAddBlockAfter
												? () => onAddBlockAfter("video", block.id)
												: undefined
										}
										onAddText={
											onAddBlockAfter
												? () => onAddBlockAfter("text", block.id)
												: undefined
										}
									/>
								</div>
							)}

							{block.type === "image" && (
								<div className="space-y-2">
									{block.content ? (
										<div className="group/image relative">
											<img
												src={block.content}
												alt={block.alt || "Event image"}
												className="max-h-[400px] w-full rounded-lg object-cover"
											/>
											<div className="absolute top-2 right-2 flex gap-2 opacity-0 transition-opacity group-hover/image:opacity-100">
												<Label
													htmlFor={`image-replace-${block.id}`}
													className="cursor-pointer"
												>
													<Button
														type="button"
														size="sm"
														variant="secondary"
														asChild
														disabled={isUploading}
													>
														<span>
															{isUploading ? "Uploading..." : "Replace"}
														</span>
													</Button>
												</Label>
												<input
													id={`image-replace-${block.id}`}
													type="file"
													accept="image/*"
													className="hidden"
													onChange={handleFileChange}
													disabled={isUploading}
												/>
												{canDelete !== false && (
													<Button
														type="button"
														size="sm"
														variant="destructive"
														onClick={() => onDelete(block.id)}
													>
														<X className="h-4 w-4" />
													</Button>
												)}
											</div>
										</div>
									) : (
										<div className="rounded-lg border-2 border-dashed p-8 text-center">
											<ImageIcon className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
											<Label
												htmlFor={`image-upload-${block.id}`}
												className="cursor-pointer"
											>
												<Button
													type="button"
													variant="outline"
													disabled={isUploading}
													asChild
												>
													<span>
														{isUploading ? (
															<>
																<Upload className="mr-2 h-4 w-4 animate-spin" />
																Uploading...
															</>
														) : (
															<>
																<Upload className="mr-2 h-4 w-4" />
																Upload Image
															</>
														)}
													</span>
												</Button>
											</Label>
											<input
												id={`image-upload-${block.id}`}
												type="file"
												accept="image/*"
												className="hidden"
												onChange={handleFileChange}
												disabled={isUploading}
											/>
										</div>
									)}
									{block.content && (
										<div className="mt-2 space-y-2">
											<Input
												placeholder="Alt text (optional)"
												value={block.alt || ""}
												onChange={(e) =>
													onUpdate({ ...block, alt: e.target.value })
												}
												className="text-sm"
											/>
											<Input
												placeholder="Caption (optional)"
												value={block.caption || ""}
												onChange={(e) =>
													onUpdate({ ...block, caption: e.target.value })
												}
												className="text-sm"
											/>
										</div>
									)}
								</div>
							)}

							{block.type === "video" && (
								<div className="space-y-2">
									{block.content ? (
										<div className="group/video relative">
											<video
												src={block.content}
												controls
												className="max-h-[400px] w-full rounded-lg"
											/>
											<div className="absolute top-2 right-2 flex gap-2 opacity-0 transition-opacity group-hover/video:opacity-100">
												<Label
													htmlFor={`video-replace-${block.id}`}
													className="cursor-pointer"
												>
													<Button
														type="button"
														size="sm"
														variant="secondary"
														asChild
														disabled={isUploading}
													>
														<span>
															{isUploading ? "Uploading..." : "Replace"}
														</span>
													</Button>
												</Label>
												<input
													id={`video-replace-${block.id}`}
													type="file"
													accept="video/*"
													className="hidden"
													onChange={handleFileChange}
													disabled={isUploading}
												/>
												{canDelete !== false && (
													<Button
														type="button"
														size="sm"
														variant="destructive"
														onClick={() => onDelete(block.id)}
													>
														<X className="h-4 w-4" />
													</Button>
												)}
											</div>
										</div>
									) : (
										<div className="rounded-lg border-2 border-dashed p-8 text-center">
											<Video className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
											<Label
												htmlFor={`video-upload-${block.id}`}
												className="cursor-pointer"
											>
												<Button
													type="button"
													variant="outline"
													disabled={isUploading}
													asChild
												>
													<span>
														{isUploading ? (
															<>
																<Upload className="mr-2 h-4 w-4 animate-spin" />
																Uploading...
															</>
														) : (
															<>
																<Upload className="mr-2 h-4 w-4" />
																Upload Video
															</>
														)}
													</span>
												</Button>
											</Label>
											<input
												id={`video-upload-${block.id}`}
												type="file"
												accept="video/*"
												className="hidden"
												onChange={handleFileChange}
												disabled={isUploading}
											/>
										</div>
									)}
									{block.content && (
										<div className="mt-2">
											<Input
												placeholder="Caption (optional)"
												value={block.caption || ""}
												onChange={(e) =>
													onUpdate({ ...block, caption: e.target.value })
												}
												className="text-sm"
											/>
										</div>
									)}
								</div>
							)}

							{/* Delete Button - Only show if block can be deleted */}
							{canDelete !== false && (
								<div className="mt-2 flex justify-end">
									<Button
										type="button"
										size="sm"
										variant="ghost"
										onClick={() => onDelete(block.id)}
										className="text-destructive hover:text-destructive"
									>
										<X className="mr-1 h-4 w-4" />
										Remove
									</Button>
								</div>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export function EnhancedDescriptionEditor({
	blocks = [],
	onChange,
	className,
}: EnhancedDescriptionEditorProps) {
	// Initialize with a default text block if blocks is empty
	const getInitialBlocks = () => {
		if (blocks && blocks.length > 0) {
			return blocks;
		}
		return [
			{
				id: Math.random().toString(36).substr(2, 9),
				type: "text" as const,
				content: "",
				order: 0,
			},
		];
	};

	const [items, setItems] = useState<DescriptionBlock[]>(() =>
		getInitialBlocks(),
	);
	const [activeId, setActiveId] = useState<string | null>(null);
	const isInternalUpdate = useRef(false);
	const onChangeRef = useRef(onChange);
	const prevBlocksRef = useRef<string>(JSON.stringify(blocks || []));
	const isInitialized = useRef(false);

	// Keep onChange ref updated
	useEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	// Initialize on mount
	useEffect(() => {
		if (!isInitialized.current) {
			const initialBlocks = getInitialBlocks();
			prevBlocksRef.current = JSON.stringify(initialBlocks);
			isInitialized.current = true;
		}
	}, []);

	// Sync items state when blocks prop changes from parent (only if not from internal update)
	useEffect(() => {
		if (isInternalUpdate.current) {
			isInternalUpdate.current = false;
			return;
		}

		const blocksStr = JSON.stringify(blocks || []);
		// Only update if blocks actually changed from parent
		if (blocksStr !== prevBlocksRef.current) {
			prevBlocksRef.current = blocksStr;
			// If blocks is empty, create default text block; otherwise use blocks
			if (!blocks || blocks.length === 0) {
				const defaultBlock: DescriptionBlock = {
					id: Math.random().toString(36).substr(2, 9),
					type: "text",
					content: "",
					order: 0,
				};
				setItems([defaultBlock]);
			} else {
				setItems([...blocks]);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [blocks]);

	// Call onChange when items change internally
	const handleItemsChange = (newItems: DescriptionBlock[]) => {
		isInternalUpdate.current = true;
		prevBlocksRef.current = JSON.stringify(newItems);
		setItems(newItems);
		if (onChangeRef.current) {
			onChangeRef.current(newItems);
		}
	};

	const handleDragStart = (event: DragStartEvent) => {
		setActiveId(event.active.id as string);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = items.findIndex((item) => item.id === active.id);
			const newIndex = items.findIndex((item) => item.id === over.id);

			const newItems = arrayMove(items, oldIndex, newIndex);
			// Update order property
			const reorderedItems = newItems.map((item, index) => ({
				...item,
				order: index,
			}));
			handleItemsChange(reorderedItems);
		}

		setActiveId(null);
	};

	const handleAddBlock = (
		type: "text" | "image" | "video",
		afterId?: string,
	) => {
		const newBlock: DescriptionBlock = {
			id: Math.random().toString(36).substr(2, 9),
			type,
			content: "",
			order: items.length,
		};

		if (afterId) {
			// Insert after the specified block
			const afterIndex = items.findIndex((item) => item.id === afterId);
			if (afterIndex >= 0) {
				const newItems = [...items];
				newItems.splice(afterIndex + 1, 0, newBlock);
				// Reorder all items
				const reorderedItems = newItems.map((item, index) => ({
					...item,
					order: index,
				}));
				handleItemsChange(reorderedItems);
			} else {
				handleItemsChange([...items, newBlock]);
			}
		} else {
			handleItemsChange([...items, newBlock]);
		}
	};

	const handleAddBlockAfter = (
		type: "text" | "image" | "video",
		afterId: string,
	) => {
		handleAddBlock(type, afterId);
	};

	const handleUpdateBlock = (updatedBlock: DescriptionBlock) => {
		const updatedItems = items.map((block) =>
			block.id === updatedBlock.id ? updatedBlock : block,
		);
		handleItemsChange(updatedItems);
	};

	const handleDeleteBlock = (id: string) => {
		// Check if this is the last text block - if so, prevent deletion
		const textBlocks = items.filter((block) => block.type === "text");
		const blockToDelete = items.find((block) => block.id === id);

		if (blockToDelete?.type === "text" && textBlocks.length <= 1) {
			toast.error("At least one text block is required");
			return;
		}

		const filtered = items.filter((block) => block.id !== id);
		// Reorder remaining blocks
		const reorderedItems = filtered.map((block, index) => ({
			...block,
			order: index,
		}));
		handleItemsChange(reorderedItems);
	};

	// Check if a block can be deleted (text blocks need at least one remaining)
	const canDeleteBlock = (blockId: string): boolean => {
		const block = items.find((b) => b.id === blockId);
		if (block?.type === "text") {
			const textBlocks = items.filter((b) => b.type === "text");
			return textBlocks.length > 1;
		}
		return true;
	};

	const uploadToS3 = async (
		file: File,
		type: "image" | "video",
	): Promise<string> => {
		try {
			// Get presigned upload URL
			const uploadResponse = await fetch("/api/s3/upload", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					filename: file.name,
					contentType: file.type,
				}),
			});

			const uploadResult = await uploadResponse.json();

			if (!uploadResult.success || !uploadResult.data) {
				throw new Error(uploadResult.error || "Failed to get upload URL");
			}

			// Upload file to S3
			const uploadToS3Response = await fetch(uploadResult.data.presignedUrl, {
				method: "PUT",
				body: file,
				headers: {
					"Content-Type": file.type,
				},
			});

			if (!uploadToS3Response.ok) {
				throw new Error("Failed to upload file to S3");
			}

			// Get download URL
			const downloadResponse = await fetch("/api/s3/download", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					key: uploadResult.data.key,
				}),
			});

			const downloadResult = await downloadResponse.json();

			if (!downloadResult.success || !downloadResult.data) {
				throw new Error(downloadResult.error || "Failed to get download URL");
			}

			return downloadResult.data.presignedUrl;
		} catch (error) {
			console.error("Upload error:", error);
			throw error;
		}
	};

	const handleUploadImage = async (file: File): Promise<string> => {
		return uploadToS3(file, "image");
	};

	const handleUploadVideo = async (file: File): Promise<string> => {
		return uploadToS3(file, "video");
	};

	const activeBlock = activeId
		? items.find((item) => item.id === activeId)
		: null;

	return (
		<div className={cn("space-y-4", className)}>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<div className="space-y-4">
					<SortableContext
						items={items.map((item) => item.id)}
						strategy={verticalListSortingStrategy}
					>
						{items.map((block) => (
							<SortableBlock
								key={block.id}
								block={block}
								onUpdate={handleUpdateBlock}
								onDelete={handleDeleteBlock}
								onUploadImage={handleUploadImage}
								onUploadVideo={handleUploadVideo}
								onAddBlockAfter={handleAddBlockAfter}
								canDelete={canDeleteBlock(block.id)}
							/>
						))}
					</SortableContext>
				</div>

				<DragOverlay>
					{activeBlock ? (
						<Card className="bg-background border opacity-90">
							<CardContent className="p-4">
								<div className="flex items-center gap-3">
									<GripVertical className="text-muted-foreground h-5 w-5" />
									<div className="flex-1">
										{activeBlock.type === "text" && (
											<FileText className="text-muted-foreground h-8 w-8" />
										)}
										{activeBlock.type === "image" && (
											<ImageIcon className="text-muted-foreground h-8 w-8" />
										)}
										{activeBlock.type === "video" && (
											<Video className="text-muted-foreground h-8 w-8" />
										)}
									</div>
								</div>
							</CardContent>
						</Card>
					) : null}
				</DragOverlay>
			</DndContext>
		</div>
	);
}
