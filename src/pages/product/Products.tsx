import ProductItem from '@/pages/product/ProductItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Products.module.css';
import VirtualizedList from '@/components/virtualized-list/VirtualizedList';
import useProductState from '@/hooks/useProductState';
import { Product } from '@/@types/product.type';
import { getResponsiveColumnWidth } from '@/utility';

export default function Products() {
  const { products, isEmpty, nextPage } = useProductState();
  const virtualizedListRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(300);

  const onIntersect = useCallback(nextPage, []);

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
      {isEmpty && <div className={styles.noProducts}>상품이 없습니다.</div>}
      {!isEmpty && (
        <div ref={virtualizedListRef}>
          <VirtualizedList<Product>
            items={products}
            itemWidth={itemWidth}
            itemHeight={400}
            onIntersect={onIntersect}
            renderComponent={(item) => {
              return (
                <ProductItem
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
