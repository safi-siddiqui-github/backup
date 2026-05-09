"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ReactNode, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

type DragDropItemProps = {
  children?: ReactNode;
  type: string; // type is required for DnD
  index: number;
  moveField: (dragId: number, hoverId: number) => void;
};

export default function DragDropItem({
  children = null,
  type = "",
  index = 0,
  moveField = () => {},
}: DragDropItemProps) {
  //
  const ref = useRef(null);
  //
  const [{ handlerId, canDrop, isOver }, drop] = useDrop(() => ({
    accept: type,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    // drop(item, monitor) {
    drop(item) {
      if (!ref.current) {
        return;
      }
      const itemC = item as { index: number };
      const dragIndex = itemC.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveField(dragIndex, hoverIndex);
    },
  }));

  const isActive = canDrop && isOver;

  const [{ isDragging }, drag] = useDrag({
    type,
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={ref}
        className={cn("", {
          "cursor-move": isDragging,
          "rounded-xl outline-4": isActive,
        })}
        data-handler-id={handlerId}
      >
        {children}
      </div>
      {isActive && (
        <Separator className="rounded-full border-2 border-blue-500" />
      )}
    </div>
  );
}
