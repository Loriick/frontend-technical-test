import { useRouter } from 'next/router';
import { AiOutlineLeft } from 'react-icons/ai';


import styles from './header.module.css';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
};

export default function Header({ title, showBackButton }: HeaderProps) {
  const router = useRouter();
  const handleGoback = (): void => router.back();
  return (
    <header className={styles.header}>
      {showBackButton && (
        <button type="button" aria-label="Retour" className={styles.button} onClick={handleGoback}>
          <AiOutlineLeft size={25} color="#fff" />
        </button>
      )}
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.hidden}></div>
    </header>
  );
}
