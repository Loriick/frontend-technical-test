import { render, cleanup, fireEvent, act } from '@testing-library/react';
import { useWindowSize } from '../hooks';
import Message, { getStaticProps } from '../pages/messages/[messageId]';
import http from '../utils/http';
import { useRouter } from 'next/router';
import { getUserName } from '../utils/getUserName';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../hooks/useWindowSize.tsx');

jest.mock('../utils/getUserName.ts', () => ({
  getUserName: jest.fn(),
}));

const TEST_MESSAGE_LIST = [
  {
    id: 1,
    conversationId: 1,
    timestamp: 1625637849,
    authorId: 1,
    body: "Bonjour c'est le premier message de la première conversation",
  },
];

const TEST_CONVERSATION_LIST = [
  {
    id: 1,
    recipientId: 2,
    recipientNickname: 'Jeremie',
    senderId: 1,
    senderNickname: 'Thibaut',
    lastMessageTimestamp: 1625637849,
  },
];
const params = {
  params: TEST_CONVERSATION_LIST[0].id,
};
describe('Message', () => {
  let conversationHttpCall;
  let messageHttpCall;
  let useWindowSizeMock;

  beforeEach(() => {
    conversationHttpCall = jest
      .spyOn(http, 'getById')
      .mockImplementationOnce(async () => ({
        data: TEST_CONVERSATION_LIST,
        status: 200,
      }));

    messageHttpCall = jest
      .spyOn(http, 'getById')
      .mockImplementationOnce(async () => ({
        data: TEST_MESSAGE_LIST,
        status: 200,
      }));

    messageHttpCall = useWindowSizeMock = (
      useWindowSize as jest.Mock
    ).mockReturnValue({
      isLargeScreen: false,
    });
  });

  afterEach(() => {
    conversationHttpCall.mockRestore();
    useWindowSizeMock.mockRestore();
    messageHttpCall.mockRestore();
    cleanup();
  });

  (useRouter as jest.Mock).mockImplementation(() => ({
    pathname: '/',
    route: '/',
    asPath: '/',
    query: TEST_CONVERSATION_LIST[0].id,
  }));

  it('should render correctly', async () => {
    const response = await getStaticProps({
      params,
    });

    expect(http.getById).toHaveBeenCalledTimes(2);
    expect(response).toEqual({
      props: {
        messages: TEST_MESSAGE_LIST,
        conversationList: TEST_CONVERSATION_LIST,
        conversationStatus: 200,
      },
    });
  });

  it('should render chat', async () => {
    const response = await getStaticProps({ params });

    (getUserName as jest.Mock).mockImplementation(
      () => TEST_CONVERSATION_LIST[0].id
    );

    const app = render(
      <Message
        conversationList={response.props.conversationList}
        messages={response.props.messages}
        conversationStatus={response.props.conversationStatus}
      />
    );

    const chat = app.getByTestId('chat');
    expect(chat).toBeDefined();

    const chatScreen = chat.getElementsByClassName('display');
    expect(chatScreen).toBeDefined();

    const form = chat.getElementsByClassName('form');
    expect(form).toBeDefined();
  });

  it('should render conversation list if user use a large screen', async () => {
    (useWindowSize as jest.Mock).mockReturnValue({
      isLargeScreen: true,
    });

    const response = await getStaticProps({ params });

    const app = render(
      <Message
        conversationList={response.props.conversationList}
        messages={response.props.messages}
        conversationStatus={response.props.conversationStatus}
      />
    );

    const list = app.getByTestId('conversation-list');
    expect(list).toBeDefined();
  });

  it('should post a message', async () => {
    jest.spyOn(http, 'post').mockImplementationOnce(async () => ({
      status: 200,
      data: { id: 2 },
    }));

    const response = await getStaticProps({ params });

    const app = render(
      <Message
        conversationList={response.props.conversationList}
        messages={response.props.messages}
        conversationStatus={response.props.conversationStatus}
      />
    );

    const form = app.getByTestId('form');
    const input = form.querySelector('.input');

    expect(input).toBeDefined();

    const button = form.querySelector('.button');
    expect(button).toBeDefined();

    fireEvent.change(input, {
      target: { value: '' },
    });

    expect(button).toBeDisabled();

    fireEvent.change(input, {
      target: { value: 'bonjour' },
    });

    fireEvent.click(button);
    expect(http.post).toBeCalled();

    expect(input.textContent).toBe('');
  });
});
