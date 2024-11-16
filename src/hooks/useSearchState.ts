import { useState } from 'react';

export const useSearchState = () => {
  const [searchText, setSearchText] = useState<string>('');
  const setSearchString = (searchString: string) => {
    setSearchText(searchString);
  };
  return {
    searchText,
    setSearchString,
  };
};
