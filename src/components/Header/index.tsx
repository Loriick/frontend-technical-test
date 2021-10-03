import { useRouter } from 'next/router';
import { AiOutlineLeft } from 'react-icons/ai';

import styles from './header.module.css';

type HeaderProps = {
  title?: string;
  showBackButton?: boolean;
  showTitle?: boolean;
};

export default function Header({
  title,
  showBackButton = false,
  showTitle = true,
}: HeaderProps) {
  const router = useRouter();
  const handleGoback = (): void => router.back();
  return (
    <header className={styles.header}>

      {showBackButton && (
        <button
          type="button"
          aria-label="Retour"
          className={`${styles.button} ${styles.back}`}
          onClick={handleGoback}
        >
          <AiOutlineLeft size={25} color="#fff" />
        </button>
      )}

      {showTitle && <h1 aria-label={title} className={styles.title}>{title}</h1>}

    
    </header>
  );
}
