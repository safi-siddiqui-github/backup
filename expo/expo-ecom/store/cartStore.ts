import { Product } from '@/app/lib/types';
import { create } from 'zustand';

type CartItem = {
  id: number;
  quantity: number;
  product: Product;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
};

const useStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => {
    const existing = get().items.find((each) => each.id === item.id);
    const items = get().items;
    const lastItem = get().items[items.length - 1];

    if (existing) {
      set((state) => ({
        items: state.items.map((each) => {
          if (each.id === item.id) {
            return {
              ...each,
              quantity: each.quantity + 1,
            };
          } else {
            return each;
          }
        }),
      }));
    } else {
      set((state) => ({
        items: [
          ...state.items,
          {
            id: lastItem ? lastItem.id + 1 : 1,
            product: item.product,
            quantity: 1,
          },
        ],
      }));
    }
  },

  removeItem: (id) => {
    set((state) => ({ items: state.items.filter((each) => each.id !== id) }));
    return null;
  },

  getTotalPrice: () => {
    const t = get()
      .items.reduce((total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2);
    return Number(t);
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },

  //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
  //   updateBears: (newBears) => set({ bears: newBears }),
}));
