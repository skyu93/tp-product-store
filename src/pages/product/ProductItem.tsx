import Image from '@/components/image/Image';
import styles from './ProductItem.module.css';
import starIcon from '@/assets/icon/star.svg';
import { useCallback, useState } from 'react';

export default function ProductItem({
	image,
	name = '',
	price = 0,
	rating = 0,
	discountRate = 0,
	reviewCount = 0
}: {
	image: string;
	name: string;
	price: number;
	rating: number;
	discountRate: number;
	reviewCount: number;
}) {
	const [isImageLoading, setImageLoading] = useState(true);
	const onLoadSuccess = useCallback(() => {
		setImageLoading(false);
	}, []);

	return (
		<div className={styles.card}>
			<Image
				className={isImageLoading ? styles.noImage : styles.thumbnail}
				src={image}
				alt={name}
				onLoadSuccess={onLoadSuccess}
			/>
			{isImageLoading || (
				<div className={styles.info}>
					<h2 className={styles.name}>{name}</h2>
					<div className={styles.priceContainer}>
						<span className={styles.discountRate}>
							{discountRate}%
						</span>
						<span className={styles.price}>$ {price}</span>
					</div>
					<div className={styles.reviewContainer}>
						<img
							className={styles.icon}
							src={starIcon}
							alt="별점"
						/>
						<span className={styles.rating}>{rating}</span>
						<span className={styles.reviewCount}>
							리뷰: {reviewCount}
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
