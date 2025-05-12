import { Loader2, Search } from 'lucide-react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ConversationItem } from './conversation-item';
import { ClientChat } from '@/lib/types';
import { differenceInMinutes } from 'date-fns';

// Conversation List Component
interface ConversationListProps {
  clients: ClientChat[] | undefined;
  isLoading: boolean;
  isError: boolean;
  selectedCustomer: string | null;
  setSelectedCustomer: (sessionId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export function ConversationList({
  clients,
  isLoading,
  isError,
  selectedCustomer,
  setSelectedCustomer,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}: ConversationListProps) {
  const filteredCustomers = clients?.filter((customer) => {
    const matchesSearch =
      customer.sessionId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase());

    const isAIResponding =
      differenceInMinutes(new Date(), new Date(customer.lastTimestamp)) < 3;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'ai-responding' && isAIResponding) ||
      (statusFilter === 'closed' && !isAIResponding);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-3/4 flex flex-col border-r border-gray-200 bg-white">
      <div className="px-8 py-6 border-b border-gray-200">
        <div className="mb-2">
          <h1 className="font-semibold text-xl text-gray-900">Conversations</h1>
          <p className="text-sm text-gray-600">
            Monitor customer chats handled by your AI assistant.
          </p>
        </div>
        <div className="flex mt-4 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-9"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 h-10">
              <SelectValue placeholder="All status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="ai-responding">AI responding</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-y-auto flex-1">
        <div className="grid grid-cols-12 px-8 py-3 text-xs font-medium text-gray-500 border-b border-gray-200">
          <div className="col-span-2">Customer</div>
          <div className="col-span-3">Last message</div>
          <div className="col-span-2 text-center">Messages</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Last activity</div>
          <div className="col-span-1">Emergency</div>
        </div>
        <div>
          {isLoading && (
            <div className="bg-white shadow-sm rounded-lg p-8 text-center">
              <div className="flex items-center justify-center h-48">
                <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
              </div>
            </div>
          )}
          {filteredCustomers?.map((customer) => (
            <ConversationItem
              key={customer.sessionId}
              customer={customer}
              isSelected={selectedCustomer === customer.sessionId}
              onSelect={setSelectedCustomer}
            />
          ))}
          {(filteredCustomers?.length === 0 || isError) && (
            <div className="p-6 text-center text-gray-500">
              No conversations matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
