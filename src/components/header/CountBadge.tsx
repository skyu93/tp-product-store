import styles from '@/components/header/Header.module.css';

type Props = { count: number };
export default function CountBadge({ count }: Props) {
  if (!count || count <= 0) {
    return null;
  }
  if (count > 99) {
    return <div className={styles.badge}>99+</div>;
  }

  return <div className={styles.badge}>{count}</div>;
}
