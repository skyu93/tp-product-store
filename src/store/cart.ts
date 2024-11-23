import { create } from 'zustand';
import { Cart, CartProduct } from '@/@types/cart.type';
import { Product } from '@/@types/product.type';
import { isNill, isNotNill } from '@/utility/typeGuard';
import { LOCAL_STORAGE_CART_KEY } from '@/config/localstrage.config';

const hasProduct = (cartProducts: CartProduct[], product: Product): boolean => {
  return isNotNill(cartProducts.find((p) => p.id === product.id));
};

const getCartProductsFromLocalStorage = () => {
  const value = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
  return value ? JSON.parse(value) : [];
};
const saveCartProductsToLocalStorage = (newCartProducts: CartProduct[]) => {
  if (isNill(newCartProducts)) return;
  localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(newCartProducts));
};

const setCartProducts = (cartProducts: CartProduct[]) => {
  saveCartProductsToLocalStorage(cartProducts);
  return { cartProducts };
};

export const useCartStore = create<Cart>((set) => ({
  cartProducts: getCartProductsFromLocalStorage(),
  addProductToCart: (product: Product) =>
    set((state) => {
      if (hasProduct(state.cartProducts, product)) {
        return state;
      }

      const cartProducts: CartProduct[] = [
        ...state.cartProducts,
        {
          id: product.id,
          title: product.title,
          thumbnail: product.thumbnail,
          price: product.price,
          brand: product.brand,
          selected: false,
        },
      ];
      return setCartProducts(cartProducts);
    }),
  deleteProductFromCart: (productIds: string[]) =>
    set((state) => {
      const filteredCartProducts = state.cartProducts.filter((p) => !productIds.includes(p.id));

      return setCartProducts(filteredCartProducts);
    }),
  selectByProductId: (id: string) =>
    set((state) => {
      const cartProducts = state.cartProducts.map((c) => {
        if (c.id === id) {
          c.selected = true;
        }
        return c;
      });

      return setCartProducts(cartProducts);
    }),
  deselectByProductId: (id: string) =>
    set((state) => {
      const cartProducts = state.cartProducts.map((c) => {
        if (c.id === id) {
          c.selected = false;
        }
        return c;
      });
      return setCartProducts(cartProducts);
    }),
  selectAll: () =>
    set((state) => {
      const cartProducts = state.cartProducts.map((c) => {
        c.selected = true;
        return c;
      });
      return setCartProducts(cartProducts);
    }),
  deselectAll: () =>
    set((state) => {
      const cartProducts = state.cartProducts.map((c) => {
        c.selected = false;
        return c;
      });
      return setCartProducts(cartProducts);
    }),
}));
