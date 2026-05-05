"use client";

import React, { useState } from "react";
import type { AboutData } from "./About.types";

 

export default function AboutSection({
  data,
  onChange,
  editable = false,
}: {
  data: AboutData;
  onChange?: (d: AboutData) => void;
  editable?: boolean;
}) {
  const [open, setOpen] = useState(false);

   

  const layout = data.layout ;

  return (
    <section className={`py-12 ${data.bgColor ? '' : ''}`} style={{ background: data.bgColor }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between">
          <div className="max-w-3xl">
            <h2 className="font-bold text-4xl leading-tight" style={{ color: data.textColor || undefined }}>{data.title}</h2>
            {data.subtitle && <p className="mt-2 text-lg text-gray-600 dark:text-gray-300" style={{ color: data.textColor || undefined }}>{data.subtitle}</p>}
            {data.bullets && data.bullets.length > 0 && (
              <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                {data.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}

            {data.ctaText && (
              <div className="mt-6">
                <a href={data.ctaLink || '#'} className="inline-block rounded bg-indigo-600 px-5 py-2 text-white font-semibold">{data.ctaText}</a>
              </div>
            )}
          </div>

          {editable && (
            <div className="ml-6">
              <button onClick={() => setOpen(true)} className="text-sm px-3 py-1 rounded border">Edit</button>
            </div>
          )}
        </div>

        
      </div>

    </section>
  );
}
