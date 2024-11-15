import styles from './CartProduct.module.css';
import Image from '@/components/image/Image';
import type { CartProduct } from '@/@types/cart.type';
import { ChangeEvent, useContext } from 'react';
import { CartContext } from '@/provider/context';

type Props = {
  product: CartProduct;
};
export default function CartProduct({ product }: Props) {
  const { id, title, price, brand, thumbnail, selected } = product;
  const { selectByProductId, deselectByProductId } = useContext(CartContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      selectByProductId(id);
    } else {
      deselectByProductId(id);
    }
  };

  return (
    <div className={styles.container}>
      <input className={styles.checkBox} type="checkbox" checked={selected} onChange={handleChange} />
      <Image className={styles.image} width={100} src={thumbnail} alt={title} />
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.price}>${price}</p>
        {brand && <p className={styles.brand}>by {brand}</p>}
      </div>
    </div>
  );
}