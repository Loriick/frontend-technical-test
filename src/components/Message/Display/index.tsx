import React from 'react';
import styles from "./display.module.css"

export default function Display() {
    return (
        <div className={styles.display}>
            <div className={`${styles.message} ${styles.received}`}> dededede </div>
            <div className={`${styles.message} ${styles.authored}`}> dededede </div>
        </div>
    )
}
