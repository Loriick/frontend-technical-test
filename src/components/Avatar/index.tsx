import React from 'react';
import Center from '../Center';
import styles from "./avatar.module.css"

export default function Avatar({name}) {
    return (
        <div className={styles.avatar}>
            <Center>
            {name[0]}
            </Center>
        </div>
    )
}
