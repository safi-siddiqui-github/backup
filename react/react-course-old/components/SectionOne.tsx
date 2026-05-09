import { LevelContext } from "@/hooks/LevelContext";
import React, { useContext } from "react";

export default function SectionOne({
  level,
  children,
}: {
  level: number;
  children: React.ReactNode;
}) {
  return (
    <div>
      <LevelContext value={level}>{children}</LevelContext>
    </div>
  );
}
