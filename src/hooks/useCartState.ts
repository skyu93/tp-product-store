import { useMemo, useState } from 'react';
import { CartProduct } from '@/@types/cart.type';
import { Product } from '@/@types/product.type';
import { isNotNill } from '@/utility/typeGuard';

export default function useCartState() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const hasProduct = (product: Product): boolean => {
    return isNotNill(cartProducts.find((p) => p.id === product.id));
  };

  const addProductToCart = (product: Product) => {
    if (hasProduct(product)) {
      return;
    }

    const newCartProduct: CartProduct = {
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
      brand: product.brand,
      selected: false,
    };

    setCartProducts([...cartProducts, newCartProduct]);
  };

  const deleteProductFromCart = (productIds: string[]) => {
    const newCartProducts = cartProducts.filter((p) => productIds.includes(p.id));
    setCartProducts(newCartProducts);
  };

  const selectByProductId = (productId: string) => {
    const newCartProducts = cartProducts.map((c) => {
      if (c.id === productId) {
        c.selected = true;
      }
      return c;
    });

    setCartProducts(newCartProducts);
  };

  const deselectByProductId = (productId: string) => {
    const newCartProducts = cartProducts.map((c) => {
      if (c.id === productId) {
        c.selected = false;
      }
      return c;
    });

    setCartProducts(newCartProducts);
  };

  const selectAll = () => {
    const newCartProducts = cartProducts.map((c) => {
      c.selected = true;
      return c;
    });
    setCartProducts(newCartProducts);
  };

  const deselectAll = () => {
    const newCartProducts = cartProducts.map((c) => {
      c.selected = false;
      return c;
    });
    setCartProducts(newCartProducts);
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
