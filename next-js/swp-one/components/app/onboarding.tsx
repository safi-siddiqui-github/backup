import { onBardingData } from "@/lib/data";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

export default function Onboarding() {
  return (
    <div className="flex flex-col gap-1 items-start justify-start">
      {onBardingData.map((item, index) => (
        <Link
          href={item.link}
          key={`onboarding-item-${index}`}
          className="flex items-center gap-2"
        >
          <CircleCheck />

          <p className="text-foreground">{item.title}</p>
        </Link>
      ))}
    </div>
  );
}
