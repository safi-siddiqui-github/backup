// // EventAssetModelType

// import { ResponseDataType } from "@/lib/lib-responses";
// import { OrNull } from "@/type/type-model";
// import { del as deIldb, get as getIdb, set as setIdb } from "idb-keyval";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { immer } from "zustand/middleware/immer";

// export const useEventAssetStore = create<{
//   eventAssets?: ResponseDataType["eventAssets"];
//   addEventAsset: (file: File) => Promise<void>;
//   getEventAssetFile: (
//     slug: OrNull<string | undefined>,
//   ) => Promise<File | undefined>;
//   getEventAsset: (
//     // slug: string | null | undefined,
//     slug: OrNull<string | undefined>,
//   ) => Promise<ResponseDataType["eventAsset"] | undefined>;
//   removeEventAsset: (slug: string) => Promise<void>;
// }>()(
//   persist(
//     immer((set) => ({
//       eventAssets: [],

//       addEventAsset: async (file: File) => {
//         const slug = `event-asset-${crypto.randomUUID()}`;

//         await setIdb(slug, file); // store File/Blob directly in IndexedDB

//         const asset: ResponseDataType["eventAsset"] = {
//           slug: slug,
//           name: file.name,
//           type: file.type,
//           size: file.size,
//           //   url: URL.createObjectURL(file),
//         };

//         set((state) => {
//           state.eventAssets = [...(state?.eventAssets || []), asset];
//         });

//         // set({ eventAssets: [...get()?.eventAssets, asset] });
//       },

//       getEventAssetFile: async (slug: OrNull<string | undefined>) => {
//         if (!slug) return undefined;
//         const file = await getIdb<File>(slug);

//         return file;
//       },

//       getEventAsset: async (slug: OrNull<string | undefined>) => {
//         if (!slug) return undefined;
//         const file = await getIdb<File>(slug);

//         if (!file) return undefined;

//         const asset: ResponseDataType["eventAsset"] = {
//           slug: slug,
//           name: file?.name,
//           type: file?.type,
//           size: file?.size,
//           url: URL.createObjectURL(file),
//         };

//         return asset;
//       },

//       removeEventAsset: async (slug: string) => {
//         await deIldb(slug);

//         set((state) => {
//           state.eventAssets = state?.eventAssets?.filter(
//             (a) => a.slug !== slug,
//           );
//         });
//       },
//     })),
//     { name: "event-image-store" },
//   ),
// );
