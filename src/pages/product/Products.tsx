import ProductItem from '@/pages/product/ProductItem';
import { useCallback, useEffect } from 'react';
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

  useEffect(nextPage, []);
  const onIntersect = useCallback(nextPage, []);
  const product = useCallback(ProductComponent, []);
  return (
    <>
      {isEmpty ? (
        <div className={styles.noProducts}>상품이 없습니다.</div>
      ) : (
        <VirtualizedList<Product>
          items={products}
          itemWidth={300}
          itemHeight={400}
          onIntersect={onIntersect}
          renderComponent={product}
        />
      )}
    </>
  );
}
