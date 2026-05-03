import { create } from 'zustand';

interface UserUIState {
  isUpdatePasswordVisible: boolean;
  isDeleteAccountModalOpen: boolean;

  toggleUpdatePasswordForm: () => void;
  openDeleteAccountModal: () => void;
  closeDeleteAccountModal: () => void;
}

export const useUserStore = create<UserUIState>((set) => ({
  isUpdatePasswordVisible: false,
  isDeleteAccountModalOpen: false,

  toggleUpdatePasswordForm: () =>
    set((state) => ({
      isUpdatePasswordVisible: !state.isUpdatePasswordVisible,
    })),

  openDeleteAccountModal: () =>
    set({
      isDeleteAccountModalOpen: true,
    }),

  closeDeleteAccountModal: () =>
    set({
      isDeleteAccountModalOpen: false,
    }),
}));
