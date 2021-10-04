import React from 'react';
import { Message } from '../../../types/message';
import styles from './display.module.css';

type ChatDisplayProps = {
  messages: Message[];
};

export default function chatDisplay({ messages }: ChatDisplayProps) {
  return (
    <div className={styles.display}>
      {messages.map((m) => (
        <div
          key={m.id}
          className={`${styles.message} ${
            m.authorId === 1 ? styles.authored : styles.received
          }`}
        >
          {m.body}
        </div>
      ))}
    </div>
  );
}
