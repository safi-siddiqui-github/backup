import { findTimezones } from "@/actions/event";
import { ModuleWithSubsTwo } from "@/actions/module";
import {
  deleteScheduleSession,
  findScheduleAgendas,
  findScheduleDayWhereModuleId,
  findScheduleSession,
  findScheduleSessionWhereModuleId,
  findScheduleTrackWhereModuleId,
  findSkillLevels,
  ScheduleSessionWithSubs,
  upsertScheduleSession,
} from "@/actions/schedule";
import { Badge } from "@/components/ui/badge";
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
  formatStringToTime,
} from "@/lib/helpers";
import { scheduleSessionSchema } from "@/lib/validation/schedule";
import {
  ScheduleAgenda,
  ScheduleDay,
  ScheduleSession,
  ScheduleTrack,
  SkillLevel,
  Timezone,
} from "@/prisma/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  Clock,
  Edit,
  Gauge,
  Globe,
  Hash,
  MapPin,
  Mic,
  Plus,
  Trash,
  Users,
} from "lucide-react";
import { Key, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import ColorBadge from "../ColorBadge";
import LoaderSpin from "../LoaderSpin";

type ScheduleSessionSchemaType = z.infer<typeof scheduleSessionSchema>;

export default function ConferenceSession(props: {
  module: ModuleWithSubsTwo;
}) {
  const moduleD = props.module;
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleSessions, setScheduleSessions] = useState<
    ScheduleSessionWithSubs[]
  >([]);
  const [scheduleSession, setScheduleSession] =
    useState<ScheduleSession | null>(null);
  const [scheduleAgendas, setScheduleAgendas] = useState<ScheduleAgenda[]>([]);
  const [scheduleTracks, setScheduleTracks] = useState<ScheduleTrack[]>([]);
  const [scheduleDays, setScheduleDays] = useState<ScheduleDay[]>([]);
  const [timezones, setTimezones] = useState<Timezone[]>([]);
  const [skillLevels, setSkillLevels] = useState<SkillLevel[]>([]);
  const dialogRef = useRef<HTMLButtonElement>(null);
  //
  const findScheduleSessionsFN = useCallback(async () => {
    setIsLoading(true);
    const result = await findScheduleSessionWhereModuleId(moduleD?.id ?? 0);
    setScheduleSessions(result);
    setIsLoading(false);
  }, [moduleD]);
  //
  const findScheduleAgendasFN = useCallback(async () => {
    setIsLoading(true);
    const result = await findScheduleAgendas();
    setScheduleAgendas(result);
    setIsLoading(false);
  }, []);
  //
  const findTimezonesFN = useCallback(async () => {
    setIsLoading(true);
    const result = await findTimezones();
    setTimezones(result);
    setIsLoading(false);
  }, []);
  //
  const findScheduleDaysFN = useCallback(async () => {
    setIsLoading(true);
    const result = await findScheduleDayWhereModuleId(moduleD?.id ?? 0);
    setScheduleDays(result);
    setIsLoading(false);
  }, [moduleD?.id]);
  //
  const findScheduleTracksFN = useCallback(async () => {
    setIsLoading(true);
    const result = await findScheduleTrackWhereModuleId(moduleD?.id ?? 0);
    setScheduleTracks(result);
    setIsLoading(false);
  }, [moduleD?.id]);
  //
  const findSkillLevelsFN = useCallback(async () => {
    setIsLoading(true);
    const result = await findSkillLevels();
    setSkillLevels(result);
    setIsLoading(false);
  }, []);
  //
  useEffect(() => {
    findScheduleSessionsFN();
    findScheduleAgendasFN();
    findTimezonesFN();
    findScheduleDaysFN();
    findScheduleTracksFN();
    findSkillLevelsFN();
  }, [
    findScheduleSessionsFN,
    findScheduleAgendasFN,
    findTimezonesFN,
    findScheduleDaysFN,
    findScheduleTracksFN,
    findSkillLevelsFN,
  ]);
  //
  const scheduleSessionForm = useForm<ScheduleSessionSchemaType>({
    resolver: zodResolver(scheduleSessionSchema),
    values: {
      name: scheduleSession?.name ?? "",
      description: scheduleSession?.description ?? "",
      capacity: String(scheduleSession?.capacity ?? ""),
      location: String(scheduleSession?.location ?? ""),
      speaker: String(scheduleSession?.speaker ?? ""),
      tag: String(scheduleSession?.tag ?? ""),
      scheduleAgenda: scheduleSession?.scheduleAgenda ?? "NONE",
      skillLevel: scheduleSession?.skillLevel ?? "ALL",
      timezone: scheduleSession?.timezone ?? "NONE",
      scheduleDayId: String(scheduleSession?.scheduleDayId ?? ""),
      scheduleTrackId: String(scheduleSession?.scheduleTrackId ?? ""),
      startTime: scheduleSession?.startTime ?? "",
      endTime: scheduleSession?.endTime ?? "",
    },
  });
  //
  const handleFormSubmit = async (values: ScheduleSessionSchemaType) => {
    setIsLoading(true);
    await upsertScheduleSession({
      id: scheduleSession?.id ?? 0,
      moduleId: moduleD?.id,
      ...values,
    });
    await refreshData();
    setIsLoading(false);
  };
  //
  const deleteScheduleSessionFN = async (id: number) => {
    setIsLoading(true);
    await deleteScheduleSession(id);
    await refreshData();
    setIsLoading(false);
  };
  //
  const findScheduleSessionFN = async (id: number) => {
    setIsLoading(true);
    const result = await findScheduleSession(id);
    setScheduleSession(result);
    setIsLoading(false);
  };
  //
  const updateTrigger = async (id: number) => {
    setIsLoading(true);
    dialogRef?.current?.click();
    await findScheduleSessionFN(id);
    setIsLoading(false);
  };
  //
  const refreshData = async () => {
    await findScheduleSessionsFN();
  };
  return (
    <Card className="flex flex-col gap-4">
      <CardContent className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <CardTitle className="text-xl">Conference Sessions</CardTitle>
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
              Add Sessions
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-full overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Conference Sessions</DialogTitle>
              <DialogDescription>
                Add sessions to your conference
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <Form {...scheduleSessionForm}>
                <form
                  onSubmit={scheduleSessionForm.handleSubmit(handleFormSubmit)}
                  className="flex flex-col gap-4"
                >
                  <FormField
                    control={scheduleSessionForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-col items-start">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="eg: Session title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={scheduleSessionForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-col items-start">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="eg: Session description..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={scheduleSessionForm.control}
                    name="scheduleDayId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select a day" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {scheduleDays?.map((each) => (
                              <SelectItem
                                key={each?.id}
                                value={String(each?.id)}
                              >
                                {each?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={scheduleSessionForm.control}
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
                    control={scheduleSessionForm.control}
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
                    control={scheduleSessionForm.control}
                    name="scheduleTrackId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Track</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select a track" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {scheduleTracks?.map((each) => (
                              <SelectItem
                                key={each?.id}
                                value={String(each?.id)}
                              >
                                {each?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={scheduleSessionForm.control}
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
                              (each: string, index: Key) => (
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
                    control={scheduleSessionForm.control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timezones</FormLabel>
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
                            {timezones?.map((each: string, index: Key) => (
                              <SelectItem
                                key={index}
                                value={each}
                              >
                                {formatLowercase(each)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={scheduleSessionForm.control}
                    name="skillLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skill Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select a level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {skillLevels?.map((each: string, index: Key) => (
                              <SelectItem
                                key={index}
                                value={each}
                              >
                                {formatLowercase(each)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={scheduleSessionForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-col items-start">
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="eg: locaiton"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={scheduleSessionForm.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-col items-start">
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="eg: 50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={scheduleSessionForm.control}
                    name="speaker"
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-col items-start">
                        <FormLabel>Speaker</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="eg: John Doe"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={scheduleSessionForm.control}
                    name="tag"
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-col items-start">
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="eg: AI, Machine Learning, ..."
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
                      Save Session
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
        {scheduleSessions?.map((each) => (
          <Card key={each?.id}>
            <CardContent className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-1 flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <ColorBadge color={each?.scheduleTrack?.color ?? ""}>
                    {each?.scheduleTrack?.name}
                  </ColorBadge>
                  <Badge variant={"outline"}>{each?.scheduleAgenda}</Badge>
                </div>

                <div className="flex flex-col gap-1">
                  <CardTitle>{each?.name}</CardTitle>
                  <CardDescription>{each?.description}</CardDescription>
                </div>

                <CardDescription className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-5" />
                    <p className="">
                      {formatDateToString(each?.scheduleDay?.day)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-5" />
                    <p className="">
                      {`${formatStringToTime(each?.startTime)} - ${formatStringToTime(each?.endTime)}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="size-5" />
                    <p className="">{formatLowercase(each?.timezone)}</p>
                  </div>
                </CardDescription>

                <CardDescription className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-5" />
                    <p className="">{each?.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="size-5" />
                    <p className="">
                      {each?.capacity} / {each?.capacity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="size-5" />
                    <p className="">{formatLowercase(each?.skillLevel)}</p>
                  </div>
                </CardDescription>

                <CardDescription className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Mic className="size-5" />
                    <p className="">{each?.speaker}</p>
                    <div className="flex items-center gap-2">
                      <Hash className="size-5" />
                      <p className="">{each?.tag}</p>
                    </div>
                  </div>
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
                  onClick={() => deleteScheduleSessionFN(each?.id)}
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
