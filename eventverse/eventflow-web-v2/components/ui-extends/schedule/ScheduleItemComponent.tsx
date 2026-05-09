import { findTimezones } from "@/actions/event";
import {
  deleteScheduleItem,
  findScheduleAgendas,
  findScheduleDay,
  findScheduleItem,
  findScheduleNotifications,
  ScheduleDayWithSubsTwo,
  upsertScheduleItem,
} from "@/actions/schedule";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  formatDateToString,
  formatLowercase,
  formatScheduleNotification,
  formatStringToTime,
} from "@/lib/helpers";
import { scheduleItemSchema } from "@/lib/validation/schedule";
import {
  ScheduleAgenda,
  ScheduleItem,
  ScheduleNotification,
  Timezone,
} from "@/prisma/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bell, Edit, Plus, Trash } from "lucide-react";
import { Key, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import LoaderSpin from "../LoaderSpin";

type ScheduleItemFormType = z.infer<typeof scheduleItemSchema>;

export default function ScheduleItemComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [scheduleItem, setScheduleItem] = useState<ScheduleItem | null>(null);
  const [scheduleAgendas, setScheduleAgendas] = useState<ScheduleAgenda[]>([]);
  const [timezone, setTimezones] = useState<Timezone[]>([]);
  const [scheduleNotifications, setScheduleNotifications] = useState<
    ScheduleNotification[]
  >([]);
  const [scheduleDay, setScheduleDay] = useState<ScheduleDayWithSubsTwo | null>(
    null,
  );
  const dialogRef = useRef<HTMLButtonElement>(null);
  //
  const findScheduleAgendasFN = useCallback(async () => {
    setIsLoading(true);
    const scheduleAgendas = await findScheduleAgendas();
    setScheduleAgendas(scheduleAgendas);
    setIsLoading(false);
  }, []);
  //
  const findScheduleNotificationsFN = useCallback(async () => {
    setIsLoading(true);
    const scheduleNotifications = await findScheduleNotifications();
    setScheduleNotifications(scheduleNotifications);
    setIsLoading(false);
  }, []);
  //
  const findTimezonesFN = useCallback(async () => {
    setIsLoading(true);
    const scheduleNotifications = await findTimezones();
    setTimezones(scheduleNotifications);
    setIsLoading(false);
  }, []);
  //
  const findScheduleItemFN = useCallback(async (id: number) => {
    setIsLoading(true);
    const scheduleItem = await findScheduleItem(id);
    setScheduleItem(scheduleItem);
    setIsLoading(false);
  }, []);
  //
  const findScheduleDayFN = useCallback(async () => {
    setIsLoading(true);
    if (selectedId !== 0) {
      const scheduleDay = await findScheduleDay(selectedId);
      setScheduleDay(scheduleDay);
    }
    setIsLoading(false);
  }, [selectedId]);
  //
  useEffect(() => {
    findScheduleDayFN();
    findScheduleAgendasFN();
    findScheduleNotificationsFN();
    findTimezonesFN();
  }, [
    selectedId,
    findScheduleDayFN,
    findScheduleAgendasFN,
    findScheduleNotificationsFN,
    findTimezonesFN,
  ]);
  //
  const handleScheduleItemTrigger = useCallback(async (e: Event) => {
    setIsLoading(true);
    const customEvent = e as CustomEvent;
    const id = customEvent.detail;
    setSelectedId(id);
  }, []);
  //
  useEffect(() => {
    window.addEventListener(
      "findScheduleItemsAction",
      handleScheduleItemTrigger,
    );
    return () =>
      window.removeEventListener(
        "findScheduleItemsAction",
        handleScheduleItemTrigger,
      );
  }, [handleScheduleItemTrigger]);
  //
  const scheduleItemForm = useForm<ScheduleItemFormType>({
    resolver: zodResolver(scheduleItemSchema),
    values: {
      name: scheduleItem?.name ?? "",
      description: scheduleItem?.description ?? "",
      startTime: scheduleItem?.startTime ?? "",
      endTime: scheduleItem?.endTime ?? "",
      scheduleAgenda: scheduleItem?.scheduleAgenda ?? "NONE",
      scheduleNotification: scheduleItem?.scheduleNotification ?? "NONE",
      notificationMessage: scheduleItem?.notificationMessage ?? "",
      timezone: scheduleItem?.timezone ?? "NONE",
    },
  });
  //
  const refreshData = useCallback(async () => {
    await findScheduleDayFN();
  }, [findScheduleDayFN]);
  //
  const handleScheduleItemFormSubmit = useCallback(
    async (values: ScheduleItemFormType) => {
      setIsLoading(true);
      await upsertScheduleItem({
        id: scheduleItem?.id ?? 0,
        scheduleDayId: scheduleDay?.id,
        ...values,
      });
      await refreshData();
      setIsLoading(false);
    },
    [refreshData, scheduleDay?.id, scheduleItem?.id],
  );
  //
  const deleteScheduleItemFN = async (id: number) => {
    setIsLoading(true);
    await deleteScheduleItem(id);
    await refreshData();
    setIsLoading(false);
  };
  //
  const updateTrigger = async (id: number) => {
    setIsLoading(true);
    dialogRef?.current?.click();
    await findScheduleItemFN(id);
    setIsLoading(false);
  };
  //
  return (
    <Card className="flex flex-col">
      {/*  */}

      <CardContent className="flex flex-col gap-2">
        {/*  */}
        {isLoading ? <LoaderSpin /> : null}

        {scheduleDay ? (
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-col">
              <CardTitle>
                {`${scheduleDay?.name} - ${formatDateToString(scheduleDay?.day)}`}
              </CardTitle>
              <CardDescription>
                {scheduleDay?.scheduleItems?.length ?? 0} Items
              </CardDescription>
            </div>

            {/*  */}

            <Dialog>
              <DialogTrigger
                asChild
                ref={dialogRef}
              >
                <Button>
                  <Plus />
                  Add Schedule
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-full overflow-y-scroll">
                <DialogHeader>
                  <DialogTitle>Schudule Item</DialogTitle>
                  <DialogDescription>Add items to your days</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                  <Form {...scheduleItemForm}>
                    <form
                      onSubmit={scheduleItemForm.handleSubmit(
                        handleScheduleItemFormSubmit,
                      )}
                      className="flex flex-col gap-4"
                    >
                      <FormField
                        control={scheduleItemForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col items-start">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="eg: Registration"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={scheduleItemForm.control}
                        name="scheduleAgenda"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Agenda</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl className="w-full">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an agenda" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {scheduleAgendas?.map(
                                  (
                                    each: string,
                                    index: Key | null | undefined,
                                  ) => (
                                    <SelectItem
                                      key={index}
                                      value={each}
                                    >
                                      {formatLowercase(each)}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={scheduleItemForm.control}
                        name="timezone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Timezone</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl className="w-full">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a timezone" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timezone?.map(
                                  (
                                    each: string,
                                    index: Key | null | undefined,
                                  ) => (
                                    <SelectItem
                                      key={index}
                                      value={each}
                                    >
                                      {formatLowercase(each)}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={scheduleItemForm.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col items-start">
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                              <Input
                                type="time"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={scheduleItemForm.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col items-start">
                            <FormLabel>End Time</FormLabel>
                            <FormControl>
                              <Input
                                type="time"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={scheduleItemForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col items-start">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={scheduleItemForm.control}
                        name="scheduleNotification"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notify guests before</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl className="w-full">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select notify time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {scheduleNotifications?.map(
                                  (
                                    each: string,
                                    index: Key | null | undefined,
                                  ) => (
                                    <SelectItem
                                      key={index}
                                      value={each}
                                    >
                                      {formatScheduleNotification(each)}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={scheduleItemForm.control}
                        name="notificationMessage"
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col items-start">
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? <LoaderSpin /> : <Plus />}
                          Save Item
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>

            {/*  */}
          </div>
        ) : (
          "Select a day"
        )}

        {/*  */}
      </CardContent>

      {/*  */}

      <CardContent className="flex flex-col gap-4">
        {/*  */}

        {scheduleDay?.scheduleItems?.map((each) => (
          <Card key={each?.id}>
            <CardContent className="flex flex-wrap justify-between gap-4">
              <div className="flex flex-col gap-4 md:flex-1">
                <div className="flex flex-col gap-1">
                  <CardDescription>
                    {`${formatLowercase(each?.scheduleAgenda)} - ${formatStringToTime(each?.startTime)} - ${formatStringToTime(each?.endTime)} | ${formatLowercase(each?.timezone)}`}
                  </CardDescription>
                  <CardTitle>{each?.name}</CardTitle>
                  <CardDescription>Main Hall</CardDescription>
                  <CardDescription>{each?.description}</CardDescription>
                </div>

                {each?.scheduleNotification !== "NONE" ? (
                  <Card className="bg-slate-50">
                    <CardContent className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Bell className="size-4" />
                        <CardTitle className="">Guest Notification: </CardTitle>
                        <CardDescription>
                          {formatScheduleNotification(
                            each?.scheduleNotification,
                          )}
                        </CardDescription>
                      </div>

                      <CardDescription>
                        {each?.notificationMessage}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ) : null}
              </div>

              <div className="flex gap-2">
                <Button
                  variant={"outline"}
                  onClick={() => updateTrigger(each?.id)}
                  disabled={isLoading}
                >
                  <Edit />
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => deleteScheduleItemFN(each?.id)}
                  disabled={isLoading}
                >
                  <Trash />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/*  */}
      </CardContent>
    </Card>
  );
}
