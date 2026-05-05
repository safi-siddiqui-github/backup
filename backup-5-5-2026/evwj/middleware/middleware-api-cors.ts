import { ActionResponseHelper, ResponseBodyType } from "@/lib/lib-responses";
import { NextRequest, NextResponse } from "next/server";

export default async function MiddlewareApiCors(
  request: NextRequest,
  response: NextResponse,
): Promise<ResponseBodyType> {
  return await ActionResponseHelper(async () => {
    // const res = new NextResponse(null, { status: 204 })
    // const res = new NextResponse()
    response?.headers?.set("Access-Control-Allow-Origin", "true");

    return {
      success: true,
      data: {
        
      },
    };
  });
}
