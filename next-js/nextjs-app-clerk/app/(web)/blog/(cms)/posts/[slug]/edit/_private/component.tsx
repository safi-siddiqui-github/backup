"use client";

import {
  RHFButtonComponent,
  RHFFormHandler,
  RHFInputComponent,
  RHFTextareaComponent,
} from "@/components/sections/rhf-components";
import {
  FlexColComponent,
  FormComponent,
} from "@/components/sections/web-components";
import { Spinner } from "@/components/ui/spinner";
import { ConstantTanstackQueryKeys } from "@/constants/constants-query-keys";
import { ResponseDataType } from "@/lib/responses-hanlder/response-types";
import { asZodResolver } from "@/lib/typescript";
import { useAuth } from "@clerk/nextjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  BlogCmsBlogPostSlugEditFindAction,
  BlogCmsBlogPostSlugEditUpdateAction,
} from "./action";
import {
  BlogCmsBlogPostEditSlugSchema,
  BlogCmsBlogPostEditSlugSchemaType,
} from "./schema";

export default function BlogCmsBlogPostSlugEditComponent(
  props: ResponseDataType,
) {
  const { slug } = props?.blogPostPrisma ?? {};
  const { sessionId } = useAuth();

  const queryClient = useQueryClient();

  const blogRes = useQuery({
    queryKey: [
      ConstantTanstackQueryKeys?.BlogCmsBlogPostSlugEditFindAction,
      slug,
    ],
    queryFn: () => BlogCmsBlogPostSlugEditFindAction(props),
    staleTime: 5000, // Data is "fresh" for 5 seconds
    refetchOnMount: "always", // Always fetch when this component appears
    refetchOnWindowFocus: false, // Don't fetch just because the user switched tabs
  });

  const isLoading = blogRes?.isLoading;

  const form = useForm<BlogCmsBlogPostEditSlugSchemaType>({
    resolver: asZodResolver<BlogCmsBlogPostEditSlugSchemaType>(
      BlogCmsBlogPostEditSlugSchema,
    ),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
    },
  });

  async function onSubmit(body: BlogCmsBlogPostEditSlugSchemaType) {
    const actionRes = await BlogCmsBlogPostSlugEditUpdateAction({
      blogPostPrisma: {
        slug: props?.blogPostPrisma?.slug,
        ...body,
      },
    });

    const formRes = RHFFormHandler(actionRes, form);
    if (formRes?.success) {
      toast.success(actionRes?.message);

      queryClient.invalidateQueries({
        queryKey: [
          ConstantTanstackQueryKeys?.BlogCmsBlogPostSlugEditFindAction,
          slug,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          ConstantTanstackQueryKeys?.BlogCmsBlogPostsAction,
          sessionId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          ConstantTanstackQueryKeys?.BlogPublicBlogPostSlugAction,
          slug,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          ConstantTanstackQueryKeys?.BlogPublicBlogPostSlugRecomendAction,
          slug,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [ConstantTanstackQueryKeys?.BlogPublicHomeFeaturedAction],
      });

      queryClient.invalidateQueries({
        queryKey: [ConstantTanstackQueryKeys?.BlogPublicHomeBlogPostsAction],
      });

      return;
    }

    toast.error(actionRes?.error?.at(0)?.message ?? "Porcess Not Completed");
  }

  useEffect(() => {
    if (form && blogRes?.data?.data?.blogPostPrisma) {
      form?.setValue("title", blogRes?.data?.data?.blogPostPrisma?.title ?? "");
      form?.setValue(
        "excerpt",
        blogRes?.data?.data?.blogPostPrisma?.excerpt ?? "",
      );
    }
  }, [blogRes?.data?.data?.blogPostPrisma, form]);

  return (
    <FlexColComponent className="">
      <FormComponent
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-4"
      >
        {isLoading && <Spinner />}

        <RHFInputComponent
          form={form}
          name="title"
          label="Title"
          inputProps={{
            disabled: isLoading,
          }}
        />

        <RHFTextareaComponent
          form={form}
          name="excerpt"
          label="Excerpt"
          textareaProps={{
            disabled: isLoading,
          }}
        />

        <RHFButtonComponent rhfform={form}>Update Post</RHFButtonComponent>
      </FormComponent>
    </FlexColComponent>
  );
}
