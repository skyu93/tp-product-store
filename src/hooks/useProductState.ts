import { Product } from '@/@types/product.type';
import { fetchProducts } from '@/api';
import { useRef, useState } from 'react';
import { isNill } from '@/utility/typeGuard';

export default function useProductState() {
  const [products, setProducts] = useState<Product[]>([]);
  const maxProductCount = useRef(Infinity);
  const productsLength = useRef(0);
  const page = useRef(-1);
  const isLoading = useRef(false);

  const getProducts = async (pageNum: number) => {
    if (productsLength.current >= maxProductCount.current) return;
    isLoading.current = true;

    const res = await fetchProducts({ page: pageNum });
    if (isNill(res)) {
      isLoading.current = false;
      return;
    }
    page.current = pageNum;
    maxProductCount.current = res?.total ?? 0;

    //Q. products useState값을 사용해서 해결할 수 없을까...?
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts, ...res.products];
      productsLength.current = newProducts.length;
      return newProducts;
    });

    isLoading.current = false;
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
    isLoading,
    get isEmpty() {
      return products && products.length <= 0;
    },
    setPage,
    nextPage,
    prevPage,
  };
}
