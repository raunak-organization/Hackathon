import { create } from 'zustand';

interface DeploymentUIState {
  selectedDeploymentId: string | null;
  activeTab: 'logs' | 'env';
  setSelectedDeployment: (id: string | null) => void;
  setActiveTab: (tab: 'logs' | 'env') => void;
}

export const useDeploymentStore = create<DeploymentUIState>((set) => ({
  selectedDeploymentId: null,
  activeTab: 'logs',
  setSelectedDeployment: (id) => set({ selectedDeploymentId: id }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
