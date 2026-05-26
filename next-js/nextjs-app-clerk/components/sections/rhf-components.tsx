import { ResponseBodyType } from "@/lib/responses-hanlder/response-types";
import { ComponentProps, ReactNode } from "react";
import {
  FieldValues,
  Path,
  useController,
  UseFormReturn,
} from "react-hook-form";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";

export const RHFFormHandler = <T extends FieldValues>(
  // callback: () => Promise<ResponseBodyType>,
  response: ResponseBodyType,
  form: UseFormReturn<T>,
  // ):  Promise<ResponseBodyType> => {
): ResponseBodyType => {
  try {
    // const response = await callback();
    if (!response?.success) {
      for (const detail of response?.error ?? []) {
        form.setError(detail?.path[0] as Path<T>, detail);
      }
    }
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: "RHFFormHandler Unknown Error",
    };
  }
};

const RHFEmptyComponent = () => {
  return (
    <Field>
      <FieldLabel>Label</FieldLabel>
      <Input
        disabled
        placeholder="disabled"
      />
    </Field>
  );
};

export const RHFButtonComponent = <T extends FieldValues>({
  rhfform,
  children,
  type,
  icon,
  ...buttonProps
}: ComponentProps<typeof Button> & {
  rhfform: UseFormReturn<T>;
  icon?: ReactNode;
}) => {
  return (
    <Button
      type={type ?? "submit"}
      disabled={rhfform?.formState?.isSubmitting}
      {...buttonProps}
    >
      {/* {rhfform?.formState?.isSubmitting ? <Spinner /> : null} */}
      {rhfform?.formState?.isSubmitting ? <Spinner /> : icon}
      {children}
    </Button>
  );
};

export const RHFInputComponent = <T extends FieldValues>({
  form,
  inputProps,
  labelProps,
  label,
  name,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  labelProps?: ComponentProps<typeof FieldLabel>;
  inputProps?: ComponentProps<typeof Input>;
}) => {
  const { field, formState, fieldState } = useController({
    name: name,
    control: form?.control,
  });

  if (!form || !name) {
    return <RHFEmptyComponent />;
  }

  return (
    <Field data-invalid={fieldState?.invalid}>
      {label && (
        <FieldLabel
          {...labelProps}
          htmlFor={name}
        >
          {label}
        </FieldLabel>
      )}

      <Input
        {...field}
        {...inputProps}
        id={name}
        aria-invalid={fieldState?.invalid}
      />

      {fieldState?.invalid && <FieldError errors={[fieldState?.error]} />}
    </Field>
  );
};

export const RHFTextareaComponent = <T extends FieldValues>({
  form,
  textareaProps,
  labelProps,
  label,
  name,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  labelProps?: ComponentProps<typeof FieldLabel>;
  textareaProps?: ComponentProps<typeof Textarea>;
}) => {
  const { field, formState, fieldState } = useController({
    name: name,
    control: form?.control,
  });

  if (!form || !name) {
    return <RHFEmptyComponent />;
  }

  return (
    <Field data-invalid={fieldState?.invalid}>
      {label && (
        <FieldLabel
          {...labelProps}
          htmlFor={name}
        >
          {label}
        </FieldLabel>
      )}

      <Textarea
        {...field}
        {...textareaProps}
        id={name}
        aria-invalid={fieldState?.invalid}
      />

      {fieldState?.invalid && <FieldError errors={[fieldState?.error]} />}
    </Field>
  );
};
