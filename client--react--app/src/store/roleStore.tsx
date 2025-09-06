import { create } from 'zustand';
import axios from 'axios';

interface RoleState {
  roles: string[];
  setRoles: (roles: string[]) => void;
  fetchRoles: () => void;
}

export const useRoleStore = create<RoleState>()((set) => ({
  roles: [],
  setRoles: (roles) => set({ roles }),
  fetchRoles: async () => {

    try {
      const response = await axios.get(`/api/roles`);
      const data = await response.data;

      set({ roles: data.roles });
    } catch (error) {
      console.error(error);
    }
  },
}))
