import { RefObject, useCallback, useEffect, useState } from 'react';

type Props = {
  containerRef: RefObject<HTMLDivElement>;
  itemWidth: number;
  itemHeight: number;
};

type VirtualizedData = {
  startIndex: number;
  columnCount: number;
  rowCount: number;
};

export default function useVirtualizedList({ containerRef, itemWidth, itemHeight }: Props): VirtualizedData {
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [containerWidth, setContainerWidth] = useState(0);

  const updateContainerWidth = useCallback(() => {
    if (!containerRef.current) return;
    const width = containerRef.current?.getBoundingClientRect().width;
    setContainerWidth(width);
  }, [containerRef]);

  const handleScrollEvent = useCallback(() => {
    if (!containerRef.current) return;
    const windowScrollTop = window.scrollY || document.documentElement.scrollTop;

    setScrollTop(windowScrollTop);
  }, [containerRef]);

  const handleResize = useCallback(() => {
    setViewportHeight(window.innerHeight);
    updateContainerWidth();
  }, [updateContainerWidth]);

  useEffect(() => {
    updateContainerWidth();

    window.addEventListener('scroll', handleScrollEvent);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef, handleScrollEvent, handleResize, updateContainerWidth]);

  const calculate = useCallback((): VirtualizedData => {
    const columnCount = Math.max(1, Math.floor(containerWidth / itemWidth));
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight));
    const rowCount = Math.ceil(viewportHeight / itemHeight);

    return {
      startIndex,
      columnCount,
      rowCount,
    };
  }, [containerWidth, viewportHeight, scrollTop, itemWidth, itemHeight]);

  return calculate();
}
