"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { useMemo } from "react";

export default function SectionTwo() {
  const list = useMemo(
    () => [
      {
        step: "01",
        title: "Create Your Event",
        description:
          "Set up your event details, dates, and basic information in just a few clicks",
      },
      {
        step: "02",
        title: "Customize & Plan",
        description:
          "Add guests, create schedules, manage budgets, and configure all your event features",
      },
      {
        step: "03",
        title: "Execute & Enjoy",
        description:
          "Use our real-time tools during your event and collect memories afterward",
      },
    ],
    [],
  );

  return (
    <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
      {list.map(({ step, title, description }, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-4 lg:flex-row"
        >
          <div className="flex flex-col gap-4">
            <p className="text-8xl font-bold text-white/50">{step}</p>
            <p className="text-xl font-semibold">{title}</p>
            <p className="">{description}</p>
          </div>
          {index < 2 ? (
            <>
              <ArrowDown className="lg:hidden" />
              <ArrowRight className="hidden min-w-fit lg:inline" />
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}
