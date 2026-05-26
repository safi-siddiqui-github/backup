import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, Resolver } from "react-hook-form";

export type PartialOrNull<T> = Partial<T> | null;
export type TypeOrNull<T = string> = T | null;

// This function is basically a typed wrapper around zodResolver that forces React Hook Form to accept Zod schemas despite version/type mismatch.
// Take anything that might be a Zod schema, force TypeScript to accept it as a valid resolver schema, then force the result to behave like a React Hook Form resolver for my form type.

export const asZodResolver = <T extends FieldValues>(
  schema: unknown,
): Resolver<T> => {
  return zodResolver(
    schema as Parameters<typeof zodResolver>[0],
  ) as Resolver<T>;
};
