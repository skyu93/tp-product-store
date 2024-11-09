import ProductItem from '@/pages/product/ProductItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Products.module.css';
import VirtualizedList from '@/components/virtualized-list/VirtualizedList';
import useProductState from '@/hooks/useProductState';
import { Product } from '@/@types/product.type';

const ProductComponent = ({ id, thumbnail, title, price, rating, discountPercentage, reviews }: Product) => {
  return (
    <ProductItem
      key={id}
      image={thumbnail}
      name={title}
      price={price}
      rating={rating}
      reviewCount={reviews.length}
      discountRate={discountPercentage}
    />
  );
};

export default function Products() {
  const { products, isEmpty, nextPage } = useProductState();
  const virtualizedListRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(300);

  useEffect(nextPage, []);
  const onIntersect = useCallback(nextPage, []);
  const product = useCallback(ProductComponent, []);

  useEffect(() => {
    if (!virtualizedListRef.current) return;

    const updateItemWidth = () => {
      const width = virtualizedListRef.current?.offsetWidth || 0;
      if (width >= 1200) {
        setItemWidth(Math.trunc(width / 4));
      } else if (width >= 768 && width <= 1119) {
        setItemWidth(Math.trunc(width / 3));
      } else {
        setItemWidth(Math.trunc(width / 2));
      }
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
      {isEmpty ? (
        <div className={styles.noProducts}>상품이 없습니다.</div>
      ) : (
        <div ref={virtualizedListRef}>
          <VirtualizedList<Product>
            items={products}
            itemWidth={itemWidth}
            itemHeight={400}
            onIntersect={onIntersect}
            renderComponent={product}
          />
        </div>
      )}
    </>
  );
}
