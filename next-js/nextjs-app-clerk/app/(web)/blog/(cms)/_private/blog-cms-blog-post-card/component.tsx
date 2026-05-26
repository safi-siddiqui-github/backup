"use client";

import {
  RHFButtonComponent,
  RHFFormHandler,
} from "@/components/sections/rhf-components";
import {
  FlexColComponent,
  FlexRowComponent,
  FormComponent,
  HeadingFourComponent,
  ImageComponent,
  LinkComponent,
  ParagraphComponent,
} from "@/components/sections/web-components";
import { Button } from "@/components/ui/button";
import { ConstantImages } from "@/constants/constants-images";
import { ConstantTanstackQueryKeys } from "@/constants/constants-query-keys";
import { ConstantRoutes } from "@/constants/constants-routes";
import { ResponseDataType } from "@/lib/responses-hanlder/response-types";
import { useAuth } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { EditIcon, EyeIcon, TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { BlogCmsBlogPostCardDeleteAction } from "./action";

export default function BlogCmsBlogPostCardComponent(props: ResponseDataType) {
  const { title, slug, excerpt } = props?.blogPostPrisma ?? {};
  const queryClient = useQueryClient();
  const { sessionId } = useAuth();

  const deleteForm = useForm();
  const deleteFormFN = async () => {
    const actionRes = await BlogCmsBlogPostCardDeleteAction(props);

    const formRes = RHFFormHandler(actionRes, deleteForm);
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

      return;
    }

    toast.error(actionRes?.error?.at(0)?.message ?? "Porcess Not Completed");
  };

  return (
    <FlexColComponent className="rounded-2xl">
      <ImageComponent
        imageProps={{
          src: ConstantImages?.logoImage,
        }}
        divProps={{
          className: "h-72",
        }}
      />
      <FlexColComponent className="gap-1 p-2">
        <HeadingFourComponent>{title}</HeadingFourComponent>
        <ParagraphComponent className="line-clamp-2">
          {excerpt}
        </ParagraphComponent>

        <FlexRowComponent>
          <Button asChild>
            <LinkComponent
              href={`${ConstantRoutes?.blog?.posts?.home}/${slug}/edit`}
            >
              <EditIcon />
              <span>Edit</span>
            </LinkComponent>
          </Button>

          <FormComponent onSubmit={deleteForm.handleSubmit(deleteFormFN)}>
            <RHFButtonComponent
              rhfform={deleteForm}
              type="submit"
            >
              <TrashIcon />
              <span>Delete</span>
            </RHFButtonComponent>
          </FormComponent>

          <Button asChild>
            <LinkComponent href={`${ConstantRoutes?.blog?.home}/${slug}`}>
              <EyeIcon />
              <span>View</span>
            </LinkComponent>
          </Button>
        </FlexRowComponent>
      </FlexColComponent>
    </FlexColComponent>
  );
}
