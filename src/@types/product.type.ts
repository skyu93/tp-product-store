export type ProductCategory = string;

export interface ProductReview {
	rating: number;
	comment: string;
	date: string;
	reviewerName: string;
	reviewerEmail: string;
}

export interface Product {
	id: string;
	images: string[];
	stock: number;
	tags: ProductCategory[];
	thumbnail: string;
	title: string;
	brand: string;
	category: ProductCategory;
	rating: number;
	price: number;
	discountPercentage: number;
	reviews: ProductReview[];
}

export interface PaginatedProductsResponse {
	limit: number;
	skip: number;
	total: number;
	products: Product[];
}
