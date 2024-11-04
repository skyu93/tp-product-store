import { useState } from 'react';
import NoImg from '@/assets/image/no-image.webp';

export default function Image({
	className,
	width,
	height,
	src,
	alt
}: {
	className?: string;
	width?: number;
	height?: number;
	src: string;
	alt: string;
}) {
	const [isLoadError, setIsLoadError] = useState(false);

	return (
		<img
			loading="lazy"
			className={className}
			width={width}
			height={height}
			src={isLoadError || !src ? NoImg : src}
			onError={() => {
				setIsLoadError(true);
			}}
			alt={isLoadError ? 'No Image' : alt}
		/>
	);
}
