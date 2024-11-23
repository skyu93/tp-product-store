import { create } from 'zustand';
import { Modal } from '@/@types/modal.type';
import { ReactNode } from 'react';

export const useModelStore = create<Modal>((set) => ({
  element: null,
  showModal: (children: ReactNode) => set({ element: children }),
  closeModal: () => set({ element: null }),
}));
