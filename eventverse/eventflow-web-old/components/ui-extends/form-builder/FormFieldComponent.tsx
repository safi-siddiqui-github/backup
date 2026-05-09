import {
  createFormField,
  deleteFormField,
  findFormField,
  findFormFieldWhereModuleId,
  FormFieldWithSubsOne,
  switchFormField,
  updateFormField,
} from "@/actions/form-field";
import {
  createFormOption,
  deleteFormOption,
  findFormOptionWhereFormFieldId,
} from "@/actions/form-option";
import { ModuleWithSubsTwo } from "@/actions/module";
import { cn } from "@/lib/utils";
import { formFieldSchema } from "@/lib/validation/form-field";
import { formOptionSchema } from "@/lib/validation/form-option";
import { FormField as FormFieldPrisma, FormOption } from "@/prisma/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookText, Edit, Plus, Trash } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Switch } from "../../ui/switch";
import LoaderSpin from "../LoaderSpin";
import DragDropItem from "./DragDropItem";
import DropItem from "./DropItem";
import FieldView from "./FieldView";

export default function FormFieldComponent(props: {
  module: ModuleWithSubsTwo;
}) {
  const moduleD = props?.module;
  const dialogRef = useRef<HTMLButtonElement>(null);
  const dialogOptionRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formOptions, setFormOptions] = useState<FormOption[]>([]);
  const [formFields, setFormFields] = useState<FormFieldWithSubsOne[]>([]);
  const [formField, setFormField] = useState<FormFieldPrisma | null>(null);
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
  const findFormFieldsFN = useCallback(async () => {
    setIsLoading(true);

    const formFields = await findFormFieldWhereModuleId(moduleD?.id ?? 0);
    setFormFields(formFields);

    setIsLoading(false);
  }, [moduleD]);
  //
  const handleDropItemTrigger = useCallback(
    async (e: Event) => {
      setIsLoading(true);

      const customEvent = e as CustomEvent;
      // const { item, dropResult } = customEvent.detail;
      const { item } = customEvent.detail;

      await createFormField(item, moduleD?.id ?? 0);
      await findFormFieldsFN();

      setIsLoading(false);
    },
    [moduleD, findFormFieldsFN],
  );
  //
  useEffect(() => {
    findFormFieldsFN();

    window.addEventListener("dropItemTrigger", handleDropItemTrigger);
    return () =>
      window.removeEventListener("dropItemTrigger", handleDropItemTrigger);
  }, [handleDropItemTrigger, findFormFieldsFN]);
  //
  const deleteFormFieldFN = async (id: number) => {
    setIsLoading(true);
    await deleteFormField(id);
    await findFormFieldsFN();
    setIsLoading(false);
  };
  //
  const formFieldForm = useForm<z.infer<typeof formFieldSchema>>({
    resolver: zodResolver(formFieldSchema),
    values: {
      name: formField?.name ?? "",
      placeholder: formField?.placeholder ?? "",
      isRequired: formField?.isRequired ?? false,
      type: formField?.type ?? "TEXT",
    },
  });
  //
  async function handleFormFieldFormSubmit(
    values: z.infer<typeof formFieldForm>,
  ) {
    setIsLoading(true);
    const data = values as typeof formFieldForm;

    await updateFormField({
      id: formField?.id ?? 0,
      ...data,
    });

    await findFormFieldsFN();
    setIsLoading(false);
  }
  //
  const findFormFieldFN = async (id: number) => {
    setIsLoading(true);
    const formField = await findFormField(id);
    setFormField(formField);
    setIsLoading(false);
  };
  //
  const updateTrigger = async (id: number) => {
    setIsLoading(true);
    dialogRef?.current?.click();
    await findFormFieldFN(id);
    setIsLoading(false);
  };
  //
  const moveField = useCallback(
    async (dragId: number, hoverId: number) => {
      setIsLoading(true);
      await switchFormField(dragId, hoverId);
      await findFormFieldsFN();
      setIsLoading(false);
    },
    [findFormFieldsFN],
  );
  //
  const findOptions = useCallback(async () => {
    setIsLoading(true);

    if (formField) {
      const formOptions = await findFormOptionWhereFormFieldId(
        formField?.id ?? 0,
      );
      setFormOptions(formOptions);
    }

    setIsLoading(false);
  }, [formField]);
  //
  const updateOptionTrigger = async (id: number) => {
    setIsLoading(true);
    dialogOptionRef?.current?.click();
    await findFormFieldFN(id);
    setIsLoading(false);
  };
  //
  useEffect(() => {
    findOptions();
  }, [findOptions, formField]);
  //
  const formFieldOptionForm = useForm<z.infer<typeof formOptionSchema>>({
    resolver: zodResolver(formOptionSchema),
    values: {
      name: "",
      formFieldTypeId: "0",
      formFieldId: String(formField?.id ?? ""),
    },
  });
  //
  async function handleFormOptionSubmit(
    values: z.infer<typeof formFieldOptionForm>,
  ) {
    setIsLoading(true);
    const data = values as typeof formFieldOptionForm;

    await createFormOption({
      id: 0,
      ...data,
    });

    await findOptions();
    await findFormFieldsFN();

    setIsLoading(false);
  }
  //
  const deleteFormOptionFN = async (id: number) => {
    setIsLoading(true);
    await deleteFormOption(id);
    await findOptions();
    await findFormFieldsFN();
    setIsLoading(false);
  };
  //
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookText />
          <CardTitle>Form Builder Canvas</CardTitle>
          {isLoading && <LoaderSpin />}
        </div>
        <CardDescription>View fields added to form</CardDescription>
      </CardHeader>
      <DropItem type="box">
        <CardContent
          className={cn("flex min-h-96 flex-col gap-4", {
            "animate-pulse": isLoading,
          })}
        >
          {/*  */}

          {formFields?.map((each) => (
            <DragDropItem
              key={each?.id}
              index={each?.id}
              type="card"
              moveField={moveField}
            >
              <Card>
                <CardContent className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={each?.isRequired ? "default" : "outline"}>
                        {each?.isRequired ? "Required" : "Standard"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      {each?.type !== "TEXT" && each?.type !== "TEXTAREA" ? (
                        <Button
                          onClick={() => updateOptionTrigger(each?.id)}
                          type="button"
                        >
                          Options
                        </Button>
                      ) : null}

                      <Button
                        variant={"outline"}
                        onClick={() => updateTrigger(each?.id)}
                      >
                        <Edit />
                      </Button>
                      <Button
                        variant={"destructive"}
                        onClick={() => deleteFormFieldFN(each?.id)}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </div>

                  <FieldView formfield={each} />
                </CardContent>
              </Card>
            </DragDropItem>
          ))}

          {/*  */}
        </CardContent>
      </DropItem>

      {/*  */}

      <Dialog>
        <DialogTrigger
          asChild
          ref={dialogRef}
          className="hidden"
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
            <Form {...formFieldForm}>
              <form
                onSubmit={formFieldForm.handleSubmit(handleFormFieldFormSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={formFieldForm.control}
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
                  control={formFieldForm.control}
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
                  control={formFieldForm.control}
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
                  control={formFieldForm.control}
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

      <Dialog>
        <DialogTrigger ref={dialogOptionRef}></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Form Option</DialogTitle>
            <DialogDescription>Add Options into To fields</DialogDescription>
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

            <Form {...formFieldOptionForm}>
              <form
                onSubmit={formFieldOptionForm.handleSubmit(
                  handleFormOptionSubmit,
                )}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={formFieldOptionForm.control}
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
    </Card>
  );
}
