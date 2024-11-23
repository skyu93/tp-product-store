import { Outlet } from 'react-router-dom';
import { CartContext } from '@/provider/context';
import Header from '@/components/header/Header';
import styles from './Layout.module.css';
import useCartState from '@/hooks/useCartState';
import ModalProvider from '@/components/modal/ModalProvider';

export default function Layout() {
  const {
    cartProducts,
    addProductToCart,
    deleteProductFromCart,
    selectByProductId,
    deselectByProductId,
    selectAll,
    deselectAll,
    selectedCartProducts,
  } = useCartState();

  return (
    <ModalProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          addProductToCart,
          deleteProductFromCart,
          selectByProductId,
          deselectByProductId,
          selectAll,
          deselectAll,
          selectedCartProducts,
        }}
      >
        <Header />
        <main className={styles.wrapper}>
          <Outlet />
        </main>
      </CartContext.Provider>
    </ModalProvider>
  );
}
