import { NextResponse } from "next/server";
import z, { ZodError } from "zod";

type Handler<T = unknown> = (req: Request) => Promise<T>;

export function ApiHandler(handler: Handler) {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (err) {
      if (err instanceof ZodError) {
        console.log(err);

        return NextResponse.json(
          { success: false, errors: z.flattenError(err)?.fieldErrors },
          { status: 400 },
        );
      }

      console.error("Server error:", err);

      return NextResponse.json(
        { success: false, error: "Internal Server Error" },
        { status: 500 },
      );
    }
  };
}
