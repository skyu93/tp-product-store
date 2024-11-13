import alarmIcon from '@/assets/icon/alarm.svg';
import styles from '@/pages/error/ErrorPage.module.css';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <img className={styles.errorIcon} src={alarmIcon} alt="페이지 오류" />
        <div>문제가 발생했습니다.</div>
        <Link className={styles.homeBtn} to="/">
          홈으로...
        </Link>
      </div>
    </div>
  );
}
