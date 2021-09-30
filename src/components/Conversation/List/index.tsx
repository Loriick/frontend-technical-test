import MessageListItem from '../Item';
import styles from "./messageList.module.css";


export default function MessageList() {
  const conversations = [
    { name: 'jojo', date: '20/07' },
    { name: 'john doe', date: '22/07' },
    { name: 'Annabelle', date: '23/07' },
  ];
  return (
    <div className={styles.messageList}>
      {conversations.map((conversation) => (
        <MessageListItem key={conversation.date} {...conversation} />
      ))}
    </div>
  );
}
