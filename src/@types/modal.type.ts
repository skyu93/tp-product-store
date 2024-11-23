import { ReactNode } from 'react';

export const PORTAL_ELEMENT_ID = 'modal';
export type Modal = {
  element: ReactNode | null;
  showModal: (children: ReactNode) => void;
  closeModal: () => void;
};
