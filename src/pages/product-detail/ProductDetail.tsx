import styles from './ProductDetail.module.css';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { fetchProductById } from '@/api';
import { isNill } from '@/utility/typeGuard';
import { Product } from '@/@types/product.type';
import Image from '@/components/image/Image';
import starIcon from '@/assets/icon/star.svg';
import { CartContext } from '@/provider/context';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addProductToCart } = useContext(CartContext);

  useEffect(() => {
    const getProduct = async () => {
      if (isNill(id)) return;
      const res = await fetchProductById(id);
      if (isNill(res)) return;
      setProduct(res);
    };
    getProduct();
  }, [id]);
  if (isNill(product)) {
    return <div style={{ margin: '10px' }}>로딩중...</div>;
  }

  const { title, price, discountPercentage, category, rating, stock, brand, thumbnail } = product;
  return (
    <div className={styles.container}>
      <div className={styles.detailWrap}>
        <Image className={styles.image} src={thumbnail} alt={title} />
        <div className={styles.info}>
          <span className={styles.category}>{category}</span>
          <h1 className={styles.title}>{title}</h1>
          {brand && <p className={styles.brand}>by {brand}</p>}
          <p className={styles.price}>
            ${price} <span className={styles.discount}>({discountPercentage}% OFF)</span>
          </p>
          <div className={styles.ratingStock}>
            <div className={styles.rating}>
              <img src={starIcon} alt="별점" /> {rating} / 5
            </div>
            <span className={styles.stock}>(stock: {stock})</span>
          </div>
        </div>
      </div>
      <button className={styles.cartBtn} onClick={() => addProductToCart(product)}>
        장바구니 추가
      </button>
    </div>
  );
}