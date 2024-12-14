import styles from '@/components/search/SearchBar.module.css';
import searchIcon from '@/assets/icon/search.svg';
import { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import { debounce } from '@/utility';
import { isNill } from '@/utility/typeGuard';
import { useSearch } from '@/hooks/useSearch';
import { useLocation } from 'react-router-dom';

export default function SearchBar() {
  const setSearchText = useSearch((state) => state.setSearchText);
  const location = useLocation();
  const handleInputChange = useCallback(
    debounce((event?: ChangeEvent<HTMLInputElement>) => {
      if (isNill(event)) {
        return;
      }
      event.persist();
      const { value } = event.target;
      setSearchText(value);
    }, 250),
    [setSearchText],
  );

  const disabled = useMemo(() => {
    const { pathname } = location;
    return pathname !== '/';
  }, [location.pathname]);
  useEffect(() => {}, []);

  return (
    <div className={styles.searchContainer}>
      <input
        data-testid="input-search-bar"
        className={styles.searchInput}
        type="text"
        placeholder="검색어를 입력하세요"
        disabled={disabled}
        onInput={(e) => handleInputChange(e as ChangeEvent<HTMLInputElement>)}
      />
      <img className={styles.searchIcon} src={searchIcon} alt="검색" />
    </div>
  );
}
