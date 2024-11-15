import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react';
import { CartContext } from '@/provider/context';
import styles from './Cart.module.css';
import CartProduct from '@/pages/cart/CartProduct';

export default function Cart() {
  const { cartProducts, selectedCartProducts, selectAll, deselectAll, deleteProductFromCart } = useContext(CartContext);
  const [isNotOrderable, setOrderable] = useState(true);

  const totalPrice = useMemo(() => {
    const price = selectedCartProducts.reduce((price, product) => price + product.price, 0);
    return price.toFixed(2);
  }, [selectedCartProducts]);

  useEffect(() => {
    setOrderable(selectedCartProducts.length <= 0);
  }, [selectedCartProducts]);

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
          <span>전체 선택</span> {isNotOrderable}
        </label>
        <div>
          <button className={styles.selectedBtn} onClick={handleDeleteProduct}>
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
