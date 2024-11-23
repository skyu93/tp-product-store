import { Outlet } from 'react-router-dom';
import Header from '@/components/header/Header';
import styles from './Layout.module.css';
import Modal from '@/components/modal/Modal';

export default function Layout() {
  return (
    <Modal>
      <Header />
      <main className={styles.wrapper}>
        <Outlet />
      </main>
    </Modal>
  );
}
