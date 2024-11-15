import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CartContext, SearchContext } from '@/provider/context';
import Header from '@/components/header/Header';
import styles from './Layout.module.css';
import useCartState from '@/hooks/useCartState';

export default function Layout() {
  const [searchText, setSearchString] = useState('');
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
  const handleChangeSearchText = (text: string) => {
    setSearchString(text);
  };

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
        <Header onInputSearch={handleChangeSearchText} />
        <main className={styles.wrapper}>
          <SearchContext.Provider value={searchText}>
            <Outlet />
          </SearchContext.Provider>
        </main>
      </CartContext.Provider>
    </>
  );
}
