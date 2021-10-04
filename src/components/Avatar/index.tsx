import React from 'react';
import Center from '../Center';
import styles from './avatar.module.css';

type AvatarProps = {
  name: string;
};

export default function Avatar({ name }: AvatarProps) {
  return (
    <div className={styles.avatar}>
      <Center>{name[0]}</Center>
    </div>
  );
}
