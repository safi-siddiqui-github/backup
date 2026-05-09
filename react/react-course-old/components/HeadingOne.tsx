import { LevelContext } from "@/hooks/LevelContext";
import React, { useContext } from "react";

export default function HeadingOne({ children }: { children: React.ReactNode }) {
  const level = useContext(LevelContext);

  switch (level) {
    case 1:
      return <h1 className="text-2xl">{children}</h1>;
    case 2:
      return <h2 className="text-xl">{children}</h2>;
    case 3:
      return <h3 className="text-lg">{children}</h3>;
    case 4:
      return <h4 className="text-base">{children}</h4>;
    case 5:
      return <h5 className="text-sm">{children}</h5>;
    case 6:
      return <h6 className="text-xs">{children}</h6>;
    default:
      throw Error("Unknown level: " + level);
  }
}
