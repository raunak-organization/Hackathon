import { createSlice } from '@reduxjs/toolkit';

export interface UserUIState {
  isUpdatePasswordVisible: boolean;
  isDeleteAccountModalOpen: boolean;
}

const initialState: UserUIState = {
  isUpdatePasswordVisible: false,
  isDeleteAccountModalOpen: false,
};

export const userSlice = createSlice({
  name: 'userUI',
  initialState,
  reducers: {
    toggleUpdatePasswordForm: (state) => {
      state.isUpdatePasswordVisible = !state.isUpdatePasswordVisible;
    },
    openDeleteAccountModal: (state) => {
      state.isDeleteAccountModalOpen = true;
    },
    closeDeleteAccountModal: (state) => {
      state.isDeleteAccountModalOpen = false;
    },
  },
});

export const {
  toggleUpdatePasswordForm,
  openDeleteAccountModal,
  closeDeleteAccountModal,
} = userSlice.actions;

export default userSlice.reducer;
