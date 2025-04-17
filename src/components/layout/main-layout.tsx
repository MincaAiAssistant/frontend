import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './sidebar';
import Header from './header';
import { useAuthStore } from '@/lib/auth-store';
import { Loader2 } from 'lucide-react';
import { protectedRoutes } from '@/routes/config/protectedRoutes';

const MainLayout = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  const currentRoute = protectedRoutes.find(
    (route) => route.path === location.pathname
  );

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header
          title={currentRoute?.title ?? 'Welcome'}
          icon={currentRoute?.icon ?? '👋'}
          description={currentRoute?.description ?? 'Welcome to the dashboard'}
          backgroundColor="bg-orange-50"
        />
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
