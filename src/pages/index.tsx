import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import MessageList from '../components/Conversation/List';
import Header from '../components/Header';
import { useWindowSize } from '../hooks';
import styles from '../styles/conversation.module.css';
import { Conversation } from '../types/conversation';
import { User } from '../types/user';
import http from '../utils/http';
import { loggedUserId } from './_app';

type HomeProps = {
  conversationList: Conversation[];
  status: number;
};

const Home: FC<HomeProps> = ({ conversationList, status }) => {
  const router = useRouter();
  const { isLargeScreen } = useWindowSize();

  useEffect(() => {
    if (isLargeScreen) {
      router.push(`messages/${conversationList[0].id}`);
    }
  }, [isLargeScreen, conversationList, router]);

  return (
    <div className={styles.container}>
      <Header title="Messages" />
      <MessageList status={status} conversationList={conversationList} />
    </div>
  );
};

export async function getStaticProps() {
  const { data: conversationList, status } = await http.getById(
    'conversations',
    loggedUserId
  );

  return {
    props: {
      conversationList,
      status,
    },
  };
}

export default Home;
