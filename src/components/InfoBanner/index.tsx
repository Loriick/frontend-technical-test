import React, { ReactNode } from 'react';
import Center from '../Center';

import styles from './infoBanner.module.css';

type BannerProps = {
  children: ReactNode;
};

export default function Banner({ children }: BannerProps) {
  return (
    <div className={styles.banner}>
      <Center>{children}</Center>
    </div>
  );
}
