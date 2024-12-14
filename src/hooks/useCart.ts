import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartProduct } from '@/@types/cart.type';
import { Product } from '@/@types/product.type';
import { LOCAL_STORAGE_CART_KEY } from '@/config/localstrage.config';

export const useCart = create<Cart>()(
  persist(
    (set) => ({
      cartProducts: [],
      addProductToCart: (product: Product) =>
        set((state) => {
          const newCartProduct: CartProduct = {
            id: product.id,
            title: product.title,
            thumbnail: product.thumbnail,
            price: product.price,
            brand: product.brand,
            selected: false,
          };
          const cartProducts = [...state.cartProducts, newCartProduct];
          return { cartProducts };
        }),
      deleteProductFromCart: (productIds: string[]) =>
        set((state) => {
          const cartProducts = state.cartProducts.filter((product) => !productIds.includes(product.id));
          return { cartProducts };
        }),
      selectByProductId: (id: string) =>
        set((state) => {
          const cartProducts = state.cartProducts.map((product) =>
            product.id === id ? { ...product, selected: true } : product,
          );
          return { cartProducts };
        }),
      deselectByProductId: (id: string) =>
        set((state) => {
          const cartProducts = state.cartProducts.map((product) =>
            product.id === id ? { ...product, selected: false } : product,
          );
          return { cartProducts };
        }),
      selectAll: () =>
        set((state) => {
          const cartProducts = state.cartProducts.map((product) => ({
            ...product,
            selected: true,
          }));
          return { cartProducts };
        }),
      deselectAll: () =>
        set((state) => {
          const cartProducts = state.cartProducts.map((product) => ({
            ...product,
            selected: false,
          }));
          return { cartProducts };
        }),
    }),
    {
      name: LOCAL_STORAGE_CART_KEY, // 로컬 스토리지 키
    },
  ),
);
