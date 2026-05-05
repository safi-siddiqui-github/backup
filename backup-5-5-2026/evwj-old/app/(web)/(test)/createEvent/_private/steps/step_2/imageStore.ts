import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval";

const indexedDBStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

export type PersistedImage = {
  id: string;
  name: string;
  blob: string;
  type: string;
}

type ImageStore  ={
  images: PersistedImage[];
  setImages: (images: PersistedImage[]) => void;
  addImage: (file: File, id?: string) => Promise<PersistedImage>;
  removeImage: (id: string) => void;
  clearImages: () => void;
}

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const useImageStore = create<ImageStore>()(
  persist(
    (set, get) => ({
      images: [],
      setImages: (images) => set({ images }),
      addImage: async (file, customId) => {
        const blob = await fileToBase64(file);
        const image: PersistedImage = {
          id: customId || Math.random().toString(36).substr(2, 9),
          name: file.name,
          blob,
          type: file.type,
        };
        set({ images: [...get().images, image] });
        return image;
      },
      removeImage: (id) =>
        set({ images: get().images.filter((img) => img.id !== id) }),
      clearImages: () => set({ images: [] }),
    }),
    {
      name: "event-photo-collage-storage",
      storage: createJSONStorage(() => indexedDBStorage),
    }
  )
);