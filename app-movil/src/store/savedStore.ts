import { create } from 'zustand';
import type { EquipmentItem } from '../data/mockData';

interface SavedState {
  savedItems: EquipmentItem[];
  addItem: (item: EquipmentItem) => void;
  removeItem: (id: string) => void;
}

export const useSavedStore = create<SavedState>((set) => ({
  savedItems: [],

  addItem: (item) =>
    set((state) => ({
      savedItems: state.savedItems.some(
        (savedItem) => savedItem.id === item.id
      )
        ? state.savedItems
        : [...state.savedItems, item],
    })),

  removeItem: (id) =>
    set((state) => ({
      savedItems: state.savedItems.filter(
        (item) => item.id !== id
      ),
    })),
}));
