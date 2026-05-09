"use client";

import { ModuleWithSubsTwo, upsertModule } from "@/actions/module";
import {
  findRsvpInvitationTemplates,
  findRsvpPlatforms,
  findRsvpReminderSchedules,
  findRsvpResponses,
} from "@/actions/rsvp";
import LoaderSpin from "@/components/ui-extends/LoaderSpin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  formatDateToInputDate,
  formatLowercase,
  formatRsvpPlatform,
  formatRsvpReminder,
  formatRsvpResponse,
} from "@/lib/helpers";
import { rsvpModuleSettingSchema } from "@/lib/validation/rsvp";
import {
  RsvpPlatform,
  RsvpReminder,
  RsvpResponse,
  RsvpTemplate,
} from "@/prisma/generated";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Clock,
  Gift,
  MessageCircle,
  Plus,
  Settings,
  Shield,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type GuestSettingFormType = z.infer<typeof rsvpModuleSettingSchema>;

export default function RsvpGuestSetting(props: { module: ModuleWithSubsTwo }) {
  const moduleD = props?.module;
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState<RsvpResponse[]>([]);
  const [platforms, setPlatforms] = useState<RsvpPlatform[]>([]);
  const [invitationTemplates, setInvitationTemplates] = useState<
    RsvpTemplate[]
  >([]);
  const [reminderSchedules, setReminderSchedules] = useState<RsvpReminder[]>(
    [],
  );
  const [tabValue, setTabValue] = useState("");
  //
  const findDataFN = useCallback(async () => {
    setIsLoading(true);

    const responses = await findRsvpResponses();
    setResponses(responses);

    const platforms = await findRsvpPlatforms();
    setPlatforms(platforms);

    const invitationTemplates = await findRsvpInvitationTemplates();
    setInvitationTemplates(invitationTemplates);

    const reminderSchedules = await findRsvpReminderSchedules();
    setReminderSchedules(reminderSchedules);

    setIsLoading(false);
  }, []);
  //
  useEffect(() => {
    setTabValue(localStorage.getItem("dashboardRsvpSettingTab") ?? "basic");
    findDataFN();
  }, [findDataFN]);
  //
  function handleTabsChange(value: string) {
    localStorage.setItem("dashboardRsvpSettingTab", value);
    setTabValue(value);
  }
  //
  const moduleSettingForm = useForm<GuestSettingFormType>({
    resolver: zodResolver(rsvpModuleSettingSchema),
    values: {
      rsvpDeadline: formatDateToInputDate(moduleD?.rsvpDeadline),
      rsvpCapacityLimit: String(moduleD?.rsvpCapacityLimit ?? ""),
      rsvpPlusOneLimit: String(moduleD?.rsvpPlusOneLimit ?? ""),
      rsvpAllowPlusOne: moduleD?.rsvpAllowPlusOne ?? false,
      rsvpEnableWaitlist: moduleD?.rsvpEnableWaitlist ?? false,
      rsvpCollectDietryInformation:
        moduleD?.rsvpCollectDietryInformation ?? false,
      rsvpEnableCustomField: moduleD?.rsvpEnableCustomField ?? false,
      rsvpResponse: moduleD?.rsvpResponse ?? "NONE",
      //
      rsvpPublicRegistration: moduleD?.rsvpPublicRegistration ?? false,
      rsvpRequireApproval: moduleD?.rsvpRequireApproval ?? false,
      rsvpAutomaticReminder: moduleD?.rsvpAutomaticReminder ?? false,
      //
      rsvpPlatform: moduleD?.rsvpPlatform ?? "NONE",
      rsvpGiftName: moduleD?.rsvpGiftName ?? "",
      rsvpGiftUrl: moduleD?.rsvpGiftUrl ?? "",
      rsvpGiftDescription: moduleD?.rsvpGiftDescription ?? "",
      //
      rsvpTemplate: moduleD?.rsvpTemplate ?? "NONE",
      rsvpReminder: moduleD?.rsvpReminder ?? "NONE",
      rsvpCommunicationMessage: moduleD?.rsvpCommunicationMessage ?? "",
      rsvpCommunicationSmsNotification:
        moduleD?.rsvpCommunicationSmsNotification ?? false,
    },
  });
  //
  async function handleFormSubmit(values: GuestSettingFormType) {
    setIsLoading(true);
    await upsertModule({
      id: moduleD?.id ?? 0,
      ...values,
      rsvpDeadline: new Date(values?.rsvpDeadline),
    });
    setIsLoading(false);
  }
  //
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col">
        <p className="text-xl font-medium">Manage RSVP Settings</p>
        <p className="">Manage your rsvp settings</p>
        {isLoading && <LoaderSpin />}
      </div>

      <div className="flex flex-col">
        <Tabs
          value={tabValue}
          onValueChange={handleTabsChange}
          className="gap-8"
        >
          <TabsList className="h-fit w-full justify-start overflow-x-auto py-4 sm:py-1">
            <TabsTrigger value="basic">
              <Settings /> Basic Settings
            </TabsTrigger>
            <TabsTrigger value="access">
              <Shield /> Access Control
            </TabsTrigger>
            <TabsTrigger value="gift">
              <Gift /> Gift Registry
            </TabsTrigger>
            <TabsTrigger value="communication">
              <MessageCircle /> Communication
            </TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock />
                  <CardTitle>Response Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {/*  */}

                <Form {...moduleSettingForm}>
                  <form
                    onSubmit={moduleSettingForm.handleSubmit(handleFormSubmit)}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={moduleSettingForm.control}
                        name="rsvpDeadline"
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col items-start">
                            <FormLabel>RSVP Deadline</FormLabel>
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

                      <FormField
                        control={moduleSettingForm.control}
                        name="rsvpCapacityLimit"
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col items-start">
                            <FormLabel>Capacity Limit (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="No Limit"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={moduleSettingForm.control}
                        name="rsvpPlusOneLimit"
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col items-start">
                            <FormLabel>Plus One Limit</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="No Limit"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={moduleSettingForm.control}
                        name="rsvpResponse"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Response Options</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl className="w-full">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a response" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {responses.map((each, index) => (
                                  <SelectItem
                                    key={index}
                                    value={each}
                                  >
                                    {formatRsvpResponse(each)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <FormField
                        control={moduleSettingForm.control}
                        name="rsvpAllowPlusOne"
                        render={({ field }) => (
                          <FormItem className="flex items-start gap-2">
                            <FormLabel>Allow Plus One</FormLabel>

                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={moduleSettingForm.control}
                        name="rsvpEnableWaitlist"
                        render={({ field }) => (
                          <FormItem className="flex items-start gap-2">
                            <FormLabel>Enable Waitlist</FormLabel>

                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={moduleSettingForm.control}
                        name="rsvpCollectDietryInformation"
                        render={({ field }) => (
                          <FormItem className="flex items-start gap-2">
                            <FormLabel>Collect Dietry Information</FormLabel>

                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={moduleSettingForm.control}
                        name="rsvpEnableCustomField"
                        render={({ field }) => (
                          <FormItem className="flex items-start gap-2">
                            <FormLabel>Enable Custom Fields</FormLabel>

                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? <LoaderSpin /> : <Plus />}
                        Save Settings
                      </Button>
                    </div>
                  </form>
                </Form>

                {/*  */}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="access">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield />
                  <CardTitle>Access Control</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {/*  */}

                <Form {...moduleSettingForm}>
                  <form
                    onSubmit={moduleSettingForm.handleSubmit(handleFormSubmit)}
                    className="flex flex-col gap-4"
                  >
                    <FormField
                      control={moduleSettingForm.control}
                      name="rsvpPublicRegistration"
                      render={({ field }) => (
                        <FormItem className="flex items-start gap-2">
                          <FormLabel>Public Registration</FormLabel>

                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={moduleSettingForm.control}
                      name="rsvpRequireApproval"
                      render={({ field }) => (
                        <FormItem className="flex items-start gap-2">
                          <FormLabel>Require Approval</FormLabel>

                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={moduleSettingForm.control}
                      name="rsvpAutomaticReminder"
                      render={({ field }) => (
                        <FormItem className="flex items-start gap-2">
                          <FormLabel>Automatic Reminders</FormLabel>

                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? <LoaderSpin /> : <Plus />}
                        Save Settings
                      </Button>
                    </div>
                  </form>
                </Form>

                {/*  */}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="gift">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Gift />
                  <CardTitle>Gift Registry</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {/*  */}

                <Form {...moduleSettingForm}>
                  <form
                    onSubmit={moduleSettingForm.handleSubmit(handleFormSubmit)}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={moduleSettingForm.control}
                        name="rsvpGiftName"
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col items-start">
                            <FormLabel>Registry Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Wedding Registry"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={moduleSettingForm.control}
                        name="rsvpPlatform"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Platform</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl className="w-full">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a platform" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {platforms.map((each, index) => (
                                  <SelectItem
                                    key={index}
                                    value={each}
                                  >
                                    {formatRsvpPlatform(each)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <FormField
                        control={moduleSettingForm.control}
                        name="rsvpGiftUrl"
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col items-start">
                            <FormLabel>Registry URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://url.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={moduleSettingForm.control}
                        name="rsvpGiftDescription"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Brief note of this registry"
                                className="h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? <LoaderSpin /> : <Plus />}
                        Save Settings
                      </Button>
                    </div>
                  </form>
                </Form>

                {/*  */}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="communication">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageCircle />
                  <CardTitle>Communication Setting</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {/*  */}

                <Form {...moduleSettingForm}>
                  <form
                    onSubmit={moduleSettingForm.handleSubmit(handleFormSubmit)}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={moduleSettingForm.control}
                        name="rsvpTemplate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Invitation Template</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl className="w-full">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a platform" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {invitationTemplates.map((each, index) => (
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
                        control={moduleSettingForm.control}
                        name="rsvpReminder"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reminder Schedule</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl className="w-full">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a reminder" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {reminderSchedules.map((each, index) => (
                                  <SelectItem
                                    key={index}
                                    value={each}
                                  >
                                    {formatRsvpReminder(each)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <FormField
                        control={moduleSettingForm.control}
                        name="rsvpCommunicationMessage"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Custom Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Brief note of this registry"
                                className="h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={moduleSettingForm.control}
                        name="rsvpCommunicationSmsNotification"
                        render={({ field }) => (
                          <FormItem className="flex items-start gap-2">
                            <FormLabel className="flex flex-col items-start">
                              SMS Notifications
                              <p className="font-normal">
                                Send reminders via text message
                              </p>
                            </FormLabel>

                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? <LoaderSpin /> : <Plus />}
                        Save Settings
                      </Button>
                    </div>
                  </form>
                </Form>

                {/*  */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
