import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Badge } from "../ui/badge";

export default function ColorBadge(props: {
  color?: string;
  children?: ReactNode;
}) {
  const { color, children } = props;

  return (
    <Badge
      className={cn("", {
        "bg-white": color === "NONE",
        "bg-red-500": color === "RED",
        "bg-blue-500": color === "BLUE",
        "bg-green-500": color === "GREEN",
        "bg-purple-500": color === "PURPLE",
        "bg-yellow-500": color === "YELLOW",
        "bg-pink-500": color === "PINK",
        "bg-indigo-500": color === "INDIGO",
        "bg-orange-500": color === "ORANGE",
      })}
    >
      {children}
    </Badge>
  );
}
