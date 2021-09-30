import { useRouter } from 'next/router';
import { useMemo } from 'react';
import MessageList from '../../../components/Conversation/List';

import Header from '../../../components/Header';
import Display from '../../../components/Message/Display';
import Form from '../../../components/Message/Form';
import { useWindowSize } from '../../../hooks';

import styles from '../../../styles/message.module.css';

export default function Conversation() {
  const router = useRouter();
  const { messageId } = router.query;
  const { width } = useWindowSize();


  const isDesktop = useMemo(()=> width > 800, [width])

  return (
    <div className={styles.message__container}>
      {isDesktop && <MessageList />}
      <div className={styles.message__displayContainer}>
        <Header showBackButton={!isDesktop} title={messageId as string} />
        <div className={styles.message__display}>
          <Display />
          <Form />
        </div>
      </div>
    </div>
  );
}
