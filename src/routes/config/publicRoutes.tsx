import { Route } from '@/lib/types';
import AuthPage from '@/pages/auth-page';
import ChatBot from '@/pages/chat-bot-page';

export const publicRoutes: Route[] = [
  {
    path: '/auth',
    component: <AuthPage />,
  },
  {
    path: '/chat-bot',
    component: <ChatBot />,
  },
  {
    path: '/chat-bot/:id',
    component: <ChatBot />,
  },
];
