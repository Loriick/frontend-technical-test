import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useNewMessage } from '../../../hooks/useNewMessage';
import { loggedUserId } from '../../../pages/_app';
import Display from '../Display';
import Form from '../Form';

import styles from './chat.module.css';

export default function Chat({ messages, id }) {
  const [message, setMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };
  const clearInput = () => setMessage('');
 const {post, messages: newMessages} =  useNewMessage({message, conversationId: +id,authorId: loggedUserId, clearInput});

 const messageList = [...messages, ...newMessages];

  return (
    <div className={styles.chat} data-testid="chat">
      <Display messages={messageList} />
      <Form
        handleSubmit={post}
        handleChange={handleChange}
        message={message}
      />
    </div>
  );
}
