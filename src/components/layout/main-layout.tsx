import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './sidebar';
import Header from './header';
import { useAuthStore } from '@/lib/auth-store';
import { Loader2 } from 'lucide-react';
import { protectedRoutes } from '@/routes/config/protectedRoutes';
import { getChats } from '@/services/chat-services';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Chat } from '@/lib/types';

const MainLayout = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();
  const [currentChat, setCurrentChat] = useState<Chat>();
  const currentRoute = protectedRoutes.find(
    (route) => route.path === location.pathname
  );
  const { data, isLoading: isLoadingChats } = useQuery({
    queryKey: ['chats'],
    queryFn: () => getChats(),
    enabled: !!user,
  });
  useEffect(() => {
    if (!location.pathname.includes('/chat')) setCurrentChat(undefined);
  }, [location]);

  if (isLoadingChats || isLoading || !isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        recentChats={data?.chats}
        setCurrentChat={setCurrentChat}
        currentChat={currentChat}
      />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header
          title={currentChat?.title ?? currentRoute?.title}
          icon={
            currentChat
              ? currentChat?.type === 'policy'
                ? '🧑‍💻'
                : '👥'
              : currentRoute?.icon
          }
          description={currentChat?.description ?? currentRoute?.description}
          backgroundColor="bg-orange-50"
        />
        <Outlet context={{ currentChat, setCurrentChat }} />
      </main>
    </div>
  );
};

export default MainLayout;
