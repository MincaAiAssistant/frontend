import { useAuthStore } from '@/lib/auth-store';
import { Loader2 } from 'lucide-react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRouter() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }
  const navigateRouter = isAuthenticated ? '/' : '/auth';

  return isAuthenticated ? <Navigate to={navigateRouter} /> : <Outlet />;
}
