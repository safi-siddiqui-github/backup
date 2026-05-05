"use client";

import { useMemo } from "react";

export default function WebHomeInformationComponent() {
  const infoData = useMemo(
    () => [
      {
        id: 1,
        name: "Events Created",
        content: "14M+",
      },
      {
        id: 2,
        name: "Guest Served",
        content: "$36B+",
      },
      {
        id: 3,
        name: "Countries & Territories",
        content: "200+",
      },
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {infoData?.map((info) => (
          <div
            key={info.id}
            className="flex flex-col gap-2 text-center"
          >
            <p className="text-7xl font-extrabold">{info.content}</p>
            <p className="tracking-tight">{info.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
