import { useEffect, useRef } from 'react';
import { cn, formatTimestamp } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { Message, Attachment } from '@/lib/types';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import FileCard from './file-card';
import TypingIndicator from './typing-indicator';
import { useLocation } from 'react-router-dom';

interface ChatMessagesProps {
  messages: Message[];
  streamingMessage: Message | null;
  isProcessing: boolean;
}

export function ChatMessages({
  messages,
  streamingMessage,
  isProcessing,
}: ChatMessagesProps) {
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change or streaming occurs
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingMessage?.content]);

  // Function to render attachments
  const renderAttachments = (attachments?: Attachment[]) => {
    if (!attachments || attachments.length === 0) return null;

    return (
      <div className="mt-3 space-y-2">
        <div className="flex flex-col flex-wrap gap-2 mb-2 justify-self-end">
          {attachments.map((attachment) => (
            <>
              <FileCard
                filename={attachment.name}
                filesize={attachment.size}
                key={attachment.id}
              />
            </>
          ))}
        </div>
      </div>
    );
  };

  // Combine regular messages with streaming message if it exists
  const displayMessages = streamingMessage
    ? [...messages, streamingMessage]
    : messages;
  if (displayMessages.length === 0) {
    // Welcome message when there are no messages
    const welcomeMessage =
      location.pathname === '/insurance-expert'
        ? "I'm here to help you with policy details, coverage comparisons, and client support"
        : 'How can I help you today?';
    const icon = location.pathname === '/insurance-expert' ? '🧑‍💻' : '🤖';
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          {welcomeMessage}
        </h3>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <div className="max-w-3xl mx-auto space-y-4">
        {displayMessages.map((message) => (
          <div key={message.messageid}>
            {/* Render attachments if they exist */}
            <div
              className={cn(
                'flex flex-col w-full',
                message.role === 'user'
                  ? 'justify-self-end place-items-end'
                  : 'justify-start'
              )}
            >
              {message.role === 'user' &&
                message.attachments &&
                message.attachments.length > 0 &&
                renderAttachments(message.attachments)}

              <div
                className={cn(
                  'rounded-lg p-4',
                  message.role === 'user'
                    ? 'bg-gray-100 text-gray-700 max-w-[80%]'
                    : 'bg-white text-gray-900 border border-gray-100 max-w-[100%] w-fit'
                )}
              >
                <div className="flex items-center mb-2">
                  {message.role !== 'user' && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 mr-2">
                      <span>
                        {location.pathname === '/insurance-expert'
                          ? '🧑‍💻'
                          : '🤖'}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {message.role === 'user' ? 'You' : 'AI Agent'}
                    </p>
                    <p className="text-xs opacity-70">
                      {formatTimestamp(message.created_at)}
                    </p>
                  </div>
                </div>

                <div className="prose prose-sm sm:prose lg:prose-lg prose-blue max-w-none">
                  <div className="leading-relaxed space-y-4">
                    <ReactMarkdown
                      children={message.content}
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-xl font-semibold text-gray-900">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-lg font-semibold text-gray-900">
                            {children}
                          </h2>
                        ),
                        p: ({ children }) => (
                          <p className="text-gray-800">{children}</p>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                          >
                            {children}
                          </a>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside space-y-1 text-gray-800 pl-2">
                            {children}
                          </ul>
                        ),
                        li: ({ children }) => (
                          <li className="pl-1">{children}</li>
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Show typing indicator when processing but not streaming yet */}
        {isProcessing && !streamingMessage && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
