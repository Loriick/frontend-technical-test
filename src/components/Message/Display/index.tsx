import React from 'react';
import styles from './display.module.css';

export default function chatDisplay({ messages }: any) {
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
