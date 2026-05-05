"use client";

import WebButtonComponent from "@/app/(web)/_private/WebButtonComponent";
import WebIconComponent from "@/app/(web)/_private/WebIconComponent";
import { CardComponent } from "@/app/_private/(shadcn)/CardComponent";
import {
  ShadcnAccordionContentComponent,
  ShadcnAccordionTriggerComponent,
} from "@/app/_private/(shadcn)/ShadcnAccordianComponent";
import { GlassEffectAccordionItemComponent } from "@/app/_private/(theme)/glass-effect/GlassEffectAccordianComponent";
import {
  WebEventCreateFaqSchema,
  WebEventCreateFaqSchemaInfer,
  WebEventCreateFourSchemaInfer,
} from "@/app/api/web/auth/event-model/store/_private/validation";
import { RHFComponent } from "@/lib/lib-react-hook-form";
import { cn } from "@/lib/lib-shadcn";
import { Button } from "@/shadcn/ui/button";
import { CardDescription, CardTitle } from "@/shadcn/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/ui/dialog";
import { useEventFaqStore } from "@/store/store-event-faq";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CircleQuestionMarkIcon,
  EditIcon,
  PlusIcon,
  TrashIcon,
  UsersIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import WebEventCreateErrorIndicatorComponent from "../../../_private/WebEventCreateErrorIndicatorComponent";

export default function WebEventCreateFaqComponent() {
  return (
    <div className="flex flex-col">
      <FormComponent />
    </div>
  );
}

function FormComponent() {
  const form = useFormContext<WebEventCreateFourSchemaInfer>();
  const { eventFaqs, addEventFaq, removeEventFaq, updateEventFaq } =
    useEventFaqStore();

  const faqForm = useForm<WebEventCreateFaqSchemaInfer>({
    resolver: zodResolver(WebEventCreateFaqSchema),
    defaultValues: { question: "", answer: "" },
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const errorNotify = useMemo(() => {
    const { eventFaqs } = form?.formState?.errors ?? {};

    const obj = WebEventCreateErrorIndicatorComponent({
      children: eventFaqs?.message,
    });

    if (eventFaqs) {
      return obj;
    }
  }, [form.formState]);

  const openDialogFN = () => {
    setDialogOpen(true);
  };
  const updateFN = (index?: number) => {
    setEditingIndex(index ?? null);
    const eventGuest = eventFaqs?.at(index ?? 0);
    faqForm.setValue("question", eventGuest?.question ?? "");
    faqForm.setValue("answer", eventGuest?.answer ?? "");
    setDialogOpen(true);
  };

  const saveFN = faqForm.handleSubmit((data: WebEventCreateFaqSchemaInfer) => {
    if (editingIndex !== null) {
      updateEventFaq({
        id: editingIndex + 1,
        ...data,
      });
    } else {
      addEventFaq(data);
    }

    setDialogOpen(false);
    setEditingIndex(null);
  });

  return (
    <div className="flex flex-col">
      <GlassEffectAccordionItemComponent
        accordianProps={{
          value: "faq",
        }}
      >
        <ShadcnAccordionTriggerComponent>
          <div className="flex items-center gap-2">
            <WebIconComponent>
              <CircleQuestionMarkIcon className="size-5" />
            </WebIconComponent>
            <p>FAQs</p>

            <CardDescription className="hidden font-normal md:block">
              Total {eventFaqs?.length}
            </CardDescription>
            {errorNotify}
          </div>
        </ShadcnAccordionTriggerComponent>
        <ShadcnAccordionContentComponent className="px-1">
          <div
            className={cn("flex flex-col gap-4", {
              hidden: eventFaqs?.length === 0,
            })}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <CardDescription>Add Multiple faqs</CardDescription>

              <WebButtonComponent
                type="button"
                onClick={openDialogFN}
              >
                <PlusIcon />
                <span>Add FAQs</span>
              </WebButtonComponent>
            </div>

            {eventFaqs?.map((item, index) => (
              <CardComponent
                key={item?.slug}
                className="*:flex-row *:flex-wrap *:justify-between md:*:flex-nowrap"
              >
                <div className="flex flex-col gap-1">
                  <CardTitle>Q: {item?.question}</CardTitle>
                  <CardDescription>A: {item?.answer}</CardDescription>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={"outline"}
                    size={"icon-sm"}
                    onClick={() => updateFN(index)}
                  >
                    <EditIcon className="size-5" />
                  </Button>
                  <Button
                    type="button"
                    variant={"destructive"}
                    size={"icon-sm"}
                    onClick={() => removeEventFaq(item?.slug ?? undefined)}
                  >
                    <TrashIcon className="size-5" />
                  </Button>
                </div>
              </CardComponent>
            ))}
          </div>

          <CardComponent
            className={cn(
              "bg-ev-1/4 dark:bg-ev-1/30 items-center py-10 text-center *:items-center md:py-10",
              {
                hidden: eventFaqs?.length !== 0,
              },
            )}
          >
            <UsersIcon className="size-10" />
            <div className="flex flex-col">
              <CardTitle className="text-xl">No FAQs</CardTitle>
              <CardDescription>
                There are no faqs for this event.
              </CardDescription>
            </div>

            <WebButtonComponent
              type="button"
              onClick={openDialogFN}
            >
              <PlusIcon />
              <span>Add FAQs</span>
            </WebButtonComponent>
          </CardComponent>
        </ShadcnAccordionContentComponent>
      </GlassEffectAccordionItemComponent>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Add FAQs</DialogTitle>
            <DialogDescription>
              Frequently asked questions for attendees
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <RHFComponent
              form={faqForm}
              name="question"
              fieldType="input"
              label="Question"
            />
            <RHFComponent
              form={faqForm}
              name="answer"
              fieldType="textarea"
              label="Answer"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="button"
              onClick={saveFN}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
