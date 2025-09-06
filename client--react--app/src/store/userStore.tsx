import type { IUser } from '@/types/userType';
import { create } from 'zustand';
import axios, { AxiosError } from 'axios';

interface UserState {
  users: IUser[];
  loading: boolean;
  error: string | null;
  setUsers: (users: IUser[]) => void;
  createUser: (newUser: IUser) => Promise<boolean>;
  fetchUsers: (role: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,

  setUsers: (users) => set({ users }),

  createUser: async (newUser) => {
    set({ loading: true, error: null });
    try {

      const { data } = await axios.post('/api/users', newUser, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      set((state) => ({
        users: [...state.users, data.data]
      }))

      return true;

    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message: string }>; if (axiosError.response) {
          set({ error: axiosError.response.data?.message || 'Server error' });
        }
      } else {
        set({ error: 'An unexpected error occurred' });
      }

      return false;

    } finally {
      set({ loading: false });
    }

  },

  fetchUsers: async (role: string) => {

    set({ loading: true, error: null });

    try {
      const response = await axios.get(`/api/users/by-role/${role}`);
      const data = await response.data;

      set({ users: data.data, loading: false });
    } catch (err: unknown) {
      console.error(err);
      set({ error: 'Failed to fetch users', loading: false });

    }
  },
}))
