import { useRouter } from 'next/router';

import MessageList from '../../components/Conversation/List';
import Header from '../../components/Header';
import Chat from '../../components/Message/Chat';
import { loggedUserId } from '../_app';

import { getUserName } from '../../utils/getUserName';
import http from '../../utils/http';
import { useWindowSize } from '../../hooks';
import { Conversation } from '../../types/conversation';
import { Message } from '../../types/message';

import styles from '../../styles/message.module.css';

type ConversationProps = {
  messages: Message[];
  conversationList: Conversation[];
  conversationStatus: number;
};

export default function MessagePage({
  messages,
  conversationList,
  conversationStatus,
}: ConversationProps) {
  const { isLargeScreen } = useWindowSize();
  const { messageId } = useRouter().query;

  const currentConversation = conversationList.find(
    (conversation) => conversation.id === +messageId
  );

  return (
    <div className={styles.message__container}>
      {isLargeScreen && (
        <MessageList
          status={conversationStatus}
          conversationList={conversationList}
        />
      )}
      <div className={styles.message__displayContainer}>
        <Header
          showBackButton={!isLargeScreen}
          title={getUserName(currentConversation)}
        />
        <Chat id={messageId} messages={messages} />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { data } = await http.getById('conversations', loggedUserId);

  const paths = (data as Conversation[]).map((item) => {
    return { params: { messageId: item.id.toString() } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: {
  params: { messageId: string };
}) {
  const { data: conversationList, status: conversationStatus } =
    await http.getById('conversations', loggedUserId);
  const { data: messages } = await http.getById(
    'messages',
    context.params.messageId
  );

  if (!messages) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      messages,
      conversationList,
      conversationStatus,
    },
  };
}
