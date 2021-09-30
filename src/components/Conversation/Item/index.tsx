
import { useRouter } from 'next/router';

import styles from './item.module.css';

type MessageListItemProps = {
  name: string;
  date: string;
};

export default function MessageListItem({
  name,
  date,
}: MessageListItemProps) {
  const router = useRouter();

 const handleGoToMessageView = ():Promise<boolean> => router.push(`/messages/id/${name}`);

  return (
    <div className={styles.item} onClick={handleGoToMessageView}>
      <div className={styles.item__avatar}></div>
      <div className={styles.item__info}>
        <p>{name}</p>
        <p>{date}</p>
      </div>
    </div>
  );
}
