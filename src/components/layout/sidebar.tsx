import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/auth-store';
import { LogOut, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { MincaLogo } from '@/lib/minca-logo';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  // Define the Insurance Assistant
  const assistant = {
    id: 'insurance-expert',
    icon: '🧑‍💻',
    name: 'Insurance Assistant',
  };

  // Dummy recent chats (would be fetched from server in a real app)
  const recentChats = [
    { id: '1', title: 'Insurance policy renewal' },
    { id: '2', title: 'Coverage options for small business' },
    { id: '3', title: 'Claims process question' },
  ];

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
            <button
              onClick={() => {
                navigate('/');
              }}
              className={cn(
                'flex items-center px-4 py-2 text-sm rounded-lg w-full text-left',
                location.pathname === '/' ||
                  (location.pathname === '/' &&
                    !location.pathname.includes('integration') &&
                    !location.pathname.includes('knowledge-base'))
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
            >
              <span className="mr-3">{assistant.icon}</span>
              <span>{assistant.name}</span>
            </button>
          </nav>

          <Button className="mt-3 w-full bg-cyan-400 hover:bg-cyan-500 text-black">
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>

        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            RECENT CHATS
          </h3>

          <nav className="space-y-0">
            {recentChats.map((chat) => (
              <button
                key={chat.id}
                className="flex items-center px-4 py-2 text-sm rounded-lg text-white/80 hover:bg-white/10 hover:text-white w-full text-left"
                onClick={() => {
                  navigate('/');
                }}
              >
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Settings
          </h3>

          <nav className="space-y-0">
            <button
              className={cn(
                'flex items-center px-4 py-2 text-sm rounded-lg w-full text-left',
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
                'flex items-center px-4 py-2 text-sm rounded-lg w-full text-left',
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
                'flex items-center px-4 py-2 text-sm rounded-lg w-full text-left',
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
                'flex items-center px-4 py-2 text-sm rounded-lg w-full text-left',
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
