import styles from './Header.module.css';
import cartIcon from '@/assets/icon/cart.svg';
import backIcon from '@/assets/icon/back.svg';
import { Link, useNavigate } from 'react-router-dom';
import CountBadge from '@/components/header/CountBadge';
import SearchBar from '@/components/search/SearchBar';
import { useCartStore } from '@/store/cart';

export default function Header() {
  const { cartProducts } = useCartStore();
  const navigate = useNavigate();
  const goBack = async () => navigate(-1);

  return (
    <header>
      <div className={styles.headerWrapper}>
        <button onClick={goBack} className={styles.backBtn}>
          <img className={styles.icon} src={backIcon} alt="뒤로 가기" />
        </button>
        <SearchBar />
        <Link to="/cart" className={styles.cartBtn}>
          {<CountBadge count={cartProducts.length} />}
          <img className={styles.icon} src={cartIcon} alt="장바구니 아이콘 버튼" />
        </Link>
      </div>
    </header>
  );
}
