"use client";

import { GlassEffectAccordionItemComponent } from "@/app/_private/(theme)/glass-effect/GlassEffectAccordianComponent";
import GlassEffectIconComponent from "@/app/_private/(theme)/glass-effect/GlassEffectIconComponent";
import { WebEventCreateOneSchemaInfer } from "@/app/api/web/auth/event-model/store/_private/validation";
import { RHFComponent } from "@/lib/lib-react-hook-form";
import { FileTextIcon } from "lucide-react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import {
  ShadcnAccordionContentComponent,
  ShadcnAccordionTriggerComponent,
} from "../../../../../../../_private/(shadcn)/ShadcnAccordianComponent";
import WebEventCreateErrorIndicatorComponent from "../../../_private/WebEventCreateErrorIndicatorComponent";

export default function WebEventCreateDescriptionComponent() {
  return (
    <div className="flex flex-col">
      <FormComponent />
    </div>
  );
}

function FormComponent() {
  const form = useFormContext<WebEventCreateOneSchemaInfer>();

  const errorNotify = useMemo(() => {
    const { description } = form?.formState?.errors ?? {};

    const obj = WebEventCreateErrorIndicatorComponent({
      children: description?.message,
    });

    if (description) {
      return obj;
    }
  }, [form.formState]);

  return (
    <GlassEffectAccordionItemComponent
      accordianProps={{
        value: "description",
      }}
    >
      <ShadcnAccordionTriggerComponent>
        <div className="flex items-center gap-2">
          <GlassEffectIconComponent>
            <FileTextIcon />
          </GlassEffectIconComponent>
          <p>Description</p>
          {errorNotify}
        </div>
      </ShadcnAccordionTriggerComponent>
      <ShadcnAccordionContentComponent className="px-1">
        <RHFComponent
          form={form}
          name="description"
          // label="Event Name"
          fieldType="editor-js"
          tiptapUseEditorOptions={{
            editorProps: {
              attributes: {
                class: "min-h-32 border rounded-md p-2",
              },
            },
          }}
          inputProps={{
            placeholder: "Tell us about your Event !",
          }}
        />
      </ShadcnAccordionContentComponent>
    </GlassEffectAccordionItemComponent>
  );
}
