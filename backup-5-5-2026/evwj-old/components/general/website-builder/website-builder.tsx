"use client";
import { useState } from "react";
import Template1 from "./template-1/Template1";
import Template2 from "./template-2/template2";
import WebsiteBuilderFeatures from "./website-builder-home/website-builder-feature";
import WebsiteBuilderHomeHeader from "./website-builder-home/website-builder-header";
import WebsiteBuilderPage from "./website-builder-home/WebsiteBuilderPage";

export default function WebsiteBuilderComponent() {
  type TemplateName = "template-1" | "template-2" | null;

  const [template, setTemplate] = useState<TemplateName>(null);

  console.log("Selected Template:", template);

  return (
    <div className="     ">
      <div className="mx-auto">
        {template === null ? (
          <>
            <WebsiteBuilderHomeHeader />

            <main className="">
              <WebsiteBuilderPage
                setTempalte={(t: string) =>
                  setTemplate((t as TemplateName) ?? null)
                }
                template={template}
              />
            </main>

            <section className="mt-8">
              <WebsiteBuilderFeatures />
            </section>
          </>
        ) : template === "template-1" ? (
          <Template1 setTempalte={(t: string) => setTemplate((t as TemplateName) ?? null)} />
        ) : (
          <Template2 setTempalte={(t: string) => setTemplate((t as TemplateName) ?? null)} />
        )}
      </div>
    </div>
  );
}
