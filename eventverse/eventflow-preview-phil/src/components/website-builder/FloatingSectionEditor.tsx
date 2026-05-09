import { Section } from "@/types/website";
import { FloatingWindow } from "./FloatingWindow";
import { SectionEditor } from "./SectionEditor";

interface FloatingSectionEditorProps {
  section: Section;
  position: { x: number; y: number };
  onUpdate: (sectionId: string, updates: Partial<Section>) => void;
  onDelete: (sectionId: string) => void;
  onClose: () => void;
}

export const FloatingSectionEditor = ({
  section,
  position,
  onUpdate,
  onDelete,
  onClose
}: FloatingSectionEditorProps) => {
  return (
    <FloatingWindow
      id={`section-editor-${section.id}`}
      title="Edit Section"
      type={section.type}
      initialPosition={position}
      initialSize={{ width: 400, height: 600 }}
      onClose={onClose}
      zIndex={1050}
    >
      <SectionEditor
        section={section}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onDeselect={onClose}
      />
    </FloatingWindow>
  );
};