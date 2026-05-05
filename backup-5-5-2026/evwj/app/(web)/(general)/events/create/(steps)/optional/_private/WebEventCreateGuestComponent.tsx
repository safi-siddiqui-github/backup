"use client";

import WebButtonComponent from "@/app/(web)/_private/WebButtonComponent";
import WebIconComponent from "@/app/(web)/_private/WebIconComponent";
import { CardComponent } from "@/app/_private/(shadcn)/CardComponent";
import { GlassEffectAccordionItemComponent } from "@/app/_private/(theme)/glass-effect/GlassEffectAccordianComponent";
import {
  WebEventCreateFourSchemaInfer,
  WebEventCreateGuestSchema,
  WebEventCreateGuestSchemaInfer,
} from "@/app/api/web/auth/event-model/store/_private/validation";
import { RHFComponent } from "@/lib/lib-react-hook-form";
import { ResponseDataType } from "@/lib/lib-responses";
import { cn } from "@/lib/lib-shadcn";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
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
import { useEventGuestStore } from "@/store/store-event-guest";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EditIcon,
  PlusIcon,
  StarIcon,
  TrashIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { FaGlobe, FaLinkedin, FaTwitter } from "react-icons/fa6";
import WebEventCreateErrorIndicatorComponent from "../../../_private/WebEventCreateErrorIndicatorComponent";
import { ShadcnAccordionContentComponent, ShadcnAccordionTriggerComponent } from "@/app/_private/(shadcn)/ShadcnAccordianComponent";

export default function WebEventCreateGuestComponent() {
  return (
    <div className="flex flex-col">
      <FormComponent />
    </div>
  );
}

function FormComponent() {
  const form = useFormContext<WebEventCreateFourSchemaInfer>();
  const {
    eventGuests,
    addEventGuest,
    updateEventGuest,
    getEventGuestsWithFile,
    removeEventGuest,
  } = useEventGuestStore();

  const [eventGuestsWithFile, setEventGuestsWithFile] = useState<
    ResponseDataType["eventGuests"]
  >([]);

  const errorNotify = useMemo(() => {
    const { eventGuests } = form?.formState?.errors ?? {};

    const obj = WebEventCreateErrorIndicatorComponent({
      children: eventGuests?.message,
    });

    if (eventGuests) {
      return obj;
    }
  }, [form.formState]);

  useEffect(() => {
    getEventGuestsWithFile()?.then((res) => {
      setEventGuestsWithFile(res);
    });
  }, [getEventGuestsWithFile, eventGuests]);

  const guestForm = useForm<WebEventCreateGuestSchemaInfer>({
    resolver: zodResolver(WebEventCreateGuestSchema),
    defaultValues: {
      name: "",
      role: "",
      description: "",
      linkedInUrl: "",
      twitterUrl: "",
      websiteUrl: "",
      avatar: "",
      avatarFile: undefined,
      avatarFileUrl: undefined,
    },
  });

  const avatarFileWatch = useWatch({
    control: guestForm?.control,
    name: "avatarFile",
  });

  const avatarFileUrlWatch = useWatch({
    control: guestForm?.control,
    name: "avatarFileUrl",
  });

  const avatarFileUrlWatchMemo = useMemo(() => {
    const file = avatarFileWatch;
    if (!file) return avatarFileUrlWatch;
    return URL.createObjectURL(file);
  }, [avatarFileWatch, avatarFileUrlWatch]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const openDialogFN = () => {
    setDialogOpen(true);
  };

  const updateFN = (index?: number) => {
    setEditingIndex(index ?? null);
    const eventGuest = eventGuestsWithFile?.at(index ?? 0);

    guestForm.setValue("name", eventGuest?.name ?? "");
    guestForm.setValue("role", eventGuest?.role ?? "");
    guestForm.setValue("description", eventGuest?.description ?? "");
    guestForm.setValue("linkedInUrl", eventGuest?.linkedInUrl ?? "");
    guestForm.setValue("twitterUrl", eventGuest?.twitterUrl ?? "");
    guestForm.setValue("websiteUrl", eventGuest?.websiteUrl ?? "");
    guestForm.setValue("avatarFileUrl", eventGuest?.avatarFileUrl ?? "");
    guestForm.setValue("avatarFile", eventGuest?.avatarFile);

    setDialogOpen(true);
  };

  const saveFN = guestForm.handleSubmit(
    (data: WebEventCreateGuestSchemaInfer) => {
      if (editingIndex !== null) {
        updateEventGuest({
          id: editingIndex + 1,
          ...data,
        });
      } else {
        addEventGuest(data);
      }

      setDialogOpen(false);
      setEditingIndex(null);
    },
  );

  return (
    <div className="flex flex-col">
      <GlassEffectAccordionItemComponent
        accordianProps={{
          value: "guest",
        }}
      >
        <ShadcnAccordionTriggerComponent>
          <div className="flex items-center gap-2">
            <WebIconComponent>
              <StarIcon className="size-5" />
            </WebIconComponent>
            <p>Special Guests & VIPs</p>

            <CardDescription className="hidden font-normal md:block">
              {eventGuests?.at(0)?.name}
            </CardDescription>
            {errorNotify}
          </div>
        </ShadcnAccordionTriggerComponent>
        <ShadcnAccordionContentComponent className="px-1">
          <div
            className={cn("flex flex-col gap-4", {
              hidden: eventGuestsWithFile?.length === 0,
            })}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <CardDescription>Add Multiple guests</CardDescription>

              <WebButtonComponent
                type="button"
                onClick={openDialogFN}
              >
                <PlusIcon />
                <span>Add Guest</span>
              </WebButtonComponent>
            </div>

            {eventGuestsWithFile?.map((item, index) => (
              <CardComponent
                key={item.slug}
                className="*:flex-row *:flex-wrap *:justify-between md:*:flex-nowrap"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-20">
                      <AvatarImage
                        src={item?.avatarFileUrl ?? ""}
                        className="object-cover"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <CardTitle className="text-xl">{item?.name}</CardTitle>
                      <CardDescription>Role: {item?.role}</CardDescription>
                    </div>
                  </div>

                  <CardDescription>{item?.description}</CardDescription>

                  <div className="flex items-center gap-1 *:*:size-5!">
                    <WebButtonComponent
                      size={"icon-lg"}
                      asChild
                    >
                      <Link
                        target={item?.linkedInUrl ? "_blank" : undefined}
                        href={item?.linkedInUrl ?? "#"}
                      >
                        <FaLinkedin />
                      </Link>
                    </WebButtonComponent>
                    <WebButtonComponent
                      size={"icon-lg"}
                      asChild
                    >
                      <Link
                        target={item?.twitterUrl ? "_blank" : undefined}
                        href={item?.twitterUrl ?? "#"}
                      >
                        <FaTwitter />
                      </Link>
                    </WebButtonComponent>
                    <WebButtonComponent
                      size={"icon-lg"}
                      asChild
                    >
                      <Link
                        target={item?.websiteUrl ? "_blank" : undefined}
                        href={item?.websiteUrl ?? "#"}
                      >
                        <FaGlobe />
                      </Link>
                    </WebButtonComponent>
                  </div>
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
                    onClick={() => removeEventGuest(item?.slug ?? undefined)}
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
                hidden: eventGuestsWithFile?.length !== 0,
              },
            )}
          >
            <UsersIcon className="size-10" />
            <div className="flex flex-col">
              <CardTitle className="text-xl">No Special Guests</CardTitle>
              <CardDescription>
                There are no special guests for this event.
              </CardDescription>
            </div>

            <WebButtonComponent
              type="button"
              onClick={openDialogFN}
            >
              <PlusIcon />
              <span>Add Guest</span>
            </WebButtonComponent>
          </CardComponent>
        </ShadcnAccordionContentComponent>
      </GlassEffectAccordionItemComponent>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogContent className="max-w-2xl!">
          <DialogHeader>
            <DialogTitle>Add Special Guest</DialogTitle>
            <DialogDescription>
              Speakers, performers, and notable attendees
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <div
                className="h-20 w-20 min-w-20 rounded-full bg-black bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${avatarFileUrlWatchMemo})`,
                }}
              />

              <RHFComponent
                form={guestForm}
                name="avatarFile"
                fieldType="input-file"
                inputProps={{
                  // className: "hidden",
                  multiple: false,
                  id: "avatar",
                  // type: "file",
                  accept: "image/*",
                }}
                // append={append}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <RHFComponent
                form={guestForm}
                name="name"
                fieldType="input"
                label="Name"
                inputProps={{
                  placeholder: "John Doe",
                }}
              />
              <RHFComponent
                form={guestForm}
                name="role"
                fieldType="input"
                label="Title/Role"
                inputProps={{
                  placeholder: "Keynote Speaker",
                }}
              />
            </div>
            <RHFComponent
              form={guestForm}
              name="description"
              fieldType="textarea"
              label="Description"
              textareaProps={{
                placeholder: "Brief description of the guest",
              }}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <RHFComponent
                form={guestForm}
                name="linkedInUrl"
                fieldType="input"
                label="LinkedIn URL"
                inputProps={{
                  placeholder: "https://www.linkedin.com/in/johndoe",
                }}
              />
              <RHFComponent
                form={guestForm}
                name="twitterUrl"
                fieldType="input"
                label="Twitter URL"
                inputProps={{
                  placeholder: "https://twitter.com/johndoe",
                }}
              />
              <RHFComponent
                form={guestForm}
                name="websiteUrl"
                fieldType="input"
                label="Website URL"
                inputProps={{
                  placeholder: "https://johndoe.com",
                }}
              />
            </div>
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
