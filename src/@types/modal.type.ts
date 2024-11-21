import { ReactNode } from 'react';

export type Modal = {
  showModal: (children: ReactNode) => void;
  closeModal: () => void;
  isVisible: boolean;
};
export const PORTAL_ELEMENT_ID = 'modal';
