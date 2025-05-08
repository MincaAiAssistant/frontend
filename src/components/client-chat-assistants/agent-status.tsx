import { Button } from '../ui/button';

interface AgentStatusProps {
  agentActive: boolean;
  toggleAgentStatus: () => void;
}

export function AgentStatus({
  agentActive,
  toggleAgentStatus,
}: AgentStatusProps) {
  return (
    <div className="flex items-center justify-between py-3 px-8 border-b border-gray-200 bg-gray-50">
      <div className="flex items-center">
        <div className="text-sm font-medium text-gray-900 mr-2">
          Agent Status:
        </div>
        {agentActive ? (
          <div className="text-sm font-medium text-green-600">🟢 LIVE</div>
        ) : (
          <div className="text-sm font-medium text-red-600">🔴 PAUSED</div>
        )}
      </div>
      {agentActive ? (
        <Button
          className="bg-red-500 text-white hover:bg-red-600"
          onClick={toggleAgentStatus}
        >
          → Pause
        </Button>
      ) : (
        <Button
          className="bg-green-600 text-white hover:bg-green-700"
          onClick={toggleAgentStatus}
        >
          → Activate
        </Button>
      )}
    </div>
  );
}
