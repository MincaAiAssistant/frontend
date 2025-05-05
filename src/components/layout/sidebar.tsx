import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/auth-store';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { MincaLogo } from '@/lib/minca-logo';
import { useLocation, useNavigate } from 'react-router-dom';
import { Chat } from '@/lib/types';
import { useState } from 'react';

interface SideBarProps {
  setCurrentChat: React.Dispatch<React.SetStateAction<Chat | undefined>>;
  recentChats: Chat[] | undefined;
  currentChat: Chat | undefined;
}

export default function Sidebar({
  recentChats,
  currentChat,
  setCurrentChat,
}: SideBarProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [visibleChats, setVisibleChats] = useState(5);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const assistants = [
    {
      id: 'insurance-expert',
      icon: '🧑‍💻',
      name: 'Policy Assistant',
    },
    {
      id: 'sales-assistant',
      icon: '👥',
      name: 'Sales Assistant',
    },
  ];

  const displayedChats = recentChats?.slice(0, visibleChats);
  const canLoadMore = recentChats && visibleChats < recentChats.length;

  return (
    <aside className="bg-gradient-to-b from-cyan-600 to-blue-700 text-white w-80 flex-shrink-0 flex flex-col h-screen">
      <div className="p-6 border-b border-blue-600 flex items-center justify-center">
        <MincaLogo className="h-16 w-auto" />
      </div>

      <div className="px-6 py-6 flex-1 overflow-y-auto">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            YOUR AI ASSISTANT
          </h3>

          <nav className="space-y-1">
            {assistants.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`${item.id}`)}
                className={cn(
                  'flex items-center px-4 py-2 text-sm rounded-lg w-full text-left cursor-pointer',
                  location.pathname === `/${item.id}`
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                )}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {recentChats && recentChats.length !== 0 && (
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              RECENT CHATS
            </h3>

            <nav className="space-y-0">
              {displayedChats?.map((chat) => (
                <button
                  key={chat.chatid}
                  className={`flex items-center cursor-pointer px-4 py-2 text-sm rounded-lg w-full text-left ${
                    chat.chatid === currentChat?.chatid
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  } `}
                  onClick={() => {
                    setCurrentChat(chat);
                    navigate(`/chat/${chat.chatid}`);
                  }}
                >
                  <span className="mr-3">
                    {chat.type === 'policy' ? '🧑‍💻' : '👥'}
                  </span>
                  <span className="truncate">
                    {chat.title.replace(/^"(.*)"$/, '$1')}
                  </span>
                </button>
              ))}
            </nav>

            {canLoadMore && (
              <div className="text-center">
                <button
                  onClick={() => setVisibleChats((prev) => prev + 5)}
                  className="mt-2 text-xs text-cyan-300 hover:underline cursor-pointer"
                >
                  Load more
                </button>
              </div>
            )}
          </div>
        )}

        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Settings
          </h3>

          <nav className="space-y-0">
            <button
              className={cn(
                'flex items-center px-4 py-2 text-sm rounded-lg cursor-pointer w-full text-left',
                location.pathname === '/knowledge-base'
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
              onClick={() => navigate('/knowledge-base')}
            >
              <span className="mr-3">📚</span>
              <span>Knowledge Base</span>
            </button>

            <button
              className={cn(
                'flex items-center px-4 py-2 text-sm rounded-lg w-full text-left cursor-pointer',
                location.pathname === '/crm-integration'
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
              onClick={() => navigate('/crm-integration')}
            >
              <span className="mr-3">🔗</span>
              <span>CRM Integration</span>
            </button>

            <button
              className={cn(
                'flex items-center px-4 py-2 text-sm rounded-lg w-full text-left cursor-pointer',
                location.pathname === '/google-integration'
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
              onClick={() => navigate('/google-integration')}
            >
              <span className="mr-3">📧</span>
              <span>Google Integration</span>
            </button>

            <button
              className={cn(
                'flex items-center px-4 py-2 text-sm rounded-lg w-full text-left cursor-pointer',
                location.pathname === '/general-settings'
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
              onClick={() => navigate('/general-settings')}
            >
              <span className="mr-3">⚙️</span>
              <span>General Settings</span>
            </button>
          </nav>
        </div>
      </div>

      <div className="p-6 border-t border-blue-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-cyan-400 flex items-center justify-center text-black font-medium">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="ml-2 text-sm font-medium truncate">
              {user?.username || 'User'}
            </span>
          </div>

          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        <Separator className="my-4 bg-blue-600" />

        <div className="text-white text-sm">
          Support:{' '}
          <a
            href="mailto:support@mincaai.com"
            className="text-cyan-300 hover:underline"
          >
            support@mincaai.com
          </a>
        </div>
      </div>
    </aside>
  );
}
