import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SearchContext } from '@/provider/context';
import Header from '@/components/header/Header';
import styles from './Layout.module.css';

export default function Layout() {
	const [searchText, setSearchString] = useState('');
	const handleChangeSearchText = (text: string) => {
		setSearchString(text);
	};
	return (
		<BrowserRouter>
			<Header onInputSearch={handleChangeSearchText} />
			<main className={styles.wrapper}>
				<SearchContext.Provider value={searchText}>
					<Routes>
						<Route path="/" element={<div>page</div>} />
					</Routes>
				</SearchContext.Provider>
			</main>
		</BrowserRouter>
	);
}
