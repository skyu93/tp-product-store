import styles from '@/components/search/SearchBar.module.css';
import searchIcon from '@/assets/icon/search.svg';
import { ChangeEvent, useContext } from 'react';
import { debounce } from '@/utility';
import { SearchContext } from '@/provider/context';
import { isNill } from '@/utility/typeGuard';

export default function SearchBar() {
  const { setSearchText } = useContext(SearchContext);
  const handleInputChange = debounce((event?: ChangeEvent<HTMLInputElement>) => {
    if (isNill(event)) {
      return;
    }
    event.persist();
    const { value } = event.target;
    setSearchText(value);
  }, 250);

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="검색어를 입력하세요"
        onInput={(e) => handleInputChange(e as ChangeEvent<HTMLInputElement>)}
      />
      <img className={styles.searchIcon} src={searchIcon} alt="검색" />
    </div>
  );
}
