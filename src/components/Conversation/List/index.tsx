import { useMemo } from 'react';
import { useWindowSize } from '../../../hooks';
import { Conversation } from '../../../types/conversation';
import { getUserName } from '../../../utils/getUserName';
import Header from '../../Header';
import Banner from '../../InfoBanner';
import MessageListItem from '../Item';

import styles from './messageList.module.css';

type MessageListProps = {
  conversationList: Conversation[];
  status: number;
};

export default function MessageList({ conversationList, status }: MessageListProps) {
  const { isLargeScreen } = useWindowSize();

  const displayErrorBanner = useMemo(
    () => status === 400 || status === 404 || status === 500,
    [status]
  );

  return (
    <div data-testid="conversation-list" className={styles.messageList}>
      {isLargeScreen && <Header showTitle={false} />}
      {displayErrorBanner && (
        <Banner>
          <p>🚨 OUPS il semble que quelque chose cloche. On sur le coup</p>
        </Banner>
      )}

      {conversationList.map((item) => (
        <MessageListItem
          key={item.id}
          name={getUserName(item)}
          date={item?.lastMessageTimestamp}
          conversationId={item.id}
        />
      ))}
    </div>
  );
}
