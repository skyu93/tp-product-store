import { useState } from 'react';
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
  const [isLoadError, setIsLoadError] = useState(false);
  const handleImageError = () => {
    setIsLoadError(true);
  };
  return (
    <img
      loading="lazy"
      className={className}
      width={width}
      height={height}
      src={isLoadError || !src ? NoImg : src}
      onLoad={onLoadSuccess}
      onError={handleImageError}
      alt={isLoadError ? 'No Image' : alt}
    />
  );
}
