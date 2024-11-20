import { CSSProperties, ReactNode, useEffect, useMemo, useRef } from 'react';
import styles from './VirtualizedList.module.css';
import useVirtualizedList from '@/hooks/useVirtualizedList';

type Props<T> = {
  className: string;
  items: T[];
  itemWidth: number;
  itemHeight: number;
  onIntersect: () => void;
  itemComponent: (item: T, index?: number) => ReactNode; // 렌더링 함수
};
const ITEM_CONTAINER_GAP = 16;
export default function VirtualizedList<T>({
  className,
  items,
  itemWidth,
  itemHeight,
  onIntersect,
  itemComponent,
}: Props<T>) {
  const targetIntersectRef = useRef<HTMLDivElement>(null);
  const visibleItemContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  itemWidth = itemWidth - ITEM_CONTAINER_GAP;
  const { startIndex, columnCount, rowCount } = useVirtualizedList({
    containerRef: visibleItemContainerRef,
    itemWidth,
    itemHeight,
  });

  const visibleItems = useMemo(() => {
    const startIdx = startIndex * columnCount;
    const endIdx = startIdx + columnCount * rowCount;
    return items.slice(startIdx, endIdx);
  }, [items, startIndex, columnCount, rowCount]);

  const viewportStyle: CSSProperties = {
    paddingTop: `${startIndex * itemHeight}px`,
    paddingBottom: `${
      Math.max(0, Math.ceil((items.length - (startIndex * columnCount + visibleItems.length)) / columnCount)) *
      itemHeight
    }px`,
    gridTemplateColumns: `repeat(auto-fill, minmax(${itemWidth}px, 1fr))`,
  };

  console.log('teo', viewportStyle);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        rootMargin: `0px 0px ${itemHeight * 2}px 0px`,
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
    <div className={`${styles.wrapper} ${className}`}>
      <div ref={visibleItemContainerRef} style={viewportStyle} className={styles.viewport}>
        {visibleItems.map((item, index) => {
          return itemComponent(item, index);
        })}
      </div>
      <div ref={targetIntersectRef} className={styles.target} />
    </div>
  );
}
