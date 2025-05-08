import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getClientChatMesages,
  getClientChats,
} from '@/services/client-assistant-services';

import { AgentStatus } from '@/components/client-chat-assistants/agent-status';
import { ConversationList } from '@/components/client-chat-assistants/conversation-list';
import { ChatPanel } from '@/components/client-chat-assistants/chat-panel';

export default function WhatsAppAssistantPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>('1');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [agentActive, setAgentActive] = useState(true);
  const {
    data: client,
    isLoading: clientLoading,
    isError: clientError,
  } = useQuery({
    queryKey: ['client-chats'],
    queryFn: () => getClientChats(),
    refetchInterval: 5000,
    staleTime: 0,
  });

  // Get active customer from selected ID
  const activeCustomer =
    client?.find((c) => c.sessionId === selectedCustomer) || null;

  const { data: clientMessages, isLoading: clientMessagesLoading } = useQuery({
    queryKey: [activeCustomer?.sessionId],
    queryFn: ({ queryKey }) => {
      const [sessionId] = queryKey;
      return getClientChatMesages(sessionId ?? '');
    },
    enabled: !!activeCustomer,
  });

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleAgentStatus = () => {
    setAgentActive(!agentActive);
  };

  return (
    <>
      <AgentStatus
        agentActive={agentActive}
        toggleAgentStatus={toggleAgentStatus}
      />
      <main className="flex-1 flex overflow-hidden border-t border-gray-200">
        <ConversationList
          clients={client}
          isLoading={clientLoading}
          isError={clientError}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <ChatPanel
          activeCustomer={activeCustomer}
          messages={clientMessages}
          isLoading={clientMessagesLoading}
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
        />
      </main>
    </>
  );
}
