import { useState, useEffect } from 'react';
import { ChatMessages } from '@/components/assistants/chat-messages';
import { ChatInput } from '@/components/assistants/chat-input';
import { Loader2 } from 'lucide-react';
import { Chat, Message, Attachment } from '@/lib/types';
import { toast } from 'sonner';
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addMessage,
  getChat,
  getMessages,
  initChat,
} from '@/services/chat-services';

type ContextType = {
  currentChat?: Chat;
  setCurrentChat: React.Dispatch<React.SetStateAction<Chat | undefined>>;
};

export default function ChatPage() {
  const location = useLocation();
  const { setCurrentChat } = useOutletContext<ContextType>();
  const { id } = useParams<{ id: string }>();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingMessage, setStreamingMessage] = useState<Message | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: chatData, isLoading: isLoadingChat } = useQuery({
    queryKey: ['chat', id],
    queryFn: () => getChat(id ?? ''),
    enabled: !!id,
  });

  const { data: messagesData, isLoading: isLoadingMessages } = useQuery({
    queryKey: ['messages', id],
    queryFn: () => getMessages(id ?? ''),
    enabled: !!id,
    refetchOnMount: true,
    staleTime: 0,
  });

  const initChatMutation = useMutation({
    mutationFn: ({
      formData,
      type,
    }: {
      formData: FormData;
      type: 'policy' | 'sales';
    }) => initChat(formData, type),
  });
  const addMessageMutation = useMutation({
    mutationFn: ({ formData, id }: { formData: FormData; id: string }) =>
      addMessage(formData, id),
  });

  // Handle data updates when query results change
  useEffect(() => {
    if (chatData && chatData.chat) {
      setCurrentChat(chatData.chat);
      setIsProcessing(false);
    }
  }, [chatData, setCurrentChat]);

  useEffect(() => {
    if (messagesData && messagesData.messages) {
      setMessages(messagesData.messages);
      setIsProcessing(false);
    }
  }, [messagesData]);

  // Clear messages when no ID is present
  useEffect(() => {
    if (!id) {
      setMessages([]);
      setCurrentChat(undefined);
      setIsProcessing(false);
    }
  }, [id, setCurrentChat]);

  const handleSendMessage = async (content: string, files?: File[]) => {
    if (!content.trim() && (!files || files.length === 0)) return;

    const chatId = id || 'temp-chat';

    // Create attachments from files if present
    const fileAttachments: Attachment[] =
      files?.map((file, index) => ({
        id: `temp-${index}-${Date.now()}`,
        name: file.name,
        mime: file.type,
        size: file.size,
        type: file.type.split('/')[0] || 'document',
      })) || [];

    // Create user message with attachments
    const userMessage: Message = {
      messageid: `temp-${Date.now()}`,
      chatid: chatId,
      created_at: new Date(),
      role: 'user',
      updated_at: new Date(),
      parent_message_id: '',
      content: content,
      attachments: fileAttachments.length > 0 ? fileAttachments : undefined,
    };

    // Add user message to message list
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('question', content);

      // Append files to FormData
      files?.forEach((file) => {
        formData.append('files', file);
      });

      let aiResponse;

      if (chatData?.chat?.chatid) {
        aiResponse = await addMessageMutation.mutateAsync({
          formData,
          id: chatData.chat.chatid,
        });
      } else {
        aiResponse = await initChatMutation.mutateAsync({
          formData: formData,
          type: location.pathname === '/insurance-expert' ? 'policy' : 'sales',
        });
      }

      // Stream the assistant message
      const messageId = `stream-${Date.now()}`;
      const fullContent = aiResponse.assistant.content;
      let currentIndex = 0;

      setStreamingMessage({
        messageid: messageId,
        chatid: chatId,
        created_at: new Date(),
        role: 'assistant',
        updated_at: new Date(),
        parent_message_id: '',
        content: '',
        // If the response includes attachments, add them here
        attachments: aiResponse.assistant.attachments,
      });

      return new Promise<void>((resolve) => {
        const streamInterval = setInterval(() => {
          if (currentIndex < fullContent.length) {
            setStreamingMessage((prev) =>
              prev
                ? {
                    ...prev,
                    content: fullContent.substring(0, currentIndex + 1),
                  }
                : null
            );
            currentIndex++;
          } else {
            clearInterval(streamInterval);
            setStreamingMessage(null);
            setMessages((prev) => [
              ...prev,
              {
                messageid: messageId,
                chatid: chatId,
                created_at: new Date(),
                role: 'assistant',
                updated_at: new Date(),
                parent_message_id: '',
                content: fullContent,
                attachments: aiResponse.assistant.attachments,
              },
            ]);

            if (!chatData?.chat?.chatid) {
              queryClient.invalidateQueries({ queryKey: ['chats'] });
              navigate(`/chat/${aiResponse.assistant.chatid}`);
            }

            setIsProcessing(false);
            resolve();
          }
        }, 10);
      });
    } catch {
      toast.error('Error', {
        description: 'Failed to generate response. Please try again.',
      });
      setIsProcessing(false);
    }
  };

  const isLoading = (isLoadingChat || isLoadingMessages) && !streamingMessage;

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden">
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <ChatMessages
          messages={messages}
          streamingMessage={streamingMessage}
          isProcessing={isProcessing}
        />
      )}

      <ChatInput
        value={inputMessage}
        onChange={setInputMessage}
        onSend={handleSendMessage}
        isLoading={isProcessing}
      />
    </main>
  );
}
