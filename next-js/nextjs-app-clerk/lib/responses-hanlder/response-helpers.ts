import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client";
import { ResponseBodyType } from "./response-types";

export const RouteResponseHelper = async (
  callback: () => Promise<NextResponse>,
): Promise<NextResponse> => {
  try {
    return await callback();
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        success: false,
        error: error?.issues,
      } satisfies ResponseBodyType);
    }

    const errorObj = error as Error;
    return NextResponse.json({
      success: false,
      error: [
        {
          code: "custom",
          path: [`${errorObj?.name}`],
          message: errorObj?.message,
          // message: "Unknown Error",
        },
      ],
    } satisfies ResponseBodyType);
  }
};

// export type NextResponse =
//   | NextResponse<ResponseBodyType>
//   | NextResponse<unknown>;
//   | NextResponse;

// export type NextResponse = NextResponse<ResponseBodyType>;

/*
export const NextResponseHandler = (body: ResponseBodyType): NextResponse => {
  return NextResponse.json(body);
};

export const NextRequestJsonHandler = async (
  body: NextRequest,
): Promise<ResponseBodyType> => {
  const req = (await body.json()) as ResponseBodyType;
  return req;
};

export const RouteParseJsonHandler = async (
  req: NextRequest,
): Promise<JSON | null> => {
  try {
    return await req.json();
  } catch {
    return null;
  }
};


export const RouteHandler = async (
  callback: () => Promise<NextResponse>,
): Promise<NextResponse> => {
  try {
    return await callback();
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponseHandler({
        success: false,
        error: error.issues,
      });
      // return NextResponse.json({
      //   success: false,
      //   error: error?.issues,
      // });
    }

    const errorObj = error as Error;
    // return NextResponse.json({
    //   success: false,
    //   error: [
    //     {
    //       code: "custom",
    //       path: [`${errorObj?.name}`],
    //       message: errorObj?.message,
    //       // message: "Unknown Error",
    //     },
    //   ],
    // });
    return NextResponseHandler({
      success: false,
      error: [
        {
          code: "custom",
          path: [`${errorObj?.name}`],
          message: errorObj?.message,
          // message: "Unknown Error",
        },
      ],
    });
  }
};

*/

export const ActionResponseHelper = async (
  callback: () => Promise<ResponseBodyType>,
  // callback: (body?: ResponseDataType) => Promise<ResponseBodyType>,
): Promise<ResponseBodyType> => {
  try {
    return await callback();
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.issues,
      };
    }

    if (
      error instanceof Prisma?.PrismaClientUnknownRequestError
      // error.constructor?.name?.startsWith("Prisma")
    ) {
      return {
        success: false,
        error: [
          {
            code: "custom",
            path: ["error"],
            message: error?.message,
          },
        ],
      };
    }

    const errorObj = error as Error;

    return {
      success: false,
      error: [
        {
          code: "custom",
          path: ["error", errorObj?.name],
          message: errorObj?.message,
        },
      ],
    };
  }
};
