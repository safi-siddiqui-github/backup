"use client";

import WebBackgroundComponent from "@/app/(web)/_private/WebBackgroundComponent";
import { CardComponent } from "@/app/_private/(shadcn)/CardComponent";
import ProgressComponent from "@/app/_private/(shadcn)/ProgressComponent";
import { WebEventCreateTwoSchemaInfer } from "@/app/api/web/auth/event-model/store/_private/validation";
import { RHFComponent } from "@/lib/lib-react-hook-form";
import { ResponseDataType } from "@/lib/lib-responses";
import { Button } from "@/shadcn/ui/button";
import { CardDescription, CardTitle } from "@/shadcn/ui/card";
import { Label } from "@/shadcn/ui/label";
import { useEventAssetStore } from "@/store/store-event-asset";
import { CameraIcon, TrashIcon, UploadIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function WebEventCreateImageComponent() {
  return (
    <div className="flex flex-col">
      <FormComponent />
    </div>
  );
}

function FormComponent() {
  const form = useFormContext<WebEventCreateTwoSchemaInfer>();
  const {
    eventAssets,
    getEventAssetsWithFile,
    addEventAsset,
    removeEventAsset,
  } = useEventAssetStore();

  const [eventAssetsWithFile, setEventAssetsWithFile] = useState<
    ResponseDataType["eventAssets"]
  >([]);

  useEffect(() => {
    getEventAssetsWithFile().then((eventAssetsWithFile) => {
      setEventAssetsWithFile(eventAssetsWithFile);
    });
  }, [getEventAssetsWithFile, eventAssets]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "photos",
  });

  const processedFilesRef = useRef(new Set<string>());

  useEffect(() => {
    const upload = async () => {
      for (const item of fields) {
        if (!item.file) continue;

        const key = item.file.name + item.file.size + item.file.lastModified;

        // Skip if already uploaded
        if (processedFilesRef.current.has(key)) {
          continue;
        }

        await addEventAsset({
          assetFile: item.file,
        });

        //  Mark as uploaded
        processedFilesRef.current.add(key);
      }
    };

    upload();
  }, [fields, addEventAsset, remove]);

  const removePhoto = async (index: number, slug: string | undefined) => {
    if (!slug) return;
    remove(index);
    await removeEventAsset(slug);
  };

  const progressValue = useMemo(() => {
    const length = eventAssetsWithFile?.length ?? 0;
    if (length > 10) {
      return 100;
    }
    return length * 10;
  }, [eventAssetsWithFile]);

  return (
    <div className="flex flex-col gap-4">
      <CardComponent>
        <div className="flex flex-wrap justify-between gap-2">
          <CardTitle>Upload Photos for Collage</CardTitle>
          <CardDescription>
            {eventAssetsWithFile?.length ?? 0}/10 photos
          </CardDescription>
        </div>
        <ProgressComponent
          progressValue={progressValue}
          progressShow={false}
        />
        <Label
          className="bg-ev-1/3 border-ev-1 text-ev-1 flex flex-col rounded-md border-2 border-dashed px-2 py-16 text-center text-base font-normal"
          htmlFor="photos"
        >
          <UploadIcon className="size-10" />
          <CardTitle className="text-lg">
            Upload photos for your event collage
          </CardTitle>
          <p className="text-sm font-normal">
            Add multiple photos to create an engaging event page • 10 more
            photo(s) allowed
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <WebBackgroundComponent className="items-center rounded-md px-3 text-sm font-medium">
              <UploadIcon className="size-4" />
              Choose Photos
            </WebBackgroundComponent>

            <Button
              type="button"
              variant={"outline"}
            >
              <CameraIcon />
              Take Photo
            </Button>
          </div>
          <RHFComponent
            form={form}
            name="photos"
            fieldType="input-file"
            inputProps={{
              className: "hidden",
              multiple: true,
              id: "photos",
              type: "file",
              accept: "image/*",
            }}
            append={append}
          />
        </Label>
      </CardComponent>
      <CardComponent>
        {eventAssetsWithFile?.length === 0 ? (
          <CardDescription className="text-center">
            No Images Selected
          </CardDescription>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* {eventAssetsData?.map((item, index) => { */}
            {eventAssetsWithFile?.map((item, index) => {
              return (
                <div
                  className="flex flex-col gap-3"
                  key={item?.slug}
                >
                  <div className="flex justify-between gap-2">
                    <div className="flex flex-col">
                      <CardTitle>{item?.name}</CardTitle>
                      <CardDescription>{item?.size} Bytes</CardDescription>
                    </div>

                    <Button
                      type="button"
                      variant={"destructive"}
                      size={"icon-lg"}
                      onClick={() =>
                        removePhoto(index, item?.slug ?? undefined)
                      }
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                  <div
                    className="h-44 w-full rounded bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${item?.assetFileUrl})`,
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        )}
      </CardComponent>
    </div>
  );
}
