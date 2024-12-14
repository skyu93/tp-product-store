import { create } from 'zustand';
import { SearchBar } from '@/@types/searchBar.type';

export const useSearch = create<SearchBar>((set) => ({
  searchText: '',
  setSearchText: (text: string) => set({ searchText: text }),
}));
