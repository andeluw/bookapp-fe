import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Pegawai } from '@/types/pegawai';

type AuthStoreType = {
  user: Pegawai | null;
  isAuthed: boolean;
  isLoading: boolean;
  login: (pegawai: Pegawai) => void;
  logout: () => void;
  stopLoading: () => void;
};

const useAuthStoreBase = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      isAuthed: false,
      isLoading: true,
      login: (user) => {
        set(
          produce<AuthStoreType>((state) => {
            state.isAuthed = true;
            state.user = user;
          })
        );
      },
      logout: () => {
        set(
          produce<AuthStoreType>((state) => {
            state.isAuthed = false;
            state.user = null;
          })
        );
      },
      stopLoading: () => {
        set(
          produce<AuthStoreType>((state) => {
            state.isLoading = false;
          })
        );
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthed: state.isAuthed,
      }),
    }
  )
);

const useAuthStore = createSelectorHooks(useAuthStoreBase);

export default useAuthStore;
