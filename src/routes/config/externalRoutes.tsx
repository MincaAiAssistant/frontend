import { Route } from '@/lib/types';
import ChatBot from '@/pages/chat-bot-page';

export const externalRoutes: Route[] = [
  {
    path: '/chat-bot',
    component: <ChatBot />,
  },
  {
    path: '/chat-bot/:id',
    component: <ChatBot />,
  },
];
