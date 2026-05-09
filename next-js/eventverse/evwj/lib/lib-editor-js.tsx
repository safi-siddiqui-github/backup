"use client";

import WebButtonComponent from "@/app/(web)/_private/WebButtonComponent";
import { Button } from "@/shadcn/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "@tiptap/extension-image";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Placeholder } from "@tiptap/extensions";
import type { Editor, UseEditorOptions } from "@tiptap/react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImagePlusIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  PlusIcon,
  QuoteIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { RHFComponent } from "./lib-react-hook-form";

type TiptapEditorProps = {
  value?: string; // JSON string from RHF
  onChange?: (data: unknown) => void;
  placeholder?: string;
  options?: UseEditorOptions;
};

type EditorShareProps = {
  editor: Editor;
};

export default function TiptapEditorComponent({
  value,
  onChange,
  options,
  placeholder = "Place your text here ...",
}: TiptapEditorProps) {
  const EMPTY_DOC = useMemo(() => ({ type: "doc", content: [] }), []);

  const extensions = useMemo(
    () => [
      StarterKit,
      TextStyleKit,

      Image.configure({
        allowBase64: true,
        resize: {
          enabled: true,
          alwaysPreserveAspectRatio: true,
        },
      }),

      Placeholder.configure({
        placeholder: placeholder,
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-gray-400 before:pointer-events-none before:h-0 before:float-left",
      }),
    ],
    [placeholder],
  );

  // Parse RHF value safely
  const parsedContent = useMemo(() => {
    try {
      return value ? JSON.parse(value) : EMPTY_DOC;
    } catch {
      return EMPTY_DOC;
    }
  }, [EMPTY_DOC, value]);

  const editor = useEditor({
    ...options,
    immediatelyRender: false,
    extensions,
    content: parsedContent,
    onUpdate({ editor }) {
      // Send JSON object OR stringify here if needed
      onChange?.(editor.getJSON());
      // OR → onChange?.(JSON.stringify(editor.getJSON()));
    },
  });

  // 🔑 Sync editor when RHF value changes
  useEffect(() => {
    if (!editor) return;

    const current = editor.getJSON();
    const incoming = parsedContent;

    if (JSON.stringify(current) !== JSON.stringify(incoming)) {
      editor.commands.setContent(incoming);
    }
  }, [editor, parsedContent]);

  if (!editor) return null;

  return (
    <div className="flex flex-col *:nth-2:*:*:data-[node=image]:*:*:data-resize-handle:size-2 *:nth-2:*:*:data-[node=image]:*:*:data-resize-handle:bg-black *:nth-2:*:*:data-[node=image]:*:*:data-[resize-handle='bottom-left']:cursor-nesw-resize *:nth-2:*:*:data-[node=image]:*:*:data-[resize-handle='bottom-right']:cursor-nwse-resize *:nth-2:*:*:data-[node=image]:*:*:data-[resize-handle='top-left']:cursor-nwse-resize *:nth-2:*:*:data-[node=image]:*:*:data-[resize-handle='top-right']:cursor-nesw-resize *:nth-2:*:*:[blockquote]:italic *:nth-2:*:*:[blockquote]:*:before:content-['“'] *:nth-2:*:*:[blockquote]:*:after:content-['”'] *:nth-2:*:*:[h1]:text-3xl *:nth-2:*:*:[h1]:font-semibold *:nth-2:*:*:[h2]:text-2xl *:nth-2:*:*:[h2]:font-medium *:nth-2:*:*:[h3]:text-xl *:nth-2:*:*:[h3]:font-medium *:nth-2:*:*:[img]:resize *:nth-2:*:*:[ol]:*:*:inline-block *:nth-2:*:*:[ol]:*:list-inside *:nth-2:*:*:[ol]:*:list-decimal *:nth-2:*:*:[ol]:*:indent-2 *:nth-2:*:*:[ul]:*:*:inline *:nth-2:*:*:[ul]:*:list-inside *:nth-2:*:*:[ul]:*:list-disc *:nth-2:*:*:[ul]:*:indent-2">
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}

function MenuBar({ editor }: EditorShareProps) {
  const editorState = useEditorState({
    editor,

    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,

        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canBlockquote:
          ctx.editor.can().chain().toggleBlockquote().run() ?? false,

        // isParagraph: ctx.editor.isActive("paragraph") ?? false,
        // canParagraph:
        //   ctx.editor.can().chain().setParagraph().run() ?? false,

        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        canHeading1:
          ctx.editor.can().chain().toggleHeading({ level: 1 }).run() ?? false,

        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        canHeading2:
          ctx.editor.can().chain().toggleHeading({ level: 2 }).run() ?? false,

        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        canHeading3:
          ctx.editor.can().chain().toggleHeading({ level: 3 }).run() ?? false,

        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        canBulletList:
          ctx.editor.can().chain().toggleBulletList().run() ?? false,

        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        canOrderedList:
          ctx.editor.can().chain().toggleOrderedList().run() ?? false,
      };
    },
  });

  if (!editorState) return null;

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap gap-2 py-4">
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          variant={editorState.isBold ? "default" : "outline"}
        >
          <BoldIcon />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          variant={editorState.isItalic ? "default" : "outline"}
        >
          <ItalicIcon />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editorState.canUnderline}
          variant={editorState.isUnderline ? "default" : "outline"}
        >
          <UnderlineIcon />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          variant={editorState.isStrike ? "default" : "outline"}
        >
          <StrikethroughIcon />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={!editorState.canBlockquote}
          variant={editorState.isBlockquote ? "default" : "outline"}
        >
          <QuoteIcon />
        </Button>
        <Button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          disabled={!editorState.canHeading1}
          variant={editorState.isHeading1 ? "default" : "outline"}
        >
          <Heading1Icon />
        </Button>
        <Button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={!editorState.canHeading2}
          variant={editorState.isHeading2 ? "default" : "outline"}
        >
          <Heading2Icon />
        </Button>
        <Button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={!editorState.canHeading3}
          variant={editorState.isHeading3 ? "default" : "outline"}
        >
          <Heading3Icon />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={!editorState.canBulletList}
          variant={editorState.isBulletList ? "default" : "outline"}
        >
          <ListIcon />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={!editorState.canOrderedList}
          variant={editorState.isOrderedList ? "default" : "outline"}
        >
          <ListOrderedIcon />
        </Button>

        <ImageComponent editor={editor} />
      </div>
    </div>
  );
}

function ImageComponent({ editor }: EditorShareProps) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        canAddImage:
          ctx.editor.can().chain().toggleOrderedList().run() ?? false,
      };
    },
  });

  type formSchemaInfer = z.infer<typeof formSchema>;
  const formSchema = z.object({
    url: z.url(),
  });
  const [DialogOpen, setDialogOpen] = useState(false);
  const imageUrlForm = useForm({
    defaultValues: {
      url: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = imageUrlForm.handleSubmit((data: formSchemaInfer) => {
    const { url } = data;
    editor.chain().focus().setImage({ src: url }).run();

    setDialogOpen(false);
  });

  return (
    <div className="flex flex-col">
      <Button
        type="button"
        disabled={!editorState.canAddImage}
        onClick={() => setDialogOpen(true)}
        variant={"outline"}
      >
        <ImagePlusIcon />
      </Button>

      <Dialog
        open={DialogOpen}
        onOpenChange={setDialogOpen}
      >
        <FormProvider {...imageUrlForm}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Image</DialogTitle>
              <DialogDescription>
                Enter the URL of the image you want to add.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col">
              <Tabs>
                <TabsList
                  defaultValue="url"
                  className="w-full"
                >
                  <TabsTrigger value="url">Add URL</TabsTrigger>
                  <TabsTrigger value="upload">Upload Image</TabsTrigger>
                </TabsList>
                <TabsContent value="url">
                  <RHFComponent
                    form={imageUrlForm}
                    name="url"
                    label="Image Url"
                    fieldType="input"
                    inputProps={{
                      placeholder: "Enter url",
                    }}
                  />
                </TabsContent>
                <TabsContent value="upload">Upload</TabsContent>
              </Tabs>
            </div>

            <DialogFooter className="justify-between sm:justify-between">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                >
                  Close
                </Button>
              </DialogClose>

              <WebButtonComponent onClick={onSubmit}>
                <PlusIcon />
                <span>Add Image</span>
              </WebButtonComponent>
              {/* <Button>Add</Button> */}
            </DialogFooter>
          </DialogContent>
        </FormProvider>
      </Dialog>
    </div>
  );
}
