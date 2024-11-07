import { PaginatedProductsResponse } from '@/@types/product.type';
import { API_ENDPOINTS } from '@/config/api.config';

export const fetchProducts = async (
	props?: Partial<{
		limit: number;
		page: number;
	}>
): Promise<PaginatedProductsResponse | null> => {
	try {
		const { limit = 20, page = 0 } = props ?? {};
		const res = await fetch(
			`${API_ENDPOINTS.PRODUCT}?limit=${limit}&skip=${page}`
		);
		return res.json();
	} catch (error) {
		console.error(error);
		return null;
	}
};
export const fetchProductById = async (productId: string) => {
	try {
		const res = await fetch(`${API_ENDPOINTS.PRODUCT}?${productId}`);
		return res.json();
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const fetchProductCategories = async (): Promise<string[] | null> => {
	try {
		const res = await fetch(`${API_ENDPOINTS.PRODUCT}/categories'`);
		return res.json();
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const fetchSearchProduct = async (
	queryString: string
): Promise<string | null> => {
	try {
		const res = await fetch(
			`${API_ENDPOINTS.PRODUCT}/search?q=${queryString}'`
		);
		return res.json();
	} catch (error) {
		console.error(error);
		return null;
	}
};
