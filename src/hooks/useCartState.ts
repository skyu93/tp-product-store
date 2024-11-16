import { useMemo, useState } from 'react';
import { CartProduct } from '@/@types/cart.type';
import { Product } from '@/@types/product.type';
import { isNotNill } from '@/utility/typeGuard';

export default function useCartState() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>(() => {
    const value = localStorage.getItem('cartProducts');
    return value ? JSON.parse(value) : [];
  });

  const hasProduct = (product: Product): boolean => {
    return isNotNill(cartProducts.find((p) => p.id === product.id));
  };

  const updateCart = (newCartProducts: CartProduct[]) => {
    localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
    setCartProducts(newCartProducts);
  };

  const addProductToCart = (product: Product) => {
    if (hasProduct(product)) {
      return;
    }

    const newCartProducts: CartProduct[] = [
      ...cartProducts,
      {
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        brand: product.brand,
        selected: false,
      },
    ];

    updateCart(newCartProducts);
  };

  const deleteProductFromCart = (productIds: string[]) => {
    const newCartProducts = cartProducts.filter((p) => !productIds.includes(p.id));
    updateCart(newCartProducts);
  };

  const selectByProductId = (productId: string) => {
    const newCartProducts = cartProducts.map((c) => {
      if (c.id === productId) {
        c.selected = true;
      }
      return c;
    });

    updateCart(newCartProducts);
  };

  const deselectByProductId = (productId: string) => {
    const newCartProducts = cartProducts.map((c) => {
      if (c.id === productId) {
        c.selected = false;
      }
      return c;
    });

    updateCart(newCartProducts);
  };

  const selectAll = () => {
    const newCartProducts = cartProducts.map((c) => {
      c.selected = true;
      return c;
    });
    updateCart(newCartProducts);
  };

  const deselectAll = () => {
    const newCartProducts = cartProducts.map((c) => {
      c.selected = false;
      return c;
    });
    updateCart(newCartProducts);
  };

  const selectedCartProducts = useMemo(() => {
    return cartProducts.filter((c) => c.selected);
  }, [cartProducts]);
  return {
    cartProducts,
    selectedCartProducts,
    addProductToCart,
    deleteProductFromCart,
    selectByProductId,
    deselectByProductId,
    selectAll,
    deselectAll,
  };
}
