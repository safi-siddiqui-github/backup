"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ConnectDropTarget, useDrop } from "react-dnd";

type DropItemProps = {
  children?: ReactNode;
  type: string; // type is required for DnD
};

export default function DropItem({
  children = null,
  type = "",
}: DropItemProps) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: type,
    drop: () => ({ name: "Dustbin" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  // Wrap the drop ref so TS knows it’s a valid ref callback
  const attachDropRef = (node: HTMLDivElement | null) => {
    (drop as ConnectDropTarget)(node);
  };

  return (
    <div
      ref={attachDropRef}
      className={cn("h-full w-full p-0 transition-all ease-in-out", {
        "bg-slate-200 p-4": isActive,
      })}
      data-testid="dustbin"
    >
      {children}
    </div>
  );
}
