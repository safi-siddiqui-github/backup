import {
  EventAgeRestrictionModelType,
  EventAssetModelType,
  EventCategoryAssignmentModelType,
  EventCategoryModelType,
  EventDateTypeModelType,
  EventDayModelType,
  EventFaqModelType,
  EventFeatureModelType,
  EventFeatureTypeModelType,
  EventGuestModelType,
  EventModelIncludeType,
  EventModelType,
  EventModuleActivationModelType,
  EventModuleModelType,
  EventRecurringEndModelType,
  EventRecurringPatternModelType,
  EventVenueModelType,
  EventVenueTypeModelType,
  EventVisibilityModelType,
  OrNull,
  OTPModelType,
  TokenModelType,
  UserModelType,
} from "@/type/type-model";
import { AxiosResponse, isAxiosError } from "axios";
import { NextResponse } from "next/server";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { ZodError } from "zod";
import { $ZodIssue } from "zod/v4/core";

export type ResponseBodyType = {
  success: boolean;
  error?: $ZodIssue[];
  data?: ResponseDataType;
  message?: OrNull<string>;
};

export type ResponseDataType = {
  user?: OrNull<UserModelType>;
  otp?: OrNull<OTPModelType>;
  token?: OrNull<TokenModelType>;
  cookieRes?: OrNull<string>;

  event?: OrNull<EventModelType>;
  events?: OrNull<EventModelType[]>;
  eventModelInlcude?: OrNull<EventModelIncludeType>;

  eventVisibility?: OrNull<EventVisibilityModelType>;
  eventVisibilities?: OrNull<EventVisibilityModelType[]>;

  eventDay?: OrNull<EventDayModelType>;
  eventDays?: OrNull<EventDayModelType[]>;
  eventDateTypes?: OrNull<EventDateTypeModelType[]>;

  eventVenue?: OrNull<EventVenueModelType>;
  eventVenues?: OrNull<EventVenueModelType[]>;
  eventVenueTypes?: OrNull<EventVenueTypeModelType[]>;

  eventCategoryAssignment?: OrNull<EventCategoryAssignmentModelType>;
  eventCategoryAssignments?: OrNull<EventCategoryAssignmentModelType[]>;

  eventRecurringPatterns?: OrNull<EventRecurringPatternModelType[]>;
  eventRecurringEnds?: OrNull<EventRecurringEndModelType[]>;
  eventAsset?: OrNull<EventAssetModelType>;
  eventAssets?: OrNull<EventAssetModelType[]>;
  eventCategory?: OrNull<EventCategoryModelType>;
  eventCategories?: OrNull<EventCategoryModelType[]>;

  eventAgeRestriction?: OrNull<EventAgeRestrictionModelType>;
  eventAgeRestrictions?: OrNull<EventAgeRestrictionModelType[]>;

  eventModule?: OrNull<EventModuleModelType>;
  eventModules?: OrNull<EventModuleModelType[]>;

  eventModuleActivations?: OrNull<EventModuleActivationModelType[]>;

  eventFeature?: OrNull<EventFeatureModelType>;
  eventFeatures?: OrNull<EventFeatureModelType[]>;
  eventFeatureTypes?: OrNull<EventFeatureTypeModelType[]>;

  eventGuest?: OrNull<EventGuestModelType>;
  eventGuests?: OrNull<EventGuestModelType[]>;

  eventFaq?: OrNull<EventFaqModelType>;
  eventFaqs?: OrNull<EventFaqModelType[]>;
};

export const ActionResponseHelper = async (
  callback: () => Promise<ResponseBodyType>,
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
    return {
      success: false,
      error: [
        {
          code: "custom",
          path: ["unknown"],
          message: "Unknown Error",
        },
      ],
    };
  }
};

export type ApiResponseBodyType =
  | NextResponse<ResponseBodyType>
  // | NextResponse<unknown>;
  | NextResponse;

export const ApiResponseHelper = async (
  callback: () => Promise<ApiResponseBodyType>,
): Promise<ApiResponseBodyType> => {
  try {
    return await callback();
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        success: false,
        error: error?.issues,
      });
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
    });
  }
};

export const FormSubmitHelper = async <TFieldValues extends FieldValues>(
  callback: () => Promise<ResponseBodyType>,
  form: UseFormReturn<TFieldValues>,
): Promise<ResponseBodyType> => {
  try {
    const response = await callback();
    if (!response?.success) {
      for (const detail of response?.error ?? []) {
        form.setError(detail?.path[0] as Path<TFieldValues>, detail);
      }
    }
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: "Form Unknown Error",
    };
  }
};

export type AxiosResponseType<T = ResponseBodyType> = AxiosResponse<T>;
// export type AxiosErrorType<T = ResponseBodyType> = AxiosError<T>;

export const AxiosResponseHelper = async (
  callback: () => Promise<AxiosResponseType>,
): Promise<ResponseBodyType> => {
  try {
    const response = await callback();
    return response?.data;
  } catch (error: unknown) {
    if (isAxiosError<ResponseBodyType>(error)) {
      return (
        error?.response?.data ?? {
          success: false,
          error: [
            {
              code: "custom",
              path: [`${error?.name ?? "axios"}`],
              message: error?.message || "Network or Unknown Axios Error",
            },
          ],
        }
      );
    }
    return {
      success: false,
      error: [
        {
          code: "custom",
          path: ["unknown"],
          message: "Unknown Client Error",
        },
      ],
    };
    // throw error;
  }
};

/*

export type AmplifyErrorType = {
  name?:
    | "AuthUserPoolException"
    | "UsernameExistsException"
    | "InvalidPasswordException"
    | "InvalidPasswordException"
    | "UserUnAuthenticatedException"
    | "EmptyConfirmSignUpCode"
    | "CodeMismatchException"
    | "NotAuthorizedException"

    // Sign Up
    | "EmptySignUpUsername"
    | "EmptySignUpPassword"

    // Email Verification
    | "EmptyConfirmSignUpUsername"
    | "EmptySignUpPassword"

    // Sign In
    | "EmptySignInUsername"
    | "EmptySignInPassword"
    | "NotAuthorizedException"

    // Null
    | "";
  message?: string;
};

export type AmplifyResponseBodyType<T> = Omit<ResponseBodyType, "data"> & {
  data?: T;
};

export const AmplifyResponseHelper = async <T>(
  callback: (contextSpec: AmplifyServer.ContextSpec) => Promise<T>,
): Promise<AmplifyResponseBodyType<T>> => {
  try {
    InitAmplifyServer();
    const response = await runWithAmplifyServerContext({
      nextServerContext: null,
      // operation: () => callback(contextSpec),
      operation: (contextSpec) => callback(contextSpec),
    });
    // const response = await callback();
    return { success: true, data: response };
  } catch (error: unknown) {
    const ampError = error as AmplifyErrorType;

    const errObj: AmplifyResponseBodyType<T> = {
      success: false,
      error: [
        // {
        //   code: "custom",
        //   path: ["aws-amplify"],
        //   message: "Amplify Error",
        // },
      ],
    };

    const zodIssueObj: ZodIssue = {
      code: "custom",
      message: ampError?.message ?? "",
      path: [""],
    };
    switch (ampError?.name) {
      case "NotAuthorizedException":
      case "AuthUserPoolException":
      case "UserUnAuthenticatedException":
      case "EmptySignUpUsername":
      case "EmptySignInUsername":
      case "UsernameExistsException":
      case "EmptyConfirmSignUpUsername":
        zodIssueObj.path[0] = "email";
        errObj?.error?.push(zodIssueObj);
        break;
      case "EmptySignInPassword":
      case "EmptySignUpPassword":
      case "InvalidPasswordException":
        zodIssueObj.path[0] = "password";
        errObj?.error?.push(zodIssueObj);
        break;
      case "EmptyConfirmSignUpCode":
      case "CodeMismatchException":
        zodIssueObj.path[0] = "token";
        errObj?.error?.push(zodIssueObj);
        break;
      default:
        zodIssueObj.path[0] = "email";
        errObj?.error?.push(zodIssueObj);
        break;
    }

    return errObj;
  }
};

export const AmplifyFormSubmitHelper = async <
  TFieldValues extends FieldValues,
  T,
>(
  callback: () => Promise<AmplifyResponseBodyType<T>>,
  form: UseFormReturn<TFieldValues>,
): Promise<AmplifyResponseBodyType<T>> => {
  try {
    const response = await callback();
    if (!response?.success) {
      for (const detail of response?.error ?? []) {
        form.setError(detail?.path[0] as Path<TFieldValues>, detail);
      }
    }
    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: "Form Unknown Error",
    };
  }
};

export type ApiAmplifyResponseBodyType<T> =
  | NextResponse<AmplifyResponseBodyType<T>>
  | NextResponse<unknown>;

export const ApiAmplifyResponseHelper = async <T>(
  callback: () => Promise<ApiAmplifyResponseBodyType<T>>,
): Promise<ApiAmplifyResponseBodyType<T>> => {
  try {
    return await callback();
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        success: false,
        error: error?.issues,
      });
    }
    return NextResponse.json({
      success: false,
      error: [
        {
          code: "custom",
          path: ["unknown"],
          message: "Unknown Error",
        },
      ],
    });
  }
};



export type AxiosAmplifyResponseType<T> = AxiosResponse<
  AmplifyResponseBodyType<T>
>;

export const AxiosAmplifyResponseHelper = async <T>(
  callback: () => Promise<AxiosAmplifyResponseType<T>>,
): Promise<AmplifyResponseBodyType<T>> => {
  try {
    const response = await callback();
    return response?.data;
  } catch (error: unknown) {
    if (isAxiosError<AmplifyResponseBodyType<T>>(error)) {
      return (
        error?.response?.data ?? {
          success: false,
          error: [
            {
              code: "custom",
              path: [`${error?.name ?? "axios"}`],
              message: error?.message || "Network or Unknown Axios Error",
            },
          ],
        }
      );
    }
    return {
      success: false,
      error: [
        {
          code: "custom",
          path: ["unknown"],
          message: "Unknown Client Error",
        },
      ],
    };
    // throw error;
  }
};

*/
