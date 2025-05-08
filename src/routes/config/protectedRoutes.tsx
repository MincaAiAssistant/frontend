import { Route } from '@/lib/types';
import ChatPage from '@/pages/chat-page';
import CrmIntegrationPage from '@/pages/crm-integration-page';
import GeneralSettingsPage from '@/pages/general-settings-page';
import GoogleIntegrationPage from '@/pages/google-integration-page';
import KnowledgeBasePage from '@/pages/knowledge-base-page';
import WhatsAppAssistantPage from '@/pages/whatsapp-assistant-page';

export const protectedRoutes: Route[] = [
  {
    path: '/insurance-expert',
    component: <ChatPage />,
    title: 'Policy Assistant',
    description:
      'Instant support for insurance policies, coverage options, and client comparisons',
    icon: '🧑‍💻',
  },
  {
    path: '/sales-assistant',
    component: <ChatPage />,
    title: 'Sales Assistant',
    description:
      'Access client profiles, explore upselling opportunities, and check contract details',
    icon: '👥',
  },
  {
    path: '/chat/:id',
    component: <ChatPage />,
    description:
      'Expert in insurance policies, coverage options, and claims processing',
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
  {
    path: '/whatsapp-assistant',
    component: <WhatsAppAssistantPage />,
    title: 'Client Chat Assistant',
    description:
      'Quickly assist your clients 24/7 with AI. Step in personally whenever you want to offer a tailored experience.',
    icon: '💬',
  },
];
