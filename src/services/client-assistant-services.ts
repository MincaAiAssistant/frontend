import { protectedAPIRequest } from '@/lib/queryClient';
import { ClientChat, ClientMessage } from '@/lib/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getClientChats = async (): Promise<ClientChat[]> => {
  const response = await protectedAPIRequest(
    'GET',
    `${BASE_URL}/customer-chat`
  );
  return response.json();
};
const getClientChatMesages = async (
  sessionId: string
): Promise<ClientMessage[]> => {
  const response = await protectedAPIRequest(
    'GET',
    `${BASE_URL}/customer-chat/${sessionId}`
  );
  return response.json();
};

export { getClientChats, getClientChatMesages };
