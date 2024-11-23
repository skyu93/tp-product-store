import { ChangeEvent, useMemo } from 'react';
import styles from './Cart.module.css';
import CartProduct from '@/pages/cart/CartProduct';
import { useCartStore } from '@/store/cart';

export default function Cart() {
  const { cartProducts, selectAll, deselectAll, deleteProductFromCart } = useCartStore();
  const selectedCartProducts = useMemo(() => cartProducts.filter((c) => c.selected), [cartProducts]);

  const totalPrice = useMemo(() => {
    const price = selectedCartProducts.reduce((price, product) => price + product.price, 0);
    return price.toFixed(2);
  }, [selectedCartProducts]);

  const isNotOrderable = useMemo(() => selectedCartProducts.length <= 0, [selectedCartProducts]);
  const handleAllSelect = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.checked) {
      selectAll();
    } else {
      deselectAll();
    }
  };

  const handleDeleteProduct = () => {
    const productIds = selectedCartProducts.map((p) => p.id);
    deleteProductFromCart(productIds);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrap}>
        <label>
          <input type="checkbox" style={{ cursor: 'pointer' }} onChange={handleAllSelect} />
          <span>전체 선택</span>
        </label>
        <div>
          <button className={styles.selectedBtn} disabled={isNotOrderable} onClick={handleDeleteProduct}>
            X 선택 삭제
          </button>
        </div>
      </div>
      <div className={styles.cartItems}>
        {cartProducts.map((p) => (
          <CartProduct key={p.id} product={p} />
        ))}
      </div>
      <div className={styles.footerWrap}>
        <div>
          <em>
            <span className={styles.price}>$ {totalPrice}</span>
          </em>
        </div>

        <div>
          <button className={styles.orderBtn} disabled={isNotOrderable}>
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
}
