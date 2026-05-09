"use client";

import { cn } from "@/lib/utils";
import { FormFieldType } from "@/prisma/generated";
import { ReactNode } from "react";
import { ConnectDragPreview, ConnectDragSource, useDrag } from "react-dnd";

type DragItemProps = {
  children?: ReactNode;
  type: string; // type is required for DnD
  itemData?: FormFieldType | null; // optional extra data to pass in the drag item
};

type DragItemCustomEvent = {
  item?: Partial<FormFieldType>;
  dropResult?: object;
};

export default function DragItem({
  children = null,
  type = "",
  itemData = null,
}: DragItemProps) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: type,
    item: { ...itemData },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        const event = new CustomEvent<DragItemCustomEvent>("dropItemTrigger", {
          detail: { item, dropResult },
        });
        window.dispatchEvent(event);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  // Attach both drag and preview to same element
  const attachRef = (node: HTMLDivElement | null) => {
    (drag as ConnectDragSource)(node);
    (dragPreview as ConnectDragPreview)(node);
  };

  return (
    <div
      ref={attachRef}
      className={cn("cursor-move overflow-hidden rounded-md p-2", {
        "opacity-40": isDragging,
      })}
      data-testid="drag-item"
    >
      {children}
    </div>
  );
}
