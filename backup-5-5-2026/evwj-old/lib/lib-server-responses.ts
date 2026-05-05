"use server";

import { AmplifyServer } from "aws-amplify/adapter-core";
import { NextRequest, NextResponse } from "next/server";
import { InitAmplifyServer } from "./aws-amplify/init-server-side";
import { runWithAmplifyServerContext } from "./aws-amplify/server-side";
import { AmplifyErrorType, AmplifyResponseBodyType } from "./lib-responses";

export const AmplifyServerResponseHelper = async <T>(
  callback: (contextSpec: AmplifyServer.ContextSpec) => Promise<T>,
  request: NextRequest,
  response: NextResponse,
): Promise<AmplifyResponseBodyType<T>> => {
  try {
    InitAmplifyServer();
    const ampSerRes = await runWithAmplifyServerContext({
      nextServerContext: { request, response },
      operation: (contextSpec) => callback(contextSpec),
    });
    return { success: true, data: ampSerRes };
  } catch (error: unknown) {
    const ampError = error as AmplifyErrorType;

    const errObj: AmplifyResponseBodyType<T> = {
      success: false,
      error: [
        {
          code: "custom",
          message: ampError?.message ?? "",
          path: [`${ampError?.name ?? "ampSerRes"}`],
        },
      ],
    };

    return errObj;
  }
};
