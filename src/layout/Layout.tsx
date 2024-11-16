import { Outlet } from 'react-router-dom';
import { CartContext, SearchContext } from '@/provider/context';
import Header from '@/components/header/Header';
import styles from './Layout.module.css';
import useCartState from '@/hooks/useCartState';
import { useSearchState } from '@/hooks/useSearchState';

export default function Layout() {
  const { searchText, setSearchString } = useSearchState();
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
    <>
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
        <SearchContext.Provider value={{ searchText, setSearchText: setSearchString }}>
          <Header />
          <main className={styles.wrapper}>
            <Outlet />
          </main>
        </SearchContext.Provider>
      </CartContext.Provider>
    </>
  );
}
