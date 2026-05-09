import { ChairLayout, SeatingType, TableShape } from "@/prisma/generated";
import z from "zod";

export const seatingTableSchema = z
  .object({
    name: z.string().min(3, { error: "Name must have 3 charaters" }),
    seatingType: z.enum(SeatingType),
    note: z.optional(z.string()),
    tableShape: z.enum(TableShape),
    guestGroupId: z.optional(z.string()),
    seatingChairsQty: z.optional(z.string()),
  })
  .superRefine((data, ctx) => {
    //
    if (data.seatingChairsQty) {
      // Must be a valid Number
      const seatingChairsQty = Number(data.seatingChairsQty);
      if (isNaN(seatingChairsQty)) {
        ctx.addIssue({
          path: ["seatingChairsQty"],
          code: "custom",
          message: "Chairs must be a valid number",
        });
      }
      //
      if (seatingChairsQty > 20) {
        ctx.addIssue({
          path: ["seatingChairsQty"],
          code: "custom",
          message: "Chairs limits at 20",
        });
      }
    }
  });

export const seatingChairSchema = z
  .object({
    name: z.string().min(3, { error: "Name must have 3 charaters" }),
    seatingType: z.enum(SeatingType),
    note: z.optional(z.string()),
    guestGroupId: z.optional(z.string()),
    chairLayout: z.enum(ChairLayout),
    rows: z.optional(z.string()),
    columns: z.optional(z.string()),
  })
  .superRefine((data, ctx) => {
    //
    if (data.chairLayout === "GRID") {
      //
      // Must be a valid Number
      const rows = Number(data.rows);
      if (isNaN(rows)) {
        ctx.addIssue({
          path: ["rows"],
          code: "custom",
          message: "Rows must be a number",
        });
      }
      //
      const columns = Number(data.columns);
      if (isNaN(columns)) {
        ctx.addIssue({
          path: ["columns"],
          code: "custom",
          message: "Columns must be a number",
        });
      }
      //
    }
  });

export const seatingObjectSchema = z
  .object({
    name: z.string().min(3, { error: "Name must have 3 charaters" }),
    seatingType: z.enum(SeatingType),
    width: z.string().min(1, { error: "Width is required" }),
    height: z.string().min(1, { error: "Height is required" }),
  })
  .superRefine((data, ctx) => {
    //
    const width = Number(data.width);
    if (isNaN(width)) {
      ctx.addIssue({
        path: ["width"],
        code: "custom",
        message: "Width must be a number",
      });
    }
    //
    const height = Number(data.height);
    if (isNaN(height)) {
      ctx.addIssue({
        path: ["height"],
        code: "custom",
        message: "height must be a number",
      });
    }
  });

export const seatingObjectSwapSchema = z
  .object({
    firstGuestListId: z.string().min(1, { error: "First Seat is required" }),
    secondGuestListId: z.string().min(1, { error: "Second Seat is required" }),
  })
  .superRefine((data, ctx) => {
    //
    if (data.firstGuestListId === data.secondGuestListId) {
      ctx.addIssue({
        path: ["secondGuestListId"],
        code: "custom",
        message: "Both cannot be same",
      });
    }
  });
