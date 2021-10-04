import { getUserName } from '../getUserName';

const TEST_CONVERSATION = {
  id: 1,
  recipientId: 2,
  recipientNickname: 'Jeremie',
  senderId: 1,
  senderNickname: 'Thibaut',
  lastMessageTimestamp: 1625637849,
};

describe('getUserName', () => {
  it('should return the recipient name', () => {
    const name = getUserName(TEST_CONVERSATION);

    expect(name).toBe('Jeremie');
  });
});
