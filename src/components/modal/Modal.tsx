import styles from './Modal.module.css';
import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { PORTAL_ELEMENT_ID } from '@/@types/modal.type';
import { useModelStore } from '@/store/modal';

type Props = {
  children: ReactNode;
};

export default function Modal({ children }: Props) {
  const portalEl = useRef<HTMLElement | null>(null);
  const modalEl = useModelStore((state) => state.element);
  useEffect(() => {
    portalEl.current = document.getElementById(PORTAL_ELEMENT_ID);
  }, []);

  return (
    <>
      {!portalEl && null}
      {portalEl && (
        <>
          {children}
          {modalEl && createPortal(<div className={styles.modal}>{modalEl}</div>, portalEl.current!)}
        </>
      )}
    </>
  );
}
