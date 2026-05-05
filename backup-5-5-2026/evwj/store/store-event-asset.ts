import { LibDateCurrentTimestampHelper } from "@/lib/lib-date";
import { ResponseDataType } from "@/lib/lib-responses";
import { del as deIldb, get as getIdb, set as setIdb } from "idb-keyval";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useEventAssetStore = create<{
  eventAssets?: ResponseDataType["eventAssets"];
  addEventAsset: (eventAsset: ResponseDataType["eventAsset"]) => Promise<void>;
  updateEventAsset: (
    eventAsset: ResponseDataType["eventAsset"],
  ) => Promise<void>;
  getEventAssetsWithFile: () => Promise<ResponseDataType["eventAssets"]>;
  removeEventAsset: (slug?: string) => Promise<void>;
}>()(
  persist(
    immer((set, get) => ({
      eventAssets: [],

      addEventAsset: async (eventAsset) => {
        const assetFile = eventAsset?.assetFile;
        if (!eventAsset || !assetFile) return;

        const timestamp = LibDateCurrentTimestampHelper();
        const slug = `event-asset-${timestamp}`;

        // store File/Blob directly in IndexedDB
        await setIdb(slug, assetFile);

        const eventAssetModified: ResponseDataType["eventAsset"] = {
          slug,
          name: assetFile.name,
          type: assetFile.type,
          size: assetFile.size,
          assetFileUrl: URL.createObjectURL(assetFile),
        };

        set((state) => {
          state.eventAssets = [
            ...(state?.eventAssets || []),
            eventAssetModified,
          ];
        });
      },

      updateEventAsset: async (eventAsset) => {
        if (!eventAsset) return;

        const { assetFile, id } = eventAsset;
        if (!assetFile || !id) return;

        const { eventAssets } = get();
        if (!eventAssets) return;

        const currentId = id - 1;
        const current = eventAssets?.at(currentId);
        if (!current) return;

        const { slug: currentSlug } = current;
        if (!currentSlug) return;

        await setIdb(currentSlug, assetFile);

        set((state) => {
          const { eventAssets } = state;
          if (!eventAssets) return;

          eventAssets[currentId] = {
            ...current,
            ...eventAsset,
            slug: currentSlug,
            id: undefined,
          };
        });
      },

      getEventAssetsWithFile: async () => {
        const { eventAssets } = get();

        const eventGuestsWithFile: ResponseDataType["eventAssets"] = [];
        for (const eventAsset of eventAssets ?? []) {
          if (!eventAsset?.slug) continue;

          const assetFile = await getIdb<File>(eventAsset?.slug);
          if (!assetFile) continue;

          const assetFileUrl = URL.createObjectURL(assetFile);

          eventGuestsWithFile.push({
            ...eventAsset,
            assetFile,
            assetFileUrl,
          });
        }

        return eventGuestsWithFile;
      },

      removeEventAsset: async (slug) => {
        if (!slug) return;
        await deIldb(slug);

        set((state) => {
          state.eventAssets = state?.eventAssets?.filter(
            (a) => a.slug !== slug,
          );
        });
      },
    })),
    { name: "event-asset-store" },
  ),
);
