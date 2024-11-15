import styles from './Header.module.css';
import searchIcon from '@/assets/icon/search.svg';
import cartIcon from '@/assets/icon/cart.svg';
import backIcon from '@/assets/icon/back.svg';
import { ChangeEvent, useContext } from 'react';
import { CartContext } from '@/provider/context';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  onInputSearch(text: string): void;
};

const CountBadge = ({ count }: { count: number }) => {
  if (!count || count <= 0) return null;
  if (count > 99) {
    return <div className={styles.badge}>99+</div>;
  }

  return <div className={styles.badge}>{count}</div>;
};
export default function Header({ onInputSearch }: Props) {
  const { cartProducts } = useContext(CartContext);
  const navigate = useNavigate();
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onInputSearch(value);
  };
  const goBack = async () => navigate(-1);

  return (
    <header>
      <div className={styles.headerWrapper}>
        <button onClick={goBack} className={styles.backBtn}>
          <img className={styles.icon} src={backIcon} alt="뒤로 가기" />
        </button>
        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="검색어를 입력하세요"
            onInput={handleInputChange}
          />
          <img className={styles.searchIcon} src={searchIcon} alt="검색" />
        </div>
        <Link to="/cart" className={styles.cartBtn}>
          {<CountBadge count={cartProducts.length} />}
          <img className={styles.icon} src={cartIcon} alt="장바구니 아이콘 버튼" />
        </Link>
      </div>
    </header>
  );
}
