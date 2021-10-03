import { useRouter } from 'next/router';
import { formatDate } from '../../../utils/date';
import Avatar from '../../Avatar';

import styles from './item.module.css';

type MessageListItemProps = {
  name: string;
  date: number;
  conversationId: number | string;
};

export default function MessageListItem({
  name,
  date,
  conversationId,
}: MessageListItemProps) {
  const router = useRouter();

  const handleGoToMessageView = (): Promise<boolean> =>
    router.push(`/messages/${conversationId}`);

  const handleGoToMessageViewWithKeyBoard =
    (onClick: () => Promise<boolean>) =>
    ({ key }) => {
      if (key === 'Enter') {
        onClick();
      }
    };
  return (
    <div
      tabIndex={1}
      aria-label={`lancer une conversation avec ${name}`}
      onKeyPress={handleGoToMessageViewWithKeyBoard(handleGoToMessageView)}
      className={styles.item}
      onClick={handleGoToMessageView}
    >
      <div className={styles.item__avatar}>
        <Avatar aria-label={`Photo de ${name}`} name={name} />
      </div>
      <div className={styles.item__info}>
        <p>{name}</p>
        <p>{formatDate(date)}</p>
      </div>
    </div>
  );
}
