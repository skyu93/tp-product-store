import { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import styles from './VirtualizedList.module.css';
import useVirtualizedList from '@/hooks/virtualizedList';

export default function VirtualizedList<T>({
	items,
	itemWidth,
	itemHeight,
	onIntersect,
	renderItem
}: {
	items: T[];
	itemWidth: number;
	itemHeight: number;
	onIntersect: () => void;
	renderItem: (item: T, index?: number) => ReactNode; // 렌더링 함수
}) {
	const targetRef = useRef<HTMLDivElement>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const { startIndex, endIndex, rowCount } = useVirtualizedList(
		containerRef.current?.getBoundingClientRect().width ?? 0,
		itemWidth,
		itemHeight
	);
	console.log('teo', containerRef.current?.classList);

	const cssStyle: CSSProperties = {
		paddingTop: `${startIndex * itemHeight}px`,
		paddingBottom: `${itemHeight * 2}px` // 여윳 공간
	};
	const visibleItems = items.slice(startIndex * rowCount, endIndex);

	useEffect(() => {
		observerRef.current = new IntersectionObserver(
			entries => {
				const [entry] = entries;
				if (entry.isIntersecting) {
					onIntersect();
				}
			},
			{
				root: null,
				rootMargin: `0px 0px ${itemHeight * 2}px 0px`
			}
		);

		if (targetRef.current) {
			observerRef.current.observe(targetRef.current);
		}

		return () => {
			observerRef.current?.disconnect();
		};
	}, [itemHeight, targetRef]);

	return (
		<div className={styles.virtualizedList}>
			<div className={styles.viewport} style={cssStyle}>
				<div ref={containerRef} className={styles.itemContainer}>
					{visibleItems.map((item, index) => {
						return renderItem(item, index);
					})}
				</div>

				<div ref={targetRef} className={styles.intersectionTarget} />
			</div>
		</div>
	);
}
