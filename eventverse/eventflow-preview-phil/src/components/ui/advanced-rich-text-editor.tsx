import React, { useImperativeHandle, forwardRef, useEffect, useRef } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { FontFamily } from '@tiptap/extension-font-family';
import { TextAlign } from '@tiptap/extension-text-align';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  AlignLeft,
  AlignCenter,
  AlignRight,
  List, 
  ListOrdered,
  Link,
  Sparkles,
  Image,
  Video,
  Undo,
  Redo
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdvancedRichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  minHeight?: string;
  className?: string;
  showAISuggestions?: boolean;
}

export interface AdvancedRichTextEditorRef {
  getHTML: () => string;
  getText: () => string;
  setContent: (content: string) => void;
  focus: () => void;
}

const AdvancedRichTextEditor = forwardRef<AdvancedRichTextEditorRef, AdvancedRichTextEditorProps>(({
  content = "",
  onChange,
  placeholder = "Write something amazing...",
  minHeight = "200px",
  className,
  showAISuggestions = true
}, ref) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Remove underline from StarterKit to avoid conflicts
        underline: false,
      }),
      Underline,
      TextStyle,
      Color,
      FontFamily,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm max-w-none focus:outline-none',
          `min-h-[${minHeight}]`,
          'px-4 py-3',
          '[&_.ProseMirror]:whitespace-pre-wrap'
        ),
      },
    },
  });


  useImperativeHandle(ref, () => ({
    getHTML: () => editor?.getHTML() || '',
    getText: () => editor?.getText() || '',
    setContent: (content: string) => {
      editor?.commands.setContent(content);
    },
    focus: () => editor?.commands.focus()
  }));

  const ToolbarButton = ({ 
    children, 
    onClick, 
    title, 
    isActive = false,
    disabled = false
  }: { 
    children: React.ReactNode; 
    onClick: () => void; 
    title: string;
    isActive?: boolean;
    disabled?: boolean;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={cn(
        "h-8 w-8 p-0 hover:bg-muted/60",
        isActive 
          ? "bg-muted text-foreground" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </Button>
  );

  if (!editor) {
    return (
      <div className={cn("border border-input rounded-lg overflow-hidden bg-background animate-pulse", className)}>
        <div className="border-b bg-muted/30 px-3 py-2 h-12" />
        <div className={cn("p-4", `min-h-[${minHeight}]`)} />
      </div>
    );
  }

  return (
    <div className={cn("border border-input rounded-lg overflow-hidden bg-background", className)}>
      {/* Advanced Toolbar */}
      <div className="border-b bg-muted/30 px-3 py-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Text Style Selector */}
          <Select
            value={editor.isActive('heading', { level: 1 }) ? 'heading1' : 
                   editor.isActive('heading', { level: 2 }) ? 'heading2' : 
                   editor.isActive('heading', { level: 3 }) ? 'heading3' : 'normal'}
            onValueChange={(value) => {
              if (value === 'normal') {
                editor.chain().focus().setParagraph().run();
              } else if (value === 'heading1') {
                editor.chain().focus().toggleHeading({ level: 1 }).run();
              } else if (value === 'heading2') {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
              } else if (value === 'heading3') {
                editor.chain().focus().toggleHeading({ level: 3 }).run();
              }
            }}
          >
            <SelectTrigger className="w-28 h-8 text-sm border-0 bg-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="heading1">Heading 1</SelectItem>
              <SelectItem value="heading2">Heading 2</SelectItem>
              <SelectItem value="heading3">Heading 3</SelectItem>
            </SelectContent>
          </Select>
          
          <Separator orientation="vertical" className="h-5" />
          
          {/* Basic Formatting */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              title="Bold (Ctrl+B)"
              isActive={editor.isActive('bold')}
            >
              <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              title="Italic (Ctrl+I)"
              isActive={editor.isActive('italic')}
            >
              <Italic className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              title="Underline (Ctrl+U)"
              isActive={editor.isActive('underline')}
            >
              <UnderlineIcon className="h-4 w-4" />
            </ToolbarButton>
          </div>
          
          <Separator orientation="vertical" className="h-5" />
          
          {/* Alignment */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              title="Align Left"
              isActive={editor.isActive({ textAlign: 'left' })}
            >
              <AlignLeft className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              title="Align Center"
              isActive={editor.isActive({ textAlign: 'center' })}
            >
              <AlignCenter className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              title="Align Right"
              isActive={editor.isActive({ textAlign: 'right' })}
            >
              <AlignRight className="h-4 w-4" />
            </ToolbarButton>
          </div>
          
          <Separator orientation="vertical" className="h-5" />
          
          {/* Lists */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              title="Bullet List"
              isActive={editor.isActive('bulletList')}
            >
              <List className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              title="Numbered List"
              isActive={editor.isActive('orderedList')}
            >
              <ListOrdered className="h-4 w-4" />
            </ToolbarButton>
          </div>
          
          <Separator orientation="vertical" className="h-5" />
          
          {/* Undo/Redo */}
          <div className="flex items-center gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              title="Undo (Ctrl+Z)"
              disabled={!editor.can().undo()}
            >
              <Undo className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              title="Redo (Ctrl+Y)"
              disabled={!editor.can().redo()}
            >
              <Redo className="h-4 w-4" />
            </ToolbarButton>
          </div>
          
          {showAISuggestions && (
            <>
              <Separator orientation="vertical" className="h-5 ml-2" />
              
              {/* AI Suggestions */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-200 hover:from-purple-500/20 hover:to-blue-500/20"
                onClick={() => {
                  // TODO: Implement AI suggestion functionality
                  console.log("AI suggestion clicked");
                }}
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Suggest description
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Editor Content */}
      <div className="relative">
        <EditorContent
          editor={editor}
          className={cn(
            "border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent",
            `min-h-[${minHeight}]`,
            "prose prose-sm max-w-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-full"
          )}
        />
        {editor?.isEmpty && (
          <div className="absolute top-3 left-4 pointer-events-none text-muted-foreground text-base">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
});

AdvancedRichTextEditor.displayName = "AdvancedRichTextEditor";

export { AdvancedRichTextEditor };