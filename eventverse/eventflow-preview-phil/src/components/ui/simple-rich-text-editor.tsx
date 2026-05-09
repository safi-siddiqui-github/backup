import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered,
  Link
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SimpleRichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

export const SimpleRichTextEditor = ({
  content = "",
  onChange,
  placeholder = "Start typing...",
  className,
  minHeight = "140px"
}: SimpleRichTextEditorProps) => {
  const [value, setValue] = useState(content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  console.log("SimpleRichTextEditor: Rendering with content:", content);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  const insertText = (before: string, after: string = before) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    handleChange(newText);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const ToolbarButton = ({ 
    onClick, 
    children, 
    title 
  }: {
    onClick: () => void;
    children: React.ReactNode;
    title?: string;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      title={title}
      className="h-8 w-8 p-0 hover:bg-muted/60 text-muted-foreground hover:text-foreground"
    >
      {children}
    </Button>
  );

  return (
    <div className={cn("border border-input rounded-lg overflow-hidden bg-background", className)}>
      {/* Toolbar */}
      <div className="border-b bg-muted/30 px-3 py-2 flex items-center gap-2">
        {/* Text Style Selector */}
        <Select defaultValue="normal">
          <SelectTrigger className="w-20 h-8 text-sm border-0 bg-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="heading1">Heading 1</SelectItem>
            <SelectItem value="heading2">Heading 2</SelectItem>
          </SelectContent>
        </Select>
        
        <Separator orientation="vertical" className="h-5" />
        
        {/* Formatting Buttons */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() => insertText("**", "**")}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => insertText("*", "*")}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => insertText("[link text](url)")}
            title="Link"
          >
            <Link className="h-4 w-4" />
          </ToolbarButton>
        </div>
        
        <Separator orientation="vertical" className="h-5 mx-1" />
        
        {/* List Buttons */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() => insertText("• ")}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => insertText("1. ")}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
        </div>
      </div>

      {/* Text Area */}
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent p-4",
            `min-h-[${minHeight}]`,
            "text-base leading-relaxed"
          )}
        />
      </div>
    </div>
  );
};