import { protectedAPIRequest } from '@/lib/queryClient';
import { Chat, Message } from '@/lib/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getChats = async (): Promise<{ chats: Chat[] }> => {
  const response = await protectedAPIRequest('GET', `${BASE_URL}/chat`);
  return response.json();
};

const getChat = async (id: string): Promise<{ chat: Chat }> => {
  const response = await protectedAPIRequest('GET', `${BASE_URL}/chat/${id}`);
  return response.json();
};

const initChat = async (
  formData: FormData
): Promise<{ chat: Chat; user: Message; assistant: Message }> => {
  const response = await protectedAPIRequest(
    'POST',
    `${BASE_URL}/chat/init`,
    formData
  );
  return response.json();
};

const getMessages = async (id: string): Promise<{ messages: Message[] }> => {
  const response = await protectedAPIRequest(
    'GET',
    `${BASE_URL}/chat/${id}/message`
  );
  return response.json();
};
const addMessage = async (
  formData: FormData,
  id: string
): Promise<{ user: Message; assistant: Message }> => {
  const response = await protectedAPIRequest(
    'POST',
    `${BASE_URL}/chat/${id}/message`,
    formData
  );
  return response.json();
};
export { getChats, initChat, getChat, getMessages, addMessage };
