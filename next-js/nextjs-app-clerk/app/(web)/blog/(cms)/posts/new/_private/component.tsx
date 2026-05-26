"use client";

import {
  RHFButtonComponent,
  RHFFormHandler,
  RHFInputComponent,
  RHFTextareaComponent,
} from "@/components/sections/rhf-components";
import { FormComponent } from "@/components/sections/web-components";
import { ConstantTanstackQueryKeys } from "@/constants/constants-query-keys";
import { ConstantRoutes } from "@/constants/constants-routes";
import { asZodResolver } from "@/lib/typescript";
import { useAuth } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import BlogCmsBlogPostNewAction from "./action";
import {
  BlogCmsBlogPostNewSchema,
  type BlogCmsBlogPostNewSchemaType,
} from "./schema";

export default function BlogCmsBlogPostNewComponent() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { sessionId } = useAuth();

  const form = useForm<BlogCmsBlogPostNewSchemaType>({
    resolver: asZodResolver<BlogCmsBlogPostNewSchemaType>(
      BlogCmsBlogPostNewSchema,
    ),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
    },
  });

  async function onSubmit(body: BlogCmsBlogPostNewSchemaType) {
    const actionRes = await BlogCmsBlogPostNewAction({
      blogPostPrisma: body,
    });

    const formRes = RHFFormHandler(actionRes, form);
    if (formRes?.success) {
      toast.success(actionRes?.message);

      queryClient.invalidateQueries({
        queryKey: [
          ConstantTanstackQueryKeys?.BlogCmsBlogPostsAction,
          sessionId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [ConstantTanstackQueryKeys?.BlogPublicHomeFeaturedAction],
      });

      queryClient.invalidateQueries({
        queryKey: [ConstantTanstackQueryKeys?.BlogPublicHomeBlogPostsAction],
      });

      return router?.push(ConstantRoutes.blog?.posts?.home);
    }

    toast.error(actionRes?.error?.at(0)?.message ?? "Porcess Not Completed");
  }

  return (
    <FormComponent
      onSubmit={form.handleSubmit(onSubmit)}
      className="gap-4"
    >
      <RHFInputComponent
        form={form}
        name="title"
        label="Title"
      />

      <RHFTextareaComponent
        form={form}
        name="excerpt"
        label="Excerpt"
      />

      <RHFButtonComponent rhfform={form}>Create Post</RHFButtonComponent>
    </FormComponent>
  );
}
