import React, { ReactNode } from 'react';

import styles from './center.module.css';

type CenterProps = {
  children: ReactNode;
};

export default function Center({ children }: CenterProps) {
  return <div className={styles.center}>{children}</div>;
}
