"use client";

import { ModuleWithSubsTwo } from "@/actions/module";
import {
  deleteGuestGroup,
  findColors,
  findGuestGroup,
  findGuestGroupWhereModuleId,
  upsertGuestGroup,
} from "@/actions/rsvp";
import ColorBox from "@/components/ui-extends/ColorBox";
import LoaderSpin from "@/components/ui-extends/LoaderSpin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
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
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { guestGroupSchema } from "@/lib/validation/rsvp";
import { Color, GuestGroup } from "@/prisma/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Loader, Plus, Settings, Trash } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type GuestGroupFormType = z.infer<typeof guestGroupSchema>;

export default function RsvpGuestGroup(props: { module: ModuleWithSubsTwo }) {
  const moduleD = props?.module;
  const dialogRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [guestGroups, setGuestGroups] = useState<GuestGroup[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [guestGroup, setGuestGroup] = useState<GuestGroup | null>(null);
  //
  const findGuestGroupsFN = useCallback(async () => {
    setIsLoading(true);
    if (moduleD) {
      const data = await findGuestGroupWhereModuleId(moduleD.id ?? 0);
      setGuestGroups(data);
    }
    setIsLoading(false);
  }, [moduleD]);
  //
  const findColorsFN = useCallback(async () => {
    setIsLoading(true);
    const result = await findColors();
    setColors(result);
    setIsLoading(false);
  }, []);
  //
  useEffect(() => {
    findGuestGroupsFN();
    findColorsFN();
  }, [findColorsFN, findGuestGroupsFN]);
  //
  const guestGroupForm = useForm<GuestGroupFormType>({
    resolver: zodResolver(guestGroupSchema),
    values: {
      name: guestGroup?.name ?? "",
      description: guestGroup?.description ?? "",
      memberLimit: String(guestGroup?.memberLimit ?? ""),
      moduleId: String(moduleD?.id ?? ""),
      color: guestGroup?.color ?? "NONE",
    },
  });
  //
  async function handleFormSubmit(values: GuestGroupFormType) {
    setIsLoading(true);
    await upsertGuestGroup({
      id: guestGroup?.id ?? 0,
      ...values,
    });
    await findGuestGroupsFN();
    setIsLoading(false);
  }
  //
  const updateTrigger = async (id: number) => {
    setIsLoading(true);
    dialogRef?.current?.click();
    const guestGroup = await findGuestGroup(id);
    setGuestGroup(guestGroup);
    setIsLoading(false);
  };
  //
  const deleteGuestGroupFN = async (id: number) => {
    setIsLoading(true);
    await deleteGuestGroup(id);
    await findGuestGroupsFN();
    setIsLoading(false);
  };
  //
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col">
          <p className="text-xl font-medium">Manage Guest Groups</p>
          <p className="">Organize your guests into different categories</p>
          {isLoading && <LoaderSpin />}
        </div>

        <Dialog>
          <DialogTrigger
            asChild
            ref={dialogRef}
          >
            <Button>
              <Settings />
              Manage Groups
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage Guest Groups</DialogTitle>
              <DialogDescription>
                Collaborate Safely with External Users
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <Form {...guestGroupForm}>
                <form
                  onSubmit={guestGroupForm.handleSubmit(handleFormSubmit)}
                  className="flex flex-col gap-4"
                >
                  <FormField
                    control={guestGroupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-col items-start">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="eg: VIP Guests, Family, Friends"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={guestGroupForm.control}
                    name="memberLimit"
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-col items-start">
                        <FormLabel>Member Limit (Optional)</FormLabel>
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
                    control={guestGroupForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description of this group"
                            className="h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={guestGroupForm.control}
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
                                      "h-8 w-8 overflow-hidden rounded-full outline-black",
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
                      {isLoading ? (
                        <Loader className="animate-spin" />
                      ) : (
                        <Plus />
                      )}
                      Save Group
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {guestGroups?.map((each) => (
          <Card key={each?.id}>
            <CardHeader className="flex gap-2">
              <div className="h-5 w-5 overflow-hidden rounded-full">
                <ColorBox color={each?.color ?? ""} />
              </div>

              <div className="flex flex-col">
                <CardTitle>{each?.name}</CardTitle>
                <CardDescription>{each?.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-1 items-end gap-2">
                  <p className="">Total Invited:</p>
                  <p className="text-xl font-semibold">10</p>
                </div>
                <div className="flex flex-1 items-end gap-2">
                  <p className="">Attending:</p>
                  <p className="text-xl font-semibold">4</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-end justify-between gap-2">
                  <p className="">Limit</p>
                  <p className="text-xl font-semibold">{each?.memberLimit}</p>
                </div>
                <Progress value={25} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant={"outline"}
                onClick={() => updateTrigger(each?.id)}
              >
                <Edit />
                Update
              </Button>

              <Button
                variant={"destructive"}
                onClick={() => deleteGuestGroupFN(each?.id)}
              >
                <Trash />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
