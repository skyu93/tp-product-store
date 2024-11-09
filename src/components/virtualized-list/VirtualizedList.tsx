import { CSSProperties, ReactNode, useEffect, useMemo, useRef } from 'react';
import styles from './VirtualizedList.module.css';
import useVirtualizedList from '@/hooks/useVirtualizedList';

type Props<T> = {
  items: T[];
  itemWidth: number;
  itemHeight: number;
  onIntersect: () => void;
  renderComponent: (item: T, index?: number) => ReactNode; // 렌더링 함수
};
export default function VirtualizedList<T>({ items, itemWidth, itemHeight, onIntersect, renderComponent }: Props<T>) {
  const targetIntersectRef = useRef<HTMLDivElement>(null);
  const visibleItemContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { startIndex, columnCount, rowCount } = useVirtualizedList(visibleItemContainerRef, itemWidth, itemHeight);

  const viewportStyle: CSSProperties = {
    paddingTop: `${startIndex * itemHeight}px`,
    paddingBottom: `${itemHeight * 2}px`, // 여윳 공간
  };
  const visibleItems = useMemo(() => {
    return items.slice(startIndex * columnCount, startIndex * columnCount + columnCount * rowCount);
  }, [startIndex, columnCount, rowCount]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        rootMargin: `0px 0px ${viewportStyle.paddingBottom} 0px`,
      },
    );

    if (targetIntersectRef.current) {
      observerRef.current.observe(targetIntersectRef.current);
    }
    return () => {
      observerRef.current?.disconnect();
    };
  }, [onIntersect, observerRef, targetIntersectRef, visibleItems]);

  return (
    <div className={styles.virtualizedList}>
      <div className={styles.viewport} style={viewportStyle}>
        <div ref={visibleItemContainerRef} className={styles.itemContainer}>
          {visibleItems.map((item, index) => {
            return renderComponent(item, index);
          })}
        </div>
      </div>
      <div ref={targetIntersectRef} className={styles.intersectionTarget} />
    </div>
  );
}
