import { LevelContext } from "@/hooks/LevelContext";
import React, { useContext } from "react";

export default function SectionTwo({
  children,
}: {
  children: React.ReactNode;
}) {
  const level = useContext(LevelContext);
  return (
    <div>
      <LevelContext value={level + 1}>{children}</LevelContext>
    </div>
  );
}
