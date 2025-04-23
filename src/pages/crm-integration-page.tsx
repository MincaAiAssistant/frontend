import { Button } from '@/components/ui/button';

export default function CrmIntegrationPage() {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-10 max-w-2xl mx-auto">
          <div className="flex flex-col items-center">
            {/* HubSpot Logo */}
            <img
              src={'/logo hubspot.png'}
              alt="HubSpot Logo"
              className="w-48 h-auto mb-8"
            />

            <Button
              className="bg-cyan-400 hover:bg-cyan-500 text-black px-6 text-sm"
              size="sm"
            >
              Connect
            </Button>

            <p className="mt-6 text-sm text-gray-500 text-center">
              Connect your HubSpot account to integrate customer data and
              enhance your AI assistant's capabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
