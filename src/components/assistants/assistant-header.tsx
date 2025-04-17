import { AssistantType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AssistantHeaderProps {
  assistantType: AssistantType;
  chatTitle?: string | null;
}

export function AssistantHeader({
  assistantType,
  chatTitle,
}: AssistantHeaderProps) {
  const getAssistantInfo = (type: AssistantType) => {
    switch (type) {
      case 'insurance-expert':
        return {
          icon: '🧑‍💻',
          name: 'Insurance Assistant',
          description:
            'Expert in insurance policies, coverage options, and claims processing',
        };
      case 'sales-advisor':
        return {
          icon: '📈',
          name: 'Sales Advisor',
          description:
            'Specialized in insurance sales strategies and customer relationship management',
        };
      case 'fleet-quotation':
        return {
          icon: '🚚',
          name: 'Fleet Quotation',
          description:
            'Focused on fleet insurance, commercial vehicle coverage, and risk assessment',
        };
      default:
        return {
          icon: '🤖',
          name: 'AI Agent',
          description: 'Here to help with your insurance needs',
        };
    }
  };

  const assistantInfo = getAssistantInfo(assistantType);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center">
      <div
        className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center mr-3'
        )}
      >
        <span className="text-xl">{assistantInfo.icon}</span>
      </div>
      <div>
        <h2 className="font-medium text-gray-900">
          {chatTitle ? chatTitle : assistantInfo.name}
        </h2>
        <p className="text-sm text-gray-500">
          {chatTitle
            ? 'Chat with insurance assistant'
            : assistantInfo.description}
        </p>
      </div>
    </div>
  );
}
