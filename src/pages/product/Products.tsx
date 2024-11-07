import ProductItem from '@/pages/product/ProductItem';
import { useCallback, useEffect } from 'react';
import styles from './Products.module.css';
import VirtualizedList from '@/components/virtualized-list/VirtualizedList';
import useProductState from '@/hooks/productState';
import { Product } from '@/types/product';

const productItem = ({
	id,
	thumbnail,
	title,
	price,
	rating,
	discountPercentage,
	reviews
}: Product) => {
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
	const { products, isLoading, isEmpty, nextPage, setPage } =
		useProductState();

	useEffect(() => {
		setPage(0);
	}, []);

	const onIntersect = useCallback(nextPage, []);

	return (
		<>
			{isEmpty ? (
				<div className={styles.noProducts}>상품이 없습니다.</div>
			) : (
				<VirtualizedList<Product>
					items={products}
					itemWidth={4}
					itemHeight={400}
					onIntersect={onIntersect}
					renderItem={productItem}
				/>
			)}
		</>
	);
}
