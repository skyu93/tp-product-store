import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './AddProductModal.module.css';

const upKeyframes = [{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }];
const downKeyframes = [{ transform: 'translateY(0)' }, { transform: 'translateY(100%)' }];
const options: KeyframeAnimationOptions = {
  duration: 500,
  easing: 'ease-out',
  fill: 'forwards',
};

type Props = {
  onClose: () => void;
};
export default function AddProductModal({ onClose }: Props) {
  const [isOpen, setOpen] = useState<boolean>(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const handleClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    const regex = /^\/product\/\d+$/;
    const { pathname } = location;
    if (!regex.test(pathname)) {
      setOpen(false);
    }
  }, [location]);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    let animation: Animation | null = null;
    if (isOpen) {
      animation = modalElement.animate(upKeyframes, options);
    } else {
      animation = modalElement.animate(downKeyframes, options);
      animation.finished.then(() => {
        onClose();
      });
    }

    return () => {
      animation?.cancel();
    };
  }, [isOpen]);

  return (
    <div ref={modalRef} className={styles.productModal}>
      <div>장바구니에 추가되었습니다!</div>
      <Link to="/cart" onClick={handleClick}>
        장바구니 이동 →{' '}
      </Link>
    </div>
  );
}
