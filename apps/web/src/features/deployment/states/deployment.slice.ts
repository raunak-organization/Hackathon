import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DeploymentState {
  selectedDeploymentId: string | null;
  isCreateModalOpen: boolean;
  isLogViewerOpen: boolean;
}

const initialState: DeploymentState = {
  selectedDeploymentId: null,
  isCreateModalOpen: false,
  isLogViewerOpen: false,
};

export const deploymentSlice = createSlice({
  name: 'deployment',
  initialState,
  reducers: {
    openCreateModal: (state) => {
      state.isCreateModalOpen = true;
    },
    closeCreateModal: (state) => {
      state.isCreateModalOpen = false;
    },

    openLogViewer: (state, action: PayloadAction<string>) => {
      state.selectedDeploymentId = action.payload;
      state.isLogViewerOpen = true;
    },
    closeLogViewer: (state) => {
      state.isLogViewerOpen = false;
      state.selectedDeploymentId = null;
    },

    setSelectedDeployment: (state, action: PayloadAction<string | null>) => {
      state.selectedDeploymentId = action.payload;
    },
  },
});

export const {
  openCreateModal,
  closeCreateModal,
  openLogViewer,
  closeLogViewer,
  setSelectedDeployment,
} = deploymentSlice.actions;

export default deploymentSlice.reducer;
