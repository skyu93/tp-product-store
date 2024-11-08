export type ProductCategory = string;

export type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type Product = {
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
};

export type PaginatedProductsResponse = {
  limit: number;
  skip: number;
  total: number;
  products: Product[];
};
