import { render, cleanup } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useWindowSize } from '../hooks';
import App, { getStaticProps } from '../pages';
import http from '../utils/http';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../hooks/useWindowSize.tsx');

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

describe('Conversation List', () => {
  let httpGetByIdSpy;
  let useWindowSizeMock;

  beforeEach(() => {
    httpGetByIdSpy = jest
      .spyOn(http, 'getById')
      .mockImplementationOnce(async () => ({
        data: TEST_CONVERSATION_LIST,
        status: 200,
      }));
    useWindowSizeMock = (useWindowSize as jest.Mock).mockReturnValue({
      isLargeScreen: false,
    });
  });

  afterEach(() => {
    httpGetByIdSpy.mockRestore();
    useWindowSizeMock.mockRestore();
    cleanup();
  });

  const push = jest.fn();
  (useRouter as jest.Mock).mockImplementation(() => ({
    push,
    pathname: '/',
    route: '/',
    asPath: '/',
    query: '',
  }));

  it('should make an api call return Props and 200 status', async () => {
    const response = await getStaticProps();

    expect(http.getById).toHaveBeenCalled();
    expect(response).toEqual({
      props: {
        conversationList: TEST_CONVERSATION_LIST,
        status: 200,
      },
    });
  });

  it('should return a list of conversation', async () => {
    const response = await getStaticProps();

    const app = render(
      <App
        conversationList={response.props.conversationList}
        status={response.props.status}
      />
    );
    const list = app.getByTestId('conversation-list');
    expect(list).toBeInTheDocument();

    const itemList = list.getElementsByClassName('item');
    expect(itemList).toBeDefined();

    expect(push).not.toBeCalled();
  });

  it('should call router.push', async () => {
   (useWindowSize as jest.Mock).mockReturnValue({
      isLargeScreen: true,
    });
    const response = await getStaticProps();

    render(
      <App
        conversationList={response.props.conversationList}
        status={response.props.status}
      />
    );

    expect(push).toHaveBeenCalledWith(
      `messages/${response.props.conversationList[0].id}`
    );
  });
});
