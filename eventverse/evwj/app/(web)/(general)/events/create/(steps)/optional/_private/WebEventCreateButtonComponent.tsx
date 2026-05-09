"use client";

import WebButtonComponent from "@/app/(web)/_private/WebButtonComponent";
import { WebEventCreateFiveSchemaKeys } from "@/app/api/web/auth/event-model/store/_private/validation";
import { Routes } from "@/lib/lib-routes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { Spinner } from "@/shadcn/ui/spinner";
import { useEventStore } from "@/store/store-event";
import { useEventAssetStore } from "@/store/store-event-asset";
import { useEventDayStore } from "@/store/store-event-day";
import { useEventFaqStore } from "@/store/store-event-faq";
import { useEventGuestStore } from "@/store/store-event-guest";
import { useEventVenueStore } from "@/store/store-event-venue";
import { useUserStore } from "@/store/store-user";
import { CheckIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { $ZodIssue } from "zod/v4/core";
import { WebEventModuleStoreAction } from "../../../_private/action";

export default function WebEventCreateButtonComponent() {
  return (
    <div className="flex flex-col">
      <FormComponent />
    </div>
  );
}

function FormComponent() {
  const { user } = useUserStore();

  return (
    <>
      {user?.email ? (
        <AlertDialogSubmitComponent />
      ) : (
        <AlertDialogGuestComponent />
      )}
    </>
  );
}

export function AlertDialogGuestComponent() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <WebButtonComponent type="button">
          <span>Signin to Create Event</span>
          <CheckIcon />
        </WebButtonComponent>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to proceed?</AlertDialogTitle>
          <AlertDialogDescription>
            Click continue to Signin and create your event.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link href={Routes.web.guest.signin}>Continue</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function AlertDialogSubmitComponent() {
  const { event } = useEventStore();
  const { eventDays } = useEventDayStore();
  const { eventVenues } = useEventVenueStore();
  const { eventFaqs } = useEventFaqStore();
  const { getEventAssetsWithFile } = useEventAssetStore();
  const { getEventGuestsWithFile } = useEventGuestStore();
  const [open, setOpen] = useState(false);
  const form = useFormContext();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleOpen = (openStatus?: boolean, trigger?: "dialog" | "btn") => {
    const autoOpen = form?.formState?.isSubmitSuccessful;

    if (autoOpen && openStatus) {
      setOpen(true);
    } else {
      if (trigger === "btn") {
        setOpen(false);
      }
    }
  };

  const afterSubmitValidation = useCallback((issues?: $ZodIssue[]) => {
    if (!issues) return;
    const first = issues?.at(0);
    if (!first) return;

    const path = first?.path?.at(0) as WebEventCreateFiveSchemaKeys;
    const message = first?.message;
    let modifiedMessage;

    switch (path) {
      case "name":
      case "visibility":
      case "description":
      case "eventDays":
      case "eventVenues":
      case "searchCategory":
      case "eventCategoryAssignments":
        modifiedMessage = `Basic: ${message}`;
        break;

      case "photos":
        modifiedMessage = `Photos: ${message}`;
        break;

      case "eventModules":
        modifiedMessage = `Modules: ${message}`;
        break;

      case "eventFeatureType":
      case "ageRestriction":
      case "eventGuests":
      case "eventFaqs":
        modifiedMessage = `Optional: ${message}`;

        break;

      default:
        modifiedMessage = `Server: ${message}`;
        break;
    }

    toast.error(modifiedMessage);
  }, []);

  const handleClick = useCallback(async () => {
    setLoading(true);

    const eventAssetsModified = await getEventAssetsWithFile();
    const eventGuestsModified = await getEventGuestsWithFile();

    const storeRes = await WebEventModuleStoreAction({
      event,
      eventDays,
      eventVenues,
      eventAssets: eventAssetsModified,
      eventGuests: eventGuestsModified,
      eventFaqs,
    });

    if (!storeRes?.success) {
      afterSubmitValidation(storeRes?.error);
      setLoading(false);
      return;
    }

    toast.success(storeRes?.message);
    setLoading(false);
    router.push(Routes?.web?.auth?.dashboard);
  }, [
    afterSubmitValidation,
    event,
    eventDays,
    eventFaqs,
    eventVenues,
    getEventAssetsWithFile,
    getEventGuestsWithFile,
    router,
  ]);

  return (
    <>
      <WebButtonComponent
        type="submit"
        onClick={() => handleOpen(true, "btn")}
      >
        <span>Create Event</span>
        <CheckIcon />
      </WebButtonComponent>

      <AlertDialog
        open={open}
        // onOpenChange={(next) => {
        //   handleOpen(next, "dialog");
        // }}
        // onOpenChange={handleOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create your event?</AlertDialogTitle>
            <AlertDialogDescription>
              Click continue to create your event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                handleOpen(false, "btn");
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <WebButtonComponent
                type="button"
                onClick={handleClick}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : <PlusIcon />}
                <span>Create</span>
              </WebButtonComponent>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
