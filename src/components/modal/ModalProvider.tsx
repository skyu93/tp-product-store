import styles from './Modal.module.css';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from '@/provider/context';
import { PORTAL_ELEMENT_ID } from '@/@types/modal.type';

type Props = {
  children: ReactNode;
};

export default function ModalProvider({ children }: Props) {
  const portalEl = useRef<HTMLElement | null>(null);
  const [isVisible, setVisible] = useState(false);
  const [modalElement, setModalElement] = useState<ReactNode | null>(null);
  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      console.log('Escape key was pressed!');
    }
  };

  const showModal = (children: ReactNode) => {
    setVisible(true);
    setModalElement(children);
  };
  const closeModal = () => {
    console.log('teo closeModal');
    setVisible(false);
    setModalElement(null);
  };

  useEffect(() => {
    portalEl.current = document.getElementById(PORTAL_ELEMENT_ID);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <>
      {!portalEl && null}
      {portalEl && (
        <>
          <ModalContext.Provider value={{ showModal, closeModal, isVisible }}>{children}</ModalContext.Provider>
          {modalElement && createPortal(<div className={styles.modal}>{modalElement}</div>, portalEl.current!)}
        </>
      )}
    </>
  );
}
