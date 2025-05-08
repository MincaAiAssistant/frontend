import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { ClientChat } from '@/lib/types';

// Conversation Item Component
interface ConversationItemProps {
  customer: ClientChat;
  isSelected: boolean;
  onSelect: (sessionId: string) => void;
}

export function ConversationItem({
  customer,
  isSelected,
  onSelect,
}: ConversationItemProps) {
  return (
    <button
      className={cn(
        'w-full text-left grid grid-cols-12 px-8 py-4 border-b border-gray-100 hover:bg-gray-50',
        isSelected && 'bg-blue-50 hover:bg-blue-50'
      )}
      onClick={() => onSelect(customer.sessionId)}
    >
      <div className="col-span-2">
        <div className="font-medium text-xs truncate text-gray-900">
          {customer.sessionId}
        </div>
      </div>
      <div className="col-span-3 truncate text-xs text-gray-600">
        {customer.lastMessage}
      </div>
      <div className="col-span-2 text-xs text-gray-600 text-center">
        {customer.totalMessages}
      </div>
      <div className="col-span-2">
        <Badge
          variant="outline"
          className="text-xs bg-gray-50 text-gray-700 border-gray-200"
        >
          Closed
        </Badge>
      </div>
      <div className="col-span-2 text-xs text-gray-500">
        {formatDistanceToNow(new Date(customer.lastTimestamp), {
          addSuffix: true,
        })}
      </div>
      <div className="col-span-1 text-center text-xs text-gray-600">No</div>
    </button>
  );
}
