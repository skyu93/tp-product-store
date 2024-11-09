import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { SearchContext } from '@/provider/context';
import Header from '@/components/header/Header';
import styles from './Layout.module.css';
import Products from '@/pages/product/Products';
import ProductDetail from '@/pages/product-detail/ProductDetail';

export default function Layout() {
  const [searchText, setSearchString] = useState('');
  const handleChangeSearchText = (text: string) => {
    setSearchString(text);
  };
  return (
    <HashRouter>
      <Header onInputSearch={handleChangeSearchText} />
      <main className={styles.wrapper}>
        <SearchContext.Provider value={searchText}>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </SearchContext.Provider>
      </main>
    </HashRouter>
  );
}
