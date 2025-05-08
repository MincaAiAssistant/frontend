import { cn, formatTimestamp } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { ClientMessage } from '@/lib/types';

// Chat Message Component
interface ChatMessageProps {
  message: ClientMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex',
        message.role !== 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-lg p-4',
          message.role !== 'user'
            ? 'bg-gray-100 text-gray-700'
            : 'bg-white text-gray-900 border border-gray-100'
        )}
      >
        <div className="flex items-center mb-2">
          {message.role === 'user' && (
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 mr-2">
              <span>👥</span>
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm font-medium">
              {message.role === 'user' ? 'Client' : 'You (AI Assistant)'}
            </p>
            <p className="text-xs opacity-70">
              {formatTimestamp(message.time)}
            </p>
          </div>
        </div>
        <div className="prose prose-sm max-w-none">
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
              p: ({ children }) => <p className="text-gray-800">{children}</p>,
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
              li: ({ children }) => <li className="pl-1">{children}</li>,
            }}
          />
        </div>
      </div>
    </div>
  );
}
