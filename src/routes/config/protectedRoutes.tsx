import { Route } from '@/lib/types';
import ChatPage from '@/pages/chat-page';
import CrmIntegrationPage from '@/pages/crm-integration-page';
import GeneralSettingsPage from '@/pages/general-settings-page';
import GoogleIntegrationPage from '@/pages/google-integration-page';
import KnowledgeBasePage from '@/pages/knowledge-base-page';

export const protectedRoutes: Route[] = [
  {
    path: '/',
    component: <ChatPage />,
    description: 'Chat with insurance assistant',
    icon: '🧑‍💻',
  },
  {
    path: '/knowledge-base',
    component: <KnowledgeBasePage />,
    title: 'Your Knowledge Base',
    description: 'Upload and manage documents to enhance your AI assistant',
    icon: '📚',
  },
  {
    path: '/crm-integration',
    component: <CrmIntegrationPage />,
    title: 'CRM Integration',
    description: 'Connect your CRM to streamline data management',
    icon: '🔗',
  },
  {
    path: '/google-integration',
    component: <GoogleIntegrationPage />,
    title: 'Google Integration',
    description: 'Connect your Google services to enhance your AI assistant',
    icon: '📧',
  },
  {
    path: '/general-settings',
    component: <GeneralSettingsPage />,
    title: 'General Settings',
    description: 'Customize your MincaAI experience',
    icon: '⚙️',
  },
];
