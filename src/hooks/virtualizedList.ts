import { useEffect, useState } from 'react';

export default function useVirtualizedList(
	containerWidth: number,
	itemWidth: number,
	itemHeight: number
) {
	const [scrollTop, setScrollTop] = useState(0);
	const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
	const calculateRowCount = () => {
		if (!containerWidth) return 1;
		console.log('teo containerWidth', containerWidth);
		return Math.floor(containerWidth / itemWidth);
	};

	const [rowCount, setRowCount] = useState(calculateRowCount());

	useEffect(() => {
		const handleScrollEvent = () => {
			setScrollTop(window.scrollY || document.documentElement.scrollTop);
		};
		const handleResize = () => {
			setViewportHeight(window.innerHeight);
			setRowCount(calculateRowCount());
		};

		document.addEventListener('scroll', handleScrollEvent);
		document.addEventListener('resize', handleResize);

		return () => {
			document.removeEventListener('scroll', handleScrollEvent);
			document.addEventListener('resize', handleResize);
		};
	}, [itemHeight, containerWidth]);

	// 보이는 아이템 개수 계산
	const visibleCount = Math.ceil(viewportHeight / itemHeight) * rowCount;
	// 시작 인덱스 계산
	const startIndex = Math.floor(scrollTop / itemHeight);
	// 보이는 아이템들 슬라이스
	const endIndex = startIndex * rowCount + (visibleCount + rowCount * 2);

	return { rowCount, startIndex, endIndex };
}
