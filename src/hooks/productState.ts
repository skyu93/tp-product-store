import { Product } from '@/types/product';
import { fetchProducts } from '@/api';
import { useState } from 'react';

export default function useProductState() {
	const [products, setProducts] = useState<Product[]>([]);
	let isLoading = false;
	let page = 0;
	let maxPage = 0;

	const getProducts = async () => {
		isLoading = true;
		const res = await fetchProducts({ page });
		maxPage = res?.total ?? 0;
		setProducts(prev => (res ? [...prev, ...res.products] : []));
		isLoading = false;
	};

	const setPage = (pageNum: number) => {
		page = pageNum;
		getProducts();
	};

	const nextPage = () => {
		const nextPageNum = page + 1;
		if (nextPageNum > maxPage) return;
		setPage(nextPageNum);
	};
	const prevPage = () => {
		const prevPageNum = page - 1;
		if (prevPageNum <= -1) return;
		setPage(prevPageNum);
	};

	return {
		products,
		isLoading,
		get isEmpty() {
			return products && products.length <= 0;
		},
		get currentPage() {
			return page;
		},
		nextPage,
		prevPage,
		setPage
	};
}
