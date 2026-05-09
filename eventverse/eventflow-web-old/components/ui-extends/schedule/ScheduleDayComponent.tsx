import { ModuleWithSubsTwo } from "@/actions/module";
import {
  deleteScheduleDay,
  findScheduleDay,
  findScheduleDayWhereModuleId,
  ScheduleDayWithSubs,
  ScheduleDayWithSubsTwo,
  upsertScheduleDay,
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
import { formatDateToInputDate, formatDateToString } from "@/lib/helpers";
import { scheduleDaySchema } from "@/lib/validation/schedule";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus, Trash } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import LoaderSpin from "../LoaderSpin";

type ScheduleDayType = z.infer<typeof scheduleDaySchema>;

export default function ScheduleDayComponent(props: {
  module: ModuleWithSubsTwo;
}) {
  const moduleD = props.module;
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleDays, setScheduleDays] = useState<ScheduleDayWithSubs[]>([]);
  const [scheduleDay, setScheduleDay] = useState<ScheduleDayWithSubsTwo | null>(
    null,
  );
  const dialogRef = useRef<HTMLButtonElement>(null);
  //
  const findScheduleDaysFN = useCallback(async () => {
    setIsLoading(true);
    //
    const scheduleDays = await findScheduleDayWhereModuleId(moduleD?.id ?? 0);
    setScheduleDays(scheduleDays);
    //
    setIsLoading(false);
  }, [moduleD]);
  //
  useEffect(() => {
    findScheduleDaysFN();
  }, [findScheduleDaysFN]);
  //
  const scheduleDayForm = useForm<ScheduleDayType>({
    resolver: zodResolver(scheduleDaySchema),
    values: {
      name: scheduleDay?.name ?? "",
      day: formatDateToInputDate(scheduleDay?.day),
    },
  });
  //
  const refreshData = useCallback(async () => {
    await findScheduleDaysFN();
  }, [findScheduleDaysFN]);
  //
  const handleScheduleDayFormSubmit = useCallback(
    async (values: ScheduleDayType) => {
      setIsLoading(true);
      await upsertScheduleDay({
        id: scheduleDay?.id ?? 0,
        moduleId: moduleD?.id,
        ...values,
        day: new Date(values?.day),
      });
      await refreshData();
      setIsLoading(false);
    },
    [moduleD?.id, refreshData, scheduleDay?.id],
  );
  //
  const deleteScheduleDayFN = useCallback(
    async (id: number) => {
      setIsLoading(true);
      await deleteScheduleDay(id);
      await refreshData();
      setIsLoading(false);
    },
    [refreshData],
  );
  //
  const findScheduleDayFN = useCallback(async (id: number) => {
    setIsLoading(true);
    const scheduleDay = await findScheduleDay(id);
    setScheduleDay(scheduleDay);
    setIsLoading(false);
  }, []);
  //
  const updateTrigger = async (id: number) => {
    setIsLoading(true);
    dialogRef?.current?.click();
    await findScheduleDayFN(id);
    setIsLoading(false);
  };
  //
  return (
    <Card className="flex flex-col gap-4">
      <CardContent className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <CardTitle className="text-xl">Event Days</CardTitle>
          {isLoading ? <LoaderSpin /> : null}
        </div>

        {/*  */}

        <Dialog>
          <DialogTrigger
            asChild
            ref={dialogRef}
          >
            <Button className="w-fit">
              <Plus />
              Add Days
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Event Days</DialogTitle>
              <DialogDescription>Add days to your event</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <Form {...scheduleDayForm}>
                <form
                  onSubmit={scheduleDayForm.handleSubmit(
                    handleScheduleDayFormSubmit,
                  )}
                  className="flex flex-col gap-4"
                >
                  <FormField
                    control={scheduleDayForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-col items-start">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="eg: Birthday"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={scheduleDayForm.control}
                    name="day"
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-col items-start">
                        <FormLabel>Day</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                          />
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
                      Save Day
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>

        {/*  */}
      </CardContent>

      {/*  */}

      <CardContent className="flex flex-col gap-2">
        {scheduleDays?.map((each) => (
          <Card key={each?.id}>
            <CardContent className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-col gap-2">
                <CardTitle>
                  {`${each?.name} - ${formatDateToString(each?.day)}`}
                </CardTitle>
                <CardDescription>
                  {each?.scheduleItems?.length ?? 0} Items | 09:00 - 11:00
                </CardDescription>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant={"outline"}
                  onClick={() => updateTrigger(each?.id)}
                  disabled={isLoading}
                >
                  <Edit />
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => deleteScheduleDayFN(each?.id)}
                  disabled={isLoading}
                >
                  <Trash />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>

      {/*  */}
    </Card>
  );
}
