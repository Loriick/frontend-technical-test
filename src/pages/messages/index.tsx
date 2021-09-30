import React from 'react';
import MessageList from '../../components/Conversation/List';
import Header from '../../components/Header';
import styles from "../../styles/conversation.module.css"

export default function Conversations() {
    return (
        <div className={styles.conversation__container}>
            <Header title="Messages"/>
            <MessageList/>
        </div>
    )
}
