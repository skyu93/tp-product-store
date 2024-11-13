import styles from '@/pages/error/ErrorPage.module.css';
import alarmIcon from '@/assets/icon/alarm.svg';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <img className={styles.errorIcon} src={alarmIcon} alt="페이지 오류" />
        <div>404: Not Found</div>
        <Link className={styles.homeBtn} to="/">
          홈으로...
        </Link>
      </div>
    </div>
  );
}
