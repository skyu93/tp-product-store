import { useEffect, useRef, useState } from 'react';
import styles from './Image.module.css';
import NoImg from '@/assets/image/no-image.webp';

type Props = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  onLoadSuccess?: () => void;
};
export default function Image({ className, width, height, src, alt, onLoadSuccess }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isError, setError] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!imgRef.current || !entry.isIntersecting) return;
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: '50px',
      },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setError(false);
    if (onLoadSuccess) {
      onLoadSuccess();
    }
  };
  const handleLoadError = () => {
    setError(true);
  };

  return (
    <div ref={imgRef} className={className} style={{ width, height }}>
      {isVisible && isError && <NoImg />}
      {isVisible && !isError && (
        <img
          loading="lazy"
          decoding="async"
          className={styles.img}
          src={isVisible ? src : ''} // 뷰포트에서 벗어나면 src 제거
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleLoadError}
        />
      )}
    </div>
  );
}
