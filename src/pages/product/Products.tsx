import ProductItem from '@/pages/product/ProductItem';
import { useEffect, useRef, useState } from 'react';
import styles from './Products.module.css';
import VirtualizedList from '@/components/virtualized-list/VirtualizedList';
import useProductState from '@/hooks/useProductState';
import { Product } from '@/@types/product.type';
import { getResponsiveColumnWidth, throttle } from '@/utility';
import { useSearchStore } from '@/store/search';

export default function Products() {
  const { products, nextPage, setPage, searchProducts } = useProductState();
  const { searchText } = useSearchStore();
  const virtualizedListRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(300);
  const isProductEmpty = () => {
    return !products || products.length <= 0;
  };

  const onIntersect = throttle(() => {
    if (searchText !== '' || isProductEmpty()) {
      return;
    }
    nextPage();
  }, 200);

  useEffect(() => {
    if (searchText === '') {
      setPage(0);
    } else {
      searchProducts(searchText);
    }
  }, [searchText]);

  useEffect(() => {
    if (!virtualizedListRef.current) return;

    const updateItemWidth = () => {
      const width = virtualizedListRef.current?.offsetWidth || 0;
      setItemWidth(getResponsiveColumnWidth(width));
    };

    updateItemWidth();
    const observer = new ResizeObserver(updateItemWidth);
    observer.observe(virtualizedListRef.current);

    return () => {
      if (virtualizedListRef.current) {
        observer.unobserve(virtualizedListRef.current);
      }
    };
  }, [virtualizedListRef, products]);

  return (
    <>
      {isProductEmpty() && <div className={styles.noProducts}>상품이 없습니다.</div>}
      {!isProductEmpty() && (
        <div ref={virtualizedListRef}>
          <VirtualizedList<Product>
            items={products}
            itemWidth={itemWidth}
            itemHeight={400}
            onIntersect={onIntersect}
            itemComponent={(item) => {
              return (
                <ProductItem
                  key={item.id}
                  id={item.id}
                  image={item.thumbnail}
                  name={item.title}
                  price={item.price}
                  rating={item.rating}
                  discountRate={item.discountPercentage}
                  reviewCount={item.reviews.length}
                />
              );
            }}
          />
        </div>
      )}
    </>
  );
}
