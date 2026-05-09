// "use client";

// import { Button } from "@/shadcn/ui/button";
// import { Calendar } from "@/shadcn/ui/calendar";
// import { Checkbox } from "@/shadcn/ui/checkbox";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/shadcn/ui/command";
// import {
//   Field,
//   FieldContent,
//   FieldDescription,
//   FieldError,
//   FieldLabel,
//   FieldLegend,
//   FieldSet,
// } from "@/shadcn/ui/field";
// import { Input } from "@/shadcn/ui/input";
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupInput,
// } from "@/shadcn/ui/input-group";
// import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shadcn/ui/input-otp";
// import { Label } from "@/shadcn/ui/label";
// import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
// import { RadioGroup, RadioGroupItem } from "@/shadcn/ui/radio-group";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/shadcn/ui/select";
// import { Spinner } from "@/shadcn/ui/spinner";
// import { Textarea } from "@/shadcn/ui/textarea";
// import {
//   CountryCode,
//   getCountries,
//   getCountryCallingCode,
// } from "libphonenumber-js";
// import { get } from "lodash";
// import { Check, ChevronsUpDown } from "lucide-react";
// import {
//   ComponentProps,
//   HTMLAttributes,
//   ReactNode,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import {
//   Controller,
//   FieldArray,
//   FieldArrayPath,
//   FieldValues,
//   Path,
//   useController,
//   UseFieldArrayAppend,
//   UseFormReturn,
// } from "react-hook-form";
// import z from "zod";
// import { LibDateFormatHelper } from "./lib-date";
// import { cn } from "./lib-shadcn";

// function EmptyComponent() {
//   return (
//     <Field>
//       <FieldLabel>Label</FieldLabel>
//       <Input
//         disabled
//         placeholder="disabled"
//       />
//     </Field>
//   );
// }

// export function RHFormControllerInputComponent<T extends FieldValues>({
//   form,
//   name,
//   label,
//   componentProps,
// }: {
//   form?: UseFormReturn<T>;
//   name?: Path<T>;
//   label?: string;
//   componentProps?: ComponentProps<"input">;
// }) {
//   if (!form || !name) {
//     return <EmptyComponent />;
//   }
//   return (
//     <Controller
//       name={name}
//       control={form?.control}
//       render={({ field, fieldState }) => (
//         <Field data-invalid={fieldState.invalid}>
//           <FieldLabel htmlFor={name}>{label}</FieldLabel>
//           <Input
//             {...field}
//             {...componentProps}
//             id={name}
//             aria-invalid={fieldState.invalid}
//           />
//           {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//         </Field>
//       )}
//     />
//   );
// }

// export function RHFormControllerInputOTPComponent<T extends FieldValues>({
//   form,
//   name,
//   label,
//   maxLength = 6,
// }: {
//   form?: UseFormReturn<T>;
//   name?: Path<T>;
//   label?: string;
//   maxLength?: number;
// }) {
//   if (!form || !name) {
//     return <EmptyComponent />;
//   }
//   return (
//     <Controller
//       name={name}
//       control={form?.control}
//       render={({ field, fieldState }) => (
//         <Field data-invalid={fieldState.invalid}>
//           <FieldLabel htmlFor={name}>{label}</FieldLabel>
//           <InputOTP
//             {...field}
//             maxLength={maxLength}
//             id={name}
//             aria-invalid={fieldState.invalid}
//           >
//             <InputOTPGroup>
//               {Array.from({ length: maxLength })?.map((_, index) => (
//                 <InputOTPSlot
//                   key={index}
//                   index={index}
//                 />
//               ))}
//             </InputOTPGroup>
//           </InputOTP>
//           {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//         </Field>
//       )}
//     />
//   );
// }

// export function RHFormControllerPhoneNumberCountryCodeComponent<
//   T extends FieldValues,
// >({
//   form,
//   countryCodeName,
//   phoneNumberName,
//   label,
//   phoneNumberProps,
// }: {
//   form?: UseFormReturn<T>;
//   countryCodeName?: Path<T>;
//   phoneNumberName?: Path<T>;
//   phoneNumberProps?: ComponentProps<"input">;
//   label?: string;
// }) {
//   const [countryCodes, setCountryCodes] = useState<
//     { value?: CountryCode; label?: string }[]
//   >([]);

//   const manageCountryCodes = useMemo(() => {
//     return getCountries()?.map((item) => ({
//       value: item,
//       label: `+${getCountryCallingCode(item)} ${item}`,
//     }));
//   }, []);

//   // const manageCountryCodes = useCallback(() => {
//   //   const newArray = getCountries()?.map((item) => ({
//   //     value: item,
//   //     label: `+${getCountryCallingCode(item)} ${item}`,
//   //   }));
//   //   setCountryCodes(newArray);
//   // }, []);
//   useEffect(() => {
//     setCountryCodes(manageCountryCodes);
//   }, [manageCountryCodes]);

//   if (!form || !countryCodeName || !phoneNumberName) {
//     return (
//       <Field>
//         <FieldLabel>{label ?? "Label"}</FieldLabel>
//         <Input
//           placeholder="Disabled"
//           disabled
//         />
//       </Field>
//     );
//   }

//   return (
//     <Field>
//       <FieldLabel>{label}</FieldLabel>
//       <Field
//         className="items-start gap-0.5"
//         orientation={"horizontal"}
//       >
//         <Controller
//           name={countryCodeName}
//           control={form?.control}
//           render={({ field, fieldState }) => (
//             <Field
//               data-invalid={fieldState.invalid}
//               className="w-fit max-w-25"
//             >
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     role="combobox"
//                     className="justify-between"
//                   >
//                     {countryCodes?.find((item) => item.value === field.value)
//                       ?.label ?? "+00"}
//                     <ChevronsUpDown className="opacity-50" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="p-0">
//                   <Command>
//                     <CommandInput
//                       placeholder="Search Country"
//                       className="h-9"
//                     />
//                     <CommandList>
//                       <CommandEmpty>No Country found.</CommandEmpty>
//                       <CommandGroup>
//                         {countryCodes.map((item, index) => (
//                           <CommandItem
//                             key={index}
//                             value={item.label}
//                             onSelect={() => field.onChange(item.value)}
//                           >
//                             {item.label}
//                             <Check
//                               className={cn(
//                                 "ml-auto",
//                                 item.value === field.value
//                                   ? "opacity-100"
//                                   : "opacity-0",
//                               )}
//                             />
//                           </CommandItem>
//                         ))}
//                       </CommandGroup>
//                     </CommandList>
//                   </Command>
//                 </PopoverContent>
//               </Popover>
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />
//         <Controller
//           name={phoneNumberName}
//           control={form?.control}
//           render={({ field, fieldState }) => (
//             <Field
//               data-invalid={fieldState.invalid}
//               className="flex-1"
//             >
//               <Input
//                 {...field}
//                 {...phoneNumberProps}
//                 aria-invalid={fieldState.invalid}
//               />
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />
//       </Field>
//     </Field>
//   );
// }

// export const RHFDateCalendarValidation = z.iso.datetime({
//   error: "Select a date",
// });
// export const RHFInputTimeValidation = z.iso.time({
//   error: "Select a time",
// });

// export type RHFDataType = {
//   label?: ReactNode;
//   value?: string;
//   description?: string;
// };

// export function RHFComponent<
//   T extends FieldValues,
//   TArrayName extends FieldArrayPath<T>,
// >({
//   form,
//   name,
//   label,
//   fieldType,
//   inputProps,
//   inputGroupAddonProps,
//   inputGroupAddonContent,
//   textareaProps,
//   radioGroupProps,
//   radioGroupItemProps,
//   checkboxGroupProps,
//   arrayData,

//   append,
// }: {
//   form?: UseFormReturn<T>;
//   name?: Path<T>;
//   // name?: TArrayName;
//   label?: string;
//   fieldType?:
//     | "input"
//     | "input-file"
//     | "input-group"
//     | "textarea"
//     | "radio-group"
//     | "radio-box"
//     | "checkbox-group"
//     | "checkbox-box"
//     | "select"
//     | "date-calendar"
//     | "combo-box";
//   inputProps?: ComponentProps<typeof Input>;
//   inputGroupAddonProps?: ComponentProps<typeof InputGroupAddon>;
//   inputGroupAddonContent?: ReactNode;
//   textareaProps?: ComponentProps<typeof Textarea>;
//   radioGroupProps?: ComponentProps<typeof RadioGroup>;
//   radioGroupItemProps?: ComponentProps<typeof RadioGroupItem>;
//   checkboxGroupProps?: HTMLAttributes<HTMLDivElement>;

//   append?: UseFieldArrayAppend<T>;

//   arrayData?: RHFDataType[];
// }) {
//   const {
//     field,
//     formState,
//     // fieldState: { invalid, isTouched, isDirty, error },
//     // formState: { touchedFields, dirtyFields },
//     fieldState,
//     // formState,
//   } = useController({
//     name: name ?? ("" as Path<T>),
//     control: form?.control,
//   });

//   const [popoverOpen, setPopoverOpen] = useState(false);

//   if (!form || !name || !fieldType) {
//     return <EmptyComponent />;
//   }

//   switch (fieldType) {
//     case "input":
//       return (
//         <Field data-invalid={fieldState?.invalid}>
//           {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

//           <Input
//             {...field}
//             {...inputProps}
//             id={name}
//             aria-invalid={fieldState?.invalid}
//           />

//           {fieldState?.invalid && <FieldError errors={[fieldState?.error]} />}
//         </Field>
//       );
//       break;

//     case "input-file":
//       const invalid = Boolean(get(formState.errors, name));
//       const error = {
//         message: String(get(form.formState.errors, name)?.message),
//       };
//       return (
//         <Field data-invalid={invalid}>
//           {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

//           <Input
//             // {...field}
//             {...inputProps}
//             id={name}
//             aria-invalid={invalid}
//             onChange={async (e) => {
//               // const files = e.target.files;
//               // onchange(file ? file : dataImage);
//               const files = Array.from(
//                 (e.target as HTMLInputElement).files ?? [],
//               );

//               if (append) {
//                 files?.forEach((item) => {
//                   const abc = { file: item } as FieldArray<T, TArrayName>;
//                   append(abc);
//                 });
//               }
//             }}
//           />

//           {invalid && <FieldError errors={[error]} />}
//         </Field>
//       );
//       break;

//     case "input-group":
//       return (
//         <Field data-invalid={fieldState?.invalid}>
//           {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

//           <InputGroup
//           // {...field}
//           // {...componentProps}
//           // id={name}
//           // aria-invalid={fieldState.invalid}
//           >
//             <InputGroupInput
//               {...field}
//               {...inputProps}
//               id={name}
//               aria-invalid={fieldState?.invalid}
//               //  placeholder="Search..."
//             />

//             {inputGroupAddonContent && (
//               <InputGroupAddon {...inputGroupAddonProps}>
//                 {inputGroupAddonContent}
//                 {/* <SearchIcon /> */}
//               </InputGroupAddon>
//             )}
//           </InputGroup>

//           {fieldState?.invalid && <FieldError errors={[fieldState?.error]} />}
//         </Field>
//       );
//       break;

//     case "textarea":
//       return (
//         <Field data-invalid={fieldState?.invalid}>
//           {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

//           <Textarea
//             {...field}
//             {...textareaProps}
//             id={name}
//             aria-invalid={fieldState?.invalid}
//           />

//           {fieldState?.invalid && <FieldError errors={[fieldState?.error]} />}
//         </Field>
//       );
//       break;

//     case "radio-group":
//       return (
//         <FieldSet data-invalid={fieldState?.invalid}>
//           {label && <FieldLegend>{label}</FieldLegend>}

//           <RadioGroup
//             name={name}
//             value={field?.value}
//             onValueChange={field?.onChange}
//             aria-invalid={fieldState?.invalid}
//             {...radioGroupProps}
//           >
//             {arrayData?.map((item) => {
//               return (
//                 <div
//                   className="flex items-center gap-3"
//                   key={item?.value}
//                 >
//                   <RadioGroupItem
//                     value={String(item?.value)}
//                     id={`form-radio-group-${item?.value}`}
//                     aria-invalid={fieldState.invalid}
//                     {...radioGroupItemProps}
//                   />

//                   <Label
//                     className="flex flex-1 items-center"
//                     htmlFor={`form-radio-group-${item?.value}`}
//                   >
//                     <div className="flex flex-col">{item?.label}</div>
//                     {item?.description && (
//                       <FieldDescription>{item?.description}</FieldDescription>
//                     )}
//                   </Label>
//                 </div>
//               );
//             })}
//           </RadioGroup>

//           {fieldState?.invalid && <FieldError errors={[fieldState?.error]} />}
//         </FieldSet>
//       );
//       break;

//     case "radio-box":
//       return (
//         <FieldSet data-invalid={fieldState?.invalid}>
//           {label && <FieldLegend>{label}</FieldLegend>}

//           <RadioGroup
//             name={name}
//             value={field?.value}
//             onValueChange={field?.onChange}
//             aria-invalid={fieldState?.invalid}
//             {...radioGroupProps}
//           >
//             {arrayData?.map((item) => {
//               return (
//                 <FieldLabel
//                   key={item?.value}
//                   htmlFor={`form-rhf-radiogroup-${item?.value}`}
//                 >
//                   <Field
//                     orientation={"horizontal"}
//                     data-invalid={fieldState?.invalid}
//                   >
//                     <FieldContent>
//                       <div className="flex flex-col">{item?.label}</div>
//                       {item?.description && (
//                         <FieldDescription>{item?.description}</FieldDescription>
//                       )}
//                     </FieldContent>
//                     <RadioGroupItem
//                       value={String(item?.value)}
//                       id={`form-rhf-radiogroup-${item?.value}`}
//                       aria-invalid={fieldState.invalid}
//                       {...radioGroupItemProps}
//                     />
//                   </Field>
//                 </FieldLabel>
//               );
//             })}
//           </RadioGroup>

//           {fieldState?.invalid && <FieldError errors={[fieldState?.error]} />}
//         </FieldSet>
//       );
//       break;

//     case "checkbox-group":
//       return (
//         <FieldSet data-invalid={fieldState?.invalid}>
//           {label && <FieldLegend>{label}</FieldLegend>}

//           <div
//             {...checkboxGroupProps}
//             className={`grid grid-cols-1 gap-3 ${checkboxGroupProps?.className}`}
//           >
//             {arrayData?.map((item) => {
//               return (
//                 <Field
//                   orientation={"horizontal"}
//                   key={item?.value}
//                   data-invalid={fieldState?.invalid}
//                 >
//                   <Checkbox
//                     id={`form-rhf-checkbox-${item?.value}`}
//                     name={name}
//                     aria-invalid={fieldState.invalid}
//                     checked={field.value.includes(item?.value)}
//                     onCheckedChange={(checked) => {
//                       const newValue = checked
//                         ? [...field.value, item?.value]
//                         : field.value.filter(
//                             (value: string) => value !== item?.value,
//                           );

//                       field.onChange(newValue);
//                     }}
//                   />

//                   <FieldLabel
//                     className="flex flex-1 items-center"
//                     htmlFor={`form-rhf-checkbox-${item?.value}`}
//                   >
//                     <div className="flex flex-col">{item?.label}</div>
//                     {item?.description && (
//                       <FieldDescription>{item?.description}</FieldDescription>
//                     )}
//                   </FieldLabel>
//                 </Field>
//               );
//             })}
//           </div>

//           {fieldState?.invalid && <FieldError errors={[fieldState?.error]} />}
//         </FieldSet>
//       );
//       break;

//     case "checkbox-box":
//       return (
//         <FieldSet data-invalid={fieldState?.invalid}>
//           {label && <FieldLegend>{label}</FieldLegend>}

//           <div
//             {...checkboxGroupProps}
//             className={`grid grid-cols-1 gap-3 ${checkboxGroupProps?.className}`}
//           >
//             {arrayData?.map((item) => {
//               return (
//                 <FieldLabel
//                   key={item?.value}
//                   htmlFor={`form-rhf-checkbox-${item?.value}`}
//                 >
//                   <Field
//                     orientation={"horizontal"}
//                     data-invalid={fieldState?.invalid}
//                   >
//                     <FieldContent>
//                       <div className="flex flex-col">{item?.label}</div>
//                       {item?.description && (
//                         <FieldDescription>{item?.description}</FieldDescription>
//                       )}
//                     </FieldContent>

//                     <Checkbox
//                       id={`form-rhf-checkbox-${item?.value}`}
//                       name={name}
//                       aria-invalid={fieldState.invalid}
//                       checked={field.value.includes(item?.value)}
//                       onCheckedChange={(checked) => {
//                         const newValue = checked
//                           ? [...field.value, item?.value]
//                           : field.value.filter(
//                               (value: string) => value !== item?.value,
//                             );

//                         field.onChange(newValue);
//                       }}
//                     />
//                   </Field>
//                 </FieldLabel>
//               );
//             })}
//           </div>

//           {fieldState?.invalid && <FieldError errors={[fieldState?.error]} />}
//         </FieldSet>
//       );
//       break;

//     case "select":
//       return (
//         <Field data-invalid={fieldState?.invalid}>
//           {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

//           <Select
//             // {...field}
//             // aria-invalid={fieldState?.invalid}
//             name={name}
//             value={field.value}
//             onValueChange={field.onChange}
//           >
//             <SelectTrigger
//               id={name}
//               aria-invalid={fieldState.invalid}
//             >
//               <SelectValue placeholder="Select" />
//             </SelectTrigger>
//             <SelectContent>
//               {arrayData?.map((item, key) => (
//                 <SelectItem
//                   key={key}
//                   value={String(item?.value)}
//                 >
//                   {`${item?.label} ${item?.description}`}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           {fieldState?.invalid && <FieldError errors={[fieldState?.error]} />}
//         </Field>
//       );
//       break;

//     case "date-calendar":
//       return (
//         <Field data-invalid={fieldState?.invalid}>
//           {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

//           <Popover
//             open={popoverOpen}
//             onOpenChange={setPopoverOpen}
//           >
//             <PopoverTrigger>
//               <Input
//                 {...field}
//                 {...inputProps}
//                 id={name}
//                 aria-invalid={fieldState.invalid}
//                 value={
//                   field?.value === ""
//                     ? ""
//                     : // : new Date(field?.value)?.toDateString()
//                       LibDateFormatHelper(field?.value)
//                 }
//                 // value={
//                 //   field?.value === ""
//                 //     ? ""
//                 //     : new Date(field?.value)?.toDateString()
//                 // }
//                 readOnly
//               />
//             </PopoverTrigger>

//             <PopoverContent className="flex flex-col p-0">
//               <Calendar
//                 mode="single"
//                 className="w-full"
//                 captionLayout="dropdown"
//                 selected={field.value ? new Date(field.value) : undefined}
//                 onSelect={(date) => {
//                   if (!date) return;
//                   field.onChange(date?.toISOString());
//                 }}
//                 // onSelect={(date) => {
//                 //   if (!date) return;
//                 //   const formatted = format(date, "yyyy-MM-dd");
//                 //   field.onChange(formatted);
//                 // }}
//               />
//             </PopoverContent>
//           </Popover>

//           {fieldState?.invalid && <FieldError errors={[fieldState?.error]} />}
//         </Field>
//       );
//       break;

//     case "combo-box":
//       return (
//         <Field data-invalid={fieldState?.invalid}>
//           {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

//           <Popover
//             open={popoverOpen}
//             onOpenChange={setPopoverOpen}
//           >
//             <PopoverTrigger>
//               <Input
//                 {...field}
//                 {...inputProps}
//                 id={name}
//                 aria-invalid={fieldState.invalid}
//                 readOnly
//                 value={
//                   field?.value === ""
//                     ? ""
//                     : arrayData
//                         ?.find((item) => item?.value === field?.value)
//                         ?.label?.toString()
//                 }
//               />
//             </PopoverTrigger>
//             <PopoverContent className="flex flex-col p-0">
//               <Command>
//                 <CommandInput placeholder="Search here" />
//                 <CommandList>
//                   <CommandEmpty>No item found</CommandEmpty>
//                   <CommandGroup>
//                     {arrayData?.map((item) => (
//                       <CommandItem
//                         key={item?.value}
//                         value={item?.value}
//                         onSelect={(value) => field.onChange(value)}
//                       >
//                         {item?.label}
//                       </CommandItem>
//                     ))}
//                   </CommandGroup>
//                 </CommandList>
//               </Command>
//             </PopoverContent>
//           </Popover>

//           {fieldState?.invalid && <FieldError errors={[fieldState?.error]} />}
//         </Field>
//       );
//       break;

//     default:
//       break;
//   }
// }

// export function RHFormControllerCheckboxComponent<T extends FieldValues>({
//   form,
//   name,
//   label,
// }: {
//   form?: UseFormReturn<T>;
//   name?: Path<T>;
//   label?: string;
// }) {
//   if (!form || !name) {
//     return <EmptyComponent />;
//   }
//   return (
//     <Controller
//       name={name}
//       control={form?.control}
//       render={({ field, fieldState }) => (
//         <Field
//           orientation={"horizontal"}
//           data-invalid={fieldState.invalid}
//         >
//           <Checkbox
//             id={name}
//             name={field.name}
//             checked={field.value}
//             onCheckedChange={field.onChange}
//           />
//           <FieldLabel htmlFor={name}>{label}</FieldLabel>
//           {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//         </Field>
//       )}
//     />
//   );
// }

// export function RHFormButtonComponent<T extends FieldValues>({
//   form,
//   text,
// }: {
//   form?: UseFormReturn<T>;
//   text?: string;
// }) {
//   return (
//     <button
//       type="submit"
//       className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-linear-to-r from-purple-600 to-blue-600 py-2 font-medium text-white hover:brightness-90 disabled:cursor-progress"
//       disabled={form?.formState?.isSubmitting}
//     >
//       {form?.formState?.isSubmitting ? <Spinner /> : ""}
//       <span>{text}</span>
//     </button>
//   );
// }
