import { createContext } from 'react';
import { Cart } from '@/@types/cart.type';
import { Modal } from '@/@types/modal.type';

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
export const ModalContext = createContext<Modal>({
  showModal: () => {},
  closeModal: () => {},
  isVisible: false,
});
