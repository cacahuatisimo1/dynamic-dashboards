
import { create } from 'zustand';
import axios from 'axios';

interface CrudState<T> {
  items: T[];
  loading: boolean;
  error: string | null;
  create: (item: Omit<T, 'id'>) => Promise<void>;
  read: () => Promise<void>;
  update: (id: string | number, item: Partial<T>) => Promise<void>;
  delete: (id: string | number) => Promise<void>;
}

export const createCrudStore = <T extends { id: string | number }>(endpoint: string) => {
  return create<CrudState<T>>((set) => ({
    items: [],
    loading: false,
    error: null,

    create: async (item) => {
      set({ loading: true, error: null });
      try {
        const response = await axios.post(endpoint, item);
        set((state) => ({
          items: [...state.items, response.data],
          loading: false,
        }));
      } catch (error) {
        set({ error: 'Failed to create item', loading: false });
      }
    },

    read: async () => {
      set({ loading: true, error: null });
      try {
        const response = await axios.get(endpoint);
        set({ items: response.data, loading: false });
      } catch (error) {
        set({ error: 'Failed to fetch items', loading: false });
      }
    },

    update: async (id, item) => {
      set({ loading: true, error: null });
      try {
        const response = await axios.put(`${endpoint}/${id}`, item);
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? response.data : i)),
          loading: false,
        }));
      } catch (error) {
        set({ error: 'Failed to update item', loading: false });
      }
    },

    delete: async (id) => {
      set({ loading: true, error: null });
      try {
        await axios.delete(`${endpoint}/${id}`);
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
          loading: false,
        }));
      } catch (error) {
        set({ error: 'Failed to delete item', loading: false });
      }
    },
  }));
};
