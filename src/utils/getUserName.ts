import { loggedUserId } from "../pages/_app";
import { Conversation } from "../types/conversation";

export const getUserName = (conversation: Conversation)=> {
    if (conversation.recipientId === loggedUserId) return conversation.senderNickname;
    if (conversation.senderId === loggedUserId) return conversation.recipientNickname;
  }