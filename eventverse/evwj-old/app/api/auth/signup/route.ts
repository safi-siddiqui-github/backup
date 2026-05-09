import {
  SignupSchema,
  SignupSchemaInfer,
} from "@/app/(web)/(guest)/signup/_components/validation";
import {
  AmplifyResponseHelper,
  ApiAmplifyResponseHelper,
} from "@/lib/lib-responses";
import { signUp } from "aws-amplify/auth";
import { CountryCode, getCountryCallingCode } from "libphonenumber-js";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  return ApiAmplifyResponseHelper(async () => {
    const body = await request.json();
    SignupSchema.parse(body);
    type bodyType = SignupSchemaInfer;
    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      countryCode,
      // avatar,
      // googleId,
      // linkedinId,
      // facebookId,
      // appleId,
      // emailVerified,
    }: bodyType = body;
    const ccc = getCountryCallingCode(countryCode as CountryCode);
    const ampRes = await AmplifyResponseHelper(
      async () =>
        await signUp({
          username: email,
          password: password,
          options: {
            userAttributes: {
              email: email,
              phone_number: `+${ccc}${phone}`,
              name: firstname,
              family_name: lastname,
            },
          },
        }),
    );
    if (ampRes?.error) {
      throw new ZodError(ampRes?.error);
    }
    return NextResponse.json({
      success: true,
      data: ampRes?.data,
    });
  });
}

// return NextResponse.json({
//   success: false,
//   data: {
//     body,
//   },
// });

// SignupSchema.refine((data) => data.email.endsWith("@gmail.com"), {
//   message: "Only Gmail accounts allowed",
//   path: ["email"],
// }).parse(body);
