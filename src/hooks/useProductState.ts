import { Product } from '@/@types/product.type';
import { fetchProducts, fetchSearchProduct } from '@/api';
import { useRef, useState } from 'react';
import { isNill } from '@/utility/typeGuard';

export default function useProductState() {
  const [products, setProducts] = useState<Product[]>([]);
  const maxProductCount = useRef(Infinity);
  const productsLength = useRef(0);
  const page = useRef(-1);

  const getProducts = async (pageNum: number) => {
    if (productsLength.current >= maxProductCount.current) {
      return;
    }

    const res = await fetchProducts({ page: pageNum });
    if (isNill(res)) {
      return;
    }
    page.current = pageNum;
    maxProductCount.current = res?.total ?? 0;

    setProducts((prevProducts) => {
      const newProducts = [...prevProducts, ...res.products];
      productsLength.current = newProducts.length;
      return newProducts;
    });
  };

  const searchProducts = async (searchText: string) => {
    if (isNill(searchText) || searchText === '') {
      return;
    }

    const res = await fetchSearchProduct(searchText);
    productsLength.current = 0;
    setProducts(res ? [...res?.products] : []);
  };

  const setPage = (pageNum: number) => {
    getProducts(pageNum);
  };
  const nextPage = () => {
    setPage(page.current + 1);
  };
  const prevPage = () => {
    setPage(page.current - 1);
  };

  return {
    products,
    setPage,
    nextPage,
    prevPage,
    searchProducts,
  };
}
