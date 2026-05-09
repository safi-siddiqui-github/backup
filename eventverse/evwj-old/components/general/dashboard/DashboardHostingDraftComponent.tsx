"use client";

import { Spinner } from "@/components/ui/spinner";
import { useCallback, useEffect, useState } from "react";
import EventCardDashboardComponent from "../card/EventCardDashboardComponent";

type EventModel = {};

export default function DashboardHostingDraftComponent() {
  //
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Partial<EventModel>[]>([]);
  //
  const handleEvents = useCallback(async () => {
    //
    setLoading(true);
    //
    // if (userStore?.user?.id) {
    //
    // const response = await FindManyEventAction({
    //   userId: userStore?.user?.id,
    // });
    //
    // if (response?.success) {
    //   setEvents(() => response?.data?.eventModels ?? []);
    // }
    //
    // }
    //
    setLoading(false);
    //
    // }, [userStore?.user?.id]);
  }, []);
  //
  useEffect(() => {
    handleEvents();
  }, [handleEvents]);
  //
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/*  */}

      {/*  */}
      {loading && <Spinner className="size-10" />}
      {/*  */}

      {/*  */}
      {events?.map((item, index) => {
        return (
          <EventCardDashboardComponent
            key={index}
            item={item}
            handleEvents={handleEvents}
          />
        );
      })}

      {/*  */}

      {/*  */}
    </div>
  );
}
