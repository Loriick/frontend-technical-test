import { useState } from 'react';
import { Message } from '../types/message';
import http from '../utils/http';

export type useMessageArguments = {
  message: string;
  conversationId: number;
  authorId: number;
  clearInput: () => void;
};
export type useMessageReturnType = {
  post: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  messages: Message[];
};

export function useNewMessage({
  message,
  conversationId,
  authorId,
  clearInput,
}: useMessageArguments): useMessageReturnType {
  const [messages, setMessages] = useState<Message[]>([]);
  const post = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const { status, data } = await http.post(`messages/${conversationId}`, {
      body: message,
      timestamp: Date.now(),
    });

    setMessages([
      ...messages,
      {
        id: data.id,
        body: message,
        timestamp: Date.now(),
        conversationId,
        authorId,
      },
    ]);
    clearInput();
  };

  return { messages, post };
}
