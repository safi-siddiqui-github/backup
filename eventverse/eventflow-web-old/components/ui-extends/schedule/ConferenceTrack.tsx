import { ModuleWithSubsTwo } from "@/actions/module";
import { findColors } from "@/actions/rsvp";
import {
  deleteScheduleTrack,
  findScheduleTrack,
  findScheduleTrackWhereModuleId,
  upsertScheduleTrack,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { scheduleTrackSchema } from "@/lib/validation/schedule";
import { Color, ScheduleTrack } from "@/prisma/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus, Trash } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import ColorBox from "../ColorBox";
import LoaderSpin from "../LoaderSpin";

type ScheduleTrackSchemaType = z.infer<typeof scheduleTrackSchema>;

export default function ConferenceTrack(props: { module: ModuleWithSubsTwo }) {
  const moduleD = props.module;
  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState<Color[]>([]);
  const [scheduleTracks, setScheduleTracks] = useState<ScheduleTrack[]>([]);
  const [scheduleTrack, setScheduleTrack] = useState<ScheduleTrack | null>(
    null,
  );
  const dialogRef = useRef<HTMLButtonElement>(null);
  //
  const findColorsFN = useCallback(async () => {
    setIsLoading(true);
    const result = await findColors();
    setColors(result);
    setIsLoading(false);
  }, []);
  //
  const findScheduleTracksFN = useCallback(async () => {
    setIsLoading(true);
    const result = await findScheduleTrackWhereModuleId(moduleD?.id ?? 0);
    setScheduleTracks(result);
    setIsLoading(false);
  }, [moduleD]);
  //
  useEffect(() => {
    findScheduleTracksFN();
    findColorsFN();
  }, [findScheduleTracksFN, findColorsFN]);
  //
  const scheduleTrackForm = useForm<ScheduleTrackSchemaType>({
    resolver: zodResolver(scheduleTrackSchema),
    values: {
      name: scheduleTrack?.name ?? "",
      color: scheduleTrack?.color ?? "NONE",
      description: scheduleTrack?.description ?? "",
    },
  });
  //
  const handleFormSubmit = async (values: ScheduleTrackSchemaType) => {
    setIsLoading(true);
    await upsertScheduleTrack({
      id: scheduleTrack?.id ?? 0,
      moduleId: moduleD?.id,
      ...values,
    });
    await refreshData();
    setIsLoading(false);
  };
  //
  const deleteScheduleTrackFN = async (id: number) => {
    setIsLoading(true);
    await deleteScheduleTrack(id);
    await refreshData();
    setIsLoading(false);
  };
  //
  const findScheduleTrackFN = async (id: number) => {
    setIsLoading(true);
    const result = await findScheduleTrack(id);
    setScheduleTrack(result);
    setIsLoading(false);
  };
  //
  const updateTrigger = async (id: number) => {
    setIsLoading(true);
    dialogRef?.current?.click();
    await findScheduleTrackFN(id);
    setIsLoading(false);
  };
  //
  const refreshData = async () => {
    await findScheduleTracksFN();
  };
  return (
    <Card className="flex flex-col gap-4">
      <CardContent className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <CardTitle className="text-xl">Conference Tracks</CardTitle>
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
              Add Tracks
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Conference Tracks</DialogTitle>
              <DialogDescription>
                Add tracks to your conference
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <Form {...scheduleTrackForm}>
                <form
                  onSubmit={scheduleTrackForm.handleSubmit(handleFormSubmit)}
                  className="flex flex-col gap-4"
                >
                  <FormField
                    control={scheduleTrackForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-col items-start">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="eg: AI & Development"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={scheduleTrackForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-col items-start">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="eg: About AI & ..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={scheduleTrackForm.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Colors</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-wrap items-center gap-2"
                          >
                            {colors?.map((each) => (
                              <FormItem
                                key={each}
                                className=""
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    value={each}
                                    className="hidden"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  <div
                                    className={cn(
                                      "h-8 w-20 overflow-hidden rounded outline-black",
                                      {
                                        "outline-3": field.value === each,
                                      },
                                    )}
                                  >
                                    <ColorBox color={each} />
                                  </div>
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
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
                      Save Track
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
        {scheduleTracks?.map((each) => (
          <Card key={each?.id}>
            <CardContent className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 overflow-hidden rounded-full">
                    <ColorBox color={each?.color ?? ""} />
                  </div>

                  <CardTitle>{each?.name}</CardTitle>
                </div>
                <CardDescription>{each?.description}</CardDescription>
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
                  onClick={() => deleteScheduleTrackFN(each?.id)}
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
