import { RefObject, useCallback, useEffect, useState } from 'react';

export default function useVirtualizedList(
  containerRef: RefObject<HTMLDivElement>,
  itemWidth: number,
  itemHeight: number,
) {
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [containerWidth, setContainerWidth] = useState(0);

  const updateContainerWidth = () => {
    const width = containerRef.current?.getBoundingClientRect().width ?? 0;
    setContainerWidth(width);
  };

  const handleScrollEvent = () => {
    setScrollTop(window.scrollY || document.documentElement.scrollTop);
  };

  const handleResize = () => {
    setViewportHeight(window.innerHeight);
    updateContainerWidth();
  };

  useEffect(() => {
    updateContainerWidth();
    window.addEventListener('scroll', handleScrollEvent);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
      window.addEventListener('resize', handleResize);
    };
  }, [containerRef]);

  const calc = useCallback(() => {
    const columnCount = Math.floor(containerWidth / itemWidth);
    const startIndex = Math.floor(scrollTop / itemHeight);
    const rowCount = Math.ceil(viewportHeight / itemHeight);

    return {
      startIndex,
      columnCount,
      rowCount,
    };
  }, [containerWidth, viewportHeight, scrollTop, itemWidth, itemHeight]);

  return calc();
}
