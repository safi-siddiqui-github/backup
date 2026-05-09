"use client";

import { ModuleWithSubsTwo } from "@/actions/module";
import {
  createBulkGuestList,
  deleteGuestList,
  findGuestGroupWhereModuleId,
  findGuestList,
  findGuestListWhereModuleId,
  GuestListWithSubs,
  upsertGuestList,
} from "@/actions/rsvp";
import ColorBox from "@/components/ui-extends/ColorBox";
import { DataTable } from "@/components/ui-extends/DataTable";
import LoaderSpin from "@/components/ui-extends/LoaderSpin";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { guestListBulkSchema, guestListSchema } from "@/lib/validation/rsvp";

import { GuestGroup, GuestList } from "@/prisma/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import {
  BookText,
  Clock,
  Edit,
  LayoutDashboard,
  Loader,
  Mail,
  Plus,
  Settings,
  Trash,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type GuestListFormType = z.infer<typeof guestListSchema>;
type GuestListBulkFormType = z.infer<typeof guestListBulkSchema>;

export default function RsvpGuestList(props: { module: ModuleWithSubsTwo }) {
  const moduleD = props?.module;
  const dialogRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [guestLists, setGuestLists] = useState<GuestListWithSubs[]>([]);
  const [guestList, setGuestList] = useState<GuestList | null>(null);
  const [guestGroups, setGuestGroups] = useState<GuestGroup[]>([]);
  const [tabValue, setTabValue] = useState("");
  //
  useEffect(() => {
    setTabValue(localStorage.getItem("dashboardRsvpGuestTab") ?? "single");
  }, []);
  //
  function handleTabsChange(value: string) {
    localStorage.setItem("dashboardRsvpGuestTab", value);
    setTabValue(value);
  }
  //
  const findGuestLists = useCallback(async () => {
    setIsLoading(true);
    if (moduleD) {
      const data = await findGuestListWhereModuleId(moduleD.id ?? 0);
      setGuestLists(data);
    }
    setIsLoading(false);
  }, [moduleD]);
  //
  const findGuestGroups = useCallback(async () => {
    setIsLoading(true);
    if (moduleD) {
      const data = await findGuestGroupWhereModuleId(moduleD.id ?? 0);
      setGuestGroups(data);
    }
    setIsLoading(false);
  }, [moduleD]);
  //
  useEffect(() => {
    findGuestLists();
    findGuestGroups();
  }, [findGuestLists, findGuestGroups]);
  //
  const guestListForm = useForm<GuestListFormType>({
    resolver: zodResolver(guestListSchema),
    values: {
      name: guestList?.name ?? "",
      email: guestList?.email ?? "",
      note: guestList?.note ?? "",
      phone: guestList?.phone ?? "",
      plusOne: String(guestList?.plusOne ?? ""),
      guestGroupId: String(guestList?.guestGroupId),
      dietryRestriction: guestList?.dietryRestriction ?? "",
      moduleId: String(moduleD?.id ?? ""),
    },
  });
  //
  async function handleFormSubmit(values: GuestListFormType) {
    setIsLoading(true);
    await upsertGuestList({
      id: guestList?.id ?? 0,
      ...values,
    });
    await findGuestLists();
    setIsLoading(false);
  }
  //
  const guestListBulkForm = useForm<GuestListBulkFormType>({
    resolver: zodResolver(guestListBulkSchema),
    values: {
      emailAddresses: "",
      guestGroupId: "",
      moduleId: String(moduleD?.id ?? ""),
    },
  });
  //
  async function handleFormBulkSubmit(values: GuestListBulkFormType) {
    setIsLoading(true);
    await createBulkGuestList(values);
    await findGuestLists();
    setIsLoading(false);
  }
  //
  const updateTrigger = async (id: number) => {
    setIsLoading(true);
    setTabValue("single");
    dialogRef?.current?.click();
    const guestList = await findGuestList(id);
    setGuestList(guestList);
    setIsLoading(false);
  };
  //
  const deleteGuestListFN = async (id: number) => {
    setIsLoading(true);
    await deleteGuestList(id);
    await findGuestLists();
    setIsLoading(false);
  };
  //
  const columns: ColumnDef<GuestListWithSubs>[] = [
    {
      header: "Name",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col">
            <p className="font-medium">{row?.original?.name}</p>
            <p className="">Dietry: {row?.original?.dietryRestriction}</p>
          </div>
        );
      },
    },
    {
      header: "Contact",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col">
            <p className="font-medium">{row?.original?.email}</p>
            <p className="">{row?.original?.phone}</p>
          </div>
        );
      },
    },
    {
      header: "Group",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 overflow-hidden rounded-full">
              <ColorBox color={row?.original?.guestGroup?.color ?? ""} />
            </div>
            <p className="font-medium">
              {row?.original?.guestGroup?.name ?? "No Group"}
            </p>
          </div>
        );
      },
    },
    {
      header: "Status",
      cell: () => {
        return (
          <div className="flex items-center gap-2">
            <Clock className="size-4" />
            <p className="">pending</p>
          </div>
        );
      },
    },
    {
      accessorKey: "plusOne",
      header: "Plus One",
    },
    {
      header: "Invited",
      cell: () => {
        return (
          <div className="flex flex-col">
            <p className="font-medium">1/15/2024</p>
            <p className="">Responded: 1/18/2024</p>
          </div>
        );
      },
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Button onClick={() => updateTrigger(row?.original?.id)}>
              <Edit />
            </Button>
            <Button>
              <Mail />
            </Button>
            <Button onClick={() => deleteGuestListFN(row?.original?.id)}>
              <Trash />
            </Button>
          </div>
        );
      },
    },
  ];
  //
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col">
          <p className="text-xl font-medium">Manage Guest Lists</p>
          <p className="">Manage your guests into different groups</p>
          {isLoading && <LoaderSpin />}
        </div>

        <Dialog>
          <DialogTrigger
            asChild
            ref={dialogRef}
          >
            <Button>
              <Settings />
              Manage Guest Lists
            </Button>
          </DialogTrigger>
          <DialogContent className="h-fit max-h-full w-full overflow-auto">
            <DialogHeader>
              <DialogTitle>Manage Guest List</DialogTitle>
              <DialogDescription>
                Collaborate Safely with External Users
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              {/*  */}

              <Tabs
                value={tabValue}
                onValueChange={handleTabsChange}
                className="gap-8"
              >
                <TabsList className="h-fit w-full justify-start overflow-x-auto py-4 sm:py-1">
                  <TabsTrigger value="single">
                    <LayoutDashboard /> Single
                  </TabsTrigger>
                  <TabsTrigger value="bulk">
                    <BookText /> Bulk
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="single">
                  <Form {...guestListForm}>
                    <form
                      onSubmit={guestListForm.handleSubmit(handleFormSubmit)}
                      className="flex flex-col gap-4"
                    >
                      <FormField
                        control={guestListForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col items-start">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={guestListForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col items-start">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="johndoe@gmail.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={guestListForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col items-start">
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+1 (555) 123-4567"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={guestListForm.control}
                        name="plusOne"
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col items-start">
                            <FormLabel>Plus Ones</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="No Plus Ones"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={guestListForm.control}
                        name="dietryRestriction"
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col items-start">
                            <FormLabel>Dietry Restriction</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Vegetarian, Vegan, Gluten-free, etc"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={guestListForm.control}
                        name="note"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Note</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Brief note of this group"
                                className="h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={guestListForm.control}
                        name="guestGroupId"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormLabel>Colors</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-wrap items-center gap-2"
                              >
                                <FormItem>
                                  <FormControl>
                                    <RadioGroupItem
                                      value="none"
                                      className="hidden"
                                    />
                                  </FormControl>

                                  <Button
                                    variant={
                                      field.value == "none"
                                        ? "default"
                                        : "outline"
                                    }
                                    type="button"
                                    asChild
                                  >
                                    <FormLabel className="">No Group</FormLabel>
                                  </Button>
                                </FormItem>

                                {guestGroups?.map((each) => (
                                  <FormItem key={each?.id}>
                                    <FormControl>
                                      <RadioGroupItem
                                        value={String(each?.id ?? 0)}
                                        className="hidden"
                                      />
                                    </FormControl>
                                    <Button
                                      variant={
                                        field.value == String(each?.id)
                                          ? "default"
                                          : "outline"
                                      }
                                      type="button"
                                      asChild
                                    >
                                      <FormLabel className="">
                                        <div className="h-2 w-2 overflow-hidden rounded-full">
                                          <ColorBox color={each?.color ?? ""} />
                                        </div>
                                        {each?.name}
                                      </FormLabel>
                                    </Button>
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
                          {isLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            <Plus />
                          )}
                          Save Guest
                        </Button>
                      </div>
                    </form>
                  </Form>
                </TabsContent>

                <TabsContent value="bulk">
                  <Form {...guestListBulkForm}>
                    <form
                      onSubmit={guestListBulkForm.handleSubmit(
                        handleFormBulkSubmit,
                      )}
                      className="flex flex-col gap-4"
                    >
                      <FormField
                        control={guestListBulkForm.control}
                        name="emailAddresses"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Emal Addresses</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter email addresses"
                                className="h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={guestListBulkForm.control}
                        name="guestGroupId"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormLabel>Colors</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-wrap items-center gap-2"
                              >
                                <FormItem>
                                  <FormControl>
                                    <RadioGroupItem
                                      value="none"
                                      className="hidden"
                                    />
                                  </FormControl>
                                  <Button
                                    variant={
                                      field.value == "none"
                                        ? "default"
                                        : "outline"
                                    }
                                    type="button"
                                    asChild
                                  >
                                    <FormLabel className="">No Group</FormLabel>
                                  </Button>
                                </FormItem>

                                {guestGroups?.map((each) => (
                                  <FormItem key={each?.id}>
                                    <FormControl>
                                      <RadioGroupItem
                                        value={String(each?.id ?? 0)}
                                        className="hidden"
                                      />
                                    </FormControl>
                                    <Button
                                      variant={
                                        field.value == String(each?.id)
                                          ? "default"
                                          : "outline"
                                      }
                                      type="button"
                                      asChild
                                    >
                                      <FormLabel className="">
                                        <div className="h-2 w-2 overflow-hidden rounded-full">
                                          <ColorBox color={each?.color ?? ""} />
                                        </div>
                                        {each?.name}
                                      </FormLabel>
                                    </Button>
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
                          {isLoading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            <Plus />
                          )}
                          Save Guest
                        </Button>
                      </div>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>

              {/*  */}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={columns}
        data={guestLists}
      />
    </div>
  );
}
