import { Route } from '@/lib/types';
import AuthPage from '@/pages/auth-page';

export const publicRoutes: Route[] = [
  {
    path: '/auth',
    component: <AuthPage />,
  },
];
