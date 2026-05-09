import {
  deleteFormFieldType,
  findFormFieldType,
  findFormFieldTypes,
  upsertFormFieldType,
} from "@/actions/form-field-type";
import {
  createFormOption,
  deleteFormOption,
  findFormOptionWhereFormFieldTypeId,
} from "@/actions/form-option";
import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formFieldTypeSchema } from "@/lib/validation/form-field-type";
import { formOptionSchema } from "@/lib/validation/form-option";
import { FormFieldType, FormOption } from "@/prisma/generated";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookText, Edit, Eye, Plus, Trash } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import LoaderSpin from "../LoaderSpin";
import DragItem from "./DragItem";

export default function FormTypeComponent() {
  const dialogRef = useRef<HTMLButtonElement>(null);
  const dialogOptionRef = useRef<HTMLButtonElement>(null);
  const user = useUser();
  const [tabValue, setTabValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formFieldType, setFormFieldType] = useState<FormFieldType | null>(
    null,
  );
  const [formOptions, setFormOptions] = useState<FormOption[]>([]);
  const [formFieldTypes, setFormFieldTypes] = useState<FormFieldType[]>([]);
  const [formFieldTypesCustom, setFormFieldTypesCustom] = useState<
    FormFieldType[]
  >([]);
  //
  const formTypes = useMemo(
    () => [
      {
        name: "Text Input",
        value: "TEXT",
      },
      {
        name: "Long Text",
        value: "TEXTAREA",
      },
      {
        name: "Multiple Choice",
        value: "RADIO",
      },
      {
        name: "Dropdown",
        value: "SELECT",
      },
      {
        name: "Checkboxes",
        value: "CHECKBOX",
      },
    ],
    [],
  );
  //
  function handleTabsChange(value: string) {
    localStorage.setItem("dashboardRsvpFormInnerTab", value);
    setTabValue(value);
  }
  //
  const findFormFieldTypesFN = useCallback(async () => {
    setIsLoading(true);
    const formFieldTypes = await findFormFieldTypes();
    setFormFieldTypes(formFieldTypes);
    setIsLoading(false);
  }, []);
  //
  const findFormFieldTypesCustomFN = useCallback(async () => {
    setIsLoading(true);
    const userId = user?.isLoaded ? user?.user?.id : "";
    const formFieldTypesCustom = await findFormFieldTypes(userId);
    setFormFieldTypesCustom(formFieldTypesCustom);

    setIsLoading(false);
  }, [user?.isLoaded, user?.user?.id]);
  //
  useEffect(() => {
    setTabValue(
      localStorage.getItem("dashboardRsvpFormInnerTab") ?? "standard",
    );

    findFormFieldTypesFN();
    findFormFieldTypesCustomFN();
  }, [findFormFieldTypesFN, findFormFieldTypesCustomFN]);
  //
  const formFieldTypeForm = useForm<z.infer<typeof formFieldTypeSchema>>({
    resolver: zodResolver(formFieldTypeSchema),
    values: {
      name: formFieldType?.name ?? "",
      placeholder: formFieldType?.placeholder ?? "",
      isRequired: formFieldType?.isRequired ?? false,
      type: formFieldType?.type ?? "TEXT",
      userId: String(
        formFieldType?.userId ?? (user?.isLoaded ? user?.user?.id : ""),
      ),
    },
  });
  //
  const deleteFormFieldTypeFN = async (id: number) => {
    setIsLoading(true);
    await deleteFormFieldType(id);
    await findFormFieldTypesCustomFN();
    setIsLoading(false);
  };
  //
  async function handleSubmit(values: z.infer<typeof formFieldTypeForm>) {
    setIsLoading(true);
    const data = values as typeof formFieldTypeForm;

    await upsertFormFieldType({
      id: formFieldType?.id ?? 0,
      ...data,
    });

    await findFormFieldTypesCustomFN();
    setIsLoading(false);
  }
  //
  const findOptions = useCallback(async () => {
    setIsLoading(true);

    if (formFieldType) {
      const formOptions = await findFormOptionWhereFormFieldTypeId(
        formFieldType?.id ?? 0,
      );
      setFormOptions(formOptions);
    }

    setIsLoading(false);
  }, [formFieldType]);
  //
  const updateTrigger = async (id: number) => {
    setIsLoading(true);
    dialogRef?.current?.click();
    const formFieldType = await findFormFieldType(id);
    setFormFieldType(formFieldType);
    setIsLoading(false);
  };
  //
  const updateOptionTrigger = async (id: number) => {
    setIsLoading(true);
    dialogOptionRef?.current?.click();
    const formFieldType = await findFormFieldType(id);
    setFormFieldType(formFieldType);
    setIsLoading(false);
  };
  //
  useEffect(() => {
    findOptions();
  }, [findOptions, formFieldType]);
  //
  const formFieldTypeOptionForm = useForm<z.infer<typeof formOptionSchema>>({
    resolver: zodResolver(formOptionSchema),
    values: {
      name: "",
      formFieldTypeId: String(formFieldType?.id ?? ""),
      formFieldId: "0",
    },
  });
  //
  async function handleFormOptionSubmit(
    values: z.infer<typeof formFieldTypeOptionForm>,
  ) {
    setIsLoading(true);
    const data = values as typeof formFieldTypeOptionForm;

    await createFormOption({
      id: 0,
      ...data,
    });

    await findOptions();
    setIsLoading(false);
  }
  //
  const deleteFormOptionFN = async (id: number) => {
    setIsLoading(true);
    await deleteFormOption(id);
    await findOptions();
    setIsLoading(false);
  };
  //
  return (
    <Card className="">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookText />
          <CardTitle>Field Library</CardTitle>
          {isLoading && <LoaderSpin />}
        </div>
        <CardDescription>Drag fields to add them to your form</CardDescription>
      </CardHeader>
      <CardContent className="">
        {/*  */}

        <Tabs
          value={tabValue}
          onValueChange={handleTabsChange}
          className="h-fit gap-4"
        >
          <TabsList className="h-fit w-full justify-start overflow-x-auto py-4 sm:py-1">
            <TabsTrigger value="standard">
              <BookText /> Standard
            </TabsTrigger>
            <TabsTrigger value="custom">
              <Eye /> Custom
            </TabsTrigger>
          </TabsList>
          <TabsContent value="standard">
            {/*  */}

            {formFieldTypes?.map((each) => (
              <DragItem
                key={each?.id}
                type="box"
                itemData={each}
              >
                <Card>
                  <CardContent className="flex flex-col gap-2">
                    <Badge>{each?.isRequired ? "Required" : "Standard"}</Badge>
                    <CardTitle>{each?.name}</CardTitle>
                    <CardDescription>{each?.placeholder}</CardDescription>
                  </CardContent>
                </Card>
              </DragItem>
            ))}

            {/*  */}
          </TabsContent>

          <TabsContent value="custom">
            {/*  */}

            <Dialog>
              <DialogTrigger
                asChild
                ref={dialogRef}
              >
                <Button>
                  <Plus />
                  Form Field
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Form Field</DialogTitle>
                  <DialogDescription>
                    Add Custom Fields into Form Builder
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                  <Form {...formFieldTypeForm}>
                    <form
                      onSubmit={formFieldTypeForm.handleSubmit(handleSubmit)}
                      className="flex flex-col gap-4"
                    >
                      <FormField
                        control={formFieldTypeForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col items-start">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="eg: Full Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={formFieldTypeForm.control}
                        name="placeholder"
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col items-start">
                            <FormLabel>Placeholder</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="eg: Enter full name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={formFieldTypeForm.control}
                        name="isRequired"
                        render={({ field }) => (
                          <FormItem className="flex items-start gap-2">
                            <FormLabel>Required</FormLabel>

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
                        control={formFieldTypeForm.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl className="w-full">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a field" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {formTypes?.map((each, index) => (
                                  <SelectItem
                                    key={index}
                                    value={each.value}
                                  >
                                    {each.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
                          Save Field
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>

            {/*  */}

            {formFieldTypesCustom?.map((each) => (
              <DragItem
                key={each?.id}
                type="box"
                itemData={each}
              >
                <Card>
                  <CardContent className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center justify-between"></div>
                    <div className="flex items-center gap-2">
                      <Badge variant={each?.isRequired ? "default" : "outline"}>
                        {each?.isRequired ? "Required" : "Standard"}
                      </Badge>
                    </div>

                    <CardTitle>{each?.name}</CardTitle>
                    <CardDescription>{each?.placeholder}</CardDescription>
                  </CardContent>

                  <CardFooter>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={"outline"}
                        onClick={() => updateTrigger(each?.id)}
                        type="button"
                      >
                        <Edit />
                      </Button>
                      <Button
                        variant={"destructive"}
                        onClick={() => deleteFormFieldTypeFN(each?.id)}
                        type="button"
                      >
                        <Trash />
                      </Button>

                      {each?.type !== "TEXT" && each?.type !== "TEXTAREA" ? (
                        <Button
                          onClick={() => updateOptionTrigger(each?.id)}
                          type="button"
                        >
                          Options
                        </Button>
                      ) : null}
                    </div>
                  </CardFooter>
                </Card>
              </DragItem>
            ))}

            {/*  */}

            <Dialog>
              <DialogTrigger ref={dialogOptionRef}></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Form Option</DialogTitle>
                  <DialogDescription>
                    Add Options into To fields
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                  {formOptions?.map((each) => (
                    <div
                      className="flex items-center justify-between text-sm"
                      key={each?.id}
                    >
                      <p className="">{each?.name}</p>
                      <Button
                        onClick={() => deleteFormOptionFN(each?.id)}
                        type="button"
                      >
                        <Trash />
                      </Button>
                    </div>
                  ))}

                  <Form {...formFieldTypeOptionForm}>
                    <form
                      onSubmit={formFieldTypeOptionForm.handleSubmit(
                        handleFormOptionSubmit,
                      )}
                      className="flex flex-col gap-4"
                    >
                      <FormField
                        control={formFieldTypeOptionForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="flex flex-1 flex-col items-start">
                            <FormControl>
                              <Input
                                placeholder="eg: Enter option"
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
                          Save Options
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>

            {/*  */}
          </TabsContent>
        </Tabs>

        {/*  */}
      </CardContent>
    </Card>
  );
}
