import { Product } from '@/@types/product.type';

export type CartProduct = Pick<Product, 'id' | 'title' | 'price' | 'brand' | 'thumbnail'> & { selected: boolean };
export type Cart = {
  cartProducts: CartProduct[];
  addProductToCart(product: Product): void;
  deleteProductFromCart(productIds: string[]): void;
  selectByProductId(id: string): void;
  deselectByProductId(id: string): void;
  selectAll(): void;
  deselectAll(): void;
};
