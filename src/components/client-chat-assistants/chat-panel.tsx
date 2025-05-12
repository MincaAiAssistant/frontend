import { Loader2, MessageSquare } from 'lucide-react';
import { Badge } from '../ui/badge';
import { ChatMessage } from './chat-message';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ClientChat, ClientMessage } from '@/lib/types';

// Chat Panel Component
interface ChatPanelProps {
  activeCustomer: ClientChat | null;
  messages: ClientMessage[] | undefined;
  isLoading: boolean;
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

export function ChatPanel({
  activeCustomer,
  messages,
  isLoading,
  message,
  setMessage,
  handleSendMessage,
  handleKeyPress,
}: ChatPanelProps) {
  return (
    <div className="w-1/4 flex flex-col bg-gray-50">
      {activeCustomer ? (
        <>
          <div className="p-4 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="font-medium text-gray-900">
                {activeCustomer.sessionId}
              </h2>
              <div className="flex items-center">
                <Badge
                  variant="outline"
                  className="bg-gray-50 text-gray-700 border-gray-200"
                >
                  Closed
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-3xl h-full mx-auto space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-full content-center">
                  <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
                </div>
              ) : (
                messages?.map((msg) => (
                  <ChatMessage key={msg.messageid} message={msg} />
                ))
              )}
            </div>
          </div>
          <div className="p-4 bg-gray-100 border-t border-gray-200">
            <div className="flex">
              <Input
                className="flex-1 mr-2"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">
              No conversation selected
            </h3>
            <p className="text-gray-500">Select a conversation from the list</p>
          </div>
        </div>
      )}
    </div>
  );
}
