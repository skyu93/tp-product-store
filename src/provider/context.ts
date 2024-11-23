import { createContext } from 'react';
import { Cart } from '@/@types/cart.type';

export const CartContext = createContext<Cart>({
  cartProducts: [],
  selectedCartProducts: [],
  addProductToCart: () => {},
  deleteProductFromCart: () => {},
  selectByProductId: () => {},
  deselectByProductId: () => {},
  selectAll: () => {},
  deselectAll: () => {},
});
