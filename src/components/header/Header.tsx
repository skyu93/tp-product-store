import styles from './Header.module.css';
import searchIcon from '@/assets/icon/search.svg';
import cartIcon from '@/assets/icon/cart.svg';
import { ChangeEvent } from 'react';

type Props = {
  onInputSearch(text: string): void;
};

export default function Header({ onInputSearch }: Props) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onInputSearch(value);
  };
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="검색어를 입력하세요"
          onInput={handleInputChange}
        />
        <img className={styles.searchIcon} src={searchIcon} alt="검색" />
      </div>
      <div className={styles.iconsContainer}>
        <button>
          <img className={styles.icon} src={cartIcon} alt="장바구니 아이콘 버튼" />
        </button>
      </div>
    </header>
  );
}
